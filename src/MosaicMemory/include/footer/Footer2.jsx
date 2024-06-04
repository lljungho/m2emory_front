import React from 'react'
import LanguageSelect from '../../utils/lang/LanguageSelect'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import GatherSvg from '../../utils/svg/GatherSvg';
import { setColorMode } from '../../utils/handler/handlerUtils';

const Footer2 = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const colorMode = useSelector(store => store.colorMode.colorMode);

    return (
        <footer id="footer2">
            <div className="footer_wrap2">
                <div className="footer_box2">
                    <div className="ft_util_box">
                        <LanguageSelect />

                        <button className='util_icon_boxs' onClick={() => setColorMode(dispatch, colorMode)} >
                            <GatherSvg 
                                name={ colorMode ? 'light' : 'dark' } 
                                title={ colorMode ? t('lightMode') : t('darkMode') } 
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