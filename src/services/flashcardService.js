/**
 * Flashcard localStorage utilities for foldered sets
 */
export function saveFlashcardSet(folderName, flashcards) {
  const allSets = JSON.parse(localStorage.getItem('flashcardSets') || '{}');
  allSets[folderName] = flashcards;
  localStorage.setItem('flashcardSets', JSON.stringify(allSets));
}

export function getAllFlashcardSets() {
  return JSON.parse(localStorage.getItem('flashcardSets') || '{}');
}

export function getFlashcardSet(folderName) {
  const allSets = JSON.parse(localStorage.getItem('flashcardSets') || '{}');
  return allSets[folderName] || [];
}

/**
 * Supabase utilities for user-specific flashcard sets
 */
/* Supabase client is now passed as an argument from useClerkSupabaseClient */

/**
 * Save a flashcard set to Supabase for a specific user.
 * @param {string} userId - Clerk user ID
 * @param {string} folderName
 * @param {Array} flashcards
 */
export async function saveFlashcardSetToSupabase(supabaseClient, userId, folderName, flashcards) {
  const { data, error } = await supabaseClient
    .from('flashcard_sets')
    .upsert([
      {
        user_id: userId,
        folder_name: folderName,
        flashcards: flashcards,
        updated_at: new Date().toISOString(),
      },
    ], { onConflict: ['user_id', 'folder_name'] });

  if (error) {
    throw new Error('Error saving flashcard set to Supabase: ' + error.message);
  }
  return data;
}

/**
 * Get all flashcard sets for a specific user from Supabase.
 * @param {string} userId - Clerk user ID
 * @returns {Promise<Array<{ folder_name: string, flashcards: Array }>>}
 */
export async function getFlashcardSetsFromSupabase(supabaseClient, userId) {
  const { data, error } = await supabaseClient
    .from('flashcard_sets')
    .select('folder_name, flashcards')
    .eq('user_id', userId);

  if (error) {
    throw new Error('Error fetching flashcard sets from Supabase: ' + error.message);
  }
  return data;
}

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
    throw new Error('OpenAI API key is missing. Please add OPENAI_API_KEY to your .env file.');
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

/**
 * Generate flashcards from an image or document file using OCR, then OpenAI.
 * @param {File} file - The image or document file to extract text from.
 * @param {object} options - Configuration options for flashcard generation.
 * @returns {Promise<Array<{ question: string, answer: string }>>}
 */
export async function generateFlashcardsFromFile(file, options) {
  // You must set these in your .env file:
  // VITE_OCR_API_URL=https://your-ocr-api-endpoint
  // VITE_OCR_API_KEY=your-ocr-api-key
  const ocrApiUrl = import.meta.env.VITE_OCR_API_URL;
  const ocrApiKey = import.meta.env.VITE_OCR_API_KEY;

  if (!ocrApiUrl || !ocrApiKey) {
    throw new Error('OCR API URL or key is missing. Please add VITE_OCR_API_URL and VITE_OCR_API_KEY to your .env file.');
  }

  // Prepare form data for file upload
  const formData = new FormData();
  formData.append('file', file);

  let ocrText;
  try {
    const ocrResponse = await fetch(ocrApiUrl, {
      method: 'POST',
      headers: {
        'apikey': ocrApiKey,
        // Do NOT set Content-Type here; browser will set it with boundary for FormData
      },
      body: formData,
    });

    if (!ocrResponse.ok) {
      const errorText = await ocrResponse.text();
      throw new Error(`OCR API error: ${ocrResponse.status} ${errorText}`);
    }

    // OCR.Space returns { ParsedResults: [{ ParsedText: ... }], ... }
    const ocrData = await ocrResponse.json();
    console.log('Full OCR API response:', ocrData);
    if (
      !ocrData.ParsedResults ||
      !Array.isArray(ocrData.ParsedResults) ||
      !ocrData.ParsedResults[0] ||
      !ocrData.ParsedResults[0].ParsedText
    ) {
      throw new Error('OCR API did not return any text.');
    }
    ocrText = ocrData.ParsedResults[0].ParsedText;
    if (!ocrText.trim()) {
      throw new Error('OCR API returned empty text.');
    }
  } catch (error) {
    console.error('Error during OCR:', error);
    throw error;
  }

  // Now generate flashcards from the extracted text
  return generateFlashcards(ocrText, options);
}
