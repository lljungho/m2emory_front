import React, { useRef, useState, useEffect } from 'react'
import { modifyProfilePutData } from '../../utils/axios/axiosUtils';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import ContTitleBox from '../../include/contents/ContTitleBox';
import ProfileImgBox from '../../include/contents/ProfileImgBox';

export const ProfileEditWrap = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const dimmedState = useSelector(store => store.contStatus.dimmedState);
    const user = useSelector(store => store.userInfo);

    const name = useRef(null);
    const introduction = useRef(null);
    
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
        formData.append('name', name.current.value);
        formData.append('introduction', introduction.current.value);

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
        name.current.value = user.u_pf_name;
        introduction.current.value = user.u_pf_introduction;
        name.current.focus();
    };

    // 기존 데이터 비교
    const [compareCheck, setCompareCheck] = useState(false);
    const compareData = () => {
        const compare = name.current.value !== user.u_pf_name || introduction.current.value !== user.u_pf_introduction;
        setCompareCheck(compare);
    };

    // 글자 수 제한
    const maxLengthConfig = {
        name: 30,
        introduction: 150
    };

    // 글자 수 초기 값 설정
    const [nameLength, setNameLength] = useState(0);
    const [introductionLength, setIntroductionLength] = useState(0);
    useEffect(() => {
        if (name.current.value) {
            setNameLength(name.current.value.length);
        }
        if (introduction.current.value) {
            setIntroductionLength(introduction.current.value.length);
        }
    }, []);

    // 입력 값 제한
    const handleInputValue = (e) => {
        let value = e.target.value;
        let maxLength = maxLengthConfig[e.target.name];

        if (value.length > maxLength) {
            value = value.slice(0, maxLength);
        }

        if (e.target.name === 'name') {
            setNameLength(value.length);                    
        } 

        if (e.target.name === 'introduction') {
            setIntroductionLength(value.length); 
        }

        compareData();
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
        <>
            <div className='content_info_box'>
                <ContTitleBox
                    title={t('profileEdit')}
                    back={true}
                />

                <div className="contentInfoBox wrapElement">
                    <p className="content_sub_title">{t('profileImg')}</p>
                    <div className="editProfileImg">
                        <div className="editProfile cursorP" onClick={profileEditPop}>
                            <ProfileImgBox img={user.u_pf_img} />
                        </div>
                    </div>
                </div>

                <div className="contentInfoBox wrapElement">
                    <p className="content_sub_title">{t('name')}</p>
                    <div className="editInputBox">
                        <input 
                            type="text" 
                            name="name" 
                            ref={name} 
                            maxLength={maxLengthConfig.name} 
                            className='editInput innerElement' 
                            placeholder={t('name')} 
                            defaultValue={user.u_pf_name} 
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
                            ref={introduction} 
                            maxLength={maxLengthConfig.introduction} 
                            className='editInput innerElement' 
                            placeholder={t('introduction')} 
                            defaultValue={user.u_pf_introduction} 
                            onChange={handleInputValue}
                            onKeyDown={handleKeyDown}
                        >
                        </textarea>
                        <span className="limit_byte">{introductionLength} / {maxLengthConfig.introduction}</span>
                    </div>
                </div>

                <div className="btns_box">
                    { compareCheck ?
                        <button type="button" className='btns' onClick={putData}>{t('submit')}</button>
                    :
                        <button type='button' className='btns off'>{t('submit')}</button>
                    }
                </div>
            </div>
        </>
    )
}

export default ProfileEditWrap
