# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tablutWebService', '0004_friend_list_match_user_type_user_stat'),
    ]

    operations = [
        migrations.CreateModel(
            name='score',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('score', models.CharField(max_length=100)),
                ('match', models.OneToOneField(to='tablutWebService.match')),
            ],
        ),
        migrations.CreateModel(
            name='time',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('game_time', models.DateTimeField(verbose_name=b'Dur\xc3\xa9e de la partie')),
                ('match', models.OneToOneField(to='tablutWebService.match')),
            ],
        ),
        migrations.CreateModel(
            name='turn',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('turn', models.IntegerField()),
                ('team_turn', models.CharField(max_length=100)),
                ('match', models.OneToOneField(to='tablutWebService.match')),
            ],
        ),
    ]
