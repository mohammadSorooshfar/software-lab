// https://levelup.gitconnected.com/use-case-of-singleton-with-axios-and-typescript-da564e76296
import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
declare module "axios" {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export abstract class HttpClient {
  protected instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });
  }
}
