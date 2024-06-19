import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { signInPostData } from '../../utils/axios/axiosUtils';

import SignInputBox from '../../utils/form/SignInputBox';
import SubmitBtnsBox from '../../utils/form/SubmitBtnsBox';

const SignInForm = () => {
    const { t } = useTranslation();
    const navigate  = useNavigate();
    const dispatch = useDispatch();

    // input
    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');

    // error regex state
    const [userIdErr, setUserIdErr] = useState('');
    const [userPasswordErr, setUserPasswordErr] = useState('');
    const [errorsCheck, setErrorsCheck] = useState(false);
    const [signErrorCheck, setSignErrorCheck] = useState(false);
    
    // 모든 에러 체크
    useEffect(() => {
        if (userIdErr !== "" && userPasswordErr !== "") {
            const allErrosCheck = !userIdErr && !userPasswordErr;
            setErrorsCheck(allErrosCheck);

        } else if (userIdErr === "" || userPasswordErr === "") {
            setErrorsCheck(false);
        }
    }, [userIdErr, userPasswordErr]);

    // 로그인 요청
    const postData = (e) => {
        e.preventDefault(); // submit으로 기본 이벤트 발생 막기

        let formData = new FormData();
        formData.append('userId', userId);
        formData.append('userPassword', userPassword);

        signInPostData(
            formData, 
            dispatch, 
            navigate, 
            handleErrorCallback, 
            t,
        );
    };

    const handleErrorCallback = () => {
        setSignErrorCheck(true);
    };

    return (
        <div className='signInfoBox signInBox'>
            <form onSubmit={postData}>
                <div className="signInputWrap">
                    <div className="signInputBox">
                        <SignInputBox 
                            type='text'
                            id='userId'
                            name='userId'
                            placeholder={t('id')}
                            setErr={setUserIdErr}
                            setState={setUserId}
                            value={userId}
                        />

                        <SignInputBox 
                            type='password'
                            id='userPassword'
                            name='userPassword'
                            placeholder={t('pw')}
                            setErr={setUserPasswordErr}
                            setState={setUserPassword}
                            value={userPassword}
                        />
                    </div>

                    {signErrorCheck && <div className='regexCK'>{t('joinError')}</div>}

                    <div className="signInputBox">
                        <SubmitBtnsBox 
                            errorsCheck={errorsCheck}
                            text={t('login')}
                        />
                        
                        <div className="sign_btns_box">
                            <Link to='/forgotId' className="small_TxtBtns" >{t('findId')}</Link>
                            <Link to='/forgotPw' className="small_TxtBtns" >{t('forgotPw')}</Link>
                        </div>
                    </div>
                </div>
            </form>                
            
            <div className="signBottomBox">
                <div className="signBottomInfoBox">
                    <p className="signBottomInfo">{t('unAccount')}</p>
                    <Link to='/signUp' className='txtBtns' >{t('signUp')}</Link>
                </div>
            </div>
        </div>
    )
}

export default SignInForm