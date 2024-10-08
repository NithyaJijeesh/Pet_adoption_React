
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.conf import settings


class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not username:
            raise ValueError('The Username field must be set')
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('user_type', 'admin')

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        
        return self.create_user(username, email, password, **extra_fields)


class CustomUser(AbstractUser):
    USER_TYPE_CHOICES = (
        ('admin', 'Admin'),
        ('donor', 'Donor'),
        ('buyer', 'Buyer'),
    )
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='buyer')
    phone = models.CharField(max_length=100,null=True,blank=True)
    address = models.CharField(max_length=255,null=True, blank=True)
    image = models.ImageField(upload_to='images/profile/', null=True, blank=True)
    objects = CustomUserManager()

    def __str__(self) :
        return "{}".format(self.username)


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Breed(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    category = models.ForeignKey(Category, related_name='breeds', on_delete=models.CASCADE)


    
class Donation(models.Model):

    STATUS_CHOICES = [
        ('approved', 'Approved'),
        ('pending', 'Pending Approval'),
    ]

    PURCHASE_STATUS_CHOICES = [
        ('purchased', 'Purchased'),
        ('not_purchased', 'Not Purchased'),
    ]

    donor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True, related_name='donor_donations')
    buyer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True, related_name='buyer_donations')
    name = models.CharField(max_length=100, null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)
    breed = models.ForeignKey(Breed, on_delete=models.CASCADE, null=True, blank=True)
    description = models.CharField(max_length=100, null=True, blank=True)
    image = models.ImageField(upload_to='images/donated/', null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    purchase_status = models.CharField(max_length=15, choices=PURCHASE_STATUS_CHOICES, default='not_purchased')
    purchased_date = models.DateTimeField(null=True, blank=True)

class AdditionalImage(models.Model):
    donation = models.ForeignKey(Donation, related_name='additional_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/donated/additional/')
    
    

