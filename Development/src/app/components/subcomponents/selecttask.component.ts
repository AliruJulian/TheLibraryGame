import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, Params } from '@angular/router';

declare var $:any;

@Component({
  selector: 'selecttask-component',
  template: `


  <div *ngIf="shown" style="position:fixed;left:0%;top:0%;background:rgba(0,0,0,0.4);width:100%;height:100%;z-index:1000000;">
    <div style="position:absolute;left:5%;top:5%;background:white;border:solid 1px gray;color:black;width:90%;height:90%;">
      <p style="padding:10px;width:100%;text-align:center;">Wähle durch Anklicken die Aufgaben aus</p>

      <div style="height:calc(90% - 80px);margin:10px;padding:10px;overflow-y:scroll;">
        <div *ngFor="let t_task of chooseabletaskarray"
            (click)="toggleChosenTask(t_task.task_id);"
            [style.background]="selectedtaskarray.indexOf(t_task.task_id) > -1?'rgb(230,230,230)':'rgb(255,255,255)'"
            style="border:1px solid black;margin:2px 10px;cursor:pointer;">
          <p style="margin:0;padding:0.2em;font-size:1em;font-weight:bold;">{{!isUndefined(t_task.taskname)? t_task.taskname : (!isUndefined(t_task.de_DE) ? t_task.de_DE.taskname : '')}}</p>
        </div>
      </div>

      <button (click)="finalizeSelection();" class="button" style="width:60%;margin-left:5%;">Beende die Auswahl</button>
      <button (click)="finalizeSelectionAbort();" class="button" style="width:25%;margin-left:5%;">Abbrechen</button>
    </div>
  </div>

  <div>
    <div *ngFor="let t_task_id of selectedtaskarray"
        style="border:1px solid black;margin:2px 0px;background:rgb(230,230,230);">
      <p style="margin:0;padding:0.2em;font-size:1em;font-weight:bold;">{{getNameOfTaskFromTaskId(t_task_id)}}</p>
    </div>
  </div>

  <button class="button" (click)="shown=true;" style="width:initial;">
    Hinzufügen/Entfernen von Aufgaben
  </button>


  `
})
export class SelectTaskComponent implements OnInit {

  @Input() chooseabletaskarray:any;
  @Input() selectedtaskarray:any;

  shown:any = false;
  initialselectedtaskarray:any;

  @Output() taskarray = new EventEmitter();

  constructor(){}

  ngOnInit() {
    this.initialselectedtaskarray = this.selectedtaskarray.slice(0);
  }

  toggleChosenTask(task_id:any) {
    if(this.selectedtaskarray.indexOf(task_id) > -1) {
      this.selectedtaskarray.splice(this.selectedtaskarray.indexOf(task_id), 1);
    } else {
      this.selectedtaskarray.push(task_id);
    }
  }

  finalizeSelection() {
    this.shown = false;
    this.taskarray.emit(this.selectedtaskarray);
  }

  finalizeSelectionAbort() {
    this.shown = false;
    this.taskarray.emit(this.initialselectedtaskarray);
  }

  getNameOfTaskFromTaskId(task_id:any) {
    for(let key in this.chooseabletaskarray) {
      if( !this.isUndefined(this.chooseabletaskarray[key].de_DE) &&
          !this.isUndefined(this.chooseabletaskarray[key].de_DE.taskname) &&
          !this.isUndefined(this.chooseabletaskarray[key].task_id) &&
          this.chooseabletaskarray[key].task_id+"" == ""+task_id)
      return this.chooseabletaskarray[key].de_DE.taskname;
    }
    return "";
  }

  isUndefined(value:any) {
    return typeof value === 'undefined';
  }

}
