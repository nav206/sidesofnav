import {
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
	useSyncExternalStore,
	type CSSProperties,
	type ReactNode,
} from 'react';
import {
	FACES,
	FACE_LOCAL_ROTATE,
	getFaceByPath,
	shortestRotation,
	type Face,
} from '../lib/faces';

const HISTORY_KEY = 'cubeRotation';
const STORED_ROTATION_KEY = 'cube-rotation';
const CUBE_NAV_FLAG = 'cube-nav';
const FLAT_QUERY = '(max-width: 767px), (prefers-reduced-motion: reduce)';

interface HistoryCubeState {
	[HISTORY_KEY]?: number;
}

interface CubeStageProps {
	pathname: string;
	faceTitle: string;
	children: ReactNode;
}

function subscribeFlat(onChange: () => void): () => void {
	const mq = window.matchMedia(FLAT_QUERY);
	mq.addEventListener('change', onChange);
	return () => mq.removeEventListener('change', onChange);
}

function getFlatSnapshot(): boolean {
	return window.matchMedia(FLAT_QUERY).matches;
}

function readStoredRotation(): number | undefined {
	try {
		const raw = sessionStorage.getItem(STORED_ROTATION_KEY);
		if (raw == null) return undefined;
		const value = Number(raw);
		return Number.isFinite(value) ? value : undefined;
	} catch {
		return undefined;
	}
}

function writeStoredRotation(rotation: number): void {
	try {
		sessionStorage.setItem(STORED_ROTATION_KEY, String(rotation));
	} catch {
		/* private mode */
	}
	const prev = (window.history.state as HistoryCubeState | null) ?? {};
	window.history.replaceState({ ...prev, [HISTORY_KEY]: rotation }, '');
}

function consumeNavFlag(): boolean {
	try {
		const flagged = sessionStorage.getItem(CUBE_NAV_FLAG) === '1';
		sessionStorage.removeItem(CUBE_NAV_FLAG);
		return flagged;
	} catch {
		return false;
	}
}

export function markCubeNavigation(): void {
	try {
		sessionStorage.setItem(CUBE_NAV_FLAG, '1');
	} catch {
		/* private mode */
	}
}

function facePanelStyle(face: Face): CSSProperties {
	const local = FACE_LOCAL_ROTATE[face.id];
	return {
		transform: `rotateY(${local}deg) translateZ(var(--cube-depth))`,
	};
}

export default function CubeStage({ pathname, faceTitle, children }: CubeStageProps) {
	const face = getFaceByPath(pathname);
	const flat = useSyncExternalStore(subscribeFlat, getFlatSnapshot, () => false);
	const [rotation, setRotation] = useState(face.rotateY);
	const [animate, setAnimate] = useState(false);
	const [fadeIn, setFadeIn] = useState(true);
	const hydrated = useRef(false);

	useLayoutEffect(() => {
		const target = getFaceByPath(pathname).rotateY;
		const from = readStoredRotation();
		const navigated = consumeNavFlag();
		// Read live — avoid the SSR `false` snapshot from useSyncExternalStore.
		const useFlat = getFlatSnapshot();

		if (!hydrated.current) {
			hydrated.current = true;

			if (useFlat) {
				setRotation(target);
				if (navigated) {
					setFadeIn(false);
					setAnimate(true);
					requestAnimationFrame(() => {
						requestAnimationFrame(() => setFadeIn(true));
					});
				} else {
					setFadeIn(true);
					setAnimate(false);
				}
				writeStoredRotation(target);
				return;
			}

			if (navigated && from != null) {
				const next = shortestRotation(from, target);
				setAnimate(false);
				setFadeIn(true);
				setRotation(from);
				requestAnimationFrame(() => {
					requestAnimationFrame(() => {
						setAnimate(true);
						setRotation(next);
					});
				});
			} else {
				// Deep link / hard load: land on the face with no spin-in.
				setAnimate(false);
				setFadeIn(true);
				setRotation(target);
			}

			writeStoredRotation(target);
			return;
		}

		if (useFlat) {
			setFadeIn(false);
			setAnimate(true);
			setRotation(target);
			writeStoredRotation(target);
			requestAnimationFrame(() => {
				requestAnimationFrame(() => setFadeIn(true));
			});
			return;
		}

		setFadeIn(true);
		setRotation((prev) => {
			const next = shortestRotation(prev, target);
			setAnimate(true);
			writeStoredRotation(target);
			return next;
		});
	}, [pathname]);

	useEffect(() => {
		const onPopState = () => {
			markCubeNavigation();
		};

		document.addEventListener('astro:before-preparation', markCubeNavigation);
		window.addEventListener('popstate', onPopState);

		return () => {
			document.removeEventListener('astro:before-preparation', markCubeNavigation);
			window.removeEventListener('popstate', onPopState);
		};
	}, []);

	const cubeStyle: CSSProperties | undefined = flat
		? undefined
		: {
				// translateZ(-depth) counters face translateZ so the active face isn't perspective-zoomed.
				transform: `translateZ(calc(-1 * var(--cube-depth))) rotateY(${rotation}deg)`,
				transition: animate ? 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
			};

	return (
		<div
			className={`cube-stage${flat ? ' cube-stage--flat' : ''}`}
			data-face={face.id}
			data-animate={animate ? 'true' : 'false'}
			data-fade={fadeIn ? 'in' : 'out'}
		>
			<div className="cube-stage__scene">
				<div className="cube-stage__cube" style={cubeStyle}>
					{FACES.map((panel) => {
						const active = panel.id === face.id;
						return (
							<section
								key={panel.id}
								className={`cube-stage__face${active ? ' is-active' : ''}`}
								style={flat ? undefined : facePanelStyle(panel)}
								aria-hidden={active ? undefined : true}
								data-face-id={panel.id}
							>
								{active ? (
									<div className="cube-stage__content">
										<h1 className="text-3xl font-semibold tracking-tight">{faceTitle}</h1>
										{children}
									</div>
								) : (
									<div className="cube-stage__placeholder">
										<p className="cube-stage__placeholder-label">{panel.title}</p>
									</div>
								)}
							</section>
						);
					})}
				</div>
			</div>
		</div>
	);
}
