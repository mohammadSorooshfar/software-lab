import type { AxiosInstance } from "axios";
import { Api } from "../api/api";

export class UserService {
  private api: AxiosInstance;
  constructor() {
    this.api = Api.getInstance(true);
  }

  public update(
    username: string,
    email: string,
    mobile_number: string,
    city: string
  ) {
    const body: any = {
      username,
      email,
      mobile_number,
      city,
    };
    let token = "";
    if (typeof window != "undefined") {
      token = localStorage.getItem("token") || "";
    }
    return this.api
      .post<any>("/users/update", body, {
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
  public get(id: number) {
    let token = "";
    if (typeof window != "undefined") {
      token = localStorage.getItem("token") || "";
    }
    const body: any = {
      id,
    };
    return this.api
      .post<any>("/user-info", body, {
        headers: {
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
