# 🛠️ Dev Tools - Sistema de Manipulação de Cores WordPress + Tailwind

Este diretório contém todas as ferramentas e documentação para o **Sistema Integrado de Manipulação de Cores** desenvolvido para temas WordPress que utilizam Pinegrow + Tailwind CSS.

## 📁 Estrutura dos Arquivos

### 🔧 Script Principal
- **`watch-tailwind-overwrite.js`** - Script principal integrado que monitora e processa automaticamente

### 📚 Documentação
- **`COLOR-MAPPING.md`** - Documentação sobre a lógica do mapeamento de cores.
- **`CLAUDE.md`** - Histórico de desenvolvimento

## 🚀 Como Usar

### ⚡ Início Rápido
```bash
# 1. Instalar dependência (apenas uma vez)
npm install chokidar

# 2. Executar o sistema de monitoramento
node _dev-tools/watch-tailwind-overwrite.js
```

### 🔄 Workflow Automatizado
1. **Desenvolver no Pinegrow** com Tailwind CSS
2. **Exportar tema** → Script detecta automaticamente
3. **Processamento automático**:
   - ✅ RGB hardcoded → variáveis CSS WordPress
   - ✅ Análise de cores Tailwind na codebase
   - ✅ Conversão para nomenclatura semântica
   - ✅ Atualização do theme.json
   - ✅ **Otimização do theme.json** (remove cores não utilizadas)

## 🎨 Funcionalidades

### 1. **Conversão de Cores Nativas do Tailwind → Variáveis WordPress Semânticas**
Converte cores hardcoded para variáveis CSS do WordPress:
```css
/* Antes */
.bg-blue-700{
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity));
}
/* Depois */
.bg-brand-base{
  --tw-bg-opacity: 1;
  background-color: var(--wp--preset--color--bg-brand-base);
}
```

### 2. **Sistema de Nomenclatura Semântica**
Converte classes Tailwind para nomenclatura semântica, incluindo apenas um número definido de classes e removendo todas as demais classes de cores:
```css
/* Antes */
bg-blue-700, text-gray-900, border-gray-400

/* Depois */
bg-brand-base, text-base, border-base
```

### 3. **Otimização Automática do theme.json**
Remove cores não utilizadas do `theme.json`:
- 🔍 **Escaneia toda a codebase** (PHP, JS, CSS, HTML)
- 🎯 **Identifica cores utilizadas** (green-400, primary, secondary, etc.)
- ✂️ **Remove cores órfãs** não utilizadas
- 💾 **Backup automático** antes de modificações
- 📊 **Relatórios detalhados** de otimização

## 📊 Benefícios de Performance

### Antes da Otimização (exemplo):
- 🔴 **~155 cores** no theme.json (exportação típica do Pinegrow)
- 🔴 **Todas as famílias Tailwind** mesmo não utilizadas
- 🔴 **Carregamento lento** do editor WordPress

### Após a Otimização (exemplo):
- 🟢 **~27 cores** mantidas (apenas as utilizadas)
- 🟢 **~45% de redução** no tamanho do theme.json
- 🟢 **Performance melhorada** significativamente

## 🛡️ Segurança

### Medidas de Proteção
- 🔒 **Backup automático** antes de qualquer modificação
- 🔒 **Cores básicas protegidas** (current, transparent, black, white, inherit)
- 🔒 **Validação JSON** para garantir integridade
- 🔒 **Logs detalhados** para auditoria
- 🔒 **Abordagem conservadora** (em caso de dúvida, mantém a cor)

### Arquivos de Backup
Os backups são criados automaticamente com timestamp:
- `theme-backup-YYYY-MM-DD-HH-MM-SS.json`

## 🔧 Resolução de Problemas

### Script não encontra cores
```bash
# Verificar se está no diretório correto do tema
pwd

# Verificar se tem arquivos CSS do Tailwind
ls tailwind_theme/
```

### Erro de dependência
```bash
# Instalar chokidar
npm install chokidar

# Verificar instalação
node -e "console.log(require('chokidar'))"
```

### Restaurar theme.json
```bash
# Listar backups disponíveis
ls theme-backup-*.json

# Restaurar backup específico
cp theme-backup-YYYY-MM-DD-HH-MM-SS.json theme.json
```

## 📈 Evolução do Sistema

### Versão Atual (v3.0)
- ✅ Sistema integrado completo
- ✅ Otimização automática do theme.json
- ✅ Monitoramento em tempo real
- ✅ Backup automático
- ✅ Documentação completa

### Histórico de Versões
- **v1.0**: Conversão RGB básica
- **v2.0**: Sistema de nomenclatura semântica
- **v3.0**: Otimização do theme.json + organização em _dev-tools_

## 🎯 Casos de Uso

### Para Desenvolvedores
- 🔄 **Workflow otimizado** com Pinegrow
- 🎨 **Gestão automática de cores**
- 📊 **Relatórios de uso** de cores
- 🛡️ **Backup automático** de segurança

### Para Agências
- 🔄 **Padronização** entre projetos
- 📈 **Performance consistente**
- 🧹 **Limpeza automática** de assets
- 📋 **Documentação** para equipes

### Para Clientes
- ⚡ **Sites mais rápidos**
- 🎨 **Editor WordPress otimizado**
- 🔧 **Menor manutenção**
- 💰 **Redução de custos** de hospedagem

---

## 📞 Suporte

Para questões ou melhorias, consulte a documentação específica em cada arquivo `.md` ou entre em contato com a equipe de desenvolvimento.

**🎉 Sistema de desenvolvimento WordPress + Pinegrow + Tailwind totalmente otimizado!**
