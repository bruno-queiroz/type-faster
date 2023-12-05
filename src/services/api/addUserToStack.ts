import { deployUrl } from "./config";
import { CreateUser } from "./createUser";

export const addUserToStack = async (user: CreateUser) => {
  await fetch(`${deployUrl}/api/user`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
};
