import { useEffect, useState } from "react";
import { FaAngleDown, FaEye, FaAngleUp } from "react-icons/fa";
import { Characters } from "./Characters";
import { Link } from "react-router-dom";

export function Navbar() {
  const [time, setTime] = useState(0);
  const [show, setShow] = useState(false);

  const getFormattedTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const interval = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="sticky top-0 flex gap-1 items-center bg-blue-950 w-full justify-between text-amber-50 px-4 py-3 text-lg z-50">
      <Link to="/">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          Eye Spy <FaEye />
        </h1>
      </Link>
      <p className="text-emerald-200">{getFormattedTime()}</p>
      <p
        className="flex items-center gap-1 cursor-pointer hover:scale-110 transition text-xl font-medium"
        onClick={() => setShow((s) => !s)}
      >
        View Characters {show ? <FaAngleUp /> : <FaAngleDown />}
      </p>
      {show && <Characters />}
    </nav>
  );
}
