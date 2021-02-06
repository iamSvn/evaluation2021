import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { ApiHandler } from '../providers/api-handler';
import { AppUrls } from '../providers/app.urls.constants';
import { map } from 'rxjs/operators';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private apiHandler: ApiHandler) {}

  getTopHeadlines(): Observable<Article[]> {
    return this.apiHandler
      .get(AppUrls.GET_TOP_NEWS, {
        params: [
          { key: 'country', value: 'us' },
          { key: 'apiKey', value: 'e7bf82e1d4b64a069a8925817156bf72' },
        ],
      })
      .pipe(
        map((apiResponse: any) => {
          if (apiResponse.status.toLowerCase() === 'ok') {
            if (apiResponse.articles.length) {
              let articleArr: Article[] = [];

              for (let i = 0; i < apiResponse.articles.length; i++) {
                articleArr.push(this.articleMappingFun(apiResponse.articles[i]));
              }
              return articleArr;
            }
          }

        })
      ) as Observable<Article[]>;
  }


  getPopularHeadlines(): Observable<Article[]> {
    return this.apiHandler
      .get(AppUrls.GET_EVERY_NEWS, {
        params: [
          { key: 'q', value: 'popular' },
          { key: 'apiKey', value: 'e7bf82e1d4b64a069a8925817156bf72' },
        ],
      })
      .pipe(
        map((apiResponse: any) => {
          if (apiResponse.status.toLowerCase() === 'ok') {
            if (apiResponse.articles.length) {
              let articleArr: Article[] = [];

              for (let i = 0; i < apiResponse.articles.length; i++) {
                articleArr.push(this.articleMappingFun(apiResponse.articles[i]));
              }
              return articleArr;
            }
          }

        })
      ) as Observable<Article[]>;
  }

  articleMappingFun(incomingArticle: any) {
    let articlele = new Article();
    articlele.title = incomingArticle.title ? incomingArticle.title : "";
    articlele.description = incomingArticle.description ? incomingArticle.description : "";
    articlele.content = incomingArticle.content ? incomingArticle.content : "";
    articlele.imageUrl = incomingArticle.urlToImage ? incomingArticle.urlToImage : "";
    articlele.url = incomingArticle.url ? incomingArticle.url : "";
    articlele.source = incomingArticle.source.name ? incomingArticle.source.name : "";
    articlele.author = incomingArticle.author ? incomingArticle.author : "";
    articlele.publishedAt = incomingArticle.publishedAt ? incomingArticle.publishedAt : "";
    return articlele;
  }


  getSearchedHeadlines(searchText: string): Observable<Article[]> {
    return this.apiHandler
      .get(AppUrls.GET_EVERY_NEWS, {
        params: [
          { key: 'q', value: searchText },
          { key: 'apiKey', value: 'e7bf82e1d4b64a069a8925817156bf72' },
        ],
      })
      .pipe(
        map((apiResponse: any) => {
          if (apiResponse.status.toLowerCase() === 'ok') {
            if (apiResponse.articles.length) {
              let articleArr: Article[] = [];

              for (let i = 0; i < apiResponse.articles.length; i++) {
                articleArr.push(this.articleMappingFun(apiResponse.articles[i]));
              }
              return articleArr;
            }
          }

        })
      ) as Observable<Article[]>;
  }

}
