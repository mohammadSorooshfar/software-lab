import type { AxiosInstance } from "axios";
import { Api } from "../api/api";

export class OfferService {
  private api: AxiosInstance;
  constructor() {
    this.api = Api.getInstance();
  }

  public add(
    name: string,
    price: number,
    price_deal: boolean,
    image_urls: string[],
    isbn: number,
    publisher: string,
    edition: number,
    description: string
  ) {
    let token = "";
    if (typeof window != "undefined") {
      token = localStorage.getItem("token") || "";
    }
    const body: any = {
      name,
      price,
      price_deal,
      image_urls,
      isbn,
      publisher,
      edition,
      description,
    };
    return this.api
      .post<any>("/offers", body, {
        headers: {
          Authorization: `JWT ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        return response.data;
      });
  }
  public userOffer() {
    let token = "";
    if (typeof window != "undefined") {
      token = localStorage.getItem("token") || "";
    }
    const body: any = {
      count: 20,
    };
    return this.api
      .post<any>("/user-offers", body, {
        headers: {
          Authorization: `JWT ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        return response.data;
      });
  }
}
