from django.urls import path
from .views import *
from . import views


urlpatterns = [
    path('', views.home, name='home'),
    path('register/', views.registeruser, name='register'),
    
    # path('login/', views.loginuser, name='login'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('donor/', DonorView.as_view(), name='donor'),
    # path('admindashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('admindashboard/', AdminDashboardView.as_view(), name='admin_dashboard'),
]