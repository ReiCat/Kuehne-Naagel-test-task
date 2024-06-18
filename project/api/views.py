from rest_framework import viewsets

from project.api.models import Shipment
from project.api.serializers.ShipmentSerializer import ShipmentSerializer


class ShipmentViewSet(viewsets.ModelViewSet):
    queryset = Shipment.objects.all()
    serializer_class = ShipmentSerializer
