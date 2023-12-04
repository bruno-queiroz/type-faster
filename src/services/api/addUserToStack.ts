import { baseApiUrl } from "./config";
import { CreateUser } from "./createUser";

export const addUserToStack = async (user: CreateUser) => {
  await fetch(`http://localhost:3000/api/user`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
};
