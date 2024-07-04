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
from rest_framework import status
# from django.contrib.auth.models import update_last_login
from .serializers import CustomTokenObtainPairSerializer
from django.core.mail import send_mail

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
        

@api_view(['GET'])
def home(request):
     return Response({'name':'OK'})


# CustomUser = get_user_model()

class UserRegisterView(APIView):

    def post(self, request):
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

            return Response({'refresh': str(refresh), 'access': str(refresh.access_token)}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
        data = {
            'message': 'Welcome to the admin dashboard'
        }
        return Response(data)
    
class BuyerView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        buyers = CustomUser.objects.filter(user_type='buyer')
        serializer = UserSerializer(buyers, many=True)
        return Response(serializer.data)

class DonorView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        donors = CustomUser.objects.filter(user_type='donor')
        serializer = UserSerializer(donors, many=True)
        return Response(serializer.data)

    
