# Generated by Django 4.2.1 on 2023-06-01 05:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0007_alter_course_video'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='video',
            field=models.FileField(upload_to='photos/course'),
        ),
    ]
