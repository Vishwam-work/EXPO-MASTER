# Generated by Django 4.0.5 on 2023-12-13 07:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expo', '0018_analysis'),
    ]

    operations = [
        migrations.AddField(
            model_name='porformadocument',
            name='Amount',
            field=models.FloatField(blank=True, default=0),
            preserve_default=False,
        ),
    ]