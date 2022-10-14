import { Codes, StatusCode } from './http-codes';

type Nullable = object | Array<object> | null;

export default class ServerResponse {
  private data: Nullable;
  private errors: Nullable;
  private message: string;

  constructor(data: Nullable, erros: Nullable, statusCode: StatusCode) {
    this.data = data;
    this.errors = erros;
    this.message = Codes[statusCode];
  }
}
