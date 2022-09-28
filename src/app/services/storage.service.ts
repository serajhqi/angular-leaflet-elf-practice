import { Injectable } from '@angular/core';
import { nanoid } from 'nanoid';
import { Location } from './state.service';
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

	updateLocation(id: string, location: Location): Location[] {
		const locations = this.getLocations();
		const targetLocationIndex = locations.findIndex((item => item.id == location.id));
		locations[targetLocationIndex] = location;
		localStorage.setItem(MAINKEY, JSON.stringify(locations));
		return locations;
	}

	removeLocation(id: string): Location[] {
		let locations = this.getLocations();
		locations = locations.filter(item => item.id !== id);
		localStorage.setItem(MAINKEY, JSON.stringify(locations))
		return locations;
	}

	clear() {
		localStorage.clear();
	}
}
