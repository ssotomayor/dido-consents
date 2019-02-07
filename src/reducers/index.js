import { combineReducers } from "redux"
import consents from './consents'
import { loadingBarReducer } from "react-redux-loading"

export default combineReducers({consents, loadingBar: loadingBarReducer})