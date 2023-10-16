import { StaticImageData } from "next/image";
import UserPicture from "./UserPicture";
import UserMenu from "./UserMenu";
import UserMenuHeader from "./UserMenuHeader";

export interface User {
  name: string;
  image: StaticImageData | string;
}

const UserButton = () => {
  return (
    <div className="w-[45px] h-[45px] rounded-full relative">
      <UserPicture />
      <UserMenu>
        <UserMenuHeader />
      </UserMenu>
    </div>
  );
};

export default UserButton;
