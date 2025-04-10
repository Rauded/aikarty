/**
 * Simulate API call to generate flashcards from input text and options.
 * Replace this with a real API call using fetch or axios later.
 * @param {string} text - The input text
 * @param {object} options - Configuration options
 * @returns {Promise<Array<{ question: string, answer: string }>>}
 */
export async function generateFlashcards(text, options) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OpenAI API key is missing. Please add VITE_OPENAI_API_KEY to your .env file.');
  }

  const prompt = `
Generate flashcards based on the following content:

${text}

Provide a list of question-answer pairs in JSON array format like:
[
  {"question": "...", "answer": "..."},
  ...
]
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that generates flashcards.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const messageContent = data.choices[0].message.content.trim();

    // Attempt to parse the JSON array from the response
    const jsonStart = messageContent.indexOf('[');
    const jsonEnd = messageContent.lastIndexOf(']');
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error('Failed to parse flashcards from OpenAI response.');
    }

    const jsonString = messageContent.substring(jsonStart, jsonEnd + 1);
    const flashcards = JSON.parse(jsonString);

    return flashcards;
  } catch (error) {
    console.error('Error generating flashcards:', error);
    throw error;
  }
}