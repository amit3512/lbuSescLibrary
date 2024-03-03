import {
  GET_ENROLLED_COURSES_START,
  GET_ENROLLED_COURSES_SUCCESS,
  GET_ENROLLED_COURSES_FAIL,
  GET_ALL_INVOICES_START,
  GET_ALL_INVOICES_SUCCESS,
} from "../types";
import { updateObject } from "../utility";

const initial_state = { loading: false, error: null, data: null };

const EnrolledCourseStart = (state, action) =>
  updateObject(state, { error: null, loading: true });

const EnrolledCourseSuccess = (state, action) => {
  console.log("action", action);
  return updateObject(state, {
    error: null,
    loading: false,
    data: action?.data?.enrolledCourses,
  });
};

const EnrolledCourseFail = (state, action) =>
  updateObject(state, { error: action.error, loading: false });

export default function enrolledCourseReducer(state = initial_state, action) {
  switch (action.type) {
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
