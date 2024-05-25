const initial_state = {
	sessionID: sessionStorage.getItem('sessionID'),
};

export const setSessionReducer = (currentState = initial_state , action) => {
	switch (action.type) {
		case 'SESSION_CHECK':
			return { ...currentState,
				sessionID: action.sessionID, // 액세스 토큰 값 입력
			};

		case 'CLEAR_ALL_STATE':
			return { ...currentState,
				sessionID: sessionStorage.getItem('sessionID'), // 로그아웃 시 제거된 값
			};

		default:
			return currentState;
		}
};
  
export default setSessionReducer;