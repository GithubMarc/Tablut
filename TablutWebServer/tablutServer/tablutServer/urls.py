#-*- coding: utf-8 -*-
from django.conf.urls import include, url
from tablutWebService import views


urlpatterns = [
	# Examples:
	#url(r'^$', 'crepes_bretonnes.views.home', name='home'),
	#url(r'^blog/', include('blog.urls')),
	url(r'^tablutWebService/', include('tablutWebService.urls')),
]