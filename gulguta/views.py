from django.shortcuts import render

# Create your views here.
from django.views.generic import TemplateView
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet

from gulguta.models import Gulguta
from gulguta.serializers import GulgutaSerializer


class MapTemplateView(TemplateView):
    template_name = "index.html"


class GulgutaViewSet(ModelViewSet):
    queryset = Gulguta.objects.all()
    serializer_class = GulgutaSerializer
    permission_classes = [AllowAny, ]