export default class ShipmentEditClass {
  id: number = 0;
  name: string = "";
  order_date: string = "";
  pickup_date: string = "";
  price: number = 0;
  from_country_code: string = "";
  to_country_code: string = "";

  getConstructorFor(): any | null {
    return ShipmentEditClass;
  }

  clone(): ShipmentEditClass {
    const newShipmentEditClass = new ShipmentEditClass();
    newShipmentEditClass.setValues(this);
    return newShipmentEditClass;
  }

  setValues(shipmentEditClass: ShipmentEditClass) {
    this.id = shipmentEditClass.id;
    this.name = shipmentEditClass.name;
    this.order_date = shipmentEditClass.order_date;
    this.pickup_date = shipmentEditClass.pickup_date;
    this.price = shipmentEditClass.price;
    this.from_country_code = shipmentEditClass.from_country_code;
    this.to_country_code = shipmentEditClass.to_country_code;
  }
}
