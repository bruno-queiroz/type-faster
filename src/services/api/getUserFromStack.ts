import { CreateUser } from "./createUser";

export const getUserFromStack = async () => {
  const response = await fetch(`http://localhost:3000/api/user`);
  const data: CreateUser | undefined = await response.json();
  return data;
};
