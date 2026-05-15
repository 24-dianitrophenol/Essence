import { supplements, bath, beauty, bedroomProducts, baby, grocery, home, pets, sports } from '../src/data/allProducts';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('YOUR_')) {
  console.error('Please provide valid Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const allProducts = [
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

async function migrate() {
  console.log(`Starting migration of ${allProducts.length} products...`);

  // Transform data to match Supabase schema
  // Note: We remove the 'id' because Supabase will generate its own UUIDs
  // or we can keep them if we want to preserve old IDs.
  // We'll keep them as 'id' in Supabase is likely a text or uuid.
  const productsToInsert = allProducts.map(p => ({
    name: p.name,
    price: p.price,
    image: p.image,
    category: p.category,
    description: p.description || '',
    stock: 100, // Default stock
    created_at: new Date().toISOString()
  }));

  const { data, error } = await supabase
    .from('products')
    .insert(productsToInsert);

  if (error) {
    console.error('Error migrating products:', error);
  } else {
    console.log('Successfully migrated products!');
  }
}

migrate();
