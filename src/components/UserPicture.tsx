"use client";
import { useSession } from "next-auth/react";
import guestPicture from "../../public/guest.png";

import Image from "next/image";

const UserPicture = () => {
  const { data } = useSession();

  return (
    <Image
      src={data?.user?.image || guestPicture}
      width={45}
      height={45}
      alt="user profile picture"
      className="rounded-full"
    />
  );
};

export default UserPicture;
