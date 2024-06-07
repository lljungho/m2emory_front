import axios from "axios";
import { store } from '../redux/store';

// axios
const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
});

// 응답 인터셉터 설정
api.interceptors.response.use(
    response => response,
    error => {
        console.log('Interceptor Error:', error); 
        // 토큰 인증 오류
        if (error.response && error.response.status === 401 && !error.response.tokenState) {
            console.log('token error');
            sessionStorage.removeItem('sessionAuth');
            sessionStorage.removeItem('containerState');
            store.dispatch({ type: 'CLEAR_ALL_STATE' });
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export default api;