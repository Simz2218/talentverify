from api.models import Company,Employee,Department,EmployeeHistory,User,Profile
from django.db import transaction
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.db.models import Q


class USerSerializer(serializers.ModelSerializer):
    class Meta:
        Model= User
        fields=['id','username','email']


class MyTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls,user):
        token = super().get_token(user)
        token['full_name'] = user.profile.full_name
        token['username'] = user.username
        token['employment_id'] = str(user.employment_id)
        token['email'] = user.email
        token['bio'] = user.profile.bio
        token['image'] = str(user.profile.image)
        token['verified'] = user.profile.verified
        token['company'] = str(user.company)
        
        return token







class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2', 'company', 'employment_id']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password': "Password fields do not match"})

        # Check if the employment_id exists in the Employee model and matches the provided company
        try:
            employee = Employee.objects.get(pk=attrs['employment_id'].pk, company=attrs['company'])
        except Employee.DoesNotExist:
            raise serializers.ValidationError(f"The employment ID '{attrs['employment_id'].pk}' does not exist in the provided company.")

        # Check if a user with the same employment_id already exists
        if User.objects.filter(employment_id=employee).exists():
            raise serializers.ValidationError(f"A user with the employment ID '{employee.pk}' already exists.")

        return attrs

    @transaction.atomic
    def create(self, validated_data):
        # Check if a user with the same username already exists
        if User.objects.filter(username=validated_data['username']).exists():
            raise serializers.ValidationError(f"A user with the username '{validated_data['username']}' already exists. Please choose a different username.")

        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            company=validated_data['company'],
            employment_id=validated_data['employment_id']
        )
        user.set_password(validated_data['password'])
        user.save()

        # Create a Profile instance for the new User instance
        profile = Profile.objects.create(
            user=user,
        )

        # Update the Employee instance with the new user
        employee = validated_data['employment_id']
        employee.user = user
        employee.save()

        # Increment the num_employees field of the Company instance
        company = Company.objects.get(pk=validated_data['company'].pk)
        company.num_employees += 1
        company.save()

        return user
    
    
    # Company Registration
    
class CoRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['company_name', 'registration_number', 'registration_date', 'address', 'contact_person', 'email_address', 'contact_phone', ]

    def validate(self, attrs):
        company = attrs['company_name']
        registration_number = attrs['registration_number']
        email = attrs['email_address']
        phone = attrs['contact_phone']

        if Company.objects.filter(
            Q(company_name=company) |
            Q(registration_number=registration_number) |
            Q(email_address=email) |
            Q(contact_phone=phone)
        ).exists():
            raise serializers.ValidationError("A company with the same name, registration number, email, or phone number already exists.")

        return attrs

    def create(self, validated_data):
        
        company = Company.objects.create(
            
            
            company_name=validated_data['company_name'],
            registration_number=validated_data['registration_number'],
            registration_date=validated_data['registration_date'],
            address=validated_data['address'],
            contact_person=validated_data['contact_person'],
            email_address=validated_data['email_address'],
            contact_phone=validated_data['contact_phone'],
            
        )
        
        
        return company


class addDepartmentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Department
        fields=['company','department_name']
        
   
    def validate(self, attrs):
        company = attrs['company']
        department_name = attrs['department_name']

        if Department.objects.filter(company=company, department_name=department_name).exists():
            raise serializers.ValidationError(f"A department with the name '{department_name}' already exists in your company.")

        return attrs

    def create(self, validated_data):
        department = Department.objects.create(
            company=validated_data['company'],
            department_name=validated_data['department_name']
        )
        return department