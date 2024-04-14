import { legacy_createStore as create_Store } from "redux";
import authReducer from "./Reducers/AuthReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = create_Store(authReducer, composeWithDevTools());

export default store;
