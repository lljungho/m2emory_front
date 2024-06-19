import React from 'react'

const SubmitBtnsBox = ({ errorsCheck, text }) => {
    return (
        <div className="btns_box">
            { errorsCheck ?
                <button type="submit" className='btns on'>{text}</button>
            :
                <button type='button' className='btns'>{text}</button>
            }
        </div>
    )
}

export default SubmitBtnsBox