import { useDispatch } from "react-redux";
import { HttpClient } from "./httpClient";
import { setMessage } from "redux/apiMessage";
// import useApiResponseStore from "@/stores/apiResponse";
// import type { ITokenViewModel, ITokenInputModel } from "@/models/token.model";
// import { useUserStore } from "@/stores/user";

export class Api extends HttpClient {
  private static classInstance?: Api;

  private userStore: any;

  private constructor(noAuth?: boolean) {
    super("http://localhost:8080/api/v1/");

    // this.userStore = useUserStore();

    this._initializeRequestInterceptor(noAuth);
  }

  public static getInstance(noAuth?: boolean) {
    if (!this.classInstance) {
      this.classInstance = new Api(noAuth);
    }

    return this.classInstance.instance;
  }

  private _initializeRequestInterceptor = (noAuth?: boolean) => {
    this.instance.interceptors.request.use(
      async (config: any) => {
        let token = "";
        if (typeof window != "undefined") {
          token = localStorage.getItem("token") || "";
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async function (error) {
        const originalRequest = error.config;

        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry &&
          Api.classInstance
        ) {
          originalRequest._retry = true;
          let token: any | null = null;

          if (token) {
            Api.classInstance.instance.defaults.headers.common[
              "Authorization"
            ] = "Bearer " + token.access_token;

            return Api.classInstance.instance(originalRequest);
          }
        }

        return Promise.reject(error);
      }
    );
  };
}
