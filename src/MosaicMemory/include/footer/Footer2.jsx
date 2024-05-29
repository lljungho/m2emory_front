import React from 'react'
import LanguageSelect from '../../utils/lang/LanguageSelect'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import GatherSvg from '../../utils/svg/GatherSvg';

const Footer2 = () => {
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
        <footer id="footer2">
            <div className="footer_wrap2">
                <div className="footer_box2">
                    <div className="ft_util_box">
                        <LanguageSelect />

                        <button className='util_icon_boxs' onClick={coloModerChangeHandler} >
                            <GatherSvg 
                                name={ colorMode ? 'light' : 'dark' } 
                                title={ colorMode ? TlightMode : TdarkMode } 
                            />
                        </button>
                    </div>
                    
                    <p className="copyright">ⓒ 2024. LeeJungHo all rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer2