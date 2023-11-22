"use client";
import { useSession } from "next-auth/react";

const UserMenuHeader = () => {
  const { data } = useSession();

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
