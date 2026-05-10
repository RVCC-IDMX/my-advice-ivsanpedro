# Final project suggestions for workout-recommender

> [!IMPORTANT]
> Before starting the final, complete and close your "Pre-final feedback" issue.

## Your Week 4 starting point (recap)

Your Week 4 was substantive with the most readable commit cadence in the cohort — ten commits, each subject naming its part, in exact part order. Your serverless function fetches the wger Exercise API, transforms into your workouts shape, handles `response.ok` plus 502 plus try/catch. Your `loadCache(key)` and `saveCache(key, data)` take a key parameter — the wrapper-as-utility pattern. Your views.js uses `createElement` + `textContent` consistently. AGENTS.md gained your personal rule "use addEventListener() — never onclick()" plus a fetch-rules block.

That keyed-cache utility is going to be useful for the final — your wrapper's API already supports per-query caching naturally.

## How each pattern fits your project

### Pattern A — translate input to API params

Strong fit. The wger taxonomy (categories, equipment, muscles, levels) is small enough that Groq can handle the translation reliably with a system prompt that lists the valid values. Replacing your dropdowns with one input ("a 20-minute upper-body workout with no equipment for a beginner") collapses the form well.

### Pattern B — narrate the API results

Moderate fit. wger's response data is technical — exercise name, description (often terse), instructions, muscles. A Groq commentary call could turn that into "here is your workout for today, with rest periods and form notes" — adding the kind of coaching context the raw API does not provide. The risk is that the commentary becomes the content the user actually wants, and the underlying exercise data becomes secondary. That is fine if you lean into it.

### Pattern A+B — both, chained

Worth considering for the full coaching experience. "I have 20 minutes and bad knees" → workout from wger → Groq narrates with knee-friendly modifications. Two calls is real cost, but the UX win for a fitness app — feeling like a coach, not a database — is meaningful.

## What carries over (and what doesn't)

- **Your keyed cache wrapper** — already a utility; the new Groq-related cache decisions plug into the same `loadCache(key)`/`saveCache(key, data)` API with no change. See the _How the cache changes_ section in whichever pattern you pick.
- **Your wger transform** — stays. The shape stays the same; what changes is whether Groq drives the params.
- **Your views.js** — stays. Add a refusal renderer for `refused: true`. For Pattern B or A+B, add render hooks for narration.
- **Your AGENTS.md fetch rules block** — extend with Groq-specific rules. The structure already exists.
- **What changes** — your form, depending on which pattern. Pattern A replaces dropdowns with a single input. Pattern B keeps the form.

## A sketched Pattern A schema for wger

```js
{
  "category": string | null,                                // e.g., "Arms", "Cardio"
  "equipment": string[] | null,                             // e.g., ["dumbbell", "none"]
  "muscles": string[] | null,                               // e.g., ["biceps", "triceps"]
  "duration_minutes": number | null,                        // user's available time
  "level": "beginner" | "intermediate" | "advanced" | null,
  "refused": boolean,
  "refusal_reason": string
}
```

Your system prompt should list wger's valid values for `category`, `equipment`, and `muscles` so Groq returns strings that match what the API accepts. wger's IDs are small integers — you can keep the schema using human-readable names and translate to IDs in your function (mirroring how William's TMDB project uses a name-to-ID map for genres).

## My soft recommendation

If I had to pick one for you, I would start with **Pattern A**. The UX win — single natural-language input replacing several dropdowns — is meaningful for a fitness app where users often think in plain English ("a quick upper-body session") rather than in taxonomies ("category: Arms; equipment: none; level: intermediate"). You can ship A cleanly and then decide whether to add Pattern B's coaching narration as time allows.

## What to read next

- `INSTRUCTIONS.md` — the assignment overview
- `CHECKLIST.md` — concrete deliverables
- `docs/tutorials/pattern-a-translate-input.md` — Pattern A walkthrough with Open Library; translate the schema to wger
- `docs/tutorials/groq-moderation-floor.md` — the four required defenses
