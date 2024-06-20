import React, {
  useEffect,
  FunctionComponent,
  useState,
  ChangeEvent,
} from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import { addShipment } from "../services/apiSource";
import ShipmentAddClass from "./data/ShipmentAddClass";
import { LINK_PATHS } from "../constants/paths";
import { getCountries } from "../services/countries";

interface ShipmentAddFormProps {}

const ShipmentAddForm: FunctionComponent<ShipmentAddFormProps> = (
  props: ShipmentAddFormProps
): JSX.Element => {
  const [error, setError] = useState<string | undefined>("");
  const navigate = useNavigate();
  const [fromCountryID, setFromCountryID] = useState<number>(0);
  const [toCountryID, setToCountryID] = useState<number>(0);
  const [countryOptions, setCountryOptions] = useState<any>([]);

  useEffect(() => {
    let options = [];
    const countries: { [code: string]: string | undefined } = getCountries();
    for (let [key, value] of Object.entries(countries)) {
      options.push(<option key={key}>{value}</option>);
    }

    setCountryOptions(options);
  }, []);

  const shipmentAddForm = useFormik({
    initialValues: {
      name: "",
      order_date: "",
      pickup_date: "",
      price: "",
      from_country_code: "",
      to_country_code: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required().max(20, "Must be at most 20 symbols"),
      order_date: Yup.date().nullable(),
      pickup_date: Yup.date().nullable(),
      price: Yup.number().required(),
    }),
    onSubmit: async (values) => {
      const newShipment: ShipmentAddClass = new ShipmentAddClass();
      newShipment.name = values.name.trim();
      newShipment.order_date = values.order_date;
      newShipment.pickup_date = values.pickup_date;
      newShipment.price = values.price;
      newShipment.from_country_code = countryOptions[fromCountryID].key;
      newShipment.to_country_code = countryOptions[toCountryID].key;

      addShipment(newShipment)
        .then((addedShipment: any) => {
          navigate(`${LINK_PATHS.shipments}/${addedShipment.data.id}`);
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    shipmentAddForm.handleChange(e);
  };

  const handleSelectFromCountry = (option: any) => {
    setFromCountryID(option.target.selectedIndex - 1);
    shipmentAddForm.handleChange(option);
  };

  const handleSelectToCountry = (option: any) => {
    // - 1 is because there is already disabled field set in the select field
    setToCountryID(option.target.selectedIndex - 1);
    shipmentAddForm.handleChange(option);
  };

  return (
    <Form onSubmit={shipmentAddForm.handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="name">
          <Form.Label>Shipment name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Shipment name"
            onChange={handleChange}
            value={shipmentAddForm.values.name}
            isInvalid={!!shipmentAddForm.errors?.name}
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Price"
            onChange={handleChange}
            value={shipmentAddForm.values.price}
            isInvalid={!!shipmentAddForm.errors?.price}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="order_date">
          <Form.Label>Order date</Form.Label>
          <Form.Control
            required
            type="date"
            placeholder="Orded date"
            onChange={handleChange}
            value={shipmentAddForm.values.order_date}
            isInvalid={!!shipmentAddForm.errors?.order_date}
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="pickup_date">
          <Form.Label>Pickup date</Form.Label>
          <Form.Control
            required
            type="date"
            placeholder="Pickup date"
            onChange={handleChange}
            value={shipmentAddForm.values.pickup_date}
            isInvalid={!!shipmentAddForm.errors?.pickup_date}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="from_country_code">
          <Form.Label>From country code</Form.Label>
          <Form.Select
            required
            onChange={(option) => {
              handleSelectFromCountry(option);
            }}
            value={shipmentAddForm.values.from_country_code}
            aria-label="Select from country"
          >
            <option disabled>Select from country</option>
            {countryOptions}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="to_country_code">
          <Form.Label>To country code</Form.Label>
          <Form.Select
            required
            onChange={(option) => {
              handleSelectToCountry(option);
            }}
            value={shipmentAddForm.values.to_country_code}
            aria-label="Select to country"
          >
            <option disabled>Select to country</option>
            {countryOptions}
          </Form.Select>
        </Form.Group>
      </Row>
      <Button type="submit" variant="primary" size="lg">
        Add
      </Button>
      {error !== "" && error !== undefined ? (
        <Alert className="mt-3">
          <b>{error}</b>
        </Alert>
      ) : null}
    </Form>
  );
};

export default ShipmentAddForm;
