/**
 * Serverless API proxy — starter function
 *
 * This function works right now. Run `netlify dev` and visit:
 *   http://localhost:8888/.netlify/functions/api
 *
 * You will see JSON data in the browser — three dog breeds from the
 * Dog API (the same API you used in hap-fetch). The data is hardcoded
 * so you can see the full serverless function lifecycle without needing
 * an external API yet.
 *
 * Your job in Part 1: Replace the hardcoded data below with a real
 * fetch call to your project's API. See docs/tutorials/your-first-serverless-function.md
 * for a walkthrough.
 */

/**
 * Takes the raw data from the wger API and transforms it into the shape
 * that the front-end components expect.
 * @param {object} apiData - The raw data from the API.
 * @returns {object} The transformed data.
 */
function transformData(apiData) {
  const workouts = apiData.results
    .map((item) => {
      // Find the English translation (language id 2)
      const englishTranslation = item.translations.find(
        (t) => t.language === 2
      );

      // If there's no English translation, we can't show the workout
      if (!englishTranslation) {
        return null;
      }

      return {
        id: item.id,
        name: englishTranslation.name,
        description: englishTranslation.description,
        images: item.images, // Pass the images array
        type: item.category?.name || 'N/A',
        targetArea: item.muscles?.[0]?.name || 'Varies',
        equipment: item.equipment?.[0]?.name || 'Bodyweight',
        durationMinutes: 15, // Default value
        difficulty: 'Varies', // Default value
      };
    })
    .filter(Boolean); // Remove any null entries

  return { data: workouts };
}

import { SYSTEM_PROMPT } from './groq-schema.js';

const MAX_INPUT = 500;

export default async (event) => {
  try {
    // 1. Get user input from POST body
    const userInput = event?.body || '';
    if (userInput.length > MAX_INPUT) {
      return new Response(JSON.stringify({ error: 'Input too long' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Call Groq to translate input
    let params;
    try {
      const groqResponse = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            response_format: { type: 'json_object' },
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              {
                role: 'user',
                content: `<user_input>${userInput}</user_input>`,
              },
            ],
          }),
        }
      );
      const groqData = await groqResponse.json();
      params = JSON.parse(groqData.choices[0].message.content);
    } catch {
      return new Response(
        JSON.stringify({ error: 'Groq translation failed' }),
        {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 3. Handle refusal
    if (params.refused) {
      return new Response(
        JSON.stringify({
          refused: true,
          refusal_reason: params.refusal_reason,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 4. Build wger API URL from params
    const url = new URL(
      'https://wger.de/api/v2/exerciseinfo/?format=json&limit=50'
    );
    if (params.search) url.searchParams.set('search', params.search);
    if (params.category) url.searchParams.set('category', params.category);
    if (params.targetMuscles)
      url.searchParams.set('muscles', params.targetMuscles);
    if (params.equipment) url.searchParams.set('equipment', params.equipment);
    // Note: wger API may require IDs for category/muscles/equipment; you may need a lookup table

    const response = await fetch(url);
    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'API request failed' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const json = await response.json();
    const transformedData = transformData(json);

    return new Response(JSON.stringify(transformedData), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
