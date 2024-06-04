import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux'
import { deleteProfileImg, putModifyProfileImgData } from '../../axios/axiosUtils';
import ContTitleBox from '../../../include/contents/ContTitleBox';

const FormProfileImg = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    // 프로필 이미지 파일 input
    const profileImg = useRef(null);

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
            let formData = new FormData();
            formData.append('file', file);
            
            putModifyProfileImgData(
                formData,
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

            <ContTitleBox
                title={t('profileImgEdit')}
                close={true}
            />

            <div className="modal_btns_box">
                <label htmlFor='file' className="small_btns">{t('change')}</label>
                <div className="small_btns" onClick={deleteData}>{t('del')}</div>
            </div>
        </div>
    )
}

export default FormProfileImg