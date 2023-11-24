import ProgressChart from "@/components/ProgressChart";
import Title from "@/components/Title";
import { getProgress } from "@/services/api/getProgress";
import { getCurrentUser } from "../../../lib/session";
import ProgressBarChart from "@/components/ProgressBarChart";
import { Metadata } from "next";
import ProgressTable from "@/components/ProgressTable";

export const metadata: Metadata = {
  title: "Progress - see your progress | TypeFaster",
  description:
    "Keep track of your progress through charts that display statistics of your typing",
};

const Page = async () => {
  const user = await getCurrentUser();
  const progress = await getProgress(user?.email || "error");

  return (
    <section className="flex w-[85%] p-4 max-sm:w-full mx-auto flex-col items-center gap-4">
      <h1 className="mb-8">
        <Title>Progress</Title>
      </h1>

      <ProgressTable {...progress} />
      <ProgressChart {...progress} />
      <ProgressBarChart {...progress} />
    </section>
  );
};

export default Page;
