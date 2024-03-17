import httpUtils from "../../utils/httpUtils";
import {
  apiRouteForFetchEnrolledCourses,
  apiRouteForGetEnrolledCourses,
  apiRouteForGetAllStudents,
} from "../../constants/apiRoutes";

import {
  GET_ENROLLED_COURSES_START,
  GET_ENROLLED_COURSES_SUCCESS,
  FETCH_ENROLLED_COURSE_SUCCESS,
  FETCH_ENROLLED_COURSE_START,
  GET_ALL_STUDENT_START,
  GET_ALL_STUDENT_SUCCESS,
} from "../types";
import { notification } from "antd";

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

export const getAllStudents = () => {
  return async function (dispatch) {
    const defaultErrorMsg = "Error on getting all students";

    try {
      dispatch(fetchSuccess(GET_ALL_STUDENT_START));
      const response = await httpUtils.get(apiRouteForGetAllStudents);
      const { status } = response?.data;
      if (!status === 200) {
        const { error } = response?.data;
        throw error;
      }

      const { data: responseData } = response?.data;
      console.log("allStudents", responseData);

      //   localStorage.setItem("auth", responseData);
      dispatch(fetchSuccess(GET_ALL_STUDENT_SUCCESS, responseData));
    } catch (error) {
      console.log("error", error);
      //   dispatch(loginFailed({ message: error.message ?? defaultErrorMsg }));
    }
  };
};

export const getEnrolledCourses = (studentId) => {
  return async function (dispatch) {
    const defaultErrorMsg = "Error on getting enrolled courses";

    try {
      dispatch(fetchSuccess(GET_ENROLLED_COURSES_START));
      const response = await httpUtils.get(
        `${apiRouteForGetEnrolledCourses}/${studentId}`
      );
      const { status } = response?.data;
      if (!status === 200) {
        const { error } = response?.data;
        throw error;
      }

      const { data: responseData } = response?.data;

      //   localStorage.setItem("auth", responseData);
      dispatch(fetchSuccess(GET_ENROLLED_COURSES_SUCCESS, responseData));
    } catch (error) {
      console.log("error", error);
      //   dispatch(loginFailed({ message: error.message ?? defaultErrorMsg }));
    }
  };
};

export const UpdateEnrolledCourse = (subjectId, email) => {
  return async function (dispatch) {
    const defaultErrorMsg = "Error on getting enrolled courses";

    try {
      dispatch(fetchSuccess(FETCH_ENROLLED_COURSE_START));
      const response = await httpUtils.post(apiRouteForFetchEnrolledCourses, {
        subjectId: subjectId,
        email: email,
      });

      const { status } = response?.data;
      if (!status === 200) {
        const { error } = response?.data;
        throw error;
      }

      const responseData = response?.data;
      notification.success({
        message: "Successfully Enrolled",
      });

      //   localStorage.setItem("auth", responseData);
      dispatch(fetchSuccess(FETCH_ENROLLED_COURSE_SUCCESS, responseData));
    } catch (error) {
      console.log("error", error);
      //   dispatch(loginFailed({ message: error.message ?? defaultErrorMsg }));
    }
  };
};
