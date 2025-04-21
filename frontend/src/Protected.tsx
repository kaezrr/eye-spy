import { Navigate } from "react-router-dom";

function Protected({ children }: { children: React.ReactNode }) {
  const userId = localStorage.getItem("id");
  const username = localStorage.getItem("name");
  if (!userId || !username) {
    return <Navigate to="/" />;
  }
  return children;
}

export default Protected;
