import { ChangeDetectionStrategy, Component, DoCheck, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-change-detection',
  imports: [],
  templateUrl: './change-detection.component.html',
  styleUrl: './change-detection.component.scss',
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ChangeDetectionComponent implements DoCheck {
  count = 0;

  private readonly http = inject(HttpClient);

  ngDoCheck(): void {
    console.log('Change Detection');
  }

  increaseByClick(): void {
    this.count++;
  }

  /*
1. Интерфейс обновился автоматически: да.
2. ngDoCheck выполнился: 1 раз.
3. ChangeDetectorRef понадобился: нет.
4. Причина Change Detection: обработчик события click.
*/

  increaseByTimeout(): void {
    setTimeout(() => {
      this.count++;
    }, 1000);
  }

  /*
1. Интерфейс обновился автоматически: да.
2. ngDoCheck выполнился: 2 раза — после click и после setTimeout.
3. ChangeDetectorRef понадобился: нет.
4. Причина Change Detection: событие click и завершение setTimeout.
*/

  increaseAfterPromise(): void {
    Promise.resolve().then(() => {
      this.count++;
    });
  }

  /*
1. Интерфейс обновился автоматически: да.
2. ngDoCheck выполнился: 1 раз.
3. ChangeDetectorRef понадобился: нет.
4. Причина Change Detection: завершение микрозадачи Promise.
*/

  increaseAfterHttp(): void {
    this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe(() => {
      this.count++;
    });
  }

  /*
1. Интерфейс обновился автоматически: да.
2. ngDoCheck выполнился: 2 раза — после click и после HTTP-ответа.
3. ChangeDetectorRef понадобился: нет.
4. Причина Change Detection: событие click и получение HTTP-ответа.
*/

  increaseByInterval(): void {
    setInterval(() => {
      this.count++;
    }, 1000);
  }

  /*
1. Интерфейс обновляется автоматически: да, каждую секунду.
2. ngDoCheck: 1 раз после click, затем после каждого срабатывания интервала.
3. ChangeDetectorRef понадобился: нет.
4. Причина Change Detection: click и каждое срабатывание setInterval.
*/

  increaseByTimeoutAndPromise(): void {
    this.count++;

    Promise.resolve().then(() => {
      this.count++;
    });

    setTimeout(() => {
      this.count++;
    }, 1000);
  }

  /*
1. Интерфейс обновился автоматически: да, count увеличился на 3.
2. ngDoCheck выполнился: обычно 2 раза —
   после click/Promise и после setTimeout.
3. ChangeDetectorRef понадобился: нет.
4. Причина Change Detection: click, Promise и setTimeout.
*/
}
