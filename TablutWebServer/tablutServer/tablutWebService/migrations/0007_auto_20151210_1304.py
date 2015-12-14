# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tablutWebService', '0006_auto_20151210_1106'),
    ]

    operations = [
        migrations.AlterField(
            model_name='time',
            name='game_time',
            field=models.DateTimeField(default=b'', verbose_name=b'Dur\xc3\xa9e de la partie', blank=True),
        ),
    ]
