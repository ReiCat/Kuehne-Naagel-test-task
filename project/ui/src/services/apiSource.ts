import * as Api from "./api-client";
import ShipmentClass from "../components/data/ShipmentClass";
import ShipmentAddClass from "../components/data/ShipmentAddClass";
import * as ApiPaths from "../constants/apiPaths";


export async function fetchShipments(): Promise<ShipmentClass[]> {
  return await Api.get(ApiPaths.PATH_SHIPMENTS, ShipmentClass);
};

export async function addShipment(newShipment: ShipmentAddClass): Promise<ShipmentClass> {
  return await Api.post<ShipmentAddClass>(ApiPaths.PATH_SHIPMENTS, newShipment);
};

export async function fetchShipment(shipment_id: number): Promise<ShipmentClass> {
  return await Api.get<ShipmentClass>(`${ApiPaths.PATH_SHIPMENTS}/${shipment_id}`);
};

export async function updateShipment(shipment_id: number, shipment: ShipmentClass): Promise<ShipmentClass> {
  return await Api.put<ShipmentClass>(`${ApiPaths.PATH_SHIPMENTS}/${shipment_id}`, shipment);
};

export async function deleteShipment(shipment_id: number): Promise<number> {
  return await Api.del<number>(`${ApiPaths.PATH_SHIPMENTS}/${shipment_id}`);
};
