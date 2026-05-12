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

console.log('GROQ_API_KEY:', process.env.GROQ_API_KEY ? 'set' : 'NOT SET');

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

import { SYSTEM_PROMPT } from './groq-schema.mjs';

const MAX_INPUT = 500;

export default async (event) => {
  try {
    // 1. Get user input from POST body
    const userInput =
      typeof event.body === 'string'
        ? event.body
        : await (async () => {
            const decoder = new TextDecoder();
            const body = [];
            for await (const chunk of event.body) body.push(chunk);
            return decoder.decode(Buffer.concat(body));
          })();
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
      console.log('Groq status:', groqResponse.status);
      const groqText = await groqResponse.text();
      console.log('Groq response:', groqText);
      const groqData = JSON.parse(groqText);
      params = JSON.parse(groqData.choices[0].message.content);
      console.log('Groq params:', params);
    } catch (err) {
      console.log('Groq error:', err);
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
    if (params.category && CATEGORY_MAP[params.category])
      url.searchParams.set('category', CATEGORY_MAP[params.category]);
    if (params.targetMuscles && MUSCLE_MAP[params.targetMuscles])
      url.searchParams.set('muscles', MUSCLE_MAP[params.targetMuscles]);
    if (params.equipment && EQUIPMENT_MAP[params.equipment])
      url.searchParams.set('equipment', EQUIPMENT_MAP[params.equipment]);
    console.log('wger API url:', url.toString());
    const response = await fetch(url);
    console.log('wger API status:', response.status);
    const json = await response.json();
    console.log('wger API response:', JSON.stringify(json).slice(0, 500)); // Print first 500 chars
    const transformedData = transformData(json);
    console.log(
      'Transformed data:',
      JSON.stringify(transformedData).slice(0, 500)
    ); // Print first 500 chars

    return new Response(JSON.stringify(transformedData), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'An error occurred' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// --- Lookup tables for wger API ---
const EQUIPMENT_MAP = {
  Dumbbells: 3,
  Barbell: 1,
  'SZ-Bar': 2,
  'Gym mat': 7,
  'Swiss Ball': 8,
  'Pull-up bar': 9,
  'none (bodyweight)': 7, // wger uses 7 for 'bodyweight' (see docs)
  Bench: 10,
  'Incline bench': 11,
  Kettlebell: 12,
};
const MUSCLE_MAP = {
  'Biceps brachii': 1,
  'Anterior deltoid': 2,
  'Serratus anterior': 3,
  'Pectoralis major': 4,
  'Triceps brachii': 5,
  'Rectus abdominis': 6,
  Gastrocnemius: 7,
  'Gluteus maximus': 8,
  Trapezius: 9,
  'Quadriceps femoris': 10,
  'Biceps femoris': 11,
  'Latissimus dorsi': 12,
  Brachialis: 13,
  'Obliquus externus': 14,
  Soleus: 15,
  Infraspinatus: 16,
};
const CATEGORY_MAP = {
  Strength: 10,
  Cardio: 8,
  HIIT: 15,
  Flexibility: 14,
};
// --- End lookup tables ---
