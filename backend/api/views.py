from django.shortcuts import render
# from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def home(request):
    return Response({'name':'OK'})

@api_view(['POST'])
def loginuser(request):
    pass
