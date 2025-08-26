# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Não Lançado]
### Planejado
- Processamento paralelo de arquivos
- Suporte a custom properties CSS adicionais
- Integração com build tools (Webpack, Vite)
- Validação automática de sintaxe
- Suporte a múltiplos gradientes no mesmo elemento

## [0.4.0] - 2025-08-25
### Adicionado
- **🎨 Suporte a Gradientes Semânticos** - Sistema completo para converter gradientes Tailwind em tokens semânticos
- **CSV Enhanced Parser** - Parser CSV robusto que suporta campos com aspas contendo vírgulas
- **Gradient Column** - Nova coluna `gradient_css` no CSV para especificar gradientes CSS nativos
- **ThemeJsonProcessor Gradients** - Integração com WordPress Global Styles para adicionar gradientes à paleta
- **CssProcessor Gradients** - Conversão de classes `.bg-gradient-*` para `var(--wp--preset--gradient--*)`
- **PhpProcessor Gradients** - Conversão de classes complexas como `bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500` para `bg-gradient-1`

### Melhorado
- **TokenManager** - Métodos específicos para gradientes: `getGradientTokens()` e `buildGradientMapping()`
- **CSV Path Resolution** - Correção do caminho CSV para funcionar corretamente quando executado do diretório `_tools`
- **Modular Architecture** - Cada processor agora suporta gradientes de forma independente
- **Debug Logging** - Logs detalhados para conversão de gradientes com before/after

### Transformações Implementadas
- **CSV → theme.json**: `gradient_css` → `settings.color.gradients[]`
- **Tailwind → CSS**: `.bg-gradient-to-r` → `var(--wp--preset--gradient--bg-gradient-1)`
- **Complex → Simple PHP**: `bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500` → `bg-gradient-1`

### Exemplo Prático
```php
// Antes
<div class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">

// Depois  
<div class="bg-gradient-1">
```

### Técnico
- **Feature Branch Workflow** - Implementação em branch `feature/v0.4.0-semantic-gradients`
- **Enhanced CSV Structure** - Suporte a tokens de categoria `gradient` com CSS personalizado
- **WordPress Integration** - Gradientes aparecem no painel de cores do editor de blocos
- **Backward Compatibility** - Sistema mantém compatibilidade com tokens de cor existentes

## [0.1.1] - 2025-08-20
### Adicionado
- **Versionamento SEMVER** - Sistema completo de versionamento semântico implementado
- **Comando --version** - Flag para exibir informações detalhadas da versão
- **Scripts NPM** - Comandos `npm run semantic-colors:version` e `npm run semantic-colors:help`
- **Controle de versão Git** - .gitignore configurado para rastrear apenas arquivos do semantic-colors.js

### Melhorado
- **Documentação** - README atualizado com badges de versão e seção de versionamento
- **CLI Help** - Comando de ajuda agora exibe a versão atual
- **Logs** - Sistema de logs agora inclui versão da ferramenta nos metadados

### Corrigido
- **Duplicação prose variables** - Remoção de variáveis CSS `--tw-prose-*` duplicadas no tailwind.css
- **Mapeamentos incorretos** - Correção manual de `.text-inverse` e `.brand-text-accent` para usar variáveis semânticas corretas

### Técnico
- **Git Cleanup** - Repositório limpo com apenas arquivos essenciais do semantic-colors.js
- **Version Management** - Versão centralizada em `_tools/config/settings.js`
- **Backup System** - Sistema de backup preserva versão da ferramenta nos metadados

## [0.1.0] - 2025-08-20
### Adicionado
- **Script inicial de conversão semântica** - Ferramenta completa para converter classes Tailwind hardcoded em tokens semânticos
- **Processador theme.json** - Remove paleta completa do Tailwind e adiciona apenas 24 tokens semânticos
- **Processador CSS** - Substitui valores RGB hardcoded por variáveis CSS `var(--wp--preset--color--*)`
- **Processador PHP** - Converte classes Tailwind em atributos `class` para tokens semânticos
- **Sistema de backup automático** - Cria backups com timestamp antes de modificar arquivos
- **Logging completo** - Logs detalhados em formato Markdown com estatísticas de performance
- **Validação** - Sistema básico de validação de arquivos processados
- **CLI flags** - Suporte para `--css`, `--php`, `--theme`, `--dry-run`, `--debug`, etc.
- **Versionamento SEMVER** - Implementação completa do versionamento semântico
- **Documentação** - README completo com exemplos de uso e troubleshooting

### Corrigido
- **Valores hardcoded no CSS** - Substituição correta de `rgb(29 78 216)` por `var(--wp--preset--color--brand-bg-base)`
- **Variáveis Tailwind** - Remoção completa de `--tw-*-opacity` e valores com `/var(--tw-*-opacity)`
- **Paleta theme.json** - Limpeza rigorosa removendo 41+ cores não-semânticas (primary-*, secondary-*, color3-*, etc.)
- **Mapeamento incorreto** - Correção de `.text-inverse` e `.brand-text-accent` para usar variáveis corretas
- **Duplicação prose variables** - Limpeza de variáveis `--tw-prose-*` duplicadas

### Técnico
- **Arquitetura modular** - Separação em processadores especializados (Base, Theme, CSS, PHP)
- **Configuração centralizada** - Arquivos de configuração para color-mapping, settings e processing-matrix
- **Performance otimizada** - Diferentes estratégias baseadas no tamanho do arquivo (String Replace, Regex, PostCSS)
- **Detecção inteligente** - Sistema de detecção de contexto para PHP (HTML vs código puro)
- **Mapeamento robusto** - 30+ mapeamentos de cores Tailwind para tokens semânticos
- **Regex cacheada** - Cache de expressões regulares para melhor performance

### Estatísticas desta versão
- 📁 **3 tipos de arquivo** suportados (PHP, CSS, JSON)
- 🎨 **24 tokens semânticos** definidos
- 🗑️ **41 cores removidas** do theme.json
- 🔧 **25 valores RGB** convertidos para variáveis
- ⚡ **~50ms** tempo médio de processamento
- 🛡️ **100% backup** automático de arquivos

---

## Convenções de Versionamento

Este projeto segue o [Versionamento Semântico](https://semver.org/):

- **MAJOR** (X.0.0): Mudanças incompatíveis na API
- **MINOR** (0.X.0): Funcionalidades adicionadas de forma compatível
- **PATCH** (0.0.X): Correções de bugs compatíveis

### Versões Pré-1.0.0
- **0.x.x**: Versões beta com funcionalidades em desenvolvimento
- **1.0.0**: Primeira versão estável com API consolidada

### Status de Desenvolvimento
- 🔴 **0.1.x**: Beta inicial - Funcionalidades core implementadas
- 🟡 **0.2.x**: Beta avançado - Otimizações e features extras
- 🟢 **1.0.0**: Versão estável - API finalizada e testada
