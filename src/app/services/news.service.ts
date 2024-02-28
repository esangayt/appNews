import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, Observable, of, tap} from "rxjs";
import {Article, ArticlesByCategoryAndPage, NewsResponse} from "../interfaces";


const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  http = inject(HttpClient)
  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = {};

  constructor() {
  }

  private executeQuery<T>(endpoint: string) {
    return this.http.get<T>(`${apiUrl}${endpoint}`, {
      params: {
        apiKey: apiKey,
        country: 'us',
      }
    })
  }

  getTopHeadLines(): Observable<Article[]> {
    return this.getTopHeadlinesByCategory('business');
  }

  getTopHeadlinesByCategory(category: string, loadMore: boolean=false):Observable<Article[]>{
    if (loadMore){
      return this.getArticleByCategory(category);
    }

    if(this.articlesByCategoryAndPage[category] && !loadMore){
      return of(this.articlesByCategoryAndPage[category].articles)
    }

    return this.getArticleByCategory(category);
  }

  private getArticleByCategory(category: string): Observable<Article[]> {

    if (!Object.keys(this.articlesByCategoryAndPage).includes(category)) {
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: []
      }
    }

    const page = this.articlesByCategoryAndPage[category].page + 1;

    return this.executeQuery<NewsResponse>(`/top-headlines?category=${category}&page=${page}`)
      .pipe(
        tap(articles => {
          console.log(articles)
        }),
        map(({articles}) => {

          if (articles.length === 0) return this.articlesByCategoryAndPage[category].articles

          this.articlesByCategoryAndPage[category] = {
            page,
            articles: [...this.articlesByCategoryAndPage[category].articles, ...articles]
          }

          return this.articlesByCategoryAndPage[category].articles
        })
      )
  }
}
