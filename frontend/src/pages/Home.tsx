import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { createUser, getMaps } from "../Logic";
import { useState, useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  const user = localStorage.getItem("name");
  const [maps, setMaps] = useState<{ name: string; id: number; url: string }[]>(
    [],
  );

  useEffect(() => {
    getMaps().then((res) => setMaps(res));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") ?? "userMF") as string;
    const map = parseInt(formData.get("map") as string);
    createUser(name);
    navigate(`/play/${map}`);
  };

  const handleSubmitLeader = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const map = parseInt(formData.get("map") as string);
    navigate(`/scores/${map}`);
  };

  return (
    <div className="flex flex-col bg-indigo-950 text-white items-center h-screen py-30 gap-10">
      <h1 className="text-8xl font-bold flex items-center gap-[2%] w-full justify-center">
        Welcome to Eye Spy <FaEye />
      </h1>
      <h2 className="text-4xl">Enter Your Name And Start Playing</h2>
      <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          className="bg-blue-800 rounded-full p-2 text-center"
          defaultValue={user ?? ""}
          placeholder="Name"
          required
        />
        <select name="map" id="map" className="bg-emerald-800 rounded-lg p-2">
          {maps.map((e, i) => (
            <option key={i} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>
        <button className="bg-green-700 hover:bg-green-600 transition rounded-lg py-2 px-8">
          Play
        </button>
      </form>
      <h2 className="text-4xl">Or Look At The Leaderboards</h2>
      <form onSubmit={handleSubmitLeader} className="flex gap-5 items-center">
        <select name="map" id="map" className="bg-emerald-800 rounded-lg p-2">
          {maps.map((e, i) => (
            <option key={i} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>
        <button className="bg-green-700 hover:bg-green-600 transition rounded-lg py-2 px-8">
          See Leaderboards
        </button>
      </form>
    </div>
  );
}

export default Home;
