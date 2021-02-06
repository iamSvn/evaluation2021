import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { BookmarksPage } from './pages/bookmarks/bookmarks.page';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [BookmarksPage],
  imports: [
    CommonModule, SharedModule, IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: BookmarksPage,
      },
    ]),
  ]
})
export class BookmarksModule { }
