import { useEffect, useState } from "react";
import { getStatus } from "./Logic";
import { Link, useNavigate } from "react-router-dom";
import { intervalToDuration } from "date-fns";

type Status = {
  name: string;
  time: number;
  map: string;
  status: "won" | "playing" | "not playing";
  mapId: number;
};

function Win() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>();
  useEffect(() => {
    getStatus().then((res) => setStatus(res));
  }, []);

  if (status?.status !== "won") {
    navigate("/");
    return <></>;
  }
  const score = intervalToDuration({ start: 0, end: status.time });

  return (
    <div className="flex flex-col bg-indigo-950 text-white items-center h-screen py-30 gap-20">
      <h1 className="text-4xl font-bold flex items-center gap-[2%] w-full justify-center">
        You found all characters on {status.map}!
      </h1>
      <h1 className="text-4xl font-bold flex items-center gap-[2%] w-full justify-center">
        Time taken:{" "}
        {`${score.hours}hrs ${score.minutes}mins ${score.seconds}secs`}
      </h1>
      <Link to={`/scores/${status.mapId}`}>
        <button className="bg-green-700 hover:bg-green-600 transition rounded-lg py-2 px-8">
          See Leaderboards
        </button>
      </Link>
    </div>
  );
}

export default Win;
