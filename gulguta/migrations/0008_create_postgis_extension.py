# Generated by Django 4.2.1 on 2025-04-09 07:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gulguta', '0007_alter_eventcategory_options_eventcategory_active'),
    ]

    operations = [
        migrations.RunSQL(
            "CREATE EXTENSION IF NOT EXISTS postgis;",
            "DROP EXTENSION IF EXISTS postgis;"
        ),
    ]
