import { gyms } from "../../assets/gyms"

export const getGTP_response = async(gym_id, prompt) => {
  
  const gym = gyms.filter(gym => gym.id === gym_id)
  const url = 'https://api.openai.com/v1/chat/completions'

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_GPT_API_KEY}`
      },
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
            // {
            //     "role": "system",
            //     "content": gym
            // },
            {
                "role": "user",
                "content": prompt
            }
        ]
      })
    })
    // const message = await res.json()

    console.log({res})
    return res.choices[0].message
  } catch (error) {
    console.log({error})
    alert(error.code)    
  }
}
