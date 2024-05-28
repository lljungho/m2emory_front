import React from 'react'
import useWindowWidth from '../../utils/useWindowWidth';

import HeaderNav from './HeaderNav';
import UtilBtnsBox from '../../utils/UtilBtnsBox';
import NotifyBtnsBox from './NotifyBtnsBox';
import Logo from '../logo/Logo';
import LogoutBtnBox from './LogoutBtnBox';

const Header = () => {
    const windowWidth = useWindowWidth();

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
                        <UtilBtnsBox />
                        <LogoutBtnBox />
                    </div>
                </div>
            }                       
        </header>
    )
}

export default Header