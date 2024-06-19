import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { forgotPwPostData } from '../../utils/axios/axiosUtils';
import { Link, useNavigate } from 'react-router-dom';

import SignInputBox from '../../utils/form/SignInputBox';
import ContTitleBox from '../../include/contents/ContTitleBox';
import SubmitBtnsBox from '../../utils/form/SubmitBtnsBox';

const ForgotPwFrom = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // input
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');

    // error regex state
    const [userIdErr, setUserIdErr] = useState('');
    const [telErr, setTelErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [errorsCheck, setErrorsCheck] = useState(false);
    const [signErrorCheck, setSignErrorCheck] = useState(false);

    // 모든 에러 체크
    useEffect(() => {
        if (userIdErr !== "" && telErr !== "" && emailErr !== "") {
            const allErrosCheck = !userIdErr && !telErr && !emailErr;
            setErrorsCheck(allErrosCheck);

        } else if (userIdErr === "" || telErr === "" || emailErr === "") {
            setErrorsCheck(false);
        }
    }, [userIdErr, telErr, emailErr]);

    // 비밀번호 찾기 요청
    const postData = (e) => {
        e.preventDefault(); // submit으로 기본 이벤트 발생 막기

        let formData = new FormData();
        formData.append('userId', userId);
        formData.append('email', email);
        formData.append('tel', tel);

        forgotPwPostData(
            formData, 
            navigate, 
            handleErrorCallback, 
            t
        );
    };

    // 에러 핸들러
    const handleErrorCallback = () => {
        setSignErrorCheck(true);
        setErrorsCheck(false);
    };

    return (
        <div className='signInfoBox forgotBox'>
            <form onSubmit={postData}>
                <div className="signInputWrap">
                    <ContTitleBox title={t('forgotPw')} />
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
                            type='text'
                            id='email'
                            name='email'
                            placeholder={t('email')}
                            err={emailErr}
                            setErr={setEmailErr}
                            setState={setEmail}
                            value={email}
                        />

                        <SignInputBox 
                            type='text'
                            id='tel'
                            name='tel'
                            maxLength="13"
                            placeholder={t('tel')}
                            err={telErr}
                            setErr={setTelErr}
                            setState={setTel}
                            value={tel}
                        />
                    </div>

                    {signErrorCheck && <div className='regexCK'>{t('findIdErr')}</div>}

                    <div className="signInputBox">
                        <SubmitBtnsBox 
                            errorsCheck={errorsCheck}
                            text={t('forgotPw')}
                        />

                        <div className='sign_btns_box'>
                            <Link to='/' className='small_TxtBtns' >{t('login')}</Link>
                            <Link to='/forgotId' className='small_TxtBtns' >{t('findId')}</Link>
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

export default ForgotPwFrom