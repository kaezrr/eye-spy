import { Navbar } from "../components/Navbar";
import { Display } from "../components/Display";
import { useEffect } from "react";
import { startUser } from "../Logic";
import { useParams } from "react-router-dom";

function App() {
  const { mapId } = useParams();

  useEffect(() => {
    startUser(mapId ?? "1");
  }, []);

  return (
    <div className="flex flex-col">
      <Navbar />
      <Display />
    </div>
  );
}

export default App;
