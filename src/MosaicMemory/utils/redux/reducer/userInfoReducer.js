const serverUrl = process.env.REACT_APP_SERVER_URL;
const basicProfileImg = process.env.REACT_APP_BASIC_PROFILE_IMG;

const initial_state = {
    user_id: null,
    user_email: null,
    user_pf_img: null,
    user_pf_name: null,
    user_pf_introduction: null,
};
    
export const setUserInfoReducer = (currentState = initial_state, action) => {
    switch (action.type) {
        case 'SET_USER_INFO':
            return { ...currentState,
                ...action.payload,
                user_pf_img: action.payload.user_pf_img ? `${serverUrl}/${action.payload.user_id}/${action.payload.user_pf_img}` : basicProfileImg,
            }; 
        
        case 'SET_PROFILE_INFO':
            return { ...currentState,
                user_pf_name: action.user_pf_name,
                user_pf_introduction: action.user_pf_introduction,
            };

        case 'SET_PROFILE_IMG':
            return { ...currentState,
                user_pf_img: action.user_pf_img ? `${serverUrl}/${currentState.user_id}/${action.user_pf_img}` : basicProfileImg,
            };

        case 'CLEAR_ALL_STATE':
            return initial_state;

        default:
            return currentState;
    }
};

export default setUserInfoReducer; 