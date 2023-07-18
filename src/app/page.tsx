import { gameModes } from "@/assets/gameModes";
import GameModeCard from "@/components/GameModeCard";

export default function Home() {
  return (
    <main className="p-4 ">
      <div className="flex justify-center">
        <div className="flex flex-col items-center">
          <h1 className="mt-4 text-4xl font-bold">TypeFaster </h1>
          <p>Get better at typing while having fun</p>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        {gameModes.map((mode, index) => (
          <GameModeCard key={index} {...mode} />
        ))}
      </div>
    </main>
  );
}
