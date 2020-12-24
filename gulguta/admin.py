from django.contrib import admin

# Register your models here.
from gulguta.models import Gulguta


class GulgutaAdmin(admin.ModelAdmin):
    pass


admin.site.register(Gulguta, GulgutaAdmin)