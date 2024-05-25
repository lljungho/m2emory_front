import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next';
import axios from '../../axios/axiosSet';
import { useDispatch, useSelector } from 'react-redux'

const FormProfileImg = () => {
    const { t } = useTranslation();
    const TprofileImgEdit = t('profileImgEdit');
    const Tdel = t('del');
    const Tclose = t('close');
    const Tchange = t('change');
    const TchangeConfirm = t('changeConfirm');
    const TprofileImgUploadErr = t('profileImgUploadErr');
    const TprogileImgDelete = t('progileImgDelete');

    // redux
    const dispatch = useDispatch();
    const dimmedState = useSelector(store => store.contStatus.dimmedState);

    // 팝업 닫기
    const dimmedClose = () => {
        dispatch({
            type: 'SET_DIMMED_STATE',
            dimmedState: !dimmedState,
        });
        dispatch({
            type: 'SET_MODAL_CONTENTS',
            modalContents: '',
        });
    }

    // 프로필 이미지 파일 input
    const profileImg = useRef(null);

    // 프로필 이미지 업로드
    const putData = async () => {
        console.log("[Axios] putData()");

        const maxFilesize = 1024 * 1024 * 5; // 파일 크기 제한
        const file = profileImg.current.files[0];

        // 파일이 선택되지 않았을 경우
        if (!file) {
            return;
        }

        // 이미지 파일이 아니거나 파일 크기 제한을 초과한 경우
        if (!file.type.startsWith('image/') || file.size > maxFilesize) {
            alert(TprofileImgUploadErr);
            return;
        }

        let formData = new FormData();
        formData.append('file', profileImg.current.files[0]);

        const confirmOk = window.confirm(TchangeConfirm);
        if (confirmOk) {
            try {
                const response = await axios.put('/upload/modifyProfileImg', formData, {
                    headers: {
                        'Content-type': 'multipart/form-data'
                    }
                });
                console.log('axios modifyProfileImg succsess');

                // 팝업 닫기 및 리듀서 프로필 이미지 수정
                dispatch({
                    type: 'SET_DIMMED_STATE',
                    dimmedState: !dimmedState,
                });
                dispatch({
                    type: 'SET_MODAL_CONTENTS',
                    modalContents: '',
                });
                dispatch({
                    type: 'SET_PROFILE_IMG',
                    u_pf_img: response.data.u_pf_img,
                });

            } catch (error) {
                console.log("[Axios] modifyProfileImg() put form data communication error!!");
                console.log(error.config);
    
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
            };
        }
    };

    // 프로필 이미지 삭제
    const deleteData = async () => {
        console.log("[Axios] deleteData()");

        const confirmOk = window.confirm(TprogileImgDelete);
        if(confirmOk) {
            try {
                await axios.delete('/upload/deleteProfileImg');

                console.log('axios deleteProfileImg succsess');

                // 팝업 닫기 및 리듀서 프로필 이미지 수정
                dispatch({
                    type: 'SET_DIMMED_STATE',
                    dimmedState: !dimmedState,
                });
                dispatch({
                    type: 'SET_MODAL_CONTENTS',
                    modalContents: '',
                });
                dispatch({
                    type: 'SET_PROFILE_IMG',
                    u_pf_img: null,
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
            }
        }
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
            <p className="content_title">{TprofileImgEdit}</p>
            <div className="modal_btns_box">
                <label htmlFor='file' className="small_btns">{Tchange}</label>
                <div className="small_btns" onClick={deleteData}>{Tdel}</div>
                <div className="small_btns" onClick={dimmedClose}>{Tclose}</div>
            </div>
        </div>
    )
}

export default FormProfileImg