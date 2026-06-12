from django.urls import path
from .views import register, login, profile, is_admin

urlpatterns = [
    path('register/', register),
    path('login/', login),
    path('profile/', profile),
    path('is-admin/', is_admin),
]