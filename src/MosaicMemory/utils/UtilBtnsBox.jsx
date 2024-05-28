import React from 'react'
import LanguageSelect from './lang/LanguageSelect'
import GatherSvg from './svg/GatherSvg'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

const UtilBtnsBox = () => {
    const { t } = useTranslation();
    const TlightMode = t('lightMode');
    const TdarkMode = t('darkMode');

    // redux
    const dispatch = useDispatch();
    const colorMode = useSelector(store => store.colorMode.colorMode);

    //모드 변경
    const coloModerChangeHandler = () => {
        console.log(!colorMode);
        dispatch({ type: 'SET_COLOR_MODE', colorMode: !colorMode });
        localStorage.setItem('colorMode', !colorMode);
    }

    return (
        <>
            <LanguageSelect />

            <button className='util_icon_boxs' onClick={coloModerChangeHandler} >
                <GatherSvg 
                    name={ colorMode ? 'light' : 'dark' } 
                    title={ colorMode ? TlightMode : TdarkMode } 
                />
            </button>
        </>
    )
}

export default UtilBtnsBox