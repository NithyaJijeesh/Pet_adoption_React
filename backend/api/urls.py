from django.urls import path
from .views import *
from . import views


urlpatterns = [
    # path('', views.home, name='home'),

    path('register/', UserRegisterView.as_view(), name='register'),
    path('check_user_exists/', CheckUserExistsView.as_view(), name='check_user_exists'),
    path('check_user_edit_exists/', CheckUserExistsEditView.as_view(), name='check_user_edit_exists'),

    path('login/', CustomTokenObtainPairView.as_view(), name='login'),

    path('admindashboard/', AdminDashboardView.as_view(), name='admin_dashboard'),
    path('categories/', CategoryView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', CategoryDetailsView.as_view(), name='category-detail'),
    path('breeds/', BreedView.as_view(), name='breed-list-create'),
    path('listdonors/', DonorAdminView.as_view(), name='listdonors'),
    path('listdonordetails/<int:pk>/', DonorAdminView.as_view(), name='list-donors-details'),
    path('listbuyers/', BuyerAdminView.as_view(), name='listbuyers'),
    path('listbuyerdetails/<int:pk>/', BuyerAdminView.as_view(), name='list-buyers-details'),
    path('listdonations/', DonationAdminView.as_view(), name='listdonations'),
    path('donation/<int:donation_id>/approve/', DonationAdminView.as_view(), name='approve_donation'),
    path('donation/<int:donation_id>/reject/', DonationAdminView.as_view(), name='reject_donation'),
    path('approveddonations/', ApprovedDonationView.as_view(), name = 'approveddonations'),
    path('approveddonations/<int:pk>/', ApprovedDonationView.as_view(), name = 'approved-donations-details'),
    
    path('buyers/', BuyerView.as_view(), name='buyer-list'),
    path('availabledonations/', AvailableDonationView.as_view(), name = 'availabledonations'),
    path('availabledonations/<int:pk>/', AvailableDonationView.as_view(), name='availabledonations_detail'),

    path('donors/', DonorView.as_view(), name='donor-list'),
    path('donations/', DonationView.as_view(), name='donation-list-create'),
    path('donationdetails/<int:pk>/', DonationDetailView.as_view(), name='donation-detail'),
    path('donationbreed/', DonationBreedView.as_view(), name='donation-breed'),
    path('alldonations/', DonationDonorView.as_view(), name='alldonations'),
    path('purchasedonations/', PurchasedDonationView.as_view(), name = 'purchsedonations'),

    
]