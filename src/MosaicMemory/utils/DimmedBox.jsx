import React from 'react'
import { useDispatch } from 'react-redux'
import { setDimmedClose } from './handler/handlerUtils';

const DimmedBox = () => {
    // redux
    const dispatch = useDispatch();

    const dimmedClose = () => {
        setDimmedClose(dispatch);
    }

    return (
        <div className='dimmed_box_all' onClick={dimmedClose} ></div>
    )
}

export default DimmedBox;