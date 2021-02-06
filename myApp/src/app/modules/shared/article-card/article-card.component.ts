import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent implements OnInit {

  @Input() news: Article;
  @Input() isBookmarked: boolean;
  @Output() ctaEmitter = new EventEmitter();
  ctaEvent: {
    article: Article,
    action: string
  };

  constructor() { }

  ngOnInit() {}

  getSource(incomingArticle: Article) {
    let source: string = incomingArticle.source;

    if(source.includes('News')) {
     source = (source.replace('News', ''));
    }

    return source;
 }

 ctaFunction(btnAction: string) {

    this.ctaEvent = {
       article: this.news,
       action: btnAction
    }
    this.ctaEmitter.emit(this.ctaEvent);
 }

}
