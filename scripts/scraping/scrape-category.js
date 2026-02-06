const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Get arguments
const args = process.argv.slice(2);
const categoryName = args[0];
const url = args[1];
const limit = parseInt(args[2]) || 60; // Default to 60 products

if (!categoryName || !url) {
    console.error('Please provide category name and URL');
    console.error('Usage: node scrape-category.js <CategoryName> <URL> [Limit]');
    process.exit(1);
}

async function scrapeCategory() {
    console.log(`\n🚀 Starting scraper for ${categoryName}...`);
    console.log(`📍 URL: ${url}`);
    console.log(`🔢 Target limit: ${limit} products\n`);

    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    const allProducts = new Map();

    // Try to load existing products to resume
    const outputPath = path.join(__dirname, 'data', `${categoryName}.json`);
    if (fs.existsSync(outputPath)) {
        try {
            const existing = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
            existing.forEach(p => allProducts.set(p.id, p));
            console.log(`📦 Loaded ${allProducts.size} existing products for ${categoryName}`);
        } catch (e) {
            console.log('⚠️ Could not load existing data, starting fresh.');
        }
    }

    try {
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        console.log('Navigating to page...');
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

        let scrolls = 0;
        const maxPages = 100; // Deep scrape for large catalogs

        while (allProducts.size < limit && scrolls < maxPages) {
            console.log(`\n📄 Processing page ${scrolls + 1}... URL: ${page.url()}`);

            // Wait for products
            try {
                await page.waitForSelector('.product-cell-container, .product-card, .product-inner, .absolute-link-wrapper', { timeout: 30000 });
            } catch (e) {
                console.log('  ⚠️ Products selector not found, attempting to continue anyway...');
            }

            // Scroll down slowly to trigger lazy loading
            console.log('  ⬇️ Scrolling to load images...');
            for (let i = 0; i < 5; i++) {
                await page.evaluate(`window.scrollBy(0, window.innerHeight * ${i})`);
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            // Extract products from current page
            const pageProducts = await page.evaluate((category) => {
                const results = [];
                const cells = document.querySelectorAll('.product-cell-container, .product-card, .product-inner, .absolute-link-wrapper');

                cells.forEach(cell => {
                    const titleEl = cell.querySelector('.product-title, .product-title-summary');
                    if (!titleEl) return;
                    const title = titleEl.textContent.trim();

                    const priceEl = cell.querySelector('.price, .product-price');
                    let priceRaw = priceEl ? priceEl.innerText.trim() : '0';
                    let price = 0;
                    const priceMatch = priceRaw.match(/[\d,.]+/);
                    if (priceMatch) {
                        price = parseFloat(priceMatch[0].replace(/,/g, ''));
                    }

                    const imgEl = cell.querySelector('img.product-image, img');
                    let image = imgEl ? (imgEl.dataset.src || imgEl.src) : '';

                    const linkEl = cell.querySelector('a.absolute-link, a.product-link') || (cell.tagName === 'A' ? cell : null);
                    const link = linkEl ? linkEl.href : '';
                    const id = link.split('/').pop().split('?')[0] || `auto-${Math.random()}`;

                    if (title && price > 0) {
                        results.push({
                            id: id,
                            name: title,
                            price: price,
                            image: image,
                            category: category,
                            description: `${title} - High quality product from ${category}.`,
                            originalLink: link
                        });
                    }
                });
                return results;
            }, categoryName);

            // Add to our global list
            pageProducts.forEach(p => {
                if (!allProducts.has(p.id) && allProducts.size < limit) {
                    allProducts.set(p.id, p);
                }
            });

            console.log(`  📊 Total unique products so far: ${allProducts.size}`);

            // Save progress after each page
            fs.writeFileSync(outputPath, JSON.stringify(Array.from(allProducts.values()), null, 2));
            console.log(`💾 Progress saved to ${outputPath}`);

            if (allProducts.size >= limit) break;

            // Try to find and click "Next"
            console.log('  🔍 Looking for next page...');
            const clickedNext = await page.evaluate(() => {
                const selectors = [
                    '.pagination-next',
                    '.pagination-link--next',
                    '[aria-label="Next"]',
                    '.load-more-btn',
                    '.pagination-item--next a',
                    'a.next-page'
                ];

                for (const selector of selectors) {
                    const btn = document.querySelector(selector);
                    if (btn && btn.offsetParent !== null) {
                        btn.click();
                        return true;
                    }
                }

                // Text search
                const allLinks = Array.from(document.querySelectorAll('a, button'));
                const nextLink = allLinks.find(el =>
                    el.textContent.trim().toLowerCase().includes('next') ||
                    (el.getAttribute('aria-label') && el.getAttribute('aria-label').toLowerCase().includes('next'))
                );

                if (nextLink && nextLink.offsetParent !== null) {
                    nextLink.click();
                    return true;
                }
                return false;
            });

            if (clickedNext) {
                console.log('  ➡️ Clicked next/load more...');
                await new Promise(resolve => setTimeout(resolve, 5000));
                scrolls++;
            } else {
                console.log('  🔍 Next button not found. Trying URL pagination fallback...');
                const currentUrl = new URL(page.url());
                let currentPage = parseInt(currentUrl.searchParams.get('p')) || 1;
                const nextUrl = new URL(page.url());
                nextUrl.searchParams.set('p', currentPage + 1);

                console.log(`  🔗 Navigating to: ${nextUrl.toString()}`);
                await page.goto(nextUrl.toString(), { waitUntil: 'domcontentloaded', timeout: 60000 });
                scrolls++;

                // Check if we actually have products on this new page
                const hasProducts = await page.evaluate(() => {
                    return !!document.querySelector('.product-cell-container, .product-card, .product-inner, .absolute-link-wrapper');
                });

                if (!hasProducts) {
                    console.log('  ⚠️ No products found on this page. Stopping.');
                    break;
                }
            }
        }

        console.log(`\n✅ Finished! Total unique products for ${categoryName}: ${allProducts.size}`);

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await browser.close();
    }
}

scrapeCategory();
