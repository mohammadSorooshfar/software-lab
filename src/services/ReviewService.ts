import type { AxiosInstance } from "axios";
import { Api } from "../api/api";

export class ReviewService {
  private api: AxiosInstance;
  constructor() {
    this.api = Api.getInstance();
  }

  public add(offer_id: number, status: number, description: string) {
    let token = "";
    if (typeof window != "undefined") {
      token = localStorage.getItem("token") || "";
    }
    const body: any = {
      offer_id,
      status,
      description,
    };
    return this.api
      .post<any>("/review", body, {
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
  public get(count: number) {
    let token = "";
    if (typeof window != "undefined") {
      token = localStorage.getItem("token") || "";
    }
    const body: any = {
      count,
    };
    return this.api
      .post<any>("/pending-offers", body, {
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
