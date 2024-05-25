const initial_state = {
    colorMode: localStorage.getItem('colorMode') === "true",
};

export const setColorModeReducer = (currentState = initial_state , action) => {
    switch (action.type) {
        case 'SET_COLOR_MODE':
            return { ...currentState,
                colorMode: action.colorMode,
            };
  
        case 'CLEAR_ALL_STATE':
            return {
                ...currentState,
                colorMode: localStorage.getItem('colorMode') === "true",
            };

        default:
            return currentState;
    }
};

export default setColorModeReducer; 