/**
 * Placeholder Image Generator
 * 
 * This script generates placeholder images for missing products
 * using a simple canvas-based approach
 */

const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const PLACEHOLDER_DIR = path.join(__dirname, '../public/images/placeholders');
const CATEGORIES = [
    'Supplements',
    'Bath',
    'Beauty',
    'Bedroom Products',
    'Health Products',
    'Lotions',
    'Skin Products',
    'Tablets',
    'Baby',
    'Grocery',
    'Home',
    'Pets',
    'Sports'
];

// Category colors
const CATEGORY_COLORS = {
    'Supplements': '#10B981',
    'Bath': '#3B82F6',
    'Beauty': '#EC4899',
    'Bedroom Products': '#8B5CF6',
    'Health Products': '#14B8A6',
    'Lotions': '#F59E0B',
    'Skin Products': '#EF4444',
    'Tablets': '#6366F1',
    'Baby': '#FBBF24',
    'Grocery': '#84CC16',
    'Home': '#06B6D4',
    'Pets': '#F97316',
    'Sports': '#EAB308'
};

function createPlaceholderImage(category, width = 400, height = 400) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Background
    const color = CATEGORY_COLORS[category] || '#9CA3AF';
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);

    // Add gradient overlay
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Category text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(category, width / 2, height / 2 - 20);

    // "No Image" text
    ctx.font = '20px Arial';
    ctx.fillText('No Image Available', width / 2, height / 2 + 20);

    return canvas.toBuffer('image/png');
}

function generatePlaceholders() {
    // Create directory if it doesn't exist
    if (!fs.existsSync(PLACEHOLDER_DIR)) {
        fs.mkdirSync(PLACEHOLDER_DIR, { recursive: true });
    }

    // Generate placeholder for each category
    CATEGORIES.forEach(category => {
        const filename = `${category.toLowerCase().replace(/\s+/g, '-')}.png`;
        const filepath = path.join(PLACEHOLDER_DIR, filename);

        const buffer = createPlaceholderImage(category);
        fs.writeFileSync(filepath, buffer);

        console.log(`✅ Created placeholder: ${filename}`);
    });

    // Create a generic placeholder
    const genericBuffer = createPlaceholderImage('Product', 400, 400);
    fs.writeFileSync(path.join(PLACEHOLDER_DIR, 'generic.png'), genericBuffer);
    console.log('✅ Created generic placeholder');

    console.log(`\n✨ All placeholders created in: ${PLACEHOLDER_DIR}`);
}

// Note: This requires the 'canvas' npm package
// Install with: npm install canvas
// If canvas installation fails, use the alternative approach below

console.log('📝 Note: This script requires the "canvas" npm package.');
console.log('Install it with: npm install canvas\n');

try {
    generatePlaceholders();
} catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Alternative: Use online placeholder services like:');
    console.log('   - https://placehold.co/400x400/10B981/FFF?text=Product');
    console.log('   - https://via.placeholder.com/400x400/10B981/FFF?text=Product');
}
