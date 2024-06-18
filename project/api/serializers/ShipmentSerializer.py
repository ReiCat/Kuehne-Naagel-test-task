from rest_framework.serializers import ModelSerializer

from project.api.models import Shipment


class ShipmentSerializer(ModelSerializer):
    class Meta:
        model = Shipment
        fields = '__all__'
