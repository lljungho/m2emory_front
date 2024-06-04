import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import FormProfileImg from './profile/FormProfileImg'

const ModalWrap = () => {
    const modalContents = useSelector(store => store.contStatus.modalContents);

    // 랜더링할 컴포넌트 리스트 
    const componentMap = {
        FormProfileImg,
    }

    // modalContents에 해당하는 컴포넌트 찾기
    const ModalComponent = componentMap[modalContents];

    // 모달 셋타임
    const [isOn, setIsOn] = useState(false);
    useEffect(() => {
        const setTimer = setTimeout(() => {
            setIsOn(true);
        }, 20);
        return () => clearTimeout(setTimer); // 언마운트때 타이머 제거
    }, []);

    return (
        <div className={`modal_wrap ${isOn && modalContents ? 'on' : ''}`}>
            <ModalComponent />
        </div>
    )
}

export default ModalWrap;