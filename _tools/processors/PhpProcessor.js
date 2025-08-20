/**
 * Processador de arquivos PHP
 * 
 * Responsável por substituir classes CSS do Tailwind em arquivos PHP
 * por tokens semânticos, preservando a sintaxe PHP.
 */

const BaseProcessor = require('./BaseProcessor');
const TokenManager = require('../utils/TokenManager');
const { PHP_PATTERNS } = require('../config/color-mapping');
const { chooseProcessingMethod } = require('../config/processing-matrix');

class PhpProcessor extends BaseProcessor {
  constructor(logger = null) {
    super(logger);
    this.tokenManager = new TokenManager();
    this.colorMapping = this.tokenManager.getTailwindMapping();
    this.patterns = PHP_PATTERNS;
    
    // Contextos PHP válidos para modificação
    this.validContexts = [
      'HTML_ATTRIBUTE',
      'HTML_CLASS_VALUE',
      'PHP_STRING_LITERAL'
    ];
  }

  /**
   * Processar arquivo PHP
   * @param {string} filePath - Caminho do arquivo
   * @param {string} content - Conteúdo do arquivo
   * @returns {Promise<string>} Conteúdo processado
   */
  async processFile(filePath, content) {
    this.log('info', `Processando PHP: ${filePath}`);

    if (!this.validateFile(filePath, content)) {
      throw new Error(`Arquivo PHP inválido: ${filePath}`);
    }

    const fileSize = Buffer.byteLength(content, 'utf8');
    const method = chooseProcessingMethod(filePath, fileSize, 'php');
    
    this.log('debug', `Método escolhido para ${filePath}: ${method.method}`, {
      fileSize: `${(fileSize / 1024).toFixed(2)}KB`,
      precision: method.precision,
      performance: method.performance
    });

    return await this.measurePerformance('PHP processing', async () => {
      let processedContent;

      switch (method.method) {
        case 'REGEX_CONTEXT':
          processedContent = await this.processWithRegexContext(content);
          break;
        case 'TOKEN_PARSER':
          processedContent = await this.processWithTokenParser(content);
          break;
        case 'AST_PARSER':
          processedContent = await this.processWithAstParser(content);
          break;
        default:
          // Fallback para regex com contexto
          processedContent = await this.processWithRegexContext(content);
      }

      // Validar resultado
      if (!this.validateProcessedPhp(processedContent)) {
        throw new Error(`PHP processado é inválido: ${filePath}`);
      }

      this.operationStats.operationsPerformed++;
      return processedContent;
    });
  }

  /**
   * Processamento com regex e análise de contexto
   * @param {string} content - Conteúdo PHP
   * @returns {Promise<string>} Conteúdo processado
   */
  async processWithRegexContext(content) {
    const classRegex = this.getCachedRegex('class\\s*=\\s*(["\'])([^"\']+)\\1', 'g');
    let processed = content;

    processed = processed.replace(classRegex, (match, quote, classValue, offset) => {
      // Verificar se está em contexto válido
      if (!this.isValidPhpContext(content, offset)) {
        return match;
      }

      // Processar as classes
      const processedClasses = this.processClassString(classValue);
      
      if (processedClasses !== classValue) {
        this.log('debug', `Classes convertidas: ${classValue} → ${processedClasses}`);
        return `class=${quote}${processedClasses}${quote}`;
      }

      return match;
    });

    return processed;
  }

  /**
   * Processamento com parser de tokens (mais preciso)
   * @param {string} content - Conteúdo PHP
   * @returns {Promise<string>} Conteúdo processado
   */
  async processWithTokenParser(content) {
    // Tokenizar o conteúdo PHP
    const tokens = this.tokenizePhp(content);
    let processed = content;
    let offset = 0;

    for (const token of tokens) {
      if (token.type === 'HTML_ATTRIBUTE' && token.attribute === 'class') {
        const originalValue = token.value;
        const processedValue = this.processClassString(originalValue);
        
        if (processedValue !== originalValue) {
          // Calcular posição real no conteúdo
          const realStart = token.start + offset;
          const realEnd = token.end + offset;
          
          // Substituir no conteúdo
          processed = processed.slice(0, realStart) + 
                     processedValue + 
                     processed.slice(realEnd);
          
          // Ajustar offset para próximas substituições
          offset += processedValue.length - originalValue.length;
          
          this.log('debug', `Token processado: ${originalValue} → ${processedValue}`);
        }
      }
    }

    return processed;
  }

  /**
   * Processamento com AST parser (máxima precisão)
   * @param {string} content - Conteúdo PHP
   * @returns {Promise<string>} Conteúdo processado
   */
  async processWithAstParser(content) {
    // Para arquivos grandes, usar implementação streaming
    // Por simplicidade, usar token parser como fallback
    this.log('info', 'AST parser não implementado, usando token parser');
    return await this.processWithTokenParser(content);
  }

  /**
   * Processar string de classes CSS
   * @param {string} classString - String com classes separadas por espaço
   * @returns {string} String processada
   */
  processClassString(classString) {
    if (!classString || typeof classString !== 'string') {
      return classString;
    }

    // Dividir classes por espaços
    const classes = classString.trim().split(/\s+/);
    const processedClasses = [];

    for (const className of classes) {
      // Verificar se é uma classe Tailwind mapeada
      const semanticToken = this.colorMapping[className];
      
      if (semanticToken) {
        processedClasses.push(semanticToken);
        this.log('debug', `Classe convertida: ${className} → ${semanticToken}`);
      } else {
        // Manter classe original se não for mapeada
        processedClasses.push(className);
      }
    }

    return processedClasses.join(' ');
  }

  /**
   * Verificar se uma posição está em contexto PHP válido
   * @param {string} content - Conteúdo do arquivo
   * @param {number} offset - Posição no arquivo
   * @returns {boolean} Se está em contexto válido
   */
  isValidPhpContext(content, offset) {
    // Obter contexto ao redor da posição
    const beforeContext = content.substring(Math.max(0, offset - 200), offset);
    const afterContext = content.substring(offset, Math.min(content.length, offset + 200));
    
    // Verificar se está dentro de PHP code (verificação mais robusta)
    const lastPhpOpen = beforeContext.lastIndexOf('<?php');
    const lastPhpClose = beforeContext.lastIndexOf('?>');
    
    // Se está em seção PHP pura, não processar
    if (lastPhpOpen > lastPhpClose && lastPhpOpen > -1) {
      // Verificar se não é uma string PHP ou atributo HTML dentro do PHP
      const afterPhpOpen = beforeContext.substring(lastPhpOpen);
      // Se não contém aspas ou HTML, provavelmente é PHP puro
      if (!afterPhpOpen.includes('"') && !afterPhpOpen.includes("'") && !afterPhpOpen.includes('<')) {
        return false;
      }
    }

    // Sempre processar se está em HTML/template (mais permissivo)
    return true;
  }

  /**
   * Tokenizar conteúdo PHP para análise precisa
   * @param {string} content - Conteúdo PHP
   * @returns {Array} Array de tokens
   */
  tokenizePhp(content) {
    const tokens = [];
    const classRegex = /class\s*=\s*(["'])([^"']+)\1/g;
    
    let match;
    while ((match = classRegex.exec(content)) !== null) {
      const [fullMatch, quote, classValue] = match;
      const start = match.index + fullMatch.indexOf(classValue);
      const end = start + classValue.length;
      
      // Verificar contexto
      if (this.isValidPhpContext(content, match.index)) {
        tokens.push({
          type: 'HTML_ATTRIBUTE',
          attribute: 'class',
          value: classValue,
          start: start,
          end: end,
          fullMatch: fullMatch,
          quote: quote
        });
      }
    }

    return tokens.sort((a, b) => a.start - b.start);
  }

  /**
   * Analisar contexto sintático mais detalhado
   * @param {string} content - Conteúdo
   * @param {number} position - Posição
   * @returns {object} Informações de contexto
   */
  analyzeContext(content, position) {
    const context = {
      inPhpTag: false,
      inHtmlTag: false,
      inString: false,
      inComment: false,
      tagName: null,
      stringType: null
    };

    const beforePosition = content.substring(0, position);
    
    // Analisar tags PHP
    const phpOpenTags = [...beforePosition.matchAll(/<\?php/g)];
    const phpCloseTags = [...beforePosition.matchAll(/\?>/g)];
    context.inPhpTag = phpOpenTags.length > phpCloseTags.length;

    // Analisar tags HTML
    const lastOpenTag = beforePosition.lastIndexOf('<');
    const lastCloseTag = beforePosition.lastIndexOf('>');
    context.inHtmlTag = lastOpenTag > lastCloseTag;

    if (context.inHtmlTag) {
      const tagMatch = beforePosition.substring(lastOpenTag).match(/<(\w+)/);
      context.tagName = tagMatch ? tagMatch[1] : null;
    }

    // Analisar strings
    const doubleQuotes = (beforePosition.match(/"/g) || []).length;
    const singleQuotes = (beforePosition.match(/'/g) || []).length;
    
    if (doubleQuotes % 2 === 1) {
      context.inString = true;
      context.stringType = 'double';
    } else if (singleQuotes % 2 === 1) {
      context.inString = true;
      context.stringType = 'single';
    }

    // Analisar comentários
    const lineCommentPos = beforePosition.lastIndexOf('//');
    const blockCommentStart = beforePosition.lastIndexOf('/*');
    const blockCommentEnd = beforePosition.lastIndexOf('*/');
    const newlineAfterComment = beforePosition.lastIndexOf('\n');

    if (lineCommentPos > newlineAfterComment) {
      context.inComment = true;
    } else if (blockCommentStart > blockCommentEnd) {
      context.inComment = true;
    }

    return context;
  }

  /**
   * Validar arquivo PHP processado
   * @param {string} content - Conteúdo processado
   * @returns {boolean} Se o PHP é válido
   */
  validateProcessedPhp(content) {
    // Verificações básicas de sintaxe PHP
    
    // Verificar se tags PHP estão balanceadas
    const phpOpenTags = (content.match(/<\?php/g) || []).length;
    const phpCloseTags = (content.match(/\?>/g) || []).length;
    
    // PHP não requer fechamento de tags no final do arquivo
    if (phpOpenTags < phpCloseTags) {
      this.log('error', 'PHP inválido: tags PHP desbalanceadas');
      return false;
    }

    // Verificar se ainda há classes Tailwind não convertidas
    const remainingTailwindClasses = [];
    for (const tailwindClass of Object.keys(this.colorMapping)) {
      const regex = new RegExp(`\\b${this.escapeRegex(tailwindClass)}\\b`);
      if (regex.test(content)) {
        remainingTailwindClasses.push(tailwindClass);
      }
    }

    if (remainingTailwindClasses.length > 0) {
      this.log('warn', `Classes Tailwind não convertidas: ${remainingTailwindClasses.join(', ')}`);
    }

    return true;
  }

  /**
   * Verificar se uma linha é comentário PHP
   * @param {string} line - Linha de código
   * @returns {boolean} Se é comentário
   */
  isPhpComment(line) {
    const trimmed = line.trim();
    return trimmed.startsWith('//') || 
           trimmed.startsWith('#') || 
           trimmed.startsWith('/*') ||
           trimmed.includes('*/');
  }

  /**
   * Verificar se está dentro de string PHP
   * @param {string} content - Conteúdo
   * @param {number} position - Posição
   * @returns {boolean} Se está em string
   */
  isInPhpString(content, position) {
    const beforePosition = content.substring(0, position);
    
    // Contar aspas não escapadas
    let doubleQuoteCount = 0;
    let singleQuoteCount = 0;
    
    for (let i = 0; i < beforePosition.length; i++) {
      const char = beforePosition[i];
      const prevChar = i > 0 ? beforePosition[i - 1] : '';
      
      if (char === '"' && prevChar !== '\\') {
        doubleQuoteCount++;
      } else if (char === "'" && prevChar !== '\\') {
        singleQuoteCount++;
      }
    }
    
    return (doubleQuoteCount % 2 === 1) || (singleQuoteCount % 2 === 1);
  }

  /**
   * Gerar relatório de conversão PHP
   * @param {string} originalContent - Conteúdo original
   * @param {string} processedContent - Conteúdo processado
   * @returns {object} Relatório
   */
  generateConversionReport(originalContent, processedContent) {
    const report = {
      classesConverted: 0,
      classesSkipped: 0,
      totalClassAttributes: 0,
      contextAnalyzed: 0
    };

    // Contar atributos class total
    const classRegex = /class\s*=\s*["'][^"']+["']/g;
    report.totalClassAttributes = (originalContent.match(classRegex) || []).length;

    // Contar conversões por classe
    for (const [tailwindClass, semanticToken] of Object.entries(this.colorMapping)) {
      const originalOccurrences = (originalContent.match(new RegExp(`\\b${this.escapeRegex(tailwindClass)}\\b`, 'g')) || []).length;
      const processedOccurrences = (processedContent.match(new RegExp(`\\b${this.escapeRegex(tailwindClass)}\\b`, 'g')) || []).length;
      const semanticOccurrences = (processedContent.match(new RegExp(`\\b${this.escapeRegex(semanticToken)}\\b`, 'g')) || []).length;
      
      const converted = originalOccurrences - processedOccurrences;
      if (converted > 0) {
        report.classesConverted += converted;
      }
      
      // Classes que não foram convertidas
      if (processedOccurrences > 0) {
        report.classesSkipped += processedOccurrences;
      }
    }

    report.conversionRate = report.totalClassAttributes > 0 ? 
      ((report.classesConverted / (report.classesConverted + report.classesSkipped)) * 100).toFixed(2) + '%' : '0%';

    return report;
  }
}

module.exports = PhpProcessor;
