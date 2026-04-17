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
  const workouts = apiData.results.map((item) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      // Use optional chaining and default values to handle missing data
      // If the property doesn't exist, use the default value
      type: item.category?.name || 'N/A',
      targetArea: item.muscles?.[0]?.name || 'Varies',
      equipment: item.equipment?.[0]?.name || 'Bodyweight',
      durationMinutes: 15, // Default value
      difficulty: 'Varies', // Default value
    };
  });

  return { data: workouts };
}

export default async () => {
  try {
    const response = await fetch(
      // 'limit=50' is added to get a reasonable amount of data for testing.
      'https://wger.de/api/v2/exerciseinfo/?format=json&limit=50'
    );
    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'API request failed' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const json = await response.json();
    // Transform the data to match the shape expected by the front-end components
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
