import { BuiltInProviderType } from "next-auth/providers";
import { LiteralUnion, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LoggingState {
  isLoading: boolean;
  provider: LiteralUnion<BuiltInProviderType>;
}

export const useSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalidCredentialsOpen, setIsInvalidCredentialsOpen] =
    useState(false);
  const [loggingState, setLoggingState] = useState<LoggingState>({
    isLoading: false,
    provider: "",
  });

  const router = useRouter();

  const handleSignInWithCredentials = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const body = {
      password,
      email,
    };

    setLoggingState({ isLoading: true, provider: "credentials" });
    const response = await signIn("credentials", {
      ...body,
      redirect: false,
      action: "sign-in",
    });
    setLoggingState({ isLoading: false, provider: "credentials" });

    if (response?.ok) {
      router.push("/");
      return;
    }

    setIsInvalidCredentialsOpen(true);
  };

  const handleSignInWithProvider = async (
    provider: LiteralUnion<BuiltInProviderType>
  ) => {
    setLoggingState({ isLoading: true, provider });
    await signIn(provider, {
      callbackUrl: "/",
    });
    setLoggingState({ isLoading: false, provider });
  };

  return {
    handleSignInWithCredentials,
    handleSignInWithProvider,
    email,
    setEmail,
    password,
    setPassword,
    isInvalidCredentialsOpen,
    setIsInvalidCredentialsOpen,
    loggingState,
  };
};
