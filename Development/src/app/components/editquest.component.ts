import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, Params } from '@angular/router';
import { LibgameService } from './../services/libgame.service';

declare var $:any;

@Component({
  selector: 'editquest-component',
  providers: [LibgameService],
  template: `

      <div style="margin:0;padding:0;" (focusout)="updateQuestData()" (mouseleave)="updateQuestData()">

            <!-- questname -->
            <hr class="hrForAdministration">
            <label style="width:100%;text-align:center;padding-left:0.5em;"><span class="stepHelper">1.) </span>Questname<span style="color:#e9266d">*</span></label>
            <br>
            <input [(ngModel)]="questdata.de_DE.questname" type="text"  placeholder="Questname" style="width:100%;">
            <hr class="hrForAdministration">

            <!-- solved_description -->
            <label id="label-quest-solved-description" style="width:100%;text-align:center;padding-left:0.5em;"><span class="stepHelper">2.) </span>Meldung, welche der User bei erfolgreichem Lösen erhält<span style="color:#e9266d">*</span></label>
            <br>
            <htmleditor-component [value]="questdata.de_DE.solved_description" [pictures]="getUniversalContentPictures()" (htmlcontent)="questdata.de_DE.solved_description=$event;updateQuestData();" (reload)="reload.emit(true);"></htmleditor-component>
            <hr class="hrForAdministration">

            <!-- Location of quest -->
            <label style="width:100%;text-align:center;padding-left:0.5em;"><span class="stepHelper">3.) </span>Fundort des Quests</label>
            <br>
            <select [(ngModel)]="questdata.location_id" style="width:100%;">
                <option value='-1' selected="selected">--None--</option>
                <option *ngFor="let t_location of locationsdata;" value='{{t_location.location_id}}'>-- {{t_location.locationname}} --</option>
            </select>
            <hr class="hrForAdministration">

            <!-- pre quests -->
            <label style="width:100%;text-align:center;padding-left:0.5em;"><span class="stepHelper">4.) </span>Vorquests, um Quest zu erhalten und lösen zu können</label>
            <br>
            <selectquest-component [chooseablequestarray]="allquestsdata" [selectedquestarray]="questdata.json_pre_quest_ids" (questarray)="questdata.json_pre_quest_ids=$event;updateQuestData();"></selectquest-component>
            <hr class="hrForAdministration">

            <!-- levels with to solve tasks -->
            <div >
                <label style="width:100%;text-align:center;padding-left:0.5em;"><span class="stepHelper">5.) </span>Anzahl der Aufgabenstufen und Aufgaben für jede Stufe<span style="color:#e9266d">*</span></label>
                <br>
                <select [(ngModel)]="LevelsLength" (change)="changeQuestTaskLevelLength($event)" style="width:100%;">
                    <option value="1">1 Level</option>
                    <option value="2">2 Levels</option>
                    <option value="3">3 Levels</option>
                    <option value="4">4 Levels</option>
                    <option value="5">5 Levels</option>
                    <option value="6">6 Levels</option>
                    <option value="7">7 Levels</option>
                    <option value="8">8 Levels</option>
                    <option value="9">9 Levels</option>
                    <option value="10">10 Levels</option>
                </select>
                <div>

                    <div *ngFor="let t_level of questdata.json_quest_task_ids;let i = index;" class="add-quest-tasks-level-1" style="width:calc(100% - 10px);border:1px solid rgb(200,200,200);margin-left:10px;margin-bottom:5px;padding:3px;">
                        <label style="width:100%;text-align:center;padding-left:0.5em;"><span class="stepHelper">{{i+1}}.) </span>Aufgaben für Stufe {{i+1}}</label>
                        <selecttask-component [chooseabletaskarray]="alltasksdata" [selectedtaskarray]="questdata.json_quest_task_ids[i]" (taskarray)="questdata.json_quest_task_ids[i]=$event;updateQuestData();"></selecttask-component>
                    </div>

                </div>
            </div>
            <hr class="hrForAdministration">

            <!-- score rule -->
            <label style="width:100%;text-align:center;padding-left:0.5em;"><span class="stepHelper">6.) </span>Exp. für User bei Abschluss des Quests<span style="color:#e9266d">*</span></label>
            <br>
            <input [(ngModel)]="questdata.score_rule" type="text" style="width:100%;padding-left:0.3em;">
            <hr class="hrForAdministration">

            <!-- is starter quest? -->
            <label style="width:100%;text-align:center;padding-left:0.5em;"><span class="stepHelper">7.) </span>Ist der Quest schon bei Spielbeginn dem User bekannt</label>
            <br>
            <input [checked]="questdata.is_starter_quest=='1'" (click)="questdata.is_starter_quest=='1'?questdata.is_starter_quest='0':questdata.is_starter_quest='1';" type="checkbox" style="width:25px;margin-left:48%;" />

        </div>

  `
})
export class EditQuestComponent implements OnInit {

  @Input() user:any;
  @Input() universalcontent:any;
  @Input() questdata:any;
  @Input() allquestsdata:any;
  @Input() alltasksdata:any;
  @Input() locationsdata:any;

  @Output() questdataoutput = new EventEmitter();
  @Output() reload = new EventEmitter();

  LevelsLength:any = 1;

  constructor(
    private router: Router,
    private lService: LibgameService){}

  ngOnInit() {

    if(typeof this.questdata.quest_id === 'undefined' || this.questdata.quest_id == -1) {
      this.questdata = {
        quest_id: -1,
        de_DE: {
          questname: "",
          solved_description: ""
        },
        is_active: "1",
        json_pre_quest_ids: [],
        json_quest_task_ids: [[]],
        location_id: -1,
        is_starter_quest: "0",
        score_rule: "10"
      };

    }

    if(this.questdata.location_id == null) {
      this.questdata.location_id = -1;
    }

    this.LevelsLength = this.questdata.json_quest_task_ids.length;

  }

  getUniversalContentPictures() {
    return !$.isEmptyObject(this.universalcontent) && typeof this.universalcontent['_Pictures'] !== 'undefined' ? this.universalcontent['_Pictures'] : [];
  }

  changeQuestTaskLevelLength(event:any) {

    let t_value = parseInt(event.target.value);
    let t_diff = t_value - this.questdata.json_quest_task_ids.length;

    if(this.questdata.json_quest_task_ids.length > t_value) {

      for(let i=this.questdata.json_quest_task_ids.length; i > 0; i-- ) {
        if((i-1) >= t_value) {
          this.questdata.json_quest_task_ids.splice(i-1, 1);
        }
      }

    } else if(this.questdata.json_quest_task_ids.length < t_value) {
      for(let i=0; i < t_diff; i++ ) {
        this.questdata.json_quest_task_ids.push([]);
      }
    }

  }

  updateQuestData() {
    if(typeof this.questdata !== 'undefined')
      this.questdataoutput.emit(this.questdata);
  }

}
