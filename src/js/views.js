function showResults(items, container) {
  // Clear the container
  container.textContent = '';

  for (let i = 0; i < items.length; i++) {
    const workout = items[i];
    const card = createCard(workout);
    container.append(card);
  }
}

// Takes a container element. Clears it and shows a "no results" message.
function showNoResults(container) {
  // Clear the container
  container.textContent = '';

  // Create display message
  const message = document.createElement('p');
  message.textContent =
    'No workout matches your preferences. Try adjusting the filters!';
  container.append(message);
}

function showDetail(item, container) {
  // Clear the container
  container.textContent = '';

  // New container
  const detailContainer = document.createElement('div');
  detailContainer.className = 'workout-detail';

  // Create heading
  const heading = document.createElement('h2');
  heading.textContent = item.name;
  detailContainer.append(heading);

  // Create details
  const type = document.createElement('p');
  type.textContent = 'Type: ' + item.type;

  const targetArea = document.createElement('p');
  targetArea.textContent = 'Target Area: ' + item.targetArea;

  const equipment = document.createElement('p');
  equipment.textContent = 'Equipment: ' + item.equipment;

  const duration = document.createElement('p');
  duration.textContent = 'Duration: ' + item.durationMinutes + ' minutes';

  const difficulty = document.createElement('p');
  difficulty.textContent = 'Difficulty: ' + item.difficulty;

  // Append details to container
  detailContainer.append(type, targetArea, equipment, duration, difficulty);

  // Create back button
  const backButton = document.createElement('button');
  backButton.textContent = 'Back to Results';
  backButton.className = 'back-button';
  backButton.id = 'back-button';
  detailContainer.append(backButton);

  container.append(detailContainer);
}

function createCard(workout) {
  const card = document.createElement('div');
  card.className = 'workout-card';
  card.dataset.workoutName = workout.name;

  // Only display the workout name on the card.
  // Details will be shown in the detail view.
  const heading = document.createElement('h3');
  heading.textContent = workout.name;

  card.append(heading);
  return card;
}

export { showResults, showNoResults, showDetail };
