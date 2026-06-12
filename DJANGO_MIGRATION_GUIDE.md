# Guide de migration vers Django

## Étape 1 : Créer l'environnement virtuel et installer Django

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

## Étape 2 : Configurer les variables d'environnement

Créer un fichier `.env` dans le dossier `backend` :
```
SECRET_KEY=votre-secret-key-ici
DEBUG=True
DATABASE_URL=postgresql://user:password@localhost:5432/glow_beauty
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

## Étape 3 : Créer les applications Django

```bash
cd backend
python manage.py startapp users
python manage.py startapp products
python manage.py startapp orders
```

## Étape 4 : Créer les modèles

### users/models.py
```python
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [
        ('user', 'User'),
        ('admin', 'Admin'),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    city = models.CharField(max_length=100, blank=True)
    postal_code = models.CharField(max_length=10, blank=True)
    country = models.CharField(max_length=100, default='France')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

### products/models.py
```python
from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('skincare', 'Skincare'),
        ('makeup', 'Makeup'),
        ('fragrance', 'Fragrance'),
        ('wellness', 'Wellness'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    brand = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    description = models.TextField(blank=True)
    image_url = models.URLField()
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=4.5)
    review_count = models.IntegerField(default=0)
    badge = models.CharField(max_length=50, blank=True)
    ingredients = models.TextField(blank=True)
    is_new = models.BooleanField(default=False)
    is_bestseller = models.BooleanField(default=False)
    in_stock = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
```

### orders/models.py
```python
from django.db import models
from django.conf import settings

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    total = models.DecimalField(max_digits=10, decimal_places=2)
    shipping_address = models.JSONField()
    billing_address = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey('products.Product', on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

class Wishlist(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'product')

class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE)
    rating = models.IntegerField()
    title = models.CharField(max_length=200, blank=True)
    comment = models.TextField(blank=True)
    verified_purchase = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ('user', 'product')
```

## Étape 5 : Configurer settings.py

Ajouter dans `glow_beauty/settings.py` :
```python
AUTH_USER_MODEL = 'users.User'
```

## Étape 6 : Créer les migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

## Étape 7 : Créer le superutilisateur admin

```bash
python manage.py createsuperuser
```

## Étape 8 : Créer l'API REST

### users/serializers.py
```python
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'role', 'phone', 'address', 'city', 'postal_code', 'country']
        read_only_fields = ['id']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'first_name', 'last_name']
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
```

### users/views.py
```python
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, RegisterSerializer

User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def is_admin(request):
    return Response({'is_admin': request.user.role == 'admin'})
```

### users/urls.py
```python
from django.urls import path
from .views import register, profile, is_admin

urlpatterns = [
    path('register/', register),
    path('profile/', profile),
    path('is-admin/', is_admin),
]
```

## Étape 9 : Modifier le frontend

Supprimer les fichiers Supabase :
```bash
rm lib/supabase.ts
rm lib/admin.ts
```

Créer `lib/api.ts` :
```typescript
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const api = {
  async register(data: { email: string; password: string; username: string; first_name: string; last_name: string }) {
    const response = await fetch(`${API_BASE}/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  
  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },
  
  async getProfile(token: string) {
    const response = await fetch(`${API_BASE}/auth/profile/`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },
};
```

## Étape 10 : Supprimer les dépendances Supabase

```bash
npm uninstall @supabase/supabase-js
```

## Étape 11 : Configurer le déploiement

Modifier `netlify.toml` pour inclure le backend Django ou déployer séparément.

## Étape 12 : Tester

```bash
cd backend
python manage.py runserver
```

Puis tester l'inscription et les fonctionnalités admin.
