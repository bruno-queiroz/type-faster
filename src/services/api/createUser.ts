import { ServerDefaultResponse } from "./config";
import { User } from "./signInUser";

interface CreateUser {
  name: string;
  email: string;
  password?: string;
  image?: string;
}

export const createUser = async (user: CreateUser) => {
  const response = await fetch("http://localhost:3333/api/user/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data: ServerDefaultResponse<User> = await response.json();
  return data;
};
