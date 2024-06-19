import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { setValidEmail, setValidId, setValidPw, setValidTel } from '../handler/handlerUtils';

import GatherSvg from '../svg/GatherSvg'

const IdInputBox = ({ type, id, name, maxLength, placeholder, err, setErr, setState, value }) => {
    const { t } = useTranslation();

    // password view
    const [pwType, setPwType] = useState(false);

    const pwViewToggle = () => {
        setPwType(pwType => !pwType);
    };

    // input validation
    const isValidId = (e) => { // 회원가입 아이디 유효성 검사
        const value = e.target.value;
        setErr(!setValidId(value));
        setState(value);
    };

    const isValidPw = (e) => { // 회원가입 비밀번호 유효성 검사
        const value = e.target.value;
        setErr(!setValidPw(value));
        setState(value);
    };

    const isValidEmail = (e) => { // 회원가입 이메일 유효성 검사
        const value = e.target.value;
        setErr(!setValidEmail(value));
        setState(value);
    };

    const isValidTel = (e) => { // 회원가입 연락처 유효성 검사
        const value = e.target.value;
        const { isValid, telValue } = setValidTel(value);
        setErr(!isValid);
        setState(telValue);
    };

    const isValidUserId = (e) => { // 로그인 아이디 유효성 검사
        const isValid = e.target.value.length > 2;
        setErr(!isValid);
        setState(e.target.value);
    };

    const isValidUserPw = (e) => { // 로그인 비밀번호 유효성 검사
        const isValid = e.target.value.length > 4;
        setErr(!isValid);
        setState(e.target.value);
    };

    return (
        <label htmlFor={id} className="signInfoInput innerElement">
            <div className={`signInputInfoBox ${!err ? '' : 'regexCK_box'}`}>
                <GatherSvg 
                    name={
                        name === 'id' || name === 'userId' 
                        ? 'profile' 
                        : name === 'pw' || name === 'userPassword' 
                        ? 'rock' 
                        : name === 'email' 
                        ? 'message' 
                        : 'phone'
                    } 
                    color={!err ? 'var(--baseRGB_b)' : '#ff3f3f'}
                    title={name === 'userId' ? placeholder : t(name)} 
                />
                <input 
                    type={type === 'password' && pwType ? 'text' : type}
                    name={name}
                    id={id} 
                    maxLength={maxLength}
                    autoComplete={
                        name === 'id' || name === 'userId' 
                        ? 'id' 
                        : name === 'pw' || name === 'userPassword'
                        ? 'new-password' 
                        : name === 'email' 
                        ? 'email' 
                        : 'off'
                    } 
                    className="signInput" 
                    onInput={
                        name === 'id' 
                        ? isValidId 
                        : name === 'userId' 
                        ? isValidUserId 
                        : name === 'pw' 
                        ? isValidPw 
                        : name === 'userPassword'
                        ? isValidUserPw
                        : name === 'email' 
                        ? isValidEmail 
                        : isValidTel
                    } 
                    placeholder={placeholder} 
                    value={value}
                />

                { type === 'password' &&  
                <div className="funcBtnsBox">
                    <div className="funcBtn on" onClick={pwViewToggle}>
                        <GatherSvg name={pwType ? 'openEye' : 'closeEye'} color="var(--color6)" title={t('pwView')} />
                    </div>
                </div>    
                }
            </div>
            {err && <div className='regexCK'>{t(`form${name.charAt(0).toUpperCase() + name.slice(1)}RegEx`)}</div>}
        </label>
    )
}

export default IdInputBox