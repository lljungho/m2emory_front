import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import GatherSvg from '../../utils/svg/GatherSvg';

const ContTitleBox = ({ title, back }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="title_box">
            <h2 className='content_title'>
                { back && 
                <div className="back_btn" onClick={() => navigate(-1)}>
                    <GatherSvg name='arrow' title={t('back')} />
                </div>
                }

                {title}
            </h2>
        </div>
    )
}

export default ContTitleBox;