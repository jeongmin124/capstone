import axios from 'axios';
import config from "../../config";

export const fetchChatbotResponse = async (message) => {
  const API_URL = 'https://api.openai.com/v1/chat/completions';
  const API_KEY = config.OpenAiKey;

  try {
    const response = await axios.post(API_URL, {
      model: 'gpt-4o',
      messages: [{ role: 'user', content: message }],
    }, {
      headers: {
        'Authorization': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching chatbot response:', error);
    return '죄송합니다. 문제가 발생했습니다.';
  }
};