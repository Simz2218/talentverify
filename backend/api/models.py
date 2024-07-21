from django.db import models

from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.forms import ModelForm,ModelChoiceField
import uuid
from django.db.models import Count


from django.conf import settings
from django.db import models




class Company(models.Model):
   
    company_id = models.CharField(primary_key = True,max_length=8, editable=False,default="")
    company_name = models.CharField(max_length=100, unique=True)
    registration_date = models.DateField()
    registration_number = models.CharField(max_length=10,unique=True)
    address = models.TextField()
    contact_person = models.CharField(max_length=100, unique=True)
    number_of_departments= models.IntegerField(default=0) # Comma-separated list of departments
    num_employees = models.PositiveIntegerField(editable=False,default=0)
    contact_phone = models.CharField(max_length=20,unique=True)
    email_address = models.EmailField(unique=True)
    

    def save(self, *args, **kwargs):
        if not self.company_id:
            self.company_id = str(uuid.uuid4().hex)[:8]
        super().save(*args, **kwargs)



class Department(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='department', default="")
    department_id = models.CharField(primary_key = True,max_length=8, editable=False)
    department_name = models.CharField(max_length=100)

    def save(self, *args, **kwargs):
        if not self.department_id:
            self.department_id = str(uuid.uuid4().hex)[:8]
        super().save(*args, **kwargs)




    def __str__(self):
        return f"{self.company} - {self.department_name}"
    
    
class Employee(models.Model):
    employment_id = models.CharField(primary_key=True, max_length=8, editable=False)
    company = models.ForeignKey('Company', on_delete=models.CASCADE, related_name='employees')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=11, unique=True, null=False)
    department_id = models.ForeignKey('Department', on_delete=models.CASCADE, related_name='employees')
    role = models.CharField(max_length=100, null=False)
    date_started_role = models.DateField()
    date_left_role = models.DateField(null=True, blank=True)
    duties = models.TextField(null=False)
    employment_status = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if not self.employment_id:
            self.employment_id = str(uuid.uuid4().hex)[:8]
        super().save(*args, **kwargs)





class User(AbstractUser):
        username = models.CharField(max_length=100)
        email = models.EmailField(unique=True)
        password=models.CharField(max_length=21)
        company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='user')
        employment_id= models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='users')
        company_user_status = models.BooleanField(default=True)
        USERNAME_FIELD = 'email'
        REQUIRED_FIELDS = ['username']

       








   







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
    employment_id= models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='employee')
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE)
    department_id = models.ForeignKey(Department, on_delete=models.CASCADE)
    roles = models.CharField(max_length=100)
    duties = models.TextField(null=False)
    date_started_role = models.DateField()
    date_left_role = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.company_id} "







