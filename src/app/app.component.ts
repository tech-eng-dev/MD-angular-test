import { Component, OnInit } from '@angular/core';
import { ApiService } from './core/services/api.service';
import { take } from 'rxjs/operators';
import { Todo } from './core/models/todo.model';
import { noop } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Testapp';
  todo: Todo;
  todos: Todo[];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getOneTodo();
    this.getMultipleTodos();
  }

  private getOneTodo(): void {
    this.apiService.getOne(1).pipe(
      take(1)
    ).subscribe((todo: Todo) => {
      this.todo = todo;
    }, noop);
  }

  private getMultipleTodos(): void {
    const ids = [2, 3, 4];
    this.apiService.getMultiple(ids).pipe(
      take(1)
    ).subscribe((todos: Todo[]) => {
      this.todos = todos;
    }, noop);
  }

}
