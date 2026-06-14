import os
# pyrefly: ignore [missing-import]
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'glow_beauty.settings')
django.setup()

# pyrefly: ignore [import-error, missing-import]
from django.core.management import call_command
from products.models import Product
from users.models import User

# Nettoyer la base de données avant de charger (pour éviter les doublons)
print("Suppression des anciens produits...")
Product.objects.all().delete()

print("Suppression des anciens utilisateurs (sauf admins)...")
User.objects.filter(is_superuser=False).delete()

# Load data from JSON file
input_file = 'local_data.json'
call_command('loaddata', input_file)

print(f"Data loaded from {input_file}")
