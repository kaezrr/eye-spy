import { useParams } from "react-router-dom";

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
  const src = `/${mapId}.jpeg`;
  return (
    <div className="size-fit relative" ref={ref} onClick={onClick}>
      <img src={src} className="w-[250vw] max-w-none" />
      {children}
    </div>
  );
}
