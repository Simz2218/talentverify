# Generated by Django 5.0.7 on 2024-07-12 19:18

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_employee_user_alter_department_company_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='date_left_role',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='employee',
            name='date_started_role',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
