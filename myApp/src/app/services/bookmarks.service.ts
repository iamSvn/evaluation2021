import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root',
})export class BookmarksService {

  bookmarkedArticles = new BehaviorSubject<Article[]>([]);

  constructor() {}

  addArticleToBookmark(incomingArticle: Article) {
     this.bookmarkedArticles.next(this.bookmarkedArticles.getValue().concat(incomingArticle));
     console.log(this.bookmarkedArticles);
  }

  getArticlesFromBookmark() {
     return this.bookmarkedArticles.asObservable();
  }

  removeArticleFromBookmark(incomingArticle: Article) {
    const articleArr: any[] = this.bookmarkedArticles.getValue();

    articleArr.forEach((article: Article, index: number) => {
      if (article.title === incomingArticle.title) { articleArr.splice(index, 1); }
    });

    this.bookmarkedArticles.next(articleArr);
  }


}
