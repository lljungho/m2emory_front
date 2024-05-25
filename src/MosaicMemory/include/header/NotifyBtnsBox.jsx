import React from 'react'
import { useTranslation } from 'react-i18next';

import GatherSvg from '../../utils/svg/GatherSvg'

const NotifyBtnsBox = () => {
    const { t } = useTranslation();
    const tAlarm = t('alarm');

    return (
        <div className="contTopRightBox">
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