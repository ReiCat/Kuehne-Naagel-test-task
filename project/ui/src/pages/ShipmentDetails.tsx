import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";

import NavBar from "../components/NavBar";
import { LINK_PATHS } from "../constants/paths";
import { fetchShipment } from "../services/apiSource";
import ShipmentClass from "../components/data/ShipmentClass";
import { getCountries } from "../services/countries";

interface ShipmentDetailsProps {}

const ShipmentDetails: React.FC<ShipmentDetailsProps> = (
  props: ShipmentDetailsProps
): JSX.Element => {
  let { shipmentID } = useParams();
  const [error, setError] = useState<string | undefined>("");

  const [shipment, setShipment] = useState<ShipmentClass | undefined>();
  const [countries, setCountries] = useState<{
    [code: string]: string | undefined;
  }>({});

  useEffect(() => {
    fetchShipment(Number(shipmentID))
      .then((shipmentEntry) => {
        setShipment(shipmentEntry);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    const countries: { [code: string]: string | undefined } = getCountries();
    setCountries(countries);
  }, []);

  const updateShipmentValues = (updatedShipment: ShipmentClass) => {
    return setShipment(updatedShipment);
  };

  return (
    <Container>
      <NavBar active={LINK_PATHS.shipmentDetails} />
      {shipment !== undefined ? (
        <Table className="mt-3" striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Shipment Name</th>
              <th>Order date</th>
              <th>Pickup date</th>
              <th>Price</th>
              <th>Country from</th>
              <th>Country to</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{shipment.id}</td>
              <td>{shipment.name}</td>
              <td>{shipment.order_date}</td>
              <td>{shipment.pickup_date}</td>
              <td>{shipment.price}</td>
              <td>{countries[shipment.from_country_code]}</td>
              <td>{countries[shipment.to_country_code]}</td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <Alert className="mt-3">
          <b>No shipment found</b>
        </Alert>
      )}

      {error !== "" && error !== undefined ? (
        <Alert className="mt-3">
          <b>{error}</b>
        </Alert>
      ) : null}
    </Container>
  );
};

export default ShipmentDetails;
