The first iteration of pantler was designed along the lines of a classic application which has recipes imported, and ingredients imported and then faulty lookups trying to match ingredients to recipes. It quickly becamse a messy exercise

The second iteration of Pantler turned the question around and asked what if I know what ingredients I have in my pantry, and simply asked a LLM, like Anthropic sonnet-5 what can I cook using these ingredients passed as contextual parameters.

The next step was to capitilise on the possibly expensive LLM calls, by caching firstly only the title of the recipes, so no ingredients, or instructions / steps to actually cook the recipe.

Then lazy loading the actual recipe based on at the time when the user actually says well I would like to cook this. The LLM call is made to generate said recipe and again the recipe returned is cached locally, or locally in the sense of on the Server postgres database. Then shared with all other users of pantler.

The idea being to reduce the opportunity for making potentially expensive and redundant LLm calls. 

One of the side effects of generating a recipe is the fact that the navigator.locale (language setting is passed also passed as a contextual argument which ensures the response
is in the languge of the user. So in a way you get localization for free, without a cumbersome localiation vertical slice in the app.

