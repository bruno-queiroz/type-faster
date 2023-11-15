import { ServerDefaultResponse } from "./config";

interface UserSignInData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

export const signInUser = async (user: UserSignInData) => {
  const response = await fetch("http://localhost:3333/api/user/sign-in", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data: ServerDefaultResponse<User> = await response.json();
  return data;
};
