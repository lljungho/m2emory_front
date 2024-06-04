import React from 'react'
import { useTranslation } from 'react-i18next';

const ContProfileBar = () => {
    const { t } = useTranslation();

    return (
        <div className="content_top_info">
            <div className="cont_top_box">
                <div className="cont_top_info_profile_thumb cursorP">
                    <div className="story_check_line">
                        <div className="profile_thumb_box">
                            <div className="thumbnail_img">
                                <img src={user.u_pf_img} alt="ProfileImg" className="thumbnail" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="cont_top_info_profile">
                    <div className="profile_introduction">
                        <p className="userId cursorP">
                            {user.u_id}
                            <span className="date">1분</span>
                        </p>
                        <p className="userName">{user.u_pf_name}</p>
                    </div>
                </div>
            </div>

            <div className="cont_top_box">
                <div className="bdBtns cursorP">
                    {t('follow')}
                </div>

                <div className="cont_top_icon_box cursorP">
                    <GatherSvg name='more' title='menu' />
                </div>
            </div>
        </div>
    )
}

export default ContProfileBar;