import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, Params } from '@angular/router';
import { LibgameService } from './../services/libgame.service';

declare var $:any;

@Component({
  selector: 'tasks-component',
  providers: [LibgameService],
  template: `

  <div class="row">

    <div class="col-xs-12 col-sm-3" style="padding:0;">

        <div id="cf-ho-overview" class="content-frame">

            <p class="headline"><span class="special-font-color">{{user?.username}}</span></p>

            <div class="depend-on-device-table-to-none" style="width:100%;">

                <div style="vertical-align:top;width:100%;color:rgb(255,255,255);">

                    <div id="cf-ho-overview-stats-experience" class="depend-on-device-tablecell-to-none" style="width:100%;vertical-align:middle;">
                        <p style="font-size:1.3em;font-weight:bold;text-align:center;margin-top:0.5em;">Erfahrung</p>
                        <p style="font-size:1em;text-align:center;"><span style="font-size:1.6em!important;font-weight:bold;color:#0e9873;">{{user?.user_score}}</span></p>
                        <div style="clear:both;"></div>
                    </div>

                </div>


            </div>



        </div>

    </div>

    <div class="col-xs-12 col-sm-9 padding-left-10px-sm-md-lg" style="padding:0;">

        <!-- What can I do here -->
        <div id="cf-ta-introduction" class="content-frame">

            <p class="headline headline-as-button" (click)="clickHome1Button();" style="height:auto;padding-top:0px!important;"><button class="button">Was kann ich hier machen?</button></p>

            <div id="cf-ta-introduction-content" style='display:none;width:100%;border-spacing:3px 10px;'>

                <div style='line-height:1.4em;text-align:justify;width:100%;vertical-align:top;color:rgb(0,0,0);padding:1em 0;'>
                    {{getUniversalContentHome1Description()}}
                </div>


            </div>

        </div>

    </div>



  </div>


  <div class="row">

    <div class="col-xs-12" style="padding:0;">

        <!-- Overview of tasks -->
        <div id="cf-ta-overview" class="content-frame">

            <p class="headline">Deine nächsten Ziele</p>

            <p *ngIf="!tasksAvailable()" class='content-none-placeholder' style='width:100%;text-align:center;margin-top:1em;margin-bottom:1em;background: yellow;padding:0.5em 0;'>Keine weiteren Aufgaben vorhanden</p>

            <!-- ACTIVE TASKS -->

            <div *ngFor="let t_task of getActiveTasks();" (click)="navigateToTask(t_task.task_id)" class="content-task-frame" style="width:100%;">
                <div style="width:100%;color:rgb(0,0,0);cursor:pointer;">
                    <div class="depend-on-device-left-to-none-float" style="font-size:1.5em;font-weight:bold;text-decoration:underline;">Aufgabe: {{t_task.taskname}}</div>
                    <div class="depend-on-device-right-to-none-float" style="font-size:1.2em;margin-top:0.2em;"><span style="font-size:1.2em;font-weight:bold;">+{{t_task.score_rule}}</span> Exp.</div>
                    <div style="clear:both;"></div>
                    <div style="font-size:1em;text-align:justify;margin-top:1em;">{{t_task.description_long}}</div>
                </div>
            </div>

            <!-- Quests -->
            <div *ngFor="let t_quest of getActiveQuests()" (click)="navigateToQuest(t_quest.quest_id)" class="content-quest-frame" style="width:100%;">
                <div style="width:100%;color:rgb(0,0,0);cursor:pointer;">
                    <div class="depend-on-device-left-to-none-float" style="font-size:1.5em;font-weight:bold;text-decoration:underline;">{{'Quest: '+t_quest.questname}}</div>
                    <div class="depend-on-device-right-to-none-float" style="font-size:1.2em;margin-top:0.2em;"><span style="font-size:1.2em;font-weight:bold;">+{{t_quest.score_rule}}</span> Exp.</div>
                    <div style="clear:both;"></div>

                    <div *ngFor="let t_quest_step of t_quest.json_quest_task_ids; let i = index;" [hidden]="hasQuestStepAnUncompletedPrestep(t_quest.json_quest_task_ids, i)">
                      <div style='font-size:1.2em;font-weight:bold;text-align:center;margin-top:0.3em;margin-bottom:0.2em;'>Stufe {{i+1}} von {{t_quest.json_quest_task_ids.length}}</div>

                      <div *ngFor="let t_quest_step_task of t_quest_step; let i_tasks = index;">
                        <div style='cursor:pointer;font-weight:bold;font-size:1em;color:rgb(255,255,255);border:0px solid rgb(0,0,0);border-radius:4px;padding:0.2em 0.3em;background:rgb(50,50,50);margin-bottom:2px;' >
                          {{t_quest_step_task.taskname}}
                          <button
                            [class.fa-check-square]="t_quest_step_task.completed"
                            [style.color]="t_quest_step_task.completed ?'rgb(0,150,0)':'rgb(150,0,0)'"
                            [class.fa-minus-square]="!t_quest_step_task.completed"
                            class='fa' style='padding:0;font-size:1em;border:0;margin:0;background:transparent;margin-left:5px;float:right;'></button>

                        </div>
                      </div>


                    </div>
                </div>
            </div>








        </div>


    </div>



  </div>


  `
})
export class TasksComponent implements OnInit {

  @Input() user:any;
  @Input() universalcontent:any;

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
    this.lService.loadSpecificContent('tasks');

  }


  getUniversalContentHome1Description() {
    if(!$.isEmptyObject(this.universalcontent) && typeof this.universalcontent["_Content"] !== 'undefined' && this.universalcontent["_Content"].filter((x:any) => {return x.content_mapper == 'HOME_1';}).length != 0) {
      return this.universalcontent["_Content"].filter((x:any) => {return x.content_mapper == 'HOME_1';})[0]["text"];
    }
    return '';
  }

  tasksAvailable() {
    if( $.isEmptyObject(this.specificcontent) ||
        typeof this.specificcontent['Active_Tasks'] === 'undefined' ||
        typeof this.specificcontent['Active_Quests'] === 'undefined')
      return false;

    if( this.specificcontent['Active_Tasks'].length == 0 &&
        this.specificcontent['Active_Quests'].length == 0)
      return false;

    return true;
  }

  getActiveQuests() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Active_Quests'] !== 'undefined' ? this.specificcontent['Active_Quests'] : [];
  }

  getActiveTasks() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Active_Tasks'] !== 'undefined' ? this.specificcontent['Active_Tasks'] : [];
  }

  isStepCompleted(tasks:any) {
    for(let key in tasks) {
      if(typeof tasks[key].completed === 'undefined' || tasks[key].completed == false)
        return false;
    }
    return true;
  }

  hasQuestStepAnUncompletedPrestep(queststeps:any, step:any) {
    return parseInt(step)==0 ? false : !this.isStepCompleted(queststeps[parseInt(step)-1]);
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

  clickHome1Button() {
    $('#cf-ta-introduction-content').fadeToggle(0);
  }



}
