import Navbar from "@/layouts/Navbar";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
