import axios from "./axiosSet";

// 에러 핸들러
export const handleError = (error, onError) => {
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

    if (onError) {
        onError();
    }
};

// 회원 가입 요청
export const signUpPostData = async (formData, signState, onError, t) => {
    console.log('signUpPostData()');
    console.log('FormData Entries:');
    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    };

    try {
        const response = await axios.post('/member/signUp', formData, {
            headers: {
                'Content-Type' : 'application/json'
            }
        });

        console.log('[Axios] signUpPostData() success :', response.data, response.status);
        signState(false);
        alert(t('joinSuccess'));

    } catch(error) {
        handleError(error, onError);
    }
};

// 로그인 요청
export const signInPostData = async (formData, dispatch, navigate, onError, t) => {
    console.log('signInPostData()');
    console.log('FormData Entries:');
    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    };

    try {
        const response = await axios.post('/member/signIn', formData, {
            headers: {
                'Content-Type' : 'application/json'
            }
        });

        console.log('[Axios] signInPostData() success :', response.data, response.status);
        alert('[ ' + response.data.userInfo.u_id + ' ] ' + t('welcome'));

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
        navigate('/');

    } catch(error) {
        if (error.response.status === 400) {
            handleError(error, onError);
        } else {
            handleError(error);
        }
    }
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
            handleError(error);
        });
    }
};

// 유저 정보 요청
export const userGetData = async (setLoading, dispatch) => {
    console.log('userGetData()');
    setLoading(true);
    try {
        const response = await axios.get('/member/userInfo');
        console.log('[Axios] userGetData() success :', response.data, response.status);

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
        handleError(error);
    } finally {
        setLoading(false);
    };
};

// 프로필 내용 수정 요청
export const modifyProfilePutData = async (formData, setCompareCheck, dispatch, onError, t) => {
    console.log('modifyProfilePutData()');
    console.log('FormData Entries:');
    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    };

    try {
        const response = await axios.put('/member/modifyProfile', formData, {
            headers: {
                'Content-Type' : 'application/json'
            }
        });

        console.log('[Axios] modifyProfilePutData() success :', response.data, response.status);
        setCompareCheck(false);
        alert(t('profileUpdated'));

        // 유저 정보 리듀서에 저장
        dispatch({
            type: 'SET_PROFILE_INFO',
            u_pf_name: response.data.name,
            u_pf_introduction: response.data.introduction,
        });

    } catch( error) {
        handleError(error, onError);
    }
};

// 프로필 이미지 업로드 요청
export const modifyProfileImgPutData = async (formData, dispatch) => {
    console.log("modifyProfileImgPutData()");
    try {
        const response = await axios.put('/upload/modifyProfileImg', formData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        });

        console.log('[Axios] modifyProfileImgPutData() success :', response.data, response.status);

        // 팝업 닫기 및 리듀서 프로필 이미지 수정
        dispatch({
            type: 'SET_DIMMED_STATE',
            dimmedState: false,
        });
        dispatch({
            type: 'SET_MODAL_CONTENTS',
            modalContents: '',
        });
        dispatch({
            type: 'SET_PROFILE_IMG',
            u_pf_img: response.data.u_pf_img,
        });

    } catch(error) {
        handleError(error);
    }
};

// 프로필 이미지 제거 요청
export const deleteProfileImg = async (dispatch) => {
    console.log("deleteProfileImg()");

    try {
        await axios.delete('/upload/deleteProfileImg');

        console.log('[Axios] deleteProfileImg() succsess');

        // 팝업 닫기 및 리듀서 프로필 이미지 수정
        dispatch({
            type: 'SET_DIMMED_STATE',
            dimmedState: false,
        });
        dispatch({
            type: 'SET_MODAL_CONTENTS',
            modalContents: '',
        });
        dispatch({
            type: 'SET_PROFILE_IMG',
            u_pf_img: null,
        });

    } catch(error) {
        handleError(error);
    }
};