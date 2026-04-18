# Week 4 reflection

Answer each question thoughtfully. There are no wrong answers — the goal is to reflect on what you learned and how your understanding changed.

---

## 1. The enforcement ladder

What did the new linter (ESLint 9 + unicorn plugin) catch that your AGENTS.md rules alone didn't prevent? On the flip side, what kinds of things can AGENTS.md catch that a linter can't check for?

The new linter prevented me from making any commits when I had 'catch (error)' or 'console.error'/'console.log' which was added in by the agent. 
In AGENTS.md, I added a rule that says to use 'addEventListener()' - never onclick(), and unicorn does not auto-fix that. 

---

## 2. Hooks across contexts

You've now seen hooks in five places: browser events, Git pre-commit, npm lifecycle scripts, GitHub Actions, and serverless functions. What is the common pattern across all of them?

They all automatically run, and I do not have to constantly go back to it when I want to commit or make changes. 

---

## 3. Which enforcement layer changed your habits

Advisory (AGENTS.md), linting (ESLint + unicorn), or blocking (pre-commit hook) — which one changed how you write code the most this week? Why?

Linting changed the way I write code the most. I ran into several errors, all regarding the declaration of error but never using it, and just seeing it once made me watch out for it throughout the project. I also remember to avoid using 'console.' when writing because I know ESLint does not let me make commits if I still have it in my published code. 

---

## 4. The data swap

What surprised you about working with a real API compared to your static `data.js`? Think about things like response shape, timing, missing fields, or error cases.

What surprised me the most was how compatible it was with my existing code although I had to make some changes in index.html. I didn't expect it to properly display the workout details when it went into detailView. The site really was the same, the data was just from another source. 

---

## 5. The transform challenge

What was the hardest part of mapping the API response to the shape your views expect? How did you solve it?

I wouldn't say it was hard, but I had to adjust the categories to fit the ones provided in the API. Other than that, the challenges I was facing were in regards to cards and workout names not appearing when the exercises were fetched. 

---

## 6. New API fields

What new field(s) did you add from the API? How did they improve your app compared to the static version?

I added images from the API. Not every workout has an image, but I think it helps visualize the movement of the workout. Reading the name of an exercise is simply not enough to do it, so I think adding the images to the cards improved the user experience. 

---

## 7. Error handling philosophy

You used try/catch in four different contexts this week: the serverless function, fetch in app.js, the localStorage wrapper, and the npm lint guard. What is the common pattern across all of them? What changes between contexts?

All of them are lines of defense that prevent me from encountering issues in the future. 


