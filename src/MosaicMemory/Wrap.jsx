import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from './utils/axios/axiosUtils';
import { setColor } from './utils/handler/handlerUtils';
import { useWindowWidth } from './utils/hook/customHookUtils';

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
    const windowWidth = useWindowWidth();
    const isLogIned = useSelector(store => store.sessionCheck.sessionID);
    const colorMode = useSelector(store => store.colorMode.colorMode); // false=light
    const dimmedState = useSelector(store => store.contStatus.dimmedState);
    const modalContents = useSelector(store => store.contStatus.modalContents);
    const dispatch = useDispatch(); 

    // 로딩 설정
    const [loading, setLoading] = useState(false);
    
    // 유저 정보 요청
    useEffect(() => {
        getUserData(setLoading, dispatch);
    }, [dispatch]);   
    
    // 컬러 세팅
    useEffect(() => {
        setColor(colorMode);
    }, [colorMode]);

    // 통신 중일 경우 로딩 표시
    if (loading) {
        return <Loading logo={true} />;
    };  

    return (
        <div id="wrap">
            { isLogIned ? <ContentsWarp /> : <SignWrap /> }

            { dimmedState && <DimmedBox /> }
            { modalContents && <ModalWrap /> }

            { windowWidth < 1240 && isLogIned && <DockBar /> }
        </div>
    )
}

export default Wrap;