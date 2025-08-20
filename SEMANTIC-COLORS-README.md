# 🎨 Sistema de Conversão Semântica de Cores

[![Version](https://img.shields.io/badge/version-0.1.1-blue.svg)](CHANGELOG.md)
[![Status](https://img.shields.io/badge/status-Initial%20Beta-orange.svg)](#)
[![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-green.svg)](#)

## Visão Geral

Este sistema converte automaticamente classes CSS do Tailwind hardcoded em tokens semânticos controláveis via Global Styles do WordPress. O objetivo é permitir personalização completa de cores através da interface nativa do WordPress.

## ✨ Funcionalidades

- ✅ **Conversão Automática**: Substitui 30+ classes Tailwind por tokens semânticos
- ✅ **Controle via WordPress**: Cores gerenciáveis pelo Global Styles
- ✅ **Processamento Inteligente**: Matriz de decisão otimizada por tamanho de arquivo
- ✅ **Backup Automático**: Cria backups antes de modificar arquivos
- ✅ **Logging Detalhado**: Relatórios completos em Markdown
- ✅ **Validação Robusta**: Verificações de integridade pós-processamento
- ✅ **Modo Dry-Run**: Testa sem modificar arquivos

## 📦 Instalação em Novos Projetos

### Pré-requisitos
- Node.js 14.0.0 ou superior
- Tema de bloco WordPress exportado do Pinegrow
- Git (opcional, mas recomendado)

### 🔧 Instalação Passo-a-Passo

#### 1. **Exportar Tema do Pinegrow**
```bash
# No Pinegrow, exporte seu tema para:
/wp-content/themes/seu-tema/
```

#### 2. **Clonar o Sistema Semantic Colors**
```bash
# Navegue até o diretório do seu tema
cd /wp-content/themes/seu-tema/

# Clone apenas os arquivos do semantic-colors
git clone https://github.com/pagelab/block_theme.git temp-semantic
cp -r temp-semantic/_tools ./
cp temp-semantic/package.json ./
cp temp-semantic/package-lock.json ./
cp temp-semantic/SEMANTIC-COLORS-README.md ./
cp temp-semantic/CHANGELOG.md ./
cp temp-semantic/.gitignore ./
rm -rf temp-semantic/
```

#### 3. **Instalar Dependências**
```bash
npm install
```

#### 4. **Verificar Instalação**
```bash
# Testar se o script funciona
npm run semantic-colors:version

# Fazer um dry-run para testar
npm run semantic-colors:dry-run
```

#### 5. **Executar Conversão**
```bash
# ⚠️ IMPORTANTE: Sempre faça backup antes!
# O script cria backups automáticos, mas é recomendado fazer backup manual

# Conversão completa
npm run semantic-colors

# Ou processar por etapas
npm run semantic-colors:theme    # Primeiro o theme.json
npm run semantic-colors:css      # Depois os arquivos CSS
npm run semantic-colors:php      # Por último os arquivos PHP
```

### 🔄 Workflow Recomendado

#### **Para Novos Projetos:**
```bash
# 1. Export do Pinegrow
pinegrow-export → /wp-content/themes/meu-tema/

# 2. Setup do semantic-colors
cd /wp-content/themes/meu-tema/
# [seguir passos de instalação acima]

# 3. Conversão inicial
npm run semantic-colors --validate

# 4. Testar no WordPress
# - Upload do tema
# - Ativar tema
# - Testar Global Styles
```

#### **Para Atualizações do Pinegrow:**
```bash
# 1. Backup do tema atual
cp -r /wp-content/themes/meu-tema/ /backup-tema-$(date +%Y%m%d)/

# 2. Export atualizado do Pinegrow
# Sobrescreve: blocks/, inc/, tailwind_theme/, style.css, etc.

# 3. Re-executar conversão
npm run semantic-colors

# 4. Verificar mudanças
git diff  # Se usando Git
```

### 🎯 Estrutura Após Instalação

```
seu-tema/
├── _tools/                     # ✅ Sistema semantic-colors
│   ├── config/
│   ├── processors/
│   ├── utils/
│   └── semantic-colors.js
├── blocks/                     # 🔄 Será processado
├── inc/                        # 🔄 Será processado  
├── tailwind_theme/             # 🔄 Será processado
├── theme.json                  # 🔄 Será processado
├── package.json                # ✅ Dependências do semantic-colors
├── .gitignore                  # ✅ Configurado para o projeto
└── [outros arquivos do tema]   # 🔄 Serão processados conforme necessário
```

### ⚠️ Notas Importantes

1. **Sempre fazer backup** antes da primeira execução
2. **Re-exportar do Pinegrow** sempre que fizer mudanças no design
3. **Re-executar o script** após cada export do Pinegrow
4. **Verificar Global Styles** no WordPress após conversão
5. **Usar Git** para controle de versão (recomendado)

### 🔧 Instalação Alternativa (Método NPX - Futuro)

```bash
# 🚧 Em desenvolvimento para v0.2.0
# Instalação via NPM package (planejado)
npx @pagelab/semantic-colors init
npx @pagelab/semantic-colors convert
```

### 🐛 Troubleshooting

#### **Erro: "command not found: npm"**
```bash
# Instalar Node.js primeiro
# macOS: brew install node
# Ubuntu: sudo apt install nodejs npm
# Windows: Baixar de nodejs.org
```

#### **Erro: "Cannot find module"**
```bash
# Re-instalar dependências
rm -rf node_modules package-lock.json
npm install
```

#### **Erro: "Permission denied"**
```bash
# Verificar permissões do diretório
sudo chown -R $(whoami) /wp-content/themes/seu-tema/
chmod -R 755 /wp-content/themes/seu-tema/
```

#### **Script não encontra arquivos**
```bash
# Verificar se está no diretório correto
pwd  # Deve estar em /wp-content/themes/seu-tema/

# Verificar se arquivos existem
ls -la blocks/ tailwind_theme/ theme.json
```

#### **Cores não aparecem no WordPress**
1. Verificar se o tema foi ativado
2. Acessar **Appearance → Editor → Global Styles → Colors**
3. Limpar cache do site/plugin de cache
4. Verificar se o `theme.json` foi processado corretamente

#### **Backup não funciona**
```bash
# Criar backup manual antes
cp -r /wp-content/themes/seu-tema/ /backup-tema-manual/

# Verificar permissões de escrita
ls -la _tools/logs/  # Deve permitir escrita
```

## 🚀 Uso Rápido

```bash
# Conversão completa
npm run semantic-colors

# Processar apenas CSS
npm run semantic-colors:css

# Processar apenas PHP  
npm run semantic-colors:php

# Processar apenas theme.json
npm run semantic-colors:theme

# Teste sem modificar arquivos
node _tools/semantic-colors.js --dry-run

# Com validação completa
node _tools/semantic-colors.js --validate

# Processamento paralelo
node _tools/semantic-colors.js --parallel
```

## 📊 Tokens Semânticos Disponíveis

### Cores da Marca
| Token | Tailwind Original | Descrição |
|-------|------------------|-----------|
| `brand-bg-base` | `bg-blue-700` | Cor principal da marca (fundo) |
| `brand-bg-alt` | `bg-green-600` | Cor alternativa da marca |
| `brand-bg-accent` | `bg-red-600` | Cor de destaque da marca |
| `brand-text-base` | `text-blue-700` | Cor principal da marca (texto) |
| `brand-text-alt` | `text-green-600` | Cor alternativa da marca (texto) |
| `brand-text-accent` | `text-red-600` | Cor de destaque da marca (texto) |

### Cores de Fundo
| Token | Tailwind Original | Descrição |
|-------|------------------|-----------|
| `bg-base` | `bg-white` | Fundo principal |
| `bg-subtle` | `bg-gray-200` | Fundo suave/secundário |
| `bg-inverse` | `bg-gray-950` | Fundo invertido |
| `bg-inverse-subtle` | `bg-gray-900` | Fundo invertido suave |

### Cores de Texto
| Token | Tailwind Original | Descrição |
|-------|------------------|-----------|
| `text-base` | `text-gray-900` | Texto principal |
| `text-subtle` | `text-gray-800` | Texto secundário |
| `text-inverse` | `text-gray-50` | Texto sobre fundos escuros |
| `text-inverse-subtle` | `text-gray-300` | Texto secundário sobre fundos escuros |

### Cores de Borda
| Token | Tailwind Original | Descrição |
|-------|------------------|-----------|
| `border-base` | `border-gray-400` | Borda padrão |
| `border-subtle` | `border-gray-150` | Borda suave |

### Cores de Feedback
| Token | Tailwind Original | Descrição |
|-------|------------------|-----------|
| `bg-success` | `bg-green-200` | Fundo de sucesso |
| `bg-warning` | `bg-yellow-200` | Fundo de aviso |
| `bg-error` | `bg-red-200` | Fundo de erro |
| `bg-info` | `bg-blue-200` | Fundo informativo |

### Cores de Elementos
| Token | Tailwind Original | Descrição |
|-------|------------------|-----------|
| `button-base` | `bg-blue-600` | Botão principal |
| `button-inverse` | `bg-transparent` | Botão transparente |
| `button-accent` | `bg-red-500` | Botão de destaque |
| `card` | `bg-gray-250` | Fundo de cartões |

## 🏗️ Arquitetura do Sistema

### Componentes Principais

```
_tools/
├── semantic-colors.js          # Script principal
├── config/
│   ├── color-mapping.js        # Mapeamento de cores
│   ├── processing-matrix.js    # Matriz de decisão
│   └── settings.js             # Configurações
├── processors/
│   ├── BaseProcessor.js        # Classe base
│   ├── ThemeJsonProcessor.js   # Processador theme.json
│   ├── CssProcessor.js         # Processador CSS
│   └── PhpProcessor.js         # Processador PHP
├── utils/
│   └── Logger.js               # Sistema de logging
└── validators/
    └── ValidationEngine.js     # Motor de validação
```

### Matriz de Decisão

O sistema escolhe automaticamente o método de processamento baseado no tamanho e tipo de arquivo:

| Arquivo | Tamanho | Método | Performance |
|---------|---------|--------|-------------|
| PHP pequeno | < 50KB | RegExp + Contexto | ⭐⭐⭐⭐ |
| PHP médio | 50KB-500KB | Token Parser | ⭐⭐⭐ |
| PHP grande | > 500KB | AST Parser | ⭐⭐ |
| CSS pequeno | < 50KB | String Replace | ⭐⭐⭐⭐⭐ |
| CSS médio | 50KB-500KB | RegExp Otimizada | ⭐⭐⭐⭐ |
| CSS grande | > 500KB | PostCSS Parser | ⭐⭐⭐ |
| JSON | Qualquer | JSON.parse | ⭐⭐⭐⭐ |

## 🔧 Configuração

### Flags Disponíveis

```bash
--css           # Processar apenas arquivos CSS
--php           # Processar apenas arquivos PHP  
--theme         # Processar apenas theme.json
--all           # Processar todos os tipos (padrão)
--dry-run       # Executar sem modificar arquivos
--verbose       # Output detalhado
--quiet         # Output mínimo
--force         # Ignorar avisos e continuar
--no-backup     # Não criar backups
--validate      # Executar validação após processamento
--parallel      # Usar processamento paralelo
--debug         # Modo debug com logs extras
--profile       # Profiling de performance
--benchmark     # Executar benchmarks
```

### Configurações de Backup

```javascript
// config/settings.js
const BACKUP_SETTINGS = {
  ENABLED: true,
  MAX_BACKUPS: 10,
  AUTO_CLEANUP: true
};
```

### Configurações de Logging

```javascript
// config/settings.js  
const LOGGING_SETTINGS = {
  LEVEL: 'info',
  CONSOLE_OUTPUT: true,
  FILE_OUTPUT: true,
  LOG_FORMAT: 'markdown'
};
```

## 📝 Exemplos de Conversão

### theme.json

**Antes:**
```json
{
  "color": "rgba(29,78,216,1)",
  "name": "blue-700",
  "slug": "blue-700"
}
```

**Depois:**
```json
{
  "color": "rgba(29,78,216,1)", 
  "name": "Marca (fundo base)",
  "slug": "brand-bg-base"
}
```

### CSS

**Antes:**
```css
.bg-blue-700 {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity));
}
```

**Depois:**
```css
.brand-bg-base {
  background-color: var(--wp--preset--color--brand-bg-base);
}
```

### PHP

**Antes:**
```php
<div class="bg-blue-700 text-white p-4">
  Conteúdo
</div>
```

**Depois:**
```php
<div class="brand-bg-base text-inverse p-4">
  Conteúdo
</div>
```

## 🧪 Teste e Validação

### Executar Testes

```bash
# Teste completo sem modificar arquivos
node _tools/semantic-colors.js --dry-run --debug

# Teste com validação
node _tools/semantic-colors.js --dry-run --validate

# Benchmark de performance
node _tools/semantic-colors.js --benchmark
```

### Verificar Logs

Os logs são salvos em `_tools/logs/` no formato Markdown com:
- Timestamp de cada operação
- Estatísticas de performance
- Relatórios de conversão
- Alertas e erros

### Validação Automática

O sistema valida automaticamente:
- ✅ Sintaxe JSON do theme.json
- ✅ Sintaxe CSS dos arquivos processados  
- ✅ Presença de tokens semânticos
- ✅ Remoção de referências Tailwind
- ✅ Estrutura de arquivos preservada

## 🚨 Solução de Problemas

### Problema: "Arquivo não encontrado"
**Solução:** Certifique-se de que está executando o script na raiz do tema.

### Problema: "Erro de sintaxe CSS"
**Solução:** Use `--force` para ignorar erros não críticos.

### Problema: "Memória insuficiente"
**Solução:** Use `--parallel` para processamento otimizado.

### Problema: "Backups ocupando muito espaço"
**Solução:** Execute limpeza manual ou configure `MAX_BACKUPS`.

## 📊 Relatórios e Métricas

### Estatísticas Típicas

- **Tempo de execução**: 0.5-2 segundos
- **Arquivos processados**: 20-30 arquivos PHP + 2 CSS + 1 JSON
- **Taxa de conversão**: 85-95% das classes Tailwind
- **Redução de tamanho**: 10-15% nos arquivos CSS

### Logs de Performance

```markdown
**15:30:42** ℹ️ **INFO:** Performance: CSS processing *(46.28KB, +4.20ms)*
**15:30:42** ℹ️ **INFO:** Performance: PHP processing *(4.54KB, +0.81ms)*
```

## 🔄 Integração com Pinegrow

### Fluxo de Trabalho Recomendado

1. **Desenvolver no Pinegrow** com classes Tailwind
2. **Exportar tema** para WordPress
3. **Executar conversão semântica**:
   ```bash
   node _tools/semantic-colors.js --validate
   ```
4. **Testar no WordPress** Global Styles
5. **Iterar** conforme necessário

### Compatibilidade

- ✅ Preserva estrutura de blocos Pinegrow
- ✅ Mantém funcionalidades PHP nativas
- ✅ Compatível com updates do Pinegrow
- ✅ Não interfere com `functions.php`

## 🤝 Contribuição

### Adicionar Novos Tokens

1. Edite `config/color-mapping.js`
2. Adicione à `SEMANTIC_COLOR_MAPPING`
3. Adicione à `SEMANTIC_PALETTE`
4. Teste com `--dry-run`

### Exemplo:

```javascript
// Adicionar nova cor
SEMANTIC_COLOR_MAPPING['bg-purple-600'] = 'brand-bg-secondary';

SEMANTIC_PALETTE.push({
  color: "rgba(147,51,234,1)",
  name: "Marca (fundo secundário)", 
  slug: "brand-bg-secondary"
});
```

## 📚 Recursos Adicionais

### Documentação WordPress
- [Global Styles API](https://developer.wordpress.org/block-editor/how-to-guides/themes/global-settings-and-styles/)
- [theme.json Reference](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/)

### Ferramentas Relacionadas
- [Pinegrow WordPress Builder](https://pinegrow.com/wordpress)
- [Tailwind CSS](https://tailwindcss.com/)
- [PostCSS](https://postcss.org/)

---

## 📋 Versionamento

Este projeto usa [Versionamento Semântico](https://semver.org/lang/pt-BR/):

- **0.1.1** (Atual): Beta inicial com versionamento e .gitignore
- **0.2.x** (Planejado): Beta avançado com otimizações
- **1.0.0** (Futuro): Versão estável com API consolidada

### Verificar Versão
```bash
node _tools/semantic-colors.js --version
npm run semantic-colors:version
```

### Histórico de Mudanças
Consulte o [CHANGELOG.md](CHANGELOG.md) para ver todas as mudanças detalhadas.

---

## 📞 Suporte

Para problemas ou dúvidas:
1. Verifique os logs em `_tools/logs/`
2. Execute com `--debug` para mais detalhes
3. Use `--dry-run` para testar sem riscos

**Versão:** 1.0.0  
**Última atualização:** 2025-08-19
