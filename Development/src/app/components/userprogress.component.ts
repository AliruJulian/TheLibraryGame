import { Component, OnInit, Input, Output } from '@angular/core';
import { Router, Params } from '@angular/router';
import { LibgameService } from './../services/libgame.service';

declare var $:any;

@Component({
  selector: 'userprogress-component',
  providers: [LibgameService],
  template: `

  <div class="row">

      <div class="col-xs-12 col-sm-3" style="padding:0;">

          <div id="cf-ho-overview" class="content-frame">

              <p class="headline"><span class="special-font-color">{{user?.username}}</span></p>

              <div class="depend-on-device-table-to-none" style="width:100%;">

                  <div class="depend-on-device-tablerow-to-none" style="vertical-align:top;width:100%;color:rgb(255,255,255);">

                      <div id="cf-ho-overview-stats-experience" class="depend-on-device-tablecell-to-none" style="width:100%;vertical-align:middle;">
                          <p class="depend-on-device-none-to-left-float depend-on-device-none-to-49-percentage-width" style="font-size:1.3em;font-weight:bold;text-align:center;margin-top:0.5em;">Erfahrung</p>
                          <p class="depend-on-device-none-to-left-float depend-on-device-none-to-49-percentage-width" style="font-size:1em;text-align:center;"><span style="font-size:1.6em!important;font-weight:bold;color:#0e9873;">{{user?.user_score}}</span></p>
                          <div style="clear:both;"></div>
                      </div>

                  </div>


              </div>



          </div>

      </div>


      <div class="col-xs-12 col-sm-9 padding-left-10px-sm-md-lg" style="padding:0;">


          <!-- Quests -->
          <div id="cf-ac-quests" class="content-frame">

              <p class="headline">Abgeschlossene Quests</p>

              <p [hidden]="getCompletedQuests().length!=0" style='width:100%;text-align:center;margin-top:1em;margin-bottom:1em;'>Keine abgeschlossenen Quests vorhanden</p>

              <div *ngFor="let t_c_quest of getCompletedQuests();" (click)="navigateToQuest(t_c_quest.quest_id)" class="content-quest-frame" style="width:100%;">
                  <div style="width:100%;color:rgb(0,0,0);cursor:pointer;">
                      <div class="depend-on-device-left-to-none-float" style="font-size:1.5em;font-weight:bold;text-decoration:underline;">Quest: {{t_c_quest.questname}}</div>
                      <div class="depend-on-device-right-to-none-float" style="font-size:1.2em;margin-top:0.2em;"><span style="font-size:1.2em;font-weight:bold;">+{{t_c_quest.score_rule}}</span> Exp.</div>
                      <div style="clear:both;"></div>
                      <div style="font-size:1.2em;font-weight:bold;text-align:center;margin-top:0.3em;margin-bottom:0.2em;">Abgeschlossen</div>
                  </div>
              </div>


          </div>

      </div>

  </div>

  <div class="row">

      <div class="col-xs-12" style="padding:0;">


          <!-- Badges -->
          <div id="cf-ac-badges" class="content-frame">

              <p class="headline">Abzeichen</p>

              <div style="display:block;width: 100%;">


                  <div *ngFor="let t_badge of getBadgesWithProgressStatement();" (click)="navigateToBadge(t_badge.badge_id)" class='col-xs-6 col-sm-1' style='display:inline-block;padding:1em;'>
                      <div style='position:relative;cursor:pointer;'>
                          <img style='position:relative;top:0;left:0;width:100%;' src='{{lService.getPictureLink(t_badge.picture_id)}}'>
                          <div *ngIf="t_badge.completed" class='fa fa-check-square' style='position:absolute;right:0;margin:0.3em;font-size:2em!important;color:white;'></div>
                          <div *ngIf="!t_badge.completed" class='fa fa-minus-square' style='position:absolute;right:0;margin:0.3em;font-size:2em!important;color:white;'></div>
                      </div>
                  </div>

                  <div style="clear:both;"></div>


              </div>

          </div>



          <!-- Tasks -->
          <div id="cf-ac-tasks" class="content-frame">

              <p class="headline">Abgeschlossene Aufgaben</p>


              <div *ngFor="let t_task_type of getUserTaskInfoArray(); let i = index;" class="content-inner-frame" style="width:100%;">
                  <!-- Description of Task_Type -->
                  <div class="cf-ac-tasks-task-type-button"
                    (click)="open_tasks_type_key==i?open_tasks_type_key=-1:open_tasks_type_key=i;"
                    [class.separator]="open_tasks_type_key==i"
                    style="width:100%;color:rgb(255,255,255);cursor:pointer;padding:0.5em 0;">
                      <div class="depend-on-device-left-to-none-float" style="font-size:1.5em;text-decoration:underline;">
                        {{t_task_type.task_type_name}}
                      </div>
                      <div class="depend-on-device-right-to-none-float" style="font-size:1.2em;margin-top:0.2em;"><span style="font-size:1.2em;font-weight:bold;">
                        +[{{getMinScoreForTaskInUserTaskInfo(i)}} - {{getMaxScoreForTaskInUserTaskInfo(i)}}]</span> Exp. pro Aufgabe ({{t_task_type["tasks"].length}} Aufgaben)
                      </div>
                      <div style="clear:both;"></div>
                  </div>

                  <!-- Tasks -->
                  <div *ngIf="t_task_type['tasks'].length==0 && open_tasks_type_key==i" class='cf-ac-tasks-no-tasks' style='width:100%;text-align:center;font-size:1.3em;font-weight:bold;color:black;margin-top:5px;margin-bottom:10px;'>Keine Aufgaben vorhanden</div>

                  <div *ngIf="t_task_type['tasks'].length!=0 && open_tasks_type_key==i" class='cf-ac-tasks-tasks depend-on-device-table-to-none' style='width:100%;border-spacing:10px 15px;margin-top:5px;'>
                    <div *ngFor="let t_task of t_task_type['tasks']"  class='cf-ac-tasks-task depend-on-device-tablerow-to-none' style='width:100%;padding:0.8em 0;'>

                          <div class='col-xs-9' style='text-align:left;vertical-align:middle;line-height:1.1em !important;'>
                              <span class="link" (click)="navigateToTask(t_task.task_id)" style="font-size:1.3em;font-weight:bold;">{{t_task.taskname}}</span>
                          </div>

                          <div class='col-xs-1' style='text-align:center;vertical-align:middle;'>
                              <button *ngIf="isTaskSolved(t_task.value,t_task.needed_value)" class='fa fa-check-square' style='padding:0;font-size:2em;color:rgb(0,150,0);border:0;margin:0;background:transparent;'></button>
                              <button *ngIf="!isTaskSolved(t_task.value,t_task.needed_value)" class='fa fa-minus-square' style='padding:0;font-size:2em;color:rgb(150,0,0);border:0;margin:0;background:transparent;'></button>
                          </div>

                          <div class='col-xs-1' style='text-align:center;vertical-align:middle;'>
                              <span style="color:rgb(0,0,0);"><span style="font-size:1.3em;font-weight:bold;">{{t_task.value}}</span>/{{t_task.needed_value}}</span>
                          </div>

                          <div style="clear:both;"></div>
                      </div>
                    </div>

              </div>

          </div>

      </div>


  </div>

  `
})
export class UserprogressComponent implements OnInit {

  @Input() user:any;
  @Input() universalcontent:any;

  specificcontent: any = {};
  loading_specificcontent: any = true;

  open_tasks_type_key:any = -1;

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
    this.lService.loadSpecificContent('userprogress');

  }

  getCompletedQuests() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['COMPLETED_QUESTS'] !== 'undefined' ? this.specificcontent['COMPLETED_QUESTS'] : [];
  }

  getBadgesWithProgressStatement() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['ALL_BADGES_WITH_COMPLETED_STATEMENT'] !== 'undefined' ? this.specificcontent['ALL_BADGES_WITH_COMPLETED_STATEMENT'] : [];
  }

  getUserTaskInfoArray() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['USER_TASK_INFO'] !== 'undefined' ? this.specificcontent['USER_TASK_INFO'] : [];
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



  //User_Task_Info
  isTaskSolved(value:any, needed_value:any) {
    return parseFloat(value) >= parseFloat(needed_value);
  }

  getMinScoreForTaskInUserTaskInfo(key:any) {
    let t_minscore = 1000000;
    if(this.getUserTaskInfoArray()[key]["tasks"].length == 0)
      return 0;
    for(let t_task_key in this.getUserTaskInfoArray()[key]["tasks"]) {
      if(parseFloat(this.getUserTaskInfoArray()[key]["tasks"][t_task_key]["score_rule"]) < t_minscore) {
        t_minscore = parseFloat(this.getUserTaskInfoArray()[key]["tasks"][t_task_key]["score_rule"]);
      }
    }

    return t_minscore;
  }

  getMaxScoreForTaskInUserTaskInfo(key:any) {
    let t_maxscore = 0;
    if(this.getUserTaskInfoArray()[key]["tasks"].length == 0)
      return 0;
    for(let t_task_key in this.getUserTaskInfoArray()[key]["tasks"]) {
      if(parseFloat(this.getUserTaskInfoArray()[key]["tasks"][t_task_key]["score_rule"]) > t_maxscore) {
        t_maxscore = parseFloat(this.getUserTaskInfoArray()[key]["tasks"][t_task_key]["score_rule"]);
      }
    }

    return t_maxscore;
  }





}
