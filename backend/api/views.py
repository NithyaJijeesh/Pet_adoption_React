from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework_simplejwt import tokens


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
        token = Token.objects.create(user = user)
        print(user)
        # print(password) 
        print(token.key)
        return Response({'token': token.key})
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
            token = Token.objects.get(user = user)
            print(token)
            # if user.is_superuser :
            #     return Response({'user' : 'admin'})
            return Response({'token' : token.key})
    else:
        return Response(serializer.errors)
    

class DonorView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        return Response({'name':'OK'})
