import MessageModel from "../Models/messageModel.js"

export const addMessage = async (req, res) => {
	const { chatId, senderId, text } = req.body
	const newMessage = new MessageModel({
		chatId: chatId,
		senderId: senderId,
		text: text
	})
	try {
		const message = await newMessage.save()
		res.status(200).json(message)
	} catch (error) {
		res.status(500).json(error)
	}
}

export const getMessages = async (req, res) => {
	const chatId = req.params.chatId
	try {
		const messages = await MessageModel.find({ chatId: chatId })
		res.status(200).json(messages)
	} catch (error) {
		res.status(500).json(error)
	}
}
