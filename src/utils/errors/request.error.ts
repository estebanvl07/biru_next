export class RequestError extends Error {
  code: string;
  status: number;

  constructor({
    message,
    code,
    status,
  }: {
    message: string;
    code: string;
    status: number;
  }) {
    super(message);
    this.code = code;
    this.status = status;
    this.name = "RequestError";
  }
}
