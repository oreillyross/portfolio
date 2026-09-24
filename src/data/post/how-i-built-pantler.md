---
publishDate: 2026-09-23T00:00:00Z
title: How I built Pantler
excerpt: Three iterations of an agentic pantry app — from brittle recipe matching to asking an LLM what to cook, then caching titles and lazy-loading recipes to keep model calls cheap.
image: ~/assets/images/office.jpg
imageAlt: A laptop on a clean white desk
category: Build log
tags:
  - pantler
  - llm
  - caching
author: Ross O'Reilly
---

The first iteration of Pantler was designed along the lines of a classic application which has recipes imported, and ingredients imported and then faulty lookups trying to match ingredients to recipes. It quickly became a messy exercise.

The second iteration of Pantler turned the question around and asked what if I know what ingredients I have in my pantry, and simply asked an LLM, like Anthropic sonnet-5 what can I cook using these ingredients passed as contextual parameters.

The next step was to capitalise on the possibly expensive LLM calls, by caching firstly only the title of the recipes, so no ingredients, or instructions / steps to actually cook the recipe.

Then lazy loading the actual recipe based on at the time when the user actually says well I would like to cook this. The LLM call is made to generate said recipe and again the recipe returned is cached locally, or locally in the sense of on the Server postgres database. Then shared with all other users of Pantler.

The idea being to reduce the opportunity for making potentially expensive and redundant LLM calls.

One of the side effects of generating a recipe is the fact that the navigator.locale (language setting) is also passed as a contextual argument, which ensures the response is in the language of the user. So in a way you get localization for free, without a cumbersome localisation vertical slice in the app.
