import React from 'react'
import StoryWrap from './story/StoryWrap'
import FeedWrap from './feed/FeedWrap'
import ScheduleWrap from './schedule/ScheduleWrap'
import GuestBookWrap from './guest/GuestBookWrap'
import AlbumWrap from './album/AlbumWrap'
import DiaryWrap from './diary/DiaryWrap'
import PostingWrap from './posting/PostingWrap'

const MainContainer = () => {
    return (
        <section className="contents_table_box">
            <div className="section_container main">
                <div className="section_box">
                    <div className="contInfo">
                        <StoryWrap />
                        
                        <FeedWrap />
                    </div>
                </div>
            </div>

            <div className="section_container sub">
                <div className="section_box">
                    <div className="contInfo">
                        <ScheduleWrap />
                    </div>
                </div>
                <div className="section_box">
                    <div className="contInfo">
                        <DiaryWrap />
                    </div>
                </div>
                <div className="section_box">
                    <div className="contInfo">
                        <AlbumWrap />
                    </div>
                </div>
                <div className="section_box">
                    <div className="contInfo">
                        <PostingWrap />
                    </div>
                </div>
                <div className="section_box">
                    <div className="contInfo">
                        <GuestBookWrap />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MainContainer