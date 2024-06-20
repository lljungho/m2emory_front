import axios from "./axiosSet";
import basicAxios from "axios";

// 더미 계정 생성
export const setDummy = async () => {
    await axios.put('/member/dummy');
};

// 에러 핸들러
const handleError = (error, onError) => {
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

// formData check
const handleFormDataCheck = (formData, location) => {
    console.log(`${location} FormData Entries :`);
    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    };
};

// headers 설정
const jsonHeaders = {
    'Content-Type' : 'application/json',
};
const multipartHeaders = {
    'Content-Type' : 'multipart/form-data',
};


// 회원 가입 요청
export const signUpPostData = async (formData, dispatch, navigate, onError, t) => {
    handleFormDataCheck(formData, 'signUpPostData()');

    try {
        const response = await axios.post('/member/signUp', formData, { headers: jsonHeaders });
        console.log('[Axios] signUpPostData() success :', response.data, response.status);
        dispatch({
            type: 'SET_SIGN_STATE',
            signState: ''
        });
        alert(t('joinSuccess'));
        navigate('/');

    } catch(error) {
        handleError(error, onError);
    }
};

// 로그인 요청
export const signInPostData = async (formData, dispatch, navigate, onError, t) => {
    handleFormDataCheck(formData, 'signInPostData()');

    try {
        const response = await axios.post('/member/signIn', formData, { headers: jsonHeaders });
        console.log('[Axios] signInPostData() success :', response.data, response.status);
        alert('[ ' + response.data.userInfo.user_id + ' ] ' + t('welcome'));

        // 유저 정보 리듀서에 저장
        dispatch({
            type: 'SET_USER_INFO',
            payload: response.data.userInfo,
        });

        // 토큰 저장
        sessionStorage.setItem('sessionAuth', true);
        dispatch({
            type: 'SESSION_CHECK',
            sessionAuth: true,
        });
        navigate('/');

    } catch(error) {
        handleError(error, onError);
    }
};

// 로그아웃 요청
export const handleLogout = (dispatch, navigate, t) => {
    const logoutConfirm = window.confirm(t('logoutConfirm'));
    if (logoutConfirm) {
        axios.get('/member/signOut')
        .then(response => {
            console.log(response.data);
            sessionStorage.clear();
            dispatch({
                type: 'CLEAR_ALL_STATE',
            });
            navigate('/');

        }).catch(error => {
            handleError(error);
        });
    }
};

// 아이디 찾기 요청
export const forgotIdPostData = async (formData, onError) => {
    handleFormDataCheck(formData, 'forgotIdPostData()');

    try {
        const response = await axios.post('/member/forgotId', formData, { headers: jsonHeaders });
        console.log('[Axios] forgotIdPostData() success :', response.data, response.status);
        return response.data.user;

    } catch(error) {
        handleError(error, onError);
    }
};

// 비밀번호 찾기 요청
export const forgotPwPostData = async (formData, navigate, onError, t) => {
    handleFormDataCheck(formData, 'forgotIdPostData()');

    try {
        const response = await axios.post('/member/forgotPw', formData, { headers: jsonHeaders });
        console.log('[Axios] forgotPwPostData() success :', response.data, response.status);
        alert(t('forgotPwEmailSend'));
        navigate('/');

    } catch(error) {
        handleError(error, onError);
    }
};

// 비밀번호로 로그인 회원 확인 요청
export const passwordCheckPostData = async (formData, dispatch, onError) => {
    handleFormDataCheck(formData, 'passwordCheckPostData()');

    try {
        const response = await axios.post('/member/passwordCheck', formData, { headers: jsonHeaders });
        console.log('[Axios] passwordCheckPostData() success :', response.data, response.status);
        sessionStorage.setItem('accountCheck', true);
        dispatch({
            type: 'ACCOUNT_CHECK',
            accountCheck: true
        });

    } catch(error) {
        sessionStorage.removeItem('accountCheck');
        dispatch({
            type: 'ACCOUNT_CHECK',
            accountCheck: false
        });
        handleError(error, onError);
    }
};

 // 회원 확인되었는지 accountToken으로 확인 요청
 export const accountTokenGetData = async (state, dispatch) => {
    if (state) {
        console.log('accountTokenGetData()');
        try {
            const response = await basicAxios.get(`${process.env.REACT_APP_SERVER_URL}/member/accountCheck`, {withCredentials: true});
            console.log('[Axios] accountTokenGetData() success :', response.data, response.status);
            sessionStorage.setItem('accountCheck', true);
            dispatch({
                type: 'ACCOUNT_CHECK',
                accountCheck: true
            });
    
        } catch(error) {
            sessionStorage.removeItem('accountCheck');
            dispatch({
                type: 'ACCOUNT_CHECK',
                accountCheck: false
            });
            handleError(error);
        }
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
        sessionStorage.setItem('sessionAuth', true);
        dispatch({
            type: 'SESSION_CHECK',
            sessionAuth: true,
        });

    } catch(error) {
        handleError(error);
    } finally {
        setLoading(false);
    };
};

// 프로필 내용 수정 요청
export const modifyProfilePutData = async (formData, setCompareCheck, dispatch, onError, t) => {
    handleFormDataCheck(formData, 'modifyProfilePutData()');
    try {
        const response = await axios.put('/member/modifyProfile', formData, { headers: jsonHeaders });
        console.log('[Axios] modifyProfilePutData() success :', response.data, response.status);
        setCompareCheck(false);
        alert(t('profileUpdated'));

        // 유저 정보 리듀서에 저장
        dispatch({
            type: 'SET_PROFILE_INFO',
            user_pf_name: response.data.name,
            user_pf_introduction: response.data.introduction,
        });

    } catch( error) {
        handleError(error, onError);
    }
};

// 프로필 이미지 업로드 요청
export const modifyProfileImgPutData = async (formData, dispatch) => {
    handleFormDataCheck(formData, 'modifyProfileImgPutData()');

    try {
        const response = await axios.put('/upload/modifyProfileImg', formData, { headers: multipartHeaders });
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
            user_pf_img: response.data.user_pf_img,
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
            user_pf_img: null,
        });

    } catch(error) {
        handleError(error);
    }
};