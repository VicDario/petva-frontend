import { useState } from 'react';
import { AppState } from '@interfaces/appState';

const initialState: AppState = {
	token: undefined,
	user: undefined,
};

const useInitialState = () => {
	const [state, setState] = useState(initialState);

	const setUser = (payload) => {
		setState({
			...state,
			user: payload,
		});
	};

	const setToken = (payload) => {
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
