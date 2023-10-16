import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

type PrivateReqs = {
	auth?: boolean;
	admin?: boolean;
};

const PrivateRoutes: React.FC<PrivateReqs> = ({ auth = true, admin }) => {
	const { session } = useAuth();
	console.log(session);
	let pass = true;
	let path = "/";

	if (auth) {
		pass = pass && !!session;
		path = pass ? path : "/";
	}
	if (admin) {
		pass = pass && !!session;
		path = pass ? path : "/";
	}
	console.log(session, path);
	return session ? <Outlet /> : <Navigate to={path} />;
};

export default PrivateRoutes;
