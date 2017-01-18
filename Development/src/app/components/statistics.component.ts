import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, Params } from '@angular/router';
import { LibgameService } from './../services/libgame.service';

declare var $:any;
declare var Chart:any;
declare var updateChart:any;

@Component({
  selector: 'statistics-component',
  providers: [LibgameService],
  template: `

  <div class="row">

    <div class="col-xs-12 col-sm-7" style="padding:0;">

        <!-- USER Übersicht -->
        <div id="cf-ho-overview" class="content-frame">

            <p class="headline">Dein Fortschritt</p>

            <div class="depend-on-device-table-to-none" style="width:100%;">

                <div class="depend-on-device-tablerow-to-none" style="vertical-align:top;width:100%;color:rgb(255,255,255);">

                    <div id="cf-ho-overview-stats-quests" class="col-xs-6 col-sm-3" style="vertical-align:top;">
                        <p style="font-size:1.3em;font-weight:bold;text-align:center;">Quests</p>
                        <p style="font-size:1em;text-align:center;color: black;">{{user?.completed_quests}}/{{getCountQuests()}}</p>
                        <div style="clear:both;"></div>
                    </div>

                    <div id="cf-ho-overview-stats-badges" class="col-xs-6 col-sm-3" style="vertical-align:top;">
                        <p style="font-size:1.3em;font-weight:bold;text-align:center;">Abzeichen</p>
                        <p style="font-size:1em;text-align:center;color: black;">{{user?.completed_badges}}/{{getCountBadges()}}</p>
                        <div style="clear:both;"></div>
                    </div>

                    <div id="cf-ho-overview-stats-tasks" class="col-xs-6 col-sm-3" style="vertical-align:top;">
                        <p style="font-size:1.3em;font-weight:bold;text-align:center;">Aufgaben</p>
                        <p style="font-size:1em;text-align:center;color: black;">{{user?.completed_tasks}}</p>
                        <div style="clear:both;"></div>
                    </div>

                    <div id="cf-ho-overview-stats-experience" class="col-xs-6 col-sm-3" style="vertical-align:top;">
                        <p style="font-size:1.3em;font-weight:bold;text-align:center;">Erfahrung</p>
                        <p style="font-size:1em;text-align:center;color: black;">{{user?.user_score}}</p>
                        <div style="clear:both;"></div>
                    </div>

                    <div style="clear:both;"></div>

                </div>


            </div>



        </div>

        <!-- Overview departments -->
        <div id="cf-ho-statistic-departments" class="content-frame">

            <p class="headline">Übersicht über die Fakultäten</p>

            <div style="width:100%;">
                <canvas id="canvas_faculties" height="300"></canvas>
            </div>

        </div>

        <!-- USER SCORE -->
        <div id="cf-st-user-score" class="content-frame">

            <p class="headline">Deine Erfahrung im Zeitverlauf</p>

            <div style="width:100%;">
                <div style="display:inline-block;border:2px solid rgb(0,0,0);border-radius:4px;">
                    <div (click)="updateChartUserScore(10,0,0);user_score_period_active='10d';" [class.whiteButtonClass-currentItem]="user_score_period_active=='10d'" [class.whiteButtonClass]="user_score_period_active!='10d'" class="depend-on-device-none-to-33-percentage-width" style="float:left;padding:5px 10px;">10 Tage</div>
                    <div (click)="updateChartUserScore(30,0,0);user_score_period_active='30d';" [class.whiteButtonClass-currentItem]="user_score_period_active=='30d'" [class.whiteButtonClass]="user_score_period_active!='30d'" class="depend-on-device-none-to-33-percentage-width" style="float:left;padding:5px 10px;">30 Tage</div>
                    <div (click)="updateChartUserScore(0,6,0);user_score_period_active='6m';" [class.whiteButtonClass-currentItem]="user_score_period_active=='6m'" [class.whiteButtonClass]="user_score_period_active!='6m'" class="depend-on-device-none-to-33-percentage-width" style="float:left;padding:5px 10px;">6 Monate</div>
                    <div (click)="updateChartUserScore(0,12,0);user_score_period_active='12m';" [class.whiteButtonClass-currentItem]="user_score_period_active=='12m'" [class.whiteButtonClass]="user_score_period_active!='12m'" class="depend-on-device-none-to-33-percentage-width" style="float:left;padding:5px 10px;">12 Monate</div>
                    <div (click)="updateChartUserScore(0,24,0);user_score_period_active='24m';" [class.whiteButtonClass-currentItem]="user_score_period_active=='24m'" [class.whiteButtonClass]="user_score_period_active!='24m'" class="depend-on-device-none-to-33-percentage-width" style="float:left;padding:5px 10px;">24 Monate</div>
                    <div (click)="updateChartUserScore(0,0,5);user_score_period_active='5y';" [class.whiteButtonClass-currentItem]="user_score_period_active=='5y'" [class.whiteButtonClass]="user_score_period_active!='5y'" class="depend-on-device-none-to-33-percentage-width" style="float:left;padding:5px 10px;">5 Jahre</div>
                    <div style="clear:both;"></div>
                </div>
            </div>

            <div style="width:100%;">
                <canvas id="canvas_user_score" height="400"></canvas>
            </div>

        </div>

        <!-- USER COMPLETED TASKS -->
        <div id="cf-st-user-tasks" class="content-frame">

            <p class="headline">Deine gelösten Aufgaben im Zeitverlauf</p>

            <div style="width:100%;">
                <div style="display:inline-block;border:2px solid rgb(0,0,0);border-radius:4px;">
                    <div (click)="updateChartUserTasks(10,0,0);user_task_period_active='10d';" [class.whiteButtonClass-currentItem]="user_task_period_active=='10d'" [class.whiteButtonClass]="user_task_period_active!='10d'" class="depend-on-device-none-to-33-percentage-width" style="float:left;padding:5px 10px;">10 Tage</div>
                    <div (click)="updateChartUserTasks(30,0,0);user_task_period_active='30d';" [class.whiteButtonClass-currentItem]="user_task_period_active=='30d'" [class.whiteButtonClass]="user_task_period_active!='30d'" class="depend-on-device-none-to-33-percentage-width" style="float:left;padding:5px 10px;">30 Tage</div>
                    <div (click)="updateChartUserTasks(0,6,0);user_task_period_active='6m';" [class.whiteButtonClass-currentItem]="user_task_period_active=='6m'" [class.whiteButtonClass]="user_task_period_active!='6m'" class="depend-on-device-none-to-33-percentage-width" style="float:left;padding:5px 10px;">6 Monate</div>
                    <div (click)="updateChartUserTasks(0,12,0);user_task_period_active='12m';" [class.whiteButtonClass-currentItem]="user_task_period_active=='12m'" [class.whiteButtonClass]="user_task_period_active!='12m'" class="depend-on-device-none-to-33-percentage-width" style="float:left;padding:5px 10px;">12 Monate</div>
                    <div (click)="updateChartUserTasks(0,24,0);user_task_period_active='24m';" [class.whiteButtonClass-currentItem]="user_task_period_active=='24m'" [class.whiteButtonClass]="user_task_period_active!='24m'" class="depend-on-device-none-to-33-percentage-width" style="float:left;padding:5px 10px;">24 Monate</div>
                    <div (click)="updateChartUserTasks(0,0,5);user_task_period_active='5y';" [class.whiteButtonClass-currentItem]="user_task_period_active=='5y'" [class.whiteButtonClass]="user_task_period_active!='5y'" class="depend-on-device-none-to-33-percentage-width" style="float:left;padding:5px 10px;">5 Jahre</div>
                    <div style="clear:both;"></div>
                </div>
            </div>

            <div style="width:100%;">
                <canvas id="canvas_user_tasks" height="400"></canvas>
            </div>

        </div>

    </div>

    <div class="col-xs-12 col-sm-5 padding-left-10px-sm-md-lg" style="padding:0;">

        <!-- Last gathered quests -->
        <div id="cf-ho-completed-quests" class="content-frame">

            <p class="headline">Zuletzt gelöste Quests</p>

            <div style="display:table;width:100%;border-spacing:2px 10px!important;color:rgb(255,255,255);">

              <div *ngIf="getLastCompletedQuests().length == 0" (click)="navigateToComponent('tasks')" style='width:100%;padding:0 20px;text-align:justify;margin-bottom:1em;'><span class='link'>Du hast leider noch keine abgeschlossenen Quests. Klicke hier, um zu deinen aktuellen Quests zu gelangen.</span></div>

              <div *ngFor="let t_quest_data of getLastCompletedQuests();" style='display:table-row;vertical-align:top;'>
                  <div style='display:table-cell;vertical-align:top;'>
                      <p style='font-size:1.1em;text-align:center;'><span (click)="navigateToQuest(t_quest_data.quest_id)" class='link'>{{t_quest_data.questname}}</span></p>
                  </div>
                  <div style='display:table-cell;vertical-align:middle;min-width:100px;'>
                      <p style='font-size:1.1em;text-align:center;'>+{{t_quest_data.score_rule}} Exp.</p>
                  </div>
                  <div style='display:table-cell;vertical-align:middle;'>
                      <p style='font-size:1em;text-align:center;'>{{lService.getFormatedDate(t_quest_data.ts_quest_completed)}}</p>
                  </div>
              </div>

            </div>

        </div>

        <!-- Last gathered badges -->
        <div id="cf-ho-gathered-badges" class="content-frame">

            <p class="headline">Zuletzt gesammelte Abzeichen</p>

            <div style="display:table;width:100%;border-spacing:2px 10px!important;color:rgb(255,255,255);">

              <div *ngIf="getLastCompletedBadges().length == 0" (click)="navigateToComponent('userprogress')" style='width:100%;padding:0 20px;text-align:justify;margin-bottom:1em;'><span class='link'>Du hast leider noch kein gesammeltes Abzeichen.</span></div>

              <div *ngFor="let t_badge_data of getLastCompletedBadges()" style='display:table-row;vertical-align:top;'>
                  <div style='display:table-cell;vertical-align:top;'>
                      <img style='width:5em;' src='{{lService.getPictureLink(t_badge_data.picture_id)}}'>
                  </div>
                  <div style='display:table-cell;vertical-align:middle;min-width:120px;'>
                      <p style='font-size:1.1em;text-align:center;'>{{t_badge_data.badgename}}</p>
                  </div>
                  <div style='display:table-cell;vertical-align:middle;'>
                      <p style='font-size:1em;text-align:center;'>{{lService.getFormatedDate(t_badge_data.ts_badge_completed)}}</p>
                  </div>
              </div>

            </div>

        </div>

        <!-- Last completed tasks -->
        <div id="cf-ho-completed-tasks" class="content-frame">

            <p class="headline">Zuletzt gelöste Aufgaben</p>

            <div style="display:table;width:100%;border-spacing:2px 10px!important;color:rgb(255,255,255);">

              <div *ngIf="getLastCompletedTasks().length == 0" (click)="navigateToComponent('tasks')" style='width:100%;padding:0 20px;text-align:justify;margin-bottom:1em;'><span class='link'>Du hast leider noch keine gelösten Aufgaben. Klicke hier, um zu deinen aktuellen Aufgaben zu gelangen.</span></div>

              <div *ngFor="let t_task_data of getLastCompletedTasks()" style='display:table-row;vertical-align:top;'>
                  <p style='display:table-cell;vertical-align:middle;font-size:1.1em;text-align:center;'><span (click)="navigateToTask(t_task_data.task_id)" class='link'>{{t_task_data.taskname}}</span></p>
                  <div style='display:table-cell;vertical-align:middle;min-width:100px;'>
                      <p style='font-size:1.1em;text-align:center;'>+{{t_task_data.score_rule}} Exp.</p>
                  </div>
                  <div style='display:table-cell;vertical-align:middle;'>
                      <p style='font-size:1em;text-align:center;'>{{lService.getFormatedDate(t_task_data.ts_last_update)}}</p>
                  </div>
              </div>

            </div>


        </div>

        <!-- Best Users -->
        <div id="cf-ho-best-users" class="content-frame">

            <p class="headline"><span (click)="navigateToComponent('highscorelist/0')" class="link">Die besten User</span></p>

            <div style="display:table;width:100%;border-spacing:2px 2px;color:rgb(255,255,255);">


                <div style='display:table-row;width:100%;'>

                    <div style='display:table-cell;vertical-align:top;'>
                        <p style="font-size:1.3em;font-weight:bold;text-align:center;text-decoration:underline;">NAME</p>
                    </div>
                    <div style='display:table-cell;vertical-align:top;'>
                        <p style="font-size:1.3em;font-weight:bold;text-align:center;text-decoration:underline;">EXP.</p>
                    </div>
                    <div style='display:table-cell;vertical-align:top;'>
                        <p style="font-size:1.3em;font-weight:bold;text-align:center;text-decoration:underline;">FAK.</p>
                    </div>

                </div>

                <div *ngFor="let t_user of getBestUsers()" style='display:table-row;vertical-align:top;'>
                    <div style='display:table-cell;vertical-align:top;'>
                        <p style='font-size:1em;text-align:center;'>{{t_user.username}}</p>
                    </div>
                    <div style='display:table-cell;vertical-align:top;'>
                        <p style='font-size:1.1em;text-align:center;'>{{t_user.user_score}}</p>
                    </div>
                    <div style='display:table-cell;vertical-align:top;'>
                        <p style='font-size:1em;text-align:center;'>{{t_user.facultyname}}</p>
                    </div>
                </div>

            </div>

        </div>

        <!-- Best Users for Users Faculty -->
        <div id="cf-ho-best-users-faculty" class="content-frame">

            <p class="headline">Die besten User deiner Fakultät</p>

            <div style="display:table;width:100%;border-spacing:2px 2px;color:rgb(255,255,255);">


                <div style='display:table-row;width:100%;'>

                    <div style='display:table-cell;vertical-align:top;'>
                        <p style="font-size:1.3em;font-weight:bold;text-align:center;text-decoration:underline;">NAME</p>
                    </div>
                    <div style='display:table-cell;vertical-align:top;'>
                        <p style="font-size:1.3em;font-weight:bold;text-align:center;text-decoration:underline;">EXP.</p>
                    </div>

                </div>

                <div *ngFor="let t_user of getBestUsersForFaculty()" style='display:table-row;vertical-align:top;'>
                    <div style='display:table-cell;vertical-align:top;'>
                        <p style='font-size:1em;text-align:center;'>{{t_user.username}}</p>
                    </div>
                    <div style='display:table-cell;vertical-align:top;'>
                        <p style='font-size:1.1em;text-align:center;'>{{t_user.user_score}}</p>
                    </div>
                </div>

            </div>

        </div>


    </div>


  </div>

  `
})
export class StatisticsComponent implements OnInit {

  @Input() user:any;
  @Input() universalcontent:any;

  specificcontent: any = {};
  loading_specificcontent: any = true;

  user_score_period_active:any = "10d";
  user_task_period_active:any = "10d";

  constructor(
    private router: Router,
    private lService: LibgameService){}

  ngOnInit() {

    this.user_score_period_active = "10d";
    this.user_task_period_active = "10d";

    //Specific Content
    this.loading_specificcontent = true;
    this.lService.specificcontent$.subscribe((specificcontent:any) => {
      this.specificcontent = specificcontent;
      this.loading_specificcontent = false;

      this.initFacultyChart();
      this.updateChartUserScore(10,0,0,true);
      this.updateChartUserTasks(10,0,0,true);
    });
    this.lService.loadSpecificContent('statistics');

  }

  getStatistics() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Statistics'] !== 'undefined' ? this.specificcontent['Statistics'] : {};
  }

  getLastCompletedQuests() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Last_Completed_Quests'] !== 'undefined' ? this.specificcontent['Last_Completed_Quests'] : [];
  }

  getLastCompletedBadges() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Last_Completed_Badges'] !== 'undefined' ? this.specificcontent['Last_Completed_Badges'] : [];
  }

  getLastCompletedTasks() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Last_Completed_Tasks'] !== 'undefined' ? this.specificcontent['Last_Completed_Tasks'] : [];
  }

  getFaculties() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Faculties'] !== 'undefined' ? this.specificcontent['Faculties'] : [];
  }

  getBestUsers() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Best_Users'] !== 'undefined' ? this.specificcontent['Best_Users'] : [];
  }

  getBestUsersForFaculty() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Best_Users_For_Faculty'] !== 'undefined' ? this.specificcontent['Best_Users_For_Faculty'] : [];
  }

  getCountBadges() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Count_Badges'] !== 'undefined' ? this.specificcontent['Count_Badges'] : 0;
  }

  getCountQuests() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Count_Quests'] !== 'undefined' ? this.specificcontent['Count_Quests'] : 0;
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

  navigateToComponent(componentname:any) {
    this.router.navigate(["/l/"+componentname]);
  }



  updateChartUserScore(d:any,m:any,y:any,init:any)  {

      let ObjectForCalculation:any = {};
      let tempObject:any = typeof this.getStatistics()["User_Statistic_2"] !== 'undefined' ? this.getStatistics()["User_Statistic_2"]["json_statistic"] : [];
      for(let key in tempObject)
      {
          ObjectForCalculation[key] = {};
          ObjectForCalculation[key]['data'] = tempObject[key]['data'];
          ObjectForCalculation[key]['ts'] = tempObject[key]['ts'];
      }

      var CalculatedChartDataScore = this.lService.getLabelsAndDataForChart(JSON.stringify(ObjectForCalculation),d,m,y,'normal_comb');

      var lineChartData_canvas_user_score = {
            labels : $.map(CalculatedChartDataScore['labels'], function(el:any) { return el; }),
            datasets : [
                  {
                        strokeColor : 'rgba(251,78,0,1)',
                        pointColor : 'rgba(251,78,0,1)',
                        pointStrokeColor : '#fff',
                        pointHighlightStroke : 'rgba(220,220,220,1)',
                        data : $.map(CalculatedChartDataScore['data'], function(el:any) { return el; })
                  }
            ]

      }

      var settingsObj_canvas_user_score = {
          animation: false,
          responsive: true,
          scaleFontColor: '#000',
          bezierCurve: false,
          datasetFill: false,
          scaleOverride: true,
          scaleSteps: 8,
          scaleStepWidth: Math.ceil(CalculatedChartDataScore['data'][Object.keys(CalculatedChartDataScore['data']).length - 1]/8)+1,
          scaleStartValue: 0,
          scaleLineColor: 'rgba(0,0,0,.6)',
          scaleGridLineColor : 'rgba(0,0,0,.2)',
          graphTitle : 'Erfahrung',
          graphTitleFontSize : 18,
          graphTitleFontColor : '#000',
    }

    if(typeof init === 'undefined' || init == false) {
      let t_canvas = <HTMLCanvasElement>document.getElementById('canvas_user_score');
      updateChart(t_canvas.getContext('2d'),lineChartData_canvas_user_score,settingsObj_canvas_user_score,false,false);
    } else {
      $('#canvas_user_score').attr('width', $('#canvas_user_score').parent().width());
      let t_canvas = <HTMLCanvasElement>document.getElementById('canvas_user_score');
      new Chart(t_canvas.getContext('2d')).Line(lineChartData_canvas_user_score, settingsObj_canvas_user_score);
    }

  }

  updateChartUserTasks(d:any,m:any,y:any,init:any) {

      var ObjectForCalculation:any = {};
      var tempObject:any = typeof this.getStatistics()["User_Statistic_1"] !== 'undefined' ? this.getStatistics()["User_Statistic_1"]["json_statistic"] : [];
      for(var key in tempObject)
      {
          ObjectForCalculation[key] = {};
          ObjectForCalculation[key]['data'] = tempObject[key]['data'];
          ObjectForCalculation[key]['ts'] = tempObject[key]['ts'];
      }
      var CalculatedChartDataTasks = this.lService.getLabelsAndDataForChart(JSON.stringify(ObjectForCalculation),d,m,y,'normal_comb');


      var lineChartData_canvas_user_tasks = {
            labels : $.map(CalculatedChartDataTasks['labels'], function(el:any) { return el; }),
            datasets : [
                  {
                        strokeColor : 'rgba(251,78,0,1)',
                        pointColor : 'rgba(251,78,0,1)',
                        pointStrokeColor : '#fff',
                        pointHighlightStroke : 'rgba(220,220,220,1)',
                        data : $.map(CalculatedChartDataTasks['data'], function(el:any) { return el; })
                  }
            ]

      }

      var settingsObj_canvas_user_tasks = {
          animation: false,
          responsive: true,
          scaleFontColor: '#000',
          bezierCurve: false,
          datasetFill: false,
          scaleOverride: true,
          scaleSteps: 8,
          scaleStepWidth: Math.ceil(CalculatedChartDataTasks['data'][Object.keys(CalculatedChartDataTasks['data']).length - 1]/8)+1,
          scaleStartValue: 0,
          scaleLineColor: 'rgba(0,0,0,.6)',
          scaleGridLineColor : 'rgba(0,0,0,.2)',
          graphTitle : 'Aufgaben',
          graphTitleFontSize : 18,
          graphTitleFontColor : '#000',
    }

     if(typeof init === 'undefined' || init == false) {
       let t_canvas = <HTMLCanvasElement>document.getElementById('canvas_user_tasks');
       updateChart(t_canvas.getContext('2d'),lineChartData_canvas_user_tasks,settingsObj_canvas_user_tasks,false,false);
     } else {
       $('#canvas_user_tasks').attr('width', $('#canvas_user_tasks').parent().width());
       let t_canvas = <HTMLCanvasElement>document.getElementById('canvas_user_tasks');
       new Chart(t_canvas.getContext('2d')).Line(lineChartData_canvas_user_tasks, settingsObj_canvas_user_tasks);
     }

  }

  initFacultyChart() {

    let t_facultyname_array:any = [];
    let t_facultyscore_array:any = [];
    let max_value_faculty_score:any = 0;

    for(let t_faculty of this.getFaculties()) {
      t_facultyname_array.push(t_faculty.facultyname);
      t_facultyscore_array.push(t_faculty.faculty_score);

      if(parseInt(t_faculty.faculty_score) > max_value_faculty_score)
        max_value_faculty_score = parseInt(t_faculty.faculty_score);
    }

    var lineChartData_canvas_faculties = {
      labels : t_facultyname_array,
      datasets : [
          {
              fillColor : 'green',
              data : t_facultyscore_array,
          }
      ]
    }

    var settingsObj_canvas_faculties = {
                  animation: false,
                  responsive: true,
                  scaleFontColor: '#000',
                  scaleOverride: true,
                  scaleSteps: 8,
                  scaleStepWidth: Math.ceil(max_value_faculty_score/8)+1,
                  scaleStartValue: 0,
                  inGraphDataShow : true,
                  inGraphDataXPosition: 2,
                  inGraphDataAlign : 'center',
                  inGraphDataFontColor : '#fff',
                  graphTitle : 'Fakultätenhighscore',
                  graphTitleFontSize : 18,
                  graphTitleFontColor : '#000',
		}

    $('#canvas_faculties').attr('width', $('#canvas_faculties').parent().width());
    let t_canvas = <HTMLCanvasElement>document.getElementById('canvas_faculties');
    new Chart(t_canvas.getContext('2d')).HorizontalBar(lineChartData_canvas_faculties, settingsObj_canvas_faculties);

  }


}
