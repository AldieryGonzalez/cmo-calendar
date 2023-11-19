import Navbar from "@/layouts/Navbar";
import { Outlet } from "react-router";
import { ScrollRestoration } from "react-router-dom";

function App() {
  return (
    <div className="grid h-screen grid-rows-[min-content_92%]">
      <ScrollRestoration />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
