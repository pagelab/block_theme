/**
 * Matriz de Decisão para Processamento Otimizado
 * 
 * Define qual método usar baseado no tamanho do arquivo,
 * tipo de conteúdo e precisão requerida.
 */

// Thresholds de tamanho em bytes
const SIZE_THRESHOLDS = {
  SMALL: 50 * 1024,     // 50KB
  MEDIUM: 500 * 1024,   // 500KB  
  LARGE: 5 * 1024 * 1024, // 5MB
  CRITICAL: 50 * 1024 * 1024 // 50MB
};

// Métodos de processamento disponíveis
const PROCESSING_METHODS = {
  STRING_REPLACE: 'STRING_REPLACE',
  REGEX_SIMPLE: 'REGEX_SIMPLE', 
  REGEX_OPTIMIZED: 'REGEX_OPTIMIZED',
  REGEX_CONTEXT: 'REGEX_CONTEXT',
  TOKEN_PARSER: 'TOKEN_PARSER',
  AST_PARSER: 'AST_PARSER',
  POSTCSS_PARSER: 'POSTCSS_PARSER',
  JSON_PARSE: 'JSON_PARSE',
  BOYER_MOORE: 'BOYER_MOORE',
  CHUNKED_PROCESSING: 'CHUNKED_PROCESSING'
};

// Matriz de decisão principal
const PROCESSING_MATRIX = {
  // Arquivos PHP
  'php-small': {
    method: PROCESSING_METHODS.REGEX_CONTEXT,
    precision: 'medium',
    performance: 'high',
    description: 'RegExp com análise de contexto para PHP pequenos'
  },
  'php-medium': {
    method: PROCESSING_METHODS.TOKEN_PARSER,
    precision: 'high', 
    performance: 'medium',
    description: 'Parser de tokens para PHP médios'
  },
  'php-large': {
    method: PROCESSING_METHODS.AST_PARSER,
    precision: 'critical',
    performance: 'low',
    description: 'AST parser para PHP grandes com máxima precisão'
  },

  // Arquivos CSS
  'css-small': {
    method: PROCESSING_METHODS.STRING_REPLACE,
    precision: 'medium',
    performance: 'critical',
    description: 'String replace simples para CSS pequenos'
  },
  'css-medium': {
    method: PROCESSING_METHODS.REGEX_OPTIMIZED,
    precision: 'high',
    performance: 'high', 
    description: 'RegExp otimizada para CSS médios'
  },
  'css-large': {
    method: PROCESSING_METHODS.POSTCSS_PARSER,
    precision: 'high',
    performance: 'medium',
    description: 'PostCSS parser para CSS grandes'
  },

  // Arquivos JSON
  'json-any': {
    method: PROCESSING_METHODS.JSON_PARSE,
    precision: 'high',
    performance: 'high',
    description: 'JSON.parse/stringify nativo'
  },

  // Arquivos muito grandes (qualquer tipo)
  'large-any': {
    method: PROCESSING_METHODS.CHUNKED_PROCESSING,
    precision: 'medium',
    performance: 'high',
    description: 'Processamento em chunks para arquivos muito grandes'
  }
};

/**
 * Determina o método ideal baseado no arquivo
 * @param {string} filePath - Caminho do arquivo
 * @param {number} fileSize - Tamanho em bytes
 * @param {string} fileType - Tipo do arquivo (php, css, json)
 * @param {string} precisionRequired - Precisão requerida (low, medium, high, critical)
 * @returns {object} Configuração do método escolhido
 */
function chooseProcessingMethod(filePath, fileSize, fileType, precisionRequired = 'medium') {
  // Para arquivos críticos (muito grandes), sempre usar chunked
  if (fileSize > SIZE_THRESHOLDS.CRITICAL) {
    return PROCESSING_MATRIX['large-any'];
  }

  // Para JSON, sempre usar JSON.parse
  if (fileType === 'json') {
    return PROCESSING_MATRIX['json-any'];
  }

  // Para outros tipos, decidir por tamanho
  let sizeCategory;
  if (fileSize < SIZE_THRESHOLDS.SMALL) {
    sizeCategory = 'small';
  } else if (fileSize < SIZE_THRESHOLDS.MEDIUM) {
    sizeCategory = 'medium';
  } else {
    sizeCategory = 'large';
  }

  const matrixKey = `${fileType}-${sizeCategory}`;
  const method = PROCESSING_MATRIX[matrixKey];

  if (!method) {
    // Fallback para método genérico
    return PROCESSING_MATRIX['large-any'];
  }

  // Ajustar baseado na precisão requerida
  if (precisionRequired === 'critical' && fileType === 'php') {
    return PROCESSING_MATRIX['php-large'];
  }

  return method;
}

/**
 * Obter estatísticas da matriz de decisão
 * @returns {object} Estatísticas dos métodos
 */
function getMatrixStats() {
  const methodCounts = {};
  const precisionCounts = {};
  const performanceCounts = {};

  Object.values(PROCESSING_MATRIX).forEach(config => {
    // Contar métodos
    methodCounts[config.method] = (methodCounts[config.method] || 0) + 1;
    
    // Contar precisão
    precisionCounts[config.precision] = (precisionCounts[config.precision] || 0) + 1;
    
    // Contar performance
    performanceCounts[config.performance] = (performanceCounts[config.performance] || 0) + 1;
  });

  return {
    methods: methodCounts,
    precision: precisionCounts,
    performance: performanceCounts,
    totalConfigurations: Object.keys(PROCESSING_MATRIX).length
  };
}

/**
 * Validar se um método é adequado para o contexto
 * @param {string} method - Método a validar
 * @param {string} fileType - Tipo do arquivo
 * @param {number} fileSize - Tamanho do arquivo
 * @returns {boolean} Se o método é adequado
 */
function validateMethod(method, fileType, fileSize) {
  // Verificações básicas de compatibilidade
  const methodValidations = {
    [PROCESSING_METHODS.POSTCSS_PARSER]: fileType === 'css',
    [PROCESSING_METHODS.JSON_PARSE]: fileType === 'json',
    [PROCESSING_METHODS.AST_PARSER]: fileType === 'php',
    [PROCESSING_METHODS.CHUNKED_PROCESSING]: fileSize > SIZE_THRESHOLDS.LARGE
  };

  // Se há validação específica, verificar
  if (methodValidations.hasOwnProperty(method)) {
    return methodValidations[method];
  }

  // Métodos genéricos são válidos para todos
  return true;
}

/**
 * Obter configuração de performance para um método
 * @param {string} method - Método de processamento
 * @returns {object} Configuração de performance
 */
function getPerformanceConfig(method) {
  const configs = {
    [PROCESSING_METHODS.STRING_REPLACE]: {
      concurrent: true,
      cache: false,
      memory: 'low',
      cpu: 'low'
    },
    [PROCESSING_METHODS.REGEX_OPTIMIZED]: {
      concurrent: true,
      cache: true,
      memory: 'medium',
      cpu: 'medium'
    },
    [PROCESSING_METHODS.POSTCSS_PARSER]: {
      concurrent: false,
      cache: true,
      memory: 'high',
      cpu: 'high'
    },
    [PROCESSING_METHODS.AST_PARSER]: {
      concurrent: false,
      cache: true,
      memory: 'high',
      cpu: 'critical'
    },
    [PROCESSING_METHODS.CHUNKED_PROCESSING]: {
      concurrent: true,
      cache: false,
      memory: 'low',
      cpu: 'medium'
    }
  };

  return configs[method] || {
    concurrent: false,
    cache: false,
    memory: 'medium',
    cpu: 'medium'
  };
}

module.exports = {
  SIZE_THRESHOLDS,
  PROCESSING_METHODS,
  PROCESSING_MATRIX,
  chooseProcessingMethod,
  getMatrixStats,
  validateMethod,
  getPerformanceConfig
};
