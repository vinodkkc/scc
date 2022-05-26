import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/Index";

let store = null;
const middleware = applyMiddleware(thunk);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("token");
    if (serializedState === null) {
      return undefined;
    } else {
      return JSON.parse(serializedState);
    }
  } catch (err) {
    console.log("error=> ", err);
    return undefined;
  }
};

if (process.env.NODE_ENV === "development") {
  store = createStore(rootReducer, loadState(), composeEnhancers(middleware));
} else {
  store = createStore(rootReducer, loadState(), middleware);
}

let state = store.getState();
if (
  state.authReducer.sessionTimeout &&
  Date.parse(new Date()) > state.authReducer.sessionTimeout
) {
  state.authReducer.isAuthenticated = false;
}

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("token", serializedState);
  } catch (err) {
    console.log("error=> ", err);
  }
};

store.subscribe(() => saveState(store.getState()));

window.onbeforeunload = (e) => {
  const state = store.getState();
  state.authReducer.credentialInformation = null;
  saveState(state);
};

export default store;
