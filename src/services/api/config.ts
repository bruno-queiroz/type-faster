export interface ServerDefaultResponse<T> {
  data: T;
  isOk: boolean;
  message: string;
}
