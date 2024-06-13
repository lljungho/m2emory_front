import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GatherSvg from '../../utils/svg/GatherSvg';
import { useDispatch } from 'react-redux';
import { signInPostData } from '../../utils/axios/axiosUtils';
import { setSignFrom } from '../../utils/handler/handlerUtils';

const SignInForm = ({ signState }) => {
    const { t } = useTranslation();
    const navigate  = useNavigate();
    const dispatch = useDispatch();

    // sign Type
    const signTypeToggle = () => {
        setSignFrom(signState, dispatch);
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
    const postData = (e) => {
        e.preventDefault(); // submit으로 기본 이벤트 발생 막기

        let formData = new FormData();
        formData.append('userId', userId.current.value);
        formData.append('userPassword', userPassword.current.value);

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
                <div className="loginWrap">
                    <div className="loginBox">
                        <label htmlFor="userId" className="loginInputBox innerElement">
                            <div className='loginInput'>
                                <GatherSvg name='profile' title={t('id')} />
                                <input type="text" name="userId" id="userId" ref={userId} autoComplete="id" className="login_input" onInput={isValidId} placeholder={t('id')} />
                            </div>
                        </label>
                        <label htmlFor="userPassword" className="loginInputBox innerElement">
                            <div className='loginInput'>
                                <GatherSvg name='rock' title={t('pw')} />
                                <input type={userPasswordType ? "text" : "password"} name="userPassword" id="userPassword" ref={userPassword} autoComplete="new-password" onInput={isValidPw} className="login_input" placeholder={t('pw')} />
                                <div className="funcBtnsBox">
                                    <div className="funcBtn on" onClick={pwViewToggle}>
                                        <GatherSvg name={userPasswordType ? 'openEye' : 'closeEye'} color="var(--color6)" title={t('pwView')} />
                                    </div>
                                </div>
                            </div>
                        </label>
                    </div>

                    {signErrorCheck && <div className='regexCK'>{t('joinError')}</div>}

                    <div className="loginBox">
                        <div className="btns_box">
                            { errorsCheck ?
                                <button type="submit" className='btns on'>{t('login')}</button>
                            :
                                <button type='button' className='btns'>{t('login')}</button>
                            }
                        </div>
                        <div className="loginBottomBox">
                            <span className="small_TxtBtns">{t('findId')}</span>
                            <span className="small_TxtBtns">{t('forgotPw')}</span>
                        </div>
                    </div>
                </div>
            </form>                
            
            <div className="joinBox">
                <div className="joinInfo">
                    <p className="joinTxt">{t('unAccount')}</p>
                    <span className='txtBtns' onClick={signTypeToggle}>{t('signUp')}</span>
                </div>
            </div>
        </div>
    )
}

export default SignInForm