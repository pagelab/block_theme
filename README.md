# TEMA DE BLOCO PINEGROW OTIMIZADO

## Contexto do Projeto
Este repositório contém um tema de blocos para WordPress criado com Pinegrow, usando Tailwind CSS para estilização e PHP/JavaScript para lógica.
O objetivo é criar sites WordPress flexíveis, com blocos altamente customizados por meio de tokens de cores semânticas.

## Antecedentes
O Pinegrow é um aplicativo desktop que agiliza a criação de temas do WordPress, tanto clássicos como de bloco. Sua limitação é que a integração com os recursos mais avançados dos temas de bloco é limitada e ele não segue as convenções nativas do WordPress quanto à criação de blocos, oferecendo seus próprios métodos para criação de controles via UI.

Um notável recurso é a integração com o Tailwind, com controles visuais e funções especiais para personalizar a experiência de autoração com esse framework CSS. Ainda que ofereça controles facilitados para aplicações de tokens de design, ele não integra os tokens do Taiwlind ao ao theme.json, ficando limitado à exportação do arquivo CSS do framework com valores hardcoded.

A ideia do projeto é gerar layouts a partir do Pinegrow, exportá-los como temas de bloco para uma base rápida de desenvolvimento. A partir daí, processar os arquivos do tema com a ajuda de um script node para converter as classes de cor nativas do Tailwind, presente nos arquivos CSS exportados na pasta `tailwind_theme`, em classes semânticas e substituí-las tanto no theme.json, na forma de uma paleta de cor semântica, quanto nos arquivos PHP responsáveis pelos blocos, seja no back-end ou no front-end, removendo no processo todas as demais referências à classes e variáveis CSS fora da lista branca de classes semânticas.


## Alterações previstas:
– Arquivos PHP de todos os blocos (subpastas em `/blocks`): substituir nomes de classes de cor nativas do Tailwind por nomes semânticos e remover classes de cor não presentes na tabela de mapeamento.
– Arquivos `theme.json` (pasta raiz): remover paleta completa de cores do Tailwind, e substituir pela paleta de cores semântica, mantendo a equivalência de valores RBG segundo a tabela de mapeamento.
– Arquivos CSS do Tailwind (diretório `/tailwind_theme`): substituir classes de cor nativas do Tailwind pelos equivalente semânticos, conforme tabela, alterando os valores das propriedades CSS (ex: `color` e `background-color`) para as variáveis CSS da paleta semântica adicionadas no arquivo `theme.json`, removendo referências à variável `--tw-bg-opacity` do Tailwind.

## Expectativa de resultado:
Exemplos com trechos de código:

1) Antes (arquivos processados e exportados pelo Pinegrow)

theme.json
```
{
    "color": "rgba(29,78,216,1)",
    "name": "blue-700",
    "slug": "blue-700"
},
```

tailwind.css
```
.bg-blue-100{
  --tw-bg-opacity: 1;
  background-color: rgb(219 234 254 / var(--tw-bg-opacity));
}
```

hero.php
```
 <a href="<?php echo (!empty($_GET['context']) && $_GET['context'] === 'edit') ? 'javascript:void()' : PG_Blocks_v3::getLinkUrl( $args, 'primary_button_link' ) ?>" class="bg-blue-700 font-medium inline-block px-6 py-3 text-white"><?php echo PG_Blocks_v3::getAttribute( $args, 'primary_button_text' ) ?></a>
```

2) Depois (arquivos processados pelo script Node `semantic-colors.js`)

theme.json
```
{
    "color": "rgba(29,78,216,1)",
    "name": "Marca (fundo base)",
    "slug": "brand-bg-base"
},
```

tailwind.css
```
.brand-bg-base{
  background-color: var(--wp--preset--color--brand-bg-base);
}
```

hero.php
```
 <a href="<?php echo (!empty($_GET['context']) && $_GET['context'] === 'edit') ? 'javascript:void()' : PG_Blocks_v3::getLinkUrl( $args, 'primary_button_link' ) ?>" class="brand-bg-base font-medium inline-block px-6 py-3 text-inverse"><?php echo PG_Blocks_v3::getAttribute( $args, 'primary_button_text' ) ?></a>
```
## Definição da paleta semântica:
A execução do script Node sobre a base de código do tema de bloco exportada pelo Pinegrow oferecerá ao usuário controles para alteração global das cores sem muito esforço, diretamente da interface do Global Styles do editor do WordPress.

Os tokens abaixo são o ponto de partida para a oferta de cores personalizáveis pelo editor do WordPress (Global Styles).

O importante é que o script `semantic-colors.js` fará a substituição dos tokens de cores Tailwind encontradas pelos token de cores descritas abaixo.

Cores da marca (texto e fundo)
    •   Marca base – Cor principal da marca.
    •   Marca alternativo – Cor complementar à principal, usada para contraste e suporte visual.
    •   Marca acento – Cor de destaque para chamar atenção em elementos estratégicos.

Cores de fundo
    •   Fundo base – Cor principal de fundo do site.
    •   Fundo suave – Cor usada para criar seções alternadas e diferenciar blocos.
    •   Fundo inverso – Cor de fundo principal invertida.
    •   Fundo inverso suave – Cor invertida usada para criar seções alternadas e diferenciar blocos escuros.

Cores de texto
    •   Texto base – Cor padrão para parágrafos e textos de destaque.
    •   Texto suave – Cor para textos de menor importância ou descrição.
    •   Texto inverso – Cor usada quando o texto aparece sobre fundos escuros.
    •   Texto inverso suave – Cor usada quando o texto aparece sobre fundos escuros e é necessária uma diferenciação em relação ao texto em fundo inverso.

Cores de borda
    •   Borda base – Cor padrão das bordas.
    •   Borda suave – Cor mais clara ou sutil para bordas de elementos menores.
    •   Borda invertida – Cor mais clara ou sutil para bordas de elementos menores em fundos invertidos.
    •   Borda invertida suave – Cor mais clara ou sutil para bordas de elementos menores em fundos invertidos com diferenciação às bordas regualres.

Cores de feedback
    •   Retorno Sucesso – Cor que indica ação bem-sucedida ou confirmação.
    •   Retorno Aviso – Cor que indica atenção ou precaução.
    •   Retorno Erro – Cor que indica falha ou problema.
    •   Retorno Informação – Cor que destaca mensagens informativas.

Cores de elementos
    •   Botão base – Cor de fundo do botão principal.
    •   Botão inveso – Cor de fundo do botão inverso ao principal.
    •   Botão acento – Cor de fundo do botão de destaque.
    •   Quadro – Cor de fundo usada para destacar caixas ou blocos de conteúdo.


LISTA DE TOKENS
----------------------
Cores da marca
    •   brand-bg-base
    •   brand-bg-alt
    •   brand-bg-accent
    •   brand-text-base
    •   brand-text-alt
    •   brand-text-accent

Cores de fundo
    •   bg-base
    •   bg-subtle
    •   bg-inverse
    •   bg-inverse-subtle

Cores de texto
    •   texto-base
    •   texto-subtle
    •   texto-inverse
    •   texto-inverse-subtle

Cores de borda
    •   border-base
    •   border-subtle
    •   border-inverse
    •   border-inverse-subtle

Cores de feedback
    •   bg-success
    •   bg-warning
    •   bg-error
    •   bg-info

Cores de elementos
    •   button-base
    •   button-inverse
    •   button-accent
    •   card


MAPEAMENTO ENTRE TOKENS E CORES DO TAILWIND
|---------------------|-----------------|
| Token               | Cor Tailwind    |
|---------------------|-----------------|
| brand-bg-base       | bg-blue-700     |
| brand-bg-alt        | bg-green-600    |
| brand-bg-accent     | bg-red-600      |
| brand-text-base     | text-blue-700   |
| brand-text-alt      | text-green-600  |
| brand-text-accent   | text-red-600    |
| bg-base             | bg-white        |
| bg-subtle           | bg-gray-200     |
| bg-inverse          | bg-gray-950     |
| bg-inverse-subtle   | bg-gray-900     |
| text-base           | text-gray-900   |
| text-subtle         | text-gray-800   |
| text-inverse        | text-gray-50    |
| text-inverse-subtle | text-gray-300   |
| border-base         | border-gray-400 |
| border-subtle       | border-gray-150 |
| bg-success          | bg-green-200    |
| bg-warning          | bg-yellow-200   |
| bg-error            | bg-red-200      |
| bg-info             | bg-blue-200     |
| bg-button-base      | bg-blue-600     |
| bg-button-inverse   | bg-transparent  |
| bg-button-accent    | bg-red-500      |
| bg-card             | bg-gray-250     |
|---------------------|-----------------|

// Mapeamento de tokens semânticos baseado em classes Tailwind específicas
const SEMANTIC_TOKEN_MAPPING = {
  // BACKGROUND BRAND COLORS
  'bg-blue-700': 'brand-bg-base',
  'bg-green-600': 'brand-bg-alt',
  'bg-red-600': 'brand-bg-accent',

  // TEXT BRAND COLORS
  'text-blue-700': 'brand-text-base',
  'text-green-600': 'brand-text-alt',
  'text-red-600': 'brand-text-accent',

  // BACKGROUND COLORS
  'bg-white': 'bg-base',
  'bg-gray-200': 'bg-subtle',
  'bg-gray-950': 'bg-inverse',
  'bg-gray-900': 'bg-inverse-subtle',
  'bg-green-200': 'bg-success',
  'bg-yellow-200': 'bg-warning',
  'bg-red-200': 'bg-error',
  'bg-blue-200': 'bg-info',
  'bg-blue-600': 'bg-button-base',
  'bg-transparent': 'bg-button-inverse',
  'bg-red-500': 'bg-button-accent',
  'bg-gray-250': 'bg-card',

  // TEXT COLORS
  'text-gray-800': 'text-subtle',
  'text-gray-50': 'text-inverse',
  'text-gray-300': 'text-inverse-subtle',

  // BORDER COLORS
  'border-gray-400': 'border-base',
  'border-gray-150': 'border-subtle'
};


### Ajustes adicionais: Substituir valores das variáveis “tw-prose...” do Tailwind para variáveis definidas no theme.json:

Importante! O token de cor `text-base` deve referenciado no estilo body do Tailwind, na variável --tw-prose-body, para que o usuário tenha o controle da cor base do texto. As demais cores devem ser alteradas com a função `color-mix()` do CSS com opacidade variável ou utilizar diretamente as variáveis semânticas conforme o elemento, de acordo com a descrição abaixo (incluir fallback para navegadores antigos):

  --tw-prose-body: var(--wp--preset--color--text-base);
  --tw-prose-headings: #111827; // color-mix(in srgb, var(--wp--preset--color--text-base) 70%, white);
  --tw-prose-lead: #4b5563; // color-mix(in srgb, var(--wp--preset--color--text-base) 70%, white);
  --tw-prose-links: #111827; // var(--wp--preset--color--link);
  --tw-prose-bold: #111827; // var(--wp--preset--color--text-base);
  --tw-prose-counters: #6b7280; // var(--wp--preset--color--text-base);
  --tw-prose-bullets: #d1d5db; // color-mix(in srgb, var(--wp--preset--color--text-base) 70%, white);
  --tw-prose-hr: #e5e7eb; // var(--wp--preset--color--text-base);
  --tw-prose-quotes: #111827; // color-mix(in srgb, var(--wp--preset--color--text-base) 70%, white);
  --tw-prose-quote-borders: #e5e7eb; // var(--wp-preset-color--border-base);
  --tw-prose-captions: #6b7280; // color-mix(in srgb, var(--wp--preset--color--text-base) 70%, white);
  --tw-prose-kbd: #111827; // color-mix(in srgb, var(--wp--preset--color--text-base) 60%, white);
  --tw-prose-kbd-shadows: 17 24 39; // color-mix(in srgb, var(--wp--preset--color--text-base) 30%, white);
  --tw-prose-code: #111827; // color-mix(in srgb, var(--wp--preset--color--text-base) 70%, white);
  --tw-prose-pre-code: #e5e7eb; // color-mix(in srgb, var(--wp--preset--color--text-base) 70%, white);
  --tw-prose-pre-bg: #1f2937; // color-mix(in srgb, var(--wp--preset--color--text-base) 70%, white);
  --tw-prose-th-borders: #d1d5db; // var(--wp-preset-color--border-subtle);
  --tw-prose-td-borders: #e5e7eb; // var(--wp-preset-color--border-subtle);
  --tw-prose-invert-body: #d1d5db; //  var(--wp--preset--color--text-inverse)
  --tw-prose-invert-headings: #fff; // color-mix(in srgb, var(--wp--preset--color--text-inverse) 70%, white);
  --tw-prose-invert-lead: #9ca3af; // color-mix(in srgb, var(--wp--preset--color--text-inverse) 70%, white);
  --tw-prose-invert-links: #fff; // color-mix(in srgb, var(--wp--preset--color--text-inverse) 60%, white);
  --tw-prose-invert-bold: #fff; // color-mix(in srgb, var(--wp--preset--color--text-inverse) 70%, white);
  --tw-prose-invert-counters: #9ca3af; // color-mix(in srgb, var(--wp--preset--color--text-inverse) 70%, white);
  --tw-prose-invert-bullets: #4b5563; // color-mix(in srgb, var(--wp--preset--color--text-inverse) 70%, white);
  --tw-prose-invert-hr: // var(--wp--preset--color--text-inverse);
  --tw-prose-invert-quotes: #f3f4f6; // color-mix(in srgb, var(--wp--preset--color--text-base) 70%, white);
  --tw-prose-invert-quote-borders: // color-mix(in srgb, var(--wp--preset--color--text-inverse) 50%, white);
  --tw-prose-invert-captions: #9ca3af; // color-mix(in srgb, var(--wp--preset--color--text-inverse) 70%, white);
  --tw-prose-invert-kbd: #fff; // color-mix(in srgb, var(--wp--preset--color--text-inverse) 70%, white);
  --tw-prose-invert-kbd-shadows: 255 255 255; // color-mix(in srgb, var(--wp--preset--color--text-inverse) 30%, white);
  --tw-prose-invert-code: #fff; // color-mix(in srgb, var(--wp--preset--color--text-inverse) 50%, white);
  --tw-prose-invert-pre-code: #d1d5db; // color-mix(in srgb, var(--wp--preset--color--text-inverse) 70%, white);
  --tw-prose-invert-pre-bg: rgb(0 0 0 / 50%); // color-mix(in srgb, var(--wp--preset--color--text-base) 70%, white);
  --tw-prose-invert-th-borders: #4b5563; // color-mix(in srgb, var(--wp--preset--color--text-inverse) 50%, white);
  --tw-prose-invert-td-borders:// color-mix(in srgb, var(--wp--preset--color--text-inverse) 50%, white);

## Convenções de Código
- **PHP**: Siga os [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/).
- **JavaScript**: Use apenas o necessário para interatividade dos blocos; siga o padrão ES6+.
- **CSS**: Sempre utilizar Tailwind CSS localizado em `tailwind_theme/`.
- **Estrutura de blocos**: Cada bloco deve ter seu próprio diretório em `blocks/` com arquivos de registro e scripts separados.
- **Funções auxiliares**: Localizar utilitários e helpers em `inc/`.

## Estrutura Relevante
```
block_theme/
|-- additional-editor-styles.css
|-- blocks/
|   |-- [individual block directories]
|-- header.php
|-- footer.php
|-- functions.php
|-- inc/
|   |-- custom.php
|   |-- wp_pg_blocks_helpers.php
|   |-- wp_pg_helpers.php
|   |-- wp_smart_navwalker.php
|-- index.php
|-- languages/
|-- styles.css
|-- screenshot.png
|-- tailwind_theme/
|   |-- tailwind.css
|   |-- tailwind_for_wp_editor.css
|-- templates/
|   |-- index.html
|   |-- [individual templates]
|-- theme.json
```

## Core Components

| Component                  | File Location                                      | Responsibility                                      | Key Classes/Functions                  |
|----------------------------|----------------------------------------------------|-----------------------------------------------------|----------------------------------------|
| Theme Setup                | `functions.php:4-71`                               | Initialize theme supports and features               | `block_theme_setup`                    |
| Block Registration         | `inc/wp_pg_blocks_helpers.php:13-279`              | Register and manage custom blocks                    | `PG_Blocks_v3`                         |
| Navigation                 | `inc/wp_smart_navwalker.php:15-279`                | Custom navigation walker for menus                   | `PG_Smart_Walker_Nav_Menu`             |
| Image Handling             | `inc/wp_pg_helpers.php:13-89`                      | Manage image URLs and attributes                     | `PG_Image`                             |
| Custom PHP Code            | `inc/custom.php:2-4`                               | Placeholder for additional PHP functionalities       | N/A                                    |


## Orientações para a IA
### Objetivo do script `semantic-colors.js`

Criar um script Node.js único que processa todos os arquivos exportados pelo Pinegrow (`theme.json`, `tailwind_theme/*.css`, `blocks/**/*.php`) e aplica as transformações semânticas de cor conforme o mapeamento definido neste aquivo.

### Abordagem Geral

* **Processamento batch** (executado uma vez após exportação do Pinegrow).
* **Método diferente por tipo de arquivo**:

  * `theme.json` → parser JSON.
  * Arquivos CSS → PostCSS AST.
  * Arquivos PHP → regex controlada + tokenização de classes.
* **Log detalhado** em `_tools/logs/semantic-colors-[timestamp].md` com todas as substituições realizadas.
* **Segurança**: nunca alterar arquivos inline sem backup temporário (`.bak`).

---

### 1. Manipulação do `theme.json`

* Use `fs.readFileSync` + `JSON.parse`.
* Apague a paleta Tailwind inteira.
* Insira a paleta semântica definida em `instructions.txt`, preservando os valores RGB equivalentes.
* Valide JSON com `JSON.stringify(obj, null, 2)` antes de sobrescrever.
* Logue cada cor removida e cada token adicionado.

### 2. Manipulação de CSS (`tailwind_theme/`)

* Use **PostCSS** com um plugin custom de transformação.
* Parse todas as rules. Se o seletor contiver `.bg-blue-700`, troque por `.brand-bg-base`, etc.
* Remova `--tw-bg-opacity` e substitua propriedades de cor por `var(--wp--preset--color--TOKEN)`.
* Preserve pseudo-classes (`hover:bg-blue-700` → `hover:brand-bg-base`).
* Minifique output com `cssnano` só ao final.
* Logue cada substituição (antes/depois do seletor e propriedades).

### 3. Manipulação de PHP (`blocks/`, `templates/`, etc.)

* Leia arquivo linha a linha.
* Localize atributos `class="..."` com regex restrita:

  ```regex
  class\s*=\s*"([^"]+)"
  ```
* Divida o conteúdo por espaço em array de classes.
* Substitua somente as classes que estão no `SEMANTIC_TOKEN_MAPPING`.
* Recombine em string, sobrescreva o atributo.
* Não tente interpretar PHP dinâmico (`<?php ... ?>`), apenas mexa em strings literais de classe.
* Logue cada classe substituída.

### 4. Logging

* Criar `_tools/logs/semantic-colors-[timestamp].md`.
* Estrutura sugerida:

  ```markdown
  # Execução semantic-colors.js – 2025-08-19

  ## theme.json
  - Removida cor: blue-700 → adicionada brand-bg-base (#1d4ed8)

  ## tailwind.css
  - .bg-blue-700 → .brand-bg-base
  - propriedade: background-color → var(--wp--preset--color--brand-bg-base)

  ## hero.php
  - classe: bg-blue-700 → brand-bg-base
  - classe: text-white → text-inverse
  ```

### 5. Restrições

* Não usar regex genérica em JSON ou CSS.
* Não hardcodar paths: trabalhar recursivamente (`glob` ou `fast-glob`).
* Não sobrescrever arquivos sem backup `.bak`.
* Seguir convenções do WordPress (sem inline CSS/JS).

---

👉 Ou seja: **JSON.parse para theme.json, PostCSS para CSS, regex controlada/tokenização para PHP**.
Isso evita 90% dos “gotchas” (quebra de sintaxe, pseudo-classes, JSON inválido).

---
### 6. Orientações adicionais
- Alterações no setup do tema *NUNCA* devem ser feitas em `functions.php`, o Pinegrow reescreve este arquivo manualmente sempre que o tema é gerado novamente.
- Customizações adicionais de PHP devem sempre ir em `inc/custom.php`.
- Sempre utilizar hooks e filtros do WordPress para extensibilidade, se necessário.
- Evitar hardcoding de caminhos e URLs.
- Sempre levar em consideração questões de segurança e desempenho ao pensar em soluções no código.

## Restrições
- Não usar bibliotecas externas não aprovadas (usar apenas WP core e Tailwind).
- Não modificar arquivos de núcleo do WordPress nem o functions.php do tema.
- Não incluir código inline de CSS/JS fora do padrão definido.
– Não inclua arquivos aleatórios na raiz do projeto.
– Registe todos os passos executados desde o início em arquivos .log (em Markdown) no diretório `_tools/logs/`.

## Performance e Segurança
- Minificar e otimizar scripts e estilos.
- Validar e sanitizar toda entrada de dados.
- Seguir as recomendações de segurança e desempenho do WordPress.
