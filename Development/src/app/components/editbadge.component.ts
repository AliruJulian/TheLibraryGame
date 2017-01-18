import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, Params } from '@angular/router';
import { LibgameService } from './../services/libgame.service';

declare var $:any;

@Component({
  selector: 'editbadge-component',
  providers: [LibgameService],
  template: `

  <div style="margin:0;padding:0;" (focusout)="updateBadgeData()" (mouseleave)="updateBadgeData()">

    <!-- badgename, Description of badge -->
    <div>
        <div style="float:left;width:100%;">
            <hr class="hrForAdministration">
            <label style="width:100%;text-align:center;padding-left:0.5em;"><span class="stepHelper">1.) </span>Abzeichenname<span style="color:#e9266d">*</span></label>
            <br>
            <input [(ngModel)]="badgedata.de_DE.badgename" type="text" placeholder="Abzeichenname" style="width:100%;"/>
            <hr class="hrForAdministration">
            <label style="width:100%;text-align:center;padding-left:0.5em;"><span class="stepHelper">2.) </span>Beschreibung des Abzeichens<span style="color:#e9266d">*</span></label>
            <br>
            <htmleditor-component [value]="badgedata.de_DE.description_long" [pictures]="getUniversalContentPictures()" (htmlcontent)="badgedata.de_DE.description_long=$event;updateBadgeData();" (reload)="reload.emit(true);"></htmleditor-component>
            <hr class="hrForAdministration">
            <label style="width:100%;text-align:center;padding-left:0.5em;"><span class="stepHelper">3.) </span>Meldung, welche der User bei erfolgreichem Lösen erhält<span style="color:#e9266d">*</span></label>
            <br>
            <htmleditor-component [value]="badgedata.de_DE.solved_description" [pictures]="getUniversalContentPictures()" (htmlcontent)="badgedata.de_DE.solved_description=$event;updateBadgeData();" (reload)="reload.emit(true);"></htmleditor-component>
            <hr class="hrForAdministration">
        </div>
        <div style="clear:both;margin:0;height:0;"></div>
    </div>

    <!-- To solve tasks for badge -->
    <label style="width:100%;text-align:center;padding-left:0.5em;"><span class="stepHelper">4.) </span>Zu lösende Aufgaben, um Abzeichen zu sammeln<span style="color:#e9266d">*</span></label>
    <br>
    <selecttask-component [chooseabletaskarray]="alltasksdata" [selectedtaskarray]="badgedata.json_task_ids" (taskarray)="badgedata.json_task_ids=$event;"></selecttask-component>
    <hr class="hrForAdministration">

    <!-- badge pic -->
    <label style="width:100%;text-align:center;padding-left:0.5em;"><span class="stepHelper">5.) </span>Abzeichenbild<span style="color:#e9266d">*</span></label>
    <br>
    <div >
        <div style="float:left;width:50%;margin-top:10px;">
            <select [(ngModel)]="badgedata.picture_id" style="width:100%;">
                <option *ngFor="let t_picture of getUniversalContentPictures();" value='{{t_picture.picture_id}}'>{{t_picture.picturename}}</option>
            </select>
        </div>
        <div style="float:left;width:50%;text-align:right;">
            <uploadpicture-component (reload)="reload.emit(true);"></uploadpicture-component>
        </div>
        <div style="clear:both;margin:0;height:0;"></div>
        <div [hidden]="badgedata.picture_id==-1" style="text-align:center;">
            <label style="width:100%;text-align:center;">Abzeichen Vorschau</label>
            <br>
            <img style='width:30%;' src='{{lService.getPictureLink(badgedata.picture_id)}}'>
        </div>
    </div>

  </div>

  `
})
export class EditBadgeComponent implements OnInit {

  @Input() user:any;
  @Input() universalcontent:any;
  @Input() badgedata:any;
  @Input() alltasksdata:any;

  @Output() badgedataoutput = new EventEmitter();
  @Output() reload = new EventEmitter();

  constructor(
    private router: Router,
    private lService: LibgameService){}

  ngOnInit() {

    if(typeof this.badgedata.badge_id === 'undefined' || this.badgedata.badge_id == -1) {
      this.badgedata = {
        de_DE: {
          badgename: "",
          description_long: "",
          solved_description: ""
        },
        badge_id: -1,
        is_active: "1",
        json_task_ids: [],
        picture_id: -1
      };
    }

  }

  getUniversalContentPictures() {
    return !$.isEmptyObject(this.universalcontent) && typeof this.universalcontent['_Pictures'] !== 'undefined' ? this.universalcontent['_Pictures'] : [];
  }

  updateBadgeData() {
    if(typeof this.badgedata !== 'undefined')
      this.badgedataoutput.emit(this.badgedata);
  }

}
