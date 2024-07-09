from django.shortcuts import render
from api.models import Company,Employee,Department,EmployeeHistory,User,Profile
from api.serializer import  USerSerializer, MyTokenSerializer,RegisterSerializer,CoRegisterSerializer,addDepartmentSerializer,DepartmentSerializer,CompanySerializer,EmployeeSerializer,UsersSerializer,EmployeesSerializer
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics, status, permissions,viewsets
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

class departmentView(viewsets.ModelViewSet):
    queryset= Department.objects.all()
    permission_classes=([AllowAny])
    serializer_class=DepartmentSerializer
    
class EmployeeView(viewsets.ModelViewSet):
    queryset= Employee.objects.all()
    permission_classes=([AllowAny])
    serializer_class=EmployeeSerializer

class companyView(viewsets.ModelViewSet):
    queryset= Company.objects.all()
    permission_classes=([AllowAny])
    serializer_class=CompanySerializer   
    
class UsersView(viewsets.ModelViewSet):
    queryset= User.objects.all()
    permission_classes=([AllowAny])
    serializer_class=UsersSerializer
    




class EmployeesView(generics.CreateAPIView):
    queryset= Employee.objects.all()
    permission_classes=([AllowAny])
    serializer_class=EmployeesSerializer
    