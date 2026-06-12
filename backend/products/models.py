import uuid
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
    badge = models.CharField(max_length=50, blank=True, null=True)
    ingredients = models.TextField(blank=True, null=True)
    is_new = models.BooleanField(default=False)
    is_bestseller = models.BooleanField(default=False)
    in_stock = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
