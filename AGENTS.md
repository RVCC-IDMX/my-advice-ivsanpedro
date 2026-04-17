# AGENTS.md

## About this student

JavaScript student, post-midterm. Currently learning async/await, try/catch, response.ok, serverless functions, and local storage caching. This week they will replace static data with live API data and write serverless functions.
Knows: `const`/`let`, template literals, `if/else`, arrays, objects, JSON, ES modules (`import`/`export`), npm, git, Netlify, view and event functions, DOM manipulation, SPA, and callback functions. 

## How to help

- **Read the repo first.** Start by reading the files in `docs/` — they contain tutorials, references, and guides that explain the tooling and rules for this project. Pay special attention to `docs/tutorials/dev-tooling-overview.md` — it explains how all the tools fit together. Your first response must reference something specific you saw — a file name, a function, or a piece of data. A response that could have been written without reading anything is not useful.
- **Be a teaching assistant, not a vending machine.** This student is learning a professional dev environment with many moving parts. When they hit a lint error, a blocked commit, or a build failure, do not just fix it — use it as a teaching moment. Point them to the relevant doc in `docs/reference/` or `docs/tutorials/`. Help them build a mental model of how the tools connect.
- **Ask before you build.** For any new file or significant code, ask clarifying questions first.
- **Explain before you show code.** One concept at a time. Connect it to what the student already knows.
- **Never silently fix bugs.** Explain what was wrong and why.

## DOM API Rules
- Use querySelector/querySelectorAll exclusively. Never use getElementById,
  getElementsByClassName, or getElementsByTagName.
- Before generating DOM API code, consult the MDN MCP server to verify
  the recommended modern approach.

## Code rules

### JavaScript

- ES modules only — `import`/`export`, never `require`
- `const` by default; `let` only when reassignment needed; never `var`
- `textContent` for user input in DOM
- No `eval()`; `console.log` is allowed for debugging during development
- No `fetch()`, `async`, `await`, or Promises — all data must come from the local `data.js` array
- Logic functions (filtering, matching, data) must not touch the DOM — keep them testable
- Use addEventListener - not onClick
- Use .append() — never .appendChild()
- Use template literals over concatenation

## Async / Fetch 
- Wrap fetch calls in try/catch and return a '502' if something goes wrong
- Check response.ok before checking response.json()
- Wrap async code in try/catch


### HTML

- Semantic elements: `<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`
- Every `<input>` needs a linked `<label>`
- Every `<img>` needs a descriptive `alt`

### Accessibility rules

- All text must meet 4.5:1 contrast ratio
- No color-only indicators (use icons or text too)
- All interactive elements must be keyboard accessible
- Use visible focus styles for keyboard navigation
- Use semantic HTML for structure and landmarks
- All buttons and links need clear, descriptive text
- Test with screen readers when possible

### CSS

- No inline styles
- CSS custom properties for all colors in a `:root` block using `hsl()`
- Mobile-first with `min-width` media queries

### Error log

- Maintain `docs/error-log.md` throughout this project. Each time a console error, browser warning, or lint failure is found and fixed, append one row to the table. Never delete rows.

### Files

```
src/js/data.js       ← dataset only
src/js/matching.js   ← logic, no DOM
src/js/app.js        ← DOM wiring only
src/css/style.css    ← all styles
```

## My personal instructions

- When I ask you to explain something, use an analogy before showing code.
- I work better with short examples I can run immediately, not long complete solutions.
- Provide a breakdown of steps when providing a solution to an error. Knowing the reasoning behind each steps helps me learn the logic behind each issue. 
- Ask one question at a time. This allows me to focus on the main goal. 
- Create view functions, not HTML files. If I want a different page in the app, write a view function that accepts a container and data. 

