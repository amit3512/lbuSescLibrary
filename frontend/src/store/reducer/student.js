import {
  GET_ENROLLED_COURSES_START,
  GET_ENROLLED_COURSES_SUCCESS,
  GET_ENROLLED_COURSES_FAIL,
  GET_ALL_INVOICES_START,
  GET_ALL_INVOICES_SUCCESS,
  GET_ALL_STUDENT_START,
  GET_ALL_STUDENT_SUCCESS,
} from "../types";
import { updateObject } from "../utility";

const initial_state = { loading: false, error: null, data: null };

const AllStudentStart = (state, action) =>
  updateObject(state, { error: null, loading: true });

const AllStudentSuccess = (state, action) => {
  console.log("actionStudent", action);
  return updateObject(state, {
    error: null,
    loading: false,
    data: action?.data,
  });
};

const EnrolledCourseStart = (state, action) =>
  updateObject(state, { error: null, loading: true });

const EnrolledCourseSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    data: action?.data?.enrolledCourses,
  });
};

const EnrolledCourseFail = (state, action) =>
  updateObject(state, { error: action.error, loading: false });

export default function studentReducer(state = initial_state, action) {
  switch (action.type) {
    case GET_ALL_STUDENT_START:
      return AllStudentStart(state, action);

    case GET_ALL_STUDENT_SUCCESS:
      return AllStudentSuccess(state, action);

    case GET_ENROLLED_COURSES_START:
      return EnrolledCourseStart(state, action);

    case GET_ENROLLED_COURSES_SUCCESS:
      return EnrolledCourseSuccess(state, action);

    case GET_ENROLLED_COURSES_FAIL:
      return EnrolledCourseFail(state, action);

    default:
      return state;
  }
}
