import ujson

from rest_framework import status
from rest_framework.test import APIClient, APITestCase


class AddShipmentRowTestCase(APITestCase):
    client = APIClient()

    def test_get_shipments_returns_error_in_case_if_no_records_found(self):
        # Act
        resp = self.client.get("/api/shipments/", format="json")

        # Assert
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

    def test_add_shipment_returns_error_in_case_of_wrong_data_arranged(self):
        # Arrange
        data = {
            "name": "",
            "order_date": "",
            "pickup_date": "",
            "price": "",
            "from_country_code": "",
            "to_country_code": "",
        }

        # Act
        resp = self.client.post("/api/shipments", data, format="json")

        # Assert
        self.assertEqual(resp.data["name"][0], "This field may not be blank.")
        self.assertEqual(
            resp.data["order_date"][0],
            "Date has wrong format. Use one of these formats instead: YYYY-MM-DD.",
        )
        self.assertEqual(
            resp.data["pickup_date"][0],
            "Date has wrong format. Use one of these formats instead: YYYY-MM-DD.",
        )
        self.assertEqual(resp.data["price"][0], "A valid integer is required.")
        self.assertEqual(
            resp.data["from_country_code"][0], "This field may not be blank."
        )
        self.assertEqual(
            resp.data["to_country_code"][0], "This field may not be blank."
        )
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_add_shipment_returns_result_in_case_of_success(self):
        # Arrange
        data = {
            "name": "asd",
            "order_date": "2024-12-12",
            "pickup_date": "2024-12-13",
            "price": 555,
            "from_country_code": "ET",
            "to_country_code": "ES",
        }

        # Act
        resp = self.client.post("/api/shipments", data)
        added_shipment = dict(resp.data)

        # Assert
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(added_shipment["name"], data["name"])
        self.assertEqual(added_shipment["order_date"], data["order_date"])
        self.assertEqual(added_shipment["pickup_date"], data["pickup_date"])
        self.assertEqual(added_shipment["price"], data["price"])
        self.assertEqual(added_shipment["from_country_code"], data["from_country_code"])
        self.assertEqual(added_shipment["to_country_code"], data["to_country_code"])

        resp = self.client.get("/api/shipments", format="json")

        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data), 1)
        shipment = resp.data[0]
        self.assertEqual(shipment["name"], data["name"])
        self.assertEqual(shipment["order_date"], data["order_date"])
        self.assertEqual(shipment["pickup_date"], data["pickup_date"])
        self.assertEqual(shipment["price"], data["price"])
        self.assertEqual(shipment["from_country_code"], data["from_country_code"])
        self.assertEqual(shipment["to_country_code"], data["to_country_code"])
