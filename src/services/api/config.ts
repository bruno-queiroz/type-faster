export interface ServerDefaultResponse<T> {
  data: T;
  isOk: boolean;
  message: string;
}

export const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;
