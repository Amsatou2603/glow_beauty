import os
import django
import requests
from dotenv import load_dotenv

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'glow_beauty.settings')
django.setup()

from products.models import Product

# Load environment variables
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_ANON_KEY') or os.getenv('SUPABASE_KEY')

def fetch_supabase_products():
    """Fetch products from Supabase"""
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("Error: SUPABASE_URL and SUPABASE_KEY must be set in .env file")
        return []
    
    headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': f'Bearer {SUPABASE_KEY}',
        'Content-Type': 'application/json'
    }
    
    try:
        response = requests.get(
            f'{SUPABASE_URL}/rest/v1/products',
            headers=headers
        )
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching from Supabase: {e}")
        return []

def migrate_products():
    """Migrate products from Supabase to Django"""
    products = fetch_supabase_products()
    
    if not products:
        print("No products found in Supabase")
        return
    
    print(f"Found {len(products)} products in Supabase")
    
    created_count = 0
    updated_count = 0
    
    for product_data in products:
        try:
            # Check if product already exists
            existing = Product.objects.filter(id=product_data['id']).first()
            
            if existing:
                # Update existing product
                existing.name = product_data.get('name', existing.name)
                existing.brand = product_data.get('brand', existing.brand)
                existing.price = product_data.get('price', existing.price)
                existing.original_price = product_data.get('original_price')
                existing.category = product_data.get('category', existing.category)
                existing.description = product_data.get('description', '')
                existing.image_url = product_data.get('image_url', '')
                existing.rating = product_data.get('rating', 4.5)
                existing.review_count = product_data.get('review_count', 0)
                existing.badge = product_data.get('badge', '')
                existing.ingredients = product_data.get('ingredients', '')
                existing.is_new = product_data.get('is_new', False)
                existing.is_bestseller = product_data.get('is_bestseller', False)
                existing.in_stock = product_data.get('in_stock', True)
                existing.save()
                updated_count += 1
                print(f"Updated: {product_data.get('name')}")
            else:
                # Create new product
                Product.objects.create(
                    id=product_data['id'],
                    name=product_data.get('name', ''),
                    brand=product_data.get('brand', ''),
                    price=product_data.get('price', 0),
                    original_price=product_data.get('original_price'),
                    category=product_data.get('category', 'skincare'),
                    description=product_data.get('description', ''),
                    image_url=product_data.get('image_url', ''),
                    rating=product_data.get('rating', 4.5),
                    review_count=product_data.get('review_count', 0),
                    badge=product_data.get('badge', ''),
                    ingredients=product_data.get('ingredients', ''),
                    is_new=product_data.get('is_new', False),
                    is_bestseller=product_data.get('is_bestseller', False),
                    in_stock=product_data.get('in_stock', True),
                )
                created_count += 1
                print(f"Created: {product_data.get('name')}")
        except Exception as e:
            print(f"Error migrating product {product_data.get('name')}: {e}")
    
    print(f"\nMigration complete!")
    print(f"Created: {created_count} products")
    print(f"Updated: {updated_count} products")
    print(f"Total: {created_count + updated_count} products")

if __name__ == '__main__':
    migrate_products()
