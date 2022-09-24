import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ServiceFirebaseService {

  constructor(public database:AngularFireDatabase) { }

  getValueFirebase(path:string){
    return this.database.object(path).valueChanges();
  }

  setValueFirebase(path:string,value:any){
    this.database.object(path).set(value);
  }

  
}
