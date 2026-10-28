export type FaceId = 'core' | 'projects' | 'creative' | 'community';

export interface Face {
	id: FaceId;
	path: string;
	/** Short label for the top nav. */
	navLabel: string;
	/** Page H1 / face title. */
	title: string;
	/** Cube rotateY when this face faces the camera. */
	rotateY: number;
}

export const FACES: readonly Face[] = [
	{ id: 'core', path: '/', navLabel: 'Home', title: 'The Core', rotateY: 0 },
	{
		id: 'projects',
		path: '/projects',
		navLabel: 'Projects',
		title: 'The Analyst & Builder',
		rotateY: -90,
	},
	{
		id: 'creative',
		path: '/creative',
		navLabel: 'Creative',
		title: 'The Observer & Writer',
		rotateY: -180,
	},
	{
		id: 'community',
		path: '/community',
		navLabel: 'Community',
		title: 'The Human & Community',
		rotateY: 90,
	},
] as const;

/** Local face placement on the cube (opposite of camera rotateY). */
export const FACE_LOCAL_ROTATE: Record<FaceId, number> = {
	core: 0,
	projects: 90,
	creative: 180,
	community: -90,
};

export function getFaceByPath(pathname: string): Face {
	const normalized = pathname.replace(/\/$/, '') || '/';
	const match = FACES.find((face) => {
		if (face.path === '/') return normalized === '/';
		return normalized === face.path || normalized.startsWith(`${face.path}/`);
	});
	return match ?? FACES[0];
}

export function isFacePath(pathname: string, facePath: string): boolean {
	const normalized = pathname.replace(/\/$/, '') || '/';
	if (facePath === '/') return normalized === '/';
	return normalized === facePath || normalized.startsWith(`${facePath}/`);
}

/** Normalize degrees into (-180, 180] for stable shortest-path math. */
export function normalizeDegrees(deg: number): number {
	const mod = (((deg + 180) % 360) + 360) % 360;
	return mod - 180;
}

/**
 * Return a target angle near `from` that lands on the same orientation as `to`.
 * Prevents full spins when crossing the ±180 boundary.
 */
export function shortestRotation(from: number, to: number): number {
	const delta = normalizeDegrees(to - from);
	return from + delta;
}
