import { Injectable } from '@angular/core';
import { nanoid } from 'nanoid';
import { Location } from '../app.component';
const MAINKEY = "locations"
@Injectable({
	providedIn: 'root'
})
export class StorageService {

	constructor() { }

	saveLocation(location: Location) {
		const locations = this.getLocations();
		location.id = nanoid(5);
		locations.push(location);
		localStorage.setItem(MAINKEY, JSON.stringify(locations));
	}

	getLocation(id: string): Location | undefined {
		const locations = this.getLocations();
		return locations.filter(location => location.id === id)?.[0]
	}

	getLocations(): Location[] {
		return localStorage.getItem(MAINKEY) ?
			JSON.parse(localStorage.getItem('locations') as string):[];
	}

	updateLocation(id: string) {
	}

	removeLocation(key: string): Location[] {
		localStorage.removeItem(key);
		return [];
	}

	clear() {
		localStorage.clear();
	}
}
