import { Fragment, useEffect, useState } from "react";
import { getLeaderboard } from "../Logic";
import { Link, useParams } from "react-router-dom";
import { intervalToDuration } from "date-fns";

type Score = {
  name: string;
  time: number;
};

type Leaderboard = {
  name: string;
  scores: Score[];
};

function Scores() {
  const { mapId } = useParams();
  const [leaderboard, setLeaderboard] = useState<Leaderboard>();

  useEffect(() => {
    getLeaderboard(mapId ?? "1").then((res) => setLeaderboard(res));
  }, []);

  if (!leaderboard) {
    return (
      <h1 className="text-4xl font-bold flex items-center gap-[2%] w-full justify-center">
        Loading...
      </h1>
    );
  }

  const scores = leaderboard.scores.map((score) => {
    const time = intervalToDuration({ start: 0, end: score.time });
    return {
      ...score,
      formatTime: `${time.hours ?? 0}hrs ${time.minutes ?? 0}mins ${time.seconds ?? 0}secs`,
    };
  });

  return (
    <div className="flex flex-col bg-indigo-950 text-white items-center h-screen py-30 gap-10">
      <h1 className="text-4xl font-bold flex items-center gap-[2%] w-full justify-center">
        Leaderboard of {leaderboard.name}
      </h1>
      <div className="grid grid-cols-[1fr_2fr_3fr] bg-indigo-800 p-2 text-2xl gap-2 rounded-lg border border-white">
        {scores.map((e, i) => (
          <Fragment key={i}>
            <p>#{i + 1}</p>
            <p>{e.name}</p>
            <p>{e.formatTime}</p>
          </Fragment>
        ))}
        {scores.length === 0 && <h1>Its empty...</h1>}
      </div>
      <Link to="/">
        <button className="bg-green-700 hover:bg-green-600 transition rounded-lg py-2 px-8">
          Go Back
        </button>
      </Link>
    </div>
  );
}

export default Scores;
