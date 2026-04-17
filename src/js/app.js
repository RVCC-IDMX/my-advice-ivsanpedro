// app.js for Workout Recommender
import { matchesAllPreferences } from './matching.js';
import {
  showResults,
  showNoResults,
  showDetail,
  showLoadingMessage,
} from './views.js';

/**
 * Fetches workout data from the serverless function.
 * @returns {Promise<Array>} A promise that resolves to an array of workout objects.
 * @throws Will throw an error if the fetch fails or if the response is not OK.
 */
async function fetchWorkouts() {
  try {
    const response = await fetch('/.netlify/functions/api');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const workoutData = await response.json();
    return workoutData.data; // The API returns { data: [...] }
  } catch {
    showNoResults(document.querySelector('#results-list'));
    return []; // Return an empty array so the app doesn't crash
  }
}

/**
 * The main function that initializes the application.
 */
async function main() {
  // Fetch the workout data
  const workouts = await fetchWorkouts();

  // If there's no data, we don't need to set up the rest of the app
  if (workouts.length === 0) {
    // The fetchWorkouts function will have already show an error
    return;
  }

  // Get DOM elements
  const form = document.querySelector('#preference-form');
  const resultsList = document.querySelector('#results-list');
  const detailView = document.querySelector('#detail-view');

  // Handle form submission
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Show loading message while we filter results
    showLoadingMessage(resultsList);

    const preferences = {
      type: document.querySelector('#type').value,
      targetArea: document.querySelector('#target').value,
      equipment: document.querySelector('#equipment').value,
      duration: document.querySelector('#duration').value,
      difficulty: document.querySelector('#difficulty').value,
    };

    // This is a quick way to simulate a delay for the loading message.
    // In a real app, you might not need this if the filtering is slow enough.
    setTimeout(() => {
      const results = findResults(preferences, workouts);

      if (results.length === 0) {
        showNoResults(resultsList);
      } else {
        showResults(results, resultsList);
      }

      // Hide detail view and show results list
      detailView.classList.add('hidden');
      resultsList.classList.remove('hidden');
    }, 300); // 300ms delay
  });

  // Handle clicks on workout cards
  resultsList.addEventListener('click', (e) =>
    handleCardClick(e, workouts, resultsList, detailView)
  );

  // Handle clicks on the "back" button in the detail view
  detailView.addEventListener('click', (e) => {
    if (e.target.matches('#back-button')) {
      detailView.classList.add('hidden');
      resultsList.classList.remove('hidden');
    }
  });
}

/**
 * Find workouts that match all user preferences.
 * @param {object} preference - The user's workout preferences.
 * @param {Array} allWorkouts - The array of all available workouts.
 * @returns {Array} An array of workouts that match the user's preferences.
 */
function findResults(preference, allWorkouts) {
  return allWorkouts.filter((workout) =>
    matchesAllPreferences(workout, preference)
  );
}

/**
 * Handles the click event on a workout card.
 * @param {Event} e - The click event.
 * @param {Array} allWorkouts - The array of all available workouts.
 * @param {HTMLElement} resultsList - The container for the results list.
 * @param {HTMLElement} detailView - The container for the detail view.
 */
function handleCardClick(e, allWorkouts, resultsList, detailView) {
  const clickedCard = e.target.closest('.workout-card');
  if (!clickedCard) return;

  const workoutName = clickedCard.dataset.workoutName;
  const workout = allWorkouts.find((w) => w.name === workoutName);

  if (workout) {
    showDetail(workout, detailView);
    resultsList.classList.add('hidden');
    detailView.classList.remove('hidden');
    resultsList.classList.remove('results-list'); // Remove the flex layout to prevent styling issues in detail view
  }
}

// Adds a footer into the HTML
const footer = document.createElement('footer');
const footerText = document.createElement('p');
footerText.textContent = 'Built by Ivana San Pedro 2026';
footer.append(footerText);
document.body.append(footer);

// Adds a purple border to the form section to highlight
const formSection = document.querySelector('.left-col');
formSection.classList.add('highlight-experiment');

// Adds a purple border to the results section to highlight
const resultsSection = document.querySelector('.right-col');
resultsSection.classList.add('highlight-experiment');

// Start the application
main();
