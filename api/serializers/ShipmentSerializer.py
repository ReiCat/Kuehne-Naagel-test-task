from rest_framework.serializers import ModelSerializer

from api.models import Shipment


class ShipmentSerializer(ModelSerializer):
    class Meta:
        model = Shipment
        fields = '__all__'
