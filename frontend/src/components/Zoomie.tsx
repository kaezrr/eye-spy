import { Finder } from "./Finder";

type PropType = {
  pos: { x: number; y: number };
  out?: boolean;
  spawnForm: boolean;
  zoom?: number;
  magnifierSize?: number;
  setMarker: (pos: { x: number; y: number }) => void;
};

export function Zoomie({
  pos,
  out,
  spawnForm,
  setMarker,
  zoom = 2,
  magnifierSize = 150,
}: PropType) {
  return (
    <div
      className={`
        absolute border-2 border-black
        bg-[url('/space.jpeg')]
        rounded-full bg-no-repeat
      `}
      style={{
        width: `${magnifierSize}px`,
        height: `${magnifierSize}px`,
        left: out ? "-1000px" : `${pos.x - magnifierSize / 2}px`,
        top: out ? "-1000px" : `${pos.y - magnifierSize / 2}px`,
        backgroundPosition: `${-pos.x * zoom + magnifierSize / 2}px ${-pos.y * zoom + magnifierSize / 2}px`,
        backgroundSize: `${window.innerWidth * zoom}px auto`,
      }}
    >
      {spawnForm && <Finder pos={pos} setMarker={setMarker} />}
    </div>
  );
}
