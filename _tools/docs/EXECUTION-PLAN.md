# �� Plano de Execução: Conversão Semântica de Cores Tailwind

## �� Visão Geral do Projeto

### **Objetivo Principal**
Transformar um tema WordPress exportado pelo Pinegrow (com Tailwind CSS hardcoded) em um tema com sistema de cores semântico controlável via Global Styles do WordPress.

### **Resultado Esperado**
- **30 tokens de cor semânticos** no `theme.json`
- **Controle total de cores** via interface WordPress
- **Compatibilidade cross-browser** com fallbacks
- **Performance otimizada** para diferentes cenários de arquivo

---

## 🏗️ Arquitetura do Sistema

### **Componentes Principais**
1. **Matriz de Decisão** - Escolha inteligente de métodos de processamento
2. **Processadores Especializados** - Por tipo de arquivo e tamanho
3. **Sistema de Cache** - Para RegExp e operações repetitivas
4. **Pipeline de Execução** - Orquestração das transformações
5. **Sistema de Validação** - Verificação de integridade

### **Fluxo de Execução**
```
Input Files → Analysis → Method Selection → Processing → Validation → Output
     ↓              ↓           ↓            ↓           ↓         ↓
  PHP/CSS/JSON → Size/Type → Matrix → Optimized → Checks → Semantic
```

---

## 📊 Matriz de Decisão de Processamento

### **Critérios de Seleção**
| Critério | Baixo | Médio | Alto | Crítico |
|----------|-------|-------|------|---------|
| **Tamanho** | < 50KB | 50KB-500KB | 500KB-5MB | > 5MB |
| **Precisão** | Básica | Média | Alta | Máxima |
| **Performance** | Rápida | Balanceada | Otimizada | Crítica |

### **Métodos por Cenário**
```javascript
// Matriz de decisão implementada
const PROCESSING_MATRIX = {
  'php-small': { method: 'REGEX_CONTEXT', precision: 'medium', performance: 'high' },
  'php-medium': { method: 'TOKEN_PARSER', precision: 'high', performance: 'medium' },
  'php-large': { method: 'AST_PARSER', precision: 'critical', performance: 'low' },
  'css-small': { method: 'STRING_REPLACE', precision: 'medium', performance: 'critical' },
  'css-medium': { method: 'REGEX_OPTIMIZED', precision: 'high', performance: 'high' },
  'css-large': { method: 'POSTCSS_PARSER', precision: 'high', performance: 'medium' },
  'json-any': { method: 'JSON_PARSE', precision: 'high', performance: 'high' }
};
```

---

## 🚀 Etapa 1: Preparação e Configuração (Dia 1)

### **1.1 Setup do Ambiente**
```bash
# Instalar dependências
npm install postcss postcss-parser fast-glob fs-extra
npm install --save-dev cssnano @types/node

# Criar estrutura de diretórios
mkdir -p _tools/logs
mkdir -p _tools/backups
mkdir -p _tools/temp
```

### **1.2 Configuração do Sistema**
- [ ] **Configuração de logging** com timestamps
- [ ] **Sistema de backup automático** antes de modificações
- [ ] **Configuração de cache** para RegExp compiladas
- [ ] **Setup de worker threads** para processamento paralelo

### **1.3 Mapeamento de Cores**
```javascript
// Estrutura do mapeamento semântico
const SEMANTIC_COLOR_MAPPING = {
  // Cores da marca
  'bg-blue-700': 'brand-bg-base',
  'bg-green-600': 'brand-bg-alt',
  'bg-red-600': 'brand-bg-accent',
  
  // Cores de fundo
  'bg-white': 'bg-base',
  'bg-gray-200': 'bg-subtle',
  'bg-gray-950': 'bg-inverse',
  
  // ... (30 tokens total)
};
```

---

##  Etapa 2: Desenvolvimento dos Processadores (Dias 2-4)

### **2.1 Processador de Arquivos PHP**
```javascript
class PhpProcessor {
  constructor() {
    this.regexCache = new Map();
    this.contextAnalyzer = new PhpContextAnalyzer();
  }
  
  processFile(filePath, content) {
    const fileSize = content.length;
    const method = this.chooseMethod(fileSize);
    
    switch(method) {
      case 'REGEX_CONTEXT':
        return this.processWithRegexContext(content);
      case 'TOKEN_PARSER':
        return this.processWithTokenParser(content);
      case 'AST_PARSER':
        return this.processWithAstParser(content);
    }
  }
  
  chooseMethod(fileSize) {
    if (fileSize < 50000) return 'REGEX_CONTEXT';
    if (fileSize < 500000) return 'TOKEN_PARSER';
    return 'AST_PARSER';
  }
}
```

### **2.2 Processador de Arquivos CSS**
```javascript
class CssProcessor {
  constructor() {
    this.postcss = require('postcss');
    this.proseProcessor = new ProseVariablesProcessor();
  }
  
  async processFile(filePath, content) {
    const fileSize = content.length;
    
    if (fileSize < 50000) {
      return this.processWithStringReplace(content);
    }
    
    return this.processWithPostcss(content);
  }
  
  processProseVariables(content) {
    // Implementar substituição das variáveis --tw-prose-*
    // com fallbacks e color-mix()
  }
}
```

### **2.3 Processador de Theme.json**
```javascript
class ThemeJsonProcessor {
  constructor() {
    this.semanticPalette = this.buildSemanticPalette();
  }
  
  processThemeJson(content) {
    const theme = JSON.parse(content);
    
    // Remover paleta Tailwind
    theme.settings.color.palette = this.semanticPalette;
    
    return JSON.stringify(theme, null, 2);
  }
  
  buildSemanticPalette() {
    return [
      {
        color: "rgba(29,78,216,1)",
        name: "Marca (fundo base)",
        slug: "brand-bg-base"
      },
      // ... 30 tokens
    ];
  }
}
```

---

## ⚡ Etapa 3: Sistema de Performance (Dia 5)

### **3.1 Sistema de Cache Inteligente**
```javascript
class PerformanceOptimizer {
  constructor() {
    this.regexCache = new Map();
    this.fileCache = new Map();
    this.workerPool = new WorkerPool(require('os').cpus().length);
  }
  
  getCachedRegex(pattern, flags = 'g') {
    const key = `${pattern}-${flags}`;
    if (!this.regexCache.has(key)) {
      this.regexCache.set(key, new RegExp(pattern, flags));
    }
    return this.regexCache.get(key);
  }
  
  async processInParallel(files, processor) {
    return this.workerPool.process(files, processor);
  }
}
```

### **3.2 Processamento em Chunks**
```javascript
class ChunkedProcessor {
  constructor(chunkSize = 64 * 1024) { // 64KB
    this.chunkSize = chunkSize;
  }
  
  async processLargeFile(filePath, processor) {
    const stream = fs.createReadStream(filePath, {
      encoding: 'utf8',
      highWaterMark: this.chunkSize
    });
    
    let buffer = '';
    const results = [];
    
    for await (const chunk of stream) {
      buffer += chunk;
      const boundary = buffer.lastIndexOf('\n');
      
      if (boundary > 0) {
        const processChunk = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 1);
        results.push(await processor(processChunk));
      }
    }
    
    return results.join('\n');
  }
}
```

---

## 🔄 Etapa 4: Pipeline de Execução (Dia 6)

### **4.1 Orquestrador Principal**
```javascript
class SemanticColorsPipeline {
  constructor() {
    this.phpProcessor = new PhpProcessor();
    this.cssProcessor = new CssProcessor();
    this.themeProcessor = new ThemeJsonProcessor();
    this.optimizer = new PerformanceOptimizer();
    this.logger = new Logger();
  }
  
  async execute(options = {}) {
    const startTime = Date.now();
    
    try {
      // 1. Processar theme.json
      await this.processThemeJson();
      
      // 2. Processar arquivos CSS
      await this.processCssFiles();
      
      // 3. Processar arquivos PHP
      await this.processPhpFiles();
      
      // 4. Validação final
      await this.validateResults();
      
      this.logger.success(`Pipeline executado em ${Date.now() - startTime}ms`);
    } catch (error) {
      this.logger.error('Erro no pipeline:', error);
      throw error;
    }
  }
}
```

### **4.2 Sistema de Logging**
```javascript
class Logger {
  constructor() {
    this.logFile = `_tools/logs/semantic-colors-${Date.now()}.md`;
    this.operations = [];
  }
  
  logOperation(operation, details) {
    this.operations.push({
      timestamp: new Date().toISOString(),
      operation,
      details
    });
  }
  
  async saveLogs() {
    const logContent = this.formatLogs();
    await fs.writeFile(this.logFile, logContent);
  }
}
```

---

## 🧪 Etapa 5: Testes e Validação (Dia 7)

### **5.1 Sistema de Validação**
```javascript
class ValidationEngine {
  constructor() {
    this.validators = [
      new ThemeJsonValidator(),
      new CssValidator(),
      new PhpValidator()
    ];
  }
  
  async validateAll() {
    const results = await Promise.all(
      this.validators.map(validator => validator.validate())
    );
    
    return results.every(result => result.valid);
  }
}
```

### **5.2 Testes de Performance**
```javascript
class PerformanceTester {
  async benchmarkProcessing() {
    const testFiles = this.generateTestFiles();
    const results = {};
    
    for (const [size, content] of Object.entries(testFiles)) {
      const startTime = Date.now();
      await this.processor.process(content);
      results[size] = Date.now() - startTime;
    }
    
    return results;
  }
}
```

---

## 📁 Estrutura de Arquivos do Script

```
_tools/
├── semantic-colors.js          # Script principal
├── processors/
│   ├── PhpProcessor.js        # Processador de arquivos PHP
│   ├── CssProcessor.js        # Processador de arquivos CSS
│   ├── ThemeJsonProcessor.js  # Processador do theme.json
│   └── BaseProcessor.js       # Classe base para processadores
├── optimizers/
│   ├── PerformanceOptimizer.js # Otimizações de performance
│   ├── CacheManager.js        # Gerenciamento de cache
│   └── WorkerPool.js          # Pool de workers
├── validators/
│   ├── ValidationEngine.js    # Motor de validação
│   ├── ThemeJsonValidator.js  # Validador do theme.json
│   └── FileValidator.js       # Validador de arquivos
├── utils/
│   ├── Logger.js              # Sistema de logging
│   ├── FileUtils.js           # Utilitários de arquivo
│   └── ColorUtils.js          # Utilitários de cor
└── config/
    ├── color-mapping.js       # Mapeamento de cores
    ├── processing-matrix.js   # Matriz de decisão
    └── settings.js            # Configurações gerais
```

---

## 🎯 Etapa 6: Integração e Refinamentos (Dia 8)

### **6.1 Sistema de Flags e Opções**
```javascript
// Uso do script
const script = new SemanticColorsPipeline();

// Processamento completo
await script.execute();

// Processamento específico
await script.execute({ 
  only: ['css', 'php'], 
  validate: true,
  backup: true,
  parallel: true 
});
```

### **6.2 Integração com PostCSS**
```javascript
const postcss = require('postcss');

const proseVariablesPlugin = postcss.plugin('prose-variables', () => {
  return (css) => {
    css.walkDecls('--tw-prose-*', (decl) => {
      const newValue = this.mapProseVariable(decl.value);
      decl.value = newValue;
    });
  };
});
```

---

## 📊 Cronograma Detalhado

### **Semana 1: Desenvolvimento Core**
- **Dia 1**: Setup e configuração
- **Dia 2-3**: Processadores PHP e CSS
- **Dia 4**: Processador de theme.json
- **Dia 5**: Sistema de performance

### **Semana 2: Integração e Testes**
- **Dia 6**: Pipeline de execução
- **Dia 7**: Testes e validação
- **Dia 8**: Refinamentos e documentação

### **Entregáveis por Dia**
| Dia | Entregável | Status |
|-----|------------|--------|
| 1 | Ambiente configurado | ⏳ |
| 2 | Processador PHP básico | ⏳ |
| 3 | Processador CSS básico | ⏳ |
| 4 | Processador theme.json | ⏳ |
| 5 | Sistema de performance | ⏳ |
| 6 | Pipeline funcional | ⏳ |
| 7 | Validação completa | ⏳ |
| 8 | Script finalizado | ⏳ |

---

## 🚨 Riscos e Mitigações

### **Risco 1: Complexidade do Parsing PHP**
- **Probabilidade**: Alta
- **Impacto**: Médio
- **Mitigação**: Implementar fallback para RegExp com contexto

### **Risco 2: Performance com arquivos grandes**
- **Probabilidade**: Média
- **Impacto**: Alto
- **Mitigação**: Sistema de chunks e worker threads

### **Risco 3: Compatibilidade cross-browser**
- **Probabilidade**: Baixa
- **Impacto**: Alto
- **Mitigação**: Fallbacks robustos e testes em múltiplos navegadores

---

## ✅ Critérios de Sucesso

### **Funcional**
- [ ] Todos os 30 tokens semânticos implementados
- [ ] Controle de cores via Global Styles funcionando
- [ ] Compatibilidade com navegadores modernos e antigos

### **Performance**
- [ ] Processamento de arquivos < 500KB em < 1s
- [ ] Processamento de arquivos < 5MB em < 10s
- [ ] Uso de memória < 100MB para arquivos grandes

### **Qualidade**
- [ ] 100% dos arquivos processados sem erros
- [ ] Logs detalhados de todas as operações
- [ ] Sistema de backup automático funcionando

---

##  Próximos Passos

1. **Revisar e aprovar** este plano de execução
2. **Configurar ambiente** de desenvolvimento
3. **Iniciar implementação** do sistema base
4. **Implementar processadores** um por vez
5. **Testar cada componente** individualmente
6. **Integrar componentes** no pipeline principal
7. **Validar resultados** com testes abrangentes
8. **Documentar uso** e manutenção

---

*Este plano foi criado com base na análise profunda dos requisitos e objetivos do projeto, considerando as melhores práticas de performance, precisão e manutenibilidade.*

Criei um plano de execução detalhado e prático que cobre todas as etapas necessárias para implementar o sistema de conversão semântica de cores. O plano inclui:

## **Principais Características do Plano:**

### **🏗️ Arquitetura Robusta**
- Sistema modular com processadores especializados
- Matriz de decisão inteligente para escolha de métodos
- Pipeline de execução bem definido

### **⚡ Foco em Performance**
- Cache inteligente para RegExp
- Processamento em chunks para arquivos grandes
- Worker threads para processamento paralelo

### **🔧 Implementação Prática**
- Código JavaScript real e funcional
- Estrutura de arquivos organizada
- Sistema de logging e validação

### **📊 Cronograma Realista**
- 8 dias de desenvolvimento estruturado
- Entregáveis claros por dia
- Mitigação de riscos identificados

### **🎯 Objetivos Mensuráveis**
- Critérios de sucesso específicos
- Métricas de performance definidas
- Sistema de validação completo

O plano está salvo como `_tools/EXECUTION-PLAN.md` e pode ser usado como guia principal para a implementação do projeto. Cada etapa foi pensada para ser executável e testável independentemente, permitindo desenvolvimento incremental e validação contínua.
