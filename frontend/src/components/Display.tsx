import { useRef, useState } from "react";
import { Zoomie } from "./Zoomie";
import { Marker } from "./Marker";

type PropTypes = {
  src: string;
  alt?: string;
};

type Position = {
  x: number;
  y: number;
};

export function Display({ src, alt = "" }: PropTypes) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });
  const [out, setOut] = useState(false);
  const [spawn, setSpawn] = useState(false);
  const [markers, setMarkers] = useState<Position[]>([]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (spawn) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPos({ x, y });
  };

  const handleSet = (ps: { x: number; y: number }) => {
    const temp = Array.from(markers);
    temp.push(ps);
    setMarkers(temp);
  };

  return (
    <div
      className={`w-full h-full relative ${spawn ? "" : "cursor-none"} overflow-hidden`}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setOut(true)}
      onMouseEnter={() => setOut(false)}
      onClick={() => setSpawn((s) => !s)}
    >
      <img src={src} alt={alt} />
      {markers.map((e: { x: number; y: number }, i) => (
        <Marker key={i} pos={e} />
      ))}
      <Zoomie pos={pos} out={out} spawnForm={spawn} setMarker={handleSet} />
    </div>
  );
}
