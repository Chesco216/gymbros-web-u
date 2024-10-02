import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import { InputBox } from "./InputBox";
import { MessageBubble } from "./MessageBubble";
import { gyms } from "../../../../../assets/gyms";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAi = new GoogleGenerativeAI(API_KEY);
const model = genAi.getGenerativeModel({ model: "gemini-1.5-pro" });

export const Chatbot = () => {
	const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState([]);

	const sendMessage = async (inputText) => {
		if (!inputText) {
			return;
		}
		setMessages((prevMessages) => [...prevMessages, {
			text: inputText,
			sender: 'user',
			timestamp: new Date(),
		}])
		setLoading(true);
		try {
			const result = await model.generateContent(`You are an chatbot to assist a person about gyms, you are very supportive and gives recomendations knowing all that info about the gyms of La Paz Bolivia, but just a segment of the gyms that im passing to you,all the info about the gyms are the following just this information you know, no more, no less,you only know about all the gyms that im passing, your only language available is spanish:\n ${gyms} \n and the prompt of the person asking the questions is: \n  ${inputText}`);
			const text = result.response.text();
			setMessages((prevMessages) => [...prevMessages, {
				text,
				sender: 'ai',
				timestamp: new Date(),
			}])
			setLoading(false);
		}
		catch (e) {
			setLoading(false);
			console.error(e);
		}
	}

	return (

		<section className="flex flex-col px-5 py-10 bg-white rounded-xl max-h-[600px] md:max-h-[700px] shadow-lg gap-2 hover:outline hover:outline-primary">
			<p className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-black">Asistente de Gimnasio Virtual</p>
			<p className="text-gray-600">Habla con el asistente virtual</p>
			<div className="flex flex-col overflow-auto my-5">
				{
					messages.map((m, index) =>
						<MessageBubble key={index} text={m.text} isUserMessage={m.sender} />

					)
				}
			</div>
			<InputBox sendMessage={sendMessage} loading={loading} />
		</section>
	)

};
