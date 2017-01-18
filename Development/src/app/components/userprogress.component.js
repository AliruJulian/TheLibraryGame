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
var UserprogressComponent = (function () {
    function UserprogressComponent(router, lService) {
        this.router = router;
        this.lService = lService;
        this.specificcontent = {};
        this.loading_specificcontent = true;
        this.open_tasks_type_key = -1;
    }
    UserprogressComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Specific Content
        this.loading_specificcontent = true;
        this.lService.specificcontent$.subscribe(function (specificcontent) {
            _this.specificcontent = specificcontent;
            _this.loading_specificcontent = false;
        });
        this.lService.loadSpecificContent('userprogress');
    };
    UserprogressComponent.prototype.getCompletedQuests = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['COMPLETED_QUESTS'] !== 'undefined' ? this.specificcontent['COMPLETED_QUESTS'] : [];
    };
    UserprogressComponent.prototype.getBadgesWithProgressStatement = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['ALL_BADGES_WITH_COMPLETED_STATEMENT'] !== 'undefined' ? this.specificcontent['ALL_BADGES_WITH_COMPLETED_STATEMENT'] : [];
    };
    UserprogressComponent.prototype.getUserTaskInfoArray = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['USER_TASK_INFO'] !== 'undefined' ? this.specificcontent['USER_TASK_INFO'] : [];
    };
    UserprogressComponent.prototype.navigateToQuest = function (quest_id) {
        this.router.navigate(['/l/quest', quest_id]);
    };
    UserprogressComponent.prototype.navigateToTask = function (task_id) {
        this.router.navigate(['/l/task', task_id]);
    };
    UserprogressComponent.prototype.navigateToBadge = function (badge_id) {
        this.router.navigate(['/l/badge', badge_id]);
    };
    //User_Task_Info
    UserprogressComponent.prototype.isTaskSolved = function (value, needed_value) {
        return parseFloat(value) >= parseFloat(needed_value);
    };
    UserprogressComponent.prototype.getMinScoreForTaskInUserTaskInfo = function (key) {
        var t_minscore = 1000000;
        if (this.getUserTaskInfoArray()[key]["tasks"].length == 0)
            return 0;
        for (var t_task_key in this.getUserTaskInfoArray()[key]["tasks"]) {
            if (parseFloat(this.getUserTaskInfoArray()[key]["tasks"][t_task_key]["score_rule"]) < t_minscore) {
                t_minscore = parseFloat(this.getUserTaskInfoArray()[key]["tasks"][t_task_key]["score_rule"]);
            }
        }
        return t_minscore;
    };
    UserprogressComponent.prototype.getMaxScoreForTaskInUserTaskInfo = function (key) {
        var t_maxscore = 0;
        if (this.getUserTaskInfoArray()[key]["tasks"].length == 0)
            return 0;
        for (var t_task_key in this.getUserTaskInfoArray()[key]["tasks"]) {
            if (parseFloat(this.getUserTaskInfoArray()[key]["tasks"][t_task_key]["score_rule"]) > t_maxscore) {
                t_maxscore = parseFloat(this.getUserTaskInfoArray()[key]["tasks"][t_task_key]["score_rule"]);
            }
        }
        return t_maxscore;
    };
    return UserprogressComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], UserprogressComponent.prototype, "user", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], UserprogressComponent.prototype, "universalcontent", void 0);
UserprogressComponent = __decorate([
    core_1.Component({
        selector: 'userprogress-component',
        providers: [libgame_service_1.LibgameService],
        template: "\n\n  <div class=\"row\">\n\n      <div class=\"col-xs-12 col-sm-3\" style=\"padding:0;\">\n\n          <div id=\"cf-ho-overview\" class=\"content-frame\">\n\n              <p class=\"headline\"><span class=\"special-font-color\">{{user?.username}}</span></p>\n\n              <div class=\"depend-on-device-table-to-none\" style=\"width:100%;\">\n\n                  <div class=\"depend-on-device-tablerow-to-none\" style=\"vertical-align:top;width:100%;color:rgb(255,255,255);\">\n\n                      <div id=\"cf-ho-overview-stats-experience\" class=\"depend-on-device-tablecell-to-none\" style=\"width:100%;vertical-align:middle;\">\n                          <p class=\"depend-on-device-none-to-left-float depend-on-device-none-to-49-percentage-width\" style=\"font-size:1.3em;font-weight:bold;text-align:center;margin-top:0.5em;\">Erfahrung</p>\n                          <p class=\"depend-on-device-none-to-left-float depend-on-device-none-to-49-percentage-width\" style=\"font-size:1em;text-align:center;\"><span style=\"font-size:1.6em!important;font-weight:bold;color:#0e9873;\">{{user?.user_score}}</span></p>\n                          <div style=\"clear:both;\"></div>\n                      </div>\n\n                  </div>\n\n\n              </div>\n\n\n\n          </div>\n\n      </div>\n\n\n      <div class=\"col-xs-12 col-sm-9 padding-left-10px-sm-md-lg\" style=\"padding:0;\">\n\n\n          <!-- Quests -->\n          <div id=\"cf-ac-quests\" class=\"content-frame\">\n\n              <p class=\"headline\">Abgeschlossene Quests</p>\n\n              <p [hidden]=\"getCompletedQuests().length!=0\" style='width:100%;text-align:center;margin-top:1em;margin-bottom:1em;'>Keine abgeschlossenen Quests vorhanden</p>\n\n              <div *ngFor=\"let t_c_quest of getCompletedQuests();\" (click)=\"navigateToQuest(t_c_quest.quest_id)\" class=\"content-quest-frame\" style=\"width:100%;\">\n                  <div style=\"width:100%;color:rgb(0,0,0);cursor:pointer;\">\n                      <div class=\"depend-on-device-left-to-none-float\" style=\"font-size:1.5em;font-weight:bold;text-decoration:underline;\">Quest: {{t_c_quest.questname}}</div>\n                      <div class=\"depend-on-device-right-to-none-float\" style=\"font-size:1.2em;margin-top:0.2em;\"><span style=\"font-size:1.2em;font-weight:bold;\">+{{t_c_quest.score_rule}}</span> Exp.</div>\n                      <div style=\"clear:both;\"></div>\n                      <div style=\"font-size:1.2em;font-weight:bold;text-align:center;margin-top:0.3em;margin-bottom:0.2em;\">Abgeschlossen</div>\n                  </div>\n              </div>\n\n\n          </div>\n\n      </div>\n\n  </div>\n\n  <div class=\"row\">\n\n      <div class=\"col-xs-12\" style=\"padding:0;\">\n\n\n          <!-- Badges -->\n          <div id=\"cf-ac-badges\" class=\"content-frame\">\n\n              <p class=\"headline\">Abzeichen</p>\n\n              <div style=\"display:block;width: 100%;\">\n\n\n                  <div *ngFor=\"let t_badge of getBadgesWithProgressStatement();\" (click)=\"navigateToBadge(t_badge.badge_id)\" class='col-xs-6 col-sm-1' style='display:inline-block;padding:1em;'>\n                      <div style='position:relative;cursor:pointer;'>\n                          <img style='position:relative;top:0;left:0;width:100%;' src='{{lService.getPictureLink(t_badge.picture_id)}}'>\n                          <div *ngIf=\"t_badge.completed\" class='fa fa-check-square' style='position:absolute;right:0;margin:0.3em;font-size:2em!important;color:white;'></div>\n                          <div *ngIf=\"!t_badge.completed\" class='fa fa-minus-square' style='position:absolute;right:0;margin:0.3em;font-size:2em!important;color:white;'></div>\n                      </div>\n                  </div>\n\n                  <div style=\"clear:both;\"></div>\n\n\n              </div>\n\n          </div>\n\n\n\n          <!-- Tasks -->\n          <div id=\"cf-ac-tasks\" class=\"content-frame\">\n\n              <p class=\"headline\">Abgeschlossene Aufgaben</p>\n\n\n              <div *ngFor=\"let t_task_type of getUserTaskInfoArray(); let i = index;\" class=\"content-inner-frame\" style=\"width:100%;\">\n                  <!-- Description of Task_Type -->\n                  <div class=\"cf-ac-tasks-task-type-button\"\n                    (click)=\"open_tasks_type_key==i?open_tasks_type_key=-1:open_tasks_type_key=i;\"\n                    [class.separator]=\"open_tasks_type_key==i\"\n                    style=\"width:100%;color:rgb(255,255,255);cursor:pointer;padding:0.5em 0;\">\n                      <div class=\"depend-on-device-left-to-none-float\" style=\"font-size:1.5em;text-decoration:underline;\">\n                        {{t_task_type.task_type_name}}\n                      </div>\n                      <div class=\"depend-on-device-right-to-none-float\" style=\"font-size:1.2em;margin-top:0.2em;\"><span style=\"font-size:1.2em;font-weight:bold;\">\n                        +[{{getMinScoreForTaskInUserTaskInfo(i)}} - {{getMaxScoreForTaskInUserTaskInfo(i)}}]</span> Exp. pro Aufgabe ({{t_task_type[\"tasks\"].length}} Aufgaben)\n                      </div>\n                      <div style=\"clear:both;\"></div>\n                  </div>\n\n                  <!-- Tasks -->\n                  <div *ngIf=\"t_task_type['tasks'].length==0 && open_tasks_type_key==i\" class='cf-ac-tasks-no-tasks' style='width:100%;text-align:center;font-size:1.3em;font-weight:bold;color:black;margin-top:5px;margin-bottom:10px;'>Keine Aufgaben vorhanden</div>\n\n                  <div *ngIf=\"t_task_type['tasks'].length!=0 && open_tasks_type_key==i\" class='cf-ac-tasks-tasks depend-on-device-table-to-none' style='width:100%;border-spacing:10px 15px;margin-top:5px;'>\n                    <div *ngFor=\"let t_task of t_task_type['tasks']\"  class='cf-ac-tasks-task depend-on-device-tablerow-to-none' style='width:100%;padding:0.8em 0;'>\n\n                          <div class='col-xs-9' style='text-align:left;vertical-align:middle;line-height:1.1em !important;'>\n                              <span class=\"link\" (click)=\"navigateToTask(t_task.task_id)\" style=\"font-size:1.3em;font-weight:bold;\">{{t_task.taskname}}</span>\n                          </div>\n\n                          <div class='col-xs-1' style='text-align:center;vertical-align:middle;'>\n                              <button *ngIf=\"isTaskSolved(t_task.value,t_task.needed_value)\" class='fa fa-check-square' style='padding:0;font-size:2em;color:rgb(0,150,0);border:0;margin:0;background:transparent;'></button>\n                              <button *ngIf=\"!isTaskSolved(t_task.value,t_task.needed_value)\" class='fa fa-minus-square' style='padding:0;font-size:2em;color:rgb(150,0,0);border:0;margin:0;background:transparent;'></button>\n                          </div>\n\n                          <div class='col-xs-1' style='text-align:center;vertical-align:middle;'>\n                              <span style=\"color:rgb(0,0,0);\"><span style=\"font-size:1.3em;font-weight:bold;\">{{t_task.value}}</span>/{{t_task.needed_value}}</span>\n                          </div>\n\n                          <div style=\"clear:both;\"></div>\n                      </div>\n                    </div>\n\n              </div>\n\n          </div>\n\n      </div>\n\n\n  </div>\n\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, libgame_service_1.LibgameService])
], UserprogressComponent);
exports.UserprogressComponent = UserprogressComponent;
var _a;
//# sourceMappingURL=userprogress.component.js.map