import React from 'react'
// import GatherSvg from './svg/GatherSvg'
import Logo from '../include/logo/Logo'

const Loading = () => {
    return (
        <div className="loadingBox">
            <Logo />
            
            {/* <div className="loadingIcon">
                <GatherSvg name='loading' />
            </div> */}
        </div>
    )
}

export default Loading