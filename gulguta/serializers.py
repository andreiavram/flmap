from rest_framework.serializers import ModelSerializer

from gulguta.models import Gulguta


class GulgutaSerializer(ModelSerializer):
    class Meta:
        model = Gulguta
        fields = ['name', 'geo_long', 'geo_lat', 'photo']

