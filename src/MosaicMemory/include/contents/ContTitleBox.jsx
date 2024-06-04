import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import GatherSvg from '../../utils/svg/GatherSvg';
import { setDimmedClose } from '../../utils/handler/handlerUtils';
import { useDispatch } from 'react-redux';

const ContTitleBox = ({ title, back, close }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

            { close && 
                <div className="title_btn" onClick={() => setDimmedClose(dispatch)}>
                    <GatherSvg name='close' title={t('back')} />
                </div>
            }
        </div>
    )
}

export default ContTitleBox;