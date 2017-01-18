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
var QuestComponent = (function () {
    function QuestComponent(router, lService) {
        this.router = router;
        this.lService = lService;
        this.specificcontent = {};
        this.loading_specificcontent = true;
    }
    QuestComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Specific Content
        this.loading_specificcontent = true;
        this.lService.specificcontent$.subscribe(function (specificcontent) {
            _this.specificcontent = specificcontent;
            _this.loading_specificcontent = false;
        });
        if (typeof this.quest_id === 'string' && this.quest_id.length != 0)
            this.lService.loadSpecificContent('quest&quest_id=' + this.quest_id);
    };
    QuestComponent.prototype.ngOnChanges = function (changes) {
        var log = [];
        for (var propName in changes) {
            var changedProp = changes[propName];
            var from = changedProp.previousValue;
            var to = changedProp.currentValue;
            if (propName == "quest_id" && from != to) {
                this.lService.loadSpecificContent('quest&quest_id=' + to);
            }
        }
    };
    QuestComponent.prototype.getQuestData = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['QUEST_DATA'] !== 'undefined' ? this.specificcontent['QUEST_DATA']
            : {
                json_quest_task_ids: [],
                score_rule: 0,
                is_starter_quest: "0",
                is_active: "1"
            };
    };
    QuestComponent.prototype.getProgressPreQuests = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['PROGRESS_PRE_QUESTS'] !== 'undefined' ? this.specificcontent['PROGRESS_PRE_QUESTS'] : [];
    };
    QuestComponent.prototype.getUserQuest = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['USER_QUEST'] !== 'undefined' ? this.specificcontent['USER_QUEST'] : { completed: "0", ts_quest_completed: "" };
    };
    QuestComponent.prototype.getProgressTasks = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['PROGRESS_TASKS'] !== 'undefined' ? this.specificcontent['PROGRESS_TASKS'] : [];
    };
    QuestComponent.prototype.getProgressTasksArrayForView = function () {
        if ($.isEmptyObject(this.specificcontent) || typeof this.specificcontent['PROGRESS_TASKS'] === 'undefined')
            return [];
        var t_returnarray = [];
        for (var key in this.specificcontent['PROGRESS_TASKS']) {
            if (typeof this.getProgressTasks()[key] === 'object' && this.getProgressTasks()[key]["completed"] == true) {
                t_returnarray.push(this.getProgressTasks()[key]);
            }
            else if (typeof this.getProgressTasks()[key] === 'object') {
                t_returnarray.push(this.getProgressTasks()[key]);
                return t_returnarray;
            }
        }
        return t_returnarray;
    };
    QuestComponent.prototype.getTaskArrayForProgressTasksArrayKey = function (taskarraykey) {
        var t_taskarray = [];
        for (var key in this.getProgressTasks()[taskarraykey]) {
            if (typeof this.getProgressTasks()[key] === 'object') {
                t_taskarray.push(this.getProgressTasks()[taskarraykey][key]);
            }
        }
        return t_taskarray;
    };
    QuestComponent.prototype.navigateToQuest = function (quest_id) {
        this.router.navigate(['/l/quest', quest_id]);
    };
    QuestComponent.prototype.navigateToTask = function (task_id) {
        this.router.navigate(['/l/task', task_id]);
    };
    QuestComponent.prototype.navigateToBadge = function (badge_id) {
        this.router.navigate(['/l/badge', badge_id]);
    };
    QuestComponent.prototype.isQuestCompleted = function () {
        return typeof this.getUserQuest().completed !== 'undefined' && this.getUserQuest().completed == "1";
    };
    QuestComponent.prototype.getNumberOfCompletedLevels = function () {
        var t_completedlevels = 0;
        for (var key in this.getProgressTasks()) {
            if (typeof this.getProgressTasks()[key] === 'object') {
                if (this.getProgressTasks()[key]["completed"] == true) {
                    t_completedlevels++;
                }
                else {
                    return t_completedlevels;
                }
            }
        }
        return t_completedlevels;
    };
    return QuestComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], QuestComponent.prototype, "user", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], QuestComponent.prototype, "universalcontent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], QuestComponent.prototype, "quest_id", void 0);
QuestComponent = __decorate([
    core_1.Component({
        selector: 'quest-component',
        providers: [libgame_service_1.LibgameService],
        template: "\n\n<div class=\"row\">\n\n    <div class=\"col-xs-12\" style=\"padding:0;\">\n\n        <!-- Overview of quest -->\n        <div id=\"cf-qu-overview\" class=\"content-frame\">\n\n            <div class=\"content-quest-frame\" style=\"width: 100%!important;padding: 0!important;margin: 0!important;border-radius: 0;\">\n                <div style=\"width:100%;color:rgb(0,0,0);cursor:pointer;\">\n                    <div class=\"depend-on-device-left-to-none-float\" style=\"font-size:1.5em;font-weight:bold;text-decoration:underline;\">{{'Quest: '+getQuestData()?.questname}}</div>\n                    <div class=\"depend-on-device-right-to-none-float\" style=\"font-size:1.2em;margin-top:0.2em;\"><span style=\"font-size:1.2em;font-weight:bold;\">+{{getQuestData()?.score_rule}}</span> Exp.</div>\n                    <div style=\"clear:both;\"></div>\n                </div>\n            </div>\n\n            <div *ngIf=\"isQuestCompleted()\" style=\"width:100%;padding: 0!important;\">\n              <p class='headline' style=\"background:rgb(120,255,120);\">\n                  Du hast diesen Quest bereits gel\u00F6st.\n                  <br>\n                  Gel\u00F6st am: {{lService.getFormatedDate(getUserQuest().ts_quest_completed)}}\n              </p>\n            </div>\n\n\n\n            <div style=\"padding:1em 1em;width:100%;max-width:30em;margin-left:auto;margin-right:auto;\">\n\n                <div style=\"display:table;border-spacing:0 2px;width:100%;\">\n\n                    <div style=\"display:table-row;width:100%;background:#eeeeee;\">\n                        <div style=\"display:table-cell;vertical-align:middle;padding:5px;padding-left:0.5em;\">Erfahrung</div>\n                        <div style=\"display:table-cell;vertical-align:middle;padding:5px;text-align:right;\">+{{getQuestData()?.score_rule}}\n                          <span [hidden]=\"!isQuestCompleted()\" class='fa fa-check-square' style='color:rgb(0,150,0);background:transparent;'></span>\n                          <span [hidden]=\"isQuestCompleted()\" class='fa fa-minus-square' style='color:rgb(150,0,0);background:transparent;'></span>\n                        </div>\n                    </div>\n\n                    <div style=\"display:table-row;width:100%;\">\n                        <div style=\"display:table-cell;vertical-align:middle;padding:5px;padding-left:0.5em;\">Dein Fortschritt</div>\n                        <div style=\"display:table-cell;vertical-align:middle;padding:5px;text-align:right;\">\n                          <span style=\"color:green;\">{{getNumberOfCompletedLevels()}}</span> / {{getProgressTasks().length}}\n                        </div>\n                    </div>\n\n                    <div style=\"display:table-row;width:100%;background:#eeeeee;\">\n                        <div style=\"display:table-cell;vertical-align:middle;padding:5px;padding-left:0.5em;\">Deine gesammelten Exp.</div>\n                        <div style=\"display:table-cell;vertical-align:middle;padding:5px;text-align:right;color:green!important;\">\n                          +{{isQuestCompleted()?getQuestData()?.score_rule:'0'}}\n                        </div>\n                    </div>\n\n                    <div style=\"display:table-row;width:100%;\">\n                        <div style=\"display:table-cell;vertical-align:middle;padding:5px;padding-left:0.5em;\">Starterquest</div>\n                        <div style=\"display:table-cell;vertical-align:middle;padding:5px;text-align:right;\">\n                          {{getQuestData().is_starter_quest=='1'?'Yes':'No'}}\n                        </div>\n                    </div>\n\n\n                </div>\n\n\n                <div style=\"text-align:center;margin-top:0.5em;\">Ben\u00F6tigte Vorquests</div>\n\n                  <div [hidden]=\"getProgressPreQuests().length != 0\" id='cf-qu-overview-no-pre-quests' style='font-weight:bold;font-size:1em;color:rgb(0,0,0);margin-bottom:0.3em;margin-top:0.2em;'>Es werden keine Vorquests ben\u00F6tigt</div>\n\n                  <div *ngFor=\"let t_quest of getProgressPreQuests();\" id='cf-qu-overview-pre-quest' style='overflow:hidden;cursor:pointer;font-weight:bold;font-size:1.2em;color:rgb(255,255,255);border:0px solid rgb(0,0,0);border-radius:4px;padding:0.2em 0.3em;background:rgb(50,50,50);' (click)=\"navigateToQuest(t_quest.quest_id)\">\n                    {{t_quest.questname}}<br>\n                    <button [hidden]=\"!t_quest.completed\" class='fa fa-check-square' style='padding:0;font-size:1em;color:rgb(0,150,0);border:0;margin:0;background:transparent;margin-left:5px;float:right;'></button>\n                    <button [hidden]=\"t_quest.completed\" class='fa fa-minus-square' style='padding:0;font-size:1em;color:rgb(150,0,0);border:0;margin:0;background:transparent;margin-left:5px;float:right;'></button>\n                  </div>\n\n            </div>\n            <div style=\"clear:both;\"></div>\n\n        </div>\n\n\n        <div [hidden]=\"getQuestData().is_active=='1'\" class=\"content-frame\" >\n            <p class='headline' style=\"background:rgb(255,120,120);\">\n              Der Quest ist nicht l\u00E4nger aktiv\n            </p>\n        </div>\n\n        <div [hidden]=\"getQuestData().is_active!='1'\" id=\"cf-qu-quest-progress\" class=\"content-frame\">\n\n            <p class=\"headline\">Dein Fortschritt</p>\n\n\n            <div *ngFor=\"let t_tasklevelinfo of getProgressTasksArrayForView(); let i = index;\" class=\"cf-qu-quest-progress-step\"style=\"margin-top:1em;\">\n                <p class=\"cf-qu-quest-progress-step-headline\" style=\"text-align:center;width:100%;\">Stufe {{i+1}}/{{getProgressTasks().length}}\n\n                  <span class='fa'\n                    [class.fa-check-square]=\"t_tasklevelinfo.completed\"\n                    [class.fa-minus-square]=\"!t_tasklevelinfo.completed\"\n                    [style.color]=\"t_tasklevelinfo.completed?'rgb(0,150,0)':'rgb(150,0,0)'\" style='padding:0;font-size:1em;border:0;margin:0;background:transparent;margin-left:5px;'></span>\n                </p>\n\n                <div class=\"cf-qu-quest-progress-step-tasks\" style=\"padding:0 1.5em;\">\n                  <div *ngFor=\"let t_taskarray of getTaskArrayForProgressTasksArrayKey(i); let i_t = in\" (click)=\"navigateToTask(t_taskarray.task_id)\" class=\"content-task-frame\" style=\"width:100%;\">\n                      <div style=\"width:100%;color:rgb(0,0,0);cursor:pointer;\">\n                          <div style=\"float:left;\">Aufgabe: {{t_taskarray.taskname}}</div>\n                          <button class='fa fa-check-square'\n                          [class.fa-check-square]=\"t_taskarray.completed\"\n                          [class.fa-minus-square]=\"!t_taskarray.completed\"\n                          [style.color]=\"t_taskarray.completed?'rgb(20,100,20)!important':'rgb(100,20,20)!important'\" style='padding:0;font-size:1.5em!important;border:0;margin:0;background:transparent;margin-left:5px;float:right;'></button>\n                          <div style=\"clear:both;\"></div>\n                      </div>\n                  </div>\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n\n\n\n</div>\n\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, libgame_service_1.LibgameService])
], QuestComponent);
exports.QuestComponent = QuestComponent;
var _a;
//# sourceMappingURL=quest.component.js.map