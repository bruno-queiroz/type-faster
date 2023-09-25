import { useTypoReview } from "@/hooks/useTypoReview";

const MistakeItem = ({ i, word }: { i: number; word: string }) => {
  const { typoReview, showTypoReplay, isCursorShowing, clearReplay } =
    useTypoReview();

  return (
    <div
      className="group bg-white p-2 rounded w-[max-content] hover:cursor-pointer border-b-[1px] border-b-red-500"
      onMouseOver={() => showTypoReplay(i)}
      onMouseLeave={clearReplay}
    >
      <div className="hidden group-hover:flex break-all justify-center font-mono text-lg absolute right-[50%] translate-x-[50%] top-[-8px] bg-gray-400 text-white p-2 rounded min-w-[200px] h-[45px]">
        {typoReview.map((typo, i) => (
          <span key={i}>{typo.value}</span>
        ))}
        <span
          className={`w-[1px] h-[24px] ${isCursorShowing && "cursor-white"}`}
        />
      </div>

      {word}
    </div>
  );
};

export default MistakeItem;
