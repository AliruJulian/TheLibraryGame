import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, Params } from '@angular/router';
import { LibgameService } from './../services/libgame.service';

declare var $:any;

@Component({
  selector: 'edittask-component',
  providers: [LibgameService],
  template: `

    <div style="margin:0;padding:0;" (focusout)="updateTaskData()" (mouseleave)="updateTaskData()">

      <!-- taskname, Description of task -->
      <div>
          <div  style="float:left;width:100%;">
              <hr class="hrForAdministration">
              <label  style="width:100%;text-align:center;padding-left:0.5em;"><span class="stepHelper">1.) </span>Name der Aufgabe<span style="color:#e9266d">*</span></label>
              <br>
              <input [(ngModel)]="taskdata.de_DE.taskname" type="text" name="task-name" placeholder="Name der Aufgabe" style="width:100%;"/>
              <hr class="hrForAdministration">
              <label style="width:100%;text-align:center;padding-left:0.5em;"><span class="stepHelper">2.) </span>Beschreibung der Aufgabe<span style="color:#e9266d">*</span></label>
              <br>
              <htmleditor-component [value]="taskdata.de_DE.description_long" [pictures]="getUniversalContentPictures()" (htmlcontent)="taskdata.de_DE.description_long=$event;updateTaskData();" (reload)="reload.emit(true);"></htmleditor-component>
              <hr class="hrForAdministration">
              <label  style="width:100%;text-align:center;padding-left:0.5em;"><span class="stepHelper">3.) </span>Meldung, welche der User bei erfolgreichem Lösen erhält<span style="color:#e9266d">*</span></label>
              <br>
              <htmleditor-component [value]="taskdata.de_DE.solved_description" [pictures]="getUniversalContentPictures()" (htmlcontent)="taskdata.de_DE.solved_description=$event;updateTaskData();" (reload)="reload.emit(true);"></htmleditor-component>
              <hr class="hrForAdministration">
          </div>
          <div style="clear:both;margin:0;height:0;"></div>
      </div>

      <!-- Location of task -->
      <label style="width:100%;text-align:center;padding-left:0.5em;"><span class="stepHelper">4.) </span>Fundort der Aufgabe</label>
      <br>
      <select [(ngModel)]="taskdata.location_id"  style="width:100%;">
        <option value='-1' selected="selected">--None--</option>
        <option *ngFor="let t_location of locationsdata;" value='{{t_location.location_id}}'>-- {{t_location.locationname}} --</option>
      </select>
      <hr class="hrForAdministration">

      <!-- score_rule -->
      <label style="width:100%;text-align:center;padding-left:0.5em;"><span class="stepHelper">5.) </span>Exp., welche vom User gesammelt werden kann<span style="color:#e9266d">*</span></label>
      <br>
      <input [(ngModel)]="taskdata.score_rule" type="text" style="width:100%;padding-left:0.3em;">
      <hr class="hrForAdministration">

      <!-- task type -->
      <label style="width:100%;text-align:center;padding-left:0.5em;"><span class="stepHelper">6.) </span>Wähle den Aufgabentyp (Dieser bestimmt die nun folgenden Eingaben)<span style="color:#e9266d">*</span></label>
      <br>
      <select [(ngModel)]="taskdata.task_type_id" (change)="changeTaskType()" style="width:100%;">
        <option *ngFor="let t_task_type of tasktypesdata;" value='{{t_task_type.task_type_id}}'>-- {{t_task_type.task_type_name}} --</option>
      </select>
      <hr class="hrForAdministration">

      <!-- Specification of task depend on task type -->
      <label style="width:100%;text-align:center;padding-left:0.5em;"><span class="stepHelper">7.) </span>Aufgabenspezifikation [abhängig von dem Aufgabetyp]<span style="color:#e9266d">*</span></label>
      <br>
      <div style="width:100%;">

          <div *ngIf="taskdata.task_type_id==1" style="width:100%;">
              <div style="float:left;width:100%;">
                  <div style="width:100%;">
                      <label style="width:100%;text-align:center;padding-left:2em;"><span class="stepHelper">7.1.) </span>Frage<span style="color:#e9266d">*</span></label>
                      <br>
                      <htmleditor-component [value]="taskdata.json_task_data.de_DE.question" [pictures]="getUniversalContentPictures()" (htmlcontent)="taskdata.json_task_data.de_DE.question=$event;updateTaskData();" (reload)="reload.emit(true);"></htmleditor-component>
                      <label style="width:100%;text-align:center;padding-left:2em;"><span class="stepHelper">7.2.) </span>Richtige Antwort<span style="color:#e9266d">*</span></label>
                      <br>
                      <htmleditor-component [value]="taskdata.json_task_data.de_DE.a1" [pictures]="getUniversalContentPictures()" (htmlcontent)="taskdata.json_task_data.de_DE.a1=$event;updateTaskData();" (reload)="reload.emit(true);"></htmleditor-component>
                      <label style="width:100%;text-align:center;padding-left:2em;"><span class="stepHelper">7.3.) </span>1. Falsche Antwort<span style="color:#e9266d">*</span></label>
                      <br>
                      <htmleditor-component [value]="taskdata.json_task_data.de_DE.a2" [pictures]="getUniversalContentPictures()" (htmlcontent)="taskdata.json_task_data.de_DE.a2=$event;updateTaskData();" (reload)="reload.emit(true);"></htmleditor-component>
                      <label style="width:100%;text-align:center;padding-left:2em;"><span class="stepHelper">7.4.) </span>2. Falsche Antwort<span style="color:#e9266d">*</span></label>
                      <br>
                      <htmleditor-component [value]="taskdata.json_task_data.de_DE.a3" [pictures]="getUniversalContentPictures()" (htmlcontent)="taskdata.json_task_data.de_DE.a3=$event;updateTaskData();" (reload)="reload.emit(true);"></htmleditor-component>
                      <label style="width:100%;text-align:center;padding-left:2em;"><span class="stepHelper">7.5.) </span>3. Falsche Antwort<span style="color:#e9266d">*</span></label>
                      <br>
                      <htmleditor-component [value]="taskdata.json_task_data.de_DE.a4" [pictures]="getUniversalContentPictures()" (htmlcontent)="taskdata.json_task_data.de_DE.a4=$event;updateTaskData();" (reload)="reload.emit(true);"></htmleditor-component>
                  </div>
              </div>
              <div style="clear:both;margin:0;height:0;"></div>
          </div>

          <div *ngIf="taskdata.task_type_id==2" style="width:100%;">
              <label style="width:100%;text-align:center;padding-left:2em;"><span class="stepHelper">7.1.) </span>Ort<span style="color:#e9266d">*</span></label>
              <br>
              <select [(ngModel)]="taskdata.json_task_data.loc" style="width:100%;">
                  <option value='-1' selected="selected">--None--</option>
                  <option *ngFor="let t_location of locationsdata;" value='{{t_location.location_id}}'>-- {{t_location.locationname}} --</option>
              </select>
          </div>

          <div *ngIf="taskdata.task_type_id==3" style="width:100%;">
              <label style="width:100%;text-align:center;padding-left:2em;"><span class="stepHelper">7.1.) </span>ISBN<span style="color:#e9266d">*</span></label>
              <br>
              <input [(ngModel)]="taskdata.json_task_data.isbn" type="text" placeholder="ISBN" style="width:100%;">
          </div>

          <div *ngIf="taskdata.task_type_id==4" style="width:100%;">
              <div style="float:left;width:100%;">
                  <div style="width:100%;">
                      <label style="width:100%;text-align:center;padding-left:2em;"><span class="stepHelper">7.1.) </span>Quelle 1 (grün)<span style="color:#e9266d">*</span></label>
                      <br>
                      <htmleditor-component [value]="taskdata.json_task_data.de_DE.s1" [pictures]="getUniversalContentPictures()" (htmlcontent)="taskdata.json_task_data.de_DE.s1=$event;updateTaskData();" (reload)="reload.emit(true);"></htmleditor-component>
                      <label style="width:100%;text-align:center;padding-left:2em;"><span class="stepHelper">7.2.) </span>Quelle 2 (gelb)<span style="color:#e9266d">*</span></label>
                      <br>
                      <htmleditor-component [value]="taskdata.json_task_data.de_DE.s2" [pictures]="getUniversalContentPictures()" (htmlcontent)="taskdata.json_task_data.de_DE.s2=$event;updateTaskData();" (reload)="reload.emit(true);"></htmleditor-component>
                      <label style="width:100%;text-align:center;padding-left:2em;"><span class="stepHelper">7.3.) </span>Quelle 3 (rot)<span style="color:#e9266d">*</span></label>
                      <br>
                      <htmleditor-component [value]="taskdata.json_task_data.de_DE.s3" [pictures]="getUniversalContentPictures()" (htmlcontent)="taskdata.json_task_data.de_DE.s3=$event;updateTaskData();" (reload)="reload.emit(true);"></htmleditor-component>
                  </div>
              </div>
              <div style="clear:both;margin:0;height:0;"></div>
          </div>

          <div *ngIf="taskdata.task_type_id==5" style="width:100%;">
              <div style="float:left;width:100%;">
                  <div style="width:100%;">
                      <label style="width:100%;text-align:center;padding-left:2em;"><span class="stepHelper">7.1.) </span>Text mit Lücke<span style="color:#e9266d">*</span></label>
                      <br>
                      <input [(ngModel)]="taskdata.json_task_data.de_DE.text" type="text" class="input-add-task-specification-task-type-5-text-with-blank" placeholder="Text mit Lücke" style="width:100%;">
                      <button class="add-task-specification-task-type-5-mail-to-users-button button" (click)="taskdata.json_task_data.de_DE.text=taskdata.json_task_data.de_DE.text+'[::BLANK::]';" style="width:100%;cursor:pointer;text-align:center;padding:0.1em 0;">Klicke hier, um die Lücke einzufügen!</button>
                      <label style="width:100%;text-align:center;padding-left:2em;"><span class="stepHelper">7.2.) </span>Richtige Antwort<span style="color:#e9266d">*</span></label>
                      <br>
                      <input [(ngModel)]="taskdata.json_task_data.de_DE.answer" type="text" class="input-add-task-specification-task-type-5-correct-answer" placeholder="Richtige Antwort" style="width:100%;">
                  </div>
              </div>
              <div style="clear:both;margin:0;height:0;"></div>
          </div>

          <div *ngIf="taskdata.task_type_id==6" style="width:100%;">
              <div style="text-align:center;"><span class="stepHelper">7.1.) </span>Keine benötigt</div>
          </div>
      </div>

    </div>

  `
})
export class EditTaskComponent implements OnInit {

  @Input() user:any;
  @Input() universalcontent:any;
  @Input() taskdata:any;
  @Input() locationsdata:any;
  @Input() tasktypesdata:any;

  @Output() taskdataoutput = new EventEmitter();
  @Output() reload = new EventEmitter();


  constructor(
    private router: Router,
    private lService: LibgameService){}

  ngOnInit() {

    console.log("EditTask Init");

    if(typeof this.taskdata.task_id === 'undefined' || this.taskdata.task_id == -1) {
      this.taskdata = {
        task_id: -1,
        task_type_id: 1,
        json_task_data: {},
        de_DE: {
          taskname: "",
          description_long: "",
          solved_description: ""
        },
        is_task_active: "1",
        score_rule: "10",
        location_id: -1
      };
      this.changeTaskType();
    }

    if(typeof this.taskdata.location_id !== 'undefined' && this.taskdata.location_id == null)
      this.taskdata.location_id = -1;

    console.log(this.taskdata.de_DE);
    console.log(this.taskdata);

  }

  getUniversalContentPictures() {
    return !$.isEmptyObject(this.universalcontent) && typeof this.universalcontent['_Pictures'] !== 'undefined' ? this.universalcontent['_Pictures'] : [];
  }

  changeTaskType() {
    if(this.taskdata.task_type_id == 1) {
      this.taskdata.json_task_data = {de_DE: {a1: "", a2: "", a3: "", a4: "", question: ""}};
    } else if(this.taskdata.task_type_id == 2) {
      this.taskdata.json_task_data = {loc: 1};
    } else if(this.taskdata.task_type_id == 3) {
      this.taskdata.json_task_data = {isbn: ""};
    } else if(this.taskdata.task_type_id == 4) {
      this.taskdata.json_task_data = {de_DE: {s1: "", s2: "", s3: ""}};
    } else if(this.taskdata.task_type_id == 5) {
      this.taskdata.json_task_data = {de_DE: {answer: "", text: ""}};
    } else if(this.taskdata.task_type_id == 6) {
      this.taskdata.json_task_data = {};
    }
  }

  updateTaskData() {
    if(typeof this.taskdata !== 'undefined')
      this.taskdataoutput.emit(this.taskdata);
  }

}
