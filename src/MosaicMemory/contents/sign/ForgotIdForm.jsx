import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import GatherSvg from '../../utils/svg/GatherSvg'
import { setValidEmail, setValidTel } from '../../utils/handler/handlerUtils';
import { forgotIdPostData } from '../../utils/axios/axiosUtils';
import { Link } from 'react-router-dom';
import { useFormatDate, useMaskedString } from '../../utils/hook/customHookUtils';

import ContTitleBox from '../../include/contents/ContTitleBox';

const ForgotIdForm = () => {
    const { t } = useTranslation();
    const tel = useRef(null);
    const email = useRef(null);
    const [telErr, setTelErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [errorsCheck, setErrorsCheck] = useState(false);
    const [signErrorCheck, setSignErrorCheck] = useState(false);
    const [userRows, setUserRows] = useState('');
    const { maskedLast } = useMaskedString();
    const { yyyymmdd } = useFormatDate();

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

    // 아이디 찾기 요청
    const postData = async (e) => {
        e.preventDefault(); // submit으로 기본 이벤트 발생 막기

        let formData = new FormData();
        formData.append('email', email.current.value);
        formData.append('tel', tel.current.value);

        const userData = await forgotIdPostData(formData, handleErrorCallback);
        if (userData) {
            console.log('userData :', userData );
            setUserRows(userData);
        }
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
                    <ContTitleBox title={t('findId')} />
                    { userRows ? 
                    <>
                    <p className="resultTxt">{t('findIdResult')}</p>
                    <div className="resultBox innerElement">
                        {userRows.map((user, index) => (
                        <div className="resultInfoBox" key={index} >
                            {console.log(user.user_id, user.reg_date)}
                            <p className="result bold">{maskedLast(user.user_id)}</p>
                            <p className="result">{yyyymmdd(user.reg_date)}</p>
                        </div>
                        ))}
                    </div>
                    </>
                    :
                    <>
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
                    </>
                    }

                    <div className="signInputBox">
                        { userRows ? 
                        null
                        :
                        <div className="btns_box">
                            { errorsCheck ?
                                <button type="submit" className='btns on'>{t('findId')}</button>
                            :
                                <button type='button' className='btns'>{t('findId')}</button>
                            }
                        </div>
                        }

                        <div className={`sign_btns_box ${userRows ? 'btnsChange' : ''}`}>
                            <Link to='/' className={ userRows ? 'btns on' : 'small_TxtBtns'} >{t('login')}</Link>
                            <Link to='/forgotPw' className={ userRows ? 'btns on' : 'small_TxtBtns'} >{t('forgotPw')}</Link>
                        </div>
                    </div>
                </div>
            </form>

            <div className="signBottomBox">
                <div className="signBottomInfoBox">
                    { !userRows && <p className="signBottomInfo">{t('unAccount')}</p> }
                    <Link to='/signUp' className='txtBtns' >{t('signUp')}</Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotIdForm