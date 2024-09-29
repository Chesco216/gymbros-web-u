import { useState } from 'react'
import styles from './Chatbot.module.css'
import { getGTP_response } from '../../../../services/chatbot'

export const Chatbot = ({gym_id}) => {

  const [gptResponse, setGptRes] = useState()
  const [prompt, setPrompt] = useState('')

  const handleGptRes = async() => {
    const message = await getGTP_response(gym_id, prompt)
    setGptRes(message)
  } 

  return (
    <div className={`${styles.container} `}>
      <p className={`${styles.gptResponse} `}>{(gptResponse) ? gptResponse : 'Preguntame tus dudas'}</p>
      <span className={`${styles.promptContainer} `}>
        <input 
          className={`${styles.userIn}`}
          value={prompt}
          type='text'
          name='userPrompt'
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button 
          className={`${styles.btn}`}
          onClick={() => handleGptRes().then(console.log('response fetched'))}
        >
          Enviar
        </button>
      </span>
    </div>
  )
}

