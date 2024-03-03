import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "../privateRoute";

// components
import MasterLayout from "../components/layouts/master";
import PageNotFound from "../pages/pageNotFound";

import { useSelector } from "react-redux";
import PaymentPortal from "../pages/portal/finance/payment";

function MasterLayoutWrapper(childComponent) {
  const HOC = () => <MasterLayout component={childComponent} />;
  return HOC;
}

const Routess = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/portal" element={<PaymentPortal />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default Routess;
