from django.contrib.auth import get_user_model
from django.db import models
from django.contrib.gis.db.models import PointField
from django.conf import settings

# class  Gulguta(models.Model):
#     name = models.CharField(max_length=255)
#     geo_long = models.FloatField()
#     geo_lat = models.FloatField()
#     message = models.TextField(null=True, blank=True)
#     created_at = models.DateTimeField(auto_now=True)
#     photo = models.ImageField(upload_to="gulgute")
#
#     def __str__(self):
#         return self.name


class EventCategory(models.Model):
    name = models.CharField(max_length=255)
    icon = models.ImageField(upload_to="icons")
    config = models.JSONField(default=dict, blank=True)
    active = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "Event categories"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.active:  # Ensure only one active EventCategory
            qs = EventCategory.objects.filter(active=True)
            if self.id:
                qs = qs.exclude(id=self.id)
            qs.update(active=False)
        super().save(*args, **kwargs)

    @classmethod
    def current(cls):
        return cls.objects.get(active=True)

class EventInstance(models.Model):
    title = models.CharField(max_length=255)
    category = models.ForeignKey(EventCategory, null=True, blank=True, on_delete=models.CASCADE)
    description = models.TextField(null=True, blank=True)
    location_description = models.CharField(max_length=1024, null=True, blank=True)
    location = PointField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    external_link = models.URLField(null=True, blank=True)
    photo = models.ImageField(upload_to="covers", null=True, blank=True)

    created_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(get_user_model(), null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.title
