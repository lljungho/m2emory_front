import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const DimmedBox = () => {
    // redux
    const dispatch = useDispatch();
    const dimmedState = useSelector(store => store.contStatus.dimmedState);

    const dimmedClose = () => {
        dispatch({
            type: 'SET_DIMMED_STATE',
            dimmedState: !dimmedState,
        });
        dispatch({
            type: 'SET_MODAL_CONTENTS',
            modalContents: '',
        });
    }

    return (
        <div className='dimmed_box_all' onClick={dimmedClose} ></div>
    )
}

export default DimmedBox