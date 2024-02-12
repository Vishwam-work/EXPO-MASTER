# Generated by Django 4.0.5 on 2023-11-23 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expo', '0013_commonname_notifyname'),
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customer_name', models.CharField(max_length=255)),
                ('customer_address', models.CharField(max_length=255)),
                ('customer_bank', models.CharField(max_length=255)),
                ('customer_country', models.CharField(max_length=255)),
            ],
        ),
    ]