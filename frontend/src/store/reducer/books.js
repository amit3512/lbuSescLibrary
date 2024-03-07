import {
  GET_ALL_BOOKS_START,
  GET_ALL_BOOKS_SUCCESS,
  GET_ALL_BOOKS_FAIL,
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

export default function bookReducer(state = initial_state, action) {
  switch (action.type) {
    case GET_ALL_BOOKS_START:
      return Start(state, action);

    case GET_ALL_BOOKS_SUCCESS:
      return Success(state, action);

    case GET_ALL_BOOKS_FAIL:
      return Fail(state, action);

    default:
      return state;
  }
}
