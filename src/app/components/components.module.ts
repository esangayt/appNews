import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticleComponent} from "./article/article.component";
import {ArticlesComponent} from "./articles/articles.component";
import {IonicModule} from "@ionic/angular";



@NgModule({
  declarations: [
    ArticleComponent,
    ArticlesComponent,
  ],
  exports: [
    ArticlesComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
