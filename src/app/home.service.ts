import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public data: any;
  public api_url: string;

  constructor(public http: Http) {
    this.api_url = 'https://apitest-app.herokuapp.com/'
  }

  // Carrega a listagem de fotos
  load() {
    return new Promise(resolve => {
      this.http.get(this.api_url + '/pics')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  addPhoto(photo) {
    return new Promise(resolve => {
      this.http.post(this.api_url + '/pics', {'pic': {'photo': photo}})
        .map(res=> res.json())
        .subscribe(data => {
          this.data = data.results;
          resolve(this.data);
        });
    });
  }
}
