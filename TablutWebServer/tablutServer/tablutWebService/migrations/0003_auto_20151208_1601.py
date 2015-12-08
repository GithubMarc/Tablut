# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tablutWebService', '0002_auto_20151208_1517'),
    ]

    operations = [
        migrations.CreateModel(
            name='game_type',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('label', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='match',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100)),
                ('game_type', models.ForeignKey(to='tablutWebService.game_type')),
            ],
        ),
        migrations.RenameModel(
            old_name='player_status',
            new_name='player_type',
        ),
    ]
