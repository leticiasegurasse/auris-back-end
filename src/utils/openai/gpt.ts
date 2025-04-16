import axios from 'axios';

interface GPTMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}


interface GPTResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export const getGPTResponse = async (messages: GPTMessage[]): Promise<string> => {
  try {
    const response = await axios.post<GPTResponse>(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: messages
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Agora o TypeScript sabe que 'response.data' tem o tipo GPTResponse
    return response.data.choices[0].message.content;
  } catch (error: any) {
    console.error('Erro ao chamar API do GPT:', error.response?.data || error.message);
    throw new Error('Erro ao obter resposta do GPT');
  }
};
