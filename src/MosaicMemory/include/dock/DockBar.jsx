import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getNowLanguage, getLanguages, getLanguageNames, changeLanguage } from '../../utils/lang/languageUtils';
import { handleLogout } from '../../utils/axios/axiosUtils';
import { setColorMode } from '../../utils/handler/handlerUtils';
import { useNavLocation } from '../../utils/hook/customHookUtils'; // true시 'on'을 반환

import GatherSvg from '../../utils/svg/GatherSvg';
import ProfileImgBox from '../contents/ProfileImgBox';

const DockBar = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.userInfo);
    const colorMode = useSelector(store => store.colorMode.colorMode);

    // 언어
    const nowLanguage = getNowLanguage(); // 현재 적용되어 있는 언어
    const languages = getLanguages(); // 적용가능한 언어 리스트
    const languageNames = getLanguageNames(); // 언어명

    // 컬러 모드 변경
    const colorModeChanger = () => {
        setColorMode(dispatch, colorMode);
    }

    // 로그아웃
    const logout = () => {
        handleLogout(t('logoutConfirm'), dispatch, navigate);
    };

    // 메뉴버튼 클릭
    const [menuOpen, setMenuOpen] = useState(false);
    const menuOpenBtn = useRef(null);
    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        // 클릭한 요소 외 클릭 시
        const outsideClick = (e) => {
            if (menuOpen && menuOpenBtn.current && !menuOpenBtn.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };

        window.addEventListener('click', outsideClick);

        return () => {
            window.removeEventListener('click', outsideClick);
        }
    }, [menuOpen]);

    return (
        <div className='dockBarWrap'>
            <div className="dockBarBox">
                <div className="dockbar">
                    <div className="gnb_cate1" ref={menuOpenBtn} onClick={handleMenuToggle}>
                        <GatherSvg name='menu' title={t('more')} />

                        { menuOpen && 
                            <div className="moreMenuBox" onClick={(e) => e.stopPropagation()}>
                                <div className="moreMenuBtns wrapElement">
                                    <div className="moreMenu">
                                        <select 
                                            name="lng" 
                                            id="lng" 
                                            className={`${colorMode ? 'dark' : ''}`} 
                                            onChange={(e) => changeLanguage(e.target.value)}
                                            value={nowLanguage}
                                        >
                                            { languages.map((lng, index) => (
                                                <option 
                                                    key={index} 
                                                    value={lng} 
                                                >
                                                    { languageNames[lng] || lng }
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="moreMenu" onClick={colorModeChanger}> 
                                        { colorMode ? t('lightMode') : t('darkMode') }
                                        <div className="icon">
                                            <GatherSvg 
                                                name={ colorMode ? 'light' : 'dark' } 
                                                title={ colorMode ? t('lightMode') : t('darkMode') }
                                            />
                                        </div>
                                    </div>
                                    <div className="moreMenu" onClick={logout}>
                                        {t('logout')}
                                        <div className="icon">
                                            <GatherSvg name='logout' title={t('logout')} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                    <Link to='/' className={`gnb_cate1 ${useNavLocation('/')}`}>
                        <GatherSvg name='home' title={t('home')} />
                    </Link>

                    <Link to='/contents/search' className={`gnb_cate1 ${useNavLocation('/contents/search')}`}>
                        <GatherSvg name='search' title={t('search')} />
                    </Link>

                    <Link to='/contents/posting' className={`gnb_cate1 ${useNavLocation('/contents/posting')}`}>
                        <GatherSvg name='plus' title={t('post')} />
                    </Link>

                    <Link to='/contents/schedule' className={`gnb_cate1 ${useNavLocation('/contents/schedule')}`}>
                        <GatherSvg name='schedule' title={t('schedule')} />
                    </Link>

                    <Link to='/contents/myPage' className={`gnb_cate1 dockProfile ${useNavLocation('/contents/myPage')}`}>
                        <ProfileImgBox img={user.u_pf_img} small={true} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default DockBar;