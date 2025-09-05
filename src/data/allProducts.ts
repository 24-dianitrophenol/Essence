// Central product aggregator - combines all category products
import { healthProducts } from './categories/HealthProducts';
import { skinProducts } from './categories/SkinProducts';
import { lotions } from './categories/Lotions';
import { tablets } from './categories/Tablets';
import { bedroomProducts } from './categories/BedroomProducts';

// Combine all products from different categories
export const allProducts = [
  ...healthProducts,
  ...skinProducts,
  ...lotions,
  ...tablets,
  ...bedroomProducts
];

// Export individual categories for easy access
export {
  healthProducts,
  skinProducts,
  lotions,
  tablets,
  bedroomProducts
};

// Category mapping for filtering
export const categoryMapping = {
  'Health Products': healthProducts,
  'Skin Products': skinProducts,
  'Lotions': lotions,
  'Tablets': tablets,
  'Bedroom Products': bedroomProducts
};

// Get products by category
export const getProductsByCategory = (category: string) => {
  return categoryMapping[category as keyof typeof categoryMapping] || [];
};