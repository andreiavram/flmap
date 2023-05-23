from django.contrib import admin
from leaflet.admin import LeafletGeoAdmin

from gulguta.models import EventInstance, EventCategory


# Register your models here.


@admin.register(EventInstance)
class EventInstanceAdmin(LeafletGeoAdmin):
    list_display = ["title", "start_time", "end_time", "category", "location_description"]
    list_filter = ["category", "start_time"]
    ordering = ["-start_time"]


@admin.register(EventCategory)
class EventCategoryAdmin(admin.ModelAdmin):
    list_display = ["name"]

