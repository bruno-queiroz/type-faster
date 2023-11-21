"use client";
import { Progress } from "@/services/api/getProgress";
import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ProgressBarChart = (data: Progress | undefined) => {
  return (
    <div className="p-4 rounded w-full aspect-video bg-gray-100">
      <ResponsiveContainer>
        <BarChart
          width={500}
          height={300}
          data={data?.progress}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="createdAt" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="typos"
            fill="#EF4031"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="cpm"
            fill="#16A34A"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressBarChart;
