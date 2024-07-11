from django.urls import path
from .views import *
from . import views


urlpatterns = [
    path('', views.home, name='home'),

    path('register/', UserRegisterView.as_view(), name='register'),
    # path('login/', views.loginuser, name='login'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),

    path('admindashboard/', AdminDashboardView.as_view(), name='admin_dashboard'),
    path('categories/', CategoryView.as_view(), name='category-list-create'),
    path('breeds/', BreedView.as_view(), name='breed-list-create'),
    path('listdonations/', DonationAdminView.as_view(), name='listdonations'),
    path('donation/<int:donation_id>/approve/', DonationAdminView.as_view(), name='approve_donation'),
    path('donation/<int:donation_id>/reject/', DonationAdminView.as_view(), name='reject_donation'),
    
    path('buyers/', BuyerView.as_view(), name='buyer-list'),

    path('donors/', DonorView.as_view(), name='donor-list'),
    path('donations/', DonationView.as_view(), name='donations'),
    path('approveddonations/', DonationDonorView.as_view(), name='approveddonations'),
    
]