import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { Router, Params } from '@angular/router';
import { LibgameService } from './../../services/libgame.service';


declare var $:any;

@Component({
  selector: 'htmleditor-component',
  providers: [LibgameService],
  template: `


    <div class="editor" [class.editor-hasfocus]="hasFocus" (click)="$event.stopPropagation();" (mousedown)="$event.stopPropagation();" (focusout)="updateValue()" (mouseleave)="updateValue();hasFocus = false;">
      <div *ngIf="hasFocus" class="editor-head" style="width:100%;">
        <button (click)="makeUnderline($event);" class="button-editor" style="text-decoration:underline;width:35px;">U</button>
        <button (click)="makeBold($event);" class="button-editor" style="width:35px;">B</button>
        <button (click)="makeItalic($event);" class="button-editor" style="width:35px;">I</button>
        <button (click)="makeLineThrough($event);" class="button-editor" style="text-decoration:line-through;width:35px;">S</button>

        <button (click)="makeAlignLeft($event);" class="button-editor" style="width:35px;margin-left:10px;"><i class="fa fa-align-left" style="margin: 0;"></i></button>
        <button (click)="makeAlignCenter($event);" class="button-editor" style="width:35px;"><i class="fa fa-align-center" style="margin: 0;"></i></button>
        <button (click)="makeAlignRight($event);" class="button-editor" style="width:35px;"><i class="fa fa-align-right" style="margin: 0;"></i></button>

        <button (click)="makeInsertPicture($event);" class="button-editor" style="width:35px;margin-left:10px;"><i class="fa fa-file-image-o" style="margin: 0;"></i></button>


      </div>
      <div contenteditable="true" [id]="id" (focus)="focusFunction()" class="editor-body" style="width:100%;height:auto;min-height:200px;">

      </div>
    </div>

    <div *ngIf="showInsertPicture" (click)="$event.stopPropagation();" style="position:fixed;left:0%;top:0%;background:rgba(0,0,0,0.4);width:100%;height:100%;z-index:1000000;margin:0;">
      <div style="position:relative;margin-left:auto;margin-right:auto;top:5%;background:white;border:solid 1px gray;color:black;width:90%;max-width:400px;height:auto;padding:10px;">
        <p style="width:100%;text-align:center;">Gib entweder einen Link ein oder wähle ein Bild aus der Datenbank aus</p>
        <hr class="hrForAdministration">

        <label [hidden]="tempPictureId != -1" style="width:100%;text-align:center;">Link</label>
        <br [hidden]="tempPictureId != -1">
        <input [hidden]="tempPictureId != -1" [(ngModel)]="tempPictureLink" type="text" placeholder="Link" style="width:100%;"/>
        <br [hidden]="tempPictureId != -1">

        <hr [hidden]="tempPictureLink.length != 0 || tempPictureId != -1" class="hrForAdministration">

        <label [hidden]="tempPictureLink.length != 0" style="width:100%;text-align:center;">Bild aus der Datenbank</label>
        <br [hidden]="tempPictureLink.length != 0">
        <select [hidden]="tempPictureLink.length != 0" [(ngModel)]="tempPictureId"  style="width:100%;">
          <option value='-1' selected="selected">-- None --</option>
          <option *ngFor="let t_picture of getPictures();" value='{{t_picture.picture_id}}'>-- {{t_picture.picturename}} --</option>
        </select>
        <div [hidden]="tempPictureLink.length != 0" style="text-align:right;">
          <uploadpicture-component (reload)="reload.emit(true);"></uploadpicture-component>
        </div>

        <hr [hidden]="tempPictureLink.length == 0 && tempPictureId == -1" class="hrForAdministration">

        <div *ngIf="tempPictureLink.length != 0 || tempPictureId != -1">
          <label  style="width:100%;text-align:center;">Breite [in Pixeln]<span style="color:#e9266d">*</span></label>
          <br>
          <input [(ngModel)]="tempPictureWidth" type="text" placeholder="Breite [in Pixeln]" style="width:100%;"/>
          <br/>
          <label  style="width:100%;text-align:center;">Höhe [in Pixeln]<span style="color:#e9266d">*</span></label>
          <br>
          <input [(ngModel)]="tempPictureHeight" type="text" placeholder="Höhe [in Pixeln]" style="width:100%;"/>
        </div>

        <button (click)="abortInsertPicture();" class="button" style="width: calc(35% - 10px);margin-top: 10px;">Abbrechen</button>
        <button (click)="finalizeInsertPicture();" [hidden]="(tempPictureLink.length == 0 && tempPictureId == -1) || tempPictureWidth.length==0 || tempPictureHeight.length==0" class="button" style="width:60%;margin-left:5%;">Bild jetzt hinzufügen!</button>
      </div>
    </div>


  `
})
export class HTMLEditorComponent implements OnInit, OnChanges {

  /*
  <div *ngIf="showInsertPicture" style="position:fixed;left:0%;top:0%;background:rgba(0,0,0,0.4);width:100%;height:100%;z-index:1000000;">
    <div style="position:absolute;left:5%;top:5%;background:white;border:solid 1px gray;color:black;width:90%;height:90%;">
      <p style="padding:10px;width:100%;text-align:center;">Wähle durch Anklicken die Quests aus</p>

      <div style="height:calc(90% - 80px);margin:10px;padding:10px;overflow-y:scroll;">
        <div *ngFor="let t_quest of chooseablequestarray"
            (click)="toggleChosenQuest(t_quest.quest_id);"
            [style.background]="selectedquestarray.indexOf(t_quest.quest_id) > -1?'rgb(230,230,230)':'rgb(255,255,255)'"
            style="border:1px solid black;margin:2px 10px;cursor:pointer;">
          <p style="margin:0;padding:0.2em;font-size:1em;font-weight:bold;">
            {{!isUndefined(t_quest.questname)? t_quest.questname : (!isUndefined(t_quest.de_DE) ? t_quest.de_DE.questname : '')}}
          </p>
        </div>
      </div>

      <button (click)="finalizeSelection();" class="button" style="width:60%;margin-left:5%;">Beende die Auswahl</button>
      <button (click)="finalizeSelectionAbort();" class="button" style="width:25%;margin-left:5%;">Abbrechen</button>
    </div>
  </div>
  */

  @Input() value:any;
  @Input() pictures:any;

  @Output() htmlcontent = new EventEmitter();
  @Output() reload = new EventEmitter();

  id:any = "";

  hasFocus:any = false;

  showInsertPicture:any = false;
  showInsertLink:any = false;

  tempPictureLink:any = "";
  tempPictureWidth:any = "";
  tempPictureHeight:any = "";

  tempPictureId:any = -1;

  pictureInsertID:any;

  constructor(private lService: LibgameService){
    this.id = this.makeid();
  }

  ngOnInit() {
    document.addEventListener('mousedown', () => {
      this.hasFocus = false;
    }, false);

    this.setInnerHTMLOfDiv(this.value);

  }

  setInnerHTMLOfDiv(value:any) {
    if(typeof document.getElementById(this.id) === 'undefined' || document.getElementById(this.id) == null || typeof this.value === 'undefined') {
      setTimeout(() => {this.setInnerHTMLOfDiv(value);}, 10);
      return;
    }

    if( this.value.length != document.getElementById(this.id).innerHTML.length)
      document.getElementById(this.id).innerHTML = value;
  }

  ngOnChanges(changes: {[propKey:string]: SimpleChange}){
    if(typeof changes["value"] !== 'undefined')
      this.setInnerHTMLOfDiv(changes["value"].currentValue);
  }

  updateValue() {
    this.htmlcontent.emit($('#'+this.id).html().trim());
  }

  getPictures() {
    return typeof this.pictures !== 'undefined' ? this.pictures : [];
  }

  //Overlay Insert Picture


  //Overlay Insert Link


  //Editor Functionality
  focusFunction() {
    this.hasFocus = true;
  }

  makeUnderline(e:any) {
    document.execCommand('underline');
    e.preventDefault();
    e.stopPropagation();
    this.hasFocus = true;
    setTimeout(() => {$('#'+this.id).focus()},10);
    return false;
  }

  makeBold(e:any) {
    document.execCommand('bold');
    e.preventDefault();
    e.stopPropagation();
    this.hasFocus = true;
    setTimeout(() => {$('#'+this.id).focus()},10);
  }

  makeItalic(e:any) {
    document.execCommand('italic');
    e.preventDefault();
    e.stopPropagation();
    this.hasFocus = true;
    setTimeout(() => {$('#'+this.id).focus()},10);
  }

  makeLineThrough(e:any) {
    document.execCommand('strikethrough');
    e.preventDefault();
    e.stopPropagation();
    this.hasFocus = true;
    setTimeout(() => {$('#'+this.id).focus()},10);
  }

  makeAlignLeft(e:any) {
    document.execCommand('justifyLeft');
    e.preventDefault();
    e.stopPropagation();
    this.hasFocus = true;
    setTimeout(() => {$('#'+this.id).focus()},10);
  }

  makeAlignRight(e:any) {
    document.execCommand('justifyRight');
    e.preventDefault();
    e.stopPropagation();
    this.hasFocus = true;
    setTimeout(() => {$('#'+this.id).focus()},10);
  }

  makeAlignCenter(e:any) {
    document.execCommand('justifyCenter');
    e.preventDefault();
    e.stopPropagation();
    this.hasFocus = true;
    setTimeout(() => {$('#'+this.id).focus()},10);
  }

  makeInsertPicture(e:any) {
    this.showInsertPicture = true;
    this.pictureInsertID = this.makeid();

    document.execCommand("insertHTML", false, "<img id='"+this.pictureInsertID+"' src='' />");
    e.preventDefault();
    e.stopPropagation();
    this.hasFocus = true;
    setTimeout(() => {$('#'+this.id).focus()},10);
  }

  finalizeInsertPicture() {
    this.showInsertPicture = false;
    if(this.tempPictureLink.length != 0) {
      $('#'+this.id).find('#'+this.pictureInsertID).attr('src',this.tempPictureLink);
      $('#'+this.id).find('#'+this.pictureInsertID).css('width',this.tempPictureWidth+"px");
      $('#'+this.id).find('#'+this.pictureInsertID).css('height',this.tempPictureHeight+"px");
    } else if(this.tempPictureId != -1) {
      $('#'+this.id).find('#'+this.pictureInsertID).attr('src',this.lService.getPictureLink(this.tempPictureId) );
      $('#'+this.id).find('#'+this.pictureInsertID).css('width',this.tempPictureWidth+"px");
      $('#'+this.id).find('#'+this.pictureInsertID).css('height',this.tempPictureHeight+"px");
    }

    this.tempPictureLink = "";
    this.tempPictureId = -1;
    this.tempPictureWidth = "";
    this.tempPictureHeight = "";
  }

  abortInsertPicture() {
    this.showInsertPicture = false;
    $('#'+this.id).find('#'+this.pictureInsertID).remove();
  }


  //Helper
  makeid() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }


}
