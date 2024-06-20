from django.db import models


class Shipment(models.Model):
    name = models.CharField(max_length=20)
    order_date = models.DateField()
    pickup_date = models.DateField()
    price = models.IntegerField()
    from_country_code = models.CharField(max_length=2)
    to_country_code = models.CharField(max_length=2)
