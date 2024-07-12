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


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class BreedSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), source='category', write_only=True)
    
    class Meta:
        model = Breed
        fields = '__all__'


class AdditionalImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdditionalImage
        fields = ['id', 'image']


class DonationSerializer(serializers.ModelSerializer):
    donor = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    breed = BreedSerializer(read_only=True)

    category_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), write_only=True)
    breed_id = serializers.PrimaryKeyRelatedField(queryset=Breed.objects.all(), write_only=True)

    class Meta:
        model = Donation
        fields = '__all__'

    def create(self, validated_data):
        request = self.context.get('request')
        donor = request.user
        category = validated_data.pop('category_id')
        breed = validated_data.pop('breed_id')
        main_image = validated_data.pop('main_image', None)

        donation = Donation.objects.create(donor=donor, category=category, breed=breed, **validated_data)
        if main_image:
            donation.main_image.save(main_image.name, main_image)
        return donation

    def update(self, instance, validated_data):
        request = self.context.get('request')
        category = validated_data.pop('category_id')
        breed = validated_data.pop('breed_id',None)
        main_image = validated_data.pop('main_image', None)
        instance.category = category if category else None
        instance.breed = breed if breed else None

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if main_image:
            instance.main_image.save(main_image.name, main_image)

        instance.save()
        return instance
