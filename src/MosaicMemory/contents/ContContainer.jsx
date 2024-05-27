import React from 'react'
import { Route, Routes } from 'react-router-dom';
import ProfileWrap from './profile/ProfileWrap';
import SettingWrap from './setting/SettingWrap';
import SearchWrap from './search/SearchWrap';

const EtcContainer = () => {
    return (
        <section className="contents_table_box2">
            <div className="contents_container">
                <Routes>
                    <Route path='/profile' element={<ProfileWrap />}></Route>
                    <Route path='/setting' element={<SettingWrap />}></Route>
                    <Route path='/search' element={<SearchWrap />}></Route>
                </Routes>
            </div>
        </section>
    )
}

export default EtcContainer