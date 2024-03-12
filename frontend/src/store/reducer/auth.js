import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_START,
  LOGOUT_SUCCESS,
  STUDENT_UPDATE_SUCCESS,
  STUDENT_UPDATE_FAIL,
  FETCH_ENROLLED_COURSE_SUCCESS,
} from "../types";
import { updateObject } from "../utility";

const initial_state = { loading: false, error: null, data: null };

const loginStart = (state, action) =>
  updateObject(state, { error: null, loading: true });

const loginSuccess = (state, action) => {
  console.log("action", action);

  return updateObject(state, {
    error: null,
    loading: false,
    data: action.data,
  });
};

const loginFail = (state, action) =>
  updateObject(state, { error: action.error, loading: false });

const logout = (state, action) =>
  updateObject(state, { error: action.error, loading: false, data: null });

const studentUpdateSuccess = (state, action) => {
  const updateStudent = {
    error: null,
    loading: false,
    data: { ...state.data, ...action.data },
  };
  return updateStudent;
};

const studentUpdateFail = (state, action) =>
  updateObject(state, { error: action.error, loading: false });

export default function authReducer(state = initial_state, action) {
  switch (action.type) {
    case LOGIN_START:
      return loginStart(state, action);

    case LOGIN_SUCCESS:
      return loginSuccess(state, action);

    case LOGIN_FAIL:
      return loginFail(state, action);

    case LOGOUT_SUCCESS:
      // return state;
      return logout(state, action);

    case STUDENT_UPDATE_SUCCESS:
      return studentUpdateSuccess(state, action);

    case STUDENT_UPDATE_FAIL:
      return studentUpdateFail(state, action);

    case FETCH_ENROLLED_COURSE_SUCCESS:
      return studentUpdateSuccess(state, action);

    default:
      return state;
  }
}
