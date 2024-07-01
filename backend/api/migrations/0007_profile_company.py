# Generated by Django 5.0.4 on 2024-07-01 08:02

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_company_logo_alter_company_company_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='company',
            field=models.ForeignKey(default='00fA0000', on_delete=django.db.models.deletion.CASCADE, related_name='company_users', to='api.company'),
            preserve_default=False,
        ),
    ]
