// Central product aggregator - combines all category products
import { supplements } from './categories/Supplements';
import { sports } from './categories/Sports';
import { bath } from './categories/Bath';
import { beauty } from './categories/Beauty';
import { grocery } from './categories/Grocery';
import { home } from './categories/Home';
import { baby } from './categories/Baby';
import { pets } from './categories/Pets';
import { bedroomProducts } from './categories/BedroomProducts';

// Combine all products from different categories
export const allProducts = [
  ...supplements,
  ...sports,
  ...bath,
  ...beauty,
  ...grocery,
  ...home,
  ...baby,
  ...pets,
  ...bedroomProducts
];

// Export individual categories for easy access
export {
  supplements,
  sports,
  bath,
  beauty,
  grocery,
  home,
  baby,
  pets,
  bedroomProducts
};

// Category mapping for filtering
export const categoryMapping = {
  'Supplements': supplements,
  'Sports': sports,
  'Bath': bath,
  'Beauty': beauty,
  'Grocery': grocery,
  'Home': home,
  'Baby': baby,
  'Pets': pets,
  'Bedroom Products': bedroomProducts
};

// Get products by category
export const getProductsByCategory = (category: string) => {
  return categoryMapping[category as keyof typeof categoryMapping] || [];
};