import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from "../../node_modules/rxjs/Observable";

/*
  Generated class for the TranslationData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TranslationData {

  constructor(public http: Http) {
    console.log('Hello TranslationData Provider');
  }

  getTranslation(text, from, to):Observable<any> {
    var url = 'http://api.mymemory.translated.net/get?q='+encodeURI(text)+'&langpair='+encodeURI(from)+'|'+encodeURI(to);
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

}
