import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { MessageType } from '../enums/message.enums';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUsers, faShieldHalved, faTag, faPlay, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  protected isDateType = false;
  protected selectedLocation = '';
  protected selectedDate = '';
  protected selectedParticipants = '';
  protected inputText = '';
  protected readonly MessageType = MessageType;
  public messageService: MessageService = inject(MessageService);

  protected readonly faUsers = faUsers;
  protected readonly faShieldHalved = faShieldHalved;
  protected readonly faTag = faTag;
  protected readonly faPlay = faPlay;
  protected readonly faStar = faStar;

  protected readonly destinations = [
    {
      image: '/image/popular_destinations/lake.svg',
      ratingIcon: faStar,
      ratingValue: '4.9',
      imageFooter: '/image/popular_destinations/lake-image_footer.svg',
      title: 'Озеро возле гор',
      subtitle: 'романтическое приключение',
      price: '480$',
    },
    {
      image: '/image/popular_destinations/night-mountains.svg',
      ratingIcon: faStar,
      ratingValue: '4.5',
      imageFooter: '/image/popular_destinations/night-mountains_footer.svg',
      title: 'Ночь в горах',
      subtitle: 'в компании друзей',
      price: '500$',
    },
    {
      image: '/image/popular_destinations/stretching_mountain.svg',
      ratingIcon: faStar,
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

  protected readonly programImages = [
    { src: '/image/programs/lake.svg', alt: 'lake' },
    { src: '/image/programs/man.svg', alt: 'man' },
    { src: '/image/programs/snowmobile.svg', alt: 'snowmobile' },
    { src: '/image/programs/mountains.svg', alt: 'mountains' },
  ];

  protected readonly advantages = [
    {
      bg_icon: '/icons/advantages/background_people.svg',
      icon: faUsers,
      title: 'Опытный гид',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      bg_icon: '/icons/advantages/background_shield.svg',
      icon: faShieldHalved,
      title: 'Безопасный поход',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      bg_icon: '/icons/advantages/background_price.svg',
      icon: faTag,
      title: 'Лояльные цены',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
  ];

  protected changeToDate() {
    this.isDateType = true;
  }

  protected changeToText(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.value) {
      this.isDateType = false;
    }
  }
}
