import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { createUser } from "./Logic";

function Home() {
  const navigate = useNavigate();
  const user = localStorage.getItem("name");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") ?? "userMF") as string;
    createUser(name);
    navigate("/play");
  };

  return (
    <div className="flex flex-col bg-indigo-950 text-white items-center h-screen py-30 gap-30">
      <h1 className="text-8xl font-bold flex items-center gap-[2%] w-full justify-center">
        Welcome to Eye Spy <FaEye />
      </h1>
      <form
        className="flex flex-col gap-5 items-center"
        onSubmit={handleSubmit}
      >
        <h2 className="text-5xl">Enter Your Name And Start Playing</h2>
        <input
          type="text"
          name="name"
          id="name"
          className="bg-blue-800 rounded-full p-2"
          defaultValue={user ?? ""}
          required
        />
        <button className="bg-green-700 hover:bg-green-600 transition rounded-lg py-2 px-8">
          Play
        </button>
      </form>
    </div>
  );
}

export default Home;
