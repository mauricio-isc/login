from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id','username','email','phone')


class LoginSerializer(serializers.Serializer):
    username: serializers.CharField()
    password: serializers.CharField()

    def validate(self, data):
        username = data.get('username', None)
        password = data.get('password', None)

        if username and password:
            user = authenticate(username=username, password=password)

            if user:
                if user.is_active:
                    refresh = RefreshToken.for_user(user)
                    update_last_login(None, user)

                    return {
                        'user': user,
                        'refresh': str(refresh),
                        'access': str(refresh.access_token),
                    }
                else:
                    raise serializers.ValidationError('Usuario desactivado')
            else:
                raise serializers.ValidationError('Credenciales invalidas')
        else:
            raise serializers.ValidationError('Debe proporcionar usuario y contrasena')