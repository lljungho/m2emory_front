import axios from "./axiosSet";

// 유저 정보 요청
export const getUserData = async (setLoading, dispatch) => {
    setLoading(true);
    console.log('getUserData()');
    try {
        const response = await axios.get('/member/userInfo');
        console.log('[Axios] getUserData() success :', response.data, response.status);

        // 유저 정보 리듀서에 저장
        dispatch({
            type: 'SET_USER_INFO',
            payload: response.data.userInfo,
        });

        // 토큰 저장
        sessionStorage.setItem('sessionID', response.data.accessToken);
        dispatch({
            type: 'SESSION_CHECK',
            sessionID: response.data.accessToken,
        });

    } catch(error) {
        if (error.response) {
            // 서버에서 받은 에러 메시지
            console.log('Server Error:', error.response.data);

        } else if (error.request) {
            // 요청이 전송되었지만 응답을 받지 못한 경우 
            console.log('Network Error:', error.request);

        } else {
            // 기타 에러
            console.log('Error:', error.message);
        }
    } finally {
        setLoading(false);
    };
};

// 로그아웃 요청
export const handleLogout = (confirmTxt, dispatch, navigate) => {
    const logoutConfirm = window.confirm(confirmTxt);
    if (logoutConfirm) {
        axios.get('/member/signOut')
        .then(response => {
            console.log(response.data);
            sessionStorage.removeItem('sessionID');
            dispatch({
                type: 'CLEAR_ALL_STATE',
            });
            navigate('/');

        }).catch(error => {
            if (error.response) {
                // 서버에서 받은 에러 메시지
                console.log('Server Error:', error.response.data);

            } else if (error.request) {
                // 요청이 전송되었지만 응답을 받지 못한 경우 
                console.log('Network Error:', error.request);

            } else {
                // 기타 에러
                console.log('Error:', error.message);
            }
        });
    }
};