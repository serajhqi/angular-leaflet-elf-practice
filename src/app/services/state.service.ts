import { Injectable } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { select, withProps, createStore, setProp } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  getEntity,
  selectAllEntities,
  selectAllEntitiesApply,
  setEntities,
  updateEntities,
  withEntities,
} from '@ngneat/elf-entities';
import { nanoid } from 'nanoid';


export interface Location {
  id: string,
  name: string,
  type: LocationTypes,
  latlng: L.LatLngExpression,
  logo: string
}

export type LocationTypes =
   "Business" | "Friend" | "Home" | "Favorite";


const store = createStore(
  { name: 'locations' },
  withEntities<Location>(),
  withProps<{targetForEdit:string|null}>({ targetForEdit: null })
);

@Injectable({ providedIn: 'root' })
export class LocationRepository {
  locations$ = store.pipe(selectAllEntities());
  tatgetLocation$ = store.pipe(select((state) => state.targetForEdit))

  setLocations(locations: Location[]) {
    store.update(setEntities(locations));
  }

  addLocation(location: Location) {
    store.update(addEntities({...location, id: nanoid(5)}));
  } 
  
  getLocation(id: string) {
    return store.query(getEntity(id));
  }

  updateLocation(location: Location){
    store.update(
      updateEntities(location.id, (location) => ({
        ...location,
      }))      
    )
  }

  removeLocation(id:string){
    store.update(deleteEntities(id));
  }
  
  setTargetForEdit(id:string){
    store.update((state)=>({
      ...state,
      targetForEdit: id
    }))
  }
  
  clearTargetForEdit(){
    store.update((state)=>({
      ...state,
      targetForEdit: null
    }))
  }
}
