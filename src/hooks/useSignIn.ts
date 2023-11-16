import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      password,
      email,
    };

    const response = await signIn("credentials", {
      ...body,
      redirect: false,
      action: "sign-in",
    });

    if (response?.ok) {
      router.push("/");
    }
  };

  return {
    handleSignIn,
    email,
    setEmail,
    password,
    setPassword,
  };
};
