# Week 2 reflection — DOM Fundamentals

## Reading the agent's code

- What was the hardest part of your code to understand? What made it click?
It is not complex, but I was confused on why "console.log" would appear as an error in experiments.js. I asked my agent why it was an error when it was perfectly valid JavaScript. It explained that the linter flags it as a reminder that it should not be left in the final version of the code. 
- Did you find anything in the agent's code that surprised you — something you would not have written yourself?
When I was experimenting with adding badges to the workout cards, the agent suggested writing a function that I could call once the cards have been generated because the badges can only be added once the cards exist. 

## Modernizing

- How many `getElementById` calls did you replace? Was the switch to `querySelector` straightforward?
I replaced seven 'getElementById'. The switch was straightforward.
- Did you find any `innerHTML` that was risky? How did you decide what to replace?
I have 'resultsList.innerHTML' that clears the previous results. I decided to keep it because it does not use user input directly. However, I replaced the innerHTML within the if statement if the results list was zero. I replaced it with, "const noResultsMessage = document.createElement('p');", to prevent potential security issues. 

## DOM experiments

- Which experiment was your favorite? Why?
I enjoyed experimenting with 'hidden'. It was very new to me, and getting to learn how the feature works within a function was interesting. 
- Which experiment was the hardest? What tripped you up?
I attempted to add badges to the cards, but I had difficulty knowing when to call the function that actually added the badges. The problem is that I cannot add the badges before the cards are actually created. I eventually stopped trying because I got frustrated. 
I added a highlight to the form section, and it ended up being tricky for one small reason, I had two .css files. I repeatedly asked my agent why the changes weren't being reflected in the browser, and it wasn't until the fifth time that it realized I had two files with the same purpose. I removed the file not in use, then made sure the correct one was linked to index.html. Everything worked successfully. 
- Did any experiment give you an idea for a feature you want to add to your site later?
The experiment regarding badges inspired me to add badges throughout the site to make the site more visually appealing for users. 

## AGENTS.md

- What new rules or instructions did you add to AGENTS.md this week?
I added that I am just about to learn DOM manipulation to the section 'About this student'. 
- Compare your "About this student" section from the start of the week to the end. What changed?
What changed is my knowledge and comfortability regarding DOM manipulation. 

## Reflection

- What is one thing you understand about the DOM now that you did not understand before this week?
Using JavaScript, I can manipulate the content of the website whether it is a whole group or a single section of the site. 
- What would you do differently if you were starting this week's work over?
I would add more rules into AGENTS.md so that I could've been more efficient with writing my code. If I had added elaborate rules, I could have saved time especially when I had two .css files and it was editing the one not in use. 
