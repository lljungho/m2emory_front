import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux'
import { deleteProfileImg, putModifyProfileImgData } from '../../axios/axiosUtils';

const FormProfileImg = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    // 프로필 이미지 파일 input
    const profileImg = useRef(null);

    // 팝업 닫기
    const dimmedClose = () => {
        dispatch({
            type: 'SET_DIMMED_STATE',
            dimmedState: false,
        });
        dispatch({
            type: 'SET_MODAL_CONTENTS',
            modalContents: '',
        });
    }

    // 프로필 이미지 업로드
    const putData = () => {
        const maxFilesize = 1024 * 1024 * 5; // 파일 크기 제한
        const file = profileImg.current.files[0];

        // 파일이 선택되지 않았을 경우
        if (!file) {
            return;
        }
        
        // 이미지 파일이 아니거나 파일 크기 제한을 초과한 경우
        if (!file.type.startsWith('image/') || file.size > maxFilesize) {
            alert(t('profileImgUploadErr'));
            return;
        }
        
        const confirmOk = window.confirm(t('changeConfirm'));
        if (confirmOk) {
            // 프로필 이미지 업로드 요청
            putModifyProfileImgData(
                file,
                dispatch,
            );
        };
    };

    // 프로필 이미지 제거
    const deleteData = () => {
        const confirmOk = window.confirm(t('progileImgDelete'));
        if (confirmOk) {
            // 프로필 이미지 제거 요청
            deleteProfileImg(dispatch);
        };
    };
    
    return (
        <div className='modal_box'>
            <input 
                type="file" 
                name="file" 
                id="file" 
                accept='image/*' 
                ref={profileImg} 
                className='displayNone' 
                onChange={putData}
            />
            <p className="content_title">{t('profileImgEdit')}</p>
            <div className="modal_btns_box">
                <label htmlFor='file' className="small_btns">{t('change')}</label>
                <div className="small_btns" onClick={deleteData}>{t('del')}</div>
                <div className="small_btns" onClick={dimmedClose}>{t('close')}</div>
            </div>
        </div>
    )
}

export default FormProfileImg