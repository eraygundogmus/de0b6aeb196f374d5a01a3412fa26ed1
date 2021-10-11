import HTTPClient from "../HTTPClient";

export default class Hotels {
  static fetchAll() {
    return HTTPClient.get("/hotels");
  }
  static fetchAllWithDetails() {
    return HTTPClient.get("hotel-details");
  }
}
