import { useNavigate } from "react-router-dom";
import { checkPosition, getCharacters, getStatus } from "../Logic";
import { useState, useEffect } from "react";

type Position = {
  x: number;
  y: number;
};

type Props = {
  pos: Position;
  createMarker: (pos: Position) => void;
};

function getTransform(pos: Position): Position {
  return { x: pos.x > 50 ? -110 : 10, y: pos.y > 50 ? -110 : 10 };
}

export function Finder({ pos, createMarker }: Props) {
  const [characters, setCharacters] = useState<{ name: string; url: string }[]>(
    [],
  );
  const navigate = useNavigate();

  useEffect(() => {
    getCharacters().then((res) => {
      setCharacters(res);
    });
  }, []);

  const handleOnClick = async (e: React.MouseEvent) => {
    const who = (e.currentTarget as HTMLButtonElement).innerText;
    const result = await checkPosition(who, pos);
    if (result) {
      createMarker(pos);
      const status = await getStatus();
      if (status.finished) navigate("/won");
    } else {
      alert("That's incorrect!");
    }
  };

  const trans = getTransform(pos);
  return (
    <div
      className="absolute bg-teal-700 rounded-lg border border-black p-2 text-white w-fit flex flex-col gap-1 origin-top-left"
      style={{
        top: `${pos.y}%`,
        left: `${pos.x}%`,
        transform: `translate(${trans.x}%, ${trans.y}%)`,
      }}
    >
      <h2 className="font-bold text-nowrap">Who did you find?</h2>
      {characters.map((e) => (
        <button
          className="rounded-full border border-amber-400 hover:bg-amber-300 hover:text-black"
          key={e.name}
          onClick={handleOnClick}
        >
          {e.name}
        </button>
      ))}
    </div>
  );
}
