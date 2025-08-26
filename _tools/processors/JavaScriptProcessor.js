const fs = require('fs');
const path = require('path');
const BaseProcessor = require('./BaseProcessor');
const TokenManager = require('../utils/TokenManager');

class JavaScriptProcessor extends BaseProcessor {
    constructor(logger = null) {
        super(logger);
        // Set correct CSV path (one level up from _tools directory)
        const csvPath = path.join(__dirname, '..', '..', 'semantic-tokens.csv');
        this.tokenManager = new TokenManager(csvPath);
        this.gradientMapping = this.tokenManager.buildGradientMapping();
        this.tailwindMapping = this.tokenManager.getTailwindMapping();
        this.processedFiles = [];
        this.processedCount = 0;
    }

    /**
     * Process a single JavaScript file (BaseProcessor interface)
     * @param {string} filePath - File path
     * @param {string} content - File content
     * @returns {Promise<string>} Processed content
     */
    async processFile(filePath, content) {
        // Validate file
        if (!this.validateFile(filePath, content)) {
            this.log('debug', `File validation failed for ${filePath}`);
            return content;
        }

        // Start operation timing
        const startTime = Date.now();
        
        try {
            // Process the content
            const processedContent = this.processJavaScriptContent(content);
            
            // Update stats
            this.operationStats.filesProcessed++;
            this.operationStats.operationsPerformed++;
            
            const duration = Date.now() - startTime;
            this.log('debug', `Processed ${path.basename(filePath)} in ${duration}ms`);
            
            // Log the return value for debugging
            this.log('debug', `Returning content length: ${processedContent ? processedContent.length : 'undefined'} for ${path.basename(filePath)}`);
            
            // Always return content, even if unchanged
            const result = processedContent || content;
            this.log('debug', `Final result length: ${result ? result.length : 'undefined'} for ${path.basename(filePath)}`);
            return result;
            
        } catch (error) {
            this.operationStats.errorsEncountered++;
            this.log('error', `Error processing ${filePath}: ${error.message}`);
            throw error;
        }
    }

    /**
     * Process all JavaScript files in the blocks directory (legacy interface)
     */
    async processFiles(blocksDir = './blocks') {
        if (this.logger) {
            this.logger.log('info', '\n🔧 Processando arquivos JavaScript...');
        }
        
        try {
            const jsFiles = this.findJavaScriptFiles(blocksDir);
            
            if (jsFiles.length === 0) {
                if (this.logger) {
                    this.logger.log('info', 'ℹ️  Nenhum arquivo JavaScript encontrado para processar');
                }
                return { processedFiles: [], processedCount: 0 };
            }

            if (this.logger) {
                this.logger.log('info', `📁 Encontrados ${jsFiles.length} arquivo(s) JavaScript:`);
            }
            
            for (const file of jsFiles) {
                if (this.logger) {
                    this.logger.log('info', `   • ${file}`);
                }
                await this.processIndividualFile(file);
            }

            if (this.logger) {
                this.logger.log('info', `✅ JavaScript: ${this.processedCount} arquivo(s) processado(s) com sucesso`);
            }
            
            return {
                processedFiles: this.processedFiles,
                processedCount: this.processedCount
            };
            
        } catch (error) {
            if (this.logger) {
                this.logger.log('error', 'Erro ao processar arquivos JavaScript:', error.message);
            }
            throw error;
        }
    }

    /**
     * Find all JavaScript files in blocks directory
     */
    findJavaScriptFiles(blocksDir) {
        const jsFiles = [];
        
        function searchDirectory(dir) {
            if (!fs.existsSync(dir)) return;
            
            const items = fs.readdirSync(dir);
            
            for (const item of items) {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    searchDirectory(fullPath);
                } else if (item.endsWith('.js')) {
                    jsFiles.push(fullPath);
                }
            }
        }
        
        searchDirectory(blocksDir);
        return jsFiles;
    }

    /**
     * Process a single JavaScript file
     */
    async processIndividualFile(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const processedContent = this.processJavaScriptContent(content);
            
            if (content !== processedContent) {
                // Create backup before modifying
                await this.createBackup(filePath, content);
                
                // Write processed content
                fs.writeFileSync(filePath, processedContent, 'utf8');
                
                this.processedFiles.push(filePath);
                this.processedCount++;
                
                if (this.logger) {
                    this.logger.log('info', `   ✓ ${filePath} - classes convertidas`);
                }
            } else {
                if (this.logger) {
                    this.logger.log('info', `   • ${filePath} - nenhuma conversão necessária`);
                }
            }
            
        } catch (error) {
            if (this.logger) {
                this.logger.log('error', `❌ Erro ao processar ${filePath}:`, error.message);
            }
            throw error;
        }
    }

    /**
     * Process JavaScript content, converting Tailwind classes to semantic classes
     */
    processJavaScriptContent(content) {
        let processedContent = content;
        const gradientTokens = this.tokenManager.getGradientTokens();
        const allTokens = this.tokenManager.tokens;
        
        // Log for debugging
        if (this.logger) {
            this.logger.log('debug', `Processing JavaScript content: ${content ? content.length : 'undefined'} chars`);
            this.logger.log('debug', `Found ${gradientTokens.length} gradient tokens and ${allTokens.length} total tokens`);
        }
        
        // Process all tokens (including gradients and regular classes)
        for (const token of allTokens) {
            if (!token.tailwindClass || !token.slug) continue;
            
            // Convert different className patterns:
            
            // 1. Simple string: className: 'bg-blue-700 text-white'
            const simplePattern = new RegExp(
                `className:\\s*['"]([^'"]*\\b${this.escapeRegex(token.tailwindClass)}\\b[^'"]*)['"]`,
                'g'
            );
            
            // 2. Template literal: className: `bg-blue-700 text-white`
            const templatePattern = new RegExp(
                `className:\\s*\`([^\`]*\\b${this.escapeRegex(token.tailwindClass)}\\b[^\`]*)\``,
                'g'
            );
            
            // 3. Concatenated strings
            const concatPattern = new RegExp(
                `(['"])[^'"]*\\b${this.escapeRegex(token.tailwindClass)}\\b[^'"]*\\1`,
                'g'
            );
            
            // Process simple string pattern
            processedContent = processedContent.replace(simplePattern, (match, classContent) => {
                const newClassContent = classContent.replace(
                    new RegExp(`\\b${this.escapeRegex(token.tailwindClass)}\\b`, 'g'),
                    token.slug
                );
                return match.replace(classContent, newClassContent);
            });
            
            // Process template literal pattern
            processedContent = processedContent.replace(templatePattern, (match, classContent) => {
                const newClassContent = classContent.replace(
                    new RegExp(`\\b${this.escapeRegex(token.tailwindClass)}\\b`, 'g'),
                    token.slug
                );
                return match.replace(classContent, newClassContent);
            });
            
            // Process individual strings in concatenation
            processedContent = processedContent.replace(concatPattern, (match) => {
                return match.replace(
                    new RegExp(`\\b${this.escapeRegex(token.tailwindClass)}\\b`, 'g'),
                    token.slug
                );
            });
        }
        
        // Log for debugging
        if (this.logger) {
            this.logger.log('debug', `Processed content length: ${processedContent ? processedContent.length : 'undefined'}`);
            this.logger.log('debug', `Content changed: ${content !== processedContent}`);
        }
        
        return processedContent;
    }

    /**
     * Escape special regex characters in Tailwind classes
     */
    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * Create backup of file before modification
     */
    async createBackup(filePath, content) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupDir = path.join(__dirname, '../backups');
        
        // Ensure backup directory exists
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
        }
        
        const fileName = path.basename(filePath);
        const backupPath = path.join(backupDir, `${fileName}.${timestamp}.bak`);
        
        fs.writeFileSync(backupPath, content, 'utf8');
    }
}

module.exports = JavaScriptProcessor;
