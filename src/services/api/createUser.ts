import { User } from "next-auth";

export const createUser = async (user: User) => {
  const response = await fetch("http://localhost:3333/api/user/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  return data;
};
