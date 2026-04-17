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

export default async () => {
  try {
    /**
     * TODO: Replace hardcoded data with a fetch to your API.
     */

    const response = await fetch(
      'https://wger.de/api/v2/exerciseinfo/?format=json'
    );
    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'API request failed' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const json = await response.json();

    // TODO: Transform `json` into the shape your views expect
    // and return it below. For now, let's just see the data.
    // Shows raw data from the API in the terminal.
    console.log(json);

    // For now, we'll return an empty data array so the app doesn't crash.
    const sampleData = { data: [] };

    return new Response(JSON.stringify(sampleData), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
