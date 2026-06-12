from django.urls import path
from .views import OrderListCreateView, OrderDetailView, WishlistListCreateView, WishlistDetailView, ReviewListCreateView

urlpatterns = [
    path('orders/', OrderListCreateView.as_view(), name='order-list'),
    path('orders/<uuid:id>/', OrderDetailView.as_view(), name='order-detail'),
    path('wishlist/', WishlistListCreateView.as_view(), name='wishlist-list'),
    path('wishlist/<uuid:id>/', WishlistDetailView.as_view(), name='wishlist-detail'),
    path('products/<uuid:product_id>/reviews/', ReviewListCreateView.as_view(), name='review-list'),
]
