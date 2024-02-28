import {Component, Input, OnInit} from '@angular/core';
import {Article} from "../../interfaces";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input({required: true}) article!: Article;
  @Input({required: true}) index!: number;
  constructor() {
  }

  ngOnInit() {
    console.log(this.article);
  }

  openArticle() {
    window.open(this.article.url, '_blank');
  }

  onOpenMenu() {
    console.log('onOpenMenu');
  }
}
