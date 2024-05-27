import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from './utils/axios/axiosSet';

import './css/common.css';
import './css/style.css';
import './css/media.css';

import SignWrap from './contents/member/SignWrap';
import ContentsWarp from './contents/ContentsWarp';
import DimmedBox from './utils/DimmedBox';
import ModalWrap from './utils/modal/ModalWrap';
import Loading from './utils/Loading';
import DockBar from './include/dock/DockBar';

const Wrap = () => {
    // redux 
    const dispatch = useDispatch();
    const isLogIned = useSelector(store => store.sessionCheck.sessionID);
    const colorMode = useSelector(store => store.colorMode.colorMode); //false=light
    const dimmedState = useSelector(store => store.contStatus.dimmedState);
    const modalContents = useSelector(store => store.contStatus.modalContents);

    // 로딩 설정
    const [loading, setLoading] = useState(false);

    if(colorMode) { //dark
        document.documentElement.style.setProperty('--baseBg', '#000');
        document.documentElement.style.setProperty('--baseFg', '#fff');
        document.documentElement.style.setProperty('--baseFg1', 'rgba(255,255,255,0.15)');
        document.documentElement.style.setProperty('--baseRGB_b', 'rgba(255,255,255,0.35)');
        document.documentElement.style.setProperty('--baseRGB_b1', 'rgba(255,255,255,0.85)');

    } else { //light
        document.documentElement.style.setProperty('--baseBg', '#fff');
        document.documentElement.style.setProperty('--baseFg', '#000');
        document.documentElement.style.setProperty('--baseFg1', 'rgba(0,0,0,0.04)');
        document.documentElement.style.setProperty('--baseRGB_b', 'rgba(0,0,0,0.15)');
        document.documentElement.style.setProperty('--baseRGB_b1', 'rgba(0,0,0,0.35)');
    };

    // 유저 정보 요청
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            console.log('getData() userInfo');
            try {
                const response = await axios.get('/member/userInfo');

                console.log("[Axios] getData() communication success!!");
                console.log(response.data);
                console.log(response.status);
                
                // 유저 정보 리듀서에 저장
                dispatch({
                    type: 'SET_USER_INFO',
                    payload: response.data.userInfo,
                });

                // 토큰 저장
                sessionStorage.setItem('sessionID', response.data.accessToken);
                dispatch({
                    type: 'SESSION_CHECK',
                    sessionID: response.data.accessToken,
                });

            } catch(error) {
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
                
            } finally {
                setLoading(false);
            };
        }

        getData();
    }, [dispatch]);

    // dockbar
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        }
    },[]);

    // 통신 중일 경우 로딩 표시
    if (loading) {
        return <Loading />;
    };  

    return (
        <div id="wrap">
            { isLogIned ? <ContentsWarp /> : <SignWrap /> }

            { dimmedState && <DimmedBox /> }
            { modalContents && <ModalWrap /> }

            { windowWidth < 1240 && <DockBar /> }
        </div>
    )
}

export default Wrap