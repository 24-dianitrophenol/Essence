/**
 * Image Verification and Fallback System
 * 
 * This script will:
 * 1. Check all product images to see if they exist
 * 2. Create a report of missing images
 * 3. Suggest placeholder images
 */

import { allProducts } from '../src/data/allProducts';
import fs from 'fs';
import path from 'path';

interface ImageReport {
    totalProducts: number;
    imagesFound: number;
    imagesMissing: number;
    missingProducts: Array<{
        id: string;
        name: string;
        category: string;
        expectedPath: string;
    }>;
}

function checkImageExists(imagePath: string): boolean {
    const publicPath = path.join(process.cwd(), 'public', imagePath);
    return fs.existsSync(publicPath);
}

function generateImageReport(): ImageReport {
    const report: ImageReport = {
        totalProducts: 0,
        imagesFound: 0,
        imagesMissing: 0,
        missingProducts: []
    };

    allProducts.forEach(product => {
        report.totalProducts++;

        if (checkImageExists(product.image)) {
            report.imagesFound++;
        } else {
            report.imagesMissing++;
            report.missingProducts.push({
                id: product.id,
                name: product.name,
                category: product.category,
                expectedPath: product.image
            });
        }
    });

    return report;
}

function generateReport() {
    const report = generateImageReport();

    console.log('\n📊 IMAGE VERIFICATION REPORT\n');
    console.log(`Total Products: ${report.totalProducts}`);
    console.log(`✅ Images Found: ${report.imagesFound}`);
    console.log(`❌ Images Missing: ${report.imagesMissing}`);
    console.log(`📈 Success Rate: ${((report.imagesFound / report.totalProducts) * 100).toFixed(2)}%\n`);

    if (report.missingProducts.length > 0) {
        console.log('Missing Images:\n');
        report.missingProducts.forEach((product, index) => {
            console.log(`${index + 1}. ${product.name}`);
            console.log(`   Category: ${product.category}`);
            console.log(`   Expected: ${product.expectedPath}\n`);
        });
    }

    // Save to file
    fs.writeFileSync(
        'image-report.json',
        JSON.stringify(report, null, 2)
    );

    console.log('📄 Full report saved to: image-report.json\n');
}

// Run the report
generateReport();
