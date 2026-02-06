// Central product aggregator - combines all category products
import { supplements } from './categories/Supplements';
import { bath } from './categories/Bath';
import { beauty } from './categories/Beauty';
import { bedroomProducts } from './categories/BedroomProducts';
import { baby } from './categories/Baby';
import { grocery } from './categories/Grocery';
import { home } from './categories/Home';
import { pets } from './categories/Pets';
import { sports } from './categories/Sports';

// Combine all products from different categories
export const allProducts = [
  ...supplements,
  ...bath,
  ...beauty,
  ...bedroomProducts,
  ...baby,
  ...grocery,
  ...home,
  ...pets,
  ...sports
];

// Export individual categories for easy access
export {
  supplements,
  bath,
  beauty,
  bedroomProducts,
  baby,
  grocery,
  home,
  pets,
  sports
};

// Category mapping for filtering
export const categoryMapping = {
  'Supplements': supplements,
  'Bath': bath,
  'Beauty': beauty,
  'Bedroom Products': bedroomProducts,
  'Baby': baby,
  'Grocery': grocery,
  'Home': home,
  'Pets': pets,
  'Sports': sports
};

// Get products by category
export const getProductsByCategory = (category: string) => {
  return categoryMapping[category as keyof typeof categoryMapping] || [];
};