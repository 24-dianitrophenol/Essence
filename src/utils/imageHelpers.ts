/**
 * Image URL Helper
 * 
 * Provides utility functions for handling product images with automatic fallbacks
 */

const CATEGORY_COLORS: Record<string, string> = {
    'Supplements': '10B981',
    'Bath': '3B82F6',
    'Beauty': 'EC4899',
    'Bedroom Products': '8B5CF6',
    'Health Products': '14B8A6',
    'Lotions': 'F59E0B',
    'Skin Products': 'EF4444',
    'Tablets': '6366F1',
    'Baby': 'FBBF24',
    'Grocery': '84CC16',
    'Home': '06B6D4',
    'Pets': 'F97316',
    'Sports': 'EAB308'
};

/**
 * Get a placeholder image URL for a product category
 */
export function getPlaceholderImage(category: string, size: number = 400): string {
    const color = CATEGORY_COLORS[category] || '9CA3AF';
    const text = encodeURIComponent(category);

    // Using placehold.co service (free, no API key needed)
    return `https://placehold.co/${size}x${size}/${color}/FFF?text=${text}`;
}

/**
 * Get product image with automatic fallback
 */
export function getProductImage(imagePath: string, category: string): string {
    // If image path is already a full URL, return it
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }

    // If it's a local path, return it as is
    // The ProductImage component will handle fallback if it doesn't exist
    return imagePath;
}

/**
 * Check if an image path is valid
 */
export function isValidImagePath(imagePath: string): boolean {
    if (!imagePath) return false;

    // Check if it's a URL
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return true;
    }

    // Check if it has a valid image extension
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];
    return validExtensions.some(ext => imagePath.toLowerCase().endsWith(ext));
}

/**
 * Get optimized image URL (for future CDN integration)
 */
export function getOptimizedImage(
    imagePath: string,
    options: { width?: number; height?: number; quality?: number } = {}
): string {
    // For now, just return the original path
    // In the future, you can integrate with Cloudinary, imgix, etc.
    return imagePath;
}

/**
 * Preload an image
 */
export function preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = src;
    });
}

/**
 * Batch preload multiple images
 */
export async function preloadImages(srcs: string[]): Promise<void> {
    await Promise.all(srcs.map(src => preloadImage(src)));
}

export default {
    getPlaceholderImage,
    getProductImage,
    isValidImagePath,
    getOptimizedImage,
    preloadImage,
    preloadImages
};
