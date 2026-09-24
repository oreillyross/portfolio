import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';
import { projects } from './data/projects';

const EMAIL = 'devguy@duck.com';
const GITHUB = 'https://github.com/oreillyross';

export const headerData = {
  links: [
    { text: 'Work', href: getPermalink('/#work') },
    { text: 'Stack', href: getPermalink('/#stack') },
    { text: 'Studio', href: getPermalink('/#studio') },
    { text: 'About', href: getPermalink('/about') },
    { text: 'Blog', href: getBlogPermalink() },
  ],
  actions: [{ text: "Let's talk", href: getPermalink('/#contact'), variant: 'primary' as const }],
};

export const footerData = {
  links: [
    {
      title: 'Studio',
      links: [
        { text: 'Work', href: getPermalink('/#work') },
        { text: 'How I work', href: getPermalink('/#studio') },
        { text: 'Stack', href: getPermalink('/#stack') },
        { text: 'About', href: getPermalink('/about') },
      ],
    },
    {
      title: 'Projects',
      links: projects
        .filter((project) => project.url)
        .map((project) => ({ text: `${project.title} ↗`, href: project.url })),
    },
    {
      title: 'Writing',
      links: [
        { text: 'Blog', href: getBlogPermalink() },
        { text: 'RSS feed', href: getAsset('/rss.xml') },
      ],
    },
    {
      title: 'Contact',
      links: [
        { text: EMAIL, href: `mailto:${EMAIL}` },
        { text: 'github.com/oreillyross', href: GITHUB },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'Email', icon: 'tabler:mail', href: `mailto:${EMAIL}` },
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: GITHUB },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `© ${new Date().getFullYear()} Haagsoft · Ross O'Reilly. Built semantic-first, animated after.`,
};
