# from django.shortcuts import render
from rest_framework import viewsets

from api.models import Shipment
from api.serializers.ShipmentSerializer import ShipmentSerializer


class ShipmentViewSet(viewsets.ModelViewSet):
    queryset = Shipment.objects.all()
    serializer_class = ShipmentSerializer
    