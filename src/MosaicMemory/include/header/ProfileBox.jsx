import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import LogoutBtnBox from './LogoutBtnBox';

const ProfileBox = () => {
    const { t } = useTranslation();
    const Tfollower = t('follower');
    const Tfollowing = t('following');
    const Tsetting = t('setting');
    const Tprofile = t('profile');
    const TprofileEdit = t('profileEdit');
    const Tmore = t('more');
    const Tless = t('less');
    
    // redux    
    const dispatch = useDispatch();
    const user = useSelector(store => store.userInfo);

    // 컨텐츠 화면 전환
    const contContainerChange = () => {
        dispatch({
            type: 'SET_HEADER_SIDE_STATE',
            hdSideState: false
        });
    };

    // 텍스트 토글
    const [originalText, setOriginalText] = useState(false);
    const [textTruncated, setTextTruncated] = useState(false); // 텍스트가 줄여진 상태인지 여부 추가
    const originalTextToggle = () => {
        setOriginalText(!originalText);
    };

    // 프로필 소개 텍스트 줄임 함수
    const truncateText = (text) => {
        if (text) {
            const maxHeight = 80; // 최대 높이
            const lineHeight = 16; // line-height 값
            const maxLines = Math.floor(maxHeight / lineHeight); // 최대 표시할 줄 수
            const lines = text.split('\n'); // 줄 단위로 나눔
    
            if (lines.length > maxLines && !originalText) {
                // 최대 줄 수를 초과하는 경우 텍스트 자르기
                const truncatedLines = lines.slice(0, maxLines - 1); // 마지막 줄은 줄임표로 대체하기 때문에 -1
                const truncatedText = truncatedLines.join('\n') + ' '; // 줄임표 추가
                return (
                    <>
                        {truncatedText} 
                        <span className='moreBtn'>...<span className='moreTxt'> {Tmore}</span></span>
                    </>
                )
            }

            return text; // 최대 줄 수를 초과하지 않는 경우 원본 텍스트 반환
        }
    };

    // 텍스트의 줄임 상태를 계산하는 함수
    useEffect(() => {
        if (user.u_pf_introduction) {
            const maxHeight = 80; // 최대 높이
            const lineHeight = 16; // line-height 값
            const maxLines = Math.floor(maxHeight / lineHeight); // 최대 표시할 줄 수
            const lines = user.u_pf_introduction.split('\n'); // 줄 단위로 나눔

            if (lines.length > maxLines) {
                setTextTruncated(true);
            } else {
                setTextTruncated(false);
            }
        }
    }, [user.u_pf_introduction]);

    return (
        <div id='area_profile'>
            <div className="profile_box">
                <div className="profileThumbBox">
                    <div className="profileImgBox">
                        <img src={ user.u_pf_img } alt={Tprofile} className="profileImg" />
                    </div>
                </div>

                <div className="accountInfoBox">
                    <div className="accountBox">
                        <p className="accoutName">{user.u_id}</p>
                    </div>

                    <div className="followBox">
                        <div className="followBtnBox">
                            <Link to='' className="followBtn" onClick={contContainerChange}>
                                <span className="followTxt">{Tfollower}</span>
                                <span className="followNum">1111</span>
                            </Link>
                        </div>

                        <div className="followBtnBox">
                            <Link to='' className="followBtn" onClick={contContainerChange}>
                                <span className="followTxt">{Tfollowing}</span>
                                <span className="followNum">111</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            { (user.u_pf_name || user.u_pf_introduction) &&
                <div className="profile_introduce_box">
                    { user.u_pf_name &&
                    <div className="profile_text_box">
                        <p className="profile_name">{user.u_pf_name}</p>
                    </div>
                    }
                    
                    { user.u_pf_introduction &&
                    <div className="profile_text_box" onClick={textTruncated ? originalTextToggle : null}>
                        <p className={`profile_introduce ${originalText ? 'on' : ''}`}>
                            {truncateText(user.u_pf_introduction)}
                            {originalText ? <span className='moreBtn'><span className='moreTxt'>  {Tless}</span></span> : null}                        
                        </p>
                    </div>
                    }
                </div>
            }

            <div className="profile_btns_box">
                <Link to='/contents/profile' className="small_btns" onClick={contContainerChange}>{TprofileEdit}</Link>
                <Link to='/setting' className="small_btns" onClick={contContainerChange}>{Tsetting}</Link>
                <LogoutBtnBox />
            </div>
        </div>
    )
}

export default ProfileBox