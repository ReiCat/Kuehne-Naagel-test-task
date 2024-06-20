import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";

import NavBar from "../components/NavBar";
import { LINK_PATHS } from "../constants/paths";
import ShipmentClass from "../components/data/ShipmentClass";
import { fetchShipments } from "../services/apiSource";
import ShipmentAddForm from "../components/ShipmentAddForm";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = (
  props: HomePageProps
): JSX.Element => {
  const [error, setError] = useState<string | undefined>("");
  const [show, setShow] = useState(false);
  const [shipments, setShipments] = useState<ShipmentClass[]>([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchShipments()
      .then((shipmentEntries) => {
        setShipments(shipmentEntries);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }, []);

  return (
    <Container>
      <NavBar active={LINK_PATHS.shipments} />

      <div className="d-flex justify-content-end mt-3">
        <Button variant="primary" onClick={handleShow}>
          Add shipment
        </Button>
      </div>

      {Array.isArray(shipments) && shipments.length > 0 ? (
        <Table className="mt-3" striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Shipment Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((shipment, index) => {
              return (
                <tr key={index}>
                  <td>{shipment.id}</td>
                  <td>{shipment.name}</td>
                  <td>
                    <LinkContainer
                      to={`${LINK_PATHS.shipments}/${shipment.id}`}
                    >
                      <Button>Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <Alert className="mt-3">
          <b>No shipments found</b>
        </Alert>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add shipment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShipmentAddForm />
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

export default HomePage;
