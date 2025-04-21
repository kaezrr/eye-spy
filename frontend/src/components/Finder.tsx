export function Finder({
  pos,
  setMarker,
}: {
  pos: { x: number; y: number };
  setMarker: (pos: { x: number; y: number }) => void;
}) {
  // TODO: Get characters from backend
  const characters = ["Waldo", "Woof", "Wenda", "Whitebeard", "Odlaw"];
  const handleOnClick = (e: React.MouseEvent) => {
    alert(
      `You found ${(e.currentTarget as HTMLElement).innerText} at ${JSON.stringify(pos)}`,
    );
    setMarker(pos);
  };

  return (
    <div
      className={`bg-teal-700 rounded-lg border border-black p-2 text-white w-fit flex flex-col gap-1 origin-top-left`}
      style={{
        transform:
          pos.y > 200 && pos.y < 800
            ? `translateX(${pos.x > 900 ? "-105%" : "100%"})`
            : `translateY(${pos.y < 200 ? "80%" : "-105%"})`,
      }}
    >
      <h2 className="font-bold text-nowrap">Who did you find?</h2>
      {characters.map((e) => (
        <button
          className="rounded-full border border-amber-400 hover:bg-amber-300 hover:text-black"
          key={e}
          onClick={handleOnClick}
        >
          {e}
        </button>
      ))}
    </div>
  );
}
