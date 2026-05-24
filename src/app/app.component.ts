import { Component } from '@angular/core';
 import { Colors } from '../enums/Color'; 
 import { Collection } from './collection'; 
 
 
 @Component({ 
  selector: 'app-root', 
  imports: [], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss', })


export class AppComponent {
  companyName = 'РУМТИБЕТ';
  isDateType = false;

  colors = ['red', 'blue', 'green'];

  users = [
    { id: 1, name: 'Rustam' },
    { id: 2, name: 'Amin' }
  ];

  colorsCollection = new Collection<string>(this.colors);

  usersCollection = new Collection<{ id: number; name: string }>(this.users);

  constructor() {
    this.saveLastVisitDate();
    this.saveVisitsCount();

    console.log(this.colorsCollection.getAll());
    console.log(this.usersCollection.getOne(0));

    this.colorsCollection.replace(1, 'black');
    this.usersCollection.delete(1);
  }

  changeToDate() {
    this.isDateType = true;
  }

  changeToText(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.value) {
      this.isDateType = false;
    }
  }

  checkMainColors(color: string): boolean {
    return Object.values(Colors).includes(color.toLowerCase() as Colors);
  }

  saveLastVisitDate(): void {
    const currentDate = new Date().toLocaleString();
    localStorage.setItem('lastVisitDate', currentDate);
  }

  saveVisitsCount(): void {
    const visits = localStorage.getItem('visitsCount');
    let currentVisits = visits ? Number(visits) : 0;
    currentVisits++;
    localStorage.setItem('visitsCount', currentVisits.toString());
  }
}