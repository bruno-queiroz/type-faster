import { ServerDefaultResponse } from "@/services/api/config";
import { Progress } from "@/services/api/getProgress";

const ProgressTable = ({
  data,
  isOk,
  message,
}: ServerDefaultResponse<Progress> | ServerDefaultResponse<null>) => {
  if (!isOk) {
    return (
      <div className="w-full text-center px-4 py-8 rounded bg-gray-100">
        {message}
      </div>
    );
  }

  return (
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
  );
};

export default ProgressTable;
