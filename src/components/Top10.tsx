import { getRanking } from "@/services/api/getRanking";
import { getText } from "@/services/api/getText";
import { formatDate } from "@/utils/formatDate";
import { useQuery } from "react-query";
import SubTitle from "./SubTitle";

const Top10 = () => {
  const { data: text } = useQuery("text", getText);

  const { data: top10 } = useQuery(
    ["ranking", text?.data?.id],
    () => getRanking(text?.data?.id || ""),
    { refetchOnMount: true }
  );

  if (text?.data?.mode === "repeated-words") return "";

  return (
    <section className="flex flex-col gap-4 mt-4">
      <SubTitle>Ranking</SubTitle>

      <table className="w-full">
        <thead>
          <tr className="grid grid-cols-table py-1 bg-neutral-900 text-white rounded-t">
            <th>#</th>
            <th>Speed</th>
            <th>Date</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody className="">
          {top10?.data?.map((rank, i) => (
            <tr
              className="grid grid-cols-table place-items-center odd:bg-gray-100 py-2"
              key={i}
            >
              <td className="font-semibold">{i + 1}</td>
              <td>{rank?.cpm} cpm</td>
              <td>{formatDate(rank?.createdAt)}</td>
              <td className="text-center">{rank?.user?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {top10?.data.length === 0 && (
        <div className="flex justify-center bg-gray-100 p-4 rounded">
          Looks like no one has typed this text yet 🤨
        </div>
      )}
    </section>
  );
};

export default Top10;
