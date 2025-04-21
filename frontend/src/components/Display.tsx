import { useRef, useState } from "react";
import { Zoomie } from "./Zoomie";

type PropTypes = {
  src: string;
  alt?: string;
};

export function Display({ src, alt = "" }: PropTypes) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [out, setOut] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPos({ x, y });
  };

  return (
    <div
      className="w-full h-full relative cursor-none overflow-hidden"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setOut(true)}
      onMouseEnter={() => setOut(false)}
    >
      <img src={src} alt={alt} />
      <Zoomie pos={pos} out={out} />
    </div>
  );
}
