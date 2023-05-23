# Create your views here.
from django.views.generic import TemplateView


class MapTemplateView(TemplateView):
    template_name = "index.html"


class FormTemplateView(TemplateView):
    template_name = "form.html"


