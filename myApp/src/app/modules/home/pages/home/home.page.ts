import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { BookmarksService } from 'src/app/services/bookmarks.service';
import { NewsService } from 'src/app/services/news.service';
// import {
//   InAppBrowser,
//   InAppBrowserOptions,
// } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  topNews: Article[];
  popularNewsBatch: Article[];
  allPopularNews: Article[];
  paginationCount: number;
  bookmarkedNews: Article[];
  isSearchEnabled: boolean = false;
  searchText: string = '';
  // options: InAppBrowserOptions = {
  //   hideurlbar: 'yes', //Or 'no'
  //   location: 'no',
  // };

  constructor(private newsService: NewsService, private router: Router,
    private bookmarksService: BookmarksService,
    //  private iab: InAppBrowser,
    ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    // Get top headlines in the US
    this.getTopNews();
    this.getPopularNews();
    // let dummyArticle: Article = {
    //   title: 'Crowd protests against military rule in Myanmar - BBC News',
    //   description:
    //     "Saturday's rally in Yangon is reportedly the biggest since the military seized power on Monday.",
    //   content: `Hundreds of people have rallied in Myanmar's main city, Yangon, to protest against this week's military coup.
    //    "Military dictator, fail, fail; Democracy, win, win," chanted the crowd, the largest pr… [+5957 chars]`,
    //   imageUrl:
    //     'https://ichef.bbci.co.uk/news/1024/branded_news/EB90/production/_116840306_reumyanmar.jpg',
    //   url: 'https://www.bbc.com/news/world-asia-55960284',
    //   source: 'BBC News',
    //   author: 'https://www.facebook.com/bbcnews',
    //   publishedAt: '2021-02-06T04:57:00Z',
    // };

    // this.topNews = Array(10).fill(dummyArticle);

    // this.allPopularNews = Array(30).fill(dummyArticle);
    // this.paginationCount = 1;
    // this.popularNewsBatch = this.allPopularNews.slice(
    //   0,
    //   this.paginationCount * 10
    // );

    this.getBookmarkedNews();
    // console.log(this.topNews, 'top news')
  }

  getTopNews() {
    this.newsService.getTopHeadlines().subscribe((topNews: Article[]) => {

      this.topNews = topNews;
    });
  }

  getBookmarkedNews() {
    this.bookmarksService.getArticlesFromBookmark().subscribe((bookmarkedArticles: Article[]) => {
      this.bookmarkedNews = bookmarkedArticles;
     });
  }

  getPopularNews() {
    this.newsService
      .getPopularHeadlines()
      .subscribe((popularNews: Article[]) => {
        this.paginationCount = 1;
        this.allPopularNews = popularNews;
        this.popularNewsBatch = this.allPopularNews.slice(
          0,
          this.paginationCount * 10
        );
      });
  }

  deepCopy(incomingData: any) {
    return JSON.parse(JSON.stringify(incomingData));
  }

  getSource() {
    let source: string = this.topNews[0].source;

    if (source.includes('News')) {
      source = source.replace('News', '');
    }

    return source;
  }

  addToBookmarks(incomingArticle: Article) {

    if(this.isNewsBookmarked(incomingArticle)) {
      this.bookmarksService.removeArticleFromBookmark(incomingArticle);
    } else {
      this.bookmarksService.addArticleToBookmark(incomingArticle)
    }
  }

  openBookmarks() {
  this.router.navigate(["/bookmarks"]);
  }

  openSearch() {
    this.isSearchEnabled = !this.isSearchEnabled;
  }

  toggleSearchFlag() {
    this.isSearchEnabled = !this.isSearchEnabled;
  }

  doInfinite(event) {
    setTimeout(() => {
      if (this.allPopularNews.length !== undefined) {
        if (this.popularNewsBatch.length !== this.allPopularNews.length) {
          this.paginationCount++;
          if (this.paginationCount * 10 < this.allPopularNews.length) {
            this.popularNewsBatch = this.allPopularNews.slice(
              0,
              this.paginationCount * 10
            );
          } else {
            this.popularNewsBatch = this.allPopularNews;
          }
        }
      }
      event.target.complete();
    }, 300);
  }

  ctaFunction(e) {
    if(e.action === 'addBookmark') {
     this.addToBookmarks(e.article)
    } else {
    //  this.openLinkInBrowser();
    }
  }

  // openLinkInBrowser(urlSelector: string) {
  //     const browser = this.iab.create(urlSelector, '_blank', this.options);
  //     browser.show();
  // }

  isNewsBookmarked(incoming: Article) {
    let isBookmarked: boolean = false;
    this.bookmarkedNews.forEach((article: Article, index: number) => {
      if (article.title === incoming.title) { isBookmarked = true }
    });
    return isBookmarked;
  }

  valueChanged(e) {
    console.log(e.detail.value);

    if(e.detail.value) {
      this.newsService.getSearchedHeadlines(e.detail.value).subscribe((searchedNews: Article[]) => {
        console.log(searchedNews);
      });
    }
  }
}

