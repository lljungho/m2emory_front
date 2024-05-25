import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GatherSvg from '../../../utils/svg/GatherSvg';
import axios from '../../../utils/axios/axiosSet';
import { useDispatch } from 'react-redux';

const SignInForm = ({ setSignType }) => {
    const { t } = useTranslation();
    const Tid = t('id');
    const Tpw = t('pw');
    const Tlogin = t('login');
    const TsignUp = t('signUp');
    const TfindId = t('findId');
    const TforgotPw = t('forgotPw');
    const TunAccount = t('unAccount');
    const TpwView = t('pwView');
    const Twelcome = t('welcome');
    const TjoinError = t('joinError');

    const navigate  = useNavigate();

    // redux
    const dispatch = useDispatch();

    // sign Type
    const signTypeToggle = () => {
        setSignType(signType => !signType);
    }

    // signin input
    const userId = useRef(null);
    const userPassword = useRef(null);

    // password view
    const [userPasswordType, setUserPasswordType] = useState(false);

    const pwViewToggle = () => {
        setUserPasswordType(!userPasswordType);
    };

    // error regex state
    const [userIdErr, setUserIdErr] = useState('');
    const [userPasswordErr, setUserPasswordErr] = useState('');
    const [errorsCheck, setErrorsCheck] = useState(false);
    const [signErrorCheck, setSignErrorCheck] = useState(false);

    // input validation
    const isValidId = () => {
        const isValid = userId.current.value.length > 2;
        setUserIdErr(!isValid);
        return isValid;
    };

    const isValidPw = () => {
        const isValid = userPassword.current.value.length > 4;
        setUserPasswordErr(!isValid);
        return isValid;
    };

    useEffect(() => {
        // 모든 에러 체크
        if (userIdErr !== "" && userPasswordErr !== "") {
            const allErrosCheck = !userIdErr && !userPasswordErr;
            setErrorsCheck(allErrosCheck);

        } else if (userIdErr === "" || userPasswordErr === "") {
            setErrorsCheck(false);
        }
    }, [userIdErr, userPasswordErr]);

    // signin post form
    const postData = async (e) => {
        e.preventDefault(); // submit으로 기본 이벤트 발생 막기
        console.log("[Axios] postFormData()");

        let formData = new FormData();
        formData.append('userId', userId.current.value);
        formData.append('userPassword', userPassword.current.value);
        
        console.log('FormData Entries:');
        for (const [key, value] of formData.entries()) {
            console.log(`${key} : ${value}`);
        };

        try {
            const response = await axios.post('/member/signIn', formData, {
                headers: {
                    'Content-Type' : 'application/json',
                }
            });
            
            console.log("[Axios] post form data communication success!!");
            console.log(response.data);
            console.log(response.status);

            alert('[ ' + response.data.userInfo.u_id + ' ] ' + Twelcome);

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
            console.log("[Axios] post form data communication error!!");
            console.error(error.config);

            if (error.response.status === 401) { // 회원 정보가 없거나 id, pw가 맞지 않음
                console.log(error.response.status);
                return setSignErrorCheck(true);
            }
            
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
        }
    };

    return (
        <div className='signInfoBox signInBox'>
            <form onSubmit={postData}>
                <div className="loginWrap">
                    <div className="loginBox">
                        <div className="loginInputBox">
                            <label htmlFor="userId" className='loginInput'>
                                <GatherSvg name='profile' title={Tid} />
                                <input type="text" name="userId" id="userId" ref={userId} autoComplete="id" className="login_input" onInput={isValidId} placeholder={Tid} />
                            </label>
                        </div>
                        <div className="loginInputBox">
                            <label htmlFor="userPassword" className='loginInput'>
                                <GatherSvg name='rock' title={Tpw} />
                                <input type={userPasswordType ? "text" : "password"} name="userPassword" id="userPassword" ref={userPassword} autoComplete="new-password" onInput={isValidPw} className="login_input" placeholder={Tpw} />
                                <div className="funcBtnsBox">
                                    <div className="funcBtn on" onClick={pwViewToggle}>
                                        <GatherSvg name={userPasswordType ? 'openEye' : 'closeEye'} color="var(--color6)" title={TpwView} />
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>

                    {signErrorCheck && <div className='regexCK'>{TjoinError}</div>}

                    <div className="loginBox">
                        <div className="btns_box">
                            { errorsCheck ?
                                <button type="submit" className='btns'>{Tlogin}</button>
                            :
                                <button type='button' className='btns off'>{Tlogin}</button>
                            }
                        </div>
                        <div className="loginBottomBox">
                            <span className="small_TxtBtns">{TfindId}</span>
                            <span className="small_TxtBtns">{TforgotPw}</span>
                        </div>
                    </div>
                </div>
            </form>                
            
            <div className="joinBox">
                <div className="joinInfo">
                    <p className="joinTxt">{TunAccount}</p>
                    <span className='TxtBtns' onClick={signTypeToggle}>{TsignUp}</span>
                </div>
            </div>
        </div>
    )
}

export default SignInForm