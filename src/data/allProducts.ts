// Central product aggregator - combines all category products
import { supplements } from './categories/Supplements';
import { bath } from './categories/Bath';
import { beauty } from './categories/Beauty';
import { bedroomProducts } from './categories/BedroomProducts';
import { healthProducts } from './categories/HealthProducts';
import { lotions } from './categories/Lotions';
import { skinProducts } from './categories/SkinProducts';
import { tablets } from './categories/Tablets';

// Combine all products from different categories
export const allProducts = [
  ...supplements,
  ...bath,
  ...beauty,
  ...bedroomProducts,
  ...healthProducts,
  ...lotions,
  ...skinProducts,
  ...tablets
];

// Export individual categories for easy access
export {
  supplements,
  bath,
  beauty,
  bedroomProducts,
  healthProducts,
  lotions,
  skinProducts,
  tablets
};

// Category mapping for filtering
export const categoryMapping = {
  'Supplements': supplements,
  'Bath': bath,
  'Beauty': beauty,
  'Bedroom Products': bedroomProducts,
  'Health Products': healthProducts,
  'Lotions': lotions,
  'Skin Products': skinProducts,
  'Tablets': tablets
};

// Get products by category
export const getProductsByCategory = (category: string) => {
  return categoryMapping[category as keyof typeof categoryMapping] || [];
};