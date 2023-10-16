import { Route, Routes } from "react-router";
import Layout from "./layouts/Layout";
import Shifts from "./pages/Shifts";
import Landing from "./pages/Landing";
import PrivateRoutes from "./utilities/PrivateRoutes";
import Wildcard from "./pages/Wildcard";

function App() {
	return (
		// <div>
		// 	{session && data ? (
		// 		<div className='m-auto'>
		//
		// 		</div>
		// 	) : (
		// 		<div className='p-5 mx-auto w-full flex flex-col items-center'>
		// 			<button
		// 				className='bg-white hover:bg-gray-100 mx-auto text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
		// 				onClick={() => googleSignIn()}>
		// 				Sign in with Google
		// 			</button>
		// 		</div>
		// 	)}
		// </div>
		<Routes>
			<Route element={<Layout />}>
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
