import HTTPClient from "../HTTPClient";

export default class Bookings {
  static create(payload) {
    return HTTPClient.post("/hotel-bookings", payload);
  }

  static update(id, payload) {
    return HTTPClient.put(`/hotel-bookings/${id}`, payload);
  }

  static delete(id) {
    return HTTPClient.delete(`/hotel-bookings/${id}`);
  }
}
