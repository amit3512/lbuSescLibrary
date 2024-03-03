import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import { encryptTransform } from "redux-persist-transform-encrypt";
// import { PersistGate } from "redux-persist/integration/react";
import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./reducer/auth";
import courseReducer from "./reducer/courses";
import enrolledCourseReducer from "./reducer/student";
import invoiceReducer from "./reducer/invoice";

const reducers = combineReducers({
  auth: authReducer,
  course: courseReducer,
  enrolledCourses: enrolledCourseReducer,
  invoice: invoiceReducer,
});

const persistConfig = {
  key: "rootv2",
  storage,
  stateReconciler: hardSet,
  whitelist: ["auth", "course"],
  transforms: [
    encryptTransform({
      secretKey: "someSuperSecret",
      onError: function (error) {
        // console.log(error);
      },
    }),
  ],
};
const persistedReducer = persistReducer(persistConfig, reducers);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers = compose;

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
