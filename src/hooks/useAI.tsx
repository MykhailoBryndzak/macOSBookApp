import {GoogleGenerativeAI} from '@google/generative-ai';
import {useQuery} from '@tanstack/react-query';
import {REACT_APP_API_KEY} from '@env';

const genAI = new GoogleGenerativeAI(REACT_APP_API_KEY || '');
const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'});

const useAI = (prompt: string) => {
  const generateContent = async () => {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  };

  return useQuery({
    queryKey: [prompt],
    queryFn: generateContent,
    enabled: false,
  });
};

export default useAI;
