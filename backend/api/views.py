from django.shortcuts import render
from api.models import Company,Employee,Department,EmployeeHistory,User,Profile
from api.serializer import  USerSerializer, MyTokenSerializer,RegisterSerializer,CoRegisterSerializer,addDepartmentSerializer
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
# Create your views here.
class MyTokenSerializerView(TokenObtainPairView):
    serializer_class= MyTokenSerializer
    
class RegisterView(generics.CreateAPIView):
    queryset= User.objects.all()
    permission_classes=([AllowAny])
    serializer_class=RegisterSerializer

class CoRegisterView(generics.CreateAPIView):
    queryset= Company.objects.all()
    permission_classes=([AllowAny])
    serializer_class=CoRegisterSerializer

class addDepartmentView(generics.CreateAPIView):
    queryset= Department.objects.all()
    permission_classes=([AllowAny])
    serializer_class=addDepartmentSerializer

# ...

@api_view(['GET', 'POST'])
@permission_classes ([IsAuthenticated])
def dashboard(request):
    # ...
    if request.method == "GET":
        context= f"Hey {request.user},You are getting the response"
        return Response({'response', context},status=status.HTTP_200_OK)
    
    elif request.method == "POST":
        
        text= request.POST.get("text")
        response = f"he{request.user}, your text is {text}"
        return Response({'response': response},status=status.HTTP_200_OK)
    
    return Response({'response': response},status=status.HTTP_400_BAD_REQUEST)
    
    