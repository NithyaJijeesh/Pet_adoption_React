from django.urls import path
from .views import *
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('register/', views.registeruser, name='register'),
    path('login/', views.loginuser, name='login'),
    path('donor/', DonorView.as_view(), name='donor'),
]