const fs = require('fs');
const path = require('path');

const categories = [
    { name: 'Supplements', varName: 'supplements', fileName: 'Supplements.ts' },
    { name: 'Baby', varName: 'baby', fileName: 'Baby.ts' },
    { name: 'Bath', varName: 'bath', fileName: 'Bath.ts' },
    { name: 'Beauty', varName: 'beauty', fileName: 'Beauty.ts' },
    { name: 'Pets', varName: 'pets', fileName: 'Pets.ts' },
    { name: 'Sports', varName: 'sports', fileName: 'Sports.ts' },
    { name: 'Grocery', varName: 'grocery', fileName: 'Grocery.ts' },
    { name: 'Home', varName: 'home', fileName: 'Home.ts' }
];

const SOURCE_DIR = path.resolve(__dirname, '../../src/data/categories');
const DATA_DIR = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

console.log('🔄 Migrating existing products to USD and seeding scraper data...\n');

for (const cat of categories) {
    const tsPath = path.join(SOURCE_DIR, cat.fileName);
    const jsonPath = path.join(DATA_DIR, `${cat.name}.json`);

    if (fs.existsSync(tsPath)) {
        try {
            let content = fs.readFileSync(tsPath, 'utf8');

            // Extract the JSON array part
            // format: export const varName = [ ... ];
            const startIndex = content.indexOf('[');
            const endIndex = content.lastIndexOf(']');

            if (startIndex === -1 || endIndex === -1) {
                console.warn(`  ⚠️ Could not find array in ${cat.fileName}`);
                continue;
            }

            const jsonStr = content.substring(startIndex, endIndex + 1);
            const products = JSON.parse(jsonStr);

            // Convert prices if they are high numbers (likely UGX)
            // If they are low numbers, they might already be USD, so we should be careful.
            // But based on our logs and the user's request, they are in UGX.
            let migratedCount = 0;
            const updatedProducts = products.map(p => {
                // If price > 500, it's definitely UGX (even with markup, $500 is rare for these products)
                if (p.price > 500) {
                    const priceInUSD = (p.price / 3600) * 1.55;
                    p.price = Math.round(priceInUSD * 100) / 100;
                    migratedCount++;
                }
                return p;
            });

            fs.writeFileSync(jsonPath, JSON.stringify(updatedProducts, null, 2));
            console.log(`✅ ${cat.name}: Migrated ${migratedCount}/${products.length} products to USD and saved to JSON.`);
        } catch (e) {
            console.error(`❌ Error migrating ${cat.name}:`, e.message);
        }
    } else {
        console.warn(`⚠️ ${cat.fileName} does not exist yet.`);
    }
}

console.log('\n✨ Migration complete! Scraper is now ready to resume with USD pricing.');
