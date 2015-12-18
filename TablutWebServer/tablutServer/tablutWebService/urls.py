#-*- coding: utf-8 -*
from django.conf.urls import patterns, url


urlpatterns = patterns('tablutWebService.views',
	url(r'^test1$', 'testbase'),
	url(r'^test2/(?P<var1>\d+)/(?P<vartest>\d+)/$', 'testtemplate'),
	url(r'^connexion', 'user_connexion'),
	url(r'^logout', 'user_logout'),
	url(r'^newuser', 'new_user'),
	url(r'^getWebSocketAddr', 'return_webSocketAddr'),
)