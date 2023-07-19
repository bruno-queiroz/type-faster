"use client";
import Link from "next/link";

const text = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus,
assumenda laborum earum eos autem architecto rerum eligendi
similique nemo hic voluptatum in ut alias exercitationem quod, animi
corrupti, vero unde!`;

const textArray: string[] = [];

for (let i = 0; i < text.length; i++) {
  const char = text[i];
  textArray.push(char);
}

const Page = ({ params }: { params: { mode: string } }) => {
  return (
    <section className="p-4">
      <div className="flex flex-col gap-4 bg-gray-200 rounded-md p-4">
        <div>practice progress</div>
        <div className="flex flex-col gap-4 p-4 bg-gray-300 rounded">
          <p>
            {textArray.map((char, index) => (
              <span key={index}>{char}</span>
            ))}
          </p>

          <input type="text" spellCheck="false" className="p-2 bg-gray-200" />
        </div>
        <div className="flex justify-between">
          <Link
            href={"/"}
            className="py-2 px-4 rounded bg-white text-neutral-900"
          >
            Back Home
          </Link>
          <button
            type="button"
            className="py-2 px-4 rounded bg-neutral-900 text-white"
          >
            New Text
          </button>
        </div>

        <div>
          <div>this text is from</div>
        </div>
      </div>
    </section>
  );
};

export default Page;
