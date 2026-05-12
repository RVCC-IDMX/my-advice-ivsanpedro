# Final project — reflection

Write 2–3 sentences for each prompt. The reflection is where the learning gets named — give yourself room to think.

## 1. Pattern picked

Which pattern did you pick — A, B, or A+B? Why? If you considered one and rejected it, name what made it not the right fit for _your_ project.

I chose Pattern A. I considered choosing Pattern B but I thought it would be too much of a challenge implementing a commentary call into the app. I figured it would be more even more complicated due to the API; some workouts display under big muscle groups, so the filtering isn't one hundred percent accurate even with lookup tables for the equipment, muscles, and categories. 

## 2. The hardest part

What was the hardest part of integrating Groq into your Week 4 architecture? Was it the prompt design, the schema shape, the front-end refusal handling, the latency, the cost, the unfamiliar SDK, or something else?

The hardest part of integrating Groq was the prompt design. I would enter text into the search bar while testing to see if results would show, but instead I would get "Request not about workouts/exercises". I thought the problem had to do with the refusal handling, but the issue lived in the system prompt. I was giving Groq unclear instructions. 



## 3. The moderation floor

How did the four-layer moderation floor (system prompt, JSON mode, delimited input, length cap) shape your design? Did any layer surprise you — either by how cheap it was to add, or by how much it changed the user-facing behavior?

I am surprised by the system prompt and how much it controls Groq's behavior. I had an issue regarding the prompt, and I wasn't expecting it to make such a big difference when returning results. The 500 character length cap also shocked me because of how cheap it was to add into the code, it's only a few lines of code but is an important line of defense when accepting user input. 

## 4. UX polish

What UX rough edge did you smooth, and why that one? What did smoothing it teach you about the difference between "shipping a working app" and "shipping a finished one"?

The requests through search have to be specific, those that are too vague won't be processed by Groq. Once a request is refused, I added some examples the user can enter to get better results. A working app will redirect the user to get the most out of the app and a finished one is one that works but might not satisfy the needs of the user. 

## 5. Groq's strengths and weaknesses

What did Groq do well in your project? What did it not do well — wrong outputs, drift from the schema, latency, hallucinations, anything else? How would your design change if you had to use a slower or less capable model?

It did a good job at understanding the text entered and returning the right workouts even though there are some workouts that don't match; I think it did well given the circumstances. If I had to use a slower or less capable model, I would need a loading message. 

## 6. What you would do differently

If you had another week, what would you do differently? Not "what new feature would you add" — what would you change about your _approach_ if you could start over?

If I had another week, I would take more time to add more post-process filtering, so the results are more accurate. One thing I'd change about my approach is taking the assignment head-on instead of taking my time and familiarizing myself with the task that needs to be done. 

## 7. The optional ceiling (if attempted)

If you implemented either ceiling item (deterministic block-list, zeroth Groq call), what did you learn from it? If you did not, what would have to be true for it to be worth your time?

I did not implement either ceiling item. Users would have to be abusing the search feature for the block-list to be worth my time, but since this is a school project and I am still practicing the basics of the four-layer moderation floor, I didn't think it would be necessary. 
