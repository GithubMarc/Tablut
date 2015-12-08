#-*- coding: utf-8 -*-
import json
from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def testbase(request):
	text = json.dumps({"toto":"tata","id":1})
	return HttpResponse(text, content_type = "application/json")

def testtemplate(request, var1, vartest):
	total = int(var1) + int(vartest)

	# Retourne nombre1, nombre2 et la somme des deux au tpl
	return render(request, 'tablutWebService/testtemplate.html', locals())