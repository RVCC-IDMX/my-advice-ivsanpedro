// This file is for testing out new ideas and experimenting with JavaScript code.
// It is not part of the main application and may contain code that is not fully functional or may be removed in the future.
// This is my sandbox for trying out new concepts and learning JavaScript.

// Experiment 1: Changing the heading text on page load
// Changes the heading to "Welcome to My Awesome Site" when the page loads.
// const heading = document.querySelector('h1');
// heading.textContent = 'Welcome to My Awesome Site 🏋🏻‍♀️';

// Experiment 2: Counting the number of workouts in the data and displaying it in the console
// const allOptions = document.querySelectorAll('option');
// console.log(`This page has ${allOptions.length} total options.`);

// Counting the number of options in the equipment dropdown and displaying it in the console
// const typeDropdown = document.querySelector('#equipment');
// console.log(
//   `The equipment dropdown has ${typeDropdown.children.length} options.`
// );

// Experiment 3: Adding a footer into the HTML
const footer = document.createElement('footer');
const footerText = document.createElement('p');
footerText.textContent = 'Built by Ivana San Pedro🧌';
footer.appendChild(footerText);
document.body.appendChild(footer);

// Experiment 4: Toggle
// Adds a light pink border to the form section to highlight it as part of an experiment.
const formSection = document.querySelector('.left-col');
formSection.classList.add('highlight-experiment');

//Experiment 5: Make text blink
const subtitle = document.querySelector('.subtitle');

let isVisible = true;
setInterval(() => {
  if (isVisible) {
    subtitle.classList.add('hidden');
  } else {
    subtitle.classList.remove('hidden');
  }
  isVisible = !isVisible;
}, 2000);
// Runs every 2 seconds to toggle the visibility of the subtitle, creating a blinking effect.
