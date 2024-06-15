from django.db import models


class Shipment(models.Model):
    name = models.CharField(max_length=20, blank=True, null=True)
    order_date = models.DateField(blank=True, null=True)
    gross_weight = models.IntegerField(blank=True, null=True)
    payweight = models.FloatField(blank=True, null=True)
    pickup_date = models.DateField(blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)
    from_country_code = models.CharField(max_length=2, blank=True, null=True)
    to_country_code = models.CharField(max_length=2, blank=True, null=True)
    from_city = models.CharField(max_length=30, blank=True, null=True)
    to_city = models.CharField(max_length=30, blank=True, null=True)
    delivery_date = models.DateField(blank=True, null=True)
    cust_no = models.CharField(max_length=20, blank=True, null=True)
    cust_name = models.CharField(max_length=50, blank=True, null=True)
