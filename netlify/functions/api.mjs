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

export default async () => {
  // Wrap the call in a try/catch to handle errors gracefully
  try {
    const response = await fetch(
      // 'limit=50' is added to get a reasonable amount of data for testing.
      'https://wger.de/api/v2/exerciseinfo/?format=json&limit=50'
    );
    // Check if the response is OK (status in the range 200-299)
    if (!response.ok) {
      // Return a 502 Bad Gateway response if the API request failed
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
