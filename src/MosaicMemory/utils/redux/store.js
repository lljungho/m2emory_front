import { legacy_createStore as createStore, combineReducers } from 'redux';
import { setSessionReducer } from './reducer/sessionReducer';
import { setColorModeReducer } from './reducer/colorModeReducer';
import { setContStatusesReducer } from './reducer/contStatusesReducer';
import { setUserInfoReducer } from './reducer/userInfoReducer';

const reducer = combineReducers({
    sessionCheck: setSessionReducer,
    colorMode: setColorModeReducer, 
    contStatus: setContStatusesReducer,
    userInfo: setUserInfoReducer,
});

const store = createStore(reducer);

export { store };
export default store;
