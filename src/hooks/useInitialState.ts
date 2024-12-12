import { useState } from 'react';

const initialState = {
	token: null,
	user: null,
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
