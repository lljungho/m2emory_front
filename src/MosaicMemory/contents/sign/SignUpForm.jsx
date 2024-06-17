import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { signUpPostData } from '../../utils/axios/axiosUtils';
import { useDispatch } from 'react-redux';
import GatherSvg from '../../utils/svg/GatherSvg';
import { Link } from 'react-router-dom';
import { setValidEmail, setValidId, setValidPw, setValidTel } from '../../utils/handler/handlerUtils';

const SignUpForm = () => {
    const { t } = useTranslation();
    const dispatch =useDispatch();

    // signup input
    const id = useRef(null);
    const pw = useRef(null);
    const tel = useRef(null);
    const email = useRef(null);

    // password view
    const [pwTyle, setPwType] = useState(false);

    const pwViewToggle = () => {
        setPwType(pwTyle => !pwTyle);
    };

    // error regex state
    const [idErr, setIdErr] = useState('');
    const [pwErr, setPwErr] = useState('');
    const [telErr, setTelErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [errorsCheck, setErrorsCheck] = useState(false);

    // input validation
    const isValidId = () => {
        setIdErr(!setValidId(id.current.value));
    };

    const isValidPw = () => {
        setPwErr(!setValidPw(pw.current.value));
    };

    const isValidEmail = () => {
        setEmailErr(!setValidEmail(email.current.value));
    };

    const isValidTel = () => {
        setTelErr(!setValidTel(tel));
    };

    useEffect(() => {
        // 모든 에러 체크
        if (idErr !== "" && pwErr !== "" && telErr !== "" && emailErr !== "") {
            const allErrosCheck = !idErr && !pwErr && !telErr && !emailErr;
            setErrorsCheck(allErrosCheck);

        } else if (idErr === "" || pwErr === "" || telErr === "" || emailErr === "") {
            setErrorsCheck(false);
        }
    }, [idErr, pwErr, telErr, emailErr]);

    // signup post form
    const postData = (e) => {
        e.preventDefault(); // submit 기본 이벤트 발생 막기

        let formData = new FormData();
        formData.append('id', id.current.value);
        formData.append('pw', pw.current.value);
        formData.append('tel', tel.current.value.replace(/-/g, ''));
        formData.append('email', email.current.value);

        signUpPostData(
            formData, 
            dispatch, 
            handleErrorCallback,
            t,
        );
    };

    // 에러 처리
    const handleErrorCallback = () => {
        console.log('[Axios] signUpPostData() communication error');
        alert(t('alreadyID'));
        id.current.value = '';
        pw.current.value = '';
        setIdErr('');
        setPwErr('');
        id.current.focus();
    };

    return (
        <div className="signInfoBox signUpBox">
            <form onSubmit={postData}>
                <div className="signInputWrap">
                    <div className="signInputBox">
                        <label htmlFor="id" className="signInfoInput innerElement">
                            <div className={`signInputInfoBox ${!idErr ? '' : 'regexCK_box'}`}>
                                <GatherSvg name='profile' color={!idErr ? null : '#ff3f3f'} title={t('id')} />
                                <input type="text" name="id" id="id" ref={id} maxLength="16" autoComplete="id" className="signInput" onInput={isValidId} 
                                placeholder={t('id')} />
                            </div>
                            {idErr && <div className='regexCK'>{t('formIdRegEx')}</div>}
                        </label>

                        <label htmlFor="pw" className="signInfoInput innerElement">
                            <div className={`signInputInfoBox ${!pwErr ? '' : 'regexCK_box'}`}>
                                <GatherSvg name='rock' color={!pwErr ? null : '#ff3f3f'} title={t('pw')} />
                                <input type={pwTyle ? "text" : "password"} name="pw" id="pw" ref={pw} maxLength="16" autoComplete='new-password' className="signInput" onInput={isValidPw} placeholder={t('pw')} />
                                <div className="funcBtnsBox">
                                    <div className="funcBtn on" onClick={pwViewToggle}>
                                        <GatherSvg name={pwTyle ? 'openEye' : 'closeEye'} color="var(--color6)" title={t('pwView')} />
                                    </div>
                                </div>
                            </div>
                            {pwErr && <div className='regexCK'>{t('formPwRegEx')}</div>}
                        </label>                        

                        <label htmlFor="email" className="signInfoInput innerElement">
                            <div className={`signInputInfoBox ${!emailErr ? '' : 'regexCK_box'}`}>
                                <GatherSvg name='message' color={!emailErr ? 'var(--baseRGB_b)' : '#ff3f3f'} title={t('email')} />
                                <input type="text" name="email" id="email" ref={email} className="signInput" onInput={isValidEmail} placeholder={t('email')} />
                            </div>
                            {emailErr && <div className='regexCK'>{t('formEmailRegEx')}</div>}
                        </label>

                        <label htmlFor="tel" className="signInfoInput innerElement">
                            <div className={`signInputInfoBox ${!telErr ? '' : 'regexCK_box'}`}>
                                <GatherSvg name='phone' color={!telErr ? 'var(--baseRGB_b)' : '#ff3f3f'} title={t('tel')} />
                                <input type="text" name="tel" id="tel" ref={tel} maxLength="13" autoComplete="off" className="signInput" onInput={isValidTel} placeholder={t('tel')} />
                            </div>
                            {telErr && <div className='regexCK'>{t('formTelRegEx')}</div>}
                        </label>
                    </div>

                    <div className="signInputBox">
                        <div className="btns_box">
                            { errorsCheck ?
                                <button type="submit" className='btns on'>{t('signUp')}</button>
                            :
                                <button type='button' className='btns'>{t('signUp')}</button>
                            }
                        </div>
                    </div>
                </div>
            </form> 

            <div className="signBottomBox">
                <div className="signBottomInfoBox">
                    <p className="signBottomInfo">{t('account')}</p>
                    <Link to='/' className='txtBtns' >{t('login')}</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm