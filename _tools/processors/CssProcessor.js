/**
 * Processador de arquivos CSS
 * 
 * Responsável por converter classes e variáveis CSS do Tailwind
 * para tokens semânticos do WordPress.
 */

const BaseProcessor = require('./BaseProcessor');
const postcss = require('postcss');
const TokenManager = require('../utils/TokenManager');
const { 
  PROSE_VARIABLE_MAPPING, 
  CSS_PATTERNS 
} = require('../config/color-mapping');
const { chooseProcessingMethod } = require('../config/processing-matrix');

class CssProcessor extends BaseProcessor {
  constructor(logger = null) {
    super(logger);
    // Set correct CSV path (one level up from _tools directory)
    const path = require('path');
    const csvPath = path.join(__dirname, '..', '..', 'semantic-tokens.csv');
    this.tokenManager = new TokenManager(csvPath);
    this.colorMapping = this.tokenManager.getTailwindMapping();
    this.gradientMapping = this.tokenManager.buildGradientMapping();
    this.proseMapping = PROSE_VARIABLE_MAPPING;
    this.patterns = CSS_PATTERNS;
    
    // Cache para PostCSS
    this.postcssProcessor = null;
  }

  /**
   * Inicializar processador CSS
   */
  async initialize() {
    await super.initialize();
    
    // Configurar PostCSS
    this.postcssProcessor = postcss([
      // Plugin customizado para conversão semântica
      this.createSemanticColorsPlugin()
    ]);
  }

  /**
   * Processar arquivo CSS
   * @param {string} filePath - Caminho do arquivo
   * @param {string} content - Conteúdo do arquivo
   * @returns {Promise<string>} Conteúdo processado
   */
  async processFile(filePath, content) {
    this.log('info', `Processando CSS: ${filePath}`);

    if (!this.validateFile(filePath, content)) {
      throw new Error(`Arquivo CSS inválido: ${filePath}`);
    }

    const fileSize = Buffer.byteLength(content, 'utf8');
    const method = chooseProcessingMethod(filePath, fileSize, 'css');
    
    this.log('debug', `Método escolhido para ${filePath}: ${method.method}`, {
      fileSize: `${(fileSize / 1024).toFixed(2)}KB`,
      precision: method.precision,
      performance: method.performance
    });

    return await this.measurePerformance('CSS processing', async () => {
      let processedContent;

      switch (method.method) {
        case 'STRING_REPLACE':
          processedContent = await this.processWithStringReplace(content);
          break;
        case 'REGEX_OPTIMIZED':
          processedContent = await this.processWithRegexOptimized(content);
          break;
        case 'POSTCSS_PARSER':
          processedContent = await this.processWithPostcss(content);
          break;
        default:
          // Fallback para regex otimizada
          processedContent = await this.processWithRegexOptimized(content);
      }

      // Processar variáveis prose independentemente do método
      processedContent = await this.processProseVariables(processedContent);

      // Processar gradientes
      processedContent = await this.processGradientClasses(processedContent);

      // Limpar classes de gradiente não utilizadas
      processedContent = this.removeUnusedGradientClasses(processedContent);

      // Validar resultado
      if (!this.validateProcessedCss(processedContent)) {
        throw new Error(`CSS processado é inválido: ${filePath}`);
      }

      this.operationStats.operationsPerformed++;
      return processedContent;
    });
  }

  /**
   * Processamento com string replace (mais rápido para arquivos pequenos)
   * @param {string} content - Conteúdo CSS
   * @returns {Promise<string>} Conteúdo processado
   */
  async processWithStringReplace(content) {
    let processed = content;

    // Substituir classes de cor diretamente
    for (const [tailwindClass, semanticToken] of Object.entries(this.colorMapping)) {
      // Substituir definições de classe
      const classPattern = `.${tailwindClass}`;
      const semanticClass = `.${semanticToken}`;
      
      processed = processed.split(classPattern).join(semanticClass);

      // Substituir valores de propriedades CSS
      processed = this.replaceColorValues(processed, tailwindClass, semanticToken);
    }

    // Substituir valores RGB hardcoded por variáveis semânticas globalmente
    processed = this.replaceHardcodedValues(processed);

    // Remover todas as variáveis de opacidade do Tailwind
    processed = processed.replace(/--tw-[\w-]*-opacity:\s*[^;]+;?\s*/g, '');
    
    // Remover linhas vazias resultantes
    processed = processed.replace(/^\s*$/gm, '').replace(/\n{3,}/g, '\n\n');

    return processed;
  }

  /**
   * Processamento com regex otimizada
   * @param {string} content - Conteúdo CSS
   * @returns {Promise<string>} Conteúdo processado
   */
  async processWithRegexOptimized(content) {
    let processed = content;

    // Processar classes de background
    processed = await this.processBackgroundClasses(processed);
    
    // Processar classes de texto
    processed = await this.processTextClasses(processed);
    
    // Processar classes de borda
    processed = await this.processBorderClasses(processed);

    // Substituir valores RGB hardcoded por variáveis semânticas globalmente
    processed = this.replaceHardcodedValues(processed);

    // Remover --tw-bg-opacity
    processed = this.removeTailwindOpacity(processed);

    return processed;
  }

  /**
   * Processamento com PostCSS (mais preciso para arquivos grandes)
   * @param {string} content - Conteúdo CSS
   * @returns {Promise<string>} Conteúdo processado
   */
  async processWithPostcss(content) {
    try {
      const result = await this.postcssProcessor.process(content, { from: undefined });
      let processed = result.css;
      
      // Substituir valores RGB hardcoded por variáveis semânticas globalmente
      processed = this.replaceHardcodedValues(processed);
      
      return processed;
    } catch (error) {
      this.log('error', 'Erro no PostCSS', error);
      // Fallback para regex
      return await this.processWithRegexOptimized(content);
    }
  }

  /**
   * Criar plugin PostCSS para conversão semântica
   * @returns {function} Plugin PostCSS
   */
  createSemanticColorsPlugin() {
    return {
      postcssPlugin: 'semantic-colors',
      Rule: (rule) => {
        // Processar seletores
        for (const [tailwindClass, semanticToken] of Object.entries(this.colorMapping)) {
          const tailwindSelector = `.${tailwindClass}`;
          const semanticSelector = `.${semanticToken}`;
          
          if (rule.selector.includes(tailwindSelector)) {
            rule.selector = rule.selector.replace(
              new RegExp(`\\${tailwindSelector}\\b`, 'g'),
              semanticSelector
            );
          }
        }
      },
      Declaration: (decl) => {
        // Processar propriedades CSS
        if (this.isColorProperty(decl.prop)) {
          decl.value = this.convertColorValue(decl.value);
        }

        // Remover --tw-bg-opacity
        if (decl.prop === '--tw-bg-opacity') {
          decl.remove();
        }
      }
    };
  }

  /**
   * Processar classes de background
   * @param {string} content - Conteúdo CSS
   * @returns {Promise<string>} Conteúdo processado
   */
  async processBackgroundClasses(content) {
    const bgRegex = this.getCachedRegex('\\.bg-([\\w-]+)\\s*{([^}]*)}', 'g');
    
    return content.replace(bgRegex, (match, colorName, styles) => {
      const tailwindClass = `bg-${colorName}`;
      const semanticToken = this.colorMapping[tailwindClass];
      
      if (semanticToken) {
        // Substituir nome da classe e propriedades
        let newStyles = styles.replace(
          /background-color:\s*[^;]+;/g,
          `background-color: var(--wp--preset--color--${semanticToken});`
        );
        
        // Remover todas as variáveis de opacidade do Tailwind
        newStyles = newStyles.replace(/--tw-[\w-]*-opacity:\s*[^;]+;\s*/g, '');
        
        // Limpar espaços extras
        newStyles = newStyles.replace(/\s+/g, ' ').trim();
        
        return `.${semanticToken}{${newStyles}}`;
      }
      
      return match;
    });
  }

  /**
   * Processar classes de texto
   * @param {string} content - Conteúdo CSS
   * @returns {Promise<string>} Conteúdo processado
   */
  async processTextClasses(content) {
    const textRegex = this.getCachedRegex('\\.text-([\\w-]+)\\s*{([^}]*)}', 'g');
    
    return content.replace(textRegex, (match, colorName, styles) => {
      const tailwindClass = `text-${colorName}`;
      const semanticToken = this.colorMapping[tailwindClass];
      
      if (semanticToken) {
        let newStyles = styles.replace(
          /color:\s*[^;]+;/g,
          `color: var(--wp--preset--color--${semanticToken});`
        );
        
        // Remover todas as variáveis de opacidade do Tailwind
        newStyles = newStyles.replace(/--tw-[\w-]*-opacity:\s*[^;]+;\s*/g, '');
        
        // Limpar espaços extras
        newStyles = newStyles.replace(/\s+/g, ' ').trim();
        
        return `.${semanticToken}{${newStyles}}`;
      }
      
      return match;
    });
  }

  /**
   * Processar classes de borda
   * @param {string} content - Conteúdo CSS
   * @returns {Promise<string>} Conteúdo processado
   */
  async processBorderClasses(content) {
    const borderRegex = this.getCachedRegex('\\.border-([\\w-]+)\\s*{([^}]*)}', 'g');
    
    return content.replace(borderRegex, (match, colorName, styles) => {
      const tailwindClass = `border-${colorName}`;
      const semanticToken = this.colorMapping[tailwindClass];
      
      if (semanticToken) {
        let newStyles = styles.replace(
          /border-color:\s*[^;]+;/g,
          `border-color: var(--wp--preset--color--${semanticToken});`
        );
        
        // Remover todas as variáveis de opacidade do Tailwind
        newStyles = newStyles.replace(/--tw-[\w-]*-opacity:\s*[^;]+;\s*/g, '');
        
        // Limpar espaços extras
        newStyles = newStyles.replace(/\s+/g, ' ').trim();
        
        return `.${semanticToken}{${newStyles}}`;
      }
      
      return match;
    });
  }

  /**
   * Processar variáveis prose do Tailwind
   * @param {string} content - Conteúdo CSS
   * @returns {Promise<string>} Conteúdo processado
   */
  async processProseVariables(content) {
    let processed = content;

    // Aplicar fallbacks
    for (const [proseVar, fallback] of Object.entries(this.proseMapping.fallbacks)) {
      const regex = this.getCachedRegex(`${this.escapeRegex(proseVar)}:\\s*[^;]+;`, 'g');
      processed = processed.replace(regex, `${proseVar}: ${fallback};`);
    }

    // Aplicar overrides com color-mix
    for (const [proseVar, override] of Object.entries(this.proseMapping.overrides)) {
      const fallback = this.proseMapping.fallbacks[proseVar];
      if (fallback) {
        const fallbackDeclaration = `${proseVar}: ${fallback};`;
        const progressiveDeclaration = `${proseVar}: ${override};`;
        
        // Substituir por declaração com fallback + progressive enhancement
        const regex = this.getCachedRegex(`${this.escapeRegex(proseVar)}:\\s*[^;]+;`, 'g');
        processed = processed.replace(regex, `${fallbackDeclaration}\n  ${progressiveDeclaration}`);
      }
    }

    return processed;
  }

  /**
   * Remover variáveis de opacidade do Tailwind
   * @param {string} content - Conteúdo CSS
   * @returns {string} Conteúdo processado
   */
  removeTailwindOpacity(content) {
    // Remover --tw-bg-opacity, --tw-text-opacity, etc. (mais robusta)
    let processed = content;
    
    // Padrões específicos para diferentes casos
    const opacityPatterns = [
      /--tw-bg-opacity:\s*[^;]+;?\s*/g,
      /--tw-text-opacity:\s*[^;]+;?\s*/g,
      /--tw-border-opacity:\s*[^;]+;?\s*/g,
      /--tw-ring-opacity:\s*[^;]+;?\s*/g,
      /--tw-shadow-opacity:\s*[^;]+;?\s*/g,
      /--tw-[\w-]*-opacity:\s*[^;]+;?\s*/g  // Catch-all
    ];
    
    for (const pattern of opacityPatterns) {
      processed = processed.replace(pattern, '');
    }

    // Remover valores rgb() que ainda usam var(--tw-*-opacity)
    processed = processed.replace(
      /rgb\([^)]+\s*\/\s*var\(--tw-[\w-]*-opacity\)\)/g,
      (match) => {
        // Log de debug
        this.log('debug', `Removendo valor RGB com opacidade: ${match}`);
        // Extrair valores RGB e retornar apenas eles
        const rgbMatch = match.match(/rgb\((\d+\s+\d+\s+\d+|\d+,\s*\d+,\s*\d+)\)/);
        if (rgbMatch) {
          return `rgb(${rgbMatch[1]})`;
        }
        return match;
      }
    );
    
    // Limpar linhas vazias e espaços excessivos
    processed = processed.replace(/^\s*[\r\n]/gm, '');
    processed = processed.replace(/\n{3,}/g, '\n\n');
    
    return processed;
  }

  /**
   * Substituir valores de cores específicos
   * @param {string} content - Conteúdo CSS
   * @param {string} tailwindClass - Classe Tailwind
   * @param {string} semanticToken - Token semântico
   * @returns {string} Conteúdo processado
   */
  replaceColorValues(content, tailwindClass, semanticToken) {
    // Substituir valor da propriedade dentro do contexto da classe específica
    const classRegex = this.getCachedRegex(`\\.${this.escapeRegex(tailwindClass)}\\s*{([^}]*)}`, 'g');
    
    return content.replace(classRegex, (match, styles) => {
      let newStyles = styles;
      
      // Substituir propriedades de cor por variáveis semânticas
      if (tailwindClass.startsWith('bg-')) {
        newStyles = newStyles.replace(
          /background-color:\s*[^;]+;/g,
          `background-color: var(--wp--preset--color--${semanticToken});`
        );
      } else if (tailwindClass.startsWith('text-')) {
        newStyles = newStyles.replace(
          /color:\s*[^;]+;/g,
          `color: var(--wp--preset--color--${semanticToken});`
        );
      } else if (tailwindClass.startsWith('border-')) {
        newStyles = newStyles.replace(
          /border-color:\s*[^;]+;/g,
          `border-color: var(--wp--preset--color--${semanticToken});`
        );
      }
      
      // Remover variáveis de opacidade
      newStyles = newStyles.replace(/--tw-[\w-]*-opacity:\s*[^;]+;\s*/g, '');
      
      // Limpar espaços extras
      newStyles = newStyles.replace(/\s+/g, ' ').trim();
      
      return `.${semanticToken}{${newStyles}}`;
    });
  }

  /**
   * Substituir valores RGB hardcoded por variáveis semânticas globalmente
   * @param {string} content - Conteúdo CSS
   * @returns {string} Conteúdo processado
   */
  replaceHardcodedValues(content) {
    // Obter mapeamento dinâmico baseado na paleta semântica atual
    const rgbToSemanticMapping = this.buildRgbToSemanticMapping();

    let processed = content;

    // Substituir valores RGB por variáveis semânticas
    for (const [rgbValue, semanticVar] of Object.entries(rgbToSemanticMapping)) {
      // Escapar caracteres especiais para regex
      const escapedRgb = rgbValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const rgbRegex = new RegExp(escapedRgb, 'g');
      processed = processed.replace(rgbRegex, semanticVar);
    }

    // Substituir valores RGB com var(--tw-bg-opacity) por variáveis semânticas
    processed = processed.replace(
      /rgb\((\d+)\s+(\d+)\s+(\d+)\s*\/\s*var\(--tw-[\w-]*-opacity\)\)/g,
      (match, r, g, b) => {
        const rgbValue = `rgb(${r} ${g} ${b})`;
        const rgbValueComma = `rgb(${r},${g},${b})`;
        return rgbToSemanticMapping[rgbValue] || rgbToSemanticMapping[rgbValueComma] || match;
      }
    );

    return processed;
  }

  /**
   * Construir mapeamento dinâmico de RGB para variáveis semânticas
   * @returns {object} Mapeamento RGB -> variável semântica
   */
  buildRgbToSemanticMapping() {
    const mapping = {};
    const semanticPalette = this.tokenManager.getSemanticPalette();
    
    for (const token of semanticPalette) {
      const { color, slug } = token;
      const semanticVar = `var(--wp--preset--color--${slug})`;
      
      // Extrair valores RGB do formato rgba(r,g,b,a)
      const rgbaMatch = color.match(/rgba?\((\d+),(\d+),(\d+)(?:,[\d.]+)?\)/);
      if (rgbaMatch) {
        const [, r, g, b] = rgbaMatch;
        
        // Adicionar todas as variações possíveis de formato
        mapping[`rgb(${r} ${g} ${b})`] = semanticVar;
        mapping[`rgb(${r},${g},${b})`] = semanticVar;
        mapping[`rgba(${r},${g},${b},1)`] = semanticVar;
        mapping[`rgb(${r} ${g} ${b} / var(--tw-bg-opacity))`] = semanticVar;
        mapping[`rgb(${r} ${g} ${b} / var(--tw-text-opacity))`] = semanticVar;
        mapping[`rgb(${r} ${g} ${b} / var(--tw-border-opacity))`] = semanticVar;
      }
    }
    
    this.log('debug', `Mapeamento RGB construído: ${Object.keys(mapping).length} variações`);
    return mapping;
  }

  /**
   * Converter valor de cor para token semântico
   * @param {string} value - Valor original
   * @returns {string} Valor convertido
   */
  convertColorValue(value) {
    // Este método é mantido para compatibilidade com PostCSS
    const colorMap = {
      'rgb(29 78 216)': 'var(--wp--preset--color--brand-bg-base)',
      'rgb(22 163 74)': 'var(--wp--preset--color--brand-bg-alt)',
      'rgb(220 38 38)': 'var(--wp--preset--color--brand-bg-accent)',
    };

    return colorMap[value] || value;
  }

  /**
   * Verificar se uma propriedade é relacionada a cor
   * @param {string} prop - Nome da propriedade
   * @returns {boolean} Se é propriedade de cor
   */
  isColorProperty(prop) {
    const colorProperties = [
      'color',
      'background-color',
      'border-color',
      'border-top-color',
      'border-right-color',
      'border-bottom-color',
      'border-left-color',
      'outline-color',
      'box-shadow',
      'text-shadow'
    ];
    
    return colorProperties.includes(prop);
  }

  /**
   * Validar CSS processado
   * @param {string} content - Conteúdo processado
   * @returns {boolean} Se o CSS é válido
   */
  validateProcessedCss(content) {
    // Verificações básicas de sintaxe CSS
    const openBraces = (content.match(/{/g) || []).length;
    const closeBraces = (content.match(/}/g) || []).length;
    
    if (openBraces !== closeBraces) {
      this.log('error', 'CSS inválido: chaves desbalanceadas');
      return false;
    }

    // Verificar se ainda há referências a --tw-bg-opacity
    if (content.includes('--tw-bg-opacity')) {
      this.log('warn', 'Ainda há referências a --tw-bg-opacity no CSS processado');
    }

    return true;
  }

  /**
   * Gerar relatório de conversão CSS
   * @param {string} originalContent - Conteúdo original
   * @param {string} processedContent - Conteúdo processado
   * @returns {object} Relatório
   */
  generateConversionReport(originalContent, processedContent) {
    const report = {
      classesConverted: 0,
      proseVariablesProcessed: 0,
      opacityVariablesRemoved: 0,
      sizeBefore: Buffer.byteLength(originalContent, 'utf8'),
      sizeAfter: Buffer.byteLength(processedContent, 'utf8')
    };

    // Contar classes convertidas
    for (const tailwindClass of Object.keys(this.colorMapping)) {
      const originalCount = (originalContent.match(new RegExp(`\\.${tailwindClass}\\b`, 'g')) || []).length;
      const processedCount = (processedContent.match(new RegExp(`\\.${tailwindClass}\\b`, 'g')) || []).length;
      
      if (originalCount > processedCount) {
        report.classesConverted += (originalCount - processedCount);
      }
    }

    // Contar variáveis prose processadas
    for (const proseVar of Object.keys(this.proseMapping.fallbacks)) {
      if (processedContent.includes(proseVar)) {
        report.proseVariablesProcessed++;
      }
    }

    // Contar variáveis de opacidade removidas
    const originalOpacity = (originalContent.match(/--tw-[\w-]*-opacity/g) || []).length;
    const processedOpacity = (processedContent.match(/--tw-[\w-]*-opacity/g) || []).length;
    report.opacityVariablesRemoved = originalOpacity - processedOpacity;

    report.compressionRatio = report.sizeBefore > 0 ? 
      ((report.sizeBefore - report.sizeAfter) / report.sizeBefore * 100).toFixed(2) + '%' : '0%';

    return report;
  }

  /**
   * Processar classes de gradiente
   * @param {string} content - Conteúdo CSS
   * @returns {Promise<string>} Conteúdo processado
   */
  async processGradientClasses(content) {
    this.log('debug', 'Processando classes de gradiente');

    for (const [tailwindClass, semanticClass] of Object.entries(this.gradientMapping)) {
      // Escapar caracteres especiais no regex
      const escapedClass = tailwindClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      
      // Criar regex para capturar a classe CSS completa
      const classRegex = new RegExp(`\\.${escapedClass}\\s*{([^}]*)}`, 'g');
      
      content = content.replace(classRegex, (match, styles) => {
        // Substituir por classe semântica com variável de gradiente
        const newStyles = `background: var(--wp--preset--gradient--${semanticClass});`;
        
        this.log('debug', `Gradiente convertido: ${tailwindClass} → ${semanticClass}`);
        
        return `.${semanticClass} { ${newStyles} }`;
      });
    }

    return content;
  }

  /**
   * Remover classes de gradiente não utilizadas
   * @param {string} content - Conteúdo CSS
   * @returns {string} Conteúdo processado
   */
  removeUnusedGradientClasses(content) {
    this.log('debug', 'Removendo classes de gradiente não utilizadas');

    // Padrões de classes auxiliares de gradiente que podem ser removidas
    const unusedPatterns = [
      /\.from-[\w-]+\s*{[^}]*}/g,
      /\.via-[\w-]+\s*{[^}]*}/g,
      /\.to-[\w-]+\s*{[^}]*}/g,
      /\.bg-gradient-to-[\w]+\s*{[^}]*}/g // Manter apenas se não está sendo usado por gradientes semânticos
    ];

    let removedCount = 0;
    
    unusedPatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        removedCount += matches.length;
        content = content.replace(pattern, '');
      }
    });

    if (removedCount > 0) {
      this.log('debug', `Removidas ${removedCount} classes de gradiente não utilizadas`);
    }

    return content;
  }
}

// PostCSS plugin setup
CssProcessor.prototype.createSemanticColorsPlugin.postcss = true;

module.exports = CssProcessor;
