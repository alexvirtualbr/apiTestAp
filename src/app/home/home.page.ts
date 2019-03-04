import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

// Carregando o serviço que irá se comunicar com a API
import {HomeService} from '../home.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [HomeService]
})
export class HomePage {
  // Variável que irá armazenar as fotos
  public photos: any; 

  constructor(
    public homeService: HomeService, 
    private camera: Camera) {this.loadHome();
  }
  
  loadHome() {
    console.log('hey');
    this.homeService.load()
      .then(data => {
        console.log(data);
        this.photos = data;
      });
  }

  addPhotoToHome(photo) {
    console.log('hey 2');
    this.homeService.addPhoto(photo)
      .then(data => {
        this.loadHome();
      });
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.loadHome();
      refresher.complete();
    }, 2000);
  }

  takePicture() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000      
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.addPhotoToHome("data:image/jpeg;base64," + imageData);
    }, (err) => {
      console.log(err);
    });
  }
}
