#-*- coding: utf-8 -*-
from django.db import models

# Create your models here.q
class player_type(models.Model):
	label = models.CharField(max_length=100)
	#auteur = models.CharField(max_length=42)
	#contenu = models.TextField(null=True)
	#date = models.DateTimeField(auto_now_add=True, auto_now=False, verbose_name="Date de parution")

	def __str__(self):
		return self.label

class game_type(models.Model):
	label = models.CharField(max_length=100)

	def __str__(self):
		return self.label


class match(models.Model):
	name = models.CharField(max_length=100)
	game_type = models.ForeignKey('game_type')

	def __str__(self):
		return self.name