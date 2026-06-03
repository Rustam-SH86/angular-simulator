import { Component } from '@angular/core';
 import { Colors } from '../enums/Color'; 
 import { Collection } from './collection'; 
 import { FormsModule } from '@angular/forms';
 
 
 @Component({ 
  selector: 'app-root', 
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss', })


export class AppComponent {
  protected readonly companyName = 'РУМТИБЕТ';
  protected showDate = true;
  protected currentTime = '';
  protected displayedNumber = 0;
  protected isDateType = false;
  protected selectedLocation = '';
  protected selectedDate = '';
  protected selectedParticipants = '';
  protected inputText = '';
  protected isLoading = true;

  protected readonly advantages = [
    {
      bg_icon: "/icons/advantages/background_people.svg",
      icon:"/icons/advantages/people.svg", 
      title: "Опытный гид", 
      text: "Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации."
    },
    {
      bg_icon: "/icons/advantages/background_shield.svg",
      icon:"/icons/advantages/shield.svg", 
      title: "Безопасный поход", 
      text: "Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации."
    },
    {
      bg_icon: "/icons/advantages/background_price.svg",
      icon:"/icons/advantages/price.svg", 
      title: "Лояльные цены", 
      text: "Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации."
    }
  ];

protected readonly programImages = [
  { src: '/image/programs/lake.svg', alt: 'lake' },
  { src: '/image/programs/man.svg', alt: 'man' },
  { src: '/image/programs/snowmobile.svg', alt: 'snowmobile' },
  { src: '/image/programs/mountains.svg', alt: 'mountains' },
];

  constructor() {
    this.stopLoader();
    setInterval(()=>{
      this.currentTime = new Date().toLocaleString();
    },1000);
  };

  protected changeToDate() {
    this.isDateType = true;
  };

  protected changeToText(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.value) {
      this.isDateType = false;
    }
  };

  protected addNumber(): void {
    this.displayedNumber ++;
  };

  protected subtractNumber(): void {
    if(this.displayedNumber > 0) {
      this.displayedNumber --;
    };
  };
    
  protected changeNameOfButton(): void {
    this.showDate = !this.showDate;
  };
  
  stopLoader(): void {
    setTimeout(() => {
      this.isLoading = false;
    },2000)
  };
};