import { createUser } from "@/services/api/createUser";
import NextAuth, { NextAuthOptions } from "next-auth";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { User, signInUser } from "@/services/api/signInUser";
import { ServerDefaultResponse } from "@/services/api/config";
import { addUserToStack } from "@/services/api/addUserToStack";

interface ExtendedCredentials {
  email: string;
  password: string;
  name?: string;
  action: "sign-in" | "sign-up";
  csrfToken: string;
  callbackUrl: string;
  json: boolean;
}
export const authOptions: NextAuthOptions = {
  pages: {
    error: "/sign-in",
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { name, email, password, action } =
          credentials as ExtendedCredentials;

        let response: null | ServerDefaultResponse<User> = null;
        if (action === "sign-up" && name) {
          response = await createUser({ name, email, password });
        } else if (action === "sign-in") {
          response = await signInUser({ email, password });
        }

        if (response?.isOk) {
          return response.data;
        } else {
          return null;
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, credentials }) {
      if (credentials) return true;
      await addUserToStack(user);

      return true;
    },
  },
};

export default NextAuth(authOptions);
