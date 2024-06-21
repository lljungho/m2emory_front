import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { signUpPostData } from '../../utils/axios/axiosUtils';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import ContTitleBox from '../../include/contents/ContTitleBox';
import SubmitBtnsBox from '../../utils/form/SubmitBtnsBox';
import SignInputBox from '../../utils/form/SignInputBox';

const SignUpForm = () => {
    const { t } = useTranslation();
    const dispatch =useDispatch();
    const navigate  = useNavigate();

    // input
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');

    // error regex state
    const [idErr, setIdErr] = useState('');
    const [pwErr, setPwErr] = useState('');
    const [telErr, setTelErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [errorsCheck, setErrorsCheck] = useState(false);

    // 모든 에러 체크
    useEffect(() => {
        if (idErr !== "" && pwErr !== "" && telErr !== "" && emailErr !== "") {
            const allErrosCheck = !idErr && !pwErr && !telErr && !emailErr;
            setErrorsCheck(allErrosCheck);

        } else if (idErr === "" || pwErr === "" || telErr === "" || emailErr === "") {
            setErrorsCheck(false);
        }
    }, [idErr, pwErr, telErr, emailErr]);

    // 회원가입 요청
    const postData = (e) => {
        e.preventDefault(); // submit 기본 이벤트 발생 막기

        let formData = new FormData();
        formData.append('id', id);
        formData.append('pw', pw);
        formData.append('tel', tel);
        formData.append('email', email);

        signUpPostData(
            formData, 
            dispatch, 
            navigate,
            handleErrorCallback,
            t,
        );
    };

    // 에러 처리
    const handleErrorCallback = () => {
        console.log('[Axios] signUpPostData() communication error');
        alert(t('alreadyID'));
        setId('');
        setPw('');
        setIdErr('');
        setPwErr('');
    };

    return (
        <div className="signInfoBox signUpBox">
            <form onSubmit={postData}>
                <div className="signInputWrap">
                    <ContTitleBox title={t('signUp')} />
                    <div className="signInputBox">
                        <SignInputBox 
                            type='text'
                            id='id'
                            name='id'
                            maxLength='16'
                            placeholder={t('id')}
                            err={idErr}
                            setErr={setIdErr}
                            setState={setId}
                            value={id}
                        />

                        <SignInputBox 
                            type='password'
                            id='pw'
                            name='pw'
                            maxLength='16'
                            placeholder={t('pw')}
                            err={pwErr}
                            setErr={setPwErr}
                            setState={setPw}
                            value={pw}
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

                    <div className="signInputBox">
                        <SubmitBtnsBox 
                            errorsCheck={errorsCheck}
                            text={t('signUp')}
                        />
                    </div>
                </div>
            </form> 

            <div className="signBottomBox">
                <div className="signBottomInfoBox">
                    <p className="signBottomInfo">{t('accountOk')}</p>
                    <Link to='/' className='txtBtns' >{t('login')}</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm