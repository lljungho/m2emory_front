import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { signUpPostData } from '../../utils/axios/axiosUtils';
import { useDispatch } from 'react-redux';
import GatherSvg from '../../utils/svg/GatherSvg';
import { setSignFrom } from '../../utils/handler/handlerUtils';


const SignUpForm = ({ signState }) => {
    const { t } = useTranslation();
    const dispatch =useDispatch();

    // sign form 변경
    const signTypeToggle = () => {
        setSignFrom(signState, dispatch);
    }

    // signup input
    const id = useRef(null);
    const pw = useRef(null);
    const email = useRef(null);

    // password view
    const [pwTyle, setPwType] = useState(false);

    const pwViewToggle = () => {
        setPwType(pwTyle => !pwTyle);
    };

    // error regex state
    const [idErr, setIdErr] = useState('');
    const [pwErr, setPwErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [errorsCheck, setErrorsCheck] = useState(false);

    // input validation
    const isValidId = () => {
        const regex = /^[a-z0-9_-]{5,16}$/; // 소문자알파벳, 숫자, 하이픈, 밑줄
        const isValid = regex.test(id.current.value);
        setIdErr(!isValid);
        return isValid;
    };

    const isValidPw = () => {
        const regex = /^(?=.*[a-zA-Z])(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,16}$/; // 8자 이상의 영문 대소문자 중 최소 1개, 특수문자 최소 1개, 숫자 선택 입력
        const isValid = regex.test(pw.current.value);
        setPwErr(!isValid);
        return isValid;
    };

    const isValidEmail = () => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z.]{2,5}$/; // 로컬파트와 도메인은 영문, 숫자, 정해진 특수문자/ TLD는 영문, "."를 포함할 수 있고 2~5자
        const isValid = regex.test(email.current.value);
        setEmailErr(!isValid);
        return isValid;
    };

    useEffect(() => {
        // 모든 에러 체크
        if (idErr !== "" && pwErr !== "" && emailErr !== "") {
            const allErrosCheck = !idErr && !pwErr && !emailErr;
            setErrorsCheck(allErrosCheck);

        } else if (idErr === "" || pwErr === "" || emailErr === "") {
            setErrorsCheck(false);
        }
    }, [idErr, pwErr, emailErr]);

    // signup post form
    const postData = (e) => {
        e.preventDefault(); // submit 기본 이벤트 발생 막기

        let formData = new FormData();
        formData.append('id', id.current.value);
        formData.append('pw', pw.current.value);
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
                <div className="loginWrap">
                    <div className="loginBox">
                        <label htmlFor="id" className="loginInputBox innerElement">
                            <div className={`loginInput ${!idErr ? '' : 'regexCK_box'}`}>
                                <GatherSvg name='profile' color={!idErr ? null : '#ff3f3f'} title={t('id')} />
                                <input type="text" name="id" id="id" ref={id} maxLength="16" autoComplete="id" className="login_input" onInput={isValidId} 
                                placeholder={t('id')} />
                            </div>
                            {idErr && <div className='regexCK'>{t('formIdRegEx')}</div>}
                        </label>
                        <label htmlFor="pw" className="loginInputBox innerElement">
                            <div className={`loginInput ${!pwErr ? '' : 'regexCK_box'}`}>
                                <GatherSvg name='rock' color={!pwErr ? null : '#ff3f3f'} title={t('pw')} />
                                <input type={pwTyle ? "text" : "password"} name="pw" id="pw" ref={pw} maxLength="16" autoComplete='new-password' className="login_input" onInput={isValidPw} placeholder={t('pw')} />
                                <div className="funcBtnsBox">
                                    <div className="funcBtn on" onClick={pwViewToggle}>
                                        <GatherSvg name={pwTyle ? 'openEye' : 'closeEye'} color="var(--color6)" title={t('pwView')} />
                                    </div>
                                </div>
                            </div>
                            {pwErr && <div className='regexCK'>{t('formPwRegEx')}</div>}
                        </label>
                        <label htmlFor="email" className="loginInputBox innerElement">
                            <div className={`loginInput ${!emailErr ? '' : 'regexCK_box'}`}>
                                <GatherSvg name='message' color={!emailErr ? 'var(--baseRGB_b)' : '#ff3f3f'} title={t('email')} />
                                <input type="text" name="email" id="email" ref={email} className="login_input" onInput={isValidEmail} placeholder={t('email')} />
                            </div>
                            {emailErr && <div className='regexCK'>{t('formEmailRegEx')}</div>}
                        </label>
                    </div>

                    <div className="loginBox">
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

            <div className="joinBox">
                <div className="joinInfo">
                    <p className="joinTxt">{t('account')}</p>
                    <span className='txtBtns' onClick={signTypeToggle}>{t('signUp')}</span>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm