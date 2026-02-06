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
            continue
            
        print(f"Generating {need_count} items for {filename}")
        
        new_items = []
        for i in range(current_count + 1, 501):
            template_item = random.choice(existing_items)
            
            # Robust extraction of fields, handling escaped quotes
            name_match = re.search(r"name:\s*['\"]((?:\\['\"]|[^'\"])*)['\"]", template_item)
            image_match = re.search(r"image:\s*['\"]((?:\\['\"]|[^'\"])*)['\"]", template_item)
            desc_match = re.search(r"description:\s*['\"]((?:\\['\"]|[^'\"])*)['\"]", template_item)
            
            base_name = name_match.group(1) if name_match else "Product"
            image_path = image_match.group(1) if image_match else "/images/placeholder.jpg"
            desc = desc_match.group(1) if desc_match else "High quality product"
            
            # Safety Fix: strip trailing backslashes
            base_name = base_name.rstrip('\\')
            image_path = image_path.rstrip('\\')
            desc = desc.rstrip('\\')
            
            # Randomize price slightly around the original or use a range
            price = round(random.uniform(5.0, 150.0), 2)
            
            new_item = f"""  {{
    id: '{id_prefix}-{i}',
    name: '{base_name} {i}',
    price: {price},
    image: '{image_path}',
    category: '{cat_name}',
    description: '{desc} - Specially formulated for your needs.'
  }}"""
            new_items.append(new_item)
            
        # Combine everything
        all_items_text = existing_items_text
        if all_items_text and not all_items_text.endswith(','):
            all_items_text += ','
            
        updated_array_content = all_items_text + "\n" + ",\n".join(new_items)
        
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
