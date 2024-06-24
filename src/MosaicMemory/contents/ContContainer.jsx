import React from 'react'
import { Route, Routes } from 'react-router-dom';
import ProfileEditWrap from './myPage/ProfileEditWrap';
import SearchWrap from './search/SearchWrap';
import MyPageWrap from './myPage/MyPageWrap';
import PostingWrap from './posting/PostingWrap';
import AccountCheck from './myPage/AccountCheck';

const EtcContainer = () => {
    return (
        <section className="contents_table_box2">
            <div className="contents_container">
                <Routes>
                    <Route path='/myPage' element={<MyPageWrap />}></Route>
                    <Route path='/setting/profile' element={<ProfileEditWrap />}></Route>
                    <Route path='/setting/account' element={<AccountCheck />}></Route>
                    <Route path='/posting/:post' element={<PostingWrap />}></Route>
                    <Route path='/search' element={<SearchWrap />}></Route>
                </Routes>
            </div>
        </section>
    )
}

export default EtcContainer;