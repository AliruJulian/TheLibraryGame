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
var core_1 = require("@angular/core");
var libgame_service_1 = require("./../../services/libgame.service");
var HTMLEditorComponent = (function () {
    function HTMLEditorComponent(lService) {
        this.lService = lService;
        this.htmlcontent = new core_1.EventEmitter();
        this.reload = new core_1.EventEmitter();
        this.id = "";
        this.hasFocus = false;
        this.showInsertPicture = false;
        this.showInsertLink = false;
        this.tempPictureLink = "";
        this.tempPictureWidth = "";
        this.tempPictureHeight = "";
        this.tempPictureId = -1;
        this.id = this.makeid();
    }
    HTMLEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        document.addEventListener('mousedown', function () {
            _this.hasFocus = false;
        }, false);
        this.setInnerHTMLOfDiv(this.value);
    };
    HTMLEditorComponent.prototype.setInnerHTMLOfDiv = function (value) {
        var _this = this;
        if (typeof document.getElementById(this.id) === 'undefined' || document.getElementById(this.id) == null || typeof this.value === 'undefined') {
            setTimeout(function () { _this.setInnerHTMLOfDiv(value); }, 10);
            return;
        }
        if (this.value.length != document.getElementById(this.id).innerHTML.length)
            document.getElementById(this.id).innerHTML = value;
    };
    HTMLEditorComponent.prototype.ngOnChanges = function (changes) {
        if (typeof changes["value"] !== 'undefined')
            this.setInnerHTMLOfDiv(changes["value"].currentValue);
    };
    HTMLEditorComponent.prototype.updateValue = function () {
        this.htmlcontent.emit($('#' + this.id).html().trim());
    };
    HTMLEditorComponent.prototype.getPictures = function () {
        return typeof this.pictures !== 'undefined' ? this.pictures : [];
    };
    HTMLEditorComponent.prototype.focusFunction = function () {
        this.hasFocus = true;
    };
    HTMLEditorComponent.prototype.makeUnderline = function (e) {
        var _this = this;
        document.execCommand('underline');
        e.preventDefault();
        e.stopPropagation();
        this.hasFocus = true;
        setTimeout(function () { $('#' + _this.id).focus(); }, 10);
        return false;
    };
    HTMLEditorComponent.prototype.makeBold = function (e) {
        var _this = this;
        document.execCommand('bold');
        e.preventDefault();
        e.stopPropagation();
        this.hasFocus = true;
        setTimeout(function () { $('#' + _this.id).focus(); }, 10);
    };
    HTMLEditorComponent.prototype.makeItalic = function (e) {
        var _this = this;
        document.execCommand('italic');
        e.preventDefault();
        e.stopPropagation();
        this.hasFocus = true;
        setTimeout(function () { $('#' + _this.id).focus(); }, 10);
    };
    HTMLEditorComponent.prototype.makeLineThrough = function (e) {
        var _this = this;
        document.execCommand('strikethrough');
        e.preventDefault();
        e.stopPropagation();
        this.hasFocus = true;
        setTimeout(function () { $('#' + _this.id).focus(); }, 10);
    };
    HTMLEditorComponent.prototype.makeAlignLeft = function (e) {
        var _this = this;
        document.execCommand('justifyLeft');
        e.preventDefault();
        e.stopPropagation();
        this.hasFocus = true;
        setTimeout(function () { $('#' + _this.id).focus(); }, 10);
    };
    HTMLEditorComponent.prototype.makeAlignRight = function (e) {
        var _this = this;
        document.execCommand('justifyRight');
        e.preventDefault();
        e.stopPropagation();
        this.hasFocus = true;
        setTimeout(function () { $('#' + _this.id).focus(); }, 10);
    };
    HTMLEditorComponent.prototype.makeAlignCenter = function (e) {
        var _this = this;
        document.execCommand('justifyCenter');
        e.preventDefault();
        e.stopPropagation();
        this.hasFocus = true;
        setTimeout(function () { $('#' + _this.id).focus(); }, 10);
    };
    HTMLEditorComponent.prototype.makeInsertPicture = function (e) {
        var _this = this;
        this.showInsertPicture = true;
        this.pictureInsertID = this.makeid();
        document.execCommand("insertHTML", false, "<img id='" + this.pictureInsertID + "' src='' />");
        e.preventDefault();
        e.stopPropagation();
        this.hasFocus = true;
        setTimeout(function () { $('#' + _this.id).focus(); }, 10);
    };
    HTMLEditorComponent.prototype.finalizeInsertPicture = function () {
        this.showInsertPicture = false;
        if (this.tempPictureLink.length != 0) {
            $('#' + this.id).find('#' + this.pictureInsertID).attr('src', this.tempPictureLink);
            $('#' + this.id).find('#' + this.pictureInsertID).css('width', this.tempPictureWidth + "px");
            $('#' + this.id).find('#' + this.pictureInsertID).css('height', this.tempPictureHeight + "px");
        }
        else if (this.tempPictureId != -1) {
            $('#' + this.id).find('#' + this.pictureInsertID).attr('src', this.lService.getPictureLink(this.tempPictureId));
            $('#' + this.id).find('#' + this.pictureInsertID).css('width', this.tempPictureWidth + "px");
            $('#' + this.id).find('#' + this.pictureInsertID).css('height', this.tempPictureHeight + "px");
        }
        this.tempPictureLink = "";
        this.tempPictureId = -1;
        this.tempPictureWidth = "";
        this.tempPictureHeight = "";
    };
    HTMLEditorComponent.prototype.abortInsertPicture = function () {
        this.showInsertPicture = false;
        $('#' + this.id).find('#' + this.pictureInsertID).remove();
    };
    HTMLEditorComponent.prototype.makeid = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };
    return HTMLEditorComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HTMLEditorComponent.prototype, "value", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HTMLEditorComponent.prototype, "pictures", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], HTMLEditorComponent.prototype, "htmlcontent", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], HTMLEditorComponent.prototype, "reload", void 0);
HTMLEditorComponent = __decorate([
    core_1.Component({
        selector: 'htmleditor-component',
        providers: [libgame_service_1.LibgameService],
        template: "\n\n\n    <div class=\"editor\" [class.editor-hasfocus]=\"hasFocus\" (click)=\"$event.stopPropagation();\" (mousedown)=\"$event.stopPropagation();\" (focusout)=\"updateValue()\" (mouseleave)=\"updateValue();hasFocus = false;\">\n      <div *ngIf=\"hasFocus\" class=\"editor-head\" style=\"width:100%;\">\n        <button (click)=\"makeUnderline($event);\" class=\"button-editor\" style=\"text-decoration:underline;width:35px;\">U</button>\n        <button (click)=\"makeBold($event);\" class=\"button-editor\" style=\"width:35px;\">B</button>\n        <button (click)=\"makeItalic($event);\" class=\"button-editor\" style=\"width:35px;\">I</button>\n        <button (click)=\"makeLineThrough($event);\" class=\"button-editor\" style=\"text-decoration:line-through;width:35px;\">S</button>\n\n        <button (click)=\"makeAlignLeft($event);\" class=\"button-editor\" style=\"width:35px;margin-left:10px;\"><i class=\"fa fa-align-left\" style=\"margin: 0;\"></i></button>\n        <button (click)=\"makeAlignCenter($event);\" class=\"button-editor\" style=\"width:35px;\"><i class=\"fa fa-align-center\" style=\"margin: 0;\"></i></button>\n        <button (click)=\"makeAlignRight($event);\" class=\"button-editor\" style=\"width:35px;\"><i class=\"fa fa-align-right\" style=\"margin: 0;\"></i></button>\n\n        <button (click)=\"makeInsertPicture($event);\" class=\"button-editor\" style=\"width:35px;margin-left:10px;\"><i class=\"fa fa-file-image-o\" style=\"margin: 0;\"></i></button>\n\n\n      </div>\n      <div contenteditable=\"true\" [id]=\"id\" (focus)=\"focusFunction()\" class=\"editor-body\" style=\"width:100%;height:auto;min-height:200px;\">\n\n      </div>\n    </div>\n\n    <div *ngIf=\"showInsertPicture\" (click)=\"$event.stopPropagation();\" style=\"position:fixed;left:0%;top:0%;background:rgba(0,0,0,0.4);width:100%;height:100%;z-index:1000000;margin:0;\">\n      <div style=\"position:relative;margin-left:auto;margin-right:auto;top:5%;background:white;border:solid 1px gray;color:black;width:90%;max-width:400px;height:auto;padding:10px;\">\n        <p style=\"width:100%;text-align:center;\">Gib entweder einen Link ein oder w\u00E4hle ein Bild aus der Datenbank aus</p>\n        <hr class=\"hrForAdministration\">\n\n        <label [hidden]=\"tempPictureId != -1\" style=\"width:100%;text-align:center;\">Link</label>\n        <br [hidden]=\"tempPictureId != -1\">\n        <input [hidden]=\"tempPictureId != -1\" [(ngModel)]=\"tempPictureLink\" type=\"text\" placeholder=\"Link\" style=\"width:100%;\"/>\n        <br [hidden]=\"tempPictureId != -1\">\n\n        <hr [hidden]=\"tempPictureLink.length != 0 || tempPictureId != -1\" class=\"hrForAdministration\">\n\n        <label [hidden]=\"tempPictureLink.length != 0\" style=\"width:100%;text-align:center;\">Bild aus der Datenbank</label>\n        <br [hidden]=\"tempPictureLink.length != 0\">\n        <select [hidden]=\"tempPictureLink.length != 0\" [(ngModel)]=\"tempPictureId\"  style=\"width:100%;\">\n          <option value='-1' selected=\"selected\">-- None --</option>\n          <option *ngFor=\"let t_picture of getPictures();\" value='{{t_picture.picture_id}}'>-- {{t_picture.picturename}} --</option>\n        </select>\n        <div [hidden]=\"tempPictureLink.length != 0\" style=\"text-align:right;\">\n          <uploadpicture-component (reload)=\"reload.emit(true);\"></uploadpicture-component>\n        </div>\n\n        <hr [hidden]=\"tempPictureLink.length == 0 && tempPictureId == -1\" class=\"hrForAdministration\">\n\n        <div *ngIf=\"tempPictureLink.length != 0 || tempPictureId != -1\">\n          <label  style=\"width:100%;text-align:center;\">Breite [in Pixeln]<span style=\"color:#e9266d\">*</span></label>\n          <br>\n          <input [(ngModel)]=\"tempPictureWidth\" type=\"text\" placeholder=\"Breite [in Pixeln]\" style=\"width:100%;\"/>\n          <br/>\n          <label  style=\"width:100%;text-align:center;\">H\u00F6he [in Pixeln]<span style=\"color:#e9266d\">*</span></label>\n          <br>\n          <input [(ngModel)]=\"tempPictureHeight\" type=\"text\" placeholder=\"H\u00F6he [in Pixeln]\" style=\"width:100%;\"/>\n        </div>\n\n        <button (click)=\"abortInsertPicture();\" class=\"button\" style=\"width: calc(35% - 10px);margin-top: 10px;\">Abbrechen</button>\n        <button (click)=\"finalizeInsertPicture();\" [hidden]=\"(tempPictureLink.length == 0 && tempPictureId == -1) || tempPictureWidth.length==0 || tempPictureHeight.length==0\" class=\"button\" style=\"width:60%;margin-left:5%;\">Bild jetzt hinzuf\u00FCgen!</button>\n      </div>\n    </div>\n\n\n  "
    }),
    __metadata("design:paramtypes", [libgame_service_1.LibgameService])
], HTMLEditorComponent);
exports.HTMLEditorComponent = HTMLEditorComponent;
//# sourceMappingURL=htmleditor.component.js.map