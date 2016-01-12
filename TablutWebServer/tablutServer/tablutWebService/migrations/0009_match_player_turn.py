# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tablutWebService', '0008_auto_20151210_1344'),
    ]

    operations = [
        migrations.AddField(
            model_name='match',
            name='player_turn',
            field=models.CharField(default=0, max_length=100),
            preserve_default=False,
        ),
    ]
