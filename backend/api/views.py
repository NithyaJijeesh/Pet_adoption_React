from rest_framework.permissions import  IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from .models import *
from .serializers import *
# from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status as http_status
# from django.contrib.auth.models import update_last_login
from .serializers import CustomTokenObtainPairSerializer
from django.core.mail import send_mail
from rest_framework.exceptions import NotFound
from django.utils import timezone


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
        
class CheckUserExistsView(APIView):
    def get(self, request):
        username = request.query_params.get('username', None)
        email = request.query_params.get('email', None)
        data = {'username_exists': False, 'email_exists': False}

        if username and CustomUser.objects.filter(username=username).exists():
            data['username_exists'] = True

        if email and CustomUser.objects.filter(email=email).exists():
            data['email_exists'] = True

        return Response(data, status=http_status.HTTP_200_OK)
    
class CheckUserExistsEditView(APIView):
    def get(self, request):
        username = request.query_params.get('username', None)
        email = request.query_params.get('email', None)
        user_id = request.user.id  # Get the ID of the logged-in user
        data = {'username_exists': False, 'email_exists': False}

        if username and CustomUser.objects.filter(username=username).exclude(id=user_id).exists():
            data['username_exists'] = True

        if email and CustomUser.objects.filter(email=email).exclude(id=user_id).exists():
            data['email_exists'] = True

        return Response(data, status=http_status.HTTP_200_OK)
class UserRegisterView(APIView):

    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')

        print(username)

        if CustomUser.objects.filter(username=username).exists():
            print('yes')
            return Response({'username': 'Username already exists'}, status=http_status.HTTP_400_BAD_REQUEST)
        if CustomUser.objects.filter(email=email).exists():
            return Response({'email': 'Email already exists'}, status=http_status.HTTP_400_BAD_REQUEST)

        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            user_data = serializer.validated_data
            password = user_data.pop('password', None)

            user = CustomUser.objects.create_user(
                username=user_data['username'],
                email=user_data['email'],
                password=password,
                first_name=user_data['first_name'],
                last_name=user_data['last_name'],
                phone=user_data.get('phone', None),
                address=user_data.get('address', None),
                image=user_data.get('image', None),  
                user_type=user_data['user_type']
            )

            if user_data['user_type'] == 'donor':
                subject = 'Welcome to Petify! Your Donor Account Password'
                message = (
                    f"Hi {user_data['first_name']} {user_data['last_name']},\n\n"
                    "Thank you for joining Petify as a valued donor!\n\n"
                    "We appreciate your generosity and support in helping us care for and find homes for pets in need. Your contribution makes a significant difference, and we’re thrilled to have you on board.\n\n"
                    "Your donor account has been successfully created. Below are your login details:\n\n"
                    f"Username : {user_data['username']}\n"
                    f"Password : {password}\n\n"
                    "Please keep this information secure. If you have any questions or need assistance, feel free to contact our support team.\n\n"
                    "Thank you for making a difference with Petify!\n\n"
                    "Best regards,\n"
                    "The Petify Team"
                )
            elif user_data['user_type'] == 'buyer':  
                subject = 'Welcome to Petify! Your Account Password'
                message = (
                    f"Hi {user_data['first_name']} {user_data['last_name']},\n\n"
                    "Welcome to Petify!\n\n"
                    "We’re excited to have you on board and can't wait for you to explore all the wonderful pets awaiting their forever homes.\n\n"
                    "Your account has been successfully created. Below, you'll find your login details:\n\n"
                    f"Username : {user_data['username']}\n"
                    f"Password : {password}\n\n"
                    "Please keep this information safe. If you have any questions or need assistance, feel free to reach out to our support team.\n\n"
                    "Thank you for joining Petify!\n\n"
                    "Best regards,\n"
                    "The Petify Team"
                )

            recipient_list = [user_data['email']]
            
            send_mail(
                subject,
                message,
                'niyavijayan@gmail.com',  
                recipient_list,
                fail_silently=False,
            )
            refresh = RefreshToken.for_user(user)

            return Response({'refresh': str(refresh), 'access': str(refresh.access_token)}, status=http_status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=http_status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def loginuser(request):
    serializer = UserLoginSerializer(data = request.data)
    if serializer.is_valid():
        user = authenticate(
            username = request.data.get('username'),
            password = request.data.get('password')
        )
        if user:
            refresh = RefreshToken.for_user(user)
            print(refresh.access_token)
            return Response({'refresh': str(refresh), 'access': str(refresh.access_token)})
        else:
            return Response({'error': 'Invalid credentials'}, status=400)
    else:
        return Response(serializer.errors, status=400)
    

    
class AdminDashboardView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]

    def get(self, request):
        if not request.user.is_authenticated:
            return Response({'error': 'Admin not authenticated'}, status=http_status.HTTP_401_UNAUTHORIZED)
        
        if request.user.user_type != 'admin':
            return Response({'error': 'Admin not authorized'}, status=http_status.HTTP_403_FORBIDDEN)
        
        try:
            admin = CustomUser.objects.get(id = request.user.id, user_type='admin')
        except CustomUser.DoesNotExist:
            return Response({'error': 'Admin not found'}, status=http_status.HTTP_404_NOT_FOUND)
        

        serializer = UserSerializer(admin)
        return Response(serializer.data)
    
    def put(self, request):
        if not request.user.is_authenticated:
            return Response({'error': 'Admin not authenticated'}, status=http_status.HTTP_401_UNAUTHORIZED)

        if request.user.user_type != 'admin':
            return Response({'error': 'Admin not authorized'}, status=http_status.HTTP_403_FORBIDDEN)
        
        try:
            admin = CustomUser.objects.get(id=request.user.id, user_type='admin')
        except CustomUser.DoesNotExist:
            return Response({'error': 'Buyer not found'}, status=http_status.HTTP_404_NOT_FOUND)
        
        serializer = UserSerializer(admin, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=http_status.HTTP_400_BAD_REQUEST)
    
class BuyerView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_authenticated:
            return Response({'error': 'User not authenticated'}, status=http_status.HTTP_401_UNAUTHORIZED)
        
        if request.user.user_type != 'buyer':
            return Response({'error': 'User not authorized'}, status=http_status.HTTP_403_FORBIDDEN)
        
        try:
            buyer = CustomUser.objects.get(id = request.user.id, user_type='buyer')
        except CustomUser.DoesNotExist:
            return Response({'error': 'Donor not found'}, status=http_status.HTTP_404_NOT_FOUND)
        

        serializer = UserSerializer(buyer)
        return Response(serializer.data)
    
    def put(self, request):
        if not request.user.is_authenticated:
            return Response({'error': 'User not authenticated'}, status=http_status.HTTP_401_UNAUTHORIZED)

        if request.user.user_type != 'buyer':
            return Response({'error': 'User not authorized'}, status=http_status.HTTP_403_FORBIDDEN)
        
        try:
            buyer = CustomUser.objects.get(id=request.user.id, user_type='buyer')
        except CustomUser.DoesNotExist:
            return Response({'error': 'Buyer not found'}, status=http_status.HTTP_404_NOT_FOUND)
        
        serializer = UserSerializer(buyer, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=http_status.HTTP_400_BAD_REQUEST)


class DonorView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_authenticated:
            return Response({'error': 'User not authenticated'}, status=http_status.HTTP_401_UNAUTHORIZED)
        
        if request.user.user_type != 'donor':
            return Response({'error': 'User not authorized'}, status=http_status.HTTP_403_FORBIDDEN)
        
        try:
            donor = CustomUser.objects.get(id=request.user.id, user_type='donor')
        except CustomUser.DoesNotExist:
            return Response({'error': 'Donor not found'}, status=http_status.HTTP_404_NOT_FOUND)
        
        serializer = UserSerializer(donor)
        return Response(serializer.data)
    
    def put(self, request):
        if not request.user.is_authenticated:
            return Response({'error': 'User not authenticated'}, status=http_status.HTTP_401_UNAUTHORIZED)

        if request.user.user_type != 'donor':
            return Response({'error': 'User not authorized'}, status=http_status.HTTP_403_FORBIDDEN)
        
        try:
            donor = CustomUser.objects.get(id=request.user.id, user_type='donor')
        except CustomUser.DoesNotExist:
            return Response({'error': 'Donor not found'}, status=http_status.HTTP_404_NOT_FOUND)
        
        serializer = UserSerializer(donor, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=http_status.HTTP_400_BAD_REQUEST)
    

class CategoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            category = serializer.save()
            Breed.objects.create(name=None, category=category)
            updated_serializer = CategorySerializer(category)
            return Response(updated_serializer.data, status=http_status.HTTP_201_CREATED)
        return Response(serializer.errors, status=http_status.HTTP_400_BAD_REQUEST)
    
class CategoryDetailsView(APIView):

    def get(self, request, pk):
        category = Category.objects.get(pk=pk)
        serializer = CategorySerializer(category)
        return Response(serializer.data)
    
    def put(self, request, pk=None):
        try:
            category = Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            return Response(status=http_status.HTTP_404_NOT_FOUND)
        
        breeds = Breed.objects.filter(category=category)
        breeds.delete()
        Breed.objects.create(name=None, category=category)
        serializer = CategorySerializer(category, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=http_status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        try:
            category = Category.objects.get(pk=pk)
            breeds = Breed.objects.filter(category=category)
            breeds.delete()
        except Category.DoesNotExist:
            return Response(status=http_status.HTTP_404_NOT_FOUND)
        
        category.delete()
        return Response(status=http_status.HTTP_204_NO_CONTENT)

class BreedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        category_id = request.query_params.get('category_id')
        if category_id:
            breeds = Breed.objects.filter(category_id=category_id, name__isnull=False)
        else:
            breeds = Breed.objects.filter(name__isnull=False)
        serializer = BreedSerializer(breeds, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BreedSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=http_status.HTTP_201_CREATED)
        return Response(serializer.errors, status=http_status.HTTP_400_BAD_REQUEST)
    
class DonationBreedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        category_id = request.query_params.get('category_id')
        print(category_id)
        if category_id:
            try:
                breeds = Breed.objects.filter(category_id=category_id)
                serializer = BreedSerializer(breeds, many=True)
                return Response(serializer.data)
            except Exception as e:
                return Response({'error': str(e)}, status=http_status.HTTP_400_BAD_REQUEST)
        else:
            breeds = Breed.objects.all()
            serializer = BreedSerializer(breeds, many=True)
            return Response(serializer.data)
 
class DonationView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Donation.objects.get(pk=pk)
        except Donation.DoesNotExist:
            raise NotFound('Donation not found')

    def get(self, request):
        category_id = request.query_params.get('category_id')
        donations = Donation.objects.all()
        if category_id:
            donations = donations.filter(category_id=category_id)
        serializer = DonationSerializer(donations, many=True)
        return Response(serializer.data)

    def post(self, request):

        user = request.user
        if not user.is_authenticated:
            return Response({'error': 'Authentication required'}, status=http_status.HTTP_401_UNAUTHORIZED)

        main_image = request.FILES.get('main_image')
        additional_images = request.FILES.getlist('additional_images')

        data = request.data.copy()
        serializer = DonationSerializer(data=data, context={'request': request})

        if serializer.is_valid():

            donation = serializer.save()
            if main_image:
                donation.image.save(main_image.name, main_image)

            
            for image in additional_images:
                
                AdditionalImage.objects.create(donation=donation, image=image)
            return Response(serializer.data, status=http_status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=http_status.HTTP_400_BAD_REQUEST)
        

class DonationDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Donation.objects.get(pk=pk)
        except Donation.DoesNotExist:
            raise NotFound('Donation not found')

    def get(self, request, pk):
        donation = self.get_object(pk)
        serializer = DonationSerializer(donation)
        return Response(serializer.data)

    def put(self, request, pk):
        donation = self.get_object(pk)

        main_image = request.FILES.get('main_image')
        additional_images = request.FILES.getlist('additional_images')

        data = request.data.copy()
        serializer = DonationSerializer(donation, data=data, context={'request': request}, partial=True)
        # print(data)
        if serializer.is_valid():
            donation = serializer.save()
            if main_image:
                donation.image.save(main_image.name, main_image)

            a = AdditionalImage.objects.filter(donation=donation)
            # print(a)
            a.delete()

            for image in additional_images:
                AdditionalImage.objects.create(donation=donation, image=image)
            return Response(serializer.data)
        return Response(serializer.errors, status=http_status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        donation = self.get_object(pk)
        donation.delete()
        return Response(status=http_status.HTTP_204_NO_CONTENT)

class DonorAdminView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            donor = CustomUser.objects.filter(user_type='donor')
        except CustomUser.DoesNotExist:
            return Response({'error': 'Donors not found'}, status=http_status.HTTP_404_NOT_FOUND)
        
        serializer = UserSerializer(donor, many=True)
        return Response(serializer.data)
    
    def delete(self, request, pk):
        try:
            donor = CustomUser.objects.get(id=pk, user_type='donor')
            print(donor)
            donor.delete()
            return Response(status=http_status.HTTP_204_NO_CONTENT)
        except Donation.DoesNotExist:
            return Response({'error': 'Donor not found'}, status=http_status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=http_status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuyerAdminView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            buyer = CustomUser.objects.filter(user_type='buyer')
        except CustomUser.DoesNotExist:
            return Response({'error': 'Buyers not found'}, status=http_status.HTTP_404_NOT_FOUND)
        
        serializer = UserSerializer(buyer, many=True)
        return Response(serializer.data)
    
    def delete(self, request, pk):
        try:
            buyer = CustomUser.objects.get(id=pk, user_type='buyer')
            print(buyer)
            buyer.delete()
            return Response(status=http_status.HTTP_204_NO_CONTENT)
        except Donation.DoesNotExist:
            return Response({'error': 'Buyer not found'}, status=http_status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=http_status.HTTP_500_INTERNAL_SERVER_ERROR)


class DonationAdminView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            data = Donation.objects.filter(status='pending')
            serializer = DonationSerializer(data, many=True)
            return Response(serializer.data, status=http_status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=http_status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def patch(self, request, donation_id):
        try:
            donation = Donation.objects.get(id=donation_id)
            donation_status = request.data.get('status')

            if donation_status not in dict(Donation.STATUS_CHOICES).keys():
                return Response({'error': 'Invalid status'}, status=http_status.HTTP_400_BAD_REQUEST)

            donation.status = donation_status
            donation.save()

            serializer = DonationSerializer(donation)
            return Response(serializer.data, status=http_status.HTTP_200_OK)
        except Donation.DoesNotExist:
            return Response({'error': 'Donation not found'}, status=http_status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=http_status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, donation_id):
        try:
            donation = Donation.objects.get(id=donation_id)
            donation.delete()
            return Response(status=http_status.HTTP_204_NO_CONTENT)
        except Donation.DoesNotExist:
            return Response({'error': 'Donation not found'}, status=http_status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=http_status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ApprovedDonationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            data = Donation.objects.filter(status = 'approved')
            serializer = DonationSerializer(data, many=True)
            return Response(serializer.data, status=http_status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=http_status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete(self, request, pk):
        try:
            donation = Donation.objects.get(id=pk, status = 'approved')
            print(donation)
            donation.delete()
            return Response(status=http_status.HTTP_204_NO_CONTENT)
        except Donation.DoesNotExist:
            return Response({'error': 'Donation not found'}, status=http_status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=http_status.HTTP_500_INTERNAL_SERVER_ERROR)

class DonationDonorView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            data = Donation.objects.filter(donor = request.user.id)
            serializer = DonationSerializer(data, many=True)
            return Response(serializer.data, status=http_status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=http_status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class AvailableDonationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            data = Donation.objects.filter(status = 'approved', purchase_status = 'not_purchased')
            serializer = DonationSerializer(data, many=True)
            return Response(serializer.data, status=http_status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=http_status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def patch(self, request, pk):
        try:
            donation = Donation.objects.get(pk=pk)
            if donation.purchase_status == 'not_purchased':
                donation.purchase_status = 'purchased'
                donation.purchased_date = timezone.now()
                donation.buyer = request.user
                donation.save()
                serializer = DonationSerializer(donation)
                return Response(serializer.data, status=http_status.HTTP_200_OK)
            else:
                return Response({'error': 'Donation already purchased'}, status=http_status.HTTP_400_BAD_REQUEST)
        except Donation.DoesNotExist:
            return Response({'error': 'Donation not found'}, status=http_status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=http_status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class PurchasedDonationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            data = Donation.objects.filter(status = 'approved', purchase_status = 'purchased', purchased_date__isnull=False).order_by('-purchased_date')
            serializer = DonationSerializer(data, many=True)
            return Response(serializer.data, status=http_status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=http_status.HTTP_500_INTERNAL_SERVER_ERROR)
        


