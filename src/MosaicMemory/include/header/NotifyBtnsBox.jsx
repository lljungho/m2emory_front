import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useWindowWidth } from '../../utils/hook/customHookUtils';
import GatherSvg from '../../utils/svg/GatherSvg'

const NotifyBtnsBox = () => {
    const { t } = useTranslation();
    const windowWidth = useWindowWidth();

    return (
        <div className="contTopRightBox">
            <div className="contTopBtnsBox">
                <div className='contTopBtns'>
                    <GatherSvg name='alarm' title={t('alarm')} />
                </div>
            </div>

            { windowWidth < 1240 && 
                <div className="contTopBtnsBox">
                    <Link to='/contents/message' className='contTopBtns'>
                        <GatherSvg name='message' title={t('message')} />
                    </Link>
                </div>
            }
        </div>
    )
}

export default NotifyBtnsBox;