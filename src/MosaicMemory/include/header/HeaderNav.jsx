import React from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import GatherSvg from '../../utils/svg/GatherSvg';

const HeaderNav = () => {
    const { t } = useTranslation();
    const Thome = t('home');
    const Tschedule = t('schedule');
    const Tsearch = t('search');
    const Tmessage = t('message');
    const Tprofile = t('profile');
    const Tpost = t('post');

    // redux
    const user = useSelector(store => store.userInfo);

    return (
        <nav id='area_gnb' className='hd_inner'>
            <div className='gnb_btns'>
                <Link to='/contents/myPage' className='gnb_cate1'>
                    <div className="gnb_cate1_iconBox gnb_cate1_profile">
                        <img src={user.u_pf_img} alt={Tprofile} className='gnb_cate1_icon' />
                    </div>
                    {Tprofile}
                </Link>
            </div>
            <div className='gnb_btns'>
                <Link to='/' className='gnb_cate1'>
                    <div className="gnb_cate1_iconBox">
                        <GatherSvg name='home' title={Thome} />
                    </div>
                    {Thome}
                </Link>
            </div>
            <div className='gnb_btns'>
                <Link to='/contents/search' className='gnb_cate1'>
                    <div className="gnb_cate1_iconBox">
                        <GatherSvg name='search' title={Tsearch} />
                    </div>
                    {Tsearch}
                </Link>
            </div>

            <div className='gnb_btns'>
                <Link to='/contents/message' className='gnb_cate1'>
                    <div className="gnb_cate1_iconBox">
                        <GatherSvg name='message' title={Tmessage} />
                    </div>
                    {Tmessage}
                </Link>
            </div>
            <div className='gnb_btns'>
                <Link to='/contents/schedule' className='gnb_cate1'>
                    <div className="gnb_cate1_iconBox">
                        <GatherSvg name='schedule' title={Tschedule} />
                    </div>
                    {Tschedule}
                </Link>
            </div>
            <div className='gnb_btns'>
                <Link to='/contents/schedule' className='gnb_cate1'>
                    <div className="gnb_cate1_iconBox">
                        <GatherSvg name='plus' title={Tpost} />
                    </div>
                    {Tpost}
                </Link>
            </div>
        </nav>
    )
}

export default HeaderNav