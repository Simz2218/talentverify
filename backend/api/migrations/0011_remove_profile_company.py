# Generated by Django 5.0.4 on 2024-07-01 12:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_profile_employment_id_alter_employee_username'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='company',
        ),
    ]
