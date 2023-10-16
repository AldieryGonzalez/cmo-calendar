import { Route, Routes } from "react-router";
import PrivateRoutes from "./utilities/PrivateRoutes";
import Layout from "./layouts/Layout";

import AllEvents from "./pages/AllEvents";
import Landing from "./pages/Landing";
import Wildcard from "./pages/Wildcard";
import Dashboard from "./pages/Dashboard";

function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path='/' element={<PrivateRoutes auth={false} />}>
					<Route index element={<Landing />}></Route>
				</Route>
				<Route path='/' element={<Landing />} />
				<Route element={<PrivateRoutes />}>
					<Route path='/home' element={<Dashboard />}></Route>
					<Route path='/calendar' element={<AllEvents />}></Route>
				</Route>
				<Route path='*' element={<Wildcard />} />
			</Route>
		</Routes>
	);
}

export default App;
