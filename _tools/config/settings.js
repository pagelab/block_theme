/**
 * Configurações gerais do sistema de conversão semântica
 */

const path = require('path');

// Informações de versão
const VERSION_INFO = {
  VERSION: '0.1.0',
  VERSION_NAME: 'Initial Beta',
  RELEASE_DATE: '2025-08-20',
  CHANGELOG_URL: 'https://github.com/repo/CHANGELOG.md',
  MINIMUM_NODE_VERSION: '14.0.0'
};

// Diretórios base do projeto
const PROJECT_ROOT = path.resolve(__dirname, '../..');
const TOOLS_DIR = path.join(PROJECT_ROOT, '_tools');

// Configurações de diretórios
const DIRECTORIES = {
  PROJECT_ROOT,
  TOOLS_DIR,
  LOGS_DIR: path.join(TOOLS_DIR, 'logs'),
  BACKUPS_DIR: path.join(TOOLS_DIR, 'backups'),
  TEMP_DIR: path.join(TOOLS_DIR, 'temp'),
  
  // Diretórios de origem dos arquivos
  BLOCKS_DIR: path.join(PROJECT_ROOT, 'blocks'),
  TAILWIND_THEME_DIR: path.join(PROJECT_ROOT, 'tailwind_theme'),
  THEME_JSON: path.join(PROJECT_ROOT, 'theme.json')
};

// Padrões de arquivos a processar
const FILE_PATTERNS = {
  PHP_FILES: '**/*.php',
  CSS_FILES: '**/*.css', 
  JSON_FILES: '**/theme.json',
  
  // Exclusões
  EXCLUDE_PATTERNS: [
    '**/node_modules/**',
    '**/.git/**',
    '**/vendor/**',
    '**/_tools/**'
  ]
};

// Configurações de backup
const BACKUP_SETTINGS = {
  ENABLED: true,
  TIMESTAMP_FORMAT: 'YYYY-MM-DD_HH-mm-ss',
  MAX_BACKUPS: 10, // Manter apenas os 10 backups mais recentes
  COMPRESS: false, // Comprimir backups (ZIP)
  AUTO_CLEANUP: true // Limpar backups antigos automaticamente
};

// Configurações de logging
const LOGGING_SETTINGS = {
  ENABLED: true,
  LEVEL: 'info', // 'debug', 'info', 'warn', 'error'
  CONSOLE_OUTPUT: true,
  FILE_OUTPUT: true,
  MAX_LOG_FILES: 20,
  LOG_FORMAT: 'markdown', // 'markdown', 'json', 'text'
  INCLUDE_PERFORMANCE: true
};

// Configurações de performance
const PERFORMANCE_SETTINGS = {
  // Cache de RegExp compiladas
  REGEX_CACHE_SIZE: 1000,
  
  // Processamento paralelo
  MAX_CONCURRENT_FILES: 4,
  ENABLE_WORKER_THREADS: true,
  
  // Chunk size para arquivos grandes
  CHUNK_SIZE: 64 * 1024, // 64KB
  
  // Memory limits
  MAX_MEMORY_USAGE: 512 * 1024 * 1024, // 512MB
  
  // Timeouts
  OPERATION_TIMEOUT: 30000, // 30 segundos
  FILE_PROCESSING_TIMEOUT: 10000 // 10 segundos por arquivo
};

// Configurações de validação
const VALIDATION_SETTINGS = {
  STRICT_MODE: false, // Modo rigoroso para validação
  VALIDATE_SYNTAX: true, // Validar sintaxe dos arquivos processados
  CHECK_REFERENCES: true, // Verificar se referências de cores existem
  FAIL_ON_ERROR: false, // Falhar completamente se houver erros
  MAX_ERRORS: 10 // Máximo de erros antes de parar
};

// Configurações específicas por tipo de arquivo
const FILE_TYPE_SETTINGS = {
  PHP: {
    PRESERVE_FORMATTING: true,
    BACKUP_BEFORE_PROCESS: true,
    VALIDATE_SYNTAX: false, // Requer PHP CLI instalado
    ENCODING: 'utf8'
  },
  
  CSS: {
    MINIFY_OUTPUT: false,
    PRESERVE_COMMENTS: true,
    AUTO_PREFIX: false, // Autoprefixer
    SOURCEMAPS: false,
    ENCODING: 'utf8'
  },
  
  JSON: {
    PRETTY_PRINT: true,
    INDENT_SIZE: 2,
    VALIDATE_SCHEMA: true,
    ENCODING: 'utf8'
  }
};

// Configurações de flags da CLI
const CLI_FLAGS = {
  // Flags de processamento
  '--css': 'Processar apenas arquivos CSS',
  '--php': 'Processar apenas arquivos PHP', 
  '--theme': 'Processar apenas theme.json',
  '--all': 'Processar todos os tipos (padrão)',
  
  // Flags de controle
  '--dry-run': 'Executar sem modificar arquivos',
  '--verbose': 'Output detalhado',
  '--quiet': 'Output mínimo',
  '--force': 'Ignorar avisos e continuar',
  
  // Flags de backup e validação
  '--no-backup': 'Não criar backups',
  '--validate': 'Executar validação após processamento',
  '--parallel': 'Usar processamento paralelo',
  
  // Flags de desenvolvimento
  '--debug': 'Modo debug com logs extras',
  '--profile': 'Profiling de performance',
  '--benchmark': 'Executar benchmarks'
};

// Mensagens padrão
const MESSAGES = {
  SUCCESS: {
    PROCESSING_COMPLETE: '✅ Processamento completado com sucesso!',
    FILES_PROCESSED: (count) => `📁 ${count} arquivos processados`,
    BACKUP_CREATED: (path) => `💾 Backup criado: ${path}`,
    VALIDATION_PASSED: '✅ Validação passou em todos os testes'
  },
  
  ERROR: {
    FILE_NOT_FOUND: (file) => `❌ Arquivo não encontrado: ${file}`,
    PROCESSING_FAILED: (file) => `❌ Falha ao processar: ${file}`,
    BACKUP_FAILED: (error) => `❌ Falha no backup: ${error}`,
    VALIDATION_FAILED: (errors) => `❌ Validação falhou: ${errors} erros`
  },
  
  WARNING: {
    LARGE_FILE: (size) => `⚠️ Arquivo grande detectado (${size}MB)`,
    NO_CHANGES: 'ℹ️ Nenhuma alteração necessária',
    PARTIAL_SUCCESS: (processed, total) => `⚠️ Processados ${processed}/${total} arquivos`
  },
  
  INFO: {
    STARTING: '🚀 Iniciando conversão semântica...',
    ANALYZING: (file) => `🔍 Analisando: ${file}`,
    PROCESSING: (file) => `⚙️ Processando: ${file}`,
    SKIPPING: (file, reason) => `⏭️ Ignorando ${file}: ${reason}`
  }
};

// Configurações de desenvolvimento
const DEV_SETTINGS = {
  ENABLE_DEBUGGING: process.env.NODE_ENV === 'development',
  MOCK_FILE_OPERATIONS: false, // Para testes
  ENABLE_PROFILING: false,
  SAVE_INTERMEDIATE_RESULTS: false, // Salvar resultados intermediários
  VERBOSE_ERRORS: true
};

module.exports = {
  VERSION_INFO,
  DIRECTORIES,
  FILE_PATTERNS,
  BACKUP_SETTINGS,
  LOGGING_SETTINGS,
  PERFORMANCE_SETTINGS,
  VALIDATION_SETTINGS,
  FILE_TYPE_SETTINGS,
  CLI_FLAGS,
  MESSAGES,
  DEV_SETTINGS
};
