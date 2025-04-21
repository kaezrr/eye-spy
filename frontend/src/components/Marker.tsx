import { FaMapMarkerAlt } from "react-icons/fa";

export function Marker({ pos }: { pos: { x: number; y: number } }) {
  return (
    <FaMapMarkerAlt
      className="absolute size-10 text-red-700 "
      style={{
        top: `${pos.y - 40}px`,
        left: `${pos.x - 40}px`,
      }}
    />
  );
}
