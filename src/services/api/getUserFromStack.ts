import { deployUrl } from "./config";
import { CreateUser } from "./createUser";

export const getUserFromStack = async () => {
  const response = await fetch(`${deployUrl}/api/user`);
  const data: CreateUser | undefined = await response.json();
  return data;
};
