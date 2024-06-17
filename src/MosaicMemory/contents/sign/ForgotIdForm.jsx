import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import GatherSvg from '../../utils/svg/GatherSvg'
import { setValidEmail, setValidTel } from '../../utils/handler/handlerUtils';
import { signInPostData } from '../../utils/axios/axiosUtils';

const ForgotIdForm = () => {
    const { t } = useTranslation();
    const tel = useRef(null);
    const email = useRef(null);
    const [telErr, setTelErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [errorsCheck, setErrorsCheck] = useState(false);
    const [signErrorCheck, setSignErrorCheck] = useState(false);

    const isValidEmail = () => {
        setEmailErr(!setValidEmail(email.current.value));
    };

    const isValidTel = () => {
        setTelErr(!setValidTel(tel));
    };

    useEffect(() => {
        // 모든 에러 체크
        if (telErr !== "" && emailErr !== "") {
            const allErrosCheck = !telErr && !emailErr;
            setErrorsCheck(allErrosCheck);

        } else if (telErr === "" || emailErr === "") {
            setErrorsCheck(false);
        }
    }, [telErr, emailErr]);

    // signin post form
    const postData = (e) => {
        e.preventDefault(); // submit으로 기본 이벤트 발생 막기

        let formData = new FormData();
        formData.append('email', email.current.value);
        formData.append('tel', tel.current.value);

        signInPostData(
            formData, 
            handleErrorCallback, 
            t,
        );
    };

    const handleErrorCallback = () => {
        setSignErrorCheck(true);
    };

    return (
        <div className='signInfoBox forgotBox'>
            <form onSubmit={postData}>
                <div className="signInputWrap">
                    <div className="signInputBox">
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

                    {signErrorCheck && <div className='regexCK'>{t('joinError')}</div>}

                    <div className="signInputBox">
                        <div className="btns_box">
                            { errorsCheck ?
                                <button type="submit" className='btns on'>{t('findId')}</button>
                            :
                                <button type='button' className='btns'>{t('findId')}</button>
                            }
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ForgotIdForm