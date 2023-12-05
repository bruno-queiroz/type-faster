import { baseApiUrl } from "./config";

export const spinUpServer = async () => {
  await fetch(`${baseApiUrl}/api/spin-up`);
  console.log("server spun up");
};
