import React from 'react'
import { useTranslation } from 'react-i18next';

import GatherSvg from '../svg/GatherSvg';

const RecentSearchBox = () => {
    const { t } = useTranslation();

    return (
        <div className="searchRecentBox">
            <div className="searchPopular">
                <div className="recentTop">
                    <p className="recent_title">{t('popular')}</p>
                </div>

                <div className="popularListbox">
                    <span className="popularList">모자이크메모리</span>
                    <span className="popularList">고양이</span>
                    <span className="popularList">강아지</span>
                    <span className="popularList">mosaicmemory</span>
                    <span className="popularList">맛집</span>
                </div>
            </div>

            <div className="searchRecent">
                <div className="recentTop">
                    <p className="recent_title">{t('recent')}</p>
                    <span className='TxtBtns'>{t('delAll')}</span>
                </div>

                <div className="recentInfoListWrap">
                    <div className="recentInfoBox">
                        <div className="recentHistoryBox">
                            <span className="recentInfoList">
                                <div className="recentInfo">
                                    <div className="icon"><GatherSvg name='search' color={'var(--baseRGB_b)'} /></div>
                                    <p className="historyKeyword">테스트</p>
                                </div>
                            </span>
                            <span className="recentDel"></span>
                        </div>
                        <div className="recentHistoryBox">
                            <span className="recentInfoList">
                                <div className="recentInfo">
                                    <div className="icon"><GatherSvg name='search' color={'var(--baseRGB_b)'} /></div>
                                    <p className="historyKeyword">테스트</p>
                                </div>
                            </span>
                            <span className="recentDel"></span>
                        </div>
                        <div className="recentHistoryBox">
                            <span className="recentInfoList">
                                <div className="recentInfo">
                                    <div className="icon"><GatherSvg name='search' color={'var(--baseRGB_b)'} /></div>
                                    <p className="historyKeyword">테스트</p>
                                </div>
                            </span>
                            <span className="recentDel"></span>
                        </div>
                        <div className="recentHistoryBox">
                            <span className="recentInfoList">
                                <div className="recentInfo">
                                    <div className="icon"><GatherSvg name='search' color={'var(--baseRGB_b)'} /></div>
                                    <p className="historyKeyword">테스트</p>
                                </div>
                            </span>
                            <span className="recentDel"></span>
                        </div>
                        <div className="recentHistoryBox">
                            <span className="recentInfoList">
                                <div className="recentInfo">
                                    <div className="icon"><GatherSvg name='search' color={'var(--baseRGB_b)'} /></div>
                                    <p className="historyKeyword">테스트</p>
                                </div>
                            </span>
                            <span className="recentDel"></span>
                        </div>
                        <div className="recentHistoryBox">
                            <span className="recentInfoList">
                                <div className="recentInfo">
                                    <div className="icon"><GatherSvg name='search' color={'var(--baseRGB_b)'} /></div>
                                    <p className="historyKeyword">테스트</p>
                                </div>
                            </span>
                            <span className="recentDel"></span>
                        </div>
                        <div className="recentHistoryBox">
                            <span className="recentInfoList">
                                <div className="recentInfo">
                                    <div className="icon"><GatherSvg name='search' color={'var(--baseRGB_b)'} /></div>
                                    <p className="historyKeyword">테스트</p>
                                </div>
                            </span>
                            <span className="recentDel"></span>
                        </div>
                        <div className="recentHistoryBox">
                            <span className="recentInfoList">
                                <div className="recentInfo">
                                    <div className="icon"><GatherSvg name='search' color={'var(--baseRGB_b)'} /></div>
                                    <p className="historyKeyword">테스트</p>
                                </div>
                            </span>
                            <span className="recentDel"></span>
                        </div>
                        <div className="recentHistoryBox">
                            <span className="recentInfoList">
                                <div className="recentInfo">
                                    <div className="icon"><GatherSvg name='search' color={'var(--baseRGB_b)'} /></div>
                                    <p className="historyKeyword">테스트</p>
                                </div>
                            </span>
                            <span className="recentDel"></span>
                        </div>
                        <div className="recentHistoryBox">
                            <span className="recentInfoList">
                                <div className="recentInfo">
                                    <div className="icon"><GatherSvg name='search' color={'var(--baseRGB_b)'} /></div>
                                    <p className="historyKeyword">테스트</p>
                                </div>
                            </span>
                            <span className="recentDel"></span>
                        </div>
                        <div className="recentHistoryBox">
                            <span className="recentInfoList">
                                <div className="recentInfo">
                                    <div className="icon"><GatherSvg name='search' color={'var(--baseRGB_b)'} /></div>
                                    <p className="historyKeyword">테스트</p>
                                </div>
                            </span>
                            <span className="recentDel"></span>
                        </div>
                        <div className="recentHistoryBox">
                            <span className="recentInfoList">
                                <div className="recentInfo">
                                    <div className="icon"><GatherSvg name='search' color={'var(--baseRGB_b)'} /></div>
                                    <p className="historyKeyword">테스트</p>
                                </div>
                            </span>
                            <span className="recentDel"></span>
                        </div>
                        <div className="recentHistoryBox">
                            <span className="recentInfoList">
                                <div className="recentInfo">
                                    <div className="icon"><GatherSvg name='search' color={'var(--baseRGB_b)'} /></div>
                                    <p className="historyKeyword">테스트</p>
                                </div>
                            </span>
                            <span className="recentDel"></span>
                        </div>
                        <div className="recentHistoryBox">
                            <span className="recentInfoList">
                                <div className="recentInfo">
                                    <div className="icon"><GatherSvg name='search' color={'var(--baseRGB_b)'} /></div>
                                    <p className="historyKeyword">테스트</p>
                                </div>
                            </span>
                            <span className="recentDel"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentSearchBox