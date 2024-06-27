import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { accountPutData, userGetData } from '../../utils/axios/axiosUtils';
import { useNavigate } from 'react-router-dom';

import SignInputBox from '../../utils/form/SignInputBox';
import SubmitBtnsBox from '../../utils/form/SubmitBtnsBox';

const AccountSettings = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // input
    const [pw, setPw] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');

    // error regex state
    const [pwErr, setPwErr] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [telErr, setTelErr] = useState(false);
    const [errorsCheck, setErrorsCheck] = useState(false);

    // 모든 에러 체크
    useEffect(() => {
        if (pwErr !== "" && telErr !== "" && emailErr !== "") {
            const allErrosCheck = !pwErr && !telErr && !emailErr;
            setErrorsCheck(allErrosCheck);

        } else if (pwErr === "" || telErr === "" || emailErr === "") {
            setErrorsCheck(false);
        }
    }, [pwErr, telErr, emailErr]);

    // 유저 정보 요청
    useEffect(() => {
        console.log('accountCheck userInfo');
        const getData = async () => {
            try {
                const user = await userGetData(null, null, navigate, true);
                if (user) {
                    setEmail(user.user_email || '');
                    setTel(user.user_tel || '');
                }

            } catch(error) {
                console.log(error);
            }
        };
        getData();
    }, [navigate]);

    // 계정 정보 수정 요청
    const putData = () => {
        let formData = new FormData();
        formData.append('pw', pw);
        formData.append('email', email);
        formData.append('tel', tel);

        accountPutData(
            formData,
            navigate,
            t,
        );
    };

    return (
        <>
            <div className="contentInfoBox wrapElement">
                <p className="content_sub_title">{t('modifyInfomation')}</p>

                <div className='signInfoBox signInBox'>
                    <div className="signInputWrap">
                        <div className="signInputBox">
                            <form>
                                <input type="text" name="username" autoComplete='username' className='displayNone' disabled />
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
                            </form>

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
                    </div>
                </div>
            </div>

            <div className="signInputBox">
                <SubmitBtnsBox 
                    errorsCheck={errorsCheck}
                    text={t('modify')}
                    onClick={putData}
                />
            </div>
        </>
    )
}

export default AccountSettings