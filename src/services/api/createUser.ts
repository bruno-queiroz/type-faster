import { JWT } from "next-auth/jwt";

export const createUser = async (user: JWT) => {
  const response = await fetch("http://localhost:3333/api/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();

  return data;
};
