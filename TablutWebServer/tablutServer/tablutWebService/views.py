#-*- coding: utf-8 -*-
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, Http404
from django.shortcuts import render
from tablutWebService.models import *

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