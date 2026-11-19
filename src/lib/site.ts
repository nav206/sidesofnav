/** Sitewide identity & contact constants. */

export const site = {
	name: 'Sides of Nav',
	shortName: 'Navneet Singh',
	/** Cloudflare Pages preview until a custom domain is purchased. */
	url: 'https://sidesofnav.pages.dev',
	tagline: 'Four sides of one builder.',
} as const;

export const contacts = {
	email: 'navneet.singh@uni.minerva.edu',
	linkedin: 'https://www.linkedin.com/in/navneet-in2026/',
	github: 'https://github.com/nav206/',
	/** Set once the master resume PDF is redone and placed in /public. */
	resumeUrl: null as string | null,
	/** Writing home — Substack / site TBD. */
	writing: null as string | null,
} as const;

/** Nature / eco observation — use on Creative (and related) only. */
export const nature = {
	inaturalist: 'https://www.inaturalist.org/people/navneet11',
	ebird: 'https://ebird.org/profile/MzUxNjU3Ng',
} as const;

export type ContactLink = {
	label: string;
	href: string;
};

/** Primary “Elsewhere” links for Core (resume omitted until PDF ships). */
export function primaryContactLinks(): ContactLink[] {
	const links: ContactLink[] = [
		{ label: 'Email', href: `mailto:${contacts.email}` },
		{ label: 'LinkedIn', href: contacts.linkedin },
		{ label: 'GitHub', href: contacts.github },
	];
	if (contacts.writing) {
		links.push({ label: 'Writing', href: contacts.writing });
	}
	if (contacts.resumeUrl) {
		links.push({ label: 'Resume', href: contacts.resumeUrl });
	}
	return links;
}

export function natureLinks(): ContactLink[] {
	return [
		{ label: 'iNaturalist', href: nature.inaturalist },
		{ label: 'eBird', href: nature.ebird },
	];
}
