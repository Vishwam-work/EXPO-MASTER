# Generated by Django 4.0.5 on 2023-12-08 13:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expo', '0017_porformadocument_delete_performa'),
    ]

    operations = [
        migrations.CreateModel(
            name='Analysis',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('CONSIGNEE', models.CharField(max_length=255)),
                ('Country', models.CharField(max_length=255)),
                ('Port', models.CharField(max_length=255)),
                ('Product', models.CharField(max_length=255)),
                ('INVOICEDATE', models.DateField()),
                ('Month', models.CharField(max_length=255)),
                ('YEAR', models.IntegerField()),
                ('TotalWeight', models.FloatField()),
                ('AMOUNT', models.FloatField()),
            ],
        ),
    ]