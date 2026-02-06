# Product Image Fetching Plan from iHerb

## Overview
This plan outlines how to fetch product images from https://ug.iherb.com/ and integrate them into your product pages based on product names.

## ⚠️ Important Legal & Technical Considerations

### 1. **Legal Issues**
- **Copyright**: Images on iHerb are copyrighted and owned by iHerb or their suppliers
- **Terms of Service**: Scraping iHerb may violate their Terms of Service
- **Trademark**: Product images may contain trademarked content
- **Risk**: You could face legal action for unauthorized use of copyrighted images

### 2. **Technical Challenges**
- **Anti-scraping measures**: iHerb likely has bot detection and rate limiting
- **Dynamic content**: Images may be loaded via JavaScript
- **CORS issues**: Direct image linking may be blocked
- **Image URLs change**: Links may expire or change over time

## ✅ Recommended Legal Alternatives

### Option 1: Use Official Product APIs (BEST)
1. **Affiliate Programs**: Join iHerb's affiliate program
   - Get official API access
   - Legal right to use product data and images
   - Earn commission on sales
   
2. **Product Data Feeds**: Request official product feeds
   - Contains product images, descriptions, prices
   - Legal and reliable

### Option 2: Use Your Own Images
1. **Purchase products**: Buy samples and photograph them
2. **Stock photos**: Use royalty-free stock images from:
   - Unsplash (https://unsplash.com/)
   - Pexels (https://pexels.com/)
   - Pixabay (https://pixabay.com/)
3. **Placeholder images**: Use generic category images

### Option 3: Use Manufacturer Images
1. Contact product manufacturers directly
2. Request permission to use official product images
3. Get written authorization

## 🔧 Technical Implementation (If You Have Legal Permission)

### Approach 1: Manual Image Collection (Recommended for Small Datasets)

**Steps:**
1. Create a spreadsheet with product names
2. Manually search each product on iHerb
3. Download images (with permission)
4. Store in `/public/images/` folder
5. Update product data with local image paths

**Pros:**
- Full control over image quality
- No technical complexity
- Images stored locally (faster loading)
- No dependency on external sites

**Cons:**
- Time-consuming
- Manual process

### Approach 2: Automated Scraping (Requires Legal Permission)

**Technology Stack:**
- **Puppeteer** or **Playwright**: Browser automation
- **Cheerio**: HTML parsing
- **Node.js**: Backend script

**Implementation Steps:**

#### Step 1: Create Scraping Script
```javascript
// scripts/fetch-images.js
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function searchProductImage(productName) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  try {
    // Search for product
    await page.goto('https://ug.iherb.com/search?kw=' + encodeURIComponent(productName));
    
    // Wait for results
    await page.waitForSelector('.product-cell-container', { timeout: 5000 });
    
    // Get first product image
    const imageUrl = await page.evaluate(() => {
      const img = document.querySelector('.product-cell-container img');
      return img ? img.src : null;
    });
    
    await browser.close();
    return imageUrl;
  } catch (error) {
    console.error(`Error fetching image for ${productName}:`, error);
    await browser.close();
    return null;
  }
}

async function processAllProducts() {
  // Read your product data
  const products = require('../src/data/allProducts.ts');
  
  const results = [];
  
  for (const product of products.allProducts) {
    console.log(`Searching for: ${product.name}`);
    const imageUrl = await searchProductImage(product.name);
    
    results.push({
      id: product.id,
      name: product.name,
      imageUrl: imageUrl,
      originalImage: product.image
    });
    
    // Rate limiting - wait 2 seconds between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Save results
  fs.writeFileSync(
    'image-mapping.json',
    JSON.stringify(results, null, 2)
  );
  
  console.log('Image mapping saved to image-mapping.json');
}

processAllProducts();
```

#### Step 2: Download Images Locally
```javascript
// scripts/download-images.js
const https = require('https');
const fs = require('fs');
const path = require('path');

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

async function downloadAllImages() {
  const mapping = JSON.parse(fs.readFileSync('image-mapping.json'));
  
  for (const item of mapping) {
    if (item.imageUrl) {
      const filename = `${item.id}.jpg`;
      const filepath = path.join(__dirname, '../public/images/products', filename);
      
      try {
        await downloadImage(item.imageUrl, filepath);
        console.log(`Downloaded: ${filename}`);
        
        // Update the mapping with local path
        item.localImage = `/images/products/${filename}`;
      } catch (error) {
        console.error(`Failed to download ${filename}:`, error);
      }
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  fs.writeFileSync('image-mapping-final.json', JSON.stringify(mapping, null, 2));
}

downloadAllImages();
```

#### Step 3: Update Product Data
```javascript
// scripts/update-product-images.js
const fs = require('fs');

function updateProductImages() {
  const mapping = JSON.parse(fs.readFileSync('image-mapping-final.json'));
  
  // Create a lookup map
  const imageMap = {};
  mapping.forEach(item => {
    if (item.localImage) {
      imageMap[item.id] = item.localImage;
    }
  });
  
  // Read each category file and update
  const categories = [
    'Supplements', 'Bath', 'Beauty', 'BedroomProducts',
    'HealthProducts', 'Lotions', 'SkinProducts', 'Tablets'
  ];
  
  categories.forEach(category => {
    const filePath = `./src/data/categories/${category}.ts`;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace image paths (this is simplified - you'd need regex)
    Object.keys(imageMap).forEach(id => {
      const regex = new RegExp(`id: '${id}',[\\s\\S]*?image: '[^']*'`, 'g');
      content = content.replace(regex, (match) => {
        return match.replace(/image: '[^']*'/, `image: '${imageMap[id]}'`);
      });
    });
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${category}.ts`);
  });
}

updateProductImages();
```

### Approach 3: Use Image Proxy Service

**Services:**
- **Cloudinary**: Image hosting and transformation
- **imgix**: Real-time image processing
- **ImageKit**: Image CDN

**Benefits:**
- Automatic optimization
- Responsive images
- Caching
- No CORS issues

## 📋 Recommended Action Plan

### Phase 1: Assessment (Day 1)
1. ✅ Check if you have legal rights to use iHerb images
2. ✅ Explore iHerb affiliate program
3. ✅ Review your product list and categorize by priority

### Phase 2: Legal Compliance (Day 2-3)
1. ✅ Apply for iHerb affiliate program
2. ✅ Request API access or product feed
3. ✅ Get written permission for image use

### Phase 3: Implementation (Day 4-7)
**If you have permission:**
1. Set up scraping script with rate limiting
2. Download images to local storage
3. Update product data files
4. Test image loading on product pages

**If you don't have permission:**
1. Use placeholder images temporarily
2. Create your own product photos
3. Use stock images for categories
4. Contact manufacturers for official images

### Phase 4: Optimization (Day 8-10)
1. Optimize images (compress, resize)
2. Implement lazy loading
3. Add image fallbacks
4. Set up CDN (optional)

## 🛠️ Quick Start (Manual Method)

For immediate results without legal issues:

1. **Create placeholder structure:**
```bash
mkdir -p public/images/products/{supplements,bath,beauty,bedroom,health,lotions,skin,tablets}
```

2. **Use free stock images:**
   - Visit Unsplash/Pexels
   - Search for product categories
   - Download high-quality images
   - Name them according to product IDs

3. **Update product files:**
   - Replace image paths with local paths
   - Example: `image: '/images/products/supplements/supplement-1.jpg'`

## ⚡ Immediate Solution

Since you need images now, here's what I recommend:

1. **Use the existing image structure** you already have in `/public/images/natural images/`
2. **Verify all images exist** and are properly referenced
3. **Add fallback images** for missing products
4. **Implement lazy loading** for better performance

Would you like me to:
1. Create a script to verify your existing images?
2. Generate placeholder images for missing products?
3. Implement a fallback image system?
4. Help you apply for iHerb's affiliate program?

## 📝 Notes

- **Never** directly hotlink to iHerb images (bandwidth theft)
- **Always** respect robots.txt and rate limits
- **Consider** the ethical and legal implications
- **Prioritize** user experience and site performance
