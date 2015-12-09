#-*- coding: utf-8 -*-
from django.db import models
from django.contrib.auth.models import User

# Create your models here.q
class player_type(models.Model):
	label = models.CharField(max_length = 100)
	#auteur = models.CharField(max_length=42)
	#contenu = models.TextField(null=True)
	#date = models.DateTimeField(auto_now_add=True, auto_now=False, verbose_name="Date de parution")

	def __str__(self):
		return self.label

class game_type(models.Model):
	label = models.CharField(max_length = 100)

	def __str__(self):
		return self.label

class match(models.Model):
	name = models.CharField(max_length = 100)
	game_type = models.ForeignKey('game_type')
	status = models.CharField(max_length = 100)

	def __str__(self):
		return self.name

class match_user_type(models.Model):
	user = models.ForeignKey(User)
	match = models.ForeignKey('match')
	player_type = models.ForeignKey('player_type')

	def __str__(self):
		return str(self.user) + " " + str(self.match) + " " + str(self.player_type)

class user_stat(models.Model):
	user = models.OneToOneField(User)  # La liaison OneToOne vers le modèle User
	match_play = models.IntegerField()
	match_win = models.IntegerField()

	def __str__(self):
		return "Statistique de {0}".format(self.user.username)

class friend_list(models.Model):
	user = models.ForeignKey(User, related_name = "friend_listship_creator")
	friend = models.ForeignKey(User, related_name = "friend_set")

	def __str__(self):
		return str(self.user) + " " + str(self.friend)

class time(models.Model):
	match = models.OneToOneField('match')
	game_time = models.DateTimeField(auto_now_add=False, auto_now=False, verbose_name="Durée de la partie")

	def __str__(self):
		return "Score de {0}".format(self.match.name)

class turn(models.Model):
	match = models.OneToOneField('match')
	turn = models.IntegerField()
	team_turn = models.CharField(max_length = 100)

	def __str__(self):
		return "Score de {0}".format(self.match.name)

class score(models.Model):
	match = models.OneToOneField('match')
	score = models.CharField(max_length = 100)

	def __str__(self):
		return "Score de {0}".format(self.match.name)

