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
def testbase(request, toto):
	if 0 != False:
		print False

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
			match_list["liste"] = []
			bdd_list = match.objects.exclude(status = "end")
			for each_match in bdd_list:
				match_data = {}
				match_data["idPartie"] = each_match.id
				match_data["nom"] = each_match.name
				match_data["typeJeu"] = each_match.game_type.label
				match_data["statutPartie"] =  each_match.status

				try:
					file_reccord = open("tablutWebService/board/board_game"+ str(each_match.id) +".json", "r")
					board = json.load(file_reccord)
					file_reccord.close()
				except:
					board = {}
					board["plateau"] = []

				match_data["plateau"] = board["plateau"]

				match_list["liste"].append(match_data)
		except:
			match_list = {}
			match_list["erreur"] = "erreur du chargment de la liste des matchs."

		return HttpResponse(json.dumps(match_list), content_type = "application/json")
	else:
		raise PermissionDenied

def get_match_by_id(request, idPartie):
	if request.method == 'GET':
		resp = {}
		board_file = open("tablutWebService/board/board_game"+ idPartie +".json", "r")
		board = json.load(board_file)
		board_file.close()
		match_init = match.objects.get(id = int(idPartie))
		resp["init"] = {}
		resp_init = {}
		resp_init["statutPartie"] = match_init.status
		resp_init["tour"] = match_init.player_turn
		resp_init["idPartie"] = int(idPartie)
		resp_init["plateau"] = board["plateau"]
		resp["init"] = resp_init
		return HttpResponse(json.dumps(resp), content_type = "application/json")

	else:
		raise PermissionDenied

def get_match_name(request, idPartie):
	if request.method == 'GET':
		resp = {}
		match_init = match.objects.get(id = int(idPartie))
		resp["nomMatch"] = {}
		resp_name = {}
		resp_name["typeMatch"] = match_init.game_type.label
		resp_name["nom"] = match_init.name
		resp_name["idPartie"] = idPartie
		resp["nomMatch"] = resp_name
		return HttpResponse(json.dumps(resp), content_type = "application/json")
	else:
		raise PermissionDenied


def reset_match(request, idPartie):
	if request.method == 'GET':
		resp = {}
		resp["send"] = {}
		resp["send"]["init"] = {}
		resp["send"]["init"]["idPartie"] = idPartie
		resp["send"]["init"]["plateau"] = [None,None,None,"black","black","black",None,None,None,None,None,None,None,"black",None,None,None,None,None,None,None,None,"red",None,None,None,None,"black",None,None,None,"red",None,None,None,"black","black","black","red","red","king","red","red","black","black","black",None,None,None,"red",None,None,None,"black",None,None,None,None,"red",None,None,None,None,None,None,None,None,"black",None,None,None,None,None,None,None,"black","black","black",None,None,None]
		file_reccord = open("tablutWebService/board/board_game"+ idPartie +".json", "w")
		file_reccord.write(json.dumps({"plateau":[None,None,None,"black","black","black",None,None,None,None,None,None,None,"black",None,None,None,None,None,None,None,None,"red",None,None,None,None,"black",None,None,None,"red",None,None,None,"black","black","black","red","red","king","red","red","black","black","black",None,None,None,"red",None,None,None,"black",None,None,None,None,"red",None,None,None,None,None,None,None,None,"black",None,None,None,None,None,None,None,"black","black","black",None,None,None]}))
		file_reccord.close()
		match_to_reset = match.objects.get(id = idPartie)
		resp["send"]["init"]["statutPartie"] = "starting"
		match_to_reset.status = "starting"
		resp["send"]["init"]["tour"] = "black"
		match_to_reset.player_turn = "black"
		match_to_reset.save()
		resp["succes"] = "reset"
	else:
		raise PermissionDenied
	return HttpResponse(json.dumps(resp), content_type = "application/json")

def reset_match1(request, idPartie):
	#TODO
	if request.method == 'GET':
		file_reccord = open("tablutWebService/board/board_game1.json", "w")
		file_reccord.write(json.dumps({"plateau":[None,None,None,"black","black","black",None,None,None,None,None,None,None,"black",None,None,None,None,None,None,None,None,"red",None,None,None,None,"black",None,None,None,"red",None,None,None,"black","black","black","red","red","king","red","red","black","black","black",None,None,None,"red",None,None,None,"black",None,None,None,None,"red",None,None,None,None,None,None,None,None,"black",None,None,None,None,None,None,None,"black","black","black",None,None,None]}))
		file_reccord.close()
		match_to_reset = match.objects.get(id = idPartie)
		match_to_reset.status = "starting"
		match_to_reset.player_turn = "black"
		match_to_reset.save()
	else:
		raise PermissionDenied

def creat_match(request, idPartie = False):
	if request.method == 'POST':
		try:
			new_match = json.loads(request.body)
			match_name = new_match["name"]
			match_game = new_match["game_type"]
		except:
			resp = {}
			resp["erreur"] = "bad format json"
			return HttpResponse(json.dumps(resp), content_type = "application/json")
		try:
			resp = {}
			match_reccord = match()
			print "match"
			match_reccord.name = match_name
			print "name"
			match_reccord.game_type = game_type.objects.get(label = match_game)
			print "games"
			match_reccord.status = "starting"
			print "status"
			if match_game == "Tablut":
				match_reccord.player_turn = "black"
				match_reccord.save()
				file_reccord = open("tablutWebService/board/board_game"+str(match_reccord.id)+".json", "w")
				file_reccord.write(json.dumps({"plateau":[None,None,None,"black","black","black",None,None,None,None,None,None,None,"black",None,None,None,None,None,None,None,None,"red",None,None,None,None,"black",None,None,None,"red",None,None,None,"black","black","black","red","red","king","red","red","black","black","black",None,None,None,"red",None,None,None,"black",None,None,None,None,"red",None,None,None,None,None,None,None,None,"black",None,None,None,None,None,None,None,"black","black","black",None,None,None]}))
				file_reccord.close()

				if(idPartie != False):
					resp["send"] = {}
					resp["send"]["init"] = {}
					resp["send"]["init"]["plateau"] = [None,None,None,"black","black","black",None,None,None,None,None,None,None,"black",None,None,None,None,None,None,None,None,"red",None,None,None,None,"black",None,None,None,"red",None,None,None,"black","black","black","red","red","king","red","red","black","black","black",None,None,None,"red",None,None,None,"black",None,None,None,None,"red",None,None,None,None,None,None,None,None,"black",None,None,None,None,None,None,None,"black","black","black",None,None,None]
					resp["send"]["init"]["idPartie"] = match_reccord.id
					resp["send"]["init"]["statutPartie"] = "starting"
					resp["send"]["init"]["tour"] = "black"
				else:
					resp["idPartie"] = match_reccord.id
				
				resp["succes"] = "match_cree"
			else:
				resp["erreur"] = "le jeu souhaite n'existe pas"

			return HttpResponse(json.dumps(resp), content_type = "application/json")

		except:
			resp["erreur"] = "erreur lors de la creation de la partie"
			return HttpResponse(json.dumps(resp), content_type = "application/json")
	else:
		raise PermissionDenied

def update_match(request):
	if request.method == 'POST':
		try:
			action = json.loads(request.body)
		except:
			resp["erreur"] = "bad format json"
			return HttpResponse(json.dumps(resp), content_type = "application/json")
		resp = {}
		if 'mouvement' in action.keys():
			move = action["mouvement"]
			file_reccord = open("tablutWebService/board/board_game"+str(move["idPartie"])+".json", "r+")
			board = json.load(file_reccord)
			file_reccord.seek(0)
			file_reccord.truncate()
			boardCopy = board["plateau"][:]
			board["plateau"][move["arrivee"]] = boardCopy[move["depart"]]
			board["plateau"][move["depart"]] = None
			file_reccord.write(json.dumps(board))
			file_reccord.close()

			match_to_update = match.objects.get(id = move["idPartie"])
			if match_to_update.game_type.label == "Tablut":
				if match_to_update.player_turn == "red":
					match_to_update.player_turn = "black"
					match_to_update.save()
				else:
					match_to_update.player_turn = "red"
					match_to_update.save()

		elif 'capture' in action.keys():
			cap = action["capture"]
			file_reccord = open("tablutWebService/board/board_game"+str(cap["idPartie"])+".json", "r+")
			board = json.load(file_reccord)
			file_reccord.seek(0)
			file_reccord.truncate()
			board["plateau"][cap["index"]] = None
			file_reccord.write(json.dumps(board))
			file_reccord.close()

		elif 'win' in action.keys():
			win = action["win"]
			print win
			match_to_update = match.objects.get(id = win["idPartie"])
			match_to_update.status = win["statutPartie"]
			match_to_update.player_turn = win["equipe"]
			match_to_update.save()

		elif 'pause' in action.keys():
			pause = action["pause"]
			match_to_update = match.objects.get(id = pause["idPartie"])
			match_to_update.status = pause["statutPartie"]
			match_to_update.save()

		elif 'resume' in action.keys():
			resume = action["resume"]
			match_to_update = match.objects.get(id = resume["idPartie"])
			match_to_update.status = resume["statutPartie"]
			match_to_update.save()

		elif 'quit' in action.keys():
			quit = action["quit"]
			match_to_update = match.objects.get(id = quit["idPartie"])
			match_to_update.status = quit["statutPartie"]
			match_reccord.player_turn = None
			match_to_update.save()

		elif 'start' in action.keys():
			start = action["start"]
			match_to_update = match.objects.get(id = start["idPartie"])
			match_to_update.status = start["statutPartie"]
			match_to_update.save()

		else:
			resp["erreur"] = "ordre non existant"		
			return HttpResponse(json.dumps(resp), content_type = "application/json")

		resp["succes"] = "match_update"		
		return HttpResponse(json.dumps(resp), content_type = "application/json")

	else:
		raise PermissionDenied