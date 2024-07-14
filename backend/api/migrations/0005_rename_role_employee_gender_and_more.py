# Generated by Django 5.0.7 on 2024-07-11 10:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_delete_profile'),
    ]

    operations = [
        migrations.RenameField(
            model_name='employee',
            old_name='role',
            new_name='Gender',
        ),
        migrations.RemoveField(
            model_name='employee',
            name='date_left_role',
        ),
        migrations.RemoveField(
            model_name='employee',
            name='date_started_role',
        ),
        migrations.RemoveField(
            model_name='employee',
            name='department_id',
        ),
        migrations.RemoveField(
            model_name='employee',
            name='duties',
        ),
        migrations.AddField(
            model_name='employeehistory',
            name='duties',
            field=models.TextField(default='buying'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='employeehistory',
            name='department_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='employees', to='api.department'),
        ),
    ]
