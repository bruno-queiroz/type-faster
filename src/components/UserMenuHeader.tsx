import { getCurrentUser } from "../../lib/session";

const UserMenuHeader = async () => {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col p-4 pb-0">
      <span className="text-lg font-semibold">{user?.name || "Guest"}</span>
      <span className="text-sm text-neutral-400">{user?.email}</span>
    </div>
  );
};

export default UserMenuHeader;
