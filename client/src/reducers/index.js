import { combineReducers } from "redux"
import authReducer from "./AuthReducer.js"
import postReducer from "./PostReducer.js"
import chatUserReducer from "./ChatUserReducer"
export const reducers = combineReducers({
	authReducer,
	postReducer,
	chatUserReducer
})
