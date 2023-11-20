import { LoggingState } from "@/hooks/useSignIn";
import { BuiltInProviderType } from "next-auth/providers";
import { LiteralUnion } from "next-auth/react";

export const checkIfProviderIsLoading = (
  loggingState: LoggingState,
  provider: LiteralUnion<BuiltInProviderType>
) => {
  return loggingState.isLoading && loggingState.provider === provider;
};
