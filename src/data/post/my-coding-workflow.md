My coding workflow

It's early October 2026, and I have noticed a recurring theme on the tech X sphere. There seems to be a recurring theme of developers on the one hand seeming to be more productive with handing off in some cases all of the coding tasks. Some veteran developers have even suggested that they no longer even look at code at all anymore. Yet on the other hand they finish the day feeling exhausted. There is some speculation as to why this might be the case. Some suggest its that now that the agent is doing most of the head racking work, the really cognitive work where as a developer if you can enter into a flow state is a sort of nirvanic (not sure if this word exists) feeling, the developer is now left typing a vague prompt, awaiting a response, either a plan, or guidance, clicking approve, giving some more vague feedback and then watching the agent grind away to present the developer with a pull request, a pretty detailed merge commit and so the cycle repeats itself.

What I have also taken away from this process is the fact that very really does one get broken code, so the journey through debugging frustration, and the joy on the other end is no longer something a developer can look forward to. The coding game has genuinely changed forever. And that ok, it will take some longer to adjust than others, some might never recover and that is ok too, to explore what else the world has to offer other than sitting at a nvim terminal, using sed and grep manually to tease out where subtle bugs may lie in the code base, or heck just centering a div. Its all gone and replaced by agentic dashboard, like Claude code, Devin, Codex, Github Copilot, Pi.

I would like to present my current workflow, and my journey to find flow. Which funnily enough started years before this agentic ai revolution. And so I continue on this journey albeit with re-defined constraints and working practices.

So here goes. Firstly I work predominantly in a browser. My bootstrap sequence to staring a project or app. Is to create a new Github repo. leave it empty and through the browser console add a file. Usually this is a very basic scratchpad.md file which details the rough back of the napkin description of what I am trying to create. Some may think it odd to start straight away in a github repo but I find that context switching from a coding agent terminal or console chat window to a repo back and forth is going against the idea of staying in flow. And my goal is to keep refining my workflow on my journey to find flow.

This core file forms the nucleus of all the other array of files which come together to inform the context window on the application building process. And it doesn't matter what app I am building, a backend cron job, web server, email client, web app, React Native, whatever, the process is independent of the coding language, frameworks, or api, MCP services I use.

I git Commit and jump to my coding terminal. Again my default is in the browser and I use Claude Code in the browser with my account linking my GitHub repository forming a nice natural extension of my workspace into the cloud.

I select the repository, Choose a model, usually Opus 5.5 or Sonnet 5-5 and medium effort is sufficient. Then ask the coding agent to build out a Claude.md fil in the docs folder. A vision.md file, roadmap.md, techstack.md file (super important, as Claude and others have really strong opinions about their default stack based on their training data.)  and a single tasks.md file for the sort of bootstrapping stage. The rest of the features if already described in the scratchpad.md file get appended as Task 2 .. 3 etc, in the roadmap where I can pull them out and work on them iteratively.

Segue: This is a good moment to step away from the process and provide some clarity on my approach. What I noticed is that the frontier models are really good these days at long running, multi turn coding tasks. And whatever you ask them to build they will confidently produce something, which in almost all cases is something you did not think you wanted. It could look flashy, have some crazy functionality but is it meeting the brief. I would argue it might get to an MVP but its highly unlikely to get you all the way to a piece of production grade software people would be willing to pay for. Hence the iterative approach, broken down by granular tasks and inspecting the work each step of the way being able to readjust in tiny increments to get the desired MVP, and much later a production grade reliable piece of software.
end of segue

After round one having merged the pull request created by claude I usually have a reasonable set of files which can be used to guide the agentic iterative development (AID)TM. Just kidding, but seriosuly is anyone using this term yet?

If its a web app I usually also run a Style_Guide skill I setup. Check out my prompt for that [Style_Generation.prompt https://github.com/oreillyross/AI_Prompts/blob/main/Style_Generation.prompt]. Pick one of the styles I think would fit the theming, and ask it to expand on the number. Then I copy those instructions into a styles.md file in the docs folder to guide  the coding agent on future iterations of the styling. It is important this step happens early on otherwise you end up fighting with the models interpretation, and assumptions about what it thinks it should produce. And remember it has no feelings so it confidently builds and thinks its doing the right thing (always).

From there on out it multiple small iterations of the same loop. I have a few workflow specific tricks I am using, and as I have said before this is a work in progress on my journey to find flow in the world of AID.

I use a self built notes repo which I can quickly switch to to offload any thoughts which pop into my head. See the repo here, https://github.com/oreillyross/notes [TODO I need to make this public and then fork it into a private repo for my actual notes and personal work @Claude your thoughts on this please]

I try not to get caught up in either of two default modes I find I enter after hitting the go button in Claude code, 1. Is switching to a news/ x / gmail tab and mindlessly scrolling for something to entertain / distrct me in a very shallow way. I am a strong opponent of multitasking. A very inefficient way of living. It has its place in the household, maybe some admin business setting, but I find it totally innapropriate in a coding session.
2. Staring at the coding agent generated tasks its runnnig through, waiting in anticipation for a generated result.

Instead I opt for an immediate switch either to a short form articel on a topic I am trying to Grok (and read it from start to finish before returning to check on the coding agent. It is sort of my in-built pomodoro timer, except its as long as it takes to read an article. Or continue in the scratchpad, revising, refactoring the next features that would be needed in the app, often jumping out into a new chat window to claude, chatGPT or perplexity to question what might be the feasible route further.

Thats it for now, I am deeply excited in this space. Its an exciting time to be coding again, albeit under very different rules. Power to the agent. [Find a cool logo to represent this movement]















