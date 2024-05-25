import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import GatherSvg from '../svg/GatherSvg';
import RecentSearchBox from './RecentSearchBox';

const SearchBox = ({ searchBoxOn, setSearchBoxOn }) => {
    const { t } = useTranslation();
    const tClose = t('close');
    const tSearch = t('search');
    const tDel = t('del');

    const searchDelBtn = document.querySelector('.funcBtn');
    const searchInput = document.querySelector('#searchStr');

    //검색창 포커스
    useEffect(() => {
        if (searchBoxOn) {
            searchInput.focus();
        }
    },[searchBoxOn, searchInput])

    //검색창 닫기
    const closeSearchBoxHandler = () => {
        setSearchBoxOn(false);
        searchInput.value = '';
        searchDelBtn.classList.remove('on');
    }

    //인풋
    const inputValueDelBtnOn = (e) => {

        if (e.target.value !== '') {
            searchDelBtn.classList.add('on');
        } else {
            searchDelBtn.classList.remove('on');
        }
    }

    const inputValueDel = () => {
        searchInput.value = '';
        searchInput.focus();
        searchDelBtn.classList.remove('on');
    }

    return (
        <div className={`searchBox ${searchBoxOn ? 'on' : ''}`}>
            <div className="searchInfoBox">
                <div className="toggleBtn" onClick={closeSearchBoxHandler}>
                    <GatherSvg name='arrow' title={tClose} />
                </div>

                <div className="searchInputBox">
                    <div className="ico_search">
                        <GatherSvg name='search' color='var(--baseRGB_b)' title={tSearch} />
                    </div>

                    <input type="text" name="searchStr" id="searchStr" placeholder={tSearch} onInput={inputValueDelBtnOn} autoComplete="off" />

                    <div className="funcBtnsBox">
                        <div className="funcBtn" onClick={inputValueDel}>
                            <GatherSvg name='delBtn' title={tDel} />
                        </div>
                    </div>
                </div>

                <RecentSearchBox />
            </div>
        </div>
    )
}

export default SearchBox