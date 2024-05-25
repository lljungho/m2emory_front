import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import GatherSvg from '../../utils/svg/GatherSvg';
import SearchBox from '../../utils/search/SearchBox';
import HeaderNav from './HeaderNav';
import UtilBtnsBox from '../../utils/UtilBtnsBox';
import NotifyBtnsBox from './NotifyBtnsBox';
import ProfileBox from './ProfileBox';
import Logo from '../logo/Logo';

const Header = () => {
    const { t } = useTranslation();
    const Tsearch = t('search');
    const Tmessage = t('message');

    // redux
    const dispatch = useDispatch();
    const hdSideState = useSelector(state => state.contStatus.hdSideState);

    const handleSideMenuToggle = () => {
        dispatch({ 
            type: 'SET_HEADER_SIDE_STATE', 
            hdSideState: !hdSideState
        });
    }

    //검색창 토글
    const [searchBoxOn, setSearchBoxOn] = useState(false);

    const handleSearchBoxToggle = () => {
        setSearchBoxOn(!searchBoxOn);
    }

    useEffect(() => {
        setSearchBoxOn(false);
    }, [hdSideState]);

    return (
        <header id='header'>
            <div className="headerTop">
                <div className={`headerSideMenuBtn ${hdSideState ? 'on' : ''}`} onClick={handleSideMenuToggle}>
                    <div className="bar bar1"></div>
                    <div className="bar bar2"></div>
                    <div className="bar bar3"></div>
                </div>

                <Logo />

                <NotifyBtnsBox />
            </div>

            <div className={`hd_wrap ${hdSideState ? 'on' : ''}`}>
                <div className='hd_box'>
                    <div className='hd_inner_box'>
                        <ProfileBox />

                        <HeaderNav />

                        <div id='area_music' className='hd_inner'>
                            뮤직 플레이어 박스
                        </div>
                    </div>
                </div>

                <div id='area_util'>

                    <UtilBtnsBox />

                    <button className='util_icon_boxs' onClick={handleSearchBoxToggle}>
                        <GatherSvg name='search' title={Tsearch} />
                    </button>

                    <SearchBox 
                        searchBoxOn={searchBoxOn}
                        setSearchBoxOn={setSearchBoxOn}
                    />

                    <button className='util_icon_boxs'>
                        <GatherSvg name='message' title={Tmessage} />
                    </button>
                </div>
            </div>

            { hdSideState && <div className={`dimmed_box ${hdSideState ? 'on' : ''}`} onClick={handleSideMenuToggle}></div> }
           
        </header>
    )
}

export default Header