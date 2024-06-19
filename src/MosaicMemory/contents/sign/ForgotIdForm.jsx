import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { forgotIdPostData } from '../../utils/axios/axiosUtils';
import { Link } from 'react-router-dom';
import { useFormatDate, useMaskedString } from '../../utils/hook/customHookUtils';

import SignInputBox from '../../utils/form/SignInputBox';
import ContTitleBox from '../../include/contents/ContTitleBox';
import SubmitBtnsBox from '../../utils/form/SubmitBtnsBox';

const ForgotIdForm = () => {
    const { t } = useTranslation();
    const [userRows, setUserRows] = useState('');
    const { maskedLast } = useMaskedString();
    const { yyyymmdd } = useFormatDate();

    // input
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');

    // error regex state
    const [telErr, setTelErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [errorsCheck, setErrorsCheck] = useState(false);
    const [signErrorCheck, setSignErrorCheck] = useState(false);

    // 모든 에러 체크
    useEffect(() => {
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
        formData.append('email', email);
        formData.append('tel', tel);

        const userData = await forgotIdPostData(
            formData, 
            handleErrorCallback,
        );
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
                    </>
                    }

                    <div className="signInputBox">
                        { userRows ? 
                        null
                        :
                        <SubmitBtnsBox 
                            errorsCheck={errorsCheck}
                            text={t('findId')}
                        />
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