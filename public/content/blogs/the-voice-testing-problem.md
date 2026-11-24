---
title: "The voice testing problem"
description: "Testing a text chatbot is hard. Testing a voice agent is harder, and most teams don't realise how much until it's live."
date: "2026-11-24"
---

If you build a text feature, testing is familiar. You write inputs, check outputs, and run it again tomorrow.

Voice doesn't work that way, and that's the heart of the problem.

## Voice has no clean input

A text test sends a string. A voice test sends sound, and sound carries things a string never does:

- Background noise, from traffic to a TV to a kitchen
- Phone-line compression and weak signals
- Pace, pauses, hesitation and filler words
- Accent, pronunciation and tone
- Timing, which is part of the message itself

The same sentence spoken twice is never the same input twice.

### The same words, very different calls

Take a simple request: "I want to change my appointment."

One caller says it calmly in a quiet room. Another says half of it, stops, restarts, and mixes two languages while a bike goes past. A text test sees both as roughly one case. A real agent faces two very different problems.

## Timing is the hard part

Voice is a live conversation, so being correct isn't enough. The agent also has to be on time.

> A right answer, three seconds late, can feel like a wrong answer.

Some things only exist in real time:

- **Interruptions:** does the agent stop when the caller starts talking?
- **Silence:** how long is too long before the line feels dead?
- **Turn-taking:** does it jump in too early or wait too long?
- **Overlap:** what happens when both sides speak at once?

You can't check any of this by reading a transcript.

## Transcripts hide the failures

Many teams review calls as text. That's convenient, but it throws away what went wrong.

A transcript can look fine while the call felt awful: long pauses, talking over the caller, a slow reply that made the person give up. The words were right and the experience was broken.

## Test sets don't cover the real world

Building a test set for voice is slow and expensive:

- Real recordings raise privacy and consent concerns
- Recording enough speakers, accents and environments takes time
- Rare but important situations are hard to capture on demand
- Labelling audio by hand doesn't scale

So teams often test with a handful of clean, polite recordings, and a handful isn't the world.

### A test that passes for the wrong reasons

```ts
// Looks reasonable. Tests almost nothing that matters on a real call.
const reply = await agent.respond("I want to change my appointment");
expect(reply).toContain("appointment");
```

It passes. It uses perfect text, no noise, no interruption and no delay. The real call has none of those luxuries.

## Results are hard to repeat

Even when a team finds a failure, reproducing it is difficult.

- Live calls vary every time
- Speech models and networks add their own randomness
- A fix for one situation can quietly break another
- Without repeatable cases, it's hard to know whether a change helped

Without that repeatability, "did we improve?" becomes a guess.

## Languages make everything harder

In many parts of the world, people switch languages mid-sentence. Hindi and English in one breath is ordinary, not an edge case. Most test material doesn't reflect that, so these callers are often the ones a system quietly fails.

---

## The short version

Voice agents are judged on sound, timing and messy human behaviour, but most testing still looks at clean text. That gap is the voice testing problem.

Have you hit this on a voice project? [Get in touch](/#contact) and tell us what broke.
