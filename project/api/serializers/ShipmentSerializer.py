from rest_framework.serializers import ModelSerializer

from project.api.models import Shipment


class ShipmentSerializer(ModelSerializer):
    class Meta:
        model = Shipment
        fields = [
            'id',
            'name', 
            'order_date', 
            'pickup_date', 
            'price',
            'from_country_code',
            'to_country_code'
        ]
