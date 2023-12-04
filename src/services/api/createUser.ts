import { ServerDefaultResponse, baseApiUrl } from "./config";
import { User } from "./signInUser";

export interface CreateUser {
  name?: string | null;
  email?: string | null;
  password?: string | null;
  image?: string | null;
}

export const createUser = async (user: CreateUser) => {
  const response = await fetch(`${baseApiUrl}/api/user/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data: ServerDefaultResponse<User> = await response.json();
  return data;
};
