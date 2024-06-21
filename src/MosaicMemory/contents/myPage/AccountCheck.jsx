import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { accountTokenGetData, passwordCheckPostData } from '../../utils/axios/axiosUtils';

import ContTitleBox from '../../include/contents/ContTitleBox'
import SubmitBtnsBox from '../../utils/form/SubmitBtnsBox';
import AccountSettings from './AccountSettings';
import SignInputBox from '../../utils/form/SignInputBox';

const AccountCheck = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const pwCheck = useSelector(store => store.sessionCheck.accountCheck);

    // input
    const [userPassword, setUserPassword] = useState('');

    // error regex state
    const [userPasswordErr, setUserPasswordErr] = useState('');
    const [errorsCheck, setErrorsCheck] = useState(false);
    const [signErrorCheck, setSignErrorCheck] = useState(false);

    // 모든 에러 체크
    useEffect(() => {
        if (userPasswordErr !== "") {
            const allErrosCheck = !userPasswordErr;
            setErrorsCheck(allErrosCheck);

        } else if (userPasswordErr === "") {
            setErrorsCheck(false);
        }
    }, [userPasswordErr]);

    // 회원 확인되었는지 accountToken으로 확인 요청
    useEffect(() => {
        accountTokenGetData(pwCheck, dispatch);
    }, [pwCheck, dispatch]);

    // 회원 확인 요청
    const postData = (e) => {
        e.preventDefault(); // submit으로 기본 이벤트 발생 막기

        let formData = new FormData();
        formData.append('userPassword', userPassword);

        passwordCheckPostData(
            formData,  
            dispatch,
            handleErrorCallback
        );
    };

    const handleErrorCallback = () => {
        setSignErrorCheck(true);
    };

    return (
        <div className='content_info_box'>
            <ContTitleBox
                title={t('accountSet')}
                back={true}
            />

            { pwCheck ?
            <AccountSettings />
            :
            <form onSubmit={postData}>
                <div className="contentInfoBox wrapElement">
                    <p className="content_sub_title">{t('pw')}</p>

                    <div className='signInfoBox signInBox'>
                        <div className="signInputWrap">
                            <div className="signInputBox">
                                <input type="text" name="username" autoComplete='username' className='displayNone' disabled />
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
                            
                            {signErrorCheck && <div className='regexCK'>{t('memberInputErr')}</div>}
                        </div>
                    </div>
                </div>

                <div className="signInputBox">
                    <SubmitBtnsBox
                        errorsCheck={errorsCheck}
                        text={t('check')}
                    />
                </div>
            </form>
            }

        </div>
    )
}

export default AccountCheck