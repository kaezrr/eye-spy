import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/App.tsx";
import Home from "./pages/Home.tsx";
import Protected from "./pages/Protected.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Win from "./pages/Win.tsx";
import Scores from "./pages/Scores.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/play/:mapId",
    element: (
      <Protected>
        <App />
      </Protected>
    ),
  },
  {
    path: "/scores/:mapId",
    element: <Scores />,
  },
  {
    path: "/won",
    element: (
      <Protected>
        <Win />
      </Protected>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
