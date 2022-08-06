import { Injectable } from '@nestjs/common';
import { HttpAdapter } from '../../interfaces/http-adapter.interface';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class DataService implements HttpAdapter {
  private readonly axios: AxiosInstance = axios;
  async get<T>(url: string): Promise<T> {
    const resp = await this.axios.get<T>(url);
    return resp.data;
  }
}
