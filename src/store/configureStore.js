import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from '../reducers/auth'

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer
    }),
    compose(applyMiddleware(thunk))
  );

  return store;
};
