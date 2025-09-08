from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import login, logout
from .serializers import UserSerializer, LoginSerializer
# Create your views here.

api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        data = serializer.validate_data
        return Response({
            'user': UserSerializer(data['user']).data,
            'refresh': data['refresh'],
            'access': data['access']
        })
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    #Con JWT, el logout se maneja en el cliente descartando el token
    return Response({"message": "Sesion cerrada correctamente"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_view(request):
    return Response(UserSerializer(request.user).data)