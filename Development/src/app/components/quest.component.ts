import { Component, OnInit, OnChanges, SimpleChange, Input, Output, EventEmitter } from '@angular/core';
import { Router, Params } from '@angular/router';
import { LibgameService } from './../services/libgame.service';

declare var $:any;

@Component({
  selector: 'quest-component',
  providers: [LibgameService],
  template: `

<div class="row">

    <div class="col-xs-12" style="padding:0;">

        <!-- Overview of quest -->
        <div id="cf-qu-overview" class="content-frame">

            <div class="content-quest-frame" style="width: 100%!important;padding: 0!important;margin: 0!important;border-radius: 0;">
                <div style="width:100%;color:rgb(0,0,0);cursor:pointer;">
                    <div class="depend-on-device-left-to-none-float" style="font-size:1.5em;font-weight:bold;text-decoration:underline;">{{'Quest: '+getQuestData()?.questname}}</div>
                    <div class="depend-on-device-right-to-none-float" style="font-size:1.2em;margin-top:0.2em;"><span style="font-size:1.2em;font-weight:bold;">+{{getQuestData()?.score_rule}}</span> Exp.</div>
                    <div style="clear:both;"></div>
                </div>
            </div>

            <div *ngIf="isQuestCompleted()" style="width:100%;padding: 0!important;">
              <p class='headline' style="background:rgb(120,255,120);">
                  Du hast diesen Quest bereits gelöst.
                  <br>
                  Gelöst am: {{lService.getFormatedDate(getUserQuest().ts_quest_completed)}}
              </p>
            </div>



            <div style="padding:1em 1em;width:100%;max-width:30em;margin-left:auto;margin-right:auto;">

                <div style="display:table;border-spacing:0 2px;width:100%;">

                    <div style="display:table-row;width:100%;background:#eeeeee;">
                        <div style="display:table-cell;vertical-align:middle;padding:5px;padding-left:0.5em;">Erfahrung</div>
                        <div style="display:table-cell;vertical-align:middle;padding:5px;text-align:right;">+{{getQuestData()?.score_rule}}
                          <span [hidden]="!isQuestCompleted()" class='fa fa-check-square' style='color:rgb(0,150,0);background:transparent;'></span>
                          <span [hidden]="isQuestCompleted()" class='fa fa-minus-square' style='color:rgb(150,0,0);background:transparent;'></span>
                        </div>
                    </div>

                    <div style="display:table-row;width:100%;">
                        <div style="display:table-cell;vertical-align:middle;padding:5px;padding-left:0.5em;">Dein Fortschritt</div>
                        <div style="display:table-cell;vertical-align:middle;padding:5px;text-align:right;">
                          <span style="color:green;">{{getNumberOfCompletedLevels()}}</span> / {{getProgressTasks().length}}
                        </div>
                    </div>

                    <div style="display:table-row;width:100%;background:#eeeeee;">
                        <div style="display:table-cell;vertical-align:middle;padding:5px;padding-left:0.5em;">Deine gesammelten Exp.</div>
                        <div style="display:table-cell;vertical-align:middle;padding:5px;text-align:right;color:green!important;">
                          +{{isQuestCompleted()?getQuestData()?.score_rule:'0'}}
                        </div>
                    </div>

                    <div style="display:table-row;width:100%;">
                        <div style="display:table-cell;vertical-align:middle;padding:5px;padding-left:0.5em;">Starterquest</div>
                        <div style="display:table-cell;vertical-align:middle;padding:5px;text-align:right;">
                          {{getQuestData().is_starter_quest=='1'?'Yes':'No'}}
                        </div>
                    </div>


                </div>


                <div style="text-align:center;margin-top:0.5em;">Benötigte Vorquests</div>

                  <div [hidden]="getProgressPreQuests().length != 0" id='cf-qu-overview-no-pre-quests' style='font-weight:bold;font-size:1em;color:rgb(0,0,0);margin-bottom:0.3em;margin-top:0.2em;'>Es werden keine Vorquests benötigt</div>

                  <div *ngFor="let t_quest of getProgressPreQuests();" id='cf-qu-overview-pre-quest' style='overflow:hidden;cursor:pointer;font-weight:bold;font-size:1.2em;color:rgb(255,255,255);border:0px solid rgb(0,0,0);border-radius:4px;padding:0.2em 0.3em;background:rgb(50,50,50);' (click)="navigateToQuest(t_quest.quest_id)">
                    {{t_quest.questname}}<br>
                    <button [hidden]="!t_quest.completed" class='fa fa-check-square' style='padding:0;font-size:1em;color:rgb(0,150,0);border:0;margin:0;background:transparent;margin-left:5px;float:right;'></button>
                    <button [hidden]="t_quest.completed" class='fa fa-minus-square' style='padding:0;font-size:1em;color:rgb(150,0,0);border:0;margin:0;background:transparent;margin-left:5px;float:right;'></button>
                  </div>

            </div>
            <div style="clear:both;"></div>

        </div>


        <div [hidden]="getQuestData().is_active=='1'" class="content-frame" >
            <p class='headline' style="background:rgb(255,120,120);">
              Der Quest ist nicht länger aktiv
            </p>
        </div>

        <div [hidden]="getQuestData().is_active!='1'" id="cf-qu-quest-progress" class="content-frame">

            <p class="headline">Dein Fortschritt</p>


            <div *ngFor="let t_tasklevelinfo of getProgressTasksArrayForView(); let i = index;" class="cf-qu-quest-progress-step"style="margin-top:1em;">
                <p class="cf-qu-quest-progress-step-headline" style="text-align:center;width:100%;">Stufe {{i+1}}/{{getProgressTasks().length}}

                  <span class='fa'
                    [class.fa-check-square]="t_tasklevelinfo.completed"
                    [class.fa-minus-square]="!t_tasklevelinfo.completed"
                    [style.color]="t_tasklevelinfo.completed?'rgb(0,150,0)':'rgb(150,0,0)'" style='padding:0;font-size:1em;border:0;margin:0;background:transparent;margin-left:5px;'></span>
                </p>

                <div class="cf-qu-quest-progress-step-tasks" style="padding:0 1.5em;">
                  <div *ngFor="let t_taskarray of getTaskArrayForProgressTasksArrayKey(i); let i_t = in" (click)="navigateToTask(t_taskarray.task_id)" class="content-task-frame" style="width:100%;">
                      <div style="width:100%;color:rgb(0,0,0);cursor:pointer;">
                          <div style="float:left;">Aufgabe: {{t_taskarray.taskname}}</div>
                          <button class='fa fa-check-square'
                          [class.fa-check-square]="t_taskarray.completed"
                          [class.fa-minus-square]="!t_taskarray.completed"
                          [style.color]="t_taskarray.completed?'rgb(20,100,20)!important':'rgb(100,20,20)!important'" style='padding:0;font-size:1.5em!important;border:0;margin:0;background:transparent;margin-left:5px;float:right;'></button>
                          <div style="clear:both;"></div>
                      </div>
                  </div>
                </div>

            </div>

        </div>

    </div>



</div>

  `
})
export class QuestComponent implements OnInit,OnChanges {

  @Input() user:any;
  @Input() universalcontent:any;
  @Input() quest_id:any;

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
    if(typeof this.quest_id === 'string' && this.quest_id.length != 0)
      this.lService.loadSpecificContent('quest&quest_id='+this.quest_id);

  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    let log: string[] = [];
    for (let propName in changes) {
      let changedProp = changes[propName];
      let from = changedProp.previousValue;
      let to =   changedProp.currentValue;

      if(propName=="quest_id" && from!=to) {
        this.lService.loadSpecificContent('quest&quest_id='+to);
      }
    }
  }

  getQuestData() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['QUEST_DATA'] !== 'undefined' ? this.specificcontent['QUEST_DATA']
    : {
      json_quest_task_ids: [],
      score_rule: 0,
      is_starter_quest: "0",
      is_active: "1"
    };
  }

  getProgressPreQuests() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['PROGRESS_PRE_QUESTS'] !== 'undefined' ? this.specificcontent['PROGRESS_PRE_QUESTS'] : [];
  }

  getUserQuest() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['USER_QUEST'] !== 'undefined' ? this.specificcontent['USER_QUEST'] : {completed: "0", ts_quest_completed: ""};
  }

  getProgressTasks() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['PROGRESS_TASKS'] !== 'undefined' ? this.specificcontent['PROGRESS_TASKS'] : [];
  }

  getProgressTasksArrayForView() {
    if($.isEmptyObject(this.specificcontent) || typeof this.specificcontent['PROGRESS_TASKS'] === 'undefined')
      return [];

    let t_returnarray:any = [];
    for(let key in this.specificcontent['PROGRESS_TASKS']) {
      if(typeof this.getProgressTasks()[key] === 'object' && this.getProgressTasks()[key]["completed"] == true) {
        t_returnarray.push(this.getProgressTasks()[key]);
      } else if(typeof this.getProgressTasks()[key] === 'object') {
        t_returnarray.push(this.getProgressTasks()[key]);
        return t_returnarray;
      }
    }
    return t_returnarray;
  }

  getTaskArrayForProgressTasksArrayKey(taskarraykey:any) {
    let t_taskarray:any = [];
    for(let key in this.getProgressTasks()[taskarraykey]) {
      if(typeof this.getProgressTasks()[key] === 'object') {
        t_taskarray.push(this.getProgressTasks()[taskarraykey][key]);
      }
    }
    return t_taskarray;
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

  isQuestCompleted() {
    return typeof this.getUserQuest().completed !== 'undefined' && this.getUserQuest().completed == "1";
  }

  getNumberOfCompletedLevels() {
    let t_completedlevels = 0;
    for(let key in this.getProgressTasks()) {
      if(typeof this.getProgressTasks()[key] === 'object') {
        if(this.getProgressTasks()[key]["completed"]==true) {
          t_completedlevels++;
        } else {
          return t_completedlevels;
        }
      }
    }
    return t_completedlevels;
  }


}
