"use client";
import { ServerDefaultResponse } from "@/services/api/config";
import { Progress } from "@/services/api/getProgress";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ProgressChart = ({
  data,
  isOk,
}: ServerDefaultResponse<Progress> | ServerDefaultResponse<null>) => {
  if (!isOk) return;
  return (
    <div className="p-4 rounded w-full aspect-video bg-gray-100">
      <ResponsiveContainer>
        <LineChart
          data={data?.progress}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="createdAt" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="cpm"
            stroke="#16A34A"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="typos"
            stroke="#EF4031"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
