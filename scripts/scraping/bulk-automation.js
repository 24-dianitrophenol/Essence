const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const config = [
    { name: 'Beauty', url: 'https://ug.iherb.com/c/beauty', limit: 1000, varName: 'beauty', fileName: 'Beauty.ts' },
    { name: 'Grocery', url: 'https://ug.iherb.com/c/grocery', limit: 1000, varName: 'grocery', fileName: 'Grocery.ts' }
];

const DATA_DIR = path.join(__dirname, 'data');
const TARGET_DIR = path.resolve(__dirname, '../../src/data/categories');

function runCommand(cmd) {
    console.log(`\nExecuting: ${cmd}`);
    try {
        execSync(cmd, { stdio: 'inherit', cwd: process.cwd() });
        return true;
    } catch (e) {
        console.error(`❌ Command failed: ${e.message}`);
        return false;
    }
}

async function start() {
    console.log('🚀 Starting Automated Scrape and Sync Pulse...');

    for (const cat of config) {
        console.log(`\n--- Working on ${cat.name} ---`);

        // 1. Scrape
        runCommand(`node scripts/scraping/scrape-category.js "${cat.name}" "${cat.url}" ${cat.limit}`);

        // 2. Sync
        const jsonPath = path.join(DATA_DIR, `${cat.name}.json`);
        const targetPath = path.join(TARGET_DIR, cat.fileName);

        if (fs.existsSync(jsonPath)) {
            const products = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
            const tsContent = `export const ${cat.varName} = ${JSON.stringify(products, null, 2)};`;
            fs.writeFileSync(targetPath, tsContent);
            console.log(`✅ Synced ${cat.name}: ${products.length} products`);
        }

        // 3. Middle Commit to save progress
        runCommand(`git add . && git commit -m "Auto Bulk: Progress update for ${cat.name}" && git push`);
    }

    console.log('\n✨ Automation Pulse Complete!');
}

start();
