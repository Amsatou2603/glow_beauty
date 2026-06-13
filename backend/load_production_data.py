import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'glow_beauty.settings')
django.setup()

from django.core.management import call_command

# Load data from JSON file
input_file = 'local_data.json'
call_command('loaddata', input_file)

print(f"Data loaded from {input_file}")
