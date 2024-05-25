import React from 'react'
import { Route, Routes } from 'react-router-dom';
import ProfileWrap from './profile/ProfileWrap';
import SettingWrap from './setting/SettingWrap';

const EtcContainer = () => {
    return (
        <section className="contents_table_box">
            <div className="section_container etc">
                <div className="section_box on">
                    <div className="contInfo">
                        <Routes>
                            <Route path='/profile' element={<ProfileWrap />}></Route>
                            <Route path='/setting' element={<SettingWrap />}></Route>
                        </Routes>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EtcContainer