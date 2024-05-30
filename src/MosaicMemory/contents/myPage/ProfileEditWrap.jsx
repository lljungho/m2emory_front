import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { putModifyProfileData } from '../../utils/axios/axiosUtils';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import GatherSvg from '../../utils/svg/GatherSvg';

export const ProfileEditWrap = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        putModifyProfileData(
            name.current.value,
            introduction.current.value,
            t('profileUpdated'),
            setCompareCheck,
            dispatch,
            handleErrorCallback,
        );
    };

    // 에러 처리
    const handleErrorCallback = () => {
        console.log('[Axios] putModifyProfileData() communication error');
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
                <div className="title_box">
                    <h2 className='content_title'>
                        <div className="back_btn cursorPointer" onClick={() => navigate(-1)}>
                            <GatherSvg name='arrow' />
                        </div>
                        {t('profileEdit')}
                    </h2>
                </div>

                <div className="contentInfoBox">
                    <p className="content_sub_title">{t('profileImg')}</p>
                    <div className="profile_edit">
                        <div className="profile_thumb">
                            <div className="profile_img_box" onClick={profileEditPop}>
                                <img src={ user.u_pf_img } alt={t('profile')} className="profileImg" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contentInfoBox">
                    <p className="content_sub_title">{t('name')}</p>
                    <div className="editInputBox">
                        <input 
                            type="text" 
                            name="name" 
                            ref={name} 
                            maxLength={maxLengthConfig.name} 
                            className='editInput' 
                            placeholder={t('name')} 
                            defaultValue={user.u_pf_name} 
                            onChange={handleInputValue}
                        />
                        <span className="limit_byte">{nameLength} / {maxLengthConfig.name}</span>
                    </div>
                </div>

                <div className="contentInfoBox">
                    <p className="content_sub_title">{t('introduction')}</p>
                    <div className="editInputBox">
                        <textarea 
                            name="introduction" 
                            ref={introduction} 
                            maxLength={maxLengthConfig.introduction} 
                            className='editInput' 
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
