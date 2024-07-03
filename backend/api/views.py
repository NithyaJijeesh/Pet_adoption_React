from rest_framework.permissions import  IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import *
from .serializers import *
# from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
# from rest_framework_simplejwt.authentication import JWTAuthentication

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from django.contrib.auth.models import update_last_login
from .serializers import CustomTokenObtainPairSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    # def post(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     try:
    #         serializer.is_valid(raise_exception=True)
    #         user = serializer.user
    #         refresh = RefreshToken.for_user(user)

    #         update_last_login(None, user)
    #         response_data = {
    #             'refresh': str(refresh),
    #             'access': str(refresh.access_token),
    #             'user_type': user.user_type,  # Add user_type to response
    #             'is_superuser': user.is_superuser,  # Add is_superuser to response
    #         }
    #         print(response_data)
    #         return Response(response_data, status=status.HTTP_200_OK)
    #     except Exception as e:
    #         return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['GET'])
# @permission_classes([IsAdminUser])
def home(request):
    # permission_classes  = [IsAdminUser]
    return Response({'name':'OK'})


@api_view(['POST'])
def registeruser(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = CustomUser.objects.create_user(
            username = request.data.get('username'),
            password = request.data.get('password')
        )

        # token = Token.objects.create(user = user)
        refresh = RefreshToken.for_user(user)
        return Response({'refresh': str(refresh), 'access': str(refresh.access_token)})
    else:
        return Response(serializer.errors)


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
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAdminUser]
    def get(self, request):
        data = {
            'message': 'Welcome to the admin dashboard'
        }
        return Response(data)
    

class DonorView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'name':'OK'})
    
