import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'glow_beauty.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

# Get all superusers
superusers = User.objects.filter(is_superuser=True)

print(f"Found {superusers.count()} superuser(s):")
for user in superusers:
    print(f"  - Username: {user.username}")
    print(f"  - Email: {user.email}")
    print(f"  - Is active: {user.is_active}")
    print(f"  - Is staff: {user.is_staff}")
    print(f"  - Role: {user.role}")
    print()

if superusers.count() == 0:
    print("No superusers found. Please create one using:")
    print("python manage.py createsuperuser")
elif superusers.count() == 1:
    user = superusers.first()
    print(f"Updating superuser: {user.username}")
    
    # Set email to username if email is empty
    if not user.email:
        user.email = user.username
        user.save()
        print(f"Set email to: {user.email}")
    
    # Set role to admin
    if user.role != 'admin':
        user.role = 'admin'
        user.save()
        print(f"Set role to: admin")
    
    print("\nSuperuser updated successfully!")
    print(f"You can now login with email: {user.email}")
else:
    print("Multiple superusers found. Please specify which one to update.")
