import { getCharacters } from "../Logic";
import { useEffect, useState } from "react";

export function Characters() {
  const [characters, setCharacters] = useState<string[]>([]);
  useEffect(() => {
    getCharacters().then((res) => {
      setCharacters(res);
    });
  }, []);

  return (
    <div className="absolute flex flex-col overflow-y-scroll overflow-x-hidden h-[calc(100vh-100%)] top-full right-0 bg-blue-950">
      {characters.map((e, i) => (
        <div key={i}>
          <img src={`/${e}.webp`} alt={e} className="w-40 m-4" />
          <p className="font-black text-center">{e}</p>
        </div>
      ))}
    </div>
  );
}
