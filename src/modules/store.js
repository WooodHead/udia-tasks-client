import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

export default function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  if (
    process.env.NODE_ENV === "development" &&
    process.env.REACT_APP_REDUX_LOGGING
  ) {
    middlewares.push(createLogger());
  }

  const enhancers = [applyMiddleware(...middlewares)];
  const store = createStore(rootReducer, initialState, compose(...enhancers));

  store.asyncReducers = {};
  sagaMiddleware.run(rootSaga);

  return store;
}
