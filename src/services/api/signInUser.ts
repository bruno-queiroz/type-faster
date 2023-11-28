import { ServerDefaultResponse, baseApiUrl } from "./config";

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
  const response = await fetch(`${baseApiUrl}/api/user/sign-in`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data: ServerDefaultResponse<User> = await response.json();
  return data;
};
