# My code map

Fill out each section below by reading your actual code. Do not guess — open each file and look. This map is your reference for the rest of the assignment. When instructions say "your results container" or "your card class," they mean what you write here.

---

## Files and their purposes

For each file, write one sentence about what it does.

| File                    | What it does |
| ----------------------- | ------------ |
| `src/js/app.js`         | Contains the functions that display the results appropriately and     functions that make the site work as it should                                                |
| `src/js/matching.js`    | Contains the functions that return workouts with matching filters |
| `src/js/data.js`        | Stores all the various workouts and their attributes              |
| `src/css/style.css`     | It defines the visual presentation of the site                    |
| `index.html`            | It is the file that is delivered when the browser runs            |

---

## Form

Look at your `index.html` and find the form element.

- Form ID: `#preference-form`
- Select element ID: `#type`

- What moods/options are in the select?

  - "" (Any Type)
  - Cardio
  - Strength
  - Flexibility
  - HIIT

---

## Results container

Where do results appear on the page?

- Container ID or class: `results-list`
- What element type is it? (`div`, `section`, etc.): `div`

---

## Card structure

Look at how your app.js builds each result card. What elements make up one card?

- Card element type: `div`
- Card class name: `workout-card`

- What is inside each card? (list the child elements and what data they show)
  - heading: 'workout.name' 
  - type: The type of workout
  - targetArea: Body part the workout hits
  - equipment: Equipment needed for the workout
  - duration: How long the workout takes
  - difficulty: How difficult the workout is rated

---

## Existing event listeners

Look through your app.js for any `addEventListener` calls. List each one.

| Where in the code | Event type | What it does |
| ----------------- | ---------- | ------------ |
| Line 22  | 'DOMContentLoaded', () => | Waits for the HTML document to be ready to make changes to it |
| Line 26 | form.addEventListener('submit', function (e) | Waiting for the user to click the submit button | 
| Line 103 | handleCardClick() | Waits for the cards to be clicked to show detail view |
| Line 104 | handleBackButtonClick() | Waits for the back button to be clicked to return back to results list |

If you do not see any `addEventListener` calls, write "none found" — and then look again, because the form handler uses one.

---

## Data shape

Open `src/js/data.js` and look at one item in your dataset.

- How many items total? `15`

- Properties on each item

  - name
  - type
  - targetArea
  - equipment
  - durationMinutes
  - difficulty

---

## CSS classes for show/hide

Do you have a `.hidden` class or similar in your CSS? If so, what does it do?

- Class name: `hidden`
- What CSS rule does it apply? `display: none`

If you do not have one, you will create one this week.
