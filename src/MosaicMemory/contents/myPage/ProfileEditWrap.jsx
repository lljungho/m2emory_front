import React, { useState, useEffect } from 'react'
import { modifyProfilePutData } from '../../utils/axios/axiosUtils';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setCompareData } from '../../utils/handler/handlerUtils';

import ContTitleBox from '../../include/contents/ContTitleBox';
import ProfileImgBox from '../../include/contents/ProfileImgBox';
import SubmitBtnsBox from '../../utils/form/SubmitBtnsBox';

export const ProfileEditWrap = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const dimmedState = useSelector(store => store.contStatus.dimmedState);
    const user = useSelector(store => store.userInfo);
    const user_pf_name = user.user_pf_name || '';
    const user_pf_introduction = user.user_pf_introduction || '';

    const [name, setName] = useState(user_pf_name);
    const [introduction, setIntroduction] = useState(user_pf_introduction);
    
    // popup
    const profileEditPop = () => {
        dispatch({
            type: 'SET_DIMMED_STATE',
            dimmedState: !dimmedState
        });
        dispatch({
            type: 'SET_MODAL_CONTENTS',
            modalContents: 'FormProfileImg'
        });
    };

    // 프로필 내용 수정 요청
    const putData = () => {
        let formData = new FormData();
        formData.append('name', name);
        formData.append('introduction', introduction);

        modifyProfilePutData(
            formData,
            setCompareCheck,
            dispatch,
            handleErrorCallback,
            t,
        );
    };

    // 에러 처리
    const handleErrorCallback = () => {
        console.log('[Axios] modifyProfilePutData() communication error');
        setName(user_pf_name);
        setIntroduction(user_pf_introduction);
    };

    // 기존 데이터 비교
    const [compareCheck, setCompareCheck] = useState(false);
    useEffect(() => {
        const nameCompare = setCompareData(user_pf_name, name);
        const introductionCompare = setCompareData(user_pf_introduction, introduction);
        setCompareCheck(!(nameCompare && introductionCompare));
    }, [name, introduction, user_pf_name, user_pf_introduction]);
        
    // 글자 수 제한
    const maxLengthConfig = {
        name: 30,
        introduction: 150
    };

    // 글자 수 초기 값 설정
    const [nameLength, setNameLength] = useState(name.length);
    const [introductionLength, setIntroductionLength] = useState(introduction.length);

    // 입력 값 제한
    const handleInputValue = (e) => {
        let value = e.target.value;
        let maxLength = maxLengthConfig[e.target.name];

        if (value.length > maxLength) {
            value = value.slice(0, maxLength);
        }

        if (e.target.name === 'name') {
            setName(value);
            setNameLength(value.length);                    
        } 

        if (e.target.name === 'introduction') {
            setIntroduction(value);
            setIntroductionLength(value.length); 
        }
    };

    // textarea 줄바꿈 제한
    const handleKeyDown = (e) => {
        let value = e.target.value;
        let lineCount = (value.match(/\n/g) || []).length;

        if (lineCount >= 7 && e.key === 'Enter') {
            e.preventDefault();
            return;
        }
    };

    return (
        <div className='content_info_box'>
            <ContTitleBox
                title={t('profileEdit')}
                back={true}
            />

            <div className="contentInfoBox wrapElement">
                <p className="content_sub_title">{t('profileImg')}</p>
                <div className="editProfileImg innerElement">
                    <div className="editProfile cursorP" onClick={profileEditPop}>
                        <ProfileImgBox img={user.user_pf_img} />
                    </div>

                    <div className="small_btns3 on cursorP" onClick={profileEditPop}>{t('change')}</div>
                </div>
            </div>

            <div className="contentInfoBox wrapElement">
                <p className="content_sub_title">{t('name')}</p>
                <div className="editInputBox">
                    <input 
                        type="text" 
                        name="name" 
                        maxLength={maxLengthConfig.name} 
                        className='editInput innerElement' 
                        placeholder={t('name')} 
                        defaultValue={user_pf_name} 
                        onChange={handleInputValue}
                    />
                    <span className="limit_byte">{nameLength} / {maxLengthConfig.name}</span>
                </div>
            </div>

            <div className="contentInfoBox wrapElement">
                <p className="content_sub_title">{t('introduction')}</p>
                <div className="editInputBox">
                    <textarea 
                        name="introduction" 
                        maxLength={maxLengthConfig.introduction} 
                        className='editInput innerElement' 
                        placeholder={t('introduction')} 
                        defaultValue={user_pf_introduction} 
                        onChange={handleInputValue}
                        onKeyDown={handleKeyDown}
                    >
                    </textarea>
                    <span className="limit_byte">{introductionLength} / {maxLengthConfig.introduction}</span>
                </div>
            </div>

            <SubmitBtnsBox 
                errorsCheck={compareCheck}
                text={t('submit')} 
                onClick={putData}
            />
        </div>
    )
}

export default ProfileEditWrap
