export default class ShipmentAddClass {
  name: string = "";
  order_date: string = "";
  pickup_date: string = "";
  price: string = "";
  from_country_code: string = "";
  to_country_code: string = "";

  getConstructorFor(): any | null {
    return ShipmentAddClass;
  }

  clone(): ShipmentAddClass {
    const newShipmentClass = new ShipmentAddClass();
    newShipmentClass.setValues(this);
    return newShipmentClass;
  }

  setValues(shipmentAddClass: ShipmentAddClass) {
    this.name = shipmentAddClass.name;
    this.order_date = shipmentAddClass.order_date;
    this.pickup_date = shipmentAddClass.pickup_date;
    this.price = shipmentAddClass.price;
    this.from_country_code = shipmentAddClass.from_country_code;
    this.to_country_code = shipmentAddClass.to_country_code;
  }
}
