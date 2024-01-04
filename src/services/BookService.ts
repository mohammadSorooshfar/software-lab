import type { AxiosInstance } from "axios";
import { Api } from "../api/api";

export class BookService {
  private api: AxiosInstance;
  constructor() {
    this.api = Api.getInstance();
  }

  public search(
    from_date?: number,
    to_date?: number,
    from_price?: number,
    to_price?: number,
    name?: string
  ) {
    let token = "";
    if (typeof window != "undefined") {
      token = localStorage.getItem("token") || "";
    }
    const body: any = {
      from_date: { seconds: from_date ? Math.round(from_date / 1000) : 0 },
      to_date: { seconds: to_date ? Math.round(to_date / 1000) : 0 },
      from_price: from_price || 0,
      to_price: to_price || 0,
      price_deal: 0,
      user_id: 0,
      name: name || "",
    };
    return this.api
      .post<any>("/books", body, {
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
  public info(id: number) {
    let token = "";
    if (typeof window != "undefined") {
      token = localStorage.getItem("token") || "";
    }
    const body: any = {
      id,
    };
    return this.api
      .post<any>("/books/info", body, {
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
