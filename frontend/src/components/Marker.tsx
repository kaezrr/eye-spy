import { FaMapMarkerAlt } from "react-icons/fa";

export function Marker({ pos }: { pos: { x: number; y: number } }) {
  return (
    <FaMapMarkerAlt
      className="absolute size-10 text-red-700 "
      style={{
        top: `${pos.y}px`,
        left: `${pos.x}px`,
      }}
    />
  );
}
