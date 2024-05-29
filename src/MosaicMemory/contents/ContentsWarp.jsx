import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Header from '../include/header/Header'
import Footer from '../include/footer/Footer'
import MainContainer from './MainContainer'
import ContContainer from './ContContainer'

const ContentsWarp = () => {
    return (
        <>
            <Header />

            <main id="contentsWrap">
                <div className="contentsBox">
                    <div className="cont_Wrapper">
                        <div className="contents">
                        <Routes>
                            <Route path='/' element={<MainContainer />}></Route>
                            <Route path='/contents/*' element={<ContContainer />}></Route>   
                        </Routes>   
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    )
}

export default ContentsWarp;