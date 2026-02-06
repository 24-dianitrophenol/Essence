import os
import re
import random

CATEGORIES = {
    'Supplements.ts': ('supplements', 'Supplements', 'supplement'),
    'Sports.ts': ('sports', 'Sports', 'sport'),
    'Bath.ts': ('bath', 'Bath', 'bath'),
    'Beauty.ts': ('beauty', 'Beauty', 'beauty'),
    'Grocery.ts': ('grocery', 'Grocery', 'grocery'),
    'Home.ts': ('home', 'Home', 'home'),
    'Baby.ts': ('baby', 'Baby', 'baby'),
    'Pets.ts': ('pets', 'Pets', 'pet'),
    'BedroomProducts.ts': ('bedroomProducts', 'Bedroom Products', 'bedroom')
}

DATA_DIR = r'd:\ESSCENCE\src\data\categories'

def initialize_file(filepath, var_name, cat_name, id_prefix):
    """Creates a basic starting file if it doesn't exist."""
    content = f"""export const {var_name} = [
  {{
    id: '{id_prefix}-1',
    name: 'Standard {cat_name} 1',
    price: 19.99,
    image: '/images/placeholder.jpg',
    category: '{cat_name}',
    description: 'High quality {cat_name.lower()} product for your everyday needs.'
  }}
];
"""
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def generate_products():
    for filename, (var_name, cat_name, id_prefix) in CATEGORIES.items():
        filepath = os.path.join(DATA_DIR, filename)
        if not os.path.exists(filepath):
            print(f"File {filepath} not found, initializing.")
            initialize_file(filepath, var_name, cat_name, id_prefix)
            
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Try to find the existing array content
        match = re.search(rf'export const {var_name} = \[(.*)\];', content, re.DOTALL)
        if not match:
            print(f"Could not find array in {filename}")
            continue
            
        existing_items_text = match.group(1).strip()
        
        # Simple extraction of existing items to get templates
        item_matches = re.finditer(r'\{[^{}]*\}', existing_items_text)
        existing_items = [m.group(0) for m in item_matches]
        
        if not existing_items:
            print(f"No items found in {filename}")
            continue
            
        current_count = len(existing_items)
        need_count = 500 - current_count
        
        if need_count <= 0:
            print(f"{filename} already has {current_count} items.")
            # Still re-writing to ensure consistency if we want to force 500 EXACTLY
            # But for now, let's just proceed to generate if count is low.
        
        print(f"Generating items for {filename} to reach 500 total.")
        
        new_items = []
        # The user wants products to appear ONLY ONCE. 
        # So we keep existing_items as they are, and for the REST (up to 500), 
        # we generate placeholder items.
        
        for i in range(current_count + 1, 501):
            # For these generated items, use a standard placeholder
            # "I will show you what to put there" - for now using a generic placeholder
            new_item = f"""  {{
    id: '{id_prefix}-{i}',
    name: '{cat_name} Item {i}',
    price: {round(random.uniform(10.0, 100.0), 2)},
    image: '/images/placeholder.jpg',
    category: '{cat_name}',
    description: 'Generic {cat_name.lower()} product - Specially formulated for your needs.'
  }}"""
            new_items.append(new_item)
            
        # Combine everything
        all_items_text = ",\n".join(existing_items)
        if all_items_text and new_items:
            all_items_text += ",\n"
            
        updated_array_content = all_items_text + ",\n".join(new_items)
        
        new_content = re.sub(
            rf'export const {var_name} = \[.*?\];', 
            f'export const {var_name} = [\n{updated_array_content}\n];', 
            content, 
            flags=re.DOTALL
        )
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"Successfully updated {filename} with 500 items.")

if __name__ == "__main__":
    generate_products()
