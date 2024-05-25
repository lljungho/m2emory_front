import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import i18n from'./i18n';

const LanguageSelect = () => {
    const { t } = useTranslation();

    //언어 데이터
    const languages = Object.keys(i18n.options.resources);

    //언어 변경
    const [Language, setLanguage]= useState(i18n.language);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng); 
        setLanguage(lng);
    };

    //언어 선택 리스트 박스
    const [islangChangeBoxOn, setIslangChangeBoxOn] = useState(false);
    const languageBox = useRef(null);

    useEffect(() => {
        //언어 선택 박스 외 클릭 시
        const langOutsideClick = (e) => {
            if (!languageBox.current.contains(e.target) && islangChangeBoxOn) {
                setIslangChangeBoxOn(false);
            }
        };

        window.addEventListener('click', langOutsideClick);

        return () => {
            window.removeEventListener('click', langOutsideClick);
        }
    }, [islangChangeBoxOn]);

    const langChangeSelectOn = () => {
        setIslangChangeBoxOn(prevValue => !prevValue);
    };

    const langClassAdd = islangChangeBoxOn ? 'on' : '';

    return (
        <div className={`util_icon_boxs ${langClassAdd}`} ref={languageBox} onClick={langChangeSelectOn}>
            <img src={`/images/icon/lng_${Language}.png`} className='lng_icon' alt={Language + t('language')} />

            <div className="language_icons">
                {languages.map((lng, index) => (
                    <div key={index} className="lng_btns" onClick={() => changeLanguage(lng)}>
                        <img src={`/images/icon/lng_${lng}.png`} className='lng_icon' alt={lng + t('language')} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LanguageSelect