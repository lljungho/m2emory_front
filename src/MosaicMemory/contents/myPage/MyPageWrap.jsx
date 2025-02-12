import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { setTruncate, setTruncateText } from '../../utils/handler/handlerUtils';
import GatherSvg from '../../utils/svg/GatherSvg';
import ProfileImgBox from '../../include/contents/ProfileImgBox';

const MyPageWrap = () => {
    const { t } = useTranslation();
    const user = useSelector(store => store.userInfo);

    // 텍스트 토글
    const maxLine = 5; // 줄임 표시 시 최대 줄 수
    const [originalTextCheck, setOriginalTextCheck] = useState(false);
    const [textTruncated, setTextTruncated] = useState(false); // 텍스트가 줄여진 상태 여부
    const originalTextToggle = () => {
        setOriginalTextCheck(!originalTextCheck);
    };

    // 초기 상태 체크
    useEffect(() => {
        setTruncate(user.user_pf_introduction, setTextTruncated, maxLine);
    }, [user.user_pf_introduction]);

    return (
        <div className='content_info_box'>
            <div className="contentInfoBox">
                <div className="my_profile_wrap wrapElement">
                    <div className="my_profile_box">
                        <ProfileImgBox img={user.user_pf_img} />

                        <div className="profileFollowBox">
                            <div className="prifile_id_box">
                                <h2 className='prifile_id'>{user.user_id}</h2>
                                <div className="title_btns_container">
                                    
                                    <div className="title_btn_icon">
                                        <GatherSvg name='setting' />
                                    </div>

                                    <div className="title_btns_box">
                                        <div className="title_btns_list wrapElement">
                                            <Link to='/contents/setting/profile' className="title_btns">{t('profileEdit')}
                                            </Link>
                                            <Link to='/contents/setting/account' className="title_btns">{t('accountSet')}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="profileFollow">
                                <div className="profileFollowBtns cursorP">
                                    <span className="text">{t('follower')}</span>
                                    <span className="num">123</span>
                                </div>
                                <div className="profileFollowBtns cursorP">
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

                    { (user.user_pf_name || user.user_pf_introduction) &&
                    <div className="my_profile_info_box">
                        <div className="profile_introduce_box innerElement">
                            { user.user_pf_name && 
                            <div className="profile_text_box">
                                <p className="profile_name">{user.user_pf_name}</p>
                            </div>
                            }

                            { user.user_pf_introduction &&
                            <div 
                                className={`profile_text_box ${ textTruncated ? 'cursorP' : '' }`}
                                onClick={ textTruncated ? originalTextToggle : null }
                            >
                                <p className={`profile_introduce ${originalTextCheck ? 'on' : ''}`}>
                                    { setTruncateText(user.user_pf_introduction, originalTextCheck, maxLine, t) }
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