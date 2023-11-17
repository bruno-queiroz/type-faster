import { BuiltInProviderType } from "next-auth/providers";
import { LiteralUnion, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalidCredentialsOpen, setIsInvalidCredentialsOpen] =
    useState(false);

  const router = useRouter();

  const handleSignUpWithCredentials = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const body = {
      name,
      email,
      password,
    };

    const response = await signIn("credentials", {
      ...body,
      redirect: false,
      action: "sign-up",
    });

    if (response?.ok) {
      router.push("/");
      return;
    }

    setIsInvalidCredentialsOpen(true);
  };

  return {
    handleSignUpWithCredentials,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    isInvalidCredentialsOpen,
    setIsInvalidCredentialsOpen,
  };
};
