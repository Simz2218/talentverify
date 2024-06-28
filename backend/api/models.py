from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.forms import ModelForm,ModelChoiceField
import uuid
from django.db.models import Count


from django.conf import settings


class User(AbstractUser):
        username = models.CharField(max_length=100)
        email = models.EmailField(unique=True)
        password=models.CharField(max_length=21)
        USERNAME_FIELD = 'email'
        REQUIRED_FIELDS = ['username']

        def profile(self):
            profile = Profile.objects.get(user=self)

class Profile(models.Model):
    user = models.OneToOneField(User,
    on_delete=models.CASCADE)
    full_name = models.CharField(max_length=1000)
    bio = models.CharField(max_length=100)
    image = models.ImageField(upload_to="user_images",
    default="default.jpg")
    verified = models.BooleanField(default=False)
    
    def __str__(self):
        return self.name
   

def create_user_profile(sender, instance, created, **kwargs):
        
    if created:
     Profile.objects.create(user=instance)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()
        post_save.connect(create_user_profile, sender=User)
        post_save.connect(save_user_profile, sender=User)
        
        

pk= uuid.uuid4().hex[:8]

class Company(models.Model):
   
    company_id = models.CharField(primary_key = True,max_length=8, editable=False)
    company_name = models.CharField(max_length=100)
    registration_date = models.DateField()
    registration_number = models.CharField(max_length=10)
    address = models.TextField()
    contact_person = models.CharField(max_length=100)
    # number_of_departments= # Comma-separated list of departments
    num_employees = models.PositiveIntegerField(editable=False,default=0)
    contact_phone = models.CharField(max_length=20)
    email_address = models.EmailField()

    def save(self, *args, **kwargs):
        if not self.company_id:
            self.company_id = str(uuid.uuid4().hex)[:8]
        super().save(*args, **kwargs)



class Department(models.Model):
    company_id= models.ForeignKey(Company, on_delete=models.CASCADE)
    department_id = models.CharField(primary_key = True,max_length=8, editable=False)
    department_name = models.CharField(max_length=100)

    # def save(self, *args, **kwargs):
    #     if not self.department_id:
    #         self.department_id = str(uuid.uuid4().hex)[:8]
    #     super().save(*args, **kwargs)




    def __str__(self):
        return f"{self.company_id} - {self.department_name}"


class Employee(models.Model):
    
    employment_id = models.CharField(primary_key = True,max_length=8, editable=False)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='employees')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=11, null=True, blank=True)
    department_id = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='employees')
    role = models.CharField(max_length=100)
    date_started_role = models.DateField()
    date_left_role = models.DateField(null=True, blank=True)
    duties = models.TextField()
    username = models.CharField(max_length=15, unique=True,default=0)
    email = models.EmailField(unique=True, default='company@company.com')
    password = models.CharField(max_length=12, default='123456789123')
    employment_status = models.BooleanField(default=True)
    company_user_status = models.BooleanField(default=True)







    def save(self, *args, **kwargs):
        if not self.employment_id:
            self.employment_id = str(uuid.uuid4().hex)[:8]
        super().save(*args, **kwargs)







# @receiver(post_save, sender=Department)
# def update_number_of_departments(sender, instance, created, **kwargs):
#     if created:
#         instance.company.number_of_departments += 1
#         instance.company.save()

# @receiver(post_delete, sender=Department)
# def update_number_of_departments_on_delete(sender, instance, **kwargs):
#     instance.company.number_of_departments -= 1
#     instance.company.save()


class EmployeeHistory(models.Model):
    employment_id = models.ForeignKey(Employee, on_delete=models.CASCADE)
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE)
    department_id = models.ForeignKey(Department, on_delete=models.CASCADE)
    roles = models.CharField(max_length=100)
    date_started_role = models.DateField()
    date_left_role = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.company_id} - {self.employment_id}"







