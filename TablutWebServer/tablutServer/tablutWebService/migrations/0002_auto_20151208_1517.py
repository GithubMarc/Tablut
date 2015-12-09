# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tablutWebService', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='player_status',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('label', models.CharField(max_length=100)),
            ],
        ),
        migrations.DeleteModel(
            name='Article',
        ),
    ]
