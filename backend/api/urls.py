from django.urls import path
from .views import *
from . import views


urlpatterns = [
    path('', views.home, name='home'),

    path('register/', UserRegisterView.as_view(), name='register'),
    # path('login/', views.loginuser, name='login'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),

    path('admindashboard/', AdminDashboardView.as_view(), name='admin_dashboard'),
    
    path('buyers/', BuyerView.as_view(), name='buyer-list'),

    path('donors/', DonorView.as_view(), name='donor-list'),
]