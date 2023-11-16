import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalidCredentialsOpen, setIsInvalidCredentialsOpen] =
    useState(false);

  const router = useRouter();

  const handleSignInWithCredentials = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
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
      return;
    }

    setIsInvalidCredentialsOpen(true);
  };

  return {
    handleSignInWithCredentials,
    email,
    setEmail,
    password,
    setPassword,
    isInvalidCredentialsOpen,
    setIsInvalidCredentialsOpen,
  };
};
