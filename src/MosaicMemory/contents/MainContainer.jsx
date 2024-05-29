import React from 'react'
import useWindowWidth from '../utils/useWindowWidth'
import StoryWrap from './story/StoryWrap'
import FeedWrap from './feed/FeedWrap'
import ScheduleWrap from './schedule/ScheduleWrap'
import PostingWrap from './posting/PostingWrap'

const MainContainer = () => {
    const windowWidth = useWindowWidth();

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

            { windowWidth > 1240 &&
                <div className="section_container sub">
                    <div className="section_box">
                        <div className="contInfo">
                            <ScheduleWrap />
                        </div>
                    </div>
                    <div className="section_box">
                        <div className="contInfo">
                            <PostingWrap />
                        </div>
                    </div>
                </div>
            }
            
        </section>
    )
}

export default MainContainer