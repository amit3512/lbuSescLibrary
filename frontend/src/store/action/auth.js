// import httpUtil from "../../utils/httpUtil";
import { notification } from "antd";
import {
  apiRouteForLogin,
  apiRouteForStudentWhenBorrowReturnBook,
} from "../../constants/apiRoutes";

import httpUtils from "../../utils/httpUtils";
import {
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  STUDENT_UPDATE_SUCCESS,
  STUDENT_UPDATE_FAIL,
  STUDENT_UPDATE_START,
} from "../types";

//When the Login Start
export const loginStart = () => {
  return {
    type: LOGIN_START,
  };
};

//When the Login Success
export const loginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    data: payload,
  };
};

//When the Login Failed
export const loginFailed = ({ message }) => {
  return {
    type: LOGIN_FAIL,
    error: message,
  };
};

//When you log out
export const logout = () => {
  //   localStorage.clear();
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const studentUpdateStart = () => {
  return {
    type: STUDENT_UPDATE_START,
  };
};

export const studentUpdateSuccess = (payload) => {
  return {
    type: STUDENT_UPDATE_SUCCESS,
    data: payload,
  };
};

export const studentUpdateFailed = ({ message }) => {
  return {
    type: STUDENT_UPDATE_FAIL,
    error: message,
  };
};

export const attemptLogin = (values) => {
  return async function (dispatch) {
    const defaultErrorMsg = "Error on login attempt";
    try {
      dispatch(loginStart());
      const response = await httpUtils.post(`${apiRouteForLogin}`, values);
      const { status } = response?.data;
      if (!status === 200) {
        const { error } = response?.data;
        throw error;
      }
      const { data: responseData } = response.data;

      //   localStorage.setItem("auth", responseData);
      dispatch(loginSuccess(responseData));
    } catch (error) {
      notification.info({
        message: "Wrong Credentials",
      });
      // dispatch(
      //   loginFailed({ message: error.response.data ?? defaultErrorMsg })
      // );
    }
  };
};

export const updateBorrowReturn = (type, isbn, studentId) => {
  return async function (dispatch) {
    const defaultErrorMsg = `Error on update ${type} attempt`;
    try {
      dispatch(studentUpdateStart());
      const response = await httpUtils.post(
        `${apiRouteForStudentWhenBorrowReturnBook}/${type}`,
        {
          studentId,
          isbn,
        }
      );
      const { status } = response?.data;
      if (!status === 200) {
        const { error } = response?.data;
        throw error;
      }
      const { data: responseData } = response;
      console.log("responseData", responseData);

      //   localStorage.setItem("auth", responseData);
      dispatch(studentUpdateSuccess(responseData));
      notification.success({ message: `Book ${type}ed` });
    } catch (error) {
      console.log("error", error);
      notification.warning({ message: error?.response?.data });
      //   dispatch(studentUpdateFailed({ message: error.message ?? defaultErrorMsg }));
    }
  };
};
