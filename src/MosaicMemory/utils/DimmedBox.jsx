import React from 'react'
import { useDispatch } from 'react-redux'
import { handleDimmedClose } from './handler/handlerUtils';

const DimmedBox = () => {
    // redux
    const dispatch = useDispatch();

    const dimmedClose = () => {
        handleDimmedClose(dispatch);
    }

    return (
        <div className='dimmed_box_all' onClick={dimmedClose} ></div>
    )
}

export default DimmedBox;