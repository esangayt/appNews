import {Component, Input, OnInit} from '@angular/core';
import {Article} from "../../interfaces";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {

  @Input({required: true}) articles: Article[] = [];

  constructor() {
  }

  ngOnInit() {
    console.log('articles')
  }

}
