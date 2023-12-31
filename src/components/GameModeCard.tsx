import Link from "next/link";

interface GameModeCardProps {
  mode: string;
  description: string;
  slug: string;
}

const GameModeCard = ({ description, mode, slug }: GameModeCardProps) => {
  return (
    <Link href={`/practice?mode=${slug}`} className="bg-gray-200 p-4 rounded">
      <h3 className="text-xl font-semibold">{mode}</h3>
      <p>{description}</p>
    </Link>
  );
};

export default GameModeCard;
