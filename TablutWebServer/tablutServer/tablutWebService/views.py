#-*- coding: utf-8 -*-
import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, Http404, HttpResponseForbidden
from django.shortcuts import render
from tablutWebService.models import *
from django.core.exceptions import PermissionDenied
from django.contrib.sessions.models import Session
from django.contrib.auth.decorators import login_required
import redis




# Create your views here
def testbase(request):
	if request.method == 'GET':
		print request
		print request.method
	elif request.method == 'POST':
		print request
		print request.method
		print request.body
		tata = json.loads(request.body)
		print tata["toto"]

	text = json.dumps({"toto":"tata","id":1})
	return HttpResponse(text, content_type = "application/json")
	# curl -i -X DELETE -H "Content-Type : application/json" http://172.31.1.121:1337/locations/3

def testtemplate(request, var1, vartest):
	total = int(var1) + int(vartest)

	# Retourne nombre1, nombre2 et la somme des deux au tpl
	return render(request, 'tablutWebService/testtemplate.html', locals())

def user_connexion(request):
	if request.method == 'POST':
		try:
			user_log = json.loads(request.body)
			user_name = user_log["login"]
			user_password = user_log["password"]
		except:
			return HttpResponse("bad format json")
		user = authenticate(username = user_name, password = user_password)
		if user is not None:
			if user.is_active:
				login(request, user)
				return HttpResponse("connected")
			else:
				print "connect fail"
				return HttpResponse("connect fail")
		else:
			return HttpResponse("mauvais mdp ou login")
	else:
		raise PermissionDenied


def user_logout(request):
	logout(request)
	return HttpResponse("deconnexion")

def new_user(request):
	if request.method == 'POST':
		try:
			new_user = json.loads(request.body)
			user_email = new_user["email"]
			user_password = new_user["password"]
		except:
			return HttpResponse("bad format json")
		User.objects.create_user(user_email, user_email, user_password)
		return HttpResponse("utilisateur créé")

	else:
		raise PermissionDenied

