import {
  GET_ALL_COURSES_START,
  GET_ALL_COURSES_SUCCESS,
  GET_ALL_COURSES_FAIL,
  GET_ENROLLED_COURSES_START,
  GET_ENROLLED_COURSES_SUCCESS,
  GET_ENROLLED_COURSES_FAIL,
  GET_ALL_SEARCH_COURSES_SUCCESS,
  GET_ALL_SEARCH_COURSES_START,
} from "../types";
import { updateObject } from "../utility";

const initial_state = { loading: false, error: null, data: null };

const Start = (state, action) =>
  updateObject(state, { error: null, loading: true });

const Success = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    data: action?.data,
  });
};

const Fail = (state, action) =>
  updateObject(state, { error: action.error, loading: false });

export default function courseReducer(state = initial_state, action) {
  switch (action.type) {
    case GET_ALL_COURSES_START:
      return Start(state, action);

    case GET_ALL_COURSES_SUCCESS:
      return Success(state, action);

    case GET_ALL_COURSES_FAIL:
      return Fail(state, action);

    case GET_ALL_SEARCH_COURSES_START:
      return Start(state, action);

    case GET_ALL_SEARCH_COURSES_SUCCESS:
      return Success(state, action);

    default:
      return state;
  }
}
