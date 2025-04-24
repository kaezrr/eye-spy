import { useEffect, useState } from "react";
import { getStatus } from "../Logic";
import { Link, useNavigate } from "react-router-dom";
import { intervalToDuration } from "date-fns";

type Status = {
  mapId: number;
  map: string;
  time: number | null;
  finished: boolean;
};

function Win() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>({
    mapId: 0,
    map: "Default",
    time: null,
    finished: false,
  });

  useEffect(() => {
    getStatus().then((res) => setStatus(res));
  }, []);

  if (!status.finished) {
    navigate("/");
    return <></>;
  }

  const score = intervalToDuration({ start: 0, end: status.time ?? 0 });

  return (
    <div className="flex flex-col bg-indigo-950 text-white items-center h-screen py-30 gap-20">
      <h1 className="text-4xl font-bold flex items-center gap-[2%] w-full justify-center">
        You found all characters on {status.map}!
      </h1>
      <h1 className="text-4xl font-bold flex items-center gap-[2%] w-full justify-center">
        Time taken:{" "}
        {`${score.hours ?? 0}hrs ${score.minutes ?? 0}mins ${score.seconds ?? 0}secs`}
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
