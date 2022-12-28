const chatUserReducer = (
	state = { chatUsers: [], loading: false, error: false },
	action
) => {
	switch (action.type) {
		case "SAVE_USER":
			console.log("hi")
			return { ...state, chatUsers: [...state.chatUsers, action.data] }
		default:
			return state
	}
}

export default chatUserReducer
