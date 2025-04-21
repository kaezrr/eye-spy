type PropType = {
  pos: { x: number; y: number };
  out?: boolean;
  zoom?: number;
};

export function Zoomie({ pos, out, zoom = 2 }: PropType) {
  return (
    <div
      className={`
      absolute border-2 border-black
      bg-[url('/space.jpeg')]
      pointer-events-none rounded-xl 
      bg-no-repeat size-[100px]
      `}
      style={{
        left: out
          ? "-1000px"
          : `clamp(0px, ${pos.x - 50}px , calc(100% - 100px))`,
        top: out
          ? "-1000px"
          : `clamp(0px, ${pos.y - 50}px , calc(100% - 100px))`,
        backgroundPosition: `calc(-${pos.x}px * ${zoom}) calc(-${pos.y}px * ${zoom})`,
        backgroundSize: "calc(100vw * ${zoom}) auto",
      }}
    ></div>
  );
}
