import { Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
})
export class ParentComponent {
  user = {
    name: 'Alex',
    age: 20,
  };

  changeName() {
    this.user = {
      ...this.user,
      name: 'Eugene',
    };
  }
}
/* Интерфейс ребёнка не обновился, потому что при OnPush Angular отслеживает новую ссылку на объект @Input, а изменение this.user.name не создаёт новый объект.
Я исправил это, создав новый объект через spread-оператор: this.user = { ...this.user, name: 'Eugene' }. Новая ссылка заставляет ChildComponent обновиться. */
