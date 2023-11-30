export class Response_DTO<T> {
  status: number;
  message: string;
  data?: T | null;
  founded?: boolean;
}
