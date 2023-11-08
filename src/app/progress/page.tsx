import ProgressChart from "@/components/ProgressChart";
import Title from "@/components/Title";
import { getProgress } from "@/services/api/getProgress";
import { getCurrentUser } from "../../../lib/session";

const Page = async () => {
  const user = await getCurrentUser();
  const { data } = await getProgress(user?.email || "");

  return (
    <section className="flex w-[85%] p-4 max-sm:w-full mx-auto flex-col items-center gap-4">
      <h1 className="mb-8">
        <Title>Progress</Title>
      </h1>

      <table className="w-full">
        <thead>
          <tr className="grid w-full rounded-t p-1 grid-cols-2 bg-neutral-900 text-white">
            <th>Overall Average CPM</th>
            <th>Overall Average Typos</th>
          </tr>
        </thead>
        <tbody>
          <tr className="grid grid-cols-2 place-items-center p-1 bg-gray-100">
            <td>{data?.overallAverageCpm}</td>
            <td>{data?.overallAverageTypos}</td>
          </tr>
        </tbody>
      </table>

      <ProgressChart {...data} />
    </section>
  );
};

export default Page;
