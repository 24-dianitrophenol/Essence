module.exports = {
    // iHerb base URL
    baseUrl: 'https://ug.iherb.com',

    // Categories to scrape
    categories: {
        'Supplements': '/c/supplements',
        'Baby': '/c/baby-kids',
        'Beauty': '/c/beauty',
        'Bath': '/c/bath-personal-care',
        'Sports': '/c/sports',
        'Grocery': '/c/grocery',
        'Home': '/c/home',
        'Pets': '/c/pets'
    },

    // Scraping settings
    scraping: {
        // Maximum products per category
        maxProductsPerCategory: 100,

        // Maximum pages to scrape per category
        maxPagesPerCategory: 10,

        // Delay between requests (milliseconds)
        requestDelay: 2000,

        // Timeout for page load (milliseconds)
        pageTimeout: 30000,

        // Headless mode (true = invisible browser)
        headless: false, // Set to true in production

        // User agent
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    },

    // Image settings
    images: {
        // Download images?
        download: true,

        // Optimize images?
        optimize: true,

        // Image quality (1-100)
        quality: 80,

        // Maximum image width (pixels)
        maxWidth: 800,

        // Image format (jpeg, png, webp)
        format: 'jpeg'
    },

    // Output settings
    output: {
        // Generate TypeScript files?
        generateTS: true,

        // Save JSON backups?
        saveJSON: true,

        // Output directory for images
        imageDir: '../../public/images/products',

        // Output directory for category files
        categoryDir: '../../src/data/categories',

        // Output directory for JSON backups
        backupDir: '../../data-backup'
    },

    // CSS Selectors (update if iHerb changes their HTML)
    selectors: {
        productCell: '.product-cell',
        productLink: 'a.product-link',
        productTitle: '.product-title',
        productPrice: '.price',
        productImage: 'img',
        productBrand: '.brand-name',
        productRating: '.rating',
        productReviews: '.review-count'
    }
};
