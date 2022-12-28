import * as UploadApi from "../api/UploadRequest.js"
export const uploadImage = (data) => async (dispatch) => {
	try {
		console.log("inside uploadAction", data)
		await UploadApi.uploadImage(data)
	} catch (error) {
		console.log(error)
	}
}

export const uploadPost = (data) => async (dispatch) => {
	console.log(data)
	dispatch({ type: "UPLOAD_START" })
	try {
		const newPost = await UploadApi.uploadPost(data)
		console.log(newPost.data)
		dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data })
	} catch (error) {
		console.log(error)
		dispatch({ type: "UPLOAD_FAIL" })
	}
}
