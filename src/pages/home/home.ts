import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslationData } from '../../providers/translation-data';

//speechrec lib
import { SpeechRecognition } from '@ionic-native/speech-recognition';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private textForTranslation:String = '';
  private langFrom:String = '';
  private langTo:String = '';
  private cardContent:String = '';
  private cardList:Array<string>;
  private cardContent2:string = '';

  private speechToTextEnabled:boolean = false;

  constructor(public navCtrl: NavController, private translation: TranslationData, private speechRecognition:SpeechRecognition) {

    this.cardList = new Array<string>();

    //test speechrec is available
    this.speechRecognition.isRecognitionAvailable().then(
      (availability:boolean) => {
        this.speechToTextEnabled = availability;
      }
    );

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
      this.cardContent = this.textForTranslation + ' -> ' + result.responseData.translatedText;
      this.cardList.push(this.textForTranslation + ' -> ' + result.responseData.translatedText);
    });
    this.cardContent2 = this.cardList.toString();
    
  }



  private recogniseSpeech(){

    let options = {
      language: "en-US"
    };

    this.speechRecognition.startListening(options).subscribe(
      (matches: Array<string>) => {
        //we get array of recognised words
        let text = matches.join(' ');

        this.translateClick(text, 'en', 'cs');
      }
    );
  }

  //mic event handler
  speechToText()
  {
    if(this.speechToTextEnabled){
      //check permissions
      this.speechRecognition.hasPermission().then(
        (hasPermission:boolean) => {
          if(hasPermission){
            //we have permission, start recognition
            this.recogniseSpeech();
          }else{
            //request permission
            this.speechRecognition.requestPermission().then(
              () => {
                //permission granted
                this.recogniseSpeech();
              },
              () => {
                //permission denied

              }
            );
          }
        }
      );
    }else{
      console.log('Speechrec not available');
    }


  }

}
