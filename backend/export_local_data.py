import os
import sys
import django

# Force Django to use SQLite
os.environ['DATABASE_URL'] = ''
os.environ['DEBUG'] = 'True'
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'glow_beauty.settings')

# Override database config to use SQLite
from django.conf import settings
settings.DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'db.sqlite3',
    }
}

django.setup()

from django.core.management import call_command
import json

# Export all data
output_file = '../local_data.json'
with open(output_file, 'w') as f:
    call_command('dumpdata', indent=2, stdout=f)

print(f"Data exported to {output_file}")
