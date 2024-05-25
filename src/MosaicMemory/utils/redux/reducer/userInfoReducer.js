const serverUrl = process.env.REACT_APP_SERVER_URL;
const basicProfileImg = process.env.REACT_APP_BASIC_PROFILE_IMG;

const initial_state = {
    u_id: null,
    u_email: null,
    u_pf_img: null,
    u_pf_name: null,
    u_pf_introduction: null,
};
    
export const setUserInfoReducer = (currentState = initial_state, action) => {
    switch (action.type) {
        case 'SET_USER_INFO':
            return { ...currentState,
                ...action.payload,
                u_pf_img: action.payload.u_pf_img ? `${serverUrl}/${action.payload.u_id}/${action.payload.u_pf_img}` : basicProfileImg,
            }; 
        
        case 'SET_PROFILE_INFO':
            return { ...currentState,
                u_pf_name: action.u_pf_name,
                u_pf_introduction: action.u_pf_introduction,
            };

        case 'SET_PROFILE_IMG':
            return { ...currentState,
                u_pf_img: action.u_pf_img ? `${serverUrl}/${currentState.u_id}/${action.u_pf_img}` : basicProfileImg,
            };

        case 'CLEAR_ALL_STATE':
            return initial_state;

        default:
            return currentState;
    }
};

export default setUserInfoReducer; 