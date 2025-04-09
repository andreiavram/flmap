from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.viewsets import ModelViewSet

from gulguta.models import EventInstance, EventCategory
from gulguta.serializers import EventInstanceSerializer


# class GulgutaViewSet(ModelViewSet):
#     queryset = Gulguta.objects.all()
#     serializer_class = GulgutaSerializer
#     permission_classes = [AllowAny, ]


class EventInstanceViewSet(ModelViewSet):
    queryset = EventInstance.objects.all()
    serializer_class = EventInstanceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, ]

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(category=EventCategory.current())
        return qs
