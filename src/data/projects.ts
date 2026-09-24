// Active builds shown in the "Work" section and the footer "Projects" column.
// Add a `url` once a project has a live subdomain; cards without one render unlinked.

export type Accent = 'lime' | 'violet' | 'amber' | 'blue' | 'ghost';

export interface Project {
  title: string;
  status: string;
  description: string;
  tags: string[];
  accent: Accent;
  /** Live app, usually `<name>.haagsoft.xyz`. */
  url?: string;
  /** Slug of a build-log post on this site. */
  postSlug?: string;
}

export const projects: Project[] = [
  {
    title: 'Pantler',
    status: 'In progress',
    description:
      'An agentic smart-pantry assistant. Snap a shelf or a receipt; vision-powered OCR reads expiry dates and identifies ingredients, then the agent handles expiry alerts, recipe suggestions and an auto-built shopping list.',
    tags: ['Claude vision', 'Cloudinary', 'tRPC', 'Drizzle', 'Postgres'],
    accent: 'lime',
    url: 'https://pantler.haagsoft.xyz',
    postSlug: 'how-i-built-pantler',
  },
  {
    title: 'Horizon',
    status: 'In progress',
    description:
      'Geopolitical signal tracking on top of GDELT. Forecasting and news monitoring that filters the global firehose down to the handful of events that actually move you or your business — including how AI is reshaping international relations.',
    tags: ['GDELT', 'ML ranking', 'Vector search', 'Go services'],
    accent: 'violet',
    url: 'https://horizon.haagsoft.xyz',
  },
  {
    title: 'Beliefs',
    status: 'In progress',
    description:
      'A reflection app built around guided questions on a seven-day cycle, with time and date tracking and LLM-assisted answer suggestions when the page stays blank for too long.',
    tags: ['React + Vite', 'LLM assist', 'Low-friction capture'],
    accent: 'amber',
  },
  {
    title: 'Tiny GPT',
    status: 'Learning exercise',
    description:
      'A small GPT built from scratch, following the AlgoMonster LLM course. Not a product — the tax paid so the agentic work above rests on something better than intuition.',
    tags: ['Python', 'numpy', 'Transformers from zero'],
    accent: 'blue',
  },
  {
    title: 'Verity',
    status: 'Brewing',
    description:
      'Quietly in the background. Alongside it sits a deeper backlog — SpecFlow, Agent Observer, Agent Clerk, TotalTidy, Orbit, ThreatMonitor — promoted to active as they are picked up.',
    tags: ['Agentic infra', 'Household tools', 'Public interest'],
    accent: 'ghost',
  },
];
