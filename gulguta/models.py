from django.db import models


class Gulguta(models.Model):
    name = models.CharField(max_length=255)
    geo_long = models.FloatField()
    geo_lat = models.FloatField()
    message = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now=True)
    photo = models.ImageField(upload_to="gulgute")

    def __str__(self):
        return self.name