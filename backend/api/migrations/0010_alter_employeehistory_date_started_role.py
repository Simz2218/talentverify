# Generated by Django 5.0.7 on 2024-07-12 20:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_employee_date_left_role_employee_date_started_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employeehistory',
            name='date_started_role',
            field=models.DateField(blank=True, null=True),
        ),
    ]
