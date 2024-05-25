import React from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GatherSvg from '../../utils/svg/GatherSvg';
import { useDispatch } from 'react-redux';

const HeaderNav = () => {
    const { t } = useTranslation();
    const tHome = t('home');
    const tFeed = t('feed');
    const tSchedule = t('schedule');
    const tDiary = t('diary');
    const tAlbum = t('album');
    const tPosting = t('posting');
    const tGuestBook = t('guestBook');

    // redux
    const dispatch = useDispatch();

    //아코디언 메뉴
    const toggleSubMenu = (e) => {
        const elementParent = e.currentTarget.parentElement;
        const childSubMenu = elementParent.querySelector('.gnb_subMenu_wrap');
        const siblingsParent = Array.from(elementParent.parentElement.querySelectorAll('.gnb_btns')).filter(element => element !== elementParent);

        siblingsParent.forEach(siblingsP => {
            const siblingsSubMenu = siblingsP.querySelector('.gnb_subMenu_wrap');
            if (siblingsSubMenu) {
                siblingsSubMenu.classList.remove('on');
                siblingsP.querySelector('.gnb_cate1').classList.remove('on');
            }
        });

        if (childSubMenu) {
            childSubMenu.classList.toggle('on');
            e.currentTarget.classList.toggle('on');
        }
    };

    // main page init
    const setHome = () => { 
        dispatch({
            type: 'SET_HEADER_SIDE_STATE',
            hdSideState: false
        });
    }
    
    return (
        <nav id='area_gnb' className='hd_inner'>
            <div className='gnb_btns'>
                <Link to='/' className='gnb_cate1 main' onClick={setHome}>{tHome}</Link>
            </div>
            <div className='gnb_btns'>
                <Link to='/feed' className='gnb_cate1 cont'>{tFeed}</Link>
            </div>
            <div className='gnb_btns'>
                <Link to='/schedule' className='gnb_cate1 cont'>{tSchedule}</Link>
            </div>
            <div className='gnb_btns'>
                <Link to='/diary' className='gnb_cate1 cont'>{tDiary}</Link>
            </div>
            <div className='gnb_btns'>
                <div to='/album' className='gnb_cate1 arrow' onClick={toggleSubMenu}>{tAlbum}</div>

                <div className="gnb_subMenu_wrap">
                    <div className="gnb_subMenu_box">
                        <div className="gnb_subMenu">
                            <Link to='/album?listIdx=0' className="gnb_cate2">고양이</Link>
                            <div className="cate2_option_box">
                                <button className="option_cate2 edit_cate2">
                                    <GatherSvg name='edit' />
                                </button>
                                <button className="option_cate2 del_cate2">
                                    <GatherSvg name='delete' />
                                </button>
                            </div>
                        </div>
                        <div className="gnb_subMenu">
                            <Link to='/album?listIdx=1' className="gnb_cate2">카페</Link>
                            <div className="cate2_option_box">
                                <button className="option_cate2 edit_cate2">
                                    <GatherSvg name='edit' />
                                </button>
                                <button className="option_cate2 del_cate2">
                                    <GatherSvg name='delete' />
                                </button>
                            </div>
                        </div>
                        <div className="gnb_subMenu">
                            <Link to='/album?listIdx=2' className="gnb_cate2">음식</Link>
                            <div className="cate2_option_box">
                                <button className="option_cate2 edit_cate2">
                                    <GatherSvg name='edit' />
                                </button>
                                <button className="option_cate2 del_cate2">
                                    <GatherSvg name='delete' />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="add_btn_box">
                        <div className="add_btn"></div>
                    </div>
                </div>
            </div>
            <div className='gnb_btns'>
                <div to='/posting' className='gnb_cate1 arrow' onClick={toggleSubMenu}>{tPosting}</div>

                <div className="gnb_subMenu_wrap">
                    <div className="gnb_subMenu_box">
                        <div className="gnb_subMenu">
                            <Link to='/album?listIdx=0' className="gnb_cate2">고양이</Link>
                            <div className="cate2_option_box">
                                <button className="option_cate2 edit_cate2">
                                    <GatherSvg name='edit' />
                                </button>
                                <button className="option_cate2 del_cate2">
                                    <GatherSvg name='delete' />
                                </button>
                            </div>
                        </div>
                        <div className="gnb_subMenu">
                            <Link to='/album?listIdx=1' className="gnb_cate2">카페</Link>
                            <div className="cate2_option_box">
                                <button className="option_cate2 edit_cate2">
                                    <GatherSvg name='edit' />
                                </button>
                                <button className="option_cate2 del_cate2">
                                    <GatherSvg name='delete' />
                                </button>
                            </div>
                        </div>
                        <div className="gnb_subMenu">
                            <Link to='/album?listIdx=2' className="gnb_cate2">음식</Link>
                            <div className="cate2_option_box">
                                <button className="option_cate2 edit_cate2">
                                    <GatherSvg name='edit' />
                                </button>
                                <button className="option_cate2 del_cate2">
                                    <GatherSvg name='delete' />
                                </button>
                            </div>
                        </div>                        
                    </div>

                    <div className="add_btn_box">
                        <div className="add_btn"></div>
                    </div>
                </div>
            </div>
            <div className='gnb_btns'>
                <Link to='/guestbook' className='gnb_cate1 cont'>{tGuestBook}</Link>
            </div>
        </nav>
    )
}

export default HeaderNav