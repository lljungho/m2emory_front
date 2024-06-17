const initial_state = {
    dimmedState: false,
    modalContents: '',
};
    
export const setContStatusesReducer = (currentState = initial_state, action) => {
    switch (action.type) {
        case 'SET_DIMMED_STATE':
            return { ...currentState,
                dimmedState: action.dimmedState,
            };
        
        case 'SET_MODAL_CONTENTS':
            return { ...currentState,
                modalContents: action.modalContents,
            };
  
        case 'CLEAR_ALL_STATE':
            return initial_state;

        default:
            return currentState;
    }
};

export default setContStatusesReducer; 