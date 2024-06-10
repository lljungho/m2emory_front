import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import GatherSvg from '../../utils/svg/GatherSvg';
import { useSelector } from 'react-redux';
import { setTruncate, setTruncateText } from '../../utils/handler/handlerUtils'; 

const FeedWrap = () => {
    const { t } = useTranslation();
    const user = useSelector(store => store.userInfo);
    const textarea = useRef();

    // 댓글 입력 시 textarea 높이 조정
    const adjustHeight = (e) => {
        const textareaElem = textarea.current;
        const textareaBtnElem = textareaElem.closest('.textareaBox').querySelector('.regBtn');
        textarea.current.style.height = '40px';
        if (e.target.value !== '') {
            textareaBtnElem.style.display = 'block';
            textareaElem.style.height = `${Math.min(textareaElem.scrollHeight, 130)}px`;
        } else {
            textareaBtnElem.style.display = 'none';
        }
    };

    // 텍스트 토글
    const maxLine = 2; // 줄임 표시 시 최대 줄 수
    const [originalTextCheck, setOriginalTextCheck] = useState(false);
    const [textTruncated, setTextTruncated] = useState(false); // 텍스트가 줄여진 상태 여부

    const originalTextToggle = () => {
        setOriginalTextCheck(!originalTextCheck);
    };

    // 초기 상태 체크
    useEffect(() => {
        setTruncate(
            user.user_pf_introduction, 
            setTextTruncated, 
            maxLine
        );
    }, [user.user_pf_introduction]);

    return (
        <div className='contents_inner_box'>
            <div className="content_feed_wrap">
                <div className="content_list_box">
                    {/*반복*/}
                    <div className="content_list">
                        <div className="content_box">
                            <div className="content_top_info">
                                <div className="cont_top_box">
                                    <div className="cont_top_info_profile_thumb cursorP">
                                        <div className="story_check_line">
                                            <div className="profile_thumb_box">
                                                <div className="thumbnail_img">
                                                    <img src={user.user_pf_img} alt="ProfileImg" className="thumbnail" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="cont_top_info_profile">
                                        <div className="profile_introduction">
                                            <p className="userId cursorP">
                                                {user.user_id}
                                                <span className="date">1분</span>
                                            </p>
                                            <p className="userName">{user.user_pf_name}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="cont_top_box">
                                    <div className="bdBtns cursorP">
                                        {t('follow')}
                                    </div>

                                    <div className="cont_top_icon_box cursorP">
                                        <GatherSvg name='more' title='menu' />
                                    </div>
                                </div>
                            </div>

                            <div className="content_info">
                                <div className="content_info_inner_box">
                                    <div className="contBox">
                                        <div className="content">
                                            Content Information
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="content_bot_info">
                                <div className="content_bot_info_box">
                                    <div className="content_bot_icon_box">
                                        <div className="icon_box">
                                            <div className="iconBox cursorP">
                                                <div className="icon like">
                                                    <GatherSvg
                                                        name='heart'
                                                        fill='var(--color8)'
                                                        color='var(--color8)'
                                                        title={t('like')}
                                                    />
                                                </div>
                                                <span className="num">123</span>
                                            </div>
                                            <div className="iconBox cursorP">
                                                <div className="icon comment">
                                                    <GatherSvg name='reply' />
                                                </div>
                                                <span className="num">123</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="content_bot_caption_box">
                                        <div className={`caption_box ${ textTruncated ? 'cursorP' : '' }`} onClick={ textTruncated ? originalTextToggle : null }>
                                            <div className='caption'>
                                                <p className={`captionTxt ${originalTextCheck ? 'on' : ''}`}>
                                                    { setTruncateText(user.user_pf_introduction, originalTextCheck, maxLine, t) }
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="content_bot_comment_box">
                                        <div className="comment_box">
                                            <div className="textareaBox">
                                                <textarea 
                                                    ref={textarea}
                                                    className="comment_write" 
                                                    placeholder={t('enterComment')}
                                                    onInput={adjustHeight}
                                                ></textarea>

                                                <div className="regBtn">
                                                    <div className="small_btns3 on cursorP">{t('submit')}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*// 반복*/}
                </div>
            </div>
        </div>
    )
}

export default FeedWrap;