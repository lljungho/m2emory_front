import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import GatherSvg from '../../utils/svg/GatherSvg';
import i18n from '../../utils/lang/i18n';

const DockBar = () => {
    const { t } = useTranslation();
    const Tpost = t('post');
    const Tsearch = t('search');
    const Tmore = t('more');
    const Thome = t('home');
    const Tschedule = t('schedule');

    // redux
    const user = useSelector(state => state.userInfo);

    // 메뉴버튼 클릭
    const [moreMenu, setMoreMenu] = useState(false);
    const moreMenuBtn = useRef(null);

    const handleMoreBtn = () => {
        setMoreMenu(!moreMenu);
    };

    useEffect(() => {
        //언어 선택 박스 외 클릭 시
        const moreBtnOutsideClick = (e) => {
            if (moreMenu && moreMenuBtn.current && !moreMenuBtn.current.contains(e.target)) {
                setMoreMenu(false);
            }
        };

        window.addEventListener('click', moreBtnOutsideClick);

        return () => {
            window.removeEventListener('click', moreBtnOutsideClick);
        }
    }, [moreMenu]);

    //언어 데이터
    const [Language, setLanguage]= useState(i18n.language); // 현재 적용되어 있는 언어
    const languages = Object.keys(i18n.options.resources); // 적용가능한 언어 리스트
    const languageNames = {
        KR: '한국어',
        JP: '日本語',
        CN: '中文',    
        EN: 'English' 
    };

    const changeLanguage = (e) => {
        const lng = e.target.value;
        i18n.changeLanguage(lng); 
        setLanguage(lng);
        sessionStorage.setItem('lng', lng);
    };

    return (
        <div className='dockBarWrap'>
            <div className="dockBarBox">
                <div className="dockbar">
                    <div className="dockBtns" ref={moreMenuBtn} onClick={handleMoreBtn}>
                        <GatherSvg name='menu' title={Tmore} />

                        { moreMenu && 
                            <div className="moreMenuBox" onClick={(e) => e.stopPropagation()}>
                                <div className="moreMenuBtns">
                                    <div className="moreMenu">
                                        <select name="lng" id="lng" onChange={changeLanguage}>
                                            { languages.map((lng, index) => (
                                                <option 
                                                    key={index} 
                                                    value={lng} 
                                                    selected={Language === lng ? true : undefined}
                                                >
                                                    { languageNames[lng] || lng }
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="moreMenu">컬러모드</div>
                                    <div className="moreMenu">
                                        로그아웃
                                        <div className="icon">
                                            <GatherSvg name='logout' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                    <Link to='/' className="dockBtns">
                        <GatherSvg name='home' title={Thome} />
                    </Link>

                    <Link to='/contents/search' className="dockBtns">
                        <GatherSvg name='search' title={Tsearch} />
                    </Link>

                    <Link to='/' className="dockBtns">
                        <GatherSvg name='plus' title={Tpost} />
                    </Link>

                    <Link to='/' className="dockBtns">
                        <GatherSvg name='schedule' title={Tschedule} />
                    </Link>

                    <Link to='/contents/myPage' className="dockBtns">
                        <img src={user.u_pf_img} alt="" className='profileImg' />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default DockBar