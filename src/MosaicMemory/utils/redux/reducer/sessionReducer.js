const initial_state = {
	sessionAuth: sessionStorage.getItem('sessionAuth') === 'true',
	accountCheck: sessionStorage.getItem('accountCheck') === 'true',
};

export const setSessionReducer = (currentState = initial_state , action) => {
	switch (action.type) {
		case 'SESSION_CHECK':
			return { ...currentState,
				sessionAuth: action.sessionAuth, // 액세스 토큰 인증 결과
			};

		case 'ACCOUNT_CHECK':
			return { ...currentState,
				accountCheck: action.accountCheck, // 회원 확인 결과
			};

		case 'CLEAR_ALL_STATE':
			return { ...currentState,
				sessionAuth: false,
			};

		default:
			return currentState;
		}
};
  
export default setSessionReducer;