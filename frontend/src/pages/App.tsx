import { Navbar } from "../components/Navbar";
import { Display } from "../components/Display";
import { useEffect } from "react";
import { startUser } from "../Logic";

function App() {
  useEffect(() => {
    startUser();
  }, []);

  return (
    <div className="flex flex-col">
      <Navbar />
      <Display />
    </div>
  );
}

export default App;
