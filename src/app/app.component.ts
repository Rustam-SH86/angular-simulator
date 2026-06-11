import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../message.service/message.service';
import { CommonModule } from '@angular/common';
import { MessageType } from '../message.service/message.enums';
import { LocalStorageService } from '../localstorage.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly companyName = 'РУМТИБЕТ';
  protected readonly MessageType = MessageType;
  protected showDate = true;
  protected currentTime = '';
  protected displayedNumber = 0;
  protected isDateType = false;
  protected selectedLocation = '';
  protected selectedDate = '';
  protected selectedParticipants = '';
  protected inputText = '';
  protected isLoading = true;

  public messageService: MessageService = inject(MessageService);
  public localstorageService: LocalStorageService = inject(LocalStorageService);

  protected readonly advantages = [
    {
      bg_icon: '/icons/advantages/background_people.svg',
      icon: '/icons/advantages/people.svg',
      title: 'Опытный гид',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      bg_icon: '/icons/advantages/background_shield.svg',
      icon: '/icons/advantages/shield.svg',
      title: 'Безопасный поход',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      bg_icon: '/icons/advantages/background_price.svg',
      icon: '/icons/advantages/price.svg',
      title: 'Лояльные цены',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
  ];

  protected readonly programImages = [
    { src: '/image/programs/lake.svg', alt: 'lake' },
    { src: '/image/programs/man.svg', alt: 'man' },
    { src: '/image/programs/snowmobile.svg', alt: 'snowmobile' },
    { src: '/image/programs/mountains.svg', alt: 'mountains' },
  ];

  protected readonly destinations = [
    {
      image: '/image/popular_destinations/lake.svg',
      ratingIcon: '/image/popular_destinations/rating-star.svg',
      ratingValue: '4.9',
      imageFooter: '/image/popular_destinations/lake-image_footer.svg',
      title: 'Озеро возле гор',
      subtitle: 'романтическое приключение',
      price: '480$',
    },
    {
      image: '/image/popular_destinations/night-mountains.svg',
      ratingIcon: '/image/popular_destinations/rating-star.svg',
      ratingValue: '4.5',
      imageFooter: '/image/popular_destinations/night-mountains_footer.svg',
      title: 'Ночь в горах',
      subtitle: 'в компании друзей',
      price: '500$',
    },
    {
      image: '/image/popular_destinations/stretching_mountain.svg',
      ratingIcon: '/image/popular_destinations/rating-star.svg',
      ratingValue: '5',
      imageFooter: '/image/popular_destinations/stretching-mountains_footer.svg',
      title: 'Растяжка в горах',
      subtitle: 'для тех, кто заботится о себе',
      price: '230$',
    },
  ];

  protected readonly travelBlog = [
    {
      image: '/image/travel_blog/italy.svg',
      title: 'Красивая Италя, какая она в реальности?',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023',
      readArticle: 'читать статью',
    },
    {
      image: '/image/travel_blog/plane.svg',
      title: 'Долой сомнения! Весь мир открыт для вас!',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      date: '01/04/2023',
      readArticle: 'читать статью',
    },
    {
      image: '/image/travel_blog/street.svg',
      title: 'Как подготовиться к путешествию в одиночку?',
      description: 'Для современного мира базовый вектор развития предполагает.',
      date: '01/04/2023',
      readArticle: 'читать статью',
    },
    {
      image: '/image/travel_blog/tadjmahal.svg',
      title: 'Индия ... летим?',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации .',
      date: '01/04/2023',
      readArticle: 'читать статью',
    },
  ];

  constructor() {
    this.saveVisitsCountAndDate();
    this.stopLoader();
    setInterval(() => {
      this.currentTime = new Date().toLocaleString();
    }, 1000);
  }

  protected changeToDate() {
    this.isDateType = true;
  }

  protected changeToText(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.value) {
      this.isDateType = false;
    }
  }

  protected addNumber(): void {
    this.displayedNumber++;
  }

  protected subtractNumber(): void {
    if (this.displayedNumber > 0) {
      this.displayedNumber--;
    } else {
    }
  }

  protected changeNameOfButton(): void {
    this.showDate = !this.showDate;
  }

  saveVisitsCountAndDate(): void {
    let currentVisit = this.localstorageService.getValue<number>('visitsCount') ?? 0;
    currentVisit++;
    this.localstorageService.setValue('visitsCount', currentVisit);
    this.localstorageService.setValue('lastVisitDate', new Date().toLocaleString());
  }

  stopLoader(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
