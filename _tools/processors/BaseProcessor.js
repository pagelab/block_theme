/**
 * Classe base para todos os processadores de arquivo
 * 
 * Fornece funcionalidades comuns como logging, cache,
 * validação e tratamento de erros.
 */

const fs = require('fs-extra');
const path = require('path');
const { PERFORMANCE_SETTINGS, VALIDATION_SETTINGS } = require('../config/settings');

class BaseProcessor {
  constructor(logger = null) {
    this.logger = logger;
    this.regexCache = new Map();
    this.operationStats = {
      filesProcessed: 0,
      operationsPerformed: 0,
      errorsEncountered: 0,
      startTime: null,
      endTime: null
    };
    
    // Configurações padrão
    this.config = {
      timeout: PERFORMANCE_SETTINGS.FILE_PROCESSING_TIMEOUT,
      maxMemory: PERFORMANCE_SETTINGS.MAX_MEMORY_USAGE,
      strictMode: VALIDATION_SETTINGS.STRICT_MODE
    };
  }

  /**
   * Inicializar processador
   */
  async initialize() {
    this.operationStats.startTime = Date.now();
    this.log('info', `Inicializando ${this.constructor.name}`);
  }

  /**
   * Finalizar processador e gerar estatísticas
   */
  async finalize() {
    this.operationStats.endTime = Date.now();
    const duration = this.operationStats.endTime - this.operationStats.startTime;
    
    this.log('info', `${this.constructor.name} finalizado`, {
      filesProcessed: this.operationStats.filesProcessed,
      operationsPerformed: this.operationStats.operationsPerformed,
      errorsEncountered: this.operationStats.errorsEncountered,
      durationMs: duration
    });

    return this.operationStats;
  }

  /**
   * Processar um arquivo (método abstrato)
   * @param {string} filePath - Caminho do arquivo
   * @param {string} content - Conteúdo do arquivo
   * @returns {Promise<string>} Conteúdo processado
   */
  async processFile(filePath, content) {
    throw new Error('processFile deve ser implementado pela classe filha');
  }

  /**
   * Validar arquivo antes do processamento
   * @param {string} filePath - Caminho do arquivo
   * @param {string} content - Conteúdo do arquivo
   * @returns {boolean} Se o arquivo é válido
   */
  validateFile(filePath, content) {
    // Validações básicas
    if (!content || content.trim().length === 0) {
      this.log('warn', `Arquivo vazio: ${filePath}`);
      return false;
    }

    // Verificar tamanho máximo
    const sizeInMB = Buffer.byteLength(content, 'utf8') / (1024 * 1024);
    if (sizeInMB > 50) { // 50MB
      this.log('warn', `Arquivo muito grande (${sizeInMB.toFixed(2)}MB): ${filePath}`);
      if (this.config.strictMode) {
        return false;
      }
    }

    return true;
  }

  /**
   * Cache de regex compiladas para performance
   * @param {string} pattern - Padrão da regex
   * @param {string} flags - Flags da regex
   * @returns {RegExp} Regex compilada
   */
  getCachedRegex(pattern, flags = 'g') {
    const key = `${pattern}::${flags}`;
    
    if (!this.regexCache.has(key)) {
      if (this.regexCache.size >= PERFORMANCE_SETTINGS.REGEX_CACHE_SIZE) {
        // Limpar cache quando atingir o limite
        const firstKey = this.regexCache.keys().next().value;
        this.regexCache.delete(firstKey);
      }
      
      try {
        this.regexCache.set(key, new RegExp(pattern, flags));
      } catch (error) {
        this.log('error', `Erro ao compilar regex: ${pattern}`, error);
        throw error;
      }
    }
    
    return this.regexCache.get(key);
  }

  /**
   * Escapar string para uso em regex
   * @param {string} string - String a escapar
   * @returns {string} String escapada
   */
  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Verificar se um índice está dentro de uma string ou comentário
   * @param {string} content - Conteúdo do arquivo
   * @param {number} index - Índice a verificar
   * @returns {boolean} Se está em string/comentário
   */
  isInStringOrComment(content, index) {
    // Implementação básica - pode ser sobrescrita pelas classes filhas
    const beforeIndex = content.substring(0, index);
    
    // Verificar se está em comentário de linha
    const lastLineBreak = beforeIndex.lastIndexOf('\n');
    const currentLine = beforeIndex.substring(lastLineBreak);
    if (currentLine.includes('//')) {
      return true;
    }
    
    // Verificar se está em comentário de bloco
    const openComment = beforeIndex.lastIndexOf('/*');
    const closeComment = beforeIndex.lastIndexOf('*/');
    if (openComment > closeComment) {
      return true;
    }
    
    // Verificar se está em string (implementação básica)
    const quotes = (beforeIndex.match(/"/g) || []).length;
    const singleQuotes = (beforeIndex.match(/'/g) || []).length;
    
    return (quotes % 2 === 1) || (singleQuotes % 2 === 1);
  }

  /**
   * Realizar backup de um arquivo
   * @param {string} filePath - Caminho do arquivo original
   * @returns {Promise<string>} Caminho do backup
   */
  async createBackup(filePath) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.resolve(__dirname, '../backups');
    await fs.ensureDir(backupDir);
    
    const originalName = path.basename(filePath);
    const backupName = `${originalName}.${timestamp}.bak`;
    const backupPath = path.join(backupDir, backupName);
    
    await fs.copy(filePath, backupPath);
    this.log('info', `Backup criado: ${backupPath}`);
    
    return backupPath;
  }

  /**
   * Salvar arquivo processado
   * @param {string} filePath - Caminho do arquivo
   * @param {string} content - Conteúdo processado
   * @returns {Promise<void>}
   */
  async saveFile(filePath, content) {
    try {
      await fs.writeFile(filePath, content, 'utf8');
      this.operationStats.filesProcessed++;
      this.log('info', `Arquivo salvo: ${filePath}`);
    } catch (error) {
      this.operationStats.errorsEncountered++;
      this.log('error', `Erro ao salvar arquivo: ${filePath}`, error);
      throw error;
    }
  }

  /**
   * Log com diferentes níveis
   * @param {string} level - Nível do log
   * @param {string} message - Mensagem
   * @param {any} data - Dados adicionais
   */
  log(level, message, data = null) {
    if (this.logger) {
      this.logger.log(level, message, data);
    } else {
      // Fallback para console
      const timestamp = new Date().toISOString();
      const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
      
      if (data) {
        console.log(logMessage, data);
      } else {
        console.log(logMessage);
      }
    }
  }

  /**
   * Medir performance de uma operação
   * @param {string} operationName - Nome da operação
   * @param {Function} operation - Função a executar
   * @returns {Promise<any>} Resultado da operação
   */
  async measurePerformance(operationName, operation) {
    const startTime = process.hrtime.bigint();
    const startMemory = process.memoryUsage();
    
    try {
      const result = await operation();
      
      const endTime = process.hrtime.bigint();
      const endMemory = process.memoryUsage();
      
      const durationMs = Number(endTime - startTime) / 1000000; // Convert to milliseconds
      const memoryDelta = endMemory.heapUsed - startMemory.heapUsed;
      
      this.log('debug', `Performance - ${operationName}`, {
        duration: `${durationMs.toFixed(2)}ms`,
        memoryDelta: `${(memoryDelta / 1024 / 1024).toFixed(2)}MB`
      });
      
      return result;
    } catch (error) {
      this.log('error', `Erro em ${operationName}`, error);
      throw error;
    }
  }

  /**
   * Limpar cache e recursos
   */
  cleanup() {
    this.regexCache.clear();
    this.log('debug', 'Cache e recursos limpos');
  }
}

module.exports = BaseProcessor;
