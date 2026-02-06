const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Configuration
const DATA_DIR = path.join(__dirname, 'data');
const PUBLIC_IMG_DIR = path.resolve(__dirname, '../../public/images/products');
const TARGET_DIR = path.resolve(__dirname, '../../src/data/categories');

// Categories map for file generation later
const categoryMap = {
    'Supplements': 'supplements',
    'Baby': 'baby',
    'Bath': 'bath',
    'Beauty': 'beauty',
    'Pets': 'pets',
    'Sports': 'sports',
    'Grocery': 'grocery',
    'Home': 'home'
};

// Ensure directories exist
if (!fs.existsSync(PUBLIC_IMG_DIR)) {
    fs.mkdirSync(PUBLIC_IMG_DIR, { recursive: true });
}

async function downloadImage(url, destPath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(destPath);

        const request = https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://ug.iherb.com/',
                'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
            }
        }, function (response) {
            if (response.statusCode !== 200) {
                fs.unlink(destPath, () => { }); // Delete empty file
                reject(new Error(`Failed to download: Status Code ${response.statusCode}`));
                return;
            }

            response.pipe(file);

            file.on('finish', function () {
                file.close(() => resolve(true));
            });
        });

        request.on('error', function (err) {
            fs.unlink(destPath, () => { });
            reject(err);
        });

        request.end();
    });
}

async function processImages() {
    console.log('🖼️  Starting image download process...\n');

    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));

    for (const file of files) {
        const categoryName = path.basename(file, '.json');
        console.log(`\n📂 Processing ${categoryName}...`);

        const content = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
        const categoryImgDir = path.join(PUBLIC_IMG_DIR, categoryName.toLowerCase());

        if (!fs.existsSync(categoryImgDir)) {
            fs.mkdirSync(categoryImgDir, { recursive: true });
        }

        let updatedCount = 0;
        let downloadedCount = 0;

        for (const product of content) {
            if (product.image && product.image.startsWith('http')) {
                try {
                    // Create a valid filename from ID or name
                    // Some IDs might be URLs, so we santize
                    const safeId = String(product.id).replace(/[^a-z0-9]/gi, '_');
                    const extension = path.extname(product.image.split('?')[0]) || '.jpg';
                    const fileName = `${safeId}${extension}`;
                    const localPath = path.join(categoryImgDir, fileName);
                    const publicPath = `/images/products/${categoryName.toLowerCase()}/${fileName}`;

                    // Check if exists
                    if (!fs.existsSync(localPath)) {
                        process.stdout.write(`  ⬇️  Downloading ${fileName}... `);
                        await downloadImage(product.image, localPath);
                        console.log('✅');
                        downloadedCount++;
                        // Rate limit slightly
                        await new Promise(r => setTimeout(r, 200));
                    }

                    // Update the product object
                    product.image = publicPath;
                    updatedCount++;

                } catch (err) {
                    console.error(`  ❌ Error downloading for ${product.name.substring(0, 20)}...: ${err.message}`);
                    // Keep original URL as fallback? Or placeholder?
                    // product.image = '/images/placeholder.jpg'; 
                }
            }
        }

        console.log(`  ✨ Downloaded ${downloadedCount} new images.`);
        console.log(`  🔄 Updated paths for ${updatedCount} products.`);

        // Save the updated JSON back to file
        fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(content, null, 2));
    }

    console.log('\n\n✅ Image download complete. Regenerating TS files...');
    generateTSFiles();
}

function generateTSFiles() {
    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));

    for (const file of files) {
        const categoryName = path.basename(file, '.json');
        const varName = categoryMap[categoryName];

        if (!varName) {
            console.warn(`Skipping unknown category file: ${file}`);
            continue;
        }

        const content = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
        const targetPath = path.join(TARGET_DIR, `${categoryName}.ts`);

        // Create TS content
        const tsContent = `export const ${varName} = ${JSON.stringify(content, null, 2)};`;

        fs.writeFileSync(targetPath, tsContent);
        console.log(`  📄 Updated ${categoryName}.ts`);
    }
}

processImages().catch(console.error);
