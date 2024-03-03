import httpUtils from "../../utils/httpUtils";
import {
  apiRouteForGetAllCourses,
  apiRouteForSearchSpecificCourses,
} from "../../constants/apiRoutes";

import {
  GET_ALL_COURSES_START,
  GET_ALL_COURSES_SUCCESS,
  GET_ALL_COURSES_FAIL,
  GET_ENROLLED_COURSES_START,
  GET_ENROLLED_COURSES_SUCCESS,
  GET_ENROLLED_COURSES_FAIL,
  GET_ALL_SEARCH_COURSES_FINISH,
  GET_ALL_SEARCH_COURSES_START,
  GET_ALL_SEARCH_COURSES_SUCCESS,
} from "../types";

export const fetchStart = (type) => {
  return {
    type: type,
  };
};

export const fetchSuccess = (type, payload) => {
  return {
    type: type,
    data: payload,
  };
};

export const fetchFailed = ({ type, message }) => {
  return {
    type: type,
    error: message,
  };
};

export const getAllCourses = () => {
  return async function (dispatch) {
    const defaultErrorMsg = "Error on login attempt";

    try {
      dispatch(fetchSuccess(GET_ALL_COURSES_START));
      const response = await httpUtils.get(apiRouteForGetAllCourses);
      const { status } = response?.data;
      if (!status === 200) {
        const { error } = response?.data;
        throw error;
      }

      const { data: responseData } = response?.data;

      //   localStorage.setItem("auth", responseData);
      dispatch(fetchSuccess(GET_ALL_COURSES_SUCCESS, responseData));
    } catch (error) {
      console.log("error", error);
      //   dispatch(loginFailed({ message: error.message ?? defaultErrorMsg }));
    }
  };
};

export const searchSpecificCourses = (searchTerm) => {
  return async function (dispatch) {
    const defaultErrorMsg = "Error on login attempt";

    try {
      dispatch(fetchSuccess(GET_ALL_SEARCH_COURSES_START));
      const response = await httpUtils.get(
        `${apiRouteForSearchSpecificCourses}?name=${searchTerm}`
      );
      const { status } = response?.data;
      if (!status === 200) {
        const { error } = response?.data;
        throw error;
      }
      const { data: responseData } = response?.data;

      //   localStorage.setItem("auth", responseData);
      dispatch(fetchSuccess(GET_ALL_SEARCH_COURSES_SUCCESS, responseData));
    } catch (error) {
      console.log("error", error);
      //   dispatch(loginFailed({ message: error.message ?? defaultErrorMsg }));
    }
  };
};
