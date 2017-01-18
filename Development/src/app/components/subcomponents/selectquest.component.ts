import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, Params } from '@angular/router';

declare var $:any;

@Component({
  selector: 'selectquest-component',
  template: `


    <div *ngIf="shown" style="position:fixed;left:0%;top:0%;background:rgba(0,0,0,0.4);width:100%;height:100%;z-index:1000000;">
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

    <div>
      <div *ngFor="let t_quest_id of selectedquestarray"
          style="border:1px solid black;margin:2px 0px;background:rgb(230,230,230);">
        <p style="margin:0;padding:0.2em;font-size:1em;font-weight:bold;">{{getNameOfQuestFromQuestId(t_quest_id)}}</p>
      </div>
    </div>

    <button class="button" (click)="shown=true;" style="width:initial;">
      Hinzufügen/Entfernen von Vorquests
    </button>

  `
})
export class SelectQuestComponent implements OnInit {

  @Input() chooseablequestarray:any;
  @Input() selectedquestarray:any;

  initialselectedquestarray:any;
  shown:any = false;

  @Output() questarray = new EventEmitter();

  constructor(){}

  ngOnInit() {
    this.initialselectedquestarray = this.selectedquestarray.slice(0);
  }

  toggleChosenQuest(quest_id:any) {
    if(this.selectedquestarray.indexOf(quest_id) > -1) {
      this.selectedquestarray.splice(this.selectedquestarray.indexOf(quest_id), 1);
    } else {
      this.selectedquestarray.push(quest_id);
    }
  }

  finalizeSelection() {
    this.shown = false;
    this.questarray.emit(this.selectedquestarray);
  }

  finalizeSelectionAbort() {
    this.shown = false;
    this.questarray.emit(this.initialselectedquestarray);
  }

  getNameOfQuestFromQuestId(quest_id:any) {
    for(let key in this.chooseablequestarray) {
      if( !this.isUndefined(this.chooseablequestarray[key].de_DE) &&
          !this.isUndefined(this.chooseablequestarray[key].de_DE.questname) &&
          !this.isUndefined(this.chooseablequestarray[key].quest_id) &&
          this.chooseablequestarray[key].quest_id+"" == ""+quest_id)
      return this.chooseablequestarray[key].de_DE.questname;
    }
    return "";
  }

  isUndefined(value:any) {
    return typeof value === 'undefined';
  }


}
