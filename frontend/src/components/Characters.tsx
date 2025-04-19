export function Characters() {
  // TODO: Get characters left from the backend
  const characters = ["Waldo", "Woof", "Wenda", "Whitebeard", "Odlaw"];

  return (
    <div className="absolute flex flex-col overflow-y-scroll overflow-x-hidden h-[calc(100vh-100%)] top-full right-0 bg-blue-950">
      {characters.map((e, i) => (
        <div key={i}>
          <img src={`/${e}.webp`} alt={e} className="w-40 m-4" />
          <p className="font-black text-center">{e}</p>
        </div>
      ))}
    </div>
  );
}
