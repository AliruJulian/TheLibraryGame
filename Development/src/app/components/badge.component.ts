import { Component, OnInit, OnChanges, SimpleChange, Input, Output, EventEmitter } from '@angular/core';
import { Router, Params } from '@angular/router';
import { LibgameService } from './../services/libgame.service';

declare var $:any;

@Component({
  selector: 'badge-component',
  providers: [LibgameService],
  template: `

  <div class="row">

      <div class="col-xs-12" style="padding:0;">

          <!-- Overview of badge -->
          <div id="cf-ba-overview" class="content-frame">

              <p class="headline">Abzeichen {{getBadgeData().badgename}}</p>

              <div class="depend-on-device-fifty-to-hundred-percentage-width depend-on-device-left-to-none-float" style="padding:0 1em;">
                  <div id="cf-ba-overview-badge-pic" style="width:40%;margin-left:auto;margin-right:auto;">
                      <div style='position:relative;'>
                          <img style='position:relative;top:0;left:0;width:100%;' src='{{lService.getPictureLink(getBadgeData().picture_id)}}'>
                          <div class='fa'
                            [class.fa-check-square]="getUserBadge().completed=='1'"
                            [class.fa-minus-square]="getUserBadge().completed=='0'" style='position:absolute;right:0;margin:0.3em;font-size:2em!important;color:white;'></div>
                      </div>
                  </div>

                  <p id="cf-ba-overview-badge-description" style="text-align:justify;" [innerHTML]="getBadgeData().description_long"></p>
              </div>
              <div class="depend-on-device-fifty-to-hundred-percentage-width depend-on-device-left-to-none-float" style="padding:0 1em;">
                  <div style="text-align:center;margin-top:0.3em;margin-bottom:0.5em;">Benötigte Aufgaben um Abzeichen zu sammeln</div>
                  <div *ngFor="let t_task of getProgressTasks()" class='cf-ba-overview-task' style='overflow:hidden;cursor:pointer;font-weight:bold;font-size:1em;color:rgb(255,255,255);border:0px solid rgb(0,0,0);border-radius:4px;padding:0.2em 0.3em;background:rgb(50,50,50);margin-top:2px;margin-bottom:2px;' (click)="navigateToTask(t_task.task_id)">
                    {{t_task.taskname}} <br />
                    <button class='fa'
                      [class.fa-check-square]="t_task.completed=='1'"
                      [class.fa-minus-square]="t_task.completed=='0'"
                      [style.color]="t_task.completed=='1'?'rgb(0,150,0)':'rgb(150,0,0)'" style='padding:0;font-size:1em;border:0;margin:0;background:transparent;margin-left:5px;float:right;'></button>

                  </div>
              </div>
              <div style="clear:both;"></div>

          </div>


      </div>



  </div>

  `
})
export class BadgeComponent implements OnInit,OnChanges {

  @Input() user:any;
  @Input() universalcontent:any;
  @Input() badge_id:any;

  specificcontent: any = {};
  loading_specificcontent: any = true;


  constructor(
    private router: Router,
    private lService: LibgameService){}

  ngOnInit() {

    //Specific Content
    this.loading_specificcontent = true;
    this.lService.specificcontent$.subscribe((specificcontent:any) => {
      this.specificcontent = specificcontent;
      this.loading_specificcontent = false;
    });
    if(typeof this.badge_id === 'string' && this.badge_id.length != 0)
      this.lService.loadSpecificContent('badge&badge_id='+this.badge_id);

  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for (let propName in changes) {
      let changedProp = changes[propName];
      let from = changedProp.previousValue;
      let to =   changedProp.currentValue;

      if(propName=="badge_id" && from!=to) {
        this.lService.loadSpecificContent('badge&badge_id='+to);
      }
    }
  }

  getBadgeData() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['BADGE_DATA'] !== 'undefined' ? this.specificcontent['BADGE_DATA'] : {
      badgename: "",
      description_long: ""
    };
  }

  getUserBadge() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['USER_BADGE'] !== 'undefined' ? this.specificcontent['USER_BADGE'] : {
      completed: '0'
    };
  }

  getProgressTasks() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['PROGRESS_TASKS'] !== 'undefined' ? this.specificcontent['PROGRESS_TASKS'] : [];
  }

  navigateToQuest(quest_id:any) {
    this.router.navigate(['/l/quest', quest_id]);
  }

  navigateToTask(task_id:any) {
    this.router.navigate(['/l/task', task_id]);
  }

  navigateToBadge(badge_id:any) {
    this.router.navigate(['/l/badge', badge_id]);
  }



}
