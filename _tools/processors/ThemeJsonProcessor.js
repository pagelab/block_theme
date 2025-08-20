/**
 * Processador de theme.json
 * 
 * Responsável por converter a paleta de cores do Tailwind
 * para tokens semânticos no theme.json do WordPress.
 */

const BaseProcessor = require('./BaseProcessor');
const TokenManager = require('../utils/TokenManager');
const { VERSION_INFO } = require('../config/settings');

class ThemeJsonProcessor extends BaseProcessor {
  constructor(logger = null) {
    super(logger);
    this.tokenManager = new TokenManager();
    this.semanticPalette = this.tokenManager.getSemanticPalette();
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
      // Parse do JSON
      let themeData;
      try {
        themeData = JSON.parse(content);
      } catch (error) {
        this.log('error', `Erro ao parsear JSON: ${filePath}`, error);
        throw new Error(`JSON inválido em ${filePath}: ${error.message}`);
      }

      // Validar estrutura básica
      if (!this.validateThemeStructure(themeData)) {
        throw new Error(`Estrutura de theme.json inválida: ${filePath}`);
      }

      // Backup da paleta original
      const originalPalette = this.extractOriginalPalette(themeData);
      this.log('debug', `Paleta original extraída com ${originalPalette.length} cores`);

      // Substituir paleta por tokens semânticos
      themeData = this.replaceColorPalette(themeData);

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
