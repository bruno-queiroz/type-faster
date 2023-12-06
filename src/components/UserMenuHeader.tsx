"use client";
import { CreateUser, createUser } from "@/services/api/createUser";
import { spinUpServer } from "@/services/api/spinUpServer";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const UserMenuHeader = () => {
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      if (data.user?.name && data.user?.email) {
        (async () => await createUser(data.user as CreateUser))();
      }
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
