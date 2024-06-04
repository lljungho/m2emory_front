import React from 'react'
import { useTranslation } from 'react-i18next'

const ProfileImgBox = ({ img, small }) => {
    const { t } = useTranslation();

    return (
        <div className={`profileImgBox ${ small ? 'small' : '' }`}>
            <img src={ img } alt={t('profileImg')} className="thumbnail" />
        </div>
    )
}

export default ProfileImgBox;