import { signIn } from "next-auth/react";
import { useState } from "react";

export const useSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      name,
      email,
      password,
    };

    signIn("credentials", {
      ...body,
      redirect: false,
      action: "sign-up",
    });
  };

  return {
    handleSignUp,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
  };
};
