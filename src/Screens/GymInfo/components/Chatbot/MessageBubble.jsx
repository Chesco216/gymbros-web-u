export const MessageBubble = ({ text, isUserMessage }) => {
	return (
		<div
			className={`flex items-center p-4 my-2 rounded-lg ${isUserMessage === 'ai' ? "bg-gray-200 text-gray-800 self-end mr-auto" : "bg-primary text-gray-800 self-start ml-auto"
				}`}
		>
			<p>
				{text}
			</p>
		</div>

	)


}
