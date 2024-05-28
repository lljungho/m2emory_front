import React, { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next';

import RecentSearchBox from './recent/RecentSearchBox';
import GatherSvg from '../../utils/svg/GatherSvg';

export const ProfileWrap = () => {
    const { t } = useTranslation();
    const Ttitle = t('search');
    const Tsearch = t('search');
    const Tdel = t('del');
    const Trecent = t('recent');

    const searchInput = useRef(null);
    const searchDelBtn = useRef(null);

    //인풋
    const getData = (e) => {
        if (e.target.value !== '') {
            searchDelBtn.current.classList.add('on');
        } else {
            searchDelBtn.current.classList.remove('on');
        }
    }

    const inputValueDel = () => {
        searchInput.current.value = '';
        searchInput.current.focus();
        searchDelBtn.current.classList.remove('on');
    }

    useEffect(() => {
        searchInput.current.focus();
    }, []);

    return (
        <>
            <div className='content_info_box'>
                <h2 className='content_title'>{Ttitle}</h2>

                <div className="contentInfoBox">
                    <div className='searchBox'>
                        <div className="searchInfoBox">
                            <div className="searchInputBox">
                                <div className="ico_search">
                                    <GatherSvg name='search' color='var(--baseRGB_b)' title={Tsearch} />
                                </div>

                                <input type="text" name="searchStr" id="searchStr" ref={searchInput} placeholder={Tsearch} onChange={getData} autoComplete="off" />

                                <div className="funcBtnsBox">
                                    <div className="funcBtn" ref={searchDelBtn} onClick={inputValueDel}>
                                        <GatherSvg name='delBtn' title={Tdel} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contentInfoBox">
                    <div className="recentTop">
                        <p className="content_sub_title">{Trecent}</p>
                        <span className='TxtBtns'>{t('delAll')}</span>
                    </div>

                    <RecentSearchBox />
                </div>
            </div>
        </>
    )
}

export default ProfileWrap