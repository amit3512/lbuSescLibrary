import React from "react";
import { Navigate, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import StudentPortal from "../pages/portal/student";

export default function PrivateRoute({ element: Component, ...rest }) {
  const user = useSelector((state) => state.auth?.data ?? false);
  console.log("Component", rest);

  // useEffect(() => {
  //   dispatch(getAllRole());
  //   dispatch(getAllInformation());
  //   dispatch(getAllProvince());
  //   dispatch(getAllDistrict());
  //   dispatch(getAllLocalLevel());
  // }, []);

  return (
    // <Route
    //   {...rest}
    //   render={() => (user ? <Component /> : <Navigate to="/login" />)}
    // />

    <Route
      {...rest}
      // element={user ? <Component /> : <Navigate to="/login" />}
      element={user ? <StudentPortal /> : <Navigate to="/login" />}
    />
  );
}
