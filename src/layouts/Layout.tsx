import Navbar from "@/layouts/Navbar";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="grid h-screen grid-rows-[min-content_92%]">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
