import React, { useRef, useState, useEffect } from 'react'
import axios from '../../utils/axios/axiosSet';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

export const ProfileEditWrap = () => {
    const { t } = useTranslation();
    const Tprofile = t('profile');
    const Ttitle = t('profileEdit');
    const Tname = t('name');
    const Tintroduction = t('introduction');
    const TprofileImg = t('profileImg');
    const TprofileUpdated = t('profileUpdated');
    const Tsubmit = t('submit');

    const name = useRef(null);
    const introduction = useRef(null);

    // server URL
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    // redux
    const dispatch = useDispatch();
    const dimmedState = useSelector(store => store.contStatus.dimmedState);
    const user = useSelector(store => store.userInfo);

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

    // 프로필 내용 변경
    const putData = async () => {
        console.log("[Axios] putData()");

        let formData = new FormData();
        formData.append('name', name.current.value);
        formData.append('introduction', introduction.current.value);

        console.log('FormData Entries:');
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        };

        try {
            const response = await axios.put(`${serverUrl}/member/modifyProfile`, formData, {
                headers: {
                    'Content-Type' : 'application/json',
                }
            });

            console.log("[Axios] put form data communication success!!");
            console.log(response.data);
            console.log(response.status);

            setCompareCheck(!compareCheck);
            alert(TprofileUpdated);

            // 유저 정보 리듀서에 저장
            dispatch({
                type: 'SET_PROFILE_INFO',
                u_pf_name: name.current.value,
                u_pf_introduction: introduction.current.value,
            });

        } catch(error) {
            console.log("[Axios] put form data communication error!!");
            console.log(error.config);
            
            name.current.value = user.u_pf_name;
            introduction.current.value = user.u_pf_introduction;
            name.current.focus();

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

        if (lineCount >= 10 && e.key === 'Enter') {
            e.preventDefault();
            return;
        }
    };

    return (
        <>
            <div className='content_info_box'>
                <h2 className='content_title'>{Ttitle}</h2>

                <div className="contentInfoBox">
                    <p className="content_sub_title">{TprofileImg}</p>
                    <div className="profile_edit">
                        <div className="profile_thumb">
                            <div className="profile_img_box" onClick={profileEditPop}>
                                <img src={ user.u_pf_img } alt={Tprofile} className="profileImg" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contentInfoBox">
                    <p className="content_sub_title">{Tname}</p>
                    <div className="editInputBox">
                        <input 
                            type="text" 
                            name="name" 
                            ref={name} 
                            maxLength={maxLengthConfig.name} 
                            className='editInput' 
                            placeholder={Tname} 
                            defaultValue={user.u_pf_name} 
                            onChange={handleInputValue}
                        />
                        <span className="limit_byte">{nameLength} / {maxLengthConfig.name}</span>
                    </div>
                </div>

                <div className="contentInfoBox">
                    <p className="content_sub_title">{Tintroduction}</p>
                    <div className="editInputBox">
                        <textarea 
                            name="introduction" 
                            ref={introduction} 
                            maxLength={maxLengthConfig.introduction} 
                            className='editInput' 
                            placeholder={Tintroduction} 
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
                        <button type="button" className='btns' onClick={putData}>{Tsubmit}</button>
                    :
                        <button type='button' className='btns off'>{Tsubmit}</button>
                    }
                </div>
            </div>
        </>
    )
}

export default ProfileEditWrap
