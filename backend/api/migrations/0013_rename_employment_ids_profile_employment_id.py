# Generated by Django 5.0.4 on 2024-07-01 12:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_remove_profile_employment_id_profile_employment_ids'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='employment_ids',
            new_name='employment_id',
        ),
    ]
