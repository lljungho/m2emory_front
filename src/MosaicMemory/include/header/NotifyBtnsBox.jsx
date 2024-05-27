import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import GatherSvg from '../../utils/svg/GatherSvg'

const NotifyBtnsBox = () => {
    const { t } = useTranslation();
    const tAlarm = t('alarm');
    const tSearch = t('search');

    return (
        <div className="contTopRightBox">
            <div className="contTopBtnsBox">
                <Link to='/contents/search' className='contTopBtns'>
                    <GatherSvg name='search' title={tSearch} />
                </Link>
                <span className="explan">{tAlarm}</span>
            </div>

            <div className="contTopBtnsBox">
                <div className='contTopBtns'>
                    <GatherSvg name='alarm' title={tAlarm} />
                </div>
                <span className="explan">{tAlarm}</span>
            </div>
        </div>
    )
}

export default NotifyBtnsBox