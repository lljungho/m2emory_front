import React from 'react'
import GatherSvg from '../../utils/svg/GatherSvg';
import { useSelector } from 'react-redux';

const FeedWrap = () => {
    const user = useSelector(store => store.userInfo);

    return (
        <div className='contents_inner_box'>
            <div className="content_feed_wrap">
                <div className="content_list_box">
                    {/*반복*/}
                    <div className="content_list">
                        <div className="content_box">
                            <div className="content_top_info">
                                <div className="cont_top_box">
                                    <div className="cont_top_info_profile_thumb cursorPointer">
                                        <div className="story_check_line">
                                            <div className="profile_thumb_box">
                                                <div className="thumbnail_img">
                                                    <img src={user.u_pf_img} alt="ProfileImg" className="thumbnail" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="cont_top_info_profile">
                                        <div className="profile_introduction">
                                            <p className="userId">
                                                {user.u_id}
                                                <span className="date">1분</span>
                                            </p>
                                            <p className="userName">{user.u_pf_name}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="cont_top_box">
                                    <div className="cont_top_icon_box cursorPointer">
                                        <GatherSvg name='menu' title='메뉴' />
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
                                            <div className="icon like">
                                                <GatherSvg name='menu' />
                                            </div>
                                            <div className="icon comment">
                                                <GatherSvg name='menu' />
                                            </div>
                                        </div>

                                        <div className="icon_box">
                                            <div className="icon share">
                                                <GatherSvg name='menu' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="content_bot_caption_box">
                                        <div className="caption_box">
                                            <div className="cont_like_num">
                                                <span className="contLikeBtn cursorPointer">123 likes</span>
                                            </div>

                                            <div className="caption">
                                                <span className="captionTxt">
                                                    blah? blah blahblah blah.. blah!
                                                </span>
                                            </div>

                                            <div className="comment_all">
                                                <span className="commentAllBtn cursorPointer">
                                                    view all 123 commemts
                                                </span>
                                            </div>
                                        </div>

                                        <div className="comment_box">
                                            <div className="comment_write_box">
                                                <div className="comment_write">
                                                    <input type="text" placeholder='comment' />
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