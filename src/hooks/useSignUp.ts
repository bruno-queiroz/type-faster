import { BuiltInProviderType } from "next-auth/providers";
import { LiteralUnion, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoggingState } from "./useSignIn";

export const useSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalidCredentialsOpen, setIsInvalidCredentialsOpen] =
    useState(false);
  const [loggingState, setLoggingState] = useState<LoggingState>({
    isLoading: false,
    provider: "",
  });

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

    setLoggingState({ isLoading: true, provider: "credentials" });
    const response = await signIn("credentials", {
      ...body,
      redirect: false,
      action: "sign-up",
    });
    setLoggingState({ isLoading: false, provider: "credentials" });

    if (response?.ok) {
      router.push("/");
      return;
    }

    setIsInvalidCredentialsOpen(true);
  };

  const handleSignUpWithProvider = async (
    provider: LiteralUnion<BuiltInProviderType>
  ) => {
    setLoggingState({ isLoading: true, provider });
    await signIn(provider, {
      callbackUrl: "/",
    });
    setLoggingState({ isLoading: false, provider });
  };

  return {
    handleSignUpWithCredentials,
    handleSignUpWithProvider,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    isInvalidCredentialsOpen,
    setIsInvalidCredentialsOpen,
    loggingState,
  };
};
