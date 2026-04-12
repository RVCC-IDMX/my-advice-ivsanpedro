# Week 3 reflection

Take a few minutes to think about what happened this week — not just what you built, but how the process went.

---

## Your code

What changed about how you think about your project's structure after creating views.js and wiring events?

Before creating views.js, I was mainly focused on functionality of my code. As long as my code worked the way I expected, I saw no problem; however, as we experiment with new concepts each week, I am looking further than just functionality but efficiency and organization. It has been interesting creating individual js files that each have a role of their own, but also work together to produce an interactive website. After working on this week's assignment, I realize that I need to focus on how to write code that works best for me whether it's writing functions, implementing callbacks, and not falling into the "parentheses trap".

---

## Your agent

Did preparing your AGENTS.md with modern JS rules before coding change the quality of what your agent produced? What did you notice?

Yes, it did change the quality of the code my agent produced. The code it suggested followed the rules I had written in AGENTS.md. In addition, it would suggest code that I would want to keep such as the functions that handle the events. It produced code with good names, so it was very helpful in the writing process. 

---

## The rules

Which modern JS rule from `docs/rules/` stuck with you most? What clicked about it?

The rule that stuck with me the most was using .append() instead of .appendChild(). Week 2, I used repeatedly used .appendChild() to add elements to the card, but .append() allows me to add mutliple elements in just one line of code. It makes adding elements much more efficient. 

---

## Biggest win or biggest loss

What was the moment this week that affected you most — something that finally worked, or something that really frustrated you?

Something that _really_ frustrated me this week was while testing to see if my view functions successfully worked with app.js, the changes were not being reflected on the browser. The first issue I encountered was that I was calling the function createCard() within views.js but the function was declared in app.js, so I had to relocate it. This was when I though I was set to move forward, but I was unable to click the workout cards for its details nor did the back button appear. I turned to my agent, and it explained that the detail-view container that was supposedly showing the details did not exist in index.html. Once the container was in 'right-col', everything clicked. 
