"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var libgame_service_1 = require("./../services/libgame.service");
var StatisticsComponent = (function () {
    function StatisticsComponent(router, lService) {
        this.router = router;
        this.lService = lService;
        this.specificcontent = {};
        this.loading_specificcontent = true;
        this.user_score_period_active = "10d";
        this.user_task_period_active = "10d";
    }
    StatisticsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user_score_period_active = "10d";
        this.user_task_period_active = "10d";
        //Specific Content
        this.loading_specificcontent = true;
        this.lService.specificcontent$.subscribe(function (specificcontent) {
            _this.specificcontent = specificcontent;
            _this.loading_specificcontent = false;
            _this.initFacultyChart();
            _this.updateChartUserScore(10, 0, 0, true);
            _this.updateChartUserTasks(10, 0, 0, true);
        });
        this.lService.loadSpecificContent('statistics');
    };
    StatisticsComponent.prototype.getStatistics = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Statistics'] !== 'undefined' ? this.specificcontent['Statistics'] : {};
    };
    StatisticsComponent.prototype.getLastCompletedQuests = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Last_Completed_Quests'] !== 'undefined' ? this.specificcontent['Last_Completed_Quests'] : [];
    };
    StatisticsComponent.prototype.getLastCompletedBadges = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Last_Completed_Badges'] !== 'undefined' ? this.specificcontent['Last_Completed_Badges'] : [];
    };
    StatisticsComponent.prototype.getLastCompletedTasks = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Last_Completed_Tasks'] !== 'undefined' ? this.specificcontent['Last_Completed_Tasks'] : [];
    };
    StatisticsComponent.prototype.getFaculties = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Faculties'] !== 'undefined' ? this.specificcontent['Faculties'] : [];
    };
    StatisticsComponent.prototype.getBestUsers = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Best_Users'] !== 'undefined' ? this.specificcontent['Best_Users'] : [];
    };
    StatisticsComponent.prototype.getBestUsersForFaculty = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Best_Users_For_Faculty'] !== 'undefined' ? this.specificcontent['Best_Users_For_Faculty'] : [];
    };
    StatisticsComponent.prototype.getCountBadges = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Count_Badges'] !== 'undefined' ? this.specificcontent['Count_Badges'] : 0;
    };
    StatisticsComponent.prototype.getCountQuests = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Count_Quests'] !== 'undefined' ? this.specificcontent['Count_Quests'] : 0;
    };
    StatisticsComponent.prototype.navigateToQuest = function (quest_id) {
        this.router.navigate(['/l/quest', quest_id]);
    };
    StatisticsComponent.prototype.navigateToTask = function (task_id) {
        this.router.navigate(['/l/task', task_id]);
    };
    StatisticsComponent.prototype.navigateToBadge = function (badge_id) {
        this.router.navigate(['/l/badge', badge_id]);
    };
    StatisticsComponent.prototype.navigateToComponent = function (componentname) {
        this.router.navigate(["/l/" + componentname]);
    };
    StatisticsComponent.prototype.updateChartUserScore = function (d, m, y, init) {
        var ObjectForCalculation = {};
        var tempObject = typeof this.getStatistics()["User_Statistic_2"] !== 'undefined' ? this.getStatistics()["User_Statistic_2"]["json_statistic"] : [];
        for (var key in tempObject) {
            ObjectForCalculation[key] = {};
            ObjectForCalculation[key]['data'] = tempObject[key]['data'];
            ObjectForCalculation[key]['ts'] = tempObject[key]['ts'];
        }
        var CalculatedChartDataScore = this.lService.getLabelsAndDataForChart(JSON.stringify(ObjectForCalculation), d, m, y, 'normal_comb');
        var lineChartData_canvas_user_score = {
            labels: $.map(CalculatedChartDataScore['labels'], function (el) { return el; }),
            datasets: [
                {
                    strokeColor: 'rgba(251,78,0,1)',
                    pointColor: 'rgba(251,78,0,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    data: $.map(CalculatedChartDataScore['data'], function (el) { return el; })
                }
            ]
        };
        var settingsObj_canvas_user_score = {
            animation: false,
            responsive: true,
            scaleFontColor: '#000',
            bezierCurve: false,
            datasetFill: false,
            scaleOverride: true,
            scaleSteps: 8,
            scaleStepWidth: Math.ceil(CalculatedChartDataScore['data'][Object.keys(CalculatedChartDataScore['data']).length - 1] / 8) + 1,
            scaleStartValue: 0,
            scaleLineColor: 'rgba(0,0,0,.6)',
            scaleGridLineColor: 'rgba(0,0,0,.2)',
            graphTitle: 'Erfahrung',
            graphTitleFontSize: 18,
            graphTitleFontColor: '#000',
        };
        if (typeof init === 'undefined' || init == false) {
            var t_canvas = document.getElementById('canvas_user_score');
            updateChart(t_canvas.getContext('2d'), lineChartData_canvas_user_score, settingsObj_canvas_user_score, false, false);
        }
        else {
            $('#canvas_user_score').attr('width', $('#canvas_user_score').parent().width());
            var t_canvas = document.getElementById('canvas_user_score');
            new Chart(t_canvas.getContext('2d')).Line(lineChartData_canvas_user_score, settingsObj_canvas_user_score);
        }
    };
    StatisticsComponent.prototype.updateChartUserTasks = function (d, m, y, init) {
        var ObjectForCalculation = {};
        var tempObject = typeof this.getStatistics()["User_Statistic_1"] !== 'undefined' ? this.getStatistics()["User_Statistic_1"]["json_statistic"] : [];
        for (var key in tempObject) {
            ObjectForCalculation[key] = {};
            ObjectForCalculation[key]['data'] = tempObject[key]['data'];
            ObjectForCalculation[key]['ts'] = tempObject[key]['ts'];
        }
        var CalculatedChartDataTasks = this.lService.getLabelsAndDataForChart(JSON.stringify(ObjectForCalculation), d, m, y, 'normal_comb');
        var lineChartData_canvas_user_tasks = {
            labels: $.map(CalculatedChartDataTasks['labels'], function (el) { return el; }),
            datasets: [
                {
                    strokeColor: 'rgba(251,78,0,1)',
                    pointColor: 'rgba(251,78,0,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    data: $.map(CalculatedChartDataTasks['data'], function (el) { return el; })
                }
            ]
        };
        var settingsObj_canvas_user_tasks = {
            animation: false,
            responsive: true,
            scaleFontColor: '#000',
            bezierCurve: false,
            datasetFill: false,
            scaleOverride: true,
            scaleSteps: 8,
            scaleStepWidth: Math.ceil(CalculatedChartDataTasks['data'][Object.keys(CalculatedChartDataTasks['data']).length - 1] / 8) + 1,
            scaleStartValue: 0,
            scaleLineColor: 'rgba(0,0,0,.6)',
            scaleGridLineColor: 'rgba(0,0,0,.2)',
            graphTitle: 'Aufgaben',
            graphTitleFontSize: 18,
            graphTitleFontColor: '#000',
        };
        if (typeof init === 'undefined' || init == false) {
            var t_canvas = document.getElementById('canvas_user_tasks');
            updateChart(t_canvas.getContext('2d'), lineChartData_canvas_user_tasks, settingsObj_canvas_user_tasks, false, false);
        }
        else {
            $('#canvas_user_tasks').attr('width', $('#canvas_user_tasks').parent().width());
            var t_canvas = document.getElementById('canvas_user_tasks');
            new Chart(t_canvas.getContext('2d')).Line(lineChartData_canvas_user_tasks, settingsObj_canvas_user_tasks);
        }
    };
    StatisticsComponent.prototype.initFacultyChart = function () {
        var t_facultyname_array = [];
        var t_facultyscore_array = [];
        var max_value_faculty_score = 0;
        for (var _i = 0, _a = this.getFaculties(); _i < _a.length; _i++) {
            var t_faculty = _a[_i];
            t_facultyname_array.push(t_faculty.facultyname);
            t_facultyscore_array.push(t_faculty.faculty_score);
            if (parseInt(t_faculty.faculty_score) > max_value_faculty_score)
                max_value_faculty_score = parseInt(t_faculty.faculty_score);
        }
        var lineChartData_canvas_faculties = {
            labels: t_facultyname_array,
            datasets: [
                {
                    fillColor: 'green',
                    data: t_facultyscore_array,
                }
            ]
        };
        var settingsObj_canvas_faculties = {
            animation: false,
            responsive: true,
            scaleFontColor: '#000',
            scaleOverride: true,
            scaleSteps: 8,
            scaleStepWidth: Math.ceil(max_value_faculty_score / 8) + 1,
            scaleStartValue: 0,
            inGraphDataShow: true,
            inGraphDataXPosition: 2,
            inGraphDataAlign: 'center',
            inGraphDataFontColor: '#fff',
            graphTitle: 'Fakultätenhighscore',
            graphTitleFontSize: 18,
            graphTitleFontColor: '#000',
        };
        $('#canvas_faculties').attr('width', $('#canvas_faculties').parent().width());
        var t_canvas = document.getElementById('canvas_faculties');
        new Chart(t_canvas.getContext('2d')).HorizontalBar(lineChartData_canvas_faculties, settingsObj_canvas_faculties);
    };
    return StatisticsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], StatisticsComponent.prototype, "user", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], StatisticsComponent.prototype, "universalcontent", void 0);
StatisticsComponent = __decorate([
    core_1.Component({
        selector: 'statistics-component',
        providers: [libgame_service_1.LibgameService],
        template: "\n\n  <div class=\"row\">\n\n    <div class=\"col-xs-12 col-sm-7\" style=\"padding:0;\">\n\n        <!-- USER \u00DCbersicht -->\n        <div id=\"cf-ho-overview\" class=\"content-frame\">\n\n            <p class=\"headline\">Dein Fortschritt</p>\n\n            <div class=\"depend-on-device-table-to-none\" style=\"width:100%;\">\n\n                <div class=\"depend-on-device-tablerow-to-none\" style=\"vertical-align:top;width:100%;color:rgb(255,255,255);\">\n\n                    <div id=\"cf-ho-overview-stats-quests\" class=\"col-xs-6 col-sm-3\" style=\"vertical-align:top;\">\n                        <p style=\"font-size:1.3em;font-weight:bold;text-align:center;\">Quests</p>\n                        <p style=\"font-size:1em;text-align:center;color: black;\">{{user?.completed_quests}}/{{getCountQuests()}}</p>\n                        <div style=\"clear:both;\"></div>\n                    </div>\n\n                    <div id=\"cf-ho-overview-stats-badges\" class=\"col-xs-6 col-sm-3\" style=\"vertical-align:top;\">\n                        <p style=\"font-size:1.3em;font-weight:bold;text-align:center;\">Abzeichen</p>\n                        <p style=\"font-size:1em;text-align:center;color: black;\">{{user?.completed_badges}}/{{getCountBadges()}}</p>\n                        <div style=\"clear:both;\"></div>\n                    </div>\n\n                    <div id=\"cf-ho-overview-stats-tasks\" class=\"col-xs-6 col-sm-3\" style=\"vertical-align:top;\">\n                        <p style=\"font-size:1.3em;font-weight:bold;text-align:center;\">Aufgaben</p>\n                        <p style=\"font-size:1em;text-align:center;color: black;\">{{user?.completed_tasks}}</p>\n                        <div style=\"clear:both;\"></div>\n                    </div>\n\n                    <div id=\"cf-ho-overview-stats-experience\" class=\"col-xs-6 col-sm-3\" style=\"vertical-align:top;\">\n                        <p style=\"font-size:1.3em;font-weight:bold;text-align:center;\">Erfahrung</p>\n                        <p style=\"font-size:1em;text-align:center;color: black;\">{{user?.user_score}}</p>\n                        <div style=\"clear:both;\"></div>\n                    </div>\n\n                    <div style=\"clear:both;\"></div>\n\n                </div>\n\n\n            </div>\n\n\n\n        </div>\n\n        <!-- Overview departments -->\n        <div id=\"cf-ho-statistic-departments\" class=\"content-frame\">\n\n            <p class=\"headline\">\u00DCbersicht \u00FCber die Fakult\u00E4ten</p>\n\n            <div style=\"width:100%;\">\n                <canvas id=\"canvas_faculties\" height=\"300\"></canvas>\n            </div>\n\n        </div>\n\n        <!-- USER SCORE -->\n        <div id=\"cf-st-user-score\" class=\"content-frame\">\n\n            <p class=\"headline\">Deine Erfahrung im Zeitverlauf</p>\n\n            <div style=\"width:100%;\">\n                <div style=\"display:inline-block;border:2px solid rgb(0,0,0);border-radius:4px;\">\n                    <div (click)=\"updateChartUserScore(10,0,0);user_score_period_active='10d';\" [class.whiteButtonClass-currentItem]=\"user_score_period_active=='10d'\" [class.whiteButtonClass]=\"user_score_period_active!='10d'\" class=\"depend-on-device-none-to-33-percentage-width\" style=\"float:left;padding:5px 10px;\">10 Tage</div>\n                    <div (click)=\"updateChartUserScore(30,0,0);user_score_period_active='30d';\" [class.whiteButtonClass-currentItem]=\"user_score_period_active=='30d'\" [class.whiteButtonClass]=\"user_score_period_active!='30d'\" class=\"depend-on-device-none-to-33-percentage-width\" style=\"float:left;padding:5px 10px;\">30 Tage</div>\n                    <div (click)=\"updateChartUserScore(0,6,0);user_score_period_active='6m';\" [class.whiteButtonClass-currentItem]=\"user_score_period_active=='6m'\" [class.whiteButtonClass]=\"user_score_period_active!='6m'\" class=\"depend-on-device-none-to-33-percentage-width\" style=\"float:left;padding:5px 10px;\">6 Monate</div>\n                    <div (click)=\"updateChartUserScore(0,12,0);user_score_period_active='12m';\" [class.whiteButtonClass-currentItem]=\"user_score_period_active=='12m'\" [class.whiteButtonClass]=\"user_score_period_active!='12m'\" class=\"depend-on-device-none-to-33-percentage-width\" style=\"float:left;padding:5px 10px;\">12 Monate</div>\n                    <div (click)=\"updateChartUserScore(0,24,0);user_score_period_active='24m';\" [class.whiteButtonClass-currentItem]=\"user_score_period_active=='24m'\" [class.whiteButtonClass]=\"user_score_period_active!='24m'\" class=\"depend-on-device-none-to-33-percentage-width\" style=\"float:left;padding:5px 10px;\">24 Monate</div>\n                    <div (click)=\"updateChartUserScore(0,0,5);user_score_period_active='5y';\" [class.whiteButtonClass-currentItem]=\"user_score_period_active=='5y'\" [class.whiteButtonClass]=\"user_score_period_active!='5y'\" class=\"depend-on-device-none-to-33-percentage-width\" style=\"float:left;padding:5px 10px;\">5 Jahre</div>\n                    <div style=\"clear:both;\"></div>\n                </div>\n            </div>\n\n            <div style=\"width:100%;\">\n                <canvas id=\"canvas_user_score\" height=\"400\"></canvas>\n            </div>\n\n        </div>\n\n        <!-- USER COMPLETED TASKS -->\n        <div id=\"cf-st-user-tasks\" class=\"content-frame\">\n\n            <p class=\"headline\">Deine gel\u00F6sten Aufgaben im Zeitverlauf</p>\n\n            <div style=\"width:100%;\">\n                <div style=\"display:inline-block;border:2px solid rgb(0,0,0);border-radius:4px;\">\n                    <div (click)=\"updateChartUserTasks(10,0,0);user_task_period_active='10d';\" [class.whiteButtonClass-currentItem]=\"user_task_period_active=='10d'\" [class.whiteButtonClass]=\"user_task_period_active!='10d'\" class=\"depend-on-device-none-to-33-percentage-width\" style=\"float:left;padding:5px 10px;\">10 Tage</div>\n                    <div (click)=\"updateChartUserTasks(30,0,0);user_task_period_active='30d';\" [class.whiteButtonClass-currentItem]=\"user_task_period_active=='30d'\" [class.whiteButtonClass]=\"user_task_period_active!='30d'\" class=\"depend-on-device-none-to-33-percentage-width\" style=\"float:left;padding:5px 10px;\">30 Tage</div>\n                    <div (click)=\"updateChartUserTasks(0,6,0);user_task_period_active='6m';\" [class.whiteButtonClass-currentItem]=\"user_task_period_active=='6m'\" [class.whiteButtonClass]=\"user_task_period_active!='6m'\" class=\"depend-on-device-none-to-33-percentage-width\" style=\"float:left;padding:5px 10px;\">6 Monate</div>\n                    <div (click)=\"updateChartUserTasks(0,12,0);user_task_period_active='12m';\" [class.whiteButtonClass-currentItem]=\"user_task_period_active=='12m'\" [class.whiteButtonClass]=\"user_task_period_active!='12m'\" class=\"depend-on-device-none-to-33-percentage-width\" style=\"float:left;padding:5px 10px;\">12 Monate</div>\n                    <div (click)=\"updateChartUserTasks(0,24,0);user_task_period_active='24m';\" [class.whiteButtonClass-currentItem]=\"user_task_period_active=='24m'\" [class.whiteButtonClass]=\"user_task_period_active!='24m'\" class=\"depend-on-device-none-to-33-percentage-width\" style=\"float:left;padding:5px 10px;\">24 Monate</div>\n                    <div (click)=\"updateChartUserTasks(0,0,5);user_task_period_active='5y';\" [class.whiteButtonClass-currentItem]=\"user_task_period_active=='5y'\" [class.whiteButtonClass]=\"user_task_period_active!='5y'\" class=\"depend-on-device-none-to-33-percentage-width\" style=\"float:left;padding:5px 10px;\">5 Jahre</div>\n                    <div style=\"clear:both;\"></div>\n                </div>\n            </div>\n\n            <div style=\"width:100%;\">\n                <canvas id=\"canvas_user_tasks\" height=\"400\"></canvas>\n            </div>\n\n        </div>\n\n    </div>\n\n    <div class=\"col-xs-12 col-sm-5 padding-left-10px-sm-md-lg\" style=\"padding:0;\">\n\n        <!-- Last gathered quests -->\n        <div id=\"cf-ho-completed-quests\" class=\"content-frame\">\n\n            <p class=\"headline\">Zuletzt gel\u00F6ste Quests</p>\n\n            <div style=\"display:table;width:100%;border-spacing:2px 10px!important;color:rgb(255,255,255);\">\n\n              <div *ngIf=\"getLastCompletedQuests().length == 0\" (click)=\"navigateToComponent('tasks')\" style='width:100%;padding:0 20px;text-align:justify;margin-bottom:1em;'><span class='link'>Du hast leider noch keine abgeschlossenen Quests. Klicke hier, um zu deinen aktuellen Quests zu gelangen.</span></div>\n\n              <div *ngFor=\"let t_quest_data of getLastCompletedQuests();\" style='display:table-row;vertical-align:top;'>\n                  <div style='display:table-cell;vertical-align:top;'>\n                      <p style='font-size:1.1em;text-align:center;'><span (click)=\"navigateToQuest(t_quest_data.quest_id)\" class='link'>{{t_quest_data.questname}}</span></p>\n                  </div>\n                  <div style='display:table-cell;vertical-align:middle;min-width:100px;'>\n                      <p style='font-size:1.1em;text-align:center;'>+{{t_quest_data.score_rule}} Exp.</p>\n                  </div>\n                  <div style='display:table-cell;vertical-align:middle;'>\n                      <p style='font-size:1em;text-align:center;'>{{lService.getFormatedDate(t_quest_data.ts_quest_completed)}}</p>\n                  </div>\n              </div>\n\n            </div>\n\n        </div>\n\n        <!-- Last gathered badges -->\n        <div id=\"cf-ho-gathered-badges\" class=\"content-frame\">\n\n            <p class=\"headline\">Zuletzt gesammelte Abzeichen</p>\n\n            <div style=\"display:table;width:100%;border-spacing:2px 10px!important;color:rgb(255,255,255);\">\n\n              <div *ngIf=\"getLastCompletedBadges().length == 0\" (click)=\"navigateToComponent('userprogress')\" style='width:100%;padding:0 20px;text-align:justify;margin-bottom:1em;'><span class='link'>Du hast leider noch kein gesammeltes Abzeichen.</span></div>\n\n              <div *ngFor=\"let t_badge_data of getLastCompletedBadges()\" style='display:table-row;vertical-align:top;'>\n                  <div style='display:table-cell;vertical-align:top;'>\n                      <img style='width:5em;' src='{{lService.getPictureLink(t_badge_data.picture_id)}}'>\n                  </div>\n                  <div style='display:table-cell;vertical-align:middle;min-width:120px;'>\n                      <p style='font-size:1.1em;text-align:center;'>{{t_badge_data.badgename}}</p>\n                  </div>\n                  <div style='display:table-cell;vertical-align:middle;'>\n                      <p style='font-size:1em;text-align:center;'>{{lService.getFormatedDate(t_badge_data.ts_badge_completed)}}</p>\n                  </div>\n              </div>\n\n            </div>\n\n        </div>\n\n        <!-- Last completed tasks -->\n        <div id=\"cf-ho-completed-tasks\" class=\"content-frame\">\n\n            <p class=\"headline\">Zuletzt gel\u00F6ste Aufgaben</p>\n\n            <div style=\"display:table;width:100%;border-spacing:2px 10px!important;color:rgb(255,255,255);\">\n\n              <div *ngIf=\"getLastCompletedTasks().length == 0\" (click)=\"navigateToComponent('tasks')\" style='width:100%;padding:0 20px;text-align:justify;margin-bottom:1em;'><span class='link'>Du hast leider noch keine gel\u00F6sten Aufgaben. Klicke hier, um zu deinen aktuellen Aufgaben zu gelangen.</span></div>\n\n              <div *ngFor=\"let t_task_data of getLastCompletedTasks()\" style='display:table-row;vertical-align:top;'>\n                  <p style='display:table-cell;vertical-align:middle;font-size:1.1em;text-align:center;'><span (click)=\"navigateToTask(t_task_data.task_id)\" class='link'>{{t_task_data.taskname}}</span></p>\n                  <div style='display:table-cell;vertical-align:middle;min-width:100px;'>\n                      <p style='font-size:1.1em;text-align:center;'>+{{t_task_data.score_rule}} Exp.</p>\n                  </div>\n                  <div style='display:table-cell;vertical-align:middle;'>\n                      <p style='font-size:1em;text-align:center;'>{{lService.getFormatedDate(t_task_data.ts_last_update)}}</p>\n                  </div>\n              </div>\n\n            </div>\n\n\n        </div>\n\n        <!-- Best Users -->\n        <div id=\"cf-ho-best-users\" class=\"content-frame\">\n\n            <p class=\"headline\"><span (click)=\"navigateToComponent('highscorelist/0')\" class=\"link\">Die besten User</span></p>\n\n            <div style=\"display:table;width:100%;border-spacing:2px 2px;color:rgb(255,255,255);\">\n\n\n                <div style='display:table-row;width:100%;'>\n\n                    <div style='display:table-cell;vertical-align:top;'>\n                        <p style=\"font-size:1.3em;font-weight:bold;text-align:center;text-decoration:underline;\">NAME</p>\n                    </div>\n                    <div style='display:table-cell;vertical-align:top;'>\n                        <p style=\"font-size:1.3em;font-weight:bold;text-align:center;text-decoration:underline;\">EXP.</p>\n                    </div>\n                    <div style='display:table-cell;vertical-align:top;'>\n                        <p style=\"font-size:1.3em;font-weight:bold;text-align:center;text-decoration:underline;\">FAK.</p>\n                    </div>\n\n                </div>\n\n                <div *ngFor=\"let t_user of getBestUsers()\" style='display:table-row;vertical-align:top;'>\n                    <div style='display:table-cell;vertical-align:top;'>\n                        <p style='font-size:1em;text-align:center;'>{{t_user.username}}</p>\n                    </div>\n                    <div style='display:table-cell;vertical-align:top;'>\n                        <p style='font-size:1.1em;text-align:center;'>{{t_user.user_score}}</p>\n                    </div>\n                    <div style='display:table-cell;vertical-align:top;'>\n                        <p style='font-size:1em;text-align:center;'>{{t_user.facultyname}}</p>\n                    </div>\n                </div>\n\n            </div>\n\n        </div>\n\n        <!-- Best Users for Users Faculty -->\n        <div id=\"cf-ho-best-users-faculty\" class=\"content-frame\">\n\n            <p class=\"headline\">Die besten User deiner Fakult\u00E4t</p>\n\n            <div style=\"display:table;width:100%;border-spacing:2px 2px;color:rgb(255,255,255);\">\n\n\n                <div style='display:table-row;width:100%;'>\n\n                    <div style='display:table-cell;vertical-align:top;'>\n                        <p style=\"font-size:1.3em;font-weight:bold;text-align:center;text-decoration:underline;\">NAME</p>\n                    </div>\n                    <div style='display:table-cell;vertical-align:top;'>\n                        <p style=\"font-size:1.3em;font-weight:bold;text-align:center;text-decoration:underline;\">EXP.</p>\n                    </div>\n\n                </div>\n\n                <div *ngFor=\"let t_user of getBestUsersForFaculty()\" style='display:table-row;vertical-align:top;'>\n                    <div style='display:table-cell;vertical-align:top;'>\n                        <p style='font-size:1em;text-align:center;'>{{t_user.username}}</p>\n                    </div>\n                    <div style='display:table-cell;vertical-align:top;'>\n                        <p style='font-size:1.1em;text-align:center;'>{{t_user.user_score}}</p>\n                    </div>\n                </div>\n\n            </div>\n\n        </div>\n\n\n    </div>\n\n\n  </div>\n\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, libgame_service_1.LibgameService])
], StatisticsComponent);
exports.StatisticsComponent = StatisticsComponent;
var _a;
//# sourceMappingURL=statistics.component.js.map