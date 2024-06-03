import React, { useState } from 'react'
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import Footer2 from '../../include/footer/Footer2';

const SignWrap = () => {
    const [signType, setSignType] = useState(false);

    return (
        <div className="signWrap">
            <div className="signInnerBox">
                <a href="/" className="logo"><h1>M<sup>2</sup>emory</h1></a>
                <div className="signBox">
                    { signType ? 
                        <SignUpForm setSignType={setSignType} />
                    :
                        <SignInForm
                            setSignType={setSignType} 
                        />
                    }
                </div>
            </div>

            <Footer2 />
        </div>
    )
}

export default SignWrap