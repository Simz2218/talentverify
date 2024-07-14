from api.models import Company, Employee, Department, User, EmployeeHistory
from django.db import transaction
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.db.models import Q
from django.db.models.signals import post_save
from django.dispatch import receiver
from .signals import check_employee_update, create_or_update_employee_history



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'company','employment_id', 'username', 'email', 'company_user_status']


class MyTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['employment_id'] = str(user.employment_id)
        token['email'] = user.email
        token['company'] = str(user.company)
        token['company_user_status'] = user.company_user_status
        return token


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2', 'company', 'employment_id', 'company_user_status']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password': "Password fields do not match"})

        try:
            employee = Employee.objects.get(pk=attrs['employment_id'].pk, company=attrs['company'])
        except Employee.DoesNotExist:
            raise serializers.ValidationError(f"The employment ID '{attrs['employment_id']}' does not exist in the provided company.")

        if User.objects.filter(employment_id=employee).exists():
            raise serializers.ValidationError(f"A user with the employment ID '{employee.pk}' already exists.")

        return attrs

    @transaction.atomic
    def create(self, validated_data):
        if not User.objects.filter(company=validated_data['company']).exists():
            company_user_status = True
        else:
            company_user_status = False

        if User.objects.filter(username=validated_data['username']).exists():
            raise serializers.ValidationError(f"A user with the username '{validated_data['username']}' already exists. Please choose a different username.")

        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            company=validated_data['company'],
            employment_id=validated_data['employment_id'],
            company_user_status=company_user_status,
        )
        user.set_password(validated_data['password'])
        user.save()

        employee = validated_data['employment_id']
        employee.user = user
        employee.save()

        return user


class CoRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['company_name', 'registration_number', 'registration_date', 'address', 'contact_person', 'email_address', 'contact_phone']

    def validate(self, attrs):
        if Company.objects.filter(
            Q(company_name=attrs['company_name']) |
            Q(registration_number=attrs['registration_number']) |
            Q(email_address=attrs['email_address']) |
            Q(contact_phone=attrs['contact_phone'])
        ).exists():
            raise serializers.ValidationError("A company with the same name, registration number, email, or phone number already exists.")
        return attrs

    def create(self, validated_data):
        return Company.objects.create(**validated_data)


class addDepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = "__all__"

    def validate(self, attrs):
        if Department.objects.filter(company=attrs['company'], department_name=attrs['department_name']).exists():
            raise serializers.ValidationError(f"A department with the name '{attrs['department_name']}' already exists in your company.")
        return attrs

    def create(self, validated_data):
        return Department.objects.create(**validated_data)


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['company_id', 'company_name', 'registration_number', 'registration_date', 'address', 'contact_person', 'email_address', 'contact_phone', 'num_employees']

    def update_num_employees(sender, instance, created, **kwargs):
        if created or kwargs.get('update_fields') == ['company']:
            company = instance.company
            company.num_employees = Employee.objects.filter(company=company).count()
            company.save()

    post_save.connect(update_num_employees, sender=Employee)


class EmployeeSerializer(serializers.ModelSerializer):
    department_id = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all())
    class Meta:
        model = Employee
        fields = '__all__'

    def validate(self, attrs):
        if attrs.get('date_started_role') and attrs.get('date_left_role') and attrs['date_started_role'] >= attrs['date_left_role']:
            raise serializers.ValidationError("End date must be after start date.")
        return attrs

    def create(self, validated_data):
        return Employee.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class EmployeeHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeHistory
        fields = '__all__'
