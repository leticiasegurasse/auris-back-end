// Importação do axios para fazer requisições HTTP
import axios from 'axios';

// Interface que define a estrutura de uma mensagem para o GPT
interface GPTMessage {
  role: 'user' | 'assistant' | 'system';  // Papel do emissor da mensagem
  content: string;                        // Conteúdo da mensagem
}

// Interface que define a estrutura da resposta da API do GPT
interface GPTResponse {
  choices: Array<{
    message: {
      content: string;  // Conteúdo da resposta gerada
    };
  }>;
}

// Função que envia mensagens para a API do GPT e retorna a resposta
export const getGPTResponse = async (messages: GPTMessage[]): Promise<string> => {
  try {
    // Faz a requisição para a API do GPT
    const response = await axios.post<GPTResponse>(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',  // Modelo do GPT a ser utilizado
        messages: messages       // Array de mensagens para o contexto
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,  // Chave de API do OpenAI
          'Content-Type': 'application/json'
        }
      }
    );

    // Retorna o conteúdo da primeira resposta gerada
    return response.data.choices[0].message.content;
  } catch (error: any) {
    // Log do erro e lançamento de exceção personalizada
    console.error('Erro ao chamar API do GPT:', error.response?.data || error.message);
    throw new Error('Erro ao obter resposta do GPT');
  }
};
