import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslationData } from '../../providers/translation-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private textForTranslation:String = '';
  private langFrom:String = '';
  private langTo:String = '';
  private cardContent:String = '';

  constructor(public navCtrl: NavController, private translation: TranslationData) {

  }

  /**
   * user input
   * @param tText 
   */
  public translateClick(tText:String, from:String, to:String){
    this.textForTranslation = tText;
    this.langFrom = from;
    this.langTo = to;

    console.log(this.textForTranslation);
    console.log(this.langFrom);
    console.log(this.langTo);

    // pass text for translation to translation service
    this.translation.getTranslation(this.textForTranslation, this.langFrom, this.langTo).subscribe( (result) => {
      this.cardContent = result.responseData.translatedText;
    });
  }

}
