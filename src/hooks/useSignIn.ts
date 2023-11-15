import { signIn } from "next-auth/react";
import { useState } from "react";

export const useSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      password,
      email,
    };

    signIn("credentials", {
      ...body,
      redirect: false,
      action: "sign-in",
    });
  };

  return {
    handleSignIn,
    email,
    setEmail,
    password,
    setPassword,
  };
};
