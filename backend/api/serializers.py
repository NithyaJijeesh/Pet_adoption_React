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



class BreedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Breed
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    breeds = BreedSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = '__all__'

class AdditionalImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdditionalImage
        fields = ['id', 'image']

class DonationSerializer(serializers.ModelSerializer):
    donor = serializers.SerializerMethodField()
    category = CategorySerializer(read_only=True)
    breed = BreedSerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), source='category', write_only=True)
    breed_id = serializers.PrimaryKeyRelatedField(queryset=Breed.objects.all(), source='breed', write_only=True)
    additional_images = AdditionalImageSerializer(many=True, read_only=True)

    class Meta:
        model = Donation
        fields = '__all__'

    def get_donor(self, obj):
        if obj.donor and obj.donor.user_type == 'donor':
            return UserSerializer(obj.donor).data
        return None

    def create(self, validated_data):
        images_data = self.context['request'].FILES.getlist('additional_images')
        main_image = self.context['request'].FILES.get('main_image')
        donation = Donation.objects.create(**validated_data, image=main_image)
        for image_data in images_data:
            AdditionalImage.objects.create(donation=donation, image=image_data)
        return donation