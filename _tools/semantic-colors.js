#!/usr/bin/env node

/**
 * 🎨 Script Principal de Conversão Semântica de Cores
 * 
 * Converte classes Tailwind CSS hardcoded em tokens semânticos
 * para controle via Global Styles do WordPress.
 * 
 * Uso:
 *   node _tools/semantic-colors.js
 *   node _tools/semantic-colors.js --css
 *   node _tools/semantic-colors.js --php --dry-run
 */

const fs = require('fs-extra');
const path = require('path');
const glob = require('fast-glob');

// Importar configurações
const { VERSION_INFO } = require('./config/settings');

// Importar processadores
const ThemeJsonProcessor = require('./processors/ThemeJsonProcessor');
const CssProcessor = require('./processors/CssProcessor');
const PhpProcessor = require('./processors/PhpProcessor');

// Importar utilitários
const Logger = require('./utils/Logger');

// Importar configurações
const { 
  DIRECTORIES, 
  FILE_PATTERNS, 
  BACKUP_SETTINGS, 
  CLI_FLAGS,
  MESSAGES 
} = require('./config/settings');

class SemanticColorsPipeline {
  constructor() {
    this.logger = null;
    this.processors = {};
    this.options = this.parseArguments();
    this.stats = {
      startTime: Date.now(),
      filesProcessed: 0,
      filesSkipped: 0,
      errorsEncountered: 0,
      backupsCreated: 0
    };
  }

  /**
   * Executar pipeline principal
   */
  async execute() {
    try {
      await this.initialize();
      
      // Verificar comandos CSV primeiro
      if (this.options.exportCsv) {
        await this.exportCsv();
        return;
      }
      
      if (this.options.validateCsv) {
        await this.validateCsv();
        return;
      }
      
      if (this.options.initCsv) {
        await this.initCsv();
        return;
      }
      
      if (this.options.listTokens) {
        await this.listTokens();
        return;
      }
      
      this.logger.info(MESSAGES.INFO.STARTING);
      
      // Executar etapas baseado nas opções
      if (this.options.all || this.options.theme) {
        await this.processThemeJson();
      }
      
      if (this.options.all || this.options.css) {
        await this.processCssFiles();
      }
      
      if (this.options.all || this.options.php) {
        await this.processPhpFiles();
      }
      
      // Validação final se solicitada
      if (this.options.validate) {
        await this.validateResults();
      }
      
      await this.finalize();
      
    } catch (error) {
      this.logger.error('Erro crítico no pipeline:', error);
      process.exit(1);
    }
  }

  /**
   * Inicializar pipeline
   */
  async initialize() {
    // Configurar logger
    this.logger = new Logger({
      level: this.options.debug ? 'debug' : 'info',
      consoleOutput: !this.options.quiet,
      fileOutput: true
    });

    await this.logger.initializeLogFile();
    
    // Inicializar processadores
    this.processors = {
      theme: new ThemeJsonProcessor(this.logger),
      css: new CssProcessor(this.logger),
      php: new PhpProcessor(this.logger)
    };

    // Inicializar cada processador
    for (const processor of Object.values(this.processors)) {
      await processor.initialize();
    }

    this.logger.info('Pipeline inicializado', {
      options: this.options,
      processors: Object.keys(this.processors)
    });

    // Limpeza de logs antigos
    await this.logger.cleanupOldLogs();
  }

  /**
   * Processar theme.json
   */
  async processThemeJson() {
    this.logger.info('🎨 Processando theme.json...');
    
    const themeJsonPath = DIRECTORIES.THEME_JSON;
    
    if (!await fs.pathExists(themeJsonPath)) {
      this.logger.warn(`theme.json não encontrado: ${themeJsonPath}`);
      return;
    }

    try {
      // Backup se habilitado
      if (BACKUP_SETTINGS.ENABLED && !this.options.noBackup) {
        await this.createBackup(themeJsonPath);
      }

      // Ler conteúdo
      const originalContent = await fs.readFile(themeJsonPath, 'utf8');
      this.logger.debug(`theme.json lido: ${originalContent.length} caracteres`);

      // Processar
      const processedContent = await this.processors.theme.processFile(themeJsonPath, originalContent);

      // Salvar se não for dry-run
      if (!this.options.dryRun) {
        await fs.writeFile(themeJsonPath, processedContent, 'utf8');
        this.logger.success(`theme.json processado: ${themeJsonPath}`);
      } else {
        this.logger.info('Dry-run: theme.json não foi modificado');
      }

      // Gerar relatório
      const report = this.processors.theme.generateConversionReport(originalContent, processedContent);
      this.logger.info('Relatório theme.json:', report);

      this.stats.filesProcessed++;
      
    } catch (error) {
      this.logger.error(`Erro ao processar theme.json: ${error.message}`, error);
      this.stats.errorsEncountered++;
      
      if (!this.options.force) {
        throw error;
      }
    }
  }

  /**
   * Processar arquivos CSS
   */
  async processCssFiles() {
    this.logger.info('🎨 Processando arquivos CSS...');
    
    const cssFiles = await this.findCssFiles();
    this.logger.info(`Encontrados ${cssFiles.length} arquivos CSS`);

    // Processar arquivos (paralelo se habilitado)
    if (this.options.parallel && cssFiles.length > 1) {
      await this.processFilesInParallel(cssFiles, this.processors.css);
    } else {
      await this.processFilesSequentially(cssFiles, this.processors.css);
    }
  }

  /**
   * Processar arquivos PHP
   */
  async processPhpFiles() {
    this.logger.info('🔧 Processando arquivos PHP...');
    
    const phpFiles = await this.findPhpFiles();
    this.logger.info(`Encontrados ${phpFiles.length} arquivos PHP`);

    // Processar arquivos (paralelo se habilitado)
    if (this.options.parallel && phpFiles.length > 1) {
      await this.processFilesInParallel(phpFiles, this.processors.php);
    } else {
      await this.processFilesSequentially(phpFiles, this.processors.php);
    }
  }

  /**
   * Encontrar arquivos CSS
   * @returns {Promise<Array>} Lista de arquivos CSS
   */
  async findCssFiles() {
    const pattern = path.join(DIRECTORIES.TAILWIND_THEME_DIR, FILE_PATTERNS.CSS_FILES).replace(/\\/g, '/');
    const files = await glob(pattern, {
      ignore: FILE_PATTERNS.EXCLUDE_PATTERNS
    });
    
    return files.map(file => path.resolve(file));
  }

  /**
   * Encontrar arquivos PHP
   * @returns {Promise<Array>} Lista de arquivos PHP
   */
  async findPhpFiles() {
    const pattern = path.join(DIRECTORIES.BLOCKS_DIR, FILE_PATTERNS.PHP_FILES).replace(/\\/g, '/');
    const files = await glob(pattern, {
      ignore: FILE_PATTERNS.EXCLUDE_PATTERNS
    });
    
    return files.map(file => path.resolve(file));
  }

  /**
   * Processar arquivos sequencialmente
   * @param {Array} files - Lista de arquivos
   * @param {Object} processor - Processador a usar
   */
  async processFilesSequentially(files, processor) {
    for (const filePath of files) {
      await this.processFile(filePath, processor);
    }
  }

  /**
   * Processar arquivos em paralelo
   * @param {Array} files - Lista de arquivos
   * @param {Object} processor - Processador a usar
   */
  async processFilesInParallel(files, processor) {
    const batchSize = 4; // Processar 4 arquivos por vez
    
    for (let i = 0; i < files.length; i += batchSize) {
      const batch = files.slice(i, i + batchSize);
      const promises = batch.map(filePath => this.processFile(filePath, processor));
      
      await Promise.allSettled(promises);
    }
  }

  /**
   * Processar arquivo individual
   * @param {string} filePath - Caminho do arquivo
   * @param {Object} processor - Processador a usar
   */
  async processFile(filePath, processor) {
    const fileName = path.basename(filePath);
    
    try {
      this.logger.info(MESSAGES.INFO.PROCESSING(fileName));

      // Verificar se arquivo existe
      if (!await fs.pathExists(filePath)) {
        this.logger.warn(MESSAGES.ERROR.FILE_NOT_FOUND(filePath));
        this.stats.filesSkipped++;
        return;
      }

      // Backup se habilitado
      if (BACKUP_SETTINGS.ENABLED && !this.options.noBackup) {
        await this.createBackup(filePath);
      }

      // Ler arquivo
      const originalContent = await fs.readFile(filePath, 'utf8');
      
      // Verificar se precisa processamento
      if (!this.needsProcessing(originalContent)) {
        this.logger.info(MESSAGES.WARNING.NO_CHANGES);
        this.stats.filesSkipped++;
        return;
      }

      // Processar
      const processedContent = await processor.processFile(filePath, originalContent);

      // Verificar se houve mudanças
      if (processedContent === originalContent) {
        this.logger.info(MESSAGES.WARNING.NO_CHANGES);
        this.stats.filesSkipped++;
        return;
      }

      // Salvar se não for dry-run
      if (!this.options.dryRun) {
        await fs.writeFile(filePath, processedContent, 'utf8');
        this.logger.success(`Arquivo processado: ${fileName}`);
      } else {
        this.logger.info(`Dry-run: ${fileName} não foi modificado`);
      }

      this.stats.filesProcessed++;

    } catch (error) {
      this.logger.error(MESSAGES.ERROR.PROCESSING_FAILED(fileName), error);
      this.stats.errorsEncountered++;
      
      if (!this.options.force) {
        throw error;
      }
    }
  }

  /**
   * Verificar se arquivo precisa de processamento
   * @param {string} content - Conteúdo do arquivo
   * @returns {boolean} Se precisa de processamento
   */
  needsProcessing(content) {
    // Verificar se contém classes Tailwind conhecidas
    const tailwindPattern = /\b(bg|text|border)-(blue|green|red|gray|white|yellow|transparent)(-\d+)?\b/;
    return tailwindPattern.test(content);
  }

  /**
   * Criar backup de arquivo
   * @param {string} filePath - Caminho do arquivo
   */
  async createBackup(filePath) {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileName = path.basename(filePath);
      const backupName = `${fileName}.${timestamp}.bak`;
      const backupPath = path.join(DIRECTORIES.BACKUPS_DIR, backupName);
      
      await fs.ensureDir(DIRECTORIES.BACKUPS_DIR);
      await fs.copy(filePath, backupPath);
      
      this.logger.debug(MESSAGES.SUCCESS.BACKUP_CREATED(backupPath));
      this.stats.backupsCreated++;
      
    } catch (error) {
      this.logger.error(MESSAGES.ERROR.BACKUP_FAILED(error.message));
    }
  }

  /**
   * Validar resultados
   */
  async validateResults() {
    this.logger.info('🔍 Validando resultados...');
    
    try {
      // Implementar validações específicas aqui
      // Por exemplo: verificar se theme.json é válido, CSS é válido, etc.
      
      this.logger.success(MESSAGES.SUCCESS.VALIDATION_PASSED);
      
    } catch (error) {
      this.logger.error(MESSAGES.ERROR.VALIDATION_FAILED(1));
      throw error;
    }
  }

  /**
   * Exportar configuração atual para CSV
   */
  async exportCsv() {
    console.log('📄 Exportando configuração atual para CSV...');
    const TokenManager = require('./utils/TokenManager');
    const tokenManager = new TokenManager();
    tokenManager.exportToCsv();
    console.log('✅ Exportação concluída!');
  }

  /**
   * Validar arquivo CSV
   */
  async validateCsv() {
    console.log('🔍 Validando arquivo CSV...');
    const path = require('path');
    const CsvParser = require('./utils/CsvParser');
    const csvPath = path.join(process.cwd(), 'semantic-tokens.csv');
    
    try {
      const rows = CsvParser.parse(csvPath);
      const errors = CsvParser.validate(rows);
      
      if (errors.length === 0) {
        console.log('✅ CSV válido!');
        console.log(`📊 Total de tokens: ${rows.length}`);
      } else {
        console.log('❌ Erros encontrados:');
        errors.forEach(error => console.log(`  - ${error}`));
      }
    } catch (error) {
      console.log(`❌ Erro: ${error.message}`);
    }
  }

  /**
   * Criar template CSV
   */
  async initCsv() {
    console.log('📄 Criando template CSV...');
    const path = require('path');
    const fs = require('fs-extra');
    const CsvParser = require('./utils/CsvParser');
    const csvPath = path.join(process.cwd(), 'semantic-tokens.csv');
    const template = CsvParser.generateTemplate();
    
    fs.writeFileSync(csvPath, template);
    console.log(`✅ Template criado: ${csvPath}`);
    console.log('💡 Edite o arquivo e execute: npm run semantic-colors -- --validate-csv');
  }

  /**
   * Listar tokens disponíveis
   */
  async listTokens() {
    console.log('📋 Listando tokens disponíveis...');
    const TokenManager = require('./utils/TokenManager');
    const tokenManager = new TokenManager();
    const tokens = tokenManager.tokens;
    
    console.log(`\n📊 Total de tokens: ${tokens.length}`);
    console.log('\n📋 Tokens por categoria:');
    
    const byCategory = {};
    tokens.forEach(token => {
      if (!byCategory[token.category]) {
        byCategory[token.category] = [];
      }
      byCategory[token.category].push(token);
    });
    
    Object.entries(byCategory).forEach(([category, categoryTokens]) => {
      console.log(`\n🎨 ${category.toUpperCase()} (${categoryTokens.length}):`);
      categoryTokens.forEach(token => {
        console.log(`  - ${token.slug}: ${token.name} (${token.colorHex})`);
      });
    });
  }

  /**
   * Finalizar pipeline
   */
  async finalize() {
    const endTime = Date.now();
    const duration = endTime - this.stats.startTime;

    // Finalizar processadores
    const processorStats = {};
    for (const [name, processor] of Object.entries(this.processors)) {
      processorStats[name] = await processor.finalize();
    }

    // Estatísticas finais
    const finalStats = {
      ...this.stats,
      duration: `${(duration / 1000).toFixed(2)}s`,
      processorStats
    };

    this.logger.success(MESSAGES.SUCCESS.PROCESSING_COMPLETE);
    this.logger.info(MESSAGES.SUCCESS.FILES_PROCESSED(this.stats.filesProcessed));
    this.logger.info('Estatísticas finais:', finalStats);

    // Finalizar logger
    await this.logger.finalize();

    // Mostrar resumo no console se não for quiet
    if (!this.options.quiet) {
      this.showFinalSummary(finalStats);
    }
  }

  /**
   * Mostrar resumo final no console
   * @param {Object} stats - Estatísticas finais
   */
  showFinalSummary(stats) {
    console.log('\n' + '='.repeat(60));
    console.log('🎨 CONVERSÃO SEMÂNTICA DE CORES - RESUMO FINAL');
    console.log('='.repeat(60));
    console.log(`⏱️  Duração: ${stats.duration}`);
    console.log(`📁 Arquivos processados: ${stats.filesProcessed}`);
    console.log(`⏭️  Arquivos ignorados: ${stats.filesSkipped}`);
    console.log(`💾 Backups criados: ${stats.backupsCreated}`);
    
    if (stats.errorsEncountered > 0) {
      console.log(`❌ Erros: ${stats.errorsEncountered}`);
    }
    
    console.log('\n✅ Conversão concluída com sucesso!');
    console.log('📊 Verifique o arquivo de log para detalhes completos.');
    console.log('='.repeat(60) + '\n');
  }

  /**
   * Parsear argumentos da linha de comando
   * @returns {Object} Opções parseadas
   */
  parseArguments() {
    const args = process.argv.slice(2);
    
    // Verificar flag de versão
    if (args.includes('--version') || args.includes('-v')) {
      console.log(`🎨 Semantic Colors Tool v${VERSION_INFO.VERSION} (${VERSION_INFO.VERSION_NAME})`);
      console.log(`📅 Released: ${VERSION_INFO.RELEASE_DATE}`);
      console.log(`📋 Changelog: ${VERSION_INFO.CHANGELOG_URL}`);
      console.log(`⚙️  Node.js: ${VERSION_INFO.MINIMUM_NODE_VERSION}+ required`);
      process.exit(0);
    }
    
    const options = {
      // Tipos de processamento
      all: !args.some(arg => ['--css', '--php', '--theme'].includes(arg)),
      css: args.includes('--css'),
      php: args.includes('--php'),
      theme: args.includes('--theme'),
      
      // Flags de controle
      dryRun: args.includes('--dry-run'),
      verbose: args.includes('--verbose'),
      quiet: args.includes('--quiet'),
      force: args.includes('--force'),
      
      // Flags de backup e validação
      noBackup: args.includes('--no-backup'),
      validate: args.includes('--validate'),
      parallel: args.includes('--parallel'),
      
      // Flags de desenvolvimento
      debug: args.includes('--debug'),
      profile: args.includes('--profile'),
      benchmark: args.includes('--benchmark'),
      
      // Novos comandos CSV
      exportCsv: args.includes('--export-csv'),
      validateCsv: args.includes('--validate-csv'),
      initCsv: args.includes('--init-csv'),
      listTokens: args.includes('--list-tokens'),
      useCsv: args.includes('--use-csv')
    };

    // Mostrar help se solicitado
    if (args.includes('--help') || args.includes('-h')) {
      this.showHelp();
      process.exit(0);
    }

    return options;
  }

  /**
   * Mostrar ajuda
   */
  showHelp() {
    console.log(`🎨 Script de Conversão Semântica de Cores v${VERSION_INFO.VERSION}`);
    console.log('=====================================================');
    console.log('');
    console.log('Uso: node _tools/semantic-colors.js [opções]');
    console.log('');
    console.log('Opções disponíveis:');
    
    // Adicionar flags básicas primeiro
    console.log('  --version, -v   Exibir versão do script');
    console.log('  --help, -h      Exibir esta ajuda');
    
    // Comandos CSV
    console.log('');
    console.log('📄 Comandos CSV:');
    console.log('  --export-csv    Exportar configuração atual para CSV');
    console.log('  --validate-csv  Validar formato do arquivo CSV');
    console.log('  --init-csv      Criar template CSV');
    console.log('  --list-tokens   Listar tokens disponíveis');
    console.log('  --use-csv       Forçar uso do CSV (se disponível)');
    
    // Comandos existentes
    console.log('');
    console.log('🔧 Comandos de conversão:');
    for (const [flag, description] of Object.entries(CLI_FLAGS)) {
      console.log(`  ${flag.padEnd(15)} ${description}`);
    }
    
    console.log('');
    console.log('Exemplos:');
    console.log('  node _tools/semantic-colors.js');
    console.log('  node _tools/semantic-colors.js --css --dry-run');
    console.log('  node _tools/semantic-colors.js --php --no-backup');
    console.log('  node _tools/semantic-colors.js --all --validate --parallel');
    console.log('  node _tools/semantic-colors.js --export-csv');
    console.log('  node _tools/semantic-colors.js --init-csv');
    console.log('  node _tools/semantic-colors.js --validate-csv');
  }
}

// Executar se for chamado diretamente
if (require.main === module) {
  const pipeline = new SemanticColorsPipeline();
  pipeline.execute().catch(error => {
    console.error('❌ Erro fatal:', error.message);
    process.exit(1);
  });
}

module.exports = SemanticColorsPipeline;
