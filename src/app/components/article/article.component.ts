import {Component, inject, Input, OnInit} from '@angular/core';
import {Article} from "../../interfaces";
import {InAppBrowser} from "@awesome-cordova-plugins/in-app-browser/ngx";
import {ActionSheetButton, ActionSheetController, Platform} from "@ionic/angular";
import {SocialSharing} from "@awesome-cordova-plugins/social-sharing/ngx";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  iab = inject(InAppBrowser)
  platform = inject(Platform)
  actionSheet = inject(ActionSheetController)
  socialSharing = inject(SocialSharing)

  @Input({required: true}) article!: Article;
  @Input({required: true}) index!: number;

  constructor() {
  }

  ngOnInit() {
    console.log("in article");
  }

  openArticle() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      const browser = this.iab.create(this.article.url);
      browser.show();
      return;
    }

    window.open(this.article.url, '_blank');
  }

  async onOpenMenu() {

    const normalBtns: ActionSheetButton[] = [
      {
        text: 'Favorito',
        icon: 'heart',
        handler: () => this.onToggleFavorite()
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel'
      }
    ]

    const shareBtn: ActionSheetButton = {
      text: 'Compartir',
      icon: 'share-social',
      handler: () => this.onShareArticle()
    }

    if (this.platform.is('capacitor')) {
      normalBtns.unshift(shareBtn);
    }

    const actionSheet = await this.actionSheet.create({
      header: 'Opciones',
      buttons: [...normalBtns]
    })

    await actionSheet.present();
  }

  onShareArticle() {

    const {title, source, url} = this.article;
    this.socialSharing.share(
      `${title}`,
      `${source.name}`,
      '',
      url
    ).then();
  }

  onToggleFavorite() {
    console.log('Favorite clicked');
  }
}
