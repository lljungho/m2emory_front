import React from 'react'
import GatherSvg from '../../utils/svg/GatherSvg'
import { useTranslation } from 'react-i18next';
import axios from '../../utils/axios/axiosSet';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LogoutBtnBox = () => {
    const { t } = useTranslation();
    const tLogout = t('logout');
    const tLogoutConfirm = t('logoutConfirm');

    const navigate = useNavigate();

    // redux
    const dispatch = useDispatch();

    // server URL
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const handleLogout = () => {
        const logConfirm = window.confirm(tLogoutConfirm);
        if (logConfirm) {
            axios.get(`${serverUrl}/member/signOut`)
            .then(response => {
                console.log(response.data);
                sessionStorage.removeItem('sessionID');
                dispatch({
                    type: 'CLEAR_ALL_STATE',
                });
                navigate('/');
    
            }).catch(error => {
                if (error.response) {
                    // 서버에서 받은 에러 메시지
                    console.log('Server Error:', error.response.data);
    
                } else if (error.request) {
                    // 요청이 전송되었지만 응답을 받지 못한 경우 
                    console.log('Network Error:', error.request);
    
                } else {
                    // 기타 에러
                    console.log('Error:', error.message);
                }
            });
        }
    };

    return (
        <button className='util_icon_boxs small' onClick={handleLogout}>
            <GatherSvg name='logout' title={tLogout} />
        </button>
    )
}

export default LogoutBtnBox