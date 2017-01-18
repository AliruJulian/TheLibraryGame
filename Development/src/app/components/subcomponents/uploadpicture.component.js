"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var libgame_service_1 = require('./../../services/libgame.service');
var UploadPictureComponent = (function () {
    function UploadPictureComponent(lService) {
        this.lService = lService;
        this.reload = new core_1.EventEmitter();
        this.picturename = "";
        this.shown = false;
        this.successfullupload = false;
    }
    UploadPictureComponent.prototype.ngOnInit = function () {
        this.picturename = "";
    };
    UploadPictureComponent.prototype.requestPictureFileChangeEvent = function (fileInput) {
        this.pictureFiles = fileInput.target.files;
    };
    UploadPictureComponent.prototype.uploadPicture = function () {
        var _this = this;
        if (this.picturename.length == 0) {
            window.alert("Bitte wähle zuerst einen Bildnamen!");
            return;
        }
        if (this.pictureFiles.length == 0) {
            window.alert("Bitte wähle zuerst eine Bilddatei aus!");
            return;
        }
        this.lService.uploadPicture({ picturename: this.picturename }, this.pictureFiles).then(function (data) {
            console.log(data);
            if (typeof data.result !== "undefined" && data.result == true) {
                _this.picturename = "";
                _this.pictureFiles = [];
                _this.successfullupload = true;
                setTimeout(function () {
                    _this.shown = false;
                    _this.successfullupload = false;
                }, 2000);
                _this.reload.emit(true);
            }
            else {
                window.alert("Es gab einen Fehler bei deiner Anfrage. Bitte lass die Seite neuladen!");
            }
        }, function () {
            window.alert("Es gab einen Fehler bei deiner Anfrage. Bitte lass die Seite neuladen!");
        });
    };
    UploadPictureComponent.prototype.abortUploadPicture = function () {
        this.shown = false;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], UploadPictureComponent.prototype, "reload", void 0);
    UploadPictureComponent = __decorate([
        core_1.Component({
            selector: 'uploadpicture-component',
            providers: [libgame_service_1.LibgameService],
            template: "\n\n\n  <div *ngIf=\"shown\" style=\"position:fixed;left:0%;top:0%;background:rgba(0,0,0,0.4);width:100%;height:100%;z-index:10000000;\">\n    <div style=\"position:relative;margin-left:auto;margin-right:auto;top:5%;background:white;border:solid 1px gray;color:black;width:90%;max-width:500px;height:auto;padding:10px;text-align:center;\">\n      <p style=\"padding:10px;width:100%;text-align:center;\">W\u00E4hle ein Bild und einen Bildnamen</p>\n      <hr class=\"hrForAdministration\">\n\n      <input type=\"file\" accept=\"image/*\"\n                     (change)=\"requestPictureFileChangeEvent($event);\" name=\"pictureupload\" style=\"width: 95%;padding: 10px;\">\n\n       <input [(ngModel)]=\"picturename\" type=\"text\" placeholder=\"Bildname\" style=\"width: 95%;\">\n\n      <button (click)=\"abortUploadPicture();\" class=\"button\" style=\"width: calc(35% - 10px);margin-top: 30px;\">Abbrechen</button>\n      <button (click)=\"uploadPicture();\" class=\"button\" style=\"width:60%;margin-left:5%;\">Bild jetzt hinzuf\u00FCgen!</button>\n      <div style=\"width:100%;text-align:center;\">\n        <div *ngIf=\"successfullupload\" style=\"padding: 5px;\">Bild erfolgreich hinzugef\u00FCgt!</div>\n      </div>\n\n    </div>\n  </div>\n\n  <button class=\"button\" (click)=\"shown=true;\" style=\"width:initial;\">\n    Bild zur Datenbank hinzuf\u00FCgen\n  </button>\n\n\n  "
        }), 
        __metadata('design:paramtypes', [libgame_service_1.LibgameService])
    ], UploadPictureComponent);
    return UploadPictureComponent;
}());
exports.UploadPictureComponent = UploadPictureComponent;
//# sourceMappingURL=uploadpicture.component.js.map