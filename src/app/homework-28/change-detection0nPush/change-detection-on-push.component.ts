import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-change-detection',
  imports: [],
  templateUrl: './change-detection-on-push.component.html',
  styleUrl: './change-detection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeDetectionComponent implements DoCheck {
  count = 0;

  private readonly cd = inject(ChangeDetectorRef);

  ngDoCheck(): void {
    console.log('Change Detection');
  }
  // Часть 1. markForCheck()

  increaseByTimeout(): void {
    setTimeout(() => {
      this.count++;
      this.cd.markForCheck();
    }, 1000);
  }

  /*
  1. После markForCheck() компонент отмечен для проверки.

  2. Интерфейс обновляется не внутри самой строки markForCheck(),
     а во время ближайшего цикла Change Detection.

  3. Change Detection происходит после завершения функции таймера.

  4. Без markForCheck() стратегия OnPush могла бы пропустить
     компонент: count изменился, но компонент не был отмечен
     для проверки.
  */

  // Часть 2. detectChanges()

  increaseDetectChanges(): void {
    setTimeout(() => {
      this.count++;
      this.cd.detectChanges();
    }, 1000);
  }

  /*
  1. markForCheck() отмечает компонент для будущей проверки,
     а detectChanges() проверяет его сразу.

  2. После detectChanges() Change Detection выполняется немедленно.

  3. Проверяется текущий компонент и его дочерние представления.
     Родительские и соседние компоненты отдельно не проверяются.

  4. detectChanges() предпочтительнее, когда интерфейс необходимо
     обновить немедленно или компонент отключён через detach().
  */

  // Часть 3. detach()

  detachComponent(): void {
    this.cd.detach();
  }

  increaseDetachedByClick(): void {
    this.count++;
    console.log('Click count:', this.count);
  }

  increaseDetachedByTimeout(): void {
    setTimeout(() => {
      this.count++;
      console.log('Timeout count:', this.count);
    }, 1000);
  }

  increaseDetachedByPromise(): void {
    Promise.resolve().then(() => {
      this.count++;
      console.log('Promise count:', this.count);
    });
  }

  increaseDetachedByInterval(): void {
    setInterval(() => {
      this.count++;
      console.log('Interval count:', this.count);
    }, 1000);
  }

  /*
  1. После detach() интерфейс автоматически не обновляется.
     count в классе изменяется, но значение в HTML остаётся прежним.

  2. Автоматические вызовы ngDoCheck() для этого компонента
     прекращаются.

  3. Angular перестал проверять компонент, потому что detach()
     исключил его представление из общего дерева Change Detection.

  4. click, setTimeout, Promise и setInterval продолжают выполнять
     код и менять count, но не обновляют HTML автоматически.
  */

  // Часть 4. reattach()

  reattachComponent(): void {
    this.cd.reattach();
    this.cd.markForCheck();
  }

  increaseReattachedByClick(): void {
    this.count++;
  }

  increaseReattachedByTimeout(): void {
    setTimeout(() => {
      this.count++;
      this.cd.markForCheck();
    }, 1000);
  }

  increaseReattachedByPromise(): void {
    Promise.resolve().then(() => {
      this.count++;
      this.cd.markForCheck();
    });
  }

  increaseReattachedByInterval(): void {
    setInterval(() => {
      this.count++;
      this.cd.markForCheck();
    }, 1000);
  }

  /*
  1. После reattach() компонент снова подключён к общему
     дереву Change Detection.

  2. Компонент снова начинает участвовать в проверках после
     вызова reattach().

  3. Обычный click обновляет OnPush-компонент автоматически.

  4. После асинхронных изменений через setTimeout, Promise
     и setInterval вызывается markForCheck(), чтобы Angular
     проверил OnPush-компонент в ближайшем цикле.

  5. detectChanges() можно использовать вместо markForCheck(),
     если интерфейс требуется обновить немедленно.
  */
}
