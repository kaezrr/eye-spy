type PropType = {
  pos: { x: number; y: number };
  out?: boolean;
  zoom?: number;
  magnifierSize?: number;
};

export function Zoomie({ pos, out, zoom = 2, magnifierSize = 100 }: PropType) {
  return (
    <div
      className={`
        absolute border-2 border-black
        bg-[url('/space.jpeg')]
        pointer-events-none rounded-xl 
        bg-no-repeat
      `}
      style={{
        width: `${magnifierSize}px`,
        height: `${magnifierSize}px`,
        left: out ? "-1000px" : `${pos.x - magnifierSize / 2}px`,
        top: out ? "-1000px" : `${pos.y - magnifierSize / 2}px`,
        backgroundPosition: `${-pos.x * zoom + magnifierSize / 2}px ${-pos.y * zoom + magnifierSize / 2}px`,
        backgroundSize: `${window.innerWidth * zoom}px auto`,
      }}
    ></div>
  );
}
