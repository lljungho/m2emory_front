import React from 'react'
import { useDispatch } from 'react-redux'
import { setDimmedClose } from './handler/handlerUtils';

const DimmedBox = () => {
    const dispatch = useDispatch();

    return (
        <div className='dimmed_box_all' onClick={() => setDimmedClose(dispatch)} ></div>
    )
}

export default DimmedBox;