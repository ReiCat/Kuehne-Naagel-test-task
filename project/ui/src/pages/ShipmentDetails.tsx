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
import ShipmentEditForm from "../components/ShipmentEditForm";

interface ShipmentDetailsProps {}

const ShipmentDetails: React.FC<ShipmentDetailsProps> = (
  props: ShipmentDetailsProps
): JSX.Element => {
  const [show, setShow] = useState(false);
  let { shipmentID } = useParams();
  const [error, setError] = useState<string | undefined>("");

  const [shipment, setShipment] = useState<ShipmentClass>();
  const [countries, setCountries] = useState<{
    [code: string]: string | undefined;
  }>({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
              <th></th>
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
              <td>
                <div className="d-flex justify-content-end mt-3">
                  <Button variant="primary" onClick={handleShow}>
                    Edit shipment
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <Alert className="mt-3">
          <b>No shipment found</b>
        </Alert>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add shipment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShipmentEditForm shipment={shipment!}></ShipmentEditForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {error !== "" && error !== undefined ? (
        <Alert className="mt-3">
          <b>{error}</b>
        </Alert>
      ) : null}
    </Container>
  );
};

export default ShipmentDetails;
