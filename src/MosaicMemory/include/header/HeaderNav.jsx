import React from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import GatherSvg from '../../utils/svg/GatherSvg';
import ProfileImgBox from '../contents/ProfileImgBox';
import { useNavLocation } from '../../utils/hook/customHookUtils'; // true시 'on'을 반환

const HeaderNav = () => {
    const { t } = useTranslation(); 
    const user = useSelector(store => store.userInfo);

    return (
        <nav id='area_gnb' className='hd_inner'>
            <div className='gnb_btns'>
                <Link to='/' className={`gnb_cate1 ${useNavLocation('/')}`}>
                    <div className="gnb_cate1_iconBox">
                        <GatherSvg name='home' title={t('home')} />
                    </div>
                    {t('home')}
                </Link>
            </div>
            <div className='gnb_btns'>
                <Link to='/contents/search' className={`gnb_cate1 ${useNavLocation('/contents/search')}`}>
                    <div className="gnb_cate1_iconBox">
                        <GatherSvg name='search' title={t('search')} />
                    </div>
                    {t('search')}
                </Link>
            </div>
            <div className='gnb_btns'>
                <Link to='/contents/message' className={`gnb_cate1 ${useNavLocation('/contents/message')}`}>
                    <div className="gnb_cate1_iconBox">
                        <GatherSvg name='message' title={t('message')} />
                    </div>
                    {t('message')}
                </Link>
            </div>
            <div className='gnb_btns'>
                <Link to='/contents/schedule' className={`gnb_cate1 ${useNavLocation('/contents/schedule')}`}>
                    <div className="gnb_cate1_iconBox">
                        <GatherSvg name='schedule' title={t('schedule')} />
                    </div>
                    {t('schedule')}
                </Link>
            </div>
            <div className='gnb_btns'>
                <Link to='/contents/posting/1' className={`gnb_cate1 ${useNavLocation('/contents/posting')}`}>
                    <div className="gnb_cate1_iconBox">
                        <GatherSvg name='plus' title={t('post')} />
                    </div>
                    {t('post')}
                </Link>
            </div>
            <div className='gnb_btns'>
                <Link to='/contents/myPage' className={`gnb_cate1 ${useNavLocation('/contents/myPage')}`}>
                    <div className="gnb_cate1_iconBox gnb_cate1_profile">
                        <ProfileImgBox img={user.user_pf_img} small={true} />
                    </div>
                    {t('profile')}
                </Link>
            </div>
        </nav>
    )
}

export default HeaderNav;