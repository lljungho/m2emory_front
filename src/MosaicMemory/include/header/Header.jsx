import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import useWindowWidth from '../../utils/useWindowWidth';
import LanguageSelect from '../../utils/lang/LanguageSelect';
import { setColorMode } from '../../utils/handler/handlerUtils';
import GatherSvg from '../../utils/svg/GatherSvg';

import HeaderNav from './HeaderNav';
import NotifyBtnsBox from './NotifyBtnsBox';
import Logo from '../logo/Logo';
import LogoutBtnBox from './LogoutBtnBox';

const Header = () => {
    const { t } = useTranslation();
    const windowWidth = useWindowWidth();
    const dispatch = useDispatch();
    const colorMode = useSelector(store => store.colorMode.colorMode);

    // 컬러 모드 변경
    const colorModeChanger = () => {
        setColorMode(dispatch, colorMode);
    }

    return (
        <header id='header'>
            <div className="headerTop">
                <div className="headerTopbox">
                    <Logo />
                    <NotifyBtnsBox />
                </div>
            </div>

            { windowWidth > 1240 &&
                <div className='hd_wrap'>
                    <div className='hd_box'>
                        <div className='hd_inner_box'>
                            <HeaderNav />
                            <div id='area_music' className='hd_inner'>
                                뮤직 플레이어 박스
                            </div>
                        </div>
                    </div>

                    <div id='area_util'>
                        <LanguageSelect />

                        <button className='util_icon_boxs' onClick={colorModeChanger} >
                            <GatherSvg 
                                name={ colorMode ? 'light' : 'dark' } 
                                title={ colorMode ? t('lightMode') : t('darkMode') } 
                            />
                        </button>

                        <LogoutBtnBox />
                    </div>
                </div>
            }                       
        </header>
    )
}

export default Header;