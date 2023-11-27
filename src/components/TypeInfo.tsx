import { getText } from "@/services/api/getText";
import Image from "next/image";
import React from "react";
import { useQuery } from "react-query";
import { BsLightningChargeFill as LightIcon } from "react-icons/bs";
import { MdOutlineDownloadDone as AccuracyIcon } from "react-icons/md";
import { MdOutlineTimer as TimeIcon } from "react-icons/md";

interface TypeInfoProps {
  cpm: string;
  accuracy: string;
  time: string;
  restartTyping: () => void;
}

const TypeInfo = ({ cpm, accuracy, time, restartTyping }: TypeInfoProps) => {
  const { data, isLoading } = useQuery("text", getText);

  return (
    <div className="flex flex-col gap-2 bg-gray-100 p-4">
      <div className="flex justify-center items-center">
        <div className="border-r-[2px] border-neutral-900 p-8 max-sm:p-4">
          <Image
            src={data?.data?.image || ""}
            width={80}
            height={120}
            alt="book cover image"
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="p-2 pl-8 max-sm:pl-4">
            <h2 className="font-semibold">{data?.data?.title}</h2>
            <p>
              By <span className="font-semibold">{data?.data?.author}</span>
            </p>
          </div>
          <div className="flex flex-col gap-2 p-2 pl-8 max-sm:pl-4">
            <div className="flex gap-2">
              <div className="p-1 rounded bg-neutral-900 w-[max-content] text-white">
                <LightIcon />
              </div>
              Speed: {cpm} CPM
            </div>
            <div className="flex gap-2">
              <div className="p-1 rounded bg-neutral-900 w-[max-content] text-white">
                <AccuracyIcon />
              </div>
              Accuracy: {accuracy}%
            </div>
            <div className="flex gap-2">
              <div className="p-1 rounded bg-neutral-900 w-[max-content] text-white">
                <TimeIcon />
              </div>
              Time: {time}s
            </div>
          </div>
        </div>
      </div>
      <button
        className="py-2 px-4 mt-2 rounded bg-neutral-900 text-white outline-green-400"
        onClick={restartTyping}
      >
        Try it again
      </button>
    </div>
  );
};

export default TypeInfo;
