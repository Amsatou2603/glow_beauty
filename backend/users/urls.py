from django.urls import path
from .views import register, login, profile, is_admin, load_data

urlpatterns = [
    path('register/', register),
    path('login/', login),
    path('profile/', profile),
    path('is-admin/', is_admin),
    path('load-data/', load_data),
]