

from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from .models import Employee, EmployeeHistory
from datetime import date

@receiver(pre_save, sender=Employee)
def check_employee_update(sender, instance, **kwargs):
    if instance.pk:
        try:
            old_instance = Employee.objects.get(employment_id=instance.employment_id)
            if old_instance.role != instance.role:
                EmployeeHistory.objects.filter(
                    employment_id=old_instance,
                    company_id=old_instance.company,
                    date_left_role__isnull=True
                ).update(date_left_role=date.today())
        except Employee.DoesNotExist:
            pass

@receiver(post_save, sender=Employee)
def create_or_update_employee_history(sender, instance, **kwargs):
    if instance._state.adding or instance.role != Employee.objects.get(employment_id=instance.employment_id).role:
        EmployeeHistory.objects.create(
            employment_id=instance,
            company_id=instance.company,
            department_id=instance.department,
            role=instance.role,
            date_started_role=date.today(),
            duties=instance.duties,
        )


        

