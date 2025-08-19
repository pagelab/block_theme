/**
 * Motor de Validação
 * 
 * Sistema para validar arquivos processados e verificar
 * a integridade da conversão semântica.
 */

const fs = require('fs-extra');
const path = require('path');
const { SEMANTIC_COLOR_MAPPING } = require('../config/color-mapping');

class ValidationEngine {
  constructor(logger = null) {
    this.logger = logger;
    this.validators = [
      this.validateThemeJson.bind(this),
      this.validateCssFiles.bind(this),
      this.validatePhpFiles.bind(this)
    ];
    this.errors = [];
    this.warnings = [];
  }

  /**
   * Executar todas as validações
   * @returns {Promise<Object>} Resultado da validação
   */
  async validateAll() {
    this.log('info', 'Iniciando validação completa...');
    
    this.errors = [];
    this.warnings = [];

    for (const validator of this.validators) {
      try {
        await validator();
      } catch (error) {
        this.errors.push({
          validator: validator.name,
          error: error.message,
          details: error
        });
      }
    }

    const result = {
      valid: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
      summary: {
        totalValidators: this.validators.length,
        errorsFound: this.errors.length,
        warningsFound: this.warnings.length
      }
    };

    this.log('info', 'Validação concluída', result.summary);

    return result;
  }

  /**
   * Validar theme.json
   */
  async validateThemeJson() {
    this.log('debug', 'Validando theme.json...');
    
    const themeJsonPath = path.resolve(__dirname, '../../theme.json');
    
    if (!await fs.pathExists(themeJsonPath)) {
      this.addError('theme.json não encontrado');
      return;
    }

    try {
      const content = await fs.readFile(themeJsonPath, 'utf8');
      const themeData = JSON.parse(content);

      // Verificar se tem paleta de cores
      if (!themeData.settings?.color?.palette) {
        this.addError('theme.json não possui paleta de cores');
        return;
      }

      const palette = themeData.settings.color.palette;

      // Verificar se tokens semânticos estão presentes
      const semanticTokens = Object.values(SEMANTIC_COLOR_MAPPING);
      const paletteSlugs = palette.map(color => color.slug);

      const missingTokens = semanticTokens.filter(token => !paletteSlugs.includes(token));
      
      if (missingTokens.length > 0) {
        this.addError(`Tokens semânticos ausentes no theme.json: ${missingTokens.join(', ')}`);
      }

      // Verificar estrutura das cores
      for (const color of palette) {
        if (!color.color || !color.name || !color.slug) {
          this.addError(`Cor inválida na paleta: ${JSON.stringify(color)}`);
        }

        // Verificar formato de cor
        if (color.color && !this.isValidColorFormat(color.color)) {
          this.addWarning(`Formato de cor questionável: ${color.color} para ${color.slug}`);
        }
      }

      this.log('debug', `theme.json validado: ${palette.length} cores na paleta`);

    } catch (error) {
      this.addError(`Erro ao validar theme.json: ${error.message}`);
    }
  }

  /**
   * Validar arquivos CSS
   */
  async validateCssFiles() {
    this.log('debug', 'Validando arquivos CSS...');
    
    const tailwindDir = path.resolve(__dirname, '../../tailwind_theme');
    
    if (!await fs.pathExists(tailwindDir)) {
      this.addWarning('Diretório tailwind_theme não encontrado');
      return;
    }

    const cssFiles = await this.findFiles(tailwindDir, '**/*.css');

    for (const cssFile of cssFiles) {
      await this.validateCssFile(cssFile);
    }

    this.log('debug', `${cssFiles.length} arquivos CSS validados`);
  }

  /**
   * Validar arquivo CSS individual
   * @param {string} filePath - Caminho do arquivo CSS
   */
  async validateCssFile(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      const fileName = path.basename(filePath);

      // Verificar sintaxe básica CSS
      if (!this.isValidCssSyntax(content)) {
        this.addError(`Sintaxe CSS inválida em ${fileName}`);
        return;
      }

      // Verificar se ainda há referências Tailwind não convertidas
      const tailwindClasses = Object.keys(SEMANTIC_COLOR_MAPPING);
      const remainingTailwind = [];

      for (const tailwindClass of tailwindClasses) {
        const regex = new RegExp(`\\.${this.escapeRegex(tailwindClass)}\\b`);
        if (regex.test(content)) {
          remainingTailwind.push(tailwindClass);
        }
      }

      if (remainingTailwind.length > 0) {
        this.addWarning(`Classes Tailwind não convertidas em ${fileName}: ${remainingTailwind.join(', ')}`);
      }

      // Verificar se há variáveis --tw-bg-opacity
      if (content.includes('--tw-bg-opacity')) {
        this.addWarning(`Referências --tw-bg-opacity ainda presentes em ${fileName}`);
      }

      // Verificar se tokens semânticos estão sendo usados
      const semanticTokens = Object.values(SEMANTIC_COLOR_MAPPING);
      const usedTokens = [];

      for (const token of semanticTokens) {
        if (content.includes(token)) {
          usedTokens.push(token);
        }
      }

      this.log('debug', `CSS ${fileName}: ${usedTokens.length} tokens semânticos encontrados`);

    } catch (error) {
      this.addError(`Erro ao validar CSS ${path.basename(filePath)}: ${error.message}`);
    }
  }

  /**
   * Validar arquivos PHP
   */
  async validatePhpFiles() {
    this.log('debug', 'Validando arquivos PHP...');
    
    const blocksDir = path.resolve(__dirname, '../../blocks');
    
    if (!await fs.pathExists(blocksDir)) {
      this.addWarning('Diretório blocks não encontrado');
      return;
    }

    const phpFiles = await this.findFiles(blocksDir, '**/*.php');

    for (const phpFile of phpFiles) {
      await this.validatePhpFile(phpFile);
    }

    this.log('debug', `${phpFiles.length} arquivos PHP validados`);
  }

  /**
   * Validar arquivo PHP individual
   * @param {string} filePath - Caminho do arquivo PHP
   */
  async validatePhpFile(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      const fileName = path.basename(filePath);

      // Verificar se ainda há classes Tailwind não convertidas
      const tailwindClasses = Object.keys(SEMANTIC_COLOR_MAPPING);
      const remainingTailwind = [];

      for (const tailwindClass of tailwindClasses) {
        const regex = new RegExp(`\\bclass\\s*=\\s*["'][^"']*\\b${this.escapeRegex(tailwindClass)}\\b[^"']*["']`);
        if (regex.test(content)) {
          remainingTailwind.push(tailwindClass);
        }
      }

      if (remainingTailwind.length > 0) {
        this.addWarning(`Classes Tailwind não convertidas em ${fileName}: ${remainingTailwind.join(', ')}`);
      }

      // Verificar se tokens semânticos estão sendo usados
      const semanticTokens = Object.values(SEMANTIC_COLOR_MAPPING);
      const usedTokens = [];

      for (const token of semanticTokens) {
        const regex = new RegExp(`\\bclass\\s*=\\s*["'][^"']*\\b${this.escapeRegex(token)}\\b[^"']*["']`);
        if (regex.test(content)) {
          usedTokens.push(token);
        }
      }

      this.log('debug', `PHP ${fileName}: ${usedTokens.length} tokens semânticos encontrados`);

    } catch (error) {
      this.addError(`Erro ao validar PHP ${path.basename(filePath)}: ${error.message}`);
    }
  }

  /**
   * Verificar se sintaxe CSS é válida (verificação básica)
   * @param {string} content - Conteúdo CSS
   * @returns {boolean} Se a sintaxe é válida
   */
  isValidCssSyntax(content) {
    // Verificação básica de chaves balanceadas
    const openBraces = (content.match(/{/g) || []).length;
    const closeBraces = (content.match(/}/g) || []).length;
    
    return openBraces === closeBraces;
  }

  /**
   * Verificar se formato de cor é válido
   * @param {string} color - Valor da cor
   * @returns {boolean} Se o formato é válido
   */
  isValidColorFormat(color) {
    // Formatos aceitos: hex, rgb, rgba, hsl, hsla
    const colorFormats = [
      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, // hex
      /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/, // rgb
      /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/, // rgba
      /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/, // rgba format 2
      /^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/, // hsl
      /^hsla\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*,\s*[\d.]+\s*\)$/ // hsla
    ];

    return colorFormats.some(format => format.test(color));
  }

  /**
   * Encontrar arquivos por padrão
   * @param {string} directory - Diretório base
   * @param {string} pattern - Padrão glob
   * @returns {Promise<Array>} Lista de arquivos
   */
  async findFiles(directory, pattern) {
    const glob = require('fast-glob');
    const fullPattern = path.join(directory, pattern).replace(/\\/g, '/');
    
    try {
      const files = await glob(fullPattern);
      return files.map(file => path.resolve(file));
    } catch (error) {
      this.log('error', `Erro ao encontrar arquivos: ${error.message}`);
      return [];
    }
  }

  /**
   * Escapar string para regex
   * @param {string} string - String a escapar
   * @returns {string} String escapada
   */
  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Adicionar erro
   * @param {string} message - Mensagem de erro
   */
  addError(message) {
    this.errors.push(message);
    this.log('error', message);
  }

  /**
   * Adicionar aviso
   * @param {string} message - Mensagem de aviso
   */
  addWarning(message) {
    this.warnings.push(message);
    this.log('warn', message);
  }

  /**
   * Log
   * @param {string} level - Nível do log
   * @param {string} message - Mensagem
   * @param {any} data - Dados
   */
  log(level, message, data = null) {
    if (this.logger) {
      this.logger.log(level, message, data);
    }
  }

  /**
   * Gerar relatório de validação
   * @param {Object} result - Resultado da validação
   * @returns {string} Relatório formatado
   */
  generateReport(result) {
    let report = '# 📋 Relatório de Validação\n\n';

    report += `**Status:** ${result.valid ? '✅ Válido' : '❌ Inválido'}\n`;
    report += `**Erros:** ${result.errors.length}\n`;
    report += `**Avisos:** ${result.warnings.length}\n\n`;

    if (result.errors.length > 0) {
      report += '## ❌ Erros Encontrados\n\n';
      result.errors.forEach((error, index) => {
        report += `${index + 1}. ${error}\n`;
      });
      report += '\n';
    }

    if (result.warnings.length > 0) {
      report += '## ⚠️ Avisos\n\n';
      result.warnings.forEach((warning, index) => {
        report += `${index + 1}. ${warning}\n`;
      });
      report += '\n';
    }

    report += '---\n';
    report += `*Relatório gerado em ${new Date().toISOString()}*\n`;

    return report;
  }
}

module.exports = ValidationEngine;
