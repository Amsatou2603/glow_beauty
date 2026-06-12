from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer
import logging

logger = logging.getLogger(__name__)

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None

    def get(self, request, *args, **kwargs):
        try:
            logger.info("Fetching products list")
            return super().get(request, *args, **kwargs)
        except Exception as e:
            logger.error(f"Error fetching products: {str(e)}")
            return Response(
                {'error': f'Failed to fetch products: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'id'
    permission_classes = [permissions.AllowAny]
