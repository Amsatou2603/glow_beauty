from rest_framework import generics, status

from rest_framework.decorators import api_view, permission_classes

from rest_framework.permissions import AllowAny, IsAuthenticated

from rest_framework.response import Response

from django.contrib.auth import authenticate, get_user_model

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



@api_view(['POST'])

@permission_classes([AllowAny])

def login(request):

    email = request.data.get('email')

    password = request.data.get('password')

    

    user = authenticate(request, username=email, password=password)

    

    if user is not None:

        from rest_framework.authtoken.models import Token

        token, created = Token.objects.get_or_create(user=user)

        return Response({

            'token': token.key,

            'user': UserSerializer(user).data

        })

    else:

        return Response({'error': 'Email ou mot de passe incorrect'}, status=status.HTTP_401_UNAUTHORIZED)



@api_view(['GET'])

@permission_classes([IsAuthenticated])

def profile(request):

    serializer = UserSerializer(request.user)

    return Response(serializer.data)



@api_view(['GET'])

@permission_classes([IsAuthenticated])

def is_admin(request):

    return Response({'is_admin': request.user.role == 'admin'})