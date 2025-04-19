import { Navbar } from "./components/Navbar";
import { Display } from "./components/Display";

function App() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Display src="/space.jpeg" alt="image" />
    </div>
  );
}

export default App;
