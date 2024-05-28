import React from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import GatherSvg from '../../utils/svg/GatherSvg';

const DockBar = () => {
    const { t } = useTranslation();
    const Tpost = t('post');
    const Tsearch = t('search');
    const Tmore = t('more');
    const Thome = t('home');
    const Tschedule = t('schedule');

    // redux
    const user = useSelector(state => state.userInfo);

    return (
        <div className='dockBarWrap'>
            <div className="dockBarBox">
                <div className="dockbar">
                    <div className="dockBtns">
                        <GatherSvg name='menu' title={Tmore} />
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