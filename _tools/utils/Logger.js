/**
 * Sistema de Logging Avançado
 * 
 * Fornece logging detalhado com diferentes níveis,
 * saída para arquivo e console, e formatação em Markdown.
 */

const fs = require('fs-extra');
const path = require('path');
const { LOGGING_SETTINGS, DIRECTORIES } = require('../config/settings');

class Logger {
  constructor(options = {}) {
    this.options = {
      level: options.level || LOGGING_SETTINGS.LEVEL,
      consoleOutput: options.consoleOutput !== undefined ? options.consoleOutput : LOGGING_SETTINGS.CONSOLE_OUTPUT,
      fileOutput: options.fileOutput !== undefined ? options.fileOutput : LOGGING_SETTINGS.FILE_OUTPUT,
      format: options.format || LOGGING_SETTINGS.LOG_FORMAT,
      includePerformance: options.includePerformance !== undefined ? options.includePerformance : LOGGING_SETTINGS.INCLUDE_PERFORMANCE
    };

    this.levels = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3
    };

    this.logs = [];
    this.startTime = Date.now();
    this.logFile = null;
    this.performanceMetrics = {
      operations: [],
      memorySnapshots: [],
      timings: {}
    };

    this.initializeLogFile();
  }

  /**
   * Inicializar arquivo de log
   */
  async initializeLogFile() {
    if (!this.options.fileOutput) return;

    try {
      await fs.ensureDir(DIRECTORIES.LOGS_DIR);
      
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileName = `semantic-colors-${timestamp}.md`;
      this.logFile = path.join(DIRECTORIES.LOGS_DIR, fileName);

      // Criar cabeçalho do arquivo de log
      const header = this.createLogHeader();
      await fs.writeFile(this.logFile, header);

      this.log('info', `Log inicializado: ${this.logFile}`);
    } catch (error) {
      console.error('Erro ao inicializar arquivo de log:', error);
    }
  }

  /**
   * Criar cabeçalho do arquivo de log
   * @returns {string} Cabeçalho em Markdown
   */
  createLogHeader() {
    const timestamp = new Date().toISOString();
    return `# 🎨 Log de Conversão Semântica de Cores

**Data/Hora:** ${timestamp}  
**Versão:** 1.0.0  
**Ambiente:** ${process.env.NODE_ENV || 'production'}

---

## 📊 Resumo da Execução

| Métrica | Valor |
|---------|-------|
| Início | ${new Date(this.startTime).toISOString()} |
| Status | 🔄 Em execução |

---

## 📝 Log Detalhado

`;
  }

  /**
   * Log principal
   * @param {string} level - Nível do log
   * @param {string} message - Mensagem
   * @param {any} data - Dados adicionais
   */
  log(level, message, data = null) {
    if (!this.shouldLog(level)) return;

    const logEntry = this.createLogEntry(level, message, data);
    this.logs.push(logEntry);

    // Saída para console
    if (this.options.consoleOutput) {
      this.outputToConsole(logEntry);
    }

    // Saída para arquivo
    if (this.options.fileOutput && this.logFile) {
      this.outputToFile(logEntry);
    }
  }

  /**
   * Log de debug
   * @param {string} message - Mensagem
   * @param {any} data - Dados adicionais
   */
  debug(message, data = null) {
    this.log('debug', message, data);
  }

  /**
   * Log de informação
   * @param {string} message - Mensagem
   * @param {any} data - Dados adicionais
   */
  info(message, data = null) {
    this.log('info', message, data);
  }

  /**
   * Log de aviso
   * @param {string} message - Mensagem
   * @param {any} data - Dados adicionais
   */
  warn(message, data = null) {
    this.log('warn', message, data);
  }

  /**
   * Log de erro
   * @param {string} message - Mensagem
   * @param {any} data - Dados adicionais
   */
  error(message, data = null) {
    this.log('error', message, data);
  }

  /**
   * Log de sucesso (info level com emoji)
   * @param {string} message - Mensagem
   * @param {any} data - Dados adicionais
   */
  success(message, data = null) {
    this.log('info', `✅ ${message}`, data);
  }

  /**
   * Verificar se deve fazer log do nível
   * @param {string} level - Nível a verificar
   * @returns {boolean} Se deve fazer log
   */
  shouldLog(level) {
    const currentLevel = this.levels[this.options.level] || 1;
    const messageLevel = this.levels[level] || 1;
    return messageLevel >= currentLevel;
  }

  /**
   * Criar entrada de log
   * @param {string} level - Nível
   * @param {string} message - Mensagem
   * @param {any} data - Dados
   * @returns {object} Entrada de log
   */
  createLogEntry(level, message, data) {
    const timestamp = new Date().toISOString();
    const memoryUsage = process.memoryUsage();
    
    return {
      timestamp,
      level,
      message,
      data,
      memory: {
        heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024), // MB
        heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024), // MB
        rss: Math.round(memoryUsage.rss / 1024 / 1024) // MB
      },
      duration: Date.now() - this.startTime
    };
  }

  /**
   * Saída para console
   * @param {object} logEntry - Entrada de log
   */
  outputToConsole(logEntry) {
    const { timestamp, level, message, data, memory } = logEntry;
    const timeStr = new Date(timestamp).toLocaleTimeString();
    
    // Cores por nível
    const colors = {
      debug: '\x1b[36m', // Cyan
      info: '\x1b[32m',  // Green
      warn: '\x1b[33m',  // Yellow
      error: '\x1b[31m'  // Red
    };
    
    const reset = '\x1b[0m';
    const color = colors[level] || '';
    
    let output = `${color}[${timeStr}] [${level.toUpperCase()}]${reset} ${message}`;
    
    if (this.options.includePerformance) {
      output += ` ${color}(${memory.heapUsed}MB)${reset}`;
    }
    
    console.log(output);
    
    if (data) {
      console.log('  Data:', data);
    }
  }

  /**
   * Saída para arquivo
   * @param {object} logEntry - Entrada de log
   */
  async outputToFile(logEntry) {
    try {
      const formatted = this.formatLogEntry(logEntry);
      await fs.appendFile(this.logFile, formatted + '\n');
    } catch (error) {
      console.error('Erro ao escrever no arquivo de log:', error);
    }
  }

  /**
   * Formatar entrada de log para arquivo
   * @param {object} logEntry - Entrada de log
   * @returns {string} Log formatado
   */
  formatLogEntry(logEntry) {
    const { timestamp, level, message, data, memory, duration } = logEntry;
    
    switch (this.options.format) {
      case 'markdown':
        return this.formatMarkdown(logEntry);
      case 'json':
        return JSON.stringify(logEntry);
      case 'text':
      default:
        return `[${timestamp}] [${level.toUpperCase()}] ${message}${data ? ' | Data: ' + JSON.stringify(data) : ''}`;
    }
  }

  /**
   * Formatar em Markdown
   * @param {object} logEntry - Entrada de log
   * @returns {string} Log em Markdown
   */
  formatMarkdown(logEntry) {
    const { timestamp, level, message, data, memory, duration } = logEntry;
    const timeStr = new Date(timestamp).toLocaleTimeString();
    
    // Emojis por nível
    const emojis = {
      debug: '🐛',
      info: 'ℹ️',
      warn: '⚠️',
      error: '❌'
    };
    
    const emoji = emojis[level] || 'ℹ️';
    let formatted = `**${timeStr}** ${emoji} **${level.toUpperCase()}:** ${message}`;
    
    if (this.options.includePerformance) {
      formatted += ` *(${memory.heapUsed}MB, +${duration}ms)*`;
    }
    
    if (data) {
      if (typeof data === 'object') {
        formatted += '\n```json\n' + JSON.stringify(data, null, 2) + '\n```';
      } else {
        formatted += `\n> ${data}`;
      }
    }
    
    return formatted;
  }

  /**
   * Registrar operação de performance
   * @param {string} operationName - Nome da operação
   * @param {number} duration - Duração em ms
   * @param {object} metadata - Metadados adicionais
   */
  logPerformance(operationName, duration, metadata = {}) {
    if (!this.options.includePerformance) return;

    const perfEntry = {
      name: operationName,
      duration,
      timestamp: Date.now(),
      memory: process.memoryUsage(),
      ...metadata
    };

    this.performanceMetrics.operations.push(perfEntry);
    this.debug(`Performance: ${operationName}`, {
      duration: `${duration.toFixed(2)}ms`,
      ...metadata
    });
  }

  /**
   * Snapshot de memória
   * @param {string} label - Label do snapshot
   */
  memorySnapshot(label) {
    if (!this.options.includePerformance) return;

    const snapshot = {
      label,
      timestamp: Date.now(),
      memory: process.memoryUsage()
    };

    this.performanceMetrics.memorySnapshots.push(snapshot);
    this.debug(`Memory snapshot: ${label}`, snapshot.memory);
  }

  /**
   * Finalizar logging e gerar resumo
   * @returns {object} Estatísticas finais
   */
  async finalize() {
    const endTime = Date.now();
    const totalDuration = endTime - this.startTime;
    
    // Estatísticas dos logs
    const stats = this.generateLogStats();
    
    // Performance summary
    const perfSummary = this.generatePerformanceSummary();
    
    // Log final
    this.success('Logging finalizado', {
      totalDuration: `${totalDuration}ms`,
      totalLogs: this.logs.length,
      ...stats
    });

    // Escrever resumo final no arquivo
    if (this.options.fileOutput && this.logFile) {
      await this.writeFinalSummary(stats, perfSummary, totalDuration);
    }

    return {
      stats,
      perfSummary,
      totalDuration,
      logFile: this.logFile
    };
  }

  /**
   * Gerar estatísticas dos logs
   * @returns {object} Estatísticas
   */
  generateLogStats() {
    const stats = {
      debug: 0,
      info: 0,
      warn: 0,
      error: 0
    };

    this.logs.forEach(log => {
      stats[log.level] = (stats[log.level] || 0) + 1;
    });

    return stats;
  }

  /**
   * Gerar resumo de performance
   * @returns {object} Resumo de performance
   */
  generatePerformanceSummary() {
    if (!this.options.includePerformance) return {};

    const operations = this.performanceMetrics.operations;
    
    if (operations.length === 0) return {};

    const totalTime = operations.reduce((sum, op) => sum + op.duration, 0);
    const avgTime = totalTime / operations.length;
    const slowestOp = operations.reduce((slowest, op) => 
      op.duration > slowest.duration ? op : slowest, operations[0]);

    return {
      totalOperations: operations.length,
      totalTime: `${totalTime.toFixed(2)}ms`,
      averageTime: `${avgTime.toFixed(2)}ms`,
      slowestOperation: {
        name: slowestOp.name,
        duration: `${slowestOp.duration.toFixed(2)}ms`
      }
    };
  }

  /**
   * Escrever resumo final no arquivo
   * @param {object} stats - Estatísticas
   * @param {object} perfSummary - Resumo de performance
   * @param {number} totalDuration - Duração total
   */
  async writeFinalSummary(stats, perfSummary, totalDuration) {
    const summary = `

---

## 📈 Resumo Final

### ⏱️ Duração Total
**${(totalDuration / 1000).toFixed(2)}s** (${totalDuration}ms)

### 📊 Estatísticas de Log
| Nível | Quantidade |
|-------|------------|
| Debug | ${stats.debug} |
| Info | ${stats.info} |
| Warn | ${stats.warn} |
| Error | ${stats.error} |
| **Total** | **${this.logs.length}** |

${this.options.includePerformance && Object.keys(perfSummary).length > 0 ? `
### ⚡ Performance
| Métrica | Valor |
|---------|-------|
| Operações | ${perfSummary.totalOperations} |
| Tempo Total | ${perfSummary.totalTime} |
| Tempo Médio | ${perfSummary.averageTime} |
| Operação Mais Lenta | ${perfSummary.slowestOperation?.name} (${perfSummary.slowestOperation?.duration}) |
` : ''}

### 🏁 Status Final
${stats.error > 0 ? '❌ **COMPLETADO COM ERROS**' : '✅ **COMPLETADO COM SUCESSO**'}

---

*Log gerado automaticamente pelo sistema de conversão semântica de cores.*
`;

    try {
      await fs.appendFile(this.logFile, summary);
    } catch (error) {
      console.error('Erro ao escrever resumo final:', error);
    }
  }

  /**
   * Limpar logs antigos
   * @param {number} maxLogs - Máximo de logs a manter
   */
  async cleanupOldLogs(maxLogs = LOGGING_SETTINGS.MAX_LOG_FILES) {
    try {
      const files = await fs.readdir(DIRECTORIES.LOGS_DIR);
      const logFiles = files
        .filter(file => file.startsWith('semantic-colors-') && file.endsWith('.md'))
        .map(file => ({
          name: file,
          path: path.join(DIRECTORIES.LOGS_DIR, file),
          stat: fs.statSync(path.join(DIRECTORIES.LOGS_DIR, file))
        }))
        .sort((a, b) => b.stat.mtime - a.stat.mtime);

      if (logFiles.length > maxLogs) {
        const filesToDelete = logFiles.slice(maxLogs);
        
        for (const file of filesToDelete) {
          await fs.unlink(file.path);
          this.debug(`Log antigo removido: ${file.name}`);
        }
      }
    } catch (error) {
      this.error('Erro ao limpar logs antigos', error);
    }
  }
}

module.exports = Logger;
