import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { forkJoin, Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getOne(id: number): Observable<Todo> {
    return this.http.get<Todo>(this.getUrlById(id));
  }

  getMultiple(ids: number[]): Observable<Todo[]> {
    const requests: Observable<Todo>[] = [];
    ids?.forEach((id: number) => {
      requests.push(this.http.get<Todo>(this.getUrlById(id)));
    });
    return forkJoin(requests);
  }

  private getUrlById(id: number): string {
    return `${this.API_URL}/todos/${id}`;
  }

}
