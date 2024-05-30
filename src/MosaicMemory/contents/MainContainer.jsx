import React from 'react'
import { useWindowWidth } from '../utils/hook/customHookUtils'
import StoryWrap from './story/StoryWrap'
import FeedWrap from './feed/FeedWrap'

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
                            <div className="contents_inner_box">
                                내 포스팅
                            </div>
                        </div>
                    </div>
                    <div className="section_box">
                        <div className="contInfo">
                            <div className="contents_inner_box">
                                내 스케줄
                            </div>
                        </div>
                    </div>
                </div>
            }
            
        </section>
    )
}

export default MainContainer