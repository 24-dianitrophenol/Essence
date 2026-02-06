const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

/**
 * Test scraper to verify iHerb scraping works
 * This will scrape just 5 products from Supplements category
 */

async function testScraper() {
    console.log('🧪 Testing iHerb scraper...\n');

    const browser = await puppeteer.launch({
        headless: false, // Set to true in production
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set realistic user agent
    await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    try {
        console.log('📍 Navigating to iHerb Supplements page...');
        await page.goto('https://ug.iherb.com/c/supplements', {
            waitUntil: 'networkidle2',
            timeout: 30000
        });

        console.log('✅ Page loaded\n');

        // Wait for products to load
        console.log('⏳ Waiting for products to load...');
        await page.waitForSelector('.product-cell', { timeout: 10000 });
        console.log('✅ Products found\n');

        // Extract product data
        console.log('📊 Extracting product data...');
        const products = await page.evaluate(() => {
            const productElements = document.querySelectorAll('.product-cell');
            const results = [];

            // Get first 5 products only
            for (let i = 0; i < Math.min(5, productElements.length); i++) {
                const element = productElements[i];

                try {
                    const link = element.querySelector('a.product-link');
                    const title = element.querySelector('.product-title');
                    const price = element.querySelector('.price');
                    const image = element.querySelector('img');

                    if (title && price && image) {
                        results.push({
                            name: title.textContent.trim(),
                            price: price.textContent.trim(),
                            image: image.src,
                            url: link ? link.href : '',
                            id: link ? link.href.split('/').pop().split('?')[0] : ''
                        });
                    }
                } catch (err) {
                    console.error('Error parsing product:', err);
                }
            }

            return results;
        });

        console.log(`✅ Extracted ${products.length} products\n`);

        // Display results
        console.log('📦 Products found:\n');
        products.forEach((product, index) => {
            console.log(`${index + 1}. ${product.name}`);
            console.log(`   Price: ${product.price}`);
            console.log(`   ID: ${product.id}`);
            console.log(`   Image: ${product.image.substring(0, 60)}...`);
            console.log('');
        });

        // Save to file
        const outputPath = path.join(__dirname, 'test-results.json');
        fs.writeFileSync(outputPath, JSON.stringify(products, null, 2));
        console.log(`💾 Results saved to: ${outputPath}\n`);

        console.log('✅ Test completed successfully!\n');
        console.log('Next steps:');
        console.log('1. Review test-results.json');
        console.log('2. If data looks good, proceed with full scraping');
        console.log('3. Run: npm run scrape:category -- Supplements');

    } catch (error) {
        console.error('❌ Error during scraping:', error);
    } finally {
        await browser.close();
    }
}

// Run the test
testScraper().catch(console.error);
