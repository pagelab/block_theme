/**
 * Processador de theme.json
 * 
 * Responsável por converter a paleta de cores do Tailwind
 * para tokens semânticos no theme.json do WordPress.
 */

const BaseProcessor = require('./BaseProcessor');
const TokenManager = require('../utils/TokenManager');
const { VERSION_INFO, COLOR_CONTROLS } = require('../config/settings');

class ThemeJsonProcessor extends BaseProcessor {
  constructor(logger = null) {
    super(logger);
    // Set correct CSV path (one level up from _tools directory)
    const path = require('path');
    const csvPath = path.join(__dirname, '..', '..', 'semantic-tokens.csv');
    this.tokenManager = new TokenManager(csvPath);
    // Corrigir todos os tokens semânticos ao inicializar
    this.semanticPalette = this.tokenManager.getSemanticPalette().map(token => this.normalizeToken(token));
  }

  // Normaliza um token: corrige RGB, aspas e acentos
  normalizeToken(token) {
    const normalized = { ...token };
    // Corrigir sintaxe RGB/RGBA
    if (typeof normalized.color === 'string') {
      normalized.color = this.fixRgbaSyntax(normalized.color);
    }
    // Corrigir aspas escapadas em name
    if (typeof normalized.name === 'string') {
      normalized.name = normalized.name.replace(/^\\?"|\\?"$/g, ''); // remove aspas duplas no início/fim
      normalized.name = this.escapeUnicodeInNames({ name: normalized.name }).name;
    }
    return normalized;
  }

  /**
   * Processar arquivo theme.json
   * @param {string} filePath - Caminho do arquivo theme.json
   * @param {string} content - Conteúdo do arquivo
   * @returns {Promise<string>} Conteúdo processado
   */
  async processFile(filePath, content) {
    this.log('info', `Processando theme.json: ${filePath}`);

    if (!this.validateFile(filePath, content)) {
      throw new Error(`Arquivo theme.json inválido: ${filePath}`);
    }

    return await this.measurePerformance('theme.json processing', async () => {
      // 1. Corrigir sintaxe RGB/RGBA e aspas escapadas antes do parse
      let fixedContent = this.fixRgbaSyntax(content);
      fixedContent = this.fixEscapedQuotes(fixedContent);

      // Parse do JSON
      let themeData;
      try {
        themeData = JSON.parse(fixedContent);
      } catch (error) {
        this.log('error', `Erro ao parsear JSON: ${filePath}`, error);
        throw new Error(`JSON inválido em ${filePath}: ${error.message}`);
      }

      // 2. Escapar Unicode em todos os atributos "name"
      themeData = this.escapeUnicodeInNames(themeData);

      // Validar estrutura básica
      if (!this.validateThemeStructure(themeData)) {
        throw new Error(`Estrutura de theme.json inválida: ${filePath}`);
      }

      // Backup da paleta original
      const originalPalette = this.extractOriginalPalette(themeData);
      this.log('debug', `Paleta original extraída com ${originalPalette.length} cores`);

      // Substituir paleta por tokens semânticos
      themeData = this.replaceColorPalette(themeData);

      // Adicionar gradientes semânticos
      themeData = this.addSemanticGradients(themeData);

      // Adicionar controles de cor granulares
      themeData = this.addColorControlSettings(themeData);

      // Adicionar metadados sobre a conversão
      themeData = this.addConversionMetadata(themeData, originalPalette);

      // Validar resultado final
      if (!this.validateProcessedTheme(themeData)) {
        throw new Error(`Tema processado é inválido: ${filePath}`);
      }

      this.operationStats.operationsPerformed++;
      
      // Retornar JSON formatado
      return JSON.stringify(themeData, null, 2);
    });
  }

  // Corrigir sintaxe RGB/RGBA
  fixRgbaSyntax(content) {
    let processed = content;
    // Padrão 1: "rgba(29,78 216,1)" -> "rgba(29,78,216,1)"
    processed = processed.replace(
      /(rgba?)\((\d+),(\d+)\s+(\d+)(?:,([^)]+))?\)/g,
      (match, func, r, g, b, a) => {
        if (a !== undefined) {
          return `${func}(${r},${g},${b},${a})`;
        } else {
          return `${func}(${r},${g},${b})`;
        }
      }
    );
    // Padrão 2: "rgba(0,0 0,1)" -> "rgba(0,0,0,1)"
    processed = processed.replace(
      /(rgba?)\((\d+),(\d+)\s+(\d+)\s+(\d+)(?:,([^)]+))?\)/g,
      (match, func, r, g, b1, b2, a) => {
        if (a !== undefined) {
          return `${func}(${r},${g},${b1},${b2},${a})`;
        } else {
          return `${func}(${r},${g},${b1},${b2})`;
        }
      }
    );
    // Padrão 3: "rgba(29,78,216 1)" -> "rgba(29,78,216,1)"
    processed = processed.replace(
      /(rgba?)\((\d+),(\d+),(\d+)\s+([\d\.]+)\)/g,
      '$1($2,$3,$4,$5)'
    );
    return processed;
  }

  // Remover aspas escapadas em atributos name
  fixEscapedQuotes(content) {
    const escapedQuotesRegex = /"name":\s*"\\\"([^\\]+)\\\""/g;
    return content.replace(escapedQuotesRegex, '"name": "$1"');
  }

  // Escapar Unicode em todos os atributos name
  escapeUnicodeInNames(jsonObj) {
    function processObject(obj) {
      if (!obj || typeof obj !== 'object') return obj;
      if (Array.isArray(obj)) {
        return obj.map(item => processObject(item));
      }
      const result = {};
      for (const key in obj) {
        if (key === 'name' && typeof obj[key] === 'string') {
          result[key] = escapeUnicode(obj[key]);
        } else {
          result[key] = processObject(obj[key]);
        }
      }
      return result;
    }
    function escapeUnicode(str) {
      return str.replace(/[^\x00-\x7F]/g, char => {
        const code = char.charCodeAt(0).toString(16).padStart(4, '0');
        return `\\u${code}`;
      });
    }
    return processObject(jsonObj);
  }

  /**
   * Validar estrutura básica do theme.json
   * @param {object} themeData - Dados do tema
   * @returns {boolean} Se a estrutura é válida
   */
  validateThemeStructure(themeData) {
    // Verificar se é um objeto
    if (!themeData || typeof themeData !== 'object') {
      this.log('error', 'theme.json deve ser um objeto');
      return false;
    }

    // Verificar se tem a estrutura mínima esperada
    const requiredPaths = [
      'settings',
      'settings.color'
    ];

    for (const path of requiredPaths) {
      if (!this.getNestedProperty(themeData, path)) {
        // Criar estrutura se não existir
        this.setNestedProperty(themeData, path, {});
      }
    }

    return true;
  }

  /**
   * Extrair paleta original do theme.json
   * @param {object} themeData - Dados do tema
   * @returns {array} Paleta original
   */
  extractOriginalPalette(themeData) {
    const colorSettings = this.getNestedProperty(themeData, 'settings.color');
    
    if (!colorSettings || !colorSettings.palette) {
      this.log('warn', 'Nenhuma paleta encontrada no theme.json');
      return [];
    }

    // Filtrar apenas cores do Tailwind (que normalmente têm nomes como "blue-700")
    const tailwindColors = colorSettings.palette.filter(color => {
      return color.slug && (
        color.slug.match(/^(blue|green|red|gray|yellow|purple|pink|indigo|cyan|teal|lime|amber|orange|rose|sky|violet|fuchsia|emerald|slate|zinc|neutral|stone)-\d+$/) ||
        color.slug === 'white' ||
        color.slug === 'black'
      );
    });

    this.log('debug', `Encontradas ${tailwindColors.length} cores Tailwind na paleta original`);
    return tailwindColors;
  }

  /**
   * Substituir paleta de cores por tokens semânticos
   * @param {object} themeData - Dados do tema
   * @returns {object} Tema com paleta semântica
   */
  replaceColorPalette(themeData) {
    const colorSettings = this.getNestedProperty(themeData, 'settings.color');
    
    if (!colorSettings) {
      colorSettings = {};
      this.setNestedProperty(themeData, 'settings.color', colorSettings);
    }

    // Whitelist restritiva: APENAS tokens semânticos definidos
    const allowedSemanticSlugs = this.semanticPalette.map(color => color.slug);
    
    const originalPalette = colorSettings.palette || [];
    
    // Identificar padrões de cores que devem ser removidas
    const colorsToRemove = [
      // Cores Tailwind
      /^(blue|green|red|gray|yellow|purple|pink|indigo|cyan|teal|lime|amber|orange|rose|sky|violet|fuchsia|emerald|slate|zinc|neutral|stone)-\d+$/,
      /^(white|black|transparent|current|inherit)$/,
      // Cores do Pinegrow (primary, secondary, color3, color4, etc.)
      /^primary-\d+$/,
      /^secondary-\d+$/,
      /^color\d+-\d+$/,
      /^(pearl|accent|neutral)$/
    ];

    // Manter APENAS cores na whitelist semântica
    const preservedColors = originalPalette.filter(color => {
      if (!color.slug) return false;
      
      // Se está na whitelist semântica, manter
      if (allowedSemanticSlugs.includes(color.slug)) {
        return true;
      }
      
      // Se corresponde a qualquer padrão de remoção, remover
      const shouldRemove = colorsToRemove.some(pattern => pattern.test(color.slug));
      
      // Manter apenas se NÃO deve ser removido E não é um padrão conhecido
      return !shouldRemove;
    });

    // Usar APENAS a paleta semântica definida (sem cores preservadas)
    const newPalette = [...this.semanticPalette];

    // Atualizar paleta
    colorSettings.palette = newPalette;
    
    this.log('info', `Paleta limpa: ${this.semanticPalette.length} tokens semânticos (removidas ${originalPalette.length - newPalette.length} cores não-semânticas)`);

    return themeData;
  }

  /**
   * Adicionar gradientes semânticos ao theme.json
   * @param {object} themeData - Dados do tema
   * @returns {object} Tema com gradientes semânticos
   */
  addSemanticGradients(themeData) {
    this.log('debug', 'Adicionando gradientes semânticos');

    // Garantir que a estrutura settings.color existe
    if (!themeData.settings) {
      themeData.settings = {};
    }
    
    if (!themeData.settings.color) {
      themeData.settings.color = {};
    }

    // Obter tokens de gradiente do TokenManager
    const gradientTokens = this.tokenManager.getGradientTokens();
    
    if (gradientTokens.length === 0) {
      this.log('info', 'Nenhum token de gradiente encontrado');
      return themeData;
    }

    // Converter tokens para formato theme.json
    const gradientPalette = gradientTokens.map(token => ({
      slug: token.slug,
      gradient: token.gradientCss,
      name: token.name
    }));

    // Escape Unicode characters in names
    const processedGradientPalette = this.escapeUnicodeInNames(gradientPalette);

    // Substituir ou criar paleta de gradientes
    themeData.settings.color.gradients = processedGradientPalette;

    this.log('info', `Adicionados ${gradientPalette.length} gradientes semânticos`);
    
    return themeData;
  }

  /**
   * Adicionar metadados sobre a conversão
   * @param {object} themeData - Dados do tema
   * @param {array} originalPalette - Paleta original
   * @returns {object} Tema com metadados
   */
  addConversionMetadata(themeData, originalPalette) {
    // Adicionar seção de metadados (se ainda não existir)
    if (!themeData.customTemplates) {
      themeData.customTemplates = [];
    }

    // Adicionar comentário no início do arquivo (para referência)
    if (!themeData.$schema) {
      themeData.$schema = "https://schemas.wp.org/trunk/theme.json";
    }

    // Adicionar timestamp da conversão como comentário
    const timestamp = new Date().toISOString();
    const conversionInfo = {
      convertedAt: timestamp,
      originalColorsCount: originalPalette.length,
      semanticTokensCount: this.semanticPalette.length,
      toolVersion: VERSION_INFO.VERSION
    };

    // Adicionar como propriedade personalizada (será ignorada pelo WordPress)
    themeData._conversion = conversionInfo;

    this.log('debug', 'Metadados de conversão adicionados', conversionInfo);

    return themeData;
  }

  /**
   * Validar tema processado
   * @param {object} themeData - Dados do tema processado
   * @returns {boolean} Se o tema é válido
   */
  validateProcessedTheme(themeData) {
    // Verificar se a paleta semântica foi aplicada
    const palette = this.getNestedProperty(themeData, 'settings.color.palette');
    
    if (!palette || !Array.isArray(palette)) {
      this.log('error', 'Paleta não encontrada no tema processado');
      return false;
    }

    // Verificar se todos os tokens semânticos estão presentes
    const semanticSlugs = this.semanticPalette.map(color => color.slug);
    const processedSlugs = palette.map(color => color.slug);
    
    const missingTokens = semanticSlugs.filter(slug => !processedSlugs.includes(slug));
    
    if (missingTokens.length > 0) {
      this.log('error', `Tokens semânticos ausentes: ${missingTokens.join(', ')}`);
      return false;
    }

    // Verificar estrutura de cada cor
    for (const color of palette) {
      if (!color.color || !color.name || !color.slug) {
        this.log('error', `Cor inválida na paleta: ${JSON.stringify(color)}`);
        return false;
      }
    }

    this.log('info', 'Validação do tema processado passou');
    return true;
  }

  /**
   * Obter propriedade aninhada de um objeto
   * @param {object} obj - Objeto
   * @param {string} path - Caminho (ex: "settings.color.palette")
   * @returns {any} Valor da propriedade
   */
  getNestedProperty(obj, path) {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : null;
    }, obj);
  }

  /**
   * Definir propriedade aninhada de um objeto
   * @param {object} obj - Objeto
   * @param {string} path - Caminho (ex: "settings.color.palette")
   * @param {any} value - Valor a definir
   */
  setNestedProperty(obj, path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    
    const target = keys.reduce((current, key) => {
      if (!current[key] || typeof current[key] !== 'object') {
        current[key] = {};
      }
      return current[key];
    }, obj);
    
    target[lastKey] = value;
  }

  /**
   * Adicionar configurações de controles de cor granulares
   * 
   * Define quais controles de cor estarão disponíveis no Global Styles do WordPress.
   * Apenas heading e link terão controles individuais, enquanto text, background, 
   * caption e button serão controlados através da paleta semântica.
   * 
   * @param {object} themeData - Dados do theme.json
   * @returns {object} Dados do theme.json com controles de cor configurados
   */
  addColorControlSettings(themeData) {
    this.log('debug', 'Adicionando configurações de controles de cor granulares');

    // Garantir que a estrutura settings.color existe
    if (!themeData.settings) {
      themeData.settings = {};
    }
    
    if (!themeData.settings.color) {
      themeData.settings.color = {};
    }

    // Combinar controles habilitados e desabilitados
    const colorControls = {
      ...COLOR_CONTROLS.ENABLED,
      ...COLOR_CONTROLS.DISABLED
    };

    // Aplicar configurações de controles de cor
    Object.assign(themeData.settings.color, colorControls);

    this.log('debug', 'Controles de cor configurados:', {
      enabled: Object.keys(COLOR_CONTROLS.ENABLED),
      disabled: Object.keys(COLOR_CONTROLS.DISABLED)
    });

    return themeData;
  }

  /**
   * Gerar relatório de conversão
   * @param {string} originalContent - Conteúdo original
   * @param {string} processedContent - Conteúdo processado
   * @returns {object} Relatório
   */
  generateConversionReport(originalContent, processedContent) {
    let originalData, processedData;
    
    try {
      originalData = JSON.parse(originalContent);
      processedData = JSON.parse(processedContent);
    } catch (error) {
      return {
        error: 'Erro ao parsear JSON para relatório',
        details: error.message
      };
    }

    const originalPalette = this.getNestedProperty(originalData, 'settings.color.palette') || [];
    const processedPalette = this.getNestedProperty(processedData, 'settings.color.palette') || [];

    return {
      originalColorsCount: originalPalette.length,
      processedColorsCount: processedPalette.length,
      semanticTokensAdded: this.semanticPalette.length,
      preservedColors: processedPalette.length - this.semanticPalette.length,
      conversionSuccessful: this.validateProcessedTheme(processedData)
    };
  }
}

module.exports = ThemeJsonProcessor;
