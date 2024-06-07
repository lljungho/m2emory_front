import React from 'react'
import { useSelector } from 'react-redux';

import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import Footer2 from '../../include/footer/Footer2';

const SignWrap = () => {
    const signState = useSelector(store => store.contStatus.signState);

    return (
        <div className="signWrap">
            <div className="signInnerBox">
                <a href="/" className="logo"><h1>M<sup>2</sup>emory</h1></a>
                <div className="signBox wrapElement">
                    { signState ? 
                        <SignUpForm signState={signState} />
                    :
                        <SignInForm signState={signState} />
                    }
                </div>
            </div>

            <Footer2 />
        </div>
    )
}

export default SignWrap