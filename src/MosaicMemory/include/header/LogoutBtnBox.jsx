import React from 'react'
import GatherSvg from '../../utils/svg/GatherSvg'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from '../../utils/axios/axiosUtils';

const LogoutBtnBox = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 로그아웃
    const logout = () => {
        handleLogout(t('logoutConfirm'), dispatch, navigate);
    };

    return (
        <button className='util_icon_boxs' onClick={logout}>
            <GatherSvg name='logout' title={t('logout')} />
        </button>
    )
}

export default LogoutBtnBox;