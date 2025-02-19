import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import { deleteProfileImg, modifyProfileImgPutData } from '../../axios/axiosUtils';
import { handleFileCheck, setResizerFile } from '../../handler/handlerUtils';

import ContTitleBox from '../../../include/contents/ContTitleBox';
import ProfileImgBox from '../../../include/contents/ProfileImgBox';

const FormProfileImg = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const user = useSelector(store => store.userInfo);
    const [profileImg, setProfileImg] = useState(user.user_pf_img);
    const [btnOn, setBtnOn] = useState(false);
    const inputFile = useRef();

    // 파일 인풋 데이터 체크
    const fileCheck = async () => {
        const file = inputFile.current.files[0];
        console.log("File selected:", file);

        // 파일이 선택되지 않았을 경우
        if (!file) {
            return (
                setBtnOn(false),
                setProfileImg(user.user_pf_img)
            )
        }

        // 파일 유형, 사이즈 검사
        if (!handleFileCheck(file, ['image/'])) {
            alert(t('profileImgUploadErr'));
            return (
                setBtnOn(false),
                setProfileImg(user.user_pf_img)
            )
        };
        
        setProfileImg(URL.createObjectURL(file));
        setBtnOn(true);
    }

    // 프로필 이미지 업로드
    const putData = async (e) => {
        const confirmOk = window.confirm(t('changeConfirm'));
        if (confirmOk) {
            const file = inputFile.current.files[0];
            const { resizedFile } = await setResizerFile(file, 'webp', '200'); // 파일, 파일형식, 너비
            console.log("Resized file:", resizedFile);
            
            let formData = new FormData();
            formData.append('file', resizedFile);

            modifyProfileImgPutData(
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
        <div className="modal_inner_box">
            <div className='modal_box'>
                <input
                    type="file"
                    name="file"
                    id="file"
                    accept='image/*'
                    className='displayNone'
                    ref={inputFile}
                    onChange={fileCheck}
                />
                <ContTitleBox
                    title={t('profileImgEdit')}
                    close={true}
                />
                <div className="modal_info_box">
                    <div className="profile_thumb_box">
                        <label htmlFor="file" className='cursorP'>
                            <ProfileImgBox img={ profileImg } />
                        </label>
                        <label htmlFor="file" className='small_btns3 on'>{t('select')}</label>
                    </div>
                    <div className="modal_btns_box">
                        { btnOn ?
                            <div className="modal_btns small_btns2 on" onClick={putData}>{t('change')}</div>
                        :
                            <div className="modal_btns small_btns2">{t('change')}</div>
                        }
                        { user.user_pf_img === '/images/image/profile.jpg' ?
                            <div className="modal_btns small_btns2">{t('del')}</div>
                        :
                            <div className="modal_btns small_btns2 on" onClick={deleteData}>{t('del')}</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormProfileImg