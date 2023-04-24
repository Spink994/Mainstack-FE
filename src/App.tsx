import routes from "./components/Sidebar/routes.const";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notfound from "./pages/Notfound";

// When pages begin to increase, it will become necessary to implement code splitting for better performance

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={routes.dashboard} element={<Dashboard />} />
          <Route path="/*" element={<Notfound />} />
        </Routes>
      </Router>
    </>
  );
}
