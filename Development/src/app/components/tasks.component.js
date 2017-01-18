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
var TasksComponent = (function () {
    function TasksComponent(router, lService) {
        this.router = router;
        this.lService = lService;
        this.specificcontent = {};
        this.loading_specificcontent = true;
    }
    TasksComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Specific Content
        this.loading_specificcontent = true;
        this.lService.specificcontent$.subscribe(function (specificcontent) {
            _this.specificcontent = specificcontent;
            _this.loading_specificcontent = false;
        });
        this.lService.loadSpecificContent('tasks');
    };
    TasksComponent.prototype.getUniversalContentHome1Description = function () {
        if (!$.isEmptyObject(this.universalcontent) && typeof this.universalcontent["_Content"] !== 'undefined' && this.universalcontent["_Content"].filter(function (x) { return x.content_mapper == 'HOME_1'; }).length != 0) {
            return this.universalcontent["_Content"].filter(function (x) { return x.content_mapper == 'HOME_1'; })[0]["text"];
        }
        return '';
    };
    TasksComponent.prototype.tasksAvailable = function () {
        if ($.isEmptyObject(this.specificcontent) ||
            typeof this.specificcontent['Active_Tasks'] === 'undefined' ||
            typeof this.specificcontent['Active_Quests'] === 'undefined')
            return false;
        if (this.specificcontent['Active_Tasks'].length == 0 &&
            this.specificcontent['Active_Quests'].length == 0)
            return false;
        return true;
    };
    TasksComponent.prototype.getActiveQuests = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Active_Quests'] !== 'undefined' ? this.specificcontent['Active_Quests'] : [];
    };
    TasksComponent.prototype.getActiveTasks = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Active_Tasks'] !== 'undefined' ? this.specificcontent['Active_Tasks'] : [];
    };
    TasksComponent.prototype.isStepCompleted = function (tasks) {
        for (var key in tasks) {
            if (typeof tasks[key].completed === 'undefined' || tasks[key].completed == false)
                return false;
        }
        return true;
    };
    TasksComponent.prototype.hasQuestStepAnUncompletedPrestep = function (queststeps, step) {
        return parseInt(step) == 0 ? false : !this.isStepCompleted(queststeps[parseInt(step) - 1]);
    };
    TasksComponent.prototype.navigateToQuest = function (quest_id) {
        this.router.navigate(['/l/quest', quest_id]);
    };
    TasksComponent.prototype.navigateToTask = function (task_id) {
        this.router.navigate(['/l/task', task_id]);
    };
    TasksComponent.prototype.navigateToBadge = function (badge_id) {
        this.router.navigate(['/l/badge', badge_id]);
    };
    TasksComponent.prototype.clickHome1Button = function () {
        $('#cf-ta-introduction-content').fadeToggle(0);
    };
    return TasksComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TasksComponent.prototype, "user", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TasksComponent.prototype, "universalcontent", void 0);
TasksComponent = __decorate([
    core_1.Component({
        selector: 'tasks-component',
        providers: [libgame_service_1.LibgameService],
        template: "\n\n  <div class=\"row\">\n\n    <div class=\"col-xs-12 col-sm-3\" style=\"padding:0;\">\n\n        <div id=\"cf-ho-overview\" class=\"content-frame\">\n\n            <p class=\"headline\"><span class=\"special-font-color\">{{user?.username}}</span></p>\n\n            <div class=\"depend-on-device-table-to-none\" style=\"width:100%;\">\n\n                <div style=\"vertical-align:top;width:100%;color:rgb(255,255,255);\">\n\n                    <div id=\"cf-ho-overview-stats-experience\" class=\"depend-on-device-tablecell-to-none\" style=\"width:100%;vertical-align:middle;\">\n                        <p style=\"font-size:1.3em;font-weight:bold;text-align:center;margin-top:0.5em;\">Erfahrung</p>\n                        <p style=\"font-size:1em;text-align:center;\"><span style=\"font-size:1.6em!important;font-weight:bold;color:#0e9873;\">{{user?.user_score}}</span></p>\n                        <div style=\"clear:both;\"></div>\n                    </div>\n\n                </div>\n\n\n            </div>\n\n\n\n        </div>\n\n    </div>\n\n    <div class=\"col-xs-12 col-sm-9 padding-left-10px-sm-md-lg\" style=\"padding:0;\">\n\n        <!-- What can I do here -->\n        <div id=\"cf-ta-introduction\" class=\"content-frame\">\n\n            <p class=\"headline headline-as-button\" (click)=\"clickHome1Button();\" style=\"height:auto;padding-top:0px!important;\"><button class=\"button\">Was kann ich hier machen?</button></p>\n\n            <div id=\"cf-ta-introduction-content\" style='display:none;width:100%;border-spacing:3px 10px;'>\n\n                <div style='line-height:1.4em;text-align:justify;width:100%;vertical-align:top;color:rgb(0,0,0);padding:1em 0;'>\n                    {{getUniversalContentHome1Description()}}\n                </div>\n\n\n            </div>\n\n        </div>\n\n    </div>\n\n\n\n  </div>\n\n\n  <div class=\"row\">\n\n    <div class=\"col-xs-12\" style=\"padding:0;\">\n\n        <!-- Overview of tasks -->\n        <div id=\"cf-ta-overview\" class=\"content-frame\">\n\n            <p class=\"headline\">Deine n\u00E4chsten Ziele</p>\n\n            <p *ngIf=\"!tasksAvailable()\" class='content-none-placeholder' style='width:100%;text-align:center;margin-top:1em;margin-bottom:1em;background: yellow;padding:0.5em 0;'>Keine weiteren Aufgaben vorhanden</p>\n\n            <!-- ACTIVE TASKS -->\n\n            <div *ngFor=\"let t_task of getActiveTasks();\" (click)=\"navigateToTask(t_task.task_id)\" class=\"content-task-frame\" style=\"width:100%;\">\n                <div style=\"width:100%;color:rgb(0,0,0);cursor:pointer;\">\n                    <div class=\"depend-on-device-left-to-none-float\" style=\"font-size:1.5em;font-weight:bold;text-decoration:underline;\">Aufgabe: {{t_task.taskname}}</div>\n                    <div class=\"depend-on-device-right-to-none-float\" style=\"font-size:1.2em;margin-top:0.2em;\"><span style=\"font-size:1.2em;font-weight:bold;\">+{{t_task.score_rule}}</span> Exp.</div>\n                    <div style=\"clear:both;\"></div>\n                    <div style=\"font-size:1em;text-align:justify;margin-top:1em;\">{{t_task.description_long}}</div>\n                </div>\n            </div>\n\n            <!-- Quests -->\n            <div *ngFor=\"let t_quest of getActiveQuests()\" (click)=\"navigateToQuest(t_quest.quest_id)\" class=\"content-quest-frame\" style=\"width:100%;\">\n                <div style=\"width:100%;color:rgb(0,0,0);cursor:pointer;\">\n                    <div class=\"depend-on-device-left-to-none-float\" style=\"font-size:1.5em;font-weight:bold;text-decoration:underline;\">{{'Quest: '+t_quest.questname}}</div>\n                    <div class=\"depend-on-device-right-to-none-float\" style=\"font-size:1.2em;margin-top:0.2em;\"><span style=\"font-size:1.2em;font-weight:bold;\">+{{t_quest.score_rule}}</span> Exp.</div>\n                    <div style=\"clear:both;\"></div>\n\n                    <div *ngFor=\"let t_quest_step of t_quest.json_quest_task_ids; let i = index;\" [hidden]=\"hasQuestStepAnUncompletedPrestep(t_quest.json_quest_task_ids, i)\">\n                      <div style='font-size:1.2em;font-weight:bold;text-align:center;margin-top:0.3em;margin-bottom:0.2em;'>Stufe {{i+1}} von {{t_quest.json_quest_task_ids.length}}</div>\n\n                      <div *ngFor=\"let t_quest_step_task of t_quest_step; let i_tasks = index;\">\n                        <div style='cursor:pointer;font-weight:bold;font-size:1em;color:rgb(255,255,255);border:0px solid rgb(0,0,0);border-radius:4px;padding:0.2em 0.3em;background:rgb(50,50,50);margin-bottom:2px;' >\n                          {{t_quest_step_task.taskname}}\n                          <button\n                            [class.fa-check-square]=\"t_quest_step_task.completed\"\n                            [style.color]=\"t_quest_step_task.completed ?'rgb(0,150,0)':'rgb(150,0,0)'\"\n                            [class.fa-minus-square]=\"!t_quest_step_task.completed\"\n                            class='fa' style='padding:0;font-size:1em;border:0;margin:0;background:transparent;margin-left:5px;float:right;'></button>\n\n                        </div>\n                      </div>\n\n\n                    </div>\n                </div>\n            </div>\n\n\n\n\n\n\n\n\n        </div>\n\n\n    </div>\n\n\n\n  </div>\n\n\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, libgame_service_1.LibgameService])
], TasksComponent);
exports.TasksComponent = TasksComponent;
var _a;
//# sourceMappingURL=tasks.component.js.map