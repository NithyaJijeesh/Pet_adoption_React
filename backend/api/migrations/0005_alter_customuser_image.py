# Generated by Django 5.0.6 on 2024-07-03 19:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_customuser_address_customuser_image_customuser_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='image',
            field=models.ImageField(blank=True, default='default_image.jpg', null=True, upload_to='images/'),
        ),
    ]
