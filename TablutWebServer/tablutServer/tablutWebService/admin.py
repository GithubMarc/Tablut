from django.contrib import admin
from tablutWebService.models import game_type, player_type


# Register your models here.
class PlayerTypeAdmin(admin.ModelAdmin):
	list_display = ('label',)
	list_filter	= ('label',)
	#date_hierarchy = 'date'
	ordering = ('label', )
	search_fields = ('label',)

class GameTypeAdmin(admin.ModelAdmin):
	list_display = ('label',)
	list_filter	= ('label',)
	#date_hierarchy = 'date'
	ordering = ('label', )
	search_fields = ('label',)

admin.site.register(game_type, GameTypeAdmin)
admin.site.register(player_type, PlayerTypeAdmin)