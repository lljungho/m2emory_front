import React from 'react'
import LanguageSelect from './lang/LanguageSelect'
import GatherSvg from './svg/GatherSvg'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

const UtilBtnsBox = () => {
    const { t } = useTranslation();

    // redux
    const dispatch = useDispatch();
    const colorMode = useSelector(state => state.colorMode.colorMode);

    //모드 변경
    const coloModerChangeHandler = () => {
        console.log(!colorMode);
        dispatch({ type: 'SET_COLOR_MODE', colorMode: !colorMode });
        localStorage.setItem('colorMode', !colorMode);
    }

    return (
        <>
            <LanguageSelect />

            {
                colorMode 
                ?
                    <>
                        <button className='util_icon_boxs' onClick={coloModerChangeHandler} >
                            <GatherSvg name='light' title={t('lightMode')} />
                        </button>
                    </>
                :
                    <>
                        <button className='util_icon_boxs' onClick={coloModerChangeHandler} >
                            <GatherSvg name='dark' title={t('darkMode')} />
                        </button>
                    </>
            }
        </>
    )
}

export default UtilBtnsBox