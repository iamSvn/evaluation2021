import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { BookmarksService } from 'src/app/services/bookmarks.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss'],
})
export class BookmarksPage implements OnInit {

  bookmarkedNews: Article[];

  constructor(private location: Location, private bookmarksService: BookmarksService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getBookmarkedNews();
  }

  getBookmarkedNews() {
    this.bookmarksService.getArticlesFromBookmark().subscribe((bookmarkedArticles: Article[]) => {
      this.bookmarkedNews = bookmarkedArticles;
     });
  }

  goBack() {
    this.location.back();
  }

  openSearch() {}

  ctaFunction(e) {
    if(e.action === 'addBookmark') {
     this.addToBookmarks(e.article)
    }
  }

  addToBookmarks(incomingArticle: Article) {

    if(this.isNewsBookmarked(incomingArticle)) {
      this.bookmarksService.removeArticleFromBookmark(incomingArticle);
    } else {
      this.bookmarksService.addArticleToBookmark(incomingArticle)
    }
  }

  isNewsBookmarked(incoming: Article) {
    let isBookmarked: boolean = false;
    this.bookmarkedNews.forEach((article: Article, index: number) => {
      if (article.title === incoming.title) { isBookmarked = true }
    });
    return isBookmarked;
  }

}
