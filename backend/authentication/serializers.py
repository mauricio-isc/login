from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id','username','email','phone')


class LoginSerializer(serializers.Serializer):
    username: serializers.CharField()
    password: serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(username = username, password = password)
            if user:
                if user.is_active:
                    data['user'] = user
                else:
                    raise serializers.ValidationError('Usuario desactivado')
            else:
                raise serializers.ValidationError('Credenciales invalidas')
        else:
            raise serializers.ValidationError('Debe proporcionar usuario y contrasena')
        
        return data 