# Generated by Django 5.0.4 on 2024-07-02 14:47

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_profile_company'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='company',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='employment_id',
        ),
        migrations.AddField(
            model_name='user',
            name='company',
            field=models.ForeignKey(default='f7c9bb6c', on_delete=django.db.models.deletion.CASCADE, related_name='user', to='api.company'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='employment_id',
            field=models.ForeignKey(default='f7c9bb6c', on_delete=django.db.models.deletion.CASCADE, to='api.employee'),
            preserve_default=False,
        ),
    ]
