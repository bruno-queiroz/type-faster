"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import InvalidCredentials from "@/components/InvalidCredentials";
import SignWith from "@/components/SignWith";
import Spinner from "@/components/Spinner";
import Title from "@/components/Title";
import { useSignUp } from "@/hooks/useSignUp";
import { checkIfProviderIsLoading } from "@/utils/checkIfProviderIsLoading";

import Link from "next/link";

import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { SiGithub as GithubIcon } from "react-icons/si";

const Page = () => {
  const {
    handleSignUpWithCredentials,
    handleSignUpWithProvider,
    email,
    setEmail,
    name,
    setName,
    password,
    setPassword,
    isInvalidCredentialsOpen,
    setIsInvalidCredentialsOpen,
    loggingState,
  } = useSignUp();

  const isGoogleLoading = checkIfProviderIsLoading(loggingState, "google");
  const isGithubLoading = checkIfProviderIsLoading(loggingState, "github");
  const isCredentialsLoading = checkIfProviderIsLoading(
    loggingState,
    "credentials"
  );

  return (
    <section className="flex flex-col items-center p-4">
      <h1 className="mb-4">
        <Title>Sign Up</Title>
      </h1>

      <InvalidCredentials
        {...{ isInvalidCredentialsOpen, setIsInvalidCredentialsOpen }}
      />

      <div className="max-w-[400px] w-full">
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSignUpWithCredentials}
        >
          <Input
            labelText="Nickname"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <Input
            labelText="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <Input
            labelText="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <Button py="0.75rem">
            {isCredentialsLoading ? (
              <Spinner color="white" />
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
        <div className="flex flex-col gap-2 mt-4">
          <SignWith
            labelText={isGoogleLoading ? "" : "Sign up with Google"}
            onClick={() => handleSignUpWithProvider("google")}
          >
            {isGoogleLoading ? <Spinner /> : <GoogleIcon className="text-xl" />}
          </SignWith>

          <SignWith
            labelText={isGithubLoading ? "" : "Sign up with Github"}
            onClick={() => handleSignUpWithProvider("github")}
          >
            {isGithubLoading ? <Spinner /> : <GithubIcon className="text-xl" />}
          </SignWith>
        </div>
        <div className="flex flex-col items-center gap-2 text-neutral-700 mt-12">
          <span>Already have an account?</span>

          <Link
            href="/sign-in"
            className="flex justify-center py-2 px-4 rounded font-bold text-neutral-700 border-neutral-900 border-[2px] w-full"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Page;
