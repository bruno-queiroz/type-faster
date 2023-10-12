import { getCurrentUser } from "../../lib/session";
import guestPicture from "../../public/guest.png";

import Image from "next/image";

const UserPicture = async () => {
  const user = await getCurrentUser();

  return (
    <Image
      src={user?.image || guestPicture}
      width={45}
      height={45}
      alt="user profile picture"
      className="rounded-full"
    />
  );
};

export default UserPicture;
