import React from 'react'
import { Route, Routes } from 'react-router-dom';
import ProfileEditWrap from './myPage/ProfileEditWrap';
import SettingWrap from './setting/SettingWrap';
import SearchWrap from './search/SearchWrap';
import MyPageWrap from './myPage/MyPageWrap';

const EtcContainer = () => {
    return (
        <section className="contents_table_box2">
            <div className="contents_container">
                <Routes>
                    <Route path='/myPage' element={<MyPageWrap />}></Route>
                    <Route path='/profileEdit' element={<ProfileEditWrap />}></Route>
                    <Route path='/setting' element={<SettingWrap />}></Route>
                    <Route path='/search' element={<SearchWrap />}></Route>
                </Routes>
            </div>
        </section>
    )
}

export default EtcContainer;