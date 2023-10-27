import { getRanking } from "@/services/api/getRanking";
import { getText } from "@/services/api/getText";
import { formatDate } from "@/utils/formatDate";
import { useQuery } from "react-query";

const Top10 = () => {
  const { data: text } = useQuery("text", getText);

  const { data: top10 } = useQuery(
    ["ranking", text?.id],
    () => getRanking(text?.id || ""),
    { refetchOnMount: true }
  );

  return (
    <table className="w-full">
      <thead>
        <tr className="grid grid-cols-table py-1 bg-neutral-900 text-white rounded-t-md">
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
            <td>{formatDate(rank?.createAt)}</td>
            <td>{rank?.user?.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Top10;
