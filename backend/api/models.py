
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


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
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    objects = CustomUserManager()

    def __str__(self) :
        return "{}".format(self.username)
