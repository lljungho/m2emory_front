import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { setTruncate, truncateText } from '../../utils/handler/handlerUtils';
import GatherSvg from '../../utils/svg/GatherSvg';

const MyPageWrap = () => {
    const { t } = useTranslation();
    const user = useSelector(store => store.userInfo);

    // 텍스트 토글
    const [originalText, setOriginalText] = useState(false);
    const [textTruncated, setTextTruncated] = useState(false); // 텍스트가 줄여진 상태 여부
    const originalTextToggle = () => {
        setOriginalText(!originalText);
    };

    // 텍스트의 줄임 상태를 계산하는 함수
    useEffect(() => {
        setTruncate(user.u_pf_introduction, setTextTruncated);
    }, [user.u_pf_introduction]);

    return (
        <div className='content_info_box'>
            <div className="contentInfoBox">
                <div className="my_profile_wrap">
                    <div className="my_profile_box">
                        <div className="profileImgBox">
                            <div className="profileThumb">
                                <img src={ user.u_pf_img } alt={t('profile')} className="thumbnail" />
                            </div>
                        </div>

                        <div className="profileFollowBox">
                            <div className="title_box">
                                <h2 className='content_title'>{user.u_id}</h2>
                                <Link to='/contents/profileEdit' className="title_btn">
                                    <GatherSvg name='setting' />
                                </Link>
                            </div>

                            <div className="profileFollow">
                                <div className="profileFollowBtns cursorPointer">
                                    <span className="text">{t('follower')}</span>
                                    <span className="num">123</span>
                                </div>
                                <div className="profileFollowBtns cursorPointer">
                                    <span className="text">{t('following')}</span>
                                    <span className="num">123</span>
                                </div>
                                <div className="profileFollowBtns">
                                    <span className="text">{t('post')}</span>
                                    <span className="num">123</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    { (user.u_pf_name || user.u_pf_introduction) &&
                    <div className="my_profile_info_box">
                        <div className="profile_introduce_box">
                            { user.u_pf_name && 
                            <div className="profile_text_box">
                                <p className="profile_name">{user.u_pf_name}</p>
                            </div>
                            }

                            { user.u_pf_introduction &&
                            <div className="profile_text_box" onClick={textTruncated ? originalTextToggle : null}>
                                <p className={`profile_introduce ${originalText ? 'on' : ''}`}>
                                    {truncateText(user.u_pf_introduction, originalText, t('more'))}
                                    {originalText ? <span className='moreBtn'><span className='moreTxt'>  {t('less')}</span></span> : null}   
                                </p>
                            </div>
                            }
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default MyPageWrap;