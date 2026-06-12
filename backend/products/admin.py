from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'brand', 'category', 'price', 'is_new', 'is_bestseller', 'in_stock']
    list_filter = ['category', 'is_new', 'is_bestseller', 'in_stock', 'badge']
    search_fields = ['name', 'brand', 'description']
    ordering = ['-created_at']
