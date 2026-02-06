const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');

const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));

files.forEach(file => {
    const filePath = path.join(DATA_DIR, file);
    const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const seen = new Set();
    const uniqueProducts = products.filter(p => {
        if (seen.has(p.id)) return false;
        seen.add(p.id);
        return true;
    });

    fs.writeFileSync(filePath, JSON.stringify(uniqueProducts, null, 2));
    console.log(`Deduplicated ${file}: ${products.length} -> ${uniqueProducts.length}`);
});
