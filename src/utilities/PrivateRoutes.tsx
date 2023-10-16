import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

type PrivateReqs = {
	auth?: boolean;
	admin?: boolean;
};

const PrivateRoutes: React.FC<PrivateReqs> = ({ auth = true, admin }) => {
	const { session, isLoading } = useAuth();
	let pass = true;
	let path = "/";

	if (auth) {
		pass = pass && !!session;
		path = pass ? path : "/";
	}
	if (auth == false) {
		pass = pass && !session;
		path = pass ? path : "/home";
	}
	if (admin) {
		pass = pass && !!session;
		path = pass ? path : "/";
	}
	if (isLoading) return <p>Loading...</p>;
	return pass ? <Outlet /> : <Navigate to={path} />;
};

export default PrivateRoutes;
