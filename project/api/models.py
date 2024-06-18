from django.db import models


class Shipment(models.Model):
    name = models.CharField(max_length=20, blank=True, null=True)
    order_date = models.DateField(blank=True, null=True)
    pickup_date = models.DateField(blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)
    from_country_code = models.CharField(max_length=2, blank=True, null=True)
    to_country_code = models.CharField(max_length=2, blank=True, null=True)
