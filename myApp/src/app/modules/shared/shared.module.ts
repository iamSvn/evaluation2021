import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from './article-card/article-card.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [ ArticleCardComponent, FooterComponent ],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [
    ArticleCardComponent, FooterComponent
  ]
})
export class SharedModule { }
