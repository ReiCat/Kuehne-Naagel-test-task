from django.forms.models import model_to_dict
from mixer.backend.django import Mixer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.test import APIClient, APITestCase

from project.api.models import Shipment


class ShipmentTestCase(APITestCase):
    def setUp(self) -> None:
        self.client = APIClient()
        self.mixer = Mixer(commit=False)

        self.datefmt = "%Y-%m-%d"

        return super().setUp()

    def tearDown(self) -> None:
        return super().tearDown()

    def test_get_shipments_returns_empty_list_in_case_if_no_records_found(self):
        resp = self.client.get("/api/shipments", format="json")

        self.assertTrue(isinstance(resp, Response))
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertTrue(isinstance(resp.data, list))
        self.assertEqual(len(resp.data), 0)

    def test_add_shipment_returns_error_in_case_of_wrong_data_specified(self):
        test_data = {
            "name": "",
            "order_date": "",
            "pickup_date": "",
            "price": "",
            "from_country_code": "",
            "to_country_code": "",
        }

        resp = self.client.post("/api/shipments", test_data, format="json")

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
        test_shipment_model = self.mixer.blend(Shipment)
        test_data = model_to_dict(test_shipment_model)

        resp = self.client.post("/api/shipments", test_data)
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)

        added_shipment = dict(resp.data)

        self.assertEqual(added_shipment["name"], test_data["name"])
        self.assertEqual(
            added_shipment["order_date"], test_data["order_date"].strftime(self.datefmt)
        )
        self.assertEqual(
            added_shipment["pickup_date"],
            test_data["pickup_date"].strftime(self.datefmt),
        )
        self.assertEqual(added_shipment["price"], test_data["price"])
        self.assertEqual(
            added_shipment["from_country_code"], test_data["from_country_code"]
        )
        self.assertEqual(
            added_shipment["to_country_code"], test_data["to_country_code"]
        )

        resp = self.client.get("/api/shipments", format="json")

        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data), 1)
        shipment = resp.data[0]
        self.assertEqual(shipment["name"], test_data["name"])
        self.assertEqual(
            shipment["order_date"], test_data["order_date"].strftime(self.datefmt)
        )
        self.assertEqual(
            shipment["pickup_date"], test_data["pickup_date"].strftime(self.datefmt)
        )
        self.assertEqual(shipment["price"], test_data["price"])
        self.assertEqual(shipment["from_country_code"], test_data["from_country_code"])
        self.assertEqual(shipment["to_country_code"], test_data["to_country_code"])

    def test_get_shipment_by_id_returns_not_found_in_case_of_shipment_by_id_does_not_exist(
        self,
    ):
        resp = self.client.get("/api/shipments/5", format="json")

        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(resp.data["detail"], "No Shipment matches the given query.")

    def test_get_shipment_by_id_returns_result_in_case_of_success(self):
        test_shipment_model = self.mixer.blend(Shipment)
        test_data = model_to_dict(test_shipment_model)

        resp = self.client.post("/api/shipments", test_data)
        added_shipment = dict(resp.data)

        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(added_shipment["name"], test_data["name"])
        self.assertEqual(
            added_shipment["order_date"], test_data["order_date"].strftime(self.datefmt)
        )
        self.assertEqual(
            added_shipment["pickup_date"],
            test_data["pickup_date"].strftime(self.datefmt),
        )
        self.assertEqual(added_shipment["price"], test_data["price"])
        self.assertEqual(
            added_shipment["from_country_code"], test_data["from_country_code"]
        )
        self.assertEqual(
            added_shipment["to_country_code"], test_data["to_country_code"]
        )

        resp = self.client.get(
            "/api/shipments/{shipment_id}".format(shipment_id=added_shipment["id"]),
            format="json",
        )

        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        shipment = resp.data
        self.assertEqual(shipment["name"], test_data["name"])
        self.assertEqual(
            shipment["order_date"], test_data["order_date"].strftime(self.datefmt)
        )
        self.assertEqual(
            shipment["pickup_date"], test_data["pickup_date"].strftime(self.datefmt)
        )
        self.assertEqual(shipment["price"], test_data["price"])
        self.assertEqual(shipment["from_country_code"], test_data["from_country_code"])
        self.assertEqual(shipment["to_country_code"], test_data["to_country_code"])

    def test_partial_update_shipment_returns_result_in_case_of_success(self):
        test_shipment_model = self.mixer.blend(Shipment)
        test_data = model_to_dict(test_shipment_model)

        resp = self.client.post("/api/shipments", test_data)
        added_shipment = dict(resp.data)

        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(added_shipment["name"], test_data["name"])
        self.assertEqual(
            added_shipment["order_date"], test_data["order_date"].strftime(self.datefmt)
        )
        self.assertEqual(
            added_shipment["pickup_date"],
            test_data["pickup_date"].strftime(self.datefmt),
        )
        self.assertEqual(added_shipment["price"], test_data["price"])
        self.assertEqual(
            added_shipment["from_country_code"], test_data["from_country_code"]
        )
        self.assertEqual(
            added_shipment["to_country_code"], test_data["to_country_code"]
        )

        new_test_data = {"name": "new name", "from_country_code": "NC"}

        resp = self.client.patch(
            "/api/shipments/{added_shipment_id}".format(
                added_shipment_id=added_shipment["id"]
            ),
            new_test_data,
        )
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

        updated_shipment = dict(resp.data)

        self.assertEqual(updated_shipment["name"], new_test_data["name"])
        self.assertNotEqual(test_data["name"], new_test_data["name"])
        self.assertEqual(
            updated_shipment["from_country_code"], new_test_data["from_country_code"]
        )
        self.assertNotEqual(
            test_data["from_country_code"], new_test_data["from_country_code"]
        )

    def test_update_shipment_returns_result_in_case_of_success(self):
        test_shipment_model = self.mixer.blend(Shipment)
        test_data = model_to_dict(test_shipment_model)

        resp = self.client.post("/api/shipments", test_data)
        added_shipment = dict(resp.data)

        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(added_shipment["name"], test_data["name"])
        self.assertEqual(
            added_shipment["order_date"], test_data["order_date"].strftime(self.datefmt)
        )
        self.assertEqual(
            added_shipment["pickup_date"],
            test_data["pickup_date"].strftime(self.datefmt),
        )
        self.assertEqual(added_shipment["price"], test_data["price"])
        self.assertEqual(
            added_shipment["from_country_code"], test_data["from_country_code"]
        )
        self.assertEqual(
            added_shipment["to_country_code"], test_data["to_country_code"]
        )

        new_test_shipment_model = self.mixer.blend(Shipment)
        new_test_data = model_to_dict(new_test_shipment_model)

        resp = self.client.put(
            "/api/shipments/{added_shipment_id}".format(
                added_shipment_id=added_shipment["id"]
            ),
            new_test_data,
        )
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

        updated_shipment = dict(resp.data)

        self.assertEqual(updated_shipment["name"], new_test_data["name"])
        self.assertEqual(
            updated_shipment["order_date"],
            new_test_data["order_date"].strftime(self.datefmt),
        )
        self.assertEqual(
            updated_shipment["pickup_date"],
            new_test_data["pickup_date"].strftime(self.datefmt),
        )
        self.assertEqual(updated_shipment["price"], new_test_data["price"])
        self.assertEqual(
            updated_shipment["from_country_code"], new_test_data["from_country_code"]
        )
        self.assertEqual(
            updated_shipment["to_country_code"], new_test_data["to_country_code"]
        )

    def test_delete_shipment_returns_result_in_case_of_success(self):
        test_shipment_model = self.mixer.blend(Shipment)
        test_data = model_to_dict(test_shipment_model)

        resp = self.client.post("/api/shipments", test_data)

        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)

        added_shipment = dict(resp.data)

        self.assertEqual(added_shipment["name"], test_data["name"])
        self.assertEqual(
            added_shipment["order_date"], test_data["order_date"].strftime(self.datefmt)
        )
        self.assertEqual(
            added_shipment["pickup_date"],
            test_data["pickup_date"].strftime(self.datefmt),
        )
        self.assertEqual(added_shipment["price"], test_data["price"])
        self.assertEqual(
            added_shipment["from_country_code"], test_data["from_country_code"]
        )
        self.assertEqual(
            added_shipment["to_country_code"], test_data["to_country_code"]
        )

        resp = self.client.delete(
            "/api/shipments/{added_shipment_id}".format(
                added_shipment_id=added_shipment["id"]
            )
        )

        self.assertEqual(resp.status_code, status.HTTP_204_NO_CONTENT)
