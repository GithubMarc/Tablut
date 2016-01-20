#-*- coding: utf-8 -*
from django.conf.urls import patterns, url


urlpatterns = patterns('tablutWebService.views',
	url(r'^test1$', 'testbase'),
	url(r'^test2/(?P<var1>\d+)/(?P<vartest>\d+)/$', 'testtemplate'),
	url(r'^connexion', 'user_connexion'),
	url(r'^logout', 'user_logout'),
	url(r'^newuser', 'new_user'),
	url(r'^getWebSocketAddr', 'return_webSocketAddr'),
	url(r'^allMatch', 'get_all_match'),
	url(r'^newMatch', 'creat_match'),
	url(r'^match/(?P<idPartie>[0-9]+)', 'get_match_by_id'),
	url(r'^updateMatch', 'update_match'),
	url(r'^reset/(?P<idPartie>[0-9]+)', 'reset_match'),
)