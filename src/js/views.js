function showResults(items, container) {
  // Clear the container
  container.innerHTML = '';

  for (let i = 0; i < items.length; i++) {
    const workout = items[i];
    const card = createCard(workout);
    container.appendChild(card);
  }
}

// Takes a container element. Clears it and shows a "no results" message.
function showNoResults(container) {
  // Clear the container
  container.innerHTML = '';

  // Create display message
  const message = document.createElement('p');
  message.textContent =
    'No workout matches your preferences. Try adjusting the filters!';
  container.appendChild(message);
}

function showDetail(item, container) {
  // Clear the container
  container.innerHTML = '';

  // New container
  const detailContainer = document.createElement('div');
  detailContainer.className = 'workout-detail';

  // Create heading
  const heading = document.createElement('h2');
  heading.textContent = item.name;
  detailContainer.appendChild(heading);

  // Create details
  const type = document.createElement('p');
  type.textContent = 'Type: ' + item.type;
  detailContainer.appendChild(type);

  const targetArea = document.createElement('p');
  targetArea.textContent = 'Target Area: ' + item.targetArea;
  detailContainer.appendChild(targetArea);

  const equipment = document.createElement('p');
  equipment.textContent = 'Equipment: ' + item.equipment;
  detailContainer.appendChild(equipment);

  const duration = document.createElement('p');
  duration.textContent = 'Duration: ' + item.durationMinutes + ' minutes';
  detailContainer.appendChild(duration);

  const difficulty = document.createElement('p');
  difficulty.textContent = 'Difficulty: ' + item.difficulty;
  detailContainer.appendChild(difficulty);

  // Create back button
  const backButton = document.createElement('button');
  backButton.textContent = 'Back to Results';
  backButton.className = 'back-button';
  backButton.id = 'back-button';
  detailContainer.appendChild(backButton);

  container.appendChild(detailContainer);
}

function createCard(workout) {
  const card = document.createElement('div');
  card.className = 'workout-card';
  card.dataset.workoutName = workout.name;

  // Only display the workout name on the card.
  // Details will be shown in the detail view.
  const heading = document.createElement('h3');
  heading.textContent = workout.name;

  card.appendChild(heading);

  return card;
}

export { showResults, showNoResults, showDetail };
