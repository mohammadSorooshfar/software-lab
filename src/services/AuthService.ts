import type { AxiosInstance } from "axios";
import { Api } from "../api/api";

export class AuthService {
  private api: AxiosInstance;
  constructor() {
    this.api = Api.getInstance(true);
  }

  public signUp(username: string, password: string, mobile_number: string) {
    const body: any = {
      username,
      password,
      mobile_number,
    };
    return this.api.post<any>("/auth/signup", body).then((response) => {
      return response.data;
    });
  }
  public loginIn(username: string, password: string) {
    const body: any = {
      username,
      password,
    };
    return this.api.post<any>("/auth/login", body).then((response) => {
      return response.data;
    });
  }
}
