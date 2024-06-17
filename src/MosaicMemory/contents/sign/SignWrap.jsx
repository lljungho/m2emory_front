import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Footer2 from '../../include/footer/Footer2';
import Logo from '../../include/logo/Logo';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import ForgotIdForm from './ForgotIdForm';
import ForgotPwFrom from './ForgotPwFrom';

const SignWrap = () => {
    return (
        <div className="signWrap">
            <div className="signInnerBox">
                <Logo />
                <div className="signBox wrapElement">
                    <Routes>
                        <Route path='/' element={<SignInForm />}></Route>
                        <Route path='/signUp' element={<SignUpForm />}></Route>
                        <Route path='/forgotId' element={<ForgotIdForm />}></Route>
                        <Route path='/forgotPw' element={<ForgotPwFrom />}></Route>
                    </Routes>
                </div>
            </div>

            <Footer2 />
        </div>
    )
}

export default SignWrap