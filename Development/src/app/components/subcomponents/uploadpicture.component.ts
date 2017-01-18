import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LibgameService } from './../../services/libgame.service';

declare var $:any;

@Component({
  selector: 'uploadpicture-component',
  providers: [LibgameService],
  template: `


  <div *ngIf="shown" style="position:fixed;left:0%;top:0%;background:rgba(0,0,0,0.4);width:100%;height:100%;z-index:10000000;">
    <div style="position:relative;margin-left:auto;margin-right:auto;top:5%;background:white;border:solid 1px gray;color:black;width:90%;max-width:500px;height:auto;padding:10px;text-align:center;">
      <p style="padding:10px;width:100%;text-align:center;">Wähle ein Bild und einen Bildnamen</p>
      <hr class="hrForAdministration">

      <input type="file" accept="image/*"
                     (change)="requestPictureFileChangeEvent($event);" name="pictureupload" style="width: 95%;padding: 10px;">

       <input [(ngModel)]="picturename" type="text" placeholder="Bildname" style="width: 95%;">

      <button (click)="abortUploadPicture();" class="button" style="width: calc(35% - 10px);margin-top: 30px;">Abbrechen</button>
      <button (click)="uploadPicture();" class="button" style="width:60%;margin-left:5%;">Bild jetzt hinzufügen!</button>
      <div style="width:100%;text-align:center;">
        <div *ngIf="successfullupload" style="padding: 5px;">Bild erfolgreich hinzugefügt!</div>
      </div>

    </div>
  </div>

  <button class="button" (click)="shown=true;" style="width:initial;">
    Bild zur Datenbank hinzufügen
  </button>


  `
})
export class UploadPictureComponent implements OnInit {

  @Output() reload = new EventEmitter();

  picturename:any = "";
  shown:any = false;
  successfullupload:any = false;

  pictureFiles: Array<File>;

  constructor(
    private lService: LibgameService
  ){}

  ngOnInit() {
    this.picturename = "";
  }

  requestPictureFileChangeEvent(fileInput: any){
      this.pictureFiles = <Array<File>> fileInput.target.files;
  }

  uploadPicture() {

    if(this.picturename.length == 0) {
      window.alert("Bitte wähle zuerst einen Bildnamen!");
      return;
    }

    if(this.pictureFiles.length == 0) {
      window.alert("Bitte wähle zuerst eine Bilddatei aus!");
      return;
    }

    this.lService.uploadPicture({picturename: this.picturename}, this.pictureFiles).then((data:any) => {
      console.log(data);
      if(typeof data.result !== "undefined" && data.result == true) {
        this.picturename = "";
        this.pictureFiles = [];
        this.successfullupload = true;

        setTimeout(() => {
          this.shown = false;
          this.successfullupload = false;
        }, 2000);

        this.reload.emit(true);

      } else {
        window.alert("Es gab einen Fehler bei deiner Anfrage. Bitte lass die Seite neuladen!");
      }

    }, () => {
      window.alert("Es gab einen Fehler bei deiner Anfrage. Bitte lass die Seite neuladen!");
    });

  }

  abortUploadPicture() {
    this.shown = false;
  }

}
