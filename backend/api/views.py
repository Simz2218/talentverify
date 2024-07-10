from django.shortcuts import render
from api.models import Company, Employee, Department, EmployeeHistory, User
from api.serializer import UsersSerializer, MyTokenSerializer, RegisterSerializer, CoRegisterSerializer, addDepartmentSerializer, DepartmentSerializer, CompanySerializer, EmployeeSerializer, UsersSerializer, EmployeesSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics, status, permissions, viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView
import csv
import pandas as pd
from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser



class MyTokenSerializerView(TokenObtainPairView):
    serializer_class = MyTokenSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

class CoRegisterView(generics.CreateAPIView):
    queryset = Company.objects.all()
    permission_classes = [AllowAny]
    serializer_class = CoRegisterSerializer

class addDepartmentView(generics.CreateAPIView):
    queryset = Department.objects.all()
    permission_classes = [AllowAny]
    serializer_class = addDepartmentSerializer

class departmentView(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    permission_classes = [AllowAny]
    serializer_class = DepartmentSerializer

class EmployeeView(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    permission_classes = [AllowAny]
    serializer_class = EmployeeSerializer

class companyView(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    permission_classes = [AllowAny]
    serializer_class = CompanySerializer

class UsersView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UsersSerializer

class EmployeesView(generics.CreateAPIView):
    queryset = Employee.objects.all()
    permission_classes = [AllowAny]
    serializer_class = EmployeesSerializer

from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializer import EmployeesSerializer
from .models import Employee

class EmployeeListView(ListCreateAPIView, RetrieveUpdateAPIView):
    serializer_class = EmployeesSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'employment_id'  # Set the lookup field to 'pk' explicitly

    def get_queryset(self):
        user = self.request.user
        return Employee.objects.filter(company=user.company)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()



class DepartmentListView(generics.ListAPIView, generics.UpdateAPIView):
    serializer_class = addDepartmentSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'department_id'

    def get_queryset(self):
        user = self.request.user
        return Department.objects.filter(company=user.company)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()

    def get_object(self):
        queryset = self.get_queryset()
        obj = generics.get_object_or_404(queryset, department_id=self.kwargs['department_id'])
        self.check_object_permissions(self.request, obj)
        return obj

class UsersListView(generics.ListAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return User.objects.filter(company=user.company)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()




class UploadEmployeeDataView(APIView):
    parser_classes = [FileUploadParser]

    def post(self, request, *args, **kwargs):
        file_obj = request.FILES['file']
        
        # Determine the file type based on extension
        file_extension = file_obj.name.split('.')[-1].lower()
        
        if file_extension == 'csv':
            return self.handle_csv_upload(file_obj)
        elif file_extension in ['txt', 'xls', 'xlsx']:
            return self.handle_text_or_excel_upload(file_obj, file_extension)
        else:
            return Response({'error': 'Unsupported file format'}, status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)

    def handle_csv_upload(self, file_obj):
        decoded_file = file_obj.read().decode('utf-8').splitlines()
        reader = csv.DictReader(decoded_file)
        return self.process_employee_data(reader)

    def handle_text_or_excel_upload(self, file_obj, file_extension):
        try:
            if file_extension in ['txt']:
                # Handle text file processing
                decoded_file = file_obj.read().decode('utf-8').splitlines()
                reader = csv.DictReader(decoded_file)
                return self.process_employee_data(reader)
            elif file_extension in ['xls', 'xlsx']:
                # Handle Excel file processing using pandas
                df = pd.read_excel(file_obj)
                return self.process_employee_data(df.to_dict(orient='records'))
            else:
                return Response({'error': 'Unsupported file format'}, status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def process_employee_data(self, data):
        try:
            for row in data:
                employee_id = row.get('employee_id')
                try:
                    employee = Employee.objects.get(employee_id=employee_id)
                    serializer = EmployeeSerializer(employee, data=row)
                except Employee.DoesNotExist:
                    serializer = EmployeeSerializer(data=row)

                if serializer.is_valid():
                    serializer.save()
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response({'message': 'Employee data uploaded successfully.'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
