"use client";
import { createUser } from "@/services/api/createUser";
import { getUserFromStack } from "@/services/api/getUserFromStack";
import { spinUpServer } from "@/services/api/spinUpServer";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const UserMenuHeader = () => {
  const { data, status } = useSession();

  useEffect(() => {
    console.log("useEffect");
    if (status === "authenticated") {
      console.log("status", status);
      const addUser = async () => {
        const user = await getUserFromStack();
        console.log("user", user);
        if (user?.name && user.email) {
          const response = await createUser(user);
          console.log("user created!", response);
        }
      };

      addUser();
    }
  }, [status]);

  useEffect(() => {
    (async () => await spinUpServer())();
  }, []);

  return (
    <div className="flex flex-col p-4 pb-0">
      <span className="text-lg font-semibold">
        {data?.user?.name || "Guest"}
      </span>
      <span className="text-sm text-neutral-400">{data?.user?.email}</span>
    </div>
  );
};

export default UserMenuHeader;
