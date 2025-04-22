import { useRef, useState } from "react";
import { FaLocationPin } from "react-icons/fa6";
import { ImageWrapper } from "./ImageWrapper";
import { Finder } from "./Finder";

type Position = {
  x: number;
  y: number;
};

export function Display() {
  const imgRef = useRef<HTMLDivElement>(null);
  const [markers, setMarkers] = useState<Position[]>([]);
  const [spawnForm, setSpawnForm] = useState<Position | false>(false);

  const handleClick = (e: React.MouseEvent) => {
    if (spawnForm) {
      setSpawnForm(false);
      return;
    }

    const rect = imgRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = Math.round((x * 1000) / rect.width);
    const normY = Math.round((y * 1000) / rect.height);
    setSpawnForm({ x: normX / 10, y: normY / 10 });
  };

  const addMarker = (pos: Position) => {
    const newMarkers = [...markers];
    newMarkers.push(pos);
    setMarkers(newMarkers);
  };

  return (
    <div className="h-[92vh] w-full overflow-scroll bg-indigo-950 object-cover">
      <ImageWrapper ref={imgRef} onClick={handleClick}>
        {markers.map((m) => (
          <FaLocationPin
            className="absolute text-red-600 -translate-x-1/2 -translate-y-full"
            style={{
              top: `${m.y}%`,
              left: `${m.x}%`,
            }}
          />
        ))}
        {spawnForm !== false && (
          <Finder pos={spawnForm} createMarker={addMarker} />
        )}
      </ImageWrapper>
    </div>
  );
}
