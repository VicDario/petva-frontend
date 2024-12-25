import { useState } from 'react';
import type { AppState } from '@interfaces/appState';
import type { User } from '@interfaces/user.interface';

const initialState: AppState = {
	token: undefined,
	user: undefined,
};

const useInitialState = () => {
	const [state, setState] = useState(initialState);

	const setUser = (payload: User) => {
		setState({
			...state,
			user: payload,
		});
	};

	const setToken = (payload: string) => {
		setState({
			...state,
			token: payload,
		});
	};

	return {
		state,
		setUser,
		setToken,
	};
};

export default useInitialState;
