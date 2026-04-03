# AI collaboration summary

## Planning conversation

- Did the agent read your files before responding? How could you tell?
No, the agent did not read my files before responding. It provided me a plan on how to create a markdown prompt and then listed the steps I needed to take to reflect on the project. I could tell because no specific files were mentioned and it listed general steps that could apply to anyone's repo. After receiving these general instructions, I switched to a 1x which then familiarized itself with the files before creating the prompt. 
- What was the agent's first specific observation about your original repo?
It said it was a neat and well-structured tool for recommending activities. 
- Did you have to push back on anything the agent suggested? What happened?
No, I didn't have to push back on anything the agent suggested. I went along with all of its recommendations regarding my new site. 

## Build conversation

- What did the agent generate that you kept as-is?
The only thing I kept as-is was index.html. The first time I loaded the browser, the website looked really boring and bland, so I changed styles.css. 
- What did you change or ask the agent to redo? Why?
I changed styles.css and matching.js. I wanted to use cards in my website to make it more appealing. In matching.js, there were only a few functions and it did not include one for when all criteria was met, so I had to add that in. For a while, I wasn't seeing my changes being reflected in the browser, and I became really frustrated. The problem was in index.html, 
- Did you run into any linting or formatting errors? How did you resolve them?
I came across an error for a variable that was declared using 'let'. Since the value of the variable was not set to a new value, it suggested I use 'const' instead. 

## AGENTS.md modifications

- What personal instructions did you add to the bottom of AGENTS.md?
I added instructions such as giving an analogy before showing code, giving short examples, and asking one question at a time.
- Why did you choose those specific instructions?
I thought the analogy would be helpful in understanding the role of each tool like Husky or lint. I sometimes have trouble grasping the uses of some concepts, so getting the analogy really helped me understand why I am using it or how to use it. In addition, Copilot would often ask two or three questions at a time after I ask what is wrong in my code, and I feel like answering multiple questions at once can lead to more complications, or sometimes my original question would not get answered at all. 
- Did the agent's behavior change after you added them? How?
Yes, the agent's behavior did change after adding those instructions. It started providing me an analogy before diving into the code, and I noticed that it wouldn't overwhelm me with information and questions. 

## Reflection

- What surprised you about working with an AI agent in a real tooling environment?
After working on this assignment, I learned a lot about designing the agent to help you like adding instructions to AGENTS.md. It's not something that surprised me, but it opened my eyes to the possibilities of AI and how I can change how it behaves when it is giving me solutions. 
- What would you do differently next time?
I need to look closely at the code instead of assuming that everything is properly linked together. I hope I can avoid unneccessary confusion by doing this. I tend to overlook the significant parts of the code and I want to improve on this. 
- What is one thing you learned about your own workflow or preferences?
When adding instructions to AGENTS.md, I learned that I understand ideas better when I can compare them to concepts I am more familiar with. In addition, I learned that I like to attack one task at a time which is why I added the instruction to only ask one question at a time when working on getting a solution to an error in the code. When I take on multiple tasks at a time, I tend to forget what the initial problem was and I lose track of my work. 