import HTTPClient from "../HTTPClient";

export default class Coupons {
  static fetchAll() {
    return HTTPClient.get("/coupons");
  }
  static fetchViaCode(action) {
    return HTTPClient.get(`/coupons?code=${action}`);
  }
}
