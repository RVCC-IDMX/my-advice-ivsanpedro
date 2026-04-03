// app.js for Workout Recommender
import { data } from './data.js';
import { matchesAllPreferences } from './matching.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#preference-form');
  const resultsList = document.querySelector('#results-list');

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
      preferences.duration = preferences.duration.toString() + ' minutes';
    }

    //Find the results that match the preferences
    const results = findResults(preferences);

    // Display the results
    displayResults(results);
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

  function displayResults(results) {
    // Clear previous results
    resultsList.innerHTML = '';
    // Using innerHTML is safe to use here since we are creating the content ourselves and not using user input directly.
    // We are only using innerHTML to display a message when there are no results, and we are not including any user input in that message.

    // Change innerHTML to textContent to prevent any potential security issues with user input.
    if (results.length === 0) {
      const noResultsMessage = document.createElement('p');
      noResultsMessage.textContent =
        'No workouts match your preferences. Please try adjusting your preferences.';
      resultsList.appendChild(noResultsMessage);
      return;
    }

    for (let i = 0; i < results.length; i++) {
      const workout = results[i];
      const card = createCard(workout);
      resultsList.appendChild(card);
    }
  }

  function createCard(workout) {
    const card = document.createElement('div');
    card.className = 'workout-card';

    const heading = document.createElement('h3');
    heading.textContent = workout.name;

    const type = document.createElement('p');
    type.textContent = workout.type;

    const targetArea = document.createElement('p');
    targetArea.textContent = workout.targetArea;

    const equipment = document.createElement('p');
    equipment.textContent = workout.equipment;

    const duration = document.createElement('p');
    duration.textContent = workout.durationMinutes + ' minutes';

    const difficulty = document.createElement('p');
    difficulty.textContent = workout.difficulty;

    card.appendChild(heading);
    card.appendChild(type);
    card.appendChild(targetArea);
    card.appendChild(equipment);
    card.appendChild(duration);
    card.appendChild(difficulty);

    return card;
  }
});
