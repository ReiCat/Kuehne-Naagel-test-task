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
import { updateShipment } from "../services/apiSource";
import ShipmentEditClass from "./data/ShipmentEditClass";
import { getCountries } from "../services/countries";
import { LINK_PATHS } from "../constants/paths";
import ShipmentClass from "./data/ShipmentClass";

interface ShipmentEditFormProps {
  shipment: ShipmentClass;
}

const ShipmentEditForm: FunctionComponent<ShipmentEditFormProps> = (
  props: ShipmentEditFormProps
): JSX.Element => {
  const [error, setError] = useState<string | undefined>("");
  const [fromCountryID, setFromCountryID] = useState<number>(0);
  const [toCountryID, setToCountryID] = useState<number>(0);
  const [countryOptions, setCountryOptions] = useState<any>([]);
  const navigate = useNavigate();
  const [countries, setCountries] = useState<{
    [code: string]: string | undefined;
  }>({});

  useEffect(() => {
    const countries: { [code: string]: string | undefined } = getCountries();
    setCountries(countries);
  }, []);

  useEffect(() => {
    let options = [];
    for (let [key, value] of Object.entries(countries)) {
      options.push(<option key={key}>{value}</option>);
    }

    setCountryOptions(options);
  }, [countries]);

  useEffect(() => {
    if (shipmentEditForm !== undefined) {
      shipmentEditForm.values.from_country_code =
        countries[props.shipment.from_country_code];
      shipmentEditForm.values.to_country_code =
        countries[props.shipment.to_country_code];
    }
  }, [countries]);

  const shipmentEditForm = useFormik({
    initialValues: {
      name: props.shipment.name,
      order_date: props.shipment.order_date,
      pickup_date: props.shipment.pickup_date,
      price: props.shipment.price,
      from_country_code: countries[props.shipment.from_country_code],
      to_country_code: countries[props.shipment.to_country_code],
    },
    validationSchema: Yup.object({
      name: Yup.string().required().max(20, "Must be at most 20 symbols"),
      order_date: Yup.date().nullable(),
      pickup_date: Yup.date().nullable(),
      price: Yup.number().required(),
    }),
    onSubmit: async (values) => {
      const newShipment: ShipmentEditClass = new ShipmentEditClass();
      newShipment.id = props.shipment.id;
      newShipment.name = values.name.trim();
      newShipment.order_date = values.order_date;
      newShipment.pickup_date = values.pickup_date;
      newShipment.price = Number(values.price);
      newShipment.from_country_code = countryOptions[fromCountryID].key;
      newShipment.to_country_code = countryOptions[toCountryID].key;

      updateShipment(newShipment.id, newShipment)
        .then((editedShipment: any) => {
          navigate(`${LINK_PATHS.homePage}`);
        })
        .catch((err) => {
          setError(err);
        });
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    shipmentEditForm.handleChange(e);
  };

  const handleSelectFromCountry = (option: any) => {
    setFromCountryID(option.target.selectedIndex - 1);
    shipmentEditForm.handleChange(option);
  };

  const handleSelectToCountry = (option: any) => {
    // - 1 is because there is already disabled field set in the select field
    setToCountryID(option.target.selectedIndex - 1);
    shipmentEditForm.handleChange(option);
  };

  return (
    <Form onSubmit={shipmentEditForm.handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="name">
          <Form.Label>Shipment name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Shipment name"
            onChange={handleChange}
            value={shipmentEditForm.values.name}
            isInvalid={!!shipmentEditForm.errors?.name}
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Price"
            onChange={handleChange}
            value={shipmentEditForm.values.price}
            isInvalid={!!shipmentEditForm.errors?.price}
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
            value={shipmentEditForm.values.order_date}
            isInvalid={!!shipmentEditForm.errors?.order_date}
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="pickup_date">
          <Form.Label>Pickup date</Form.Label>
          <Form.Control
            required
            type="date"
            placeholder="Pickup date"
            onChange={handleChange}
            value={shipmentEditForm.values.pickup_date}
            isInvalid={!!shipmentEditForm.errors?.pickup_date}
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
            value={shipmentEditForm.values.from_country_code}
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
            value={shipmentEditForm.values.to_country_code}
            aria-label="Select to country"
          >
            <option disabled>Select to country</option>
            {countryOptions}
          </Form.Select>
        </Form.Group>
      </Row>
      <Button type="submit" variant="primary" size="lg">
        Edit
      </Button>
      {error !== "" && error !== undefined ? (
        <Alert className="mt-3">
          <b>{error}</b>
        </Alert>
      ) : null}
    </Form>
  );
};

export default ShipmentEditForm;
