from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'phone')


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'email' , 'phone', 'password', 'password2')
        extra_kwargsd = {
            'phone': {'required': False}
        }
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "las contrasenas no coinciden"})
        # Verificar si el usuario ya existe
        if User.objects.filter(username=attrs['username']).exists():
            raise serializers.ValidationError({"username": "Este nombre de usuario ya esta en uso"})
        
        #Verificar si el email ya existe
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({"email": "Este email ya se encuentra en uso"})
        
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password2') #Remover el campo de confirmacion

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            phone= validated_data.get('phone', '')
        )

        return user