import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import PrivateRoute from "../privateRoute";

// components
import MasterLayout from "../components/layouts/master";
import PageNotFound from "../pages/pageNotFound";

import { useSelector } from "react-redux";
import LibraryPortal from "../pages/portal/library";

function MasterLayoutWrapper(childComponent) {
  const HOC = () => <MasterLayout component={childComponent} />;
  return HOC;
}

const Routess = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LibraryPortal />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default Routess;
