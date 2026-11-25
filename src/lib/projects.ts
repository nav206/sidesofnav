export type ProjectStatus = 'live' | 'building' | 'pipeline';

export interface ProjectLink {
	label: string;
	href: string;
}

export interface Project {
	slug: string;
	title: string;
	oneLiner: string;
	backstory: string;
	status: ProjectStatus;
	/** External live demo when ready. */
	demoUrl?: string;
	/** Video embed URL; omit until filmed. */
	videoUrl?: string;
	links: ProjectLink[];
	/** Optional footnotes — not a skills page. */
	skills?: string[];
	order: number;
}

export const STATUS_LABEL: Record<ProjectStatus, string> = {
	live: 'Live',
	building: 'Building',
	pipeline: 'Pipeline',
};

export const projects: readonly Project[] = [
	{
		slug: 'causal-hub',
		title: 'Causal Hub',
		oneLiner:
			'AI-assisted discovery of policies fit for quasi-experimental study — with method guidance (DiD, RDD, IV, and more).',
		backstory:
			'Causal research often stalls at idea generation: weeks scanning news and briefs for natural experiments that never reach a draft. Causal Hub turns that scouting into a searchable, constraint-aware workflow.',
		status: 'live',
		demoUrl: 'https://causal-hub.vercel.app/explore',
		videoUrl: undefined,
		links: [
			{
				label: 'Open Causal Hub',
				href: 'https://causal-hub.vercel.app/explore',
			},
			{
				label: 'Launch note',
				href: 'https://www.linkedin.com/posts/navneet-in2026_create-next-app-activity-7416510564027400193-CzFx',
			},
		],
		skills: ['Causal inference', 'LLMs', 'Next.js', 'SQL', 'Python'],
		order: 1,
	},
	{
		slug: 'lanesight',
		title: 'LaneSight',
		oneLiner:
			'San Francisco bike route planner on the official SFMTA network, with live Bay Wheels counts and clear source attribution.',
		backstory:
			'Built as a separate product repo: map-first routing that respects directional Class I/II/IV facilities and never pretends street connectors are official bike lanes.',
		status: 'building',
		links: [],
		skills: ['TypeScript', 'Leaflet', 'SFMTA / OSM', 'GBFS'],
		order: 2,
	},
	{
		slug: 'zenna-the-zinnia',
		title: 'Zenna, the Zinnia',
		oneLiner: 'Interactive scrollytelling piece around growth and observation.',
		backstory:
			'A narrative build around growth and observation — now live as an interactive artifact.',
		status: 'live',
		demoUrl: 'https://zenna-the-zinnia.vercel.app/',
		links: [
			{
				label: 'Open Zenna',
				href: 'https://zenna-the-zinnia.vercel.app/',
			},
		],
		order: 3,
	},
	{
		slug: 'sf-almanac',
		title: 'SF Almanac',
		oneLiner: 'Spatial dashboard for San Francisco context — artifact landing this month.',
		backstory:
			'Map-led storytelling for place and data; page deepens when the dashboard is linkable.',
		status: 'building',
		links: [],
		order: 4,
	},
] as const;

export function getProjectsSorted(): Project[] {
	return [...projects].sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}
