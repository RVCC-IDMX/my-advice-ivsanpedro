// app.js for Workout Recommender
import { data } from './data.js';
import { matchesAllPreferences } from './matching.js';
import { showResults, showNoResults, showDetail } from './views.js';

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

// Event listener for form submission and result handling
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#preference-form');
  const resultsList = document.querySelector('#results-list');
  // Handle form submission
  form.addEventListener('submit', function (e) {
    // Prevent form from submitting normally
    e.preventDefault();

    // Get user preferences
    const preferences = {
      type: document.querySelector('#type').value,
      targetArea: document.querySelector('#target').value,
      equipment: document.querySelector('#equipment').value,
      duration: document.querySelector('#duration').value,
      difficulty: document.querySelector('#difficulty').value,
    };

    //Convert numbers to strings for matching
    if (preferences.duration) {
      preferences.duration = `${preferences.duration} minutes`;
    }

    //Find the results that match the preferences
    const results = findResults(preferences);

    // Display the results
    if (results.length === 0) {
      showNoResults(resultsList);
      return;
    } else {
      showResults(results, resultsList);
    }
  });

  /**
   * Find workouts that match all user preferences
   * @param {*} workout - The workout to check
   * @param {*} preference - The user's workout preferences
   * @returns An array of workouts that match the user's preferences
   */
  function findResults(preference) {
    const results = [];

    //Check each workout
    for (let i = 0; i < data.options.length; i++) {
      const workout = data.options[i];
      if (matchesAllPreferences(workout, preference)) {
        results.push(workout);
      }
    }
    return results;
  }

  function handleCardClick(e) {
    // Check if the click was on a card or inside a card
    const clickedCard = e.target.closest('.workout-card');
    if (!clickedCard) return; // Click was outside a card

    // Hide all other cards
    const allCards = document.querySelectorAll('.workout-card');
    for (const card of allCards) {
      if (card !== clickedCard) {
        card.classList.add('hidden');
      }
    }

    const workoutName = clickedCard.dataset.workoutName;

    // Find the workout data based on the name
    const workout = data.options.find((w) => w.name === workoutName);
    if (workout) {
      const detailView = document.querySelector('#detail-view');
      showDetail(workout, detailView);

      // Hide results list and show detail view
      document.querySelector('#results-list').classList.add('hidden');
      detailView.classList.remove('hidden');
    }
  }

  function handleBackButtonClick(e) {
    if (e.target.id === 'back-button') {
      // Hide detail view and show results list
      document.querySelector('#detail-view').classList.add('hidden');
      document.querySelector('#results-list').classList.remove('hidden');

      // Show all workout cards again
      const allCards = document.querySelectorAll('.workout-card');
      for (const card of allCards) {
        card.classList.remove('hidden');
      }
    }
  }

  // Add event listeners for card clicks and back button clicks
  resultsList.addEventListener('click', handleCardClick);
  document.addEventListener('click', handleBackButtonClick);
});
