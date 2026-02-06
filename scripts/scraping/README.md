# 🚀 Quick Start Guide: iHerb Product Import

## ⚠️ READ THIS FIRST

**LEGAL WARNING**: Scraping iHerb without permission may violate their Terms of Service and copyright laws.

**RECOMMENDED**: Apply for iHerb affiliate program first: https://www.iherb.com/info/affiliate-program

**If you proceed anyway, you do so at your own risk.**

---

## 📦 Installation

### Step 1: Install Scraping Dependencies

```bash
cd scripts/scraping
npm install
```

This will install:
- `puppeteer` - Browser automation
- `cheerio` - HTML parsing
- `axios` - HTTP requests
- `sharp` - Image optimization
- `p-limit` - Concurrency control
- `cli-progress` - Progress bars
- `colors` - Terminal colors

### Step 2: Test the Scraper

```bash
npm run scrape:test
```

This will:
- Open iHerb Supplements page
- Scrape 5 products
- Save results to `test-results.json`
- Show you what data can be extracted

**Review the results before proceeding!**

---

## 🎯 Usage

### Option 1: Scrape Single Category

```bash
# Scrape Supplements (50 products)
npm run scrape:category -- Supplements

# Scrape Baby products
npm run scrape:category -- Baby

# Scrape Beauty products
npm run scrape:category -- Beauty
```

### Option 2: Scrape All Categories

```bash
npm run scrape:all
```

This will scrape ALL categories:
- Supplements
- Baby
- Beauty
- Bath
- Sports
- Grocery
- Home
- Pets

**Warning**: This will take 2-4 hours and download thousands of images!

---

## 📁 What Gets Created

After scraping, you'll have:

```
src/data/categories/
  ├── Supplements.ts     ✅ Generated
  ├── Baby.ts            ✅ Generated
  ├── Beauty.ts          ✅ Generated
  ├── Bath.ts            ✅ Generated
  ├── Sports.ts          ✅ Generated
  ├── Grocery.ts         ✅ Generated
  ├── Home.ts            ✅ Generated
  └── Pets.ts            ✅ Generated

public/images/products/
  ├── supplements/       📁 Product images
  ├── baby/              📁 Product images
  ├── beauty/            📁 Product images
  └── ...

data-backup/
  ├── supplements.json   💾 JSON backup
  ├── baby.json          💾 JSON backup
  └── ...
```

---

## ⚙️ Configuration

Edit `scripts/scraping/config.js`:

```javascript
module.exports = {
  // How many products per category?
  maxProductsPerCategory: 100,
  
  // How many pages to scrape?
  maxPagesPerCategory: 10,
  
  // Delay between requests (ms)
  requestDelay: 2000,
  
  // Download images?
  downloadImages: true,
  
  // Optimize images?
  optimizeImages: true,
  
  // Image quality (1-100)
  imageQuality: 80,
  
  // Image max width
  imageMaxWidth: 800
};
```

---

## 🔍 Monitoring Progress

The scraper will show:
- ✅ Current category
- 📊 Products scraped
- 🖼️ Images downloaded
- ⏱️ Estimated time remaining
- ❌ Any errors

Example output:
```
🚀 Starting product import...

📦 Processing category: Supplements
URL: https://ug.iherb.com/c/supplements

  1️⃣ Scraping product listings...
  ✅ Found 100 products

  2️⃣ Downloading images...
  ✅ Downloaded 50/100
  ✅ Downloaded 100/100

  3️⃣ Processing data...
  ✅ Processed 100 products

  4️⃣ Generating category file...
  ✅ Created Supplements.ts

✅ Completed Supplements: 100 products
```

---

## 🛠️ Troubleshooting

### Problem: "Cannot find module 'puppeteer'"
**Solution**: Run `npm install` in `scripts/scraping/` directory

### Problem: Scraper times out
**Solution**: Increase timeout in config or check internet connection

### Problem: Images fail to download
**Solution**: Check disk space and permissions

### Problem: Rate limited by iHerb
**Solution**: Increase `requestDelay` in config

### Problem: No products found
**Solution**: iHerb may have changed their HTML structure - update selectors

---

## 📊 Data Structure

Each product will have:

```typescript
{
  id: 'supplements-1',
  name: 'Vitamin C 1000mg',
  price: 15.99,
  image: '/images/products/supplements/12345.jpg',
  category: 'Supplements',
  description: 'High-quality vitamin C supplement',
  brand: 'Nature\'s Way',
  rating: 4.5,
  reviews: 1234
}
```

---

## 🎨 Next Steps After Scraping

1. **Update `allProducts.ts`**:
   ```typescript
   import { supplements } from './categories/Supplements';
   import { baby } from './categories/Baby';
   // ... etc
   
   export const allProducts = [
     ...supplements,
     ...baby,
     // ... etc
   ];
   ```

2. **Test your website**:
   ```bash
   npm run dev
   ```

3. **Verify products display correctly**

4. **Deploy to production**

---

## 💡 Tips

1. **Start small**: Test with one category first
2. **Check results**: Review JSON files before using
3. **Backup data**: Keep JSON backups in case you need to regenerate
4. **Monitor**: Watch for errors during scraping
5. **Be patient**: Large imports take time
6. **Respect limits**: Don't overwhelm iHerb's servers

---

## 📞 Support

If you encounter issues:

1. Check `test-results.json` - Does it have valid data?
2. Check browser console - Any JavaScript errors?
3. Check network tab - Are requests being blocked?
4. Try with `headless: false` to see what's happening

---

## ⚖️ Legal Reminder

Before running any scraper:

1. ✅ Apply for iHerb affiliate program
2. ✅ Get written permission to use their data
3. ✅ Review their Terms of Service
4. ✅ Respect robots.txt
5. ✅ Don't overwhelm their servers

**Proceeding without permission is at your own risk!**

---

Ready to start? Run:

```bash
cd scripts/scraping
npm install
npm run scrape:test
```

Good luck! 🚀
