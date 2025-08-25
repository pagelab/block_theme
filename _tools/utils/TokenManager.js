const fs = require('fs-extra');
const path = require('path');
const csv = require('csv-parser');
const { SEMANTIC_COLOR_MAPPING, SEMANTIC_PALETTE } = require('../config/color-mapping');

class TokenManager {
  constructor(csvPath = null) {
    this.csvPath = csvPath || path.join(process.cwd(), 'semantic-tokens.csv');
    this.tokens = this.loadTokens();
  }

  loadTokens() {
    if (!fs.existsSync(this.csvPath)) {
      console.log('📄 CSV não encontrado, usando configuração JavaScript...');
      return this.loadFromJs();
    }
    return this.loadFromCsv();
  }

  loadFromCsv() {
    const csvContent = fs.readFileSync(this.csvPath, 'utf8');
    const rows = [];
    
    // Parse CSV com suporte a campos com vírgulas entre aspas
    const lines = csvContent.split('\n');
    const headers = this.parseCsvLine(lines[0]);
    
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '') continue;
      
      const values = this.parseCsvLine(lines[i]);
      const row = {};
      
      headers.forEach((header, index) => {
        row[header.trim()] = values[index] ? values[index].trim() : '';
      });
      
      rows.push(row);
    }
    
    return rows
      .filter(row => row.status === 'active')
      .map(row => ({
        category: row.category,
        slug: row.slug,
        tailwindClass: row.tailwind_class,
        colorHex: row.color_hex,
        colorRgb: row.color_rgb,
        name: row.name,
        description: row.description || '',
        gradientCss: row.gradient_css || ''
      }));
  }

  // Parser CSV que lida com campos entre aspas contendo vírgulas
  parseCsvLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          // Aspas duplas escapadas
          current += '"';
          i++; // Pular próximo caractere
        } else {
          // Alternar estado de aspas
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        // Vírgula fora de aspas = novo campo
        values.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    
    // Adicionar último campo
    values.push(current);
    
    return values;
  }

  loadFromJs() {
    // Fallback para configuração JavaScript existente
    return SEMANTIC_PALETTE.map(color => ({
      category: this.detectCategory(color.slug),
      slug: color.slug,
      tailwindClass: this.findTailwindClass(color.slug),
      colorHex: this.rgbToHex(color.color),
      colorRgb: this.extractRgb(color.color),
      name: color.name,
      description: ''
    }));
  }

  getTailwindMapping() {
    const mapping = {};
    this.tokens.forEach(token => {
      mapping[token.tailwindClass] = token.slug;
    });
    return mapping;
  }

  getSemanticPalette() {
    return this.tokens
      .filter(token => token.category !== 'gradient')
      .map(token => ({
        color: `rgba(${token.colorRgb.replace(/\s+/g, ',')},1)`,
        name: token.name,
        slug: token.slug
      }));
  }

  /**
   * Get gradient tokens from CSV
   * @returns {Array} Array of gradient token objects
   */
  getGradientTokens() {
    return this.tokens.filter(token => token.category === 'gradient' && token.gradientCss);
  }

  /**
   * Build gradient mapping for converting Tailwind classes to semantic classes
   * @returns {Object} Mapping of Tailwind gradient classes to semantic classes
   */
  buildGradientMapping() {
    const gradients = this.getGradientTokens();
    const mapping = {};
    
    gradients.forEach(token => {
      // Mapear classes Tailwind complexas para classes semânticas
      mapping[token.tailwindClass] = token.slug;
    });
    
    return mapping;
  }

  validateTokens() {
    const errors = [];
    const slugs = new Set();
    
    this.tokens.forEach((token, index) => {
      // Validar slug único
      if (slugs.has(token.slug)) {
        errors.push(`Linha ${index + 2}: Slug duplicado "${token.slug}"`);
      }
      slugs.add(token.slug);
      
      // Validar formato hex
      if (!/^#[0-9A-F]{6}$/i.test(token.colorHex)) {
        errors.push(`Linha ${index + 2}: Formato hex inválido "${token.colorHex}"`);
      }
      
      // Validar formato RGB
      if (!/^\d+\s+\d+\s+\d+$/.test(token.colorRgb)) {
        errors.push(`Linha ${index + 2}: Formato RGB inválido "${token.colorRgb}"`);
      }
    });
    
    return errors;
  }

  exportToCsv(outputPath = null) {
    const csvPath = outputPath || this.csvPath;
    const csvContent = this.generateCsvContent();
    fs.writeFileSync(csvPath, csvContent);
    console.log(`✅ CSV exportado para: ${csvPath}`);
  }

  generateCsvContent() {
    const header = 'category,slug,tailwind_class,color_hex,color_rgb,name,description,status\n';
    const rows = this.tokens.map(token => 
      `${token.category},${token.slug},${token.tailwindClass},${token.colorHex},${token.colorRgb},"${token.name}","${token.description}",active`
    ).join('\n');
    
    return header + rows;
  }

  detectCategory(slug) {
    if (slug.startsWith('brand')) return 'brand';
    if (slug.startsWith('bg-')) return 'background';
    if (slug.startsWith('text-')) return 'text';
    if (slug.startsWith('border-')) return 'border';
    if (slug.startsWith('button-')) return 'button';
    if (slug.includes('success') || slug.includes('warning') || slug.includes('error') || slug.includes('info')) return 'state';
    return 'other';
  }

  findTailwindClass(slug) {
    // Mapeamento reverso para encontrar classe Tailwind
    for (const [tailwindClass, semanticSlug] of Object.entries(SEMANTIC_COLOR_MAPPING)) {
      if (semanticSlug === slug) return tailwindClass;
    }
    return '';
  }

  rgbToHex(rgbString) {
    const match = rgbString.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (match) {
      const r = parseInt(match[1]);
      const g = parseInt(match[2]);
      const b = parseInt(match[3]);
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    return '#000000';
  }

  extractRgb(rgbString) {
    const match = rgbString.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (match) {
      return `${match[1]} ${match[2]} ${match[3]}`;
    }
    return '0 0 0';
  }
}

module.exports = TokenManager;
