import React from 'react'

const SubmitBtnsBox = ({ errorsCheck, text, onClick }) => {
    return (
        <div className="btns_box">
            { errorsCheck ?
                <button type="submit" className='btns on' onClick={onClick ? onClick : null}>{text}</button>
            :
                <div className='btns'>{text}</div>
            }
        </div>
    )
}

export default SubmitBtnsBox