import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./utilities/PrivateRoutes";
import Layout from "./layouts/Layout";

import Landing from "./pages/Landing";
import Wildcard from "./pages/Wildcard";
import Dashboard from "./pages/Dashboard";
import Shifts from "./pages/Shifts";
import EventDetails from "./pages/EventDetails";
import Calendar from "./pages/Calendar";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PrivateRoutes auth={false} />}>
            <Route index element={<Landing />}></Route>
          </Route>
          <Route path="/" element={<Landing />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Dashboard />}></Route>
            <Route path="/shifts" element={<Shifts />}></Route>
            <Route path="/shifts/:id" element={<EventDetails />}></Route>
            <Route path="/calendar" element={<Calendar />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Route>
          <Route path="*" element={<Wildcard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
