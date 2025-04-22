import { useNavigate, useParams } from "react-router-dom";
import { checkPosition, getCharacters, getStatus } from "../Logic";
import { useState, useEffect } from "react";

export function Finder({
  pos,
  setMarker,
}: {
  pos: { x: number; y: number };
  setMarker: (pos: { x: number; y: number }) => void;
}) {
  const { mapId } = useParams();

  const navigate = useNavigate();
  const [characters, setCharacters] = useState<string[]>([]);
  useEffect(() => {
    getCharacters(mapId).then((res) => {
      setCharacters(res);
    });
  }, []);

  const handleOnClick = async (e: React.MouseEvent) => {
    const who = (e.currentTarget as HTMLElement).innerText;
    const res = await checkPosition(who, pos);
    if (res) {
      alert(`You found ${who}!!!`);
      setMarker(pos);
      const stat = await getStatus();
      if (stat.status === "won") {
        navigate("/won");
      }
    } else {
      alert(`You did not find ${who}...`);
    }
  };

  return (
    <div
      className={`bg-teal-700 rounded-lg border border-black p-2 text-white w-fit flex flex-col gap-1 origin-top-left`}
      style={{
        transform:
          pos.y > 200 && pos.y < 800
            ? `translateX(${pos.x > 900 ? "-105%" : "100%"})`
            : `translateY(${pos.y < 200 ? "80%" : "-105%"})`,
      }}
    >
      <h2 className="font-bold text-nowrap">Who did you find?</h2>
      {characters.map((e) => (
        <button
          className="rounded-full border border-amber-400 hover:bg-amber-300 hover:text-black"
          key={e}
          onClick={handleOnClick}
        >
          {e}
        </button>
      ))}
    </div>
  );
}
