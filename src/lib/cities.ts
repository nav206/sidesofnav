/** Minerva hubs — icon + motion polish is a separate later task. */
export interface City {
	id: string;
	name: string;
	country: string;
}

export const cities: readonly City[] = [
	{ id: 'sf', name: 'San Francisco', country: 'US' },
	{ id: 'seoul', name: 'Seoul', country: 'KR' },
	{ id: 'berlin', name: 'Berlin', country: 'DE' },
	{ id: 'ba', name: 'Buenos Aires', country: 'AR' },
	{ id: 'taipei', name: 'Taipei', country: 'TW' },
	{ id: 'hyd', name: 'Hyderabad', country: 'IN' },
] as const;
