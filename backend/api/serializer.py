from api.models import Company,Employee,Department,EmployeeHistory,User,Profile
from django.db import transaction


from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers



class USerSerializer(serializers.ModelSerializer):
    class Meta:
        Model= User
        fields=['id','username','email']


class MyTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls,user):
        token = super().get_token(User)
        token['full_name'] = user.profile.full_name
        token['username'] = user.username
        token['employment_id'] = user.profile.employment_id
        token['email'] = user.email
        token['bio'] = user.profile.bio
        token['image'] = str(user.profile.image)
        token['verified'] = user.profile.verified
        
        return token

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only= True, required=True, validate=['validate_password']
    )
    
    password2 = serializers.CharField(
        write_only= True, required=True, 
    )
    
    class Meta:
        model= User
        fields= ['username','email','password','password2','company','employment_id']
        
        def validate(self,attrs):
            if attrs['password']!= attrs['password2']:
                raise serializers.ValidateError(
                    {'password':"password fields do not Match"})
            return attrs
        
    def create(self,validated_data):
        with transaction.atomic():
            user =User.objects.create(username=validated_data['username'], email=validated_data['email'])   
            user.set_password(validated_data['password'])
            if user.profile.employment_id  
            user.save()
            
            return user     

    
