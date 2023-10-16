import Navbar from "@/layouts/Navbar";
import { Outlet } from "react-router";

const Layout = () => {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
};

export default Layout;
