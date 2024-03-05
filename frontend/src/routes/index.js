import { useSelector } from "react-redux";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "../privateRoute";

// components
import MasterLayout from "../components/layouts/master";
import PageNotFound from "../pages/pageNotFound";

import LibraryPortal from "../pages/portal/library";
import Login from "../pages/portal/library/login";
import Register from "../pages/portal/library/register";

function MasterLayoutWrapper(childComponent) {
  // const HOC = () => <MasterLayout component={element} />;
  // return HOC;
  return <MasterLayout component={childComponent} />;
}

const Routess = () => {
  const { data } = useSelector((state) => state.auth);
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={MasterLayoutWrapper(Login)} />
        <Route
          exact
          path="/firstLogin"
          element={MasterLayoutWrapper(Register)}
        />
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>{MasterLayoutWrapper(LibraryPortal)}</PrivateRoute>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default Routess;
