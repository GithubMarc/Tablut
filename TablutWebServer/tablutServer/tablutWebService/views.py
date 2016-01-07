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


#serverAddr = "172.20.200.190"
serverAddr = "172.30.1.1"
wsPort = 4000

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
	return render(json.dumps(request), 'tablutWebService/testtemplate.html', locals())

def user_connexion(request):
	if request.method == 'POST':
		resp = {}
		try:
			user_log = json.loads(request.body)
			user_name = user_log["login"]
			user_password = user_log["password"]
		except:
			resp["erreur"] = "bad format json"
			return HttpResponse(json.dumps(resp), content_type = "application/json")
		user = authenticate(username = user_name, password = user_password)
		if user is not None:
			if user.is_active:
				resp["succes"] = "connexion"
				login(request, user)
				return HttpResponse(json.dumps(resp), content_type = "application/json")
			else:
				resp["erreur"] = "erreur de connection"
				return HttpResponse(json.dumps(resp), content_type = "application/json")
		else:
			resp["erreur"] = "mauvais mot de passe ou login"
			return HttpResponse(json.dumps(resp), content_type = "application/json")
	else:
		raise PermissionDenied


def user_logout(request):
	if request.method == 'GET':
		logout(request)
		resp = {}
		resp["succes"] = "deconnexion"
		return HttpResponse(json.dumps(resp), content_type = "application/json")
	else:
		raise PermissionDenied

def new_user(request):
	if request.method == 'POST':
		resp = {}
		try:
			new_user = json.loads(request.body)
			user_email = new_user["email"]
			user_password = new_user["password"]
		except:
			resp["erreur"] = "bad format json"
			return HttpResponse(json.dumps(resp), content_type = "application/json")
		User.objects.create_user(user_email, user_email, user_password)
		resp["succes"] = "utilisateur_cree"
		return HttpResponse(json.dumps(addr), content_type = "application/json")

	else:
		raise PermissionDenied

def return_webSocketAddr(request):
	if request.method == 'GET':
		addr = {}
		addr["succes"] = "webSocketAddr"
		addr["addresse"] = serverAddr
		addr["wsport"] = wsPort
		print addr
		return HttpResponse(json.dumps(addr), content_type = "application/json")
	else:
		raise PermissionDenied

def get_all_match(request):
	if request.method == 'GET':

		try:
			match_list = {}
			match_list["succes"] = "match_list"
			match_list["list"] = []
			bdd_list = match.objects.all()
			for each_match in bdd_list:
				match_data = {}
				match_data["id"] = each_match.id
				match_data["name"] = each_match.name
				match_data["game_type"] = each_match.game_type
				match_data["status"] =  each_match.status
				match_list["list"].append(match_data)
		except:
			match_list = {}
			match_list["erreur"] = "erreur du chargment de la liste des matchs."

		return HttpResponse(json.dumps(match_list), content_type = "application/json")
	else:
		raise PermissionDenied

def creat_match(request):
	if request.method == 'POST':
		try:
			new_match = json.loads(request.body)
			match_name = new_match["name"]
			match_game = new_match["game_type"]
		except:
			resp["erreur"] = "bad format json"
			return HttpResponse(json.dumps(resp), content_type = "application/json")

		try:
			new_match_reccord = match()
			new_match_reccord.name = match_name
			new_match_reccord.game_type = match_game
			new_match_reccord.status = "starting"
			new_match_reccord.save()
			resp["succes"] = "match_cree"
			return HttpResponse(json.dumps(resp), content_type = "application/json")
		except:
			resp["erreur"] = "erreur lors de la creation de la partie"
			return HttpResponse(json.dumps(resp), content_type = "application/json")

	else:
		raise PermissionDenied
