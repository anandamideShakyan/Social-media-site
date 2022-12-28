import * as AuthApi from "../api/AuthRequest.js"
export const logIn = (formData) => async (dispatch) => {
	dispatch({ type: "AUTH_START" })
	try {
		const { data } = await AuthApi.logIn(formData)
		dispatch({ type: "AUTH_SUCCESS", data: data })
	} catch (error) {
		console.log(error)
		dispatch({ type: "AUTH_FAIL" })
	}
}
export const signUp = (formData) => async (dispatch) => {
	dispatch({ type: "AUTH_START" })
	try {
		const { data } = await AuthApi.signUp(formData)
		dispatch({ type: "AUTH_SUCCESS", data: data })
	} catch (error) {
		console.log(error)
		dispatch({ type: "AUTH_FAIL" })
	}
}
export const googleLogin = (data) => async (dispatch) => {
	console.log(data)
	try {
		dispatch({ type: "AUTH_SUCCESS", data: data })
	} catch (error) {
		dispatch({ type: "AUTH_FAIL" })
	}
}
export const logoutUser = () => async (dispatch) => {
	try {
		await AuthApi.clearCookie()
		dispatch({ type: "LOGOUT_USER" })
	} catch (error) {
		console.log(error)
	}
}
