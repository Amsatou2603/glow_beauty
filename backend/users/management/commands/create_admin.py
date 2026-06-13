from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import os

User = get_user_model()

class Command(BaseCommand):
    help = 'Create an initial admin user if none exists'

    def handle(self, *args, **kwargs):
        email = os.getenv('ADMIN_EMAIL', 'admin@glowbeauty.com')
        password = os.getenv('ADMIN_PASSWORD', 'admin123')
        
        if not User.objects.filter(email=email).exists():
            user = User.objects.create_superuser(
                email=email,
                username=email.split('@')[0],
                password=password,
                role='admin'
            )
            self.stdout.write(self.style.SUCCESS(f'Successfully created admin user: {email}'))
        else:
            self.stdout.write(f'Admin user already exists: {email}')
