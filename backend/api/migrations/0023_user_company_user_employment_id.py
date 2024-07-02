# Generated by Django 5.0.4 on 2024-07-02 15:21

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_remove_user_company_remove_user_employment_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='company',
            field=models.ForeignKey(default='b59e73c4', on_delete=django.db.models.deletion.CASCADE, related_name='user', to='api.company'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='employment_id',
            field=models.ForeignKey(default='cbcb6aa3', on_delete=django.db.models.deletion.CASCADE, to='api.employee'),
            preserve_default=False,
        ),
    ]
