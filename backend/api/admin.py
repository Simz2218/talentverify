from django.contrib import admin
from api.models import Company,Employee,Department,EmployeeHistory,User,Profile



class UserAdmin(admin.ModelAdmin):
   
    list_display = ['username', 'email','company', 'employment_id',"password","company_user_status"]
    list_editable = ["company_user_status"]
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'verified']
    list_editable = ['verified']


class CompanyAdmin(admin.ModelAdmin):
    #Company.objects.all().delete()

    list_display =['company_name','company_id','num_employees','contact_phone']

class EmployeeAdmin(admin.ModelAdmin):
   # Employee.objects.all().delete()

    list_display=['last_name','company_id','employee_id','department_id','employment_status','employment_id','date_started_role']
    
    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        company = obj.company
        company.num_employees = Employee.objects.filter(company=company).count()
        company.save()
class EmployeeHistoryAdmin(admin.ModelAdmin):
    #EmployeeHistory.objects.all().delete()

    list_display=['roles']

class DepartmentAdmin(admin.ModelAdmin):
   # Department.objects.all().delete()

    list_display=['department_id']



# Register your models here.
admin.site.register(Company, CompanyAdmin)
admin.site.register(Employee, EmployeeAdmin)
admin.site.register(Department, DepartmentAdmin)
admin.site.register(EmployeeHistory, EmployeeHistoryAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)