const fs = require('fs-extra');
const csv = require('csv-parser');

class CsvParser {
  static parse(csvPath) {
    if (!fs.existsSync(csvPath)) {
      throw new Error(`Arquivo CSV não encontrado: ${csvPath}`);
    }

    const csvContent = fs.readFileSync(csvPath, 'utf8');
    const rows = [];
    
    // Parse CSV manualmente para compatibilidade
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',');
    
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '') continue;
      
      const values = lines[i].split(',');
      const row = {};
      
      headers.forEach((header, index) => {
        row[header.trim()] = values[index] ? values[index].trim() : '';
      });
      
      rows.push({
        lineNumber: i + 1,
        ...row
      });
    }
    
    return rows;
  }

  static validate(rows) {
    const errors = [];
    const slugs = new Set();
    
    rows.forEach(row => {
      // Validar campos obrigatórios
      const requiredFields = ['category', 'slug', 'tailwind_class', 'color_hex', 'color_rgb', 'name', 'status'];
      requiredFields.forEach(field => {
        if (!row[field] || row[field].trim() === '') {
          errors.push(`Linha ${row.lineNumber}: Campo obrigatório "${field}" está vazio`);
        }
      });
      
      // Validar slug único
      if (slugs.has(row.slug)) {
        errors.push(`Linha ${row.lineNumber}: Slug duplicado "${row.slug}"`);
      }
      slugs.add(row.slug);
      
      // Validar formato hex (aceita 6 ou 8 dígitos para transparência)
      if (!/^#[0-9A-F]{6,8}$/i.test(row.color_hex)) {
        errors.push(`Linha ${row.lineNumber}: Formato hex inválido "${row.color_hex}"`);
      }
      
      // Validar formato RGB (aceita 3 ou 4 valores para transparência)
      if (!/^\d+\s+\d+\s+\d+(\s+\d+)?$/.test(row.color_rgb)) {
        errors.push(`Linha ${row.lineNumber}: Formato RGB inválido "${row.color_rgb}"`);
      }
      
      // Validar status
      const validStatuses = ['active', 'inactive', 'draft'];
      if (!validStatuses.includes(row.status)) {
        errors.push(`Linha ${row.lineNumber}: Status inválido "${row.status}" (deve ser: ${validStatuses.join(', ')})`);
      }
    });
    
    return errors;
  }

  static generateTemplate() {
    const template = `category,slug,tailwind_class,color_hex,color_rgb,name,description,status
brand,brand-bg-base,bg-blue-700,#1d4ed8,29 78 216,Marca (fundo base),Cor de fundo principal da marca,active
brand,brand-bg-alt,bg-green-600,#16a34a,22 163 74,Marca (fundo alternativo),Cor secundária da marca,active
brand,brand-bg-accent,bg-red-600,#dc2626,220 38 38,Marca (fundo acento),Cor de destaque da marca,active
background,bg-base,bg-white,#ffffff,255 255 255,Fundo base,Fundo principal do sistema,active
background,bg-subtle,bg-gray-200,#e5e7eb,229 231 235,Fundo sutil,Fundo secundário do sistema,active
text,text-base,text-gray-900,#111827,17 24 39,Texto base,Cor principal de texto,active
text,text-subtle,text-gray-800,#1f2937,31 41 55,Texto sutil,Cor secundária de texto,active
border,border-base,border-gray-400,#9ca3af,156 163 175,Borda base,Cor padrão de bordas,active
button,button-base,bg-blue-600,#2563eb,37 99 235,Botão base,Cor principal de botões,active
button,button-inverse,bg-transparent,#00000000,0 0 0 0,Botão inverso,Botão com fundo transparente,active
state,bg-success,bg-green-200,#bbf7d0,187 247 208,Sucesso,Cor para estados de sucesso,active
state,bg-warning,bg-yellow-200,#fef3c7,254 243 199,Aviso,Cor para estados de aviso,active
state,bg-error,bg-red-200,#fecaca,254 202 202,Erro,Cor para estados de erro,active
state,bg-info,bg-blue-200,#bfdbfe,191 219 254,Informação,Cor para estados informativos,active
ui,card,bg-gray-250,#f9fafb,249 250 251,Card,Fundo para componentes de card,active`;

    return template;
  }
}

module.exports = CsvParser;
