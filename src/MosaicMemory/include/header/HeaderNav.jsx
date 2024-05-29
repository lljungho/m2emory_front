import React from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import GatherSvg from '../../utils/svg/GatherSvg';

const HeaderNav = () => {
    const { t } = useTranslation();
    const user = useSelector(store => store.userInfo);

    return (
        <nav id='area_gnb' className='hd_inner'>
            <div className='gnb_btns'>
                <Link to='/contents/myPage' className='gnb_cate1'>
                    <div className="gnb_cate1_iconBox gnb_cate1_profile">
                        <img src={user.u_pf_img} alt={t('profile')} className='gnb_cate1_icon' />
                    </div>
                    {t('profile')}
                </Link>
            </div>
            <div className='gnb_btns'>
                <Link to='/' className='gnb_cate1'>
                    <div className="gnb_cate1_iconBox">
                        <GatherSvg name='home' title={t('home')} />
                    </div>
                    {t('home')}
                </Link>
            </div>
            <div className='gnb_btns'>
                <Link to='/contents/search' className='gnb_cate1'>
                    <div className="gnb_cate1_iconBox">
                        <GatherSvg name='search' title={t('search')} />
                    </div>
                    {t('search')}
                </Link>
            </div>

            <div className='gnb_btns'>
                <Link to='/contents/message' className='gnb_cate1'>
                    <div className="gnb_cate1_iconBox">
                        <GatherSvg name='message' title={t('message')} />
                    </div>
                    {t('message')}
                </Link>
            </div>
            <div className='gnb_btns'>
                <Link to='/contents/schedule' className='gnb_cate1'>
                    <div className="gnb_cate1_iconBox">
                        <GatherSvg name='schedule' title={t('schedule')} />
                    </div>
                    {t('schedule')}
                </Link>
            </div>
            <div className='gnb_btns'>
                <Link to='/contents/schedule' className='gnb_cate1'>
                    <div className="gnb_cate1_iconBox">
                        <GatherSvg name='plus' title={t('post')} />
                    </div>
                    {t('post')}
                </Link>
            </div>
        </nav>
    )
}

export default HeaderNav