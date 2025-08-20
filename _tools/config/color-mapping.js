/**
 * Mapeamento Semântico de Cores Tailwind → WordPress
 * 
 * Este arquivo define a conversão entre classes do Tailwind CSS
 * e tokens semânticos para o sistema de Global Styles do WordPress.
 */

// Mapeamento principal: Tailwind Classes → Semantic Tokens
const SEMANTIC_COLOR_MAPPING = {
  // Cores da marca
  'bg-blue-700': 'brand-bg-base',
  'bg-green-600': 'brand-bg-alt', 
  'bg-red-600': 'brand-bg-accent',
  'text-blue-700': 'brand-text-base',
  'text-green-600': 'brand-text-alt',
  'text-red-600': 'brand-text-accent',

  // Cores de fundo
  'bg-white': 'bg-base',
  'bg-gray-200': 'bg-subtle',
  'bg-gray-950': 'bg-inverse',
  'bg-gray-900': 'bg-inverse-subtle',

  // Cores de texto
  'text-gray-900': 'text-base',
  'text-gray-800': 'text-subtle',
  'text-gray-50': 'text-inverse',
  'text-gray-300': 'text-inverse-subtle',
  'text-white': 'text-inverse',

  // Cores de borda
  'border-gray-400': 'border-base',
  'border-gray-150': 'border-subtle',
  'border-base': 'border-base', // Mapear classe semântica para ela mesma

  // Cores de feedback
  'bg-green-200': 'bg-success',
  'bg-yellow-200': 'bg-warning', 
  'bg-red-200': 'bg-error',
  'bg-blue-200': 'bg-info',

  // Cores de elementos
  'bg-blue-600': 'button-base',
  'bg-transparent': 'button-inverse',
  'bg-red-500': 'button-accent',
  'bg-gray-250': 'card'
};

// Paleta semântica para theme.json
const SEMANTIC_PALETTE = [
  // Cores da marca
  {
    color: "rgba(29,78,216,1)",
    name: "Marca (fundo base)",
    slug: "brand-bg-base"
  },
  {
    color: "rgba(22,163,74,1)",
    name: "Marca (fundo alternativo)",
    slug: "brand-bg-alt"
  },
  {
    color: "rgba(220,38,38,1)",
    name: "Marca (fundo acento)",
    slug: "brand-bg-accent"
  },
  {
    color: "rgba(29,78,216,1)",
    name: "Marca (texto base)",
    slug: "brand-text-base"
  },
  {
    color: "rgba(22,163,74,1)",
    name: "Marca (texto alternativo)",
    slug: "brand-text-alt"
  },
  {
    color: "rgba(220,38,38,1)",
    name: "Marca (texto acento)",
    slug: "brand-text-accent"
  },

  // Cores de fundo
  {
    color: "rgba(255,255,255,1)",
    name: "Fundo base",
    slug: "bg-base"
  },
  {
    color: "rgba(229,231,235,1)",
    name: "Fundo suave",
    slug: "bg-subtle"
  },
  {
    color: "rgba(3,7,18,1)",
    name: "Fundo inverso",
    slug: "bg-inverse"
  },
  {
    color: "rgba(17,24,39,1)",
    name: "Fundo inverso suave",
    slug: "bg-inverse-subtle"
  },

  // Cores de texto
  {
    color: "rgba(17,24,39,1)",
    name: "Texto base",
    slug: "text-base"
  },
  {
    color: "rgba(31,41,55,1)",
    name: "Texto suave",
    slug: "text-subtle"
  },
  {
    color: "rgba(249,250,251,1)",
    name: "Texto inverso",
    slug: "text-inverse"
  },
  {
    color: "rgba(209,213,219,1)",
    name: "Texto inverso suave",
    slug: "text-inverse-subtle"
  },

  // Cores de borda
  {
    color: "rgba(156,163,175,1)",
    name: "Borda base",
    slug: "border-base"
  },
  {
    color: "rgba(229,231,235,1)",
    name: "Borda suave",
    slug: "border-subtle"
  },

  // Cores de feedback
  {
    color: "rgba(187,247,208,1)",
    name: "Fundo sucesso",
    slug: "bg-success"
  },
  {
    color: "rgba(254,240,138,1)",
    name: "Fundo aviso",
    slug: "bg-warning"
  },
  {
    color: "rgba(254,202,202,1)",
    name: "Fundo erro",
    slug: "bg-error"
  },
  {
    color: "rgba(191,219,254,1)",
    name: "Fundo informação",
    slug: "bg-info"
  },

  // Cores de elementos
  {
    color: "rgba(37,99,235,1)",
    name: "Botão base",
    slug: "button-base"
  },
  {
    color: "rgba(0,0,0,0)",
    name: "Botão inverso",
    slug: "button-inverse"
  },
  {
    color: "rgba(239,68,68,1)",
    name: "Botão acento",
    slug: "button-accent"
  },
  {
    color: "rgba(243,244,246,1)",
    name: "Quadro",
    slug: "card"
  }
];

// Mapeamento de variáveis CSS Prose do Tailwind
const PROSE_VARIABLE_MAPPING = {
  // Fallbacks básicos
  fallbacks: {
    '--tw-prose-body': 'var(--wp--preset--color--text-base)',
    '--tw-prose-headings': 'var(--wp--preset--color--text-base)',
    '--tw-prose-lead': 'var(--wp--preset--color--text-base)',
    '--tw-prose-links': 'var(--wp--preset--color--link)',
    '--tw-prose-bold': 'var(--wp--preset--color--text-base)',
    '--tw-prose-counters': 'var(--wp--preset--color--text-base)',
    '--tw-prose-bullets': 'var(--wp--preset--color--text-base)',
    '--tw-prose-hr': 'var(--wp--preset--color--border-subtle)',
    '--tw-prose-quotes': 'var(--wp--preset--color--text-base)',
    '--tw-prose-quote-borders': 'var(--wp--preset--color--border-base)',
    '--tw-prose-captions': 'var(--wp--preset--color--text-base)',
    '--tw-prose-kbd': 'var(--wp--preset--color--text-base)',
    '--tw-prose-kbd-shadows': '17 24 39',
    '--tw-prose-code': 'var(--wp--preset--color--text-base)',
    '--tw-prose-pre-code': 'var(--wp--preset--color--text-base)',
    '--tw-prose-pre-bg': 'var(--wp--preset--color--bg-inverse)',
    '--tw-prose-th-borders': 'var(--wp--preset--color--border-subtle)',
    '--tw-prose-td-borders': 'var(--wp--preset--color--border-subtle)',

    // Variáveis invertidas
    '--tw-prose-invert-body': 'var(--wp--preset--color--text-inverse)',
    '--tw-prose-invert-headings': 'var(--wp--preset--color--text-inverse)',
    '--tw-prose-invert-lead': 'var(--wp--preset--color--text-inverse)',
    '--tw-prose-invert-links': 'var(--wp--preset--color--text-inverse)',
    '--tw-prose-invert-bold': 'var(--wp--preset--color--text-inverse)',
    '--tw-prose-invert-counters': 'var(--wp--preset--color--text-inverse)',
    '--tw-prose-invert-bullets': 'var(--wp--preset--color--text-inverse)',
    '--tw-prose-invert-hr': 'var(--wp--preset--color--border-inverse-subtle)',
    '--tw-prose-invert-quotes': 'var(--wp--preset--color--text-inverse)',
    '--tw-prose-invert-quote-borders': 'var(--wp--preset--color--border-inverse)',
    '--tw-prose-invert-captions': 'var(--wp--preset--color--text-inverse)',
    '--tw-prose-invert-kbd': 'var(--wp--preset--color--text-inverse)',
    '--tw-prose-invert-kbd-shadows': '255 255 255',
    '--tw-prose-invert-code': 'var(--wp--preset--color--text-inverse)',
    '--tw-prose-invert-pre-code': 'var(--wp--preset--color--text-inverse)',
    '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
    '--tw-prose-invert-th-borders': 'var(--wp--preset--color--border-inverse-subtle)',
    '--tw-prose-invert-td-borders': 'var(--wp--preset--color--border-inverse-subtle)'
  },

  // Overrides com color-mix para melhor experiência
  overrides: {
    '--tw-prose-headings': 'color-mix(in srgb, var(--wp--preset--color--text-base) 70%, white)',
    '--tw-prose-lead': 'color-mix(in srgb, var(--wp--preset--color--text-base) 70%, white)',
    '--tw-prose-bullets': 'color-mix(in srgb, var(--wp--preset--color--text-base) 70%, white)',
    '--tw-prose-quotes': 'color-mix(in srgb, var(--wp--preset--color--text-base) 70%, white)',
    '--tw-prose-captions': 'color-mix(in srgb, var(--wp--preset--color--text-base) 70%, white)',
    '--tw-prose-kbd': 'color-mix(in srgb, var(--wp--preset--color--text-base) 60%, white)',
    '--tw-prose-code': 'color-mix(in srgb, var(--wp--preset--color--text-base) 70%, white)',
    '--tw-prose-pre-code': 'color-mix(in srgb, var(--wp--preset--color--text-base) 70%, white)',
    '--tw-prose-pre-bg': 'color-mix(in srgb, var(--wp--preset--color--text-base) 70%, white)',

    '--tw-prose-invert-headings': 'color-mix(in srgb, var(--wp--preset--color--text-inverse) 70%, white)',
    '--tw-prose-invert-lead': 'color-mix(in srgb, var(--wp--preset--color--text-inverse) 70%, white)',
    '--tw-prose-invert-links': 'color-mix(in srgb, var(--wp--preset--color--text-inverse) 60%, white)',
    '--tw-prose-invert-bold': 'color-mix(in srgb, var(--wp--preset--color--text-inverse) 70%, white)',
    '--tw-prose-invert-counters': 'color-mix(in srgb, var(--wp--preset--color--text-inverse) 70%, white)',
    '--tw-prose-invert-bullets': 'color-mix(in srgb, var(--wp--preset--color--text-inverse) 70%, white)',
    '--tw-prose-invert-quotes': 'color-mix(in srgb, var(--wp--preset--color--text-inverse) 70%, white)',
    '--tw-prose-invert-quote-borders': 'color-mix(in srgb, var(--wp--preset--color--text-inverse) 50%, white)',
    '--tw-prose-invert-captions': 'color-mix(in srgb, var(--wp--preset--color--text-inverse) 70%, white)',
    '--tw-prose-invert-code': 'color-mix(in srgb, var(--wp--preset--color--text-inverse) 50%, white)',
    '--tw-prose-invert-pre-code': 'color-mix(in srgb, var(--wp--preset--color--text-inverse) 70%, white)'
  }
};

// Patterns úteis para identificação de classes
const CSS_PATTERNS = {
  // Pattern para classes de background Tailwind
  TAILWIND_BG_CLASS: /\.bg-([\w-]+)\s*{[^}]*background-color[^}]*}/g,
  
  // Pattern para classes de text Tailwind
  TAILWIND_TEXT_CLASS: /\.text-([\w-]+)\s*{[^}]*color[^}]*}/g,
  
  // Pattern para classes de border Tailwind
  TAILWIND_BORDER_CLASS: /\.border-([\w-]+)\s*{[^}]*border-color[^}]*}/g,

  // Pattern para variáveis prose
  PROSE_VARIABLE: /--tw-prose-[\w-]+/g,

  // Pattern para valor de background-color
  BG_COLOR_VALUE: /background-color:\s*([^;]+);/g,

  // Pattern para tw-bg-opacity
  TW_BG_OPACITY: /--tw-bg-opacity:\s*[^;]+;/g
};

// Regex patterns para PHP
const PHP_PATTERNS = {
  // Pattern para class attributes em PHP
  CLASS_ATTRIBUTE: /class\s*=\s*["']([^"']+)["']/g,
  
  // Pattern para identificar contexts PHP válidos
  PHP_CONTEXT: /<[^>]*\sclass\s*=\s*["'][^"']*(?:bg-|text-|border-)[^"']*["'][^>]*>/g
};

module.exports = {
  SEMANTIC_COLOR_MAPPING,
  SEMANTIC_PALETTE,
  PROSE_VARIABLE_MAPPING,
  CSS_PATTERNS,
  PHP_PATTERNS
};
