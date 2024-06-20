export default class ShipmentClass {
  id: number = 0;
  name: string = "";
  order_date: string = "";
  pickup_date: string = "";
  price: number = 0;
  from_country_code: string = "";
  to_country_code: string = "";

  getConstructorFor(): any | null {
    return ShipmentClass;
  }

  clone(): ShipmentClass {
    const newShipmentClass = new ShipmentClass();
    newShipmentClass.setValues(this);
    return newShipmentClass;
  }

  setValues(shipmentClass: ShipmentClass) {
    this.id = shipmentClass.id;
    this.name = shipmentClass.name;
    this.order_date = shipmentClass.order_date;
    this.pickup_date = shipmentClass.pickup_date;
    this.price = shipmentClass.price;
    this.from_country_code = shipmentClass.from_country_code;
    this.to_country_code = shipmentClass.to_country_code;
  }
}
