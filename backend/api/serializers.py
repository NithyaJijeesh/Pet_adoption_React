from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['user_type'] = user.user_type
        token['is_superuser'] = user.is_superuser
        return token

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        user_model = get_user_model()
        
        try:
            user = user_model.objects.get(username=username)
        except user_model.DoesNotExist:
            try:
                user = user_model.objects.get(email=username)
            except user_model.DoesNotExist:
                user = None
        
        if user and user.check_password(password):
            return super().validate(attrs)
        raise serializers.ValidationError('Invalid username/email or password')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()