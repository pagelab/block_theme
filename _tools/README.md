# 📚 Índice da Documentação - Sistema de Tokens Semânticos

## 🏗️ Arquitetura
- [`ARCHITECTURE.md`](./ARCHITECTURE.md) - Documentação completa da arquitetura modular

## 📁 Estrutura de Diretórios

### 🎯 **Ponto de Entrada**
- [`semantic-colors.js`](./semantic-colors.js) - Pipeline principal e CLI

### 🔧 **Processadores** (`processors/`)
- [`BaseProcessor.js`](./processors/BaseProcessor.js) - Interface base 
- [`CssProcessor.js`](./processors/CssProcessor.js) - Processamento CSS
- [`PhpProcessor.js`](./processors/PhpProcessor.js) - Processamento PHP  
- [`ThemeJsonProcessor.js`](./processors/ThemeJsonProcessor.js) - WordPress theme.json
- [`JavaScriptProcessor.js`](./processors/JavaScriptProcessor.js) - Block Editor JS

### 🛠️ **Utilitários** (`utils/`)
- [`TokenManager.js`](./utils/TokenManager.js) - Gerenciamento de tokens CSV
- [`Logger.js`](./utils/Logger.js) - Sistema de logging
- [`CsvParser.js`](./utils/CsvParser.js) - Parser CSV especializado

### ⚙️ **Configurações** (`config/`)
- [`color-mapping.js`](./config/color-mapping.js) - Mapeamento de cores (legacy)
- [`processing-matrix.js`](./config/processing-matrix.js) - Estratégias de processamento
- [`settings.js`](./config/settings.js) - Configurações globais

### ✅ **Validação** (`validators/`)
- [`ValidationEngine.js`](./validators/ValidationEngine.js) - Motor de validação

### 📖 **Documentação** (`docs/`)
- Documentação técnica específica

### 🎨 **Templates** (`templates/`)
- Templates para integração com WordPress

### 💾 **Dados Dinâmicos**
- `backups/` - Backups automáticos dos arquivos processados
- `logs/` - Logs de execução e relatórios

## 🚀 Guias de Uso

### Processamento Básico
```bash
node semantic-colors.js --css --php --theme-json --js
```

### Processamento por Flags
```bash
node semantic-colors.js --css          # Apenas CSS
node semantic-colors.js --js           # Apenas JavaScript 
node semantic-colors.js --theme-json   # Apenas theme.json
```

### Modo Debug
```bash
node semantic-colors.js --debug --all
```

## 🔄 Fluxo de Desenvolvimento

1. **Modificar tokens:** Editar `semantic-tokens.csv` na raiz
2. **Executar pipeline:** `node _tools/semantic-colors.js --all`
3. **Verificar logs:** Consultar `_tools/logs/` para resultados
4. **Validar saída:** Testar no WordPress/Block Editor


## 📊 Versionamento

- **v0.4.4** - Limpeza de tokens: retorno ao design original
- **v0.4.3** - Limpeza arquitetural e documentação completa
- **v0.4.2** - Arquitetura completa com JavaScript processing
- **v0.4.1** - PHP e ThemeJson integration
- **v0.4.0** - CSS processing e base modular

## 🧰 Ferramentas de Debug

### Logs Estruturados
```javascript
// Logs disponíveis em _tools/logs/
- processing-YYYY-MM-DD.log    # Log geral
- css-processing.log           # Específico CSS
- js-processing.log            # Específico JavaScript
- validation-errors.log        # Erros de validação
```

### Backups Automáticos
```javascript
// Backups em _tools/backups/
- arquivo.extensao.YYYY-MM-DDTHH-mm-ss-SSSZ.bak
```

## 🔗 Integrações WordPress

### Global Styles (theme.json)
O `ThemeJsonProcessor` registra gradientes automaticamente no sistema de cores do WordPress.

### Block Editor (JavaScript)
O `JavaScriptProcessor` converte classes Tailwind em tokens semânticos nos arquivos JS dos blocos.

### Frontend (CSS)
O `CssProcessor` gera variáveis CSS e classes utilitárias para o tema.

### Server-side (PHP)
O `PhpProcessor` processa arquivos de bloco PHP para renderização server-side.

---

**Sistema de Tokens Semânticos v0.4.4**  
**Arquitetura Modular Completa**  
**WordPress Block Theme Compatible**

## 📦 Checar versão do sistema

```bash
node _tools/semantic-colors.js --version
```
