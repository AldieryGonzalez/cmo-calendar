import { Route, Routes } from "react-router";
import PrivateRoutes from "./utilities/PrivateRoutes";
import Layout from "./layouts/Layout";

import Shifts from "./pages/Shifts";
import Landing from "./pages/Landing";
import Wildcard from "./pages/Wildcard";

function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path='/' element={<PrivateRoutes auth={false} />}>
					<Route index element={<Landing />}></Route>
				</Route>
				<Route path='/' element={<Landing />} />
				<Route path='/home' element={<PrivateRoutes />}>
					<Route index element={<Shifts />}></Route>
				</Route>
				<Route path='*' element={<Wildcard />} />
			</Route>
		</Routes>
	);
}

export default App;
