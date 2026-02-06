const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const categories = [
    { name: 'Supplements', url: 'https://ug.iherb.com/c/supplements', varName: 'supplements', fileName: 'Supplements.ts' },
    { name: 'Baby', url: 'https://ug.iherb.com/c/baby-kids-products', varName: 'baby', fileName: 'Baby.ts' },
    { name: 'Bath', url: 'https://ug.iherb.com/c/bath-personal-care', varName: 'bath', fileName: 'Bath.ts' },
    { name: 'Beauty', url: 'https://ug.iherb.com/c/beauty', varName: 'beauty', fileName: 'Beauty.ts' },
    { name: 'Pets', url: 'https://ug.iherb.com/c/pets', varName: 'pets', fileName: 'Pets.ts' },
    { name: 'Sports', url: 'https://ug.iherb.com/c/sports', varName: 'sports', fileName: 'Sports.ts' },
    { name: 'Grocery', url: 'https://ug.iherb.com/c/grocery', varName: 'grocery', fileName: 'Grocery.ts' },
    { name: 'Home', url: 'https://ug.iherb.com/c/healthy-home', varName: 'home', fileName: 'Home.ts' }
];

const DATA_DIR = path.join(__dirname, 'data');
const TARGET_DIR = path.resolve(__dirname, '../../src/data/categories');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// 1. Scrape Data
console.log('🕷️ Starting scrape process for all categories...\n');

for (const cat of categories) {
    try {
        console.log(`\n----------------------------------------`);
        console.log(`Processing: ${cat.name}`);
        // Run the scrape script synchronously
        // Limit to 48 products per category
        execSync(`node scripts/scraping/scrape-category.js "${cat.name}" "${cat.url}" 240`, {
            stdio: 'inherit',
            cwd: process.cwd()
        });
    } catch (error) {
        console.error(`❌ Failed to scrape ${cat.name}:`, error.message);
    }
}

// 2. Generate TypeScript Files
console.log('\n\n📝 Generating TypeScript files...');

for (const cat of categories) {
    const jsonPath = path.join(DATA_DIR, `${cat.name}.json`);
    const targetPath = path.join(TARGET_DIR, cat.fileName);

    if (fs.existsSync(jsonPath)) {
        try {
            const products = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

            // Format for TypeScript
            const tsContent = `export const ${cat.varName} = ${JSON.stringify(products, null, 2)};`;

            // Add type safety/imports if needed, but for now just raw array export matches existing style roughly
            // The existing style was: export const supplements = [ ... ];
            // We might want to fix the format to look cleaner (remove quotes on keys if possible, but JSON is valid JS/TS).
            // Actually, let's keep it simple. JSON is valid TS.

            fs.writeFileSync(targetPath, tsContent);
            console.log(`✅ Updated ${cat.fileName} with ${products.length} products`);
        } catch (e) {
            console.error(`❌ Error processing ${cat.name}:`, e.message);
        }
    } else {
        console.warn(`⚠️ No data found for ${cat.name}, skipping update.`);
    }
}

console.log('\n🎉 Import complete!');
