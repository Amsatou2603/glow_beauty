from django.core.management.base import BaseCommand
from products.models import Product
import uuid

class Command(BaseCommand):
    help = 'Seed sample products to the database'

    def handle(self, *args, **kwargs):
        sample_products = [
            {
                'name': 'Sérum Hydratant',
                'brand': 'La Roche-Posay',
                'price': 29.99,
                'original_price': 35.00,
                'category': 'skincare',
                'description': 'Sérum hydratant pour peau sensible',
                'image_url': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400',
                'rating': 4.5,
                'review_count': 120,
                'badge': 'Best Seller',
                'is_new': False,
                'is_bestseller': True,
                'in_stock': True,
            },
            {
                'name': 'Crème Jour Anti-Âge',
                'brand': 'L\'Oréal',
                'price': 24.99,
                'original_price': 30.00,
                'category': 'skincare',
                'description': 'Crème de jour anti-âge SPF 30',
                'image_url': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
                'rating': 4.2,
                'review_count': 85,
                'badge': 'Nouveau',
                'is_new': True,
                'is_bestseller': False,
                'in_stock': True,
            },
            {
                'name': 'Rouge à Lèvres Mat',
                'brand': 'Maybelline',
                'price': 12.99,
                'original_price': 15.00,
                'category': 'makeup',
                'description': 'Rouge à lèvres longue tenue',
                'image_url': 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400',
                'rating': 4.7,
                'review_count': 200,
                'badge': None,
                'is_new': False,
                'is_bestseller': True,
                'in_stock': True,
            },
            {
                'name': 'Parfum Floral',
                'brand': 'Chanel',
                'price': 89.99,
                'original_price': 120.00,
                'category': 'fragrance',
                'description': 'Parfum floral notes de rose et jasmin',
                'image_url': 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
                'rating': 4.8,
                'review_count': 150,
                'badge': 'Premium',
                'is_new': False,
                'is_bestseller': False,
                'in_stock': True,
            },
            {
                'name': 'Huile Essentielle Lavande',
                'brand': 'Yves Rocher',
                'price': 18.99,
                'original_price': 22.00,
                'category': 'wellness',
                'description': 'Huile essentielle de lavande pour relaxation',
                'image_url': 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400',
                'rating': 4.6,
                'review_count': 95,
                'badge': None,
                'is_new': True,
                'is_bestseller': False,
                'in_stock': True,
            },
        ]

        created_count = 0
        for product_data in sample_products:
            product, created = Product.objects.get_or_create(
                name=product_data['name'],
                defaults=product_data
            )
            if created:
                created_count += 1
                self.stdout.write(f'Created product: {product.name}')
            else:
                self.stdout.write(f'Product already exists: {product.name}')

        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {created_count} products'))
