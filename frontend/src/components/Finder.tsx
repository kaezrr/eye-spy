import { useNavigate } from "react-router-dom";
import { checkPosition, getCharacters, hasWon } from "../Logic";
import { useState, useEffect } from "react";

export function Finder({
  pos,
  setMarker,
}: {
  pos: { x: number; y: number };
  setMarker: (pos: { x: number; y: number }) => void;
}) {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState<string[]>([]);
  useEffect(() => {
    getCharacters().then((res) => {
      setCharacters(res);
    });
  }, []);

  const handleOnClick = async (e: React.MouseEvent) => {
    const who = (e.currentTarget as HTMLElement).innerText;
    const res = await checkPosition(who, pos);
    if (res) {
      alert(`You found ${who}!!!`);
      setMarker(pos);
      if (hasWon()) {
        navigate("/scores");
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
