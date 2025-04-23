import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = '/api/Product';

  constructor(private http: HttpClient) {}

  getArticles(filter?: string, sortBy?: string): Observable<Article[]> {
    let params: any = {};
    if (filter) {
      params.filter = filter;
    }
    if (sortBy) {
      params.sortBy = sortBy;
    }
    return this.http.get<Article[]>(this.apiUrl, { params });
  }
}