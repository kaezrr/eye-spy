import { useState, useEffect } from "react";
import { getMapById } from "../Logic";
import { useParams } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export function ImageWrapper({
  children,
  ref,
  onClick,
}: {
  children: React.ReactNode;
  ref: React.RefObject<HTMLDivElement | null>;
  onClick: (e: React.MouseEvent) => void;
}) {
  const { mapId } = useParams();
  const [map, setMap] = useState<{ name: string; id: number; url: string }>();

  useEffect(() => {
    getMapById(mapId ?? "0").then((res) => setMap(res));
  });

  return (
    <div className="size-fit relative" ref={ref} onClick={onClick}>
      <img src={`${apiUrl}${map?.url}`} className="w-[250vw] max-w-none" />
      {children}
    </div>
  );
}
