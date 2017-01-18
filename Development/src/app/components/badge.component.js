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
var BadgeComponent = (function () {
    function BadgeComponent(router, lService) {
        this.router = router;
        this.lService = lService;
        this.specificcontent = {};
        this.loading_specificcontent = true;
    }
    BadgeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading_specificcontent = true;
        this.lService.specificcontent$.subscribe(function (specificcontent) {
            _this.specificcontent = specificcontent;
            _this.loading_specificcontent = false;
        });
        if (typeof this.badge_id === 'string' && this.badge_id.length != 0)
            this.lService.loadSpecificContent('badge&badge_id=' + this.badge_id);
    };
    BadgeComponent.prototype.ngOnChanges = function (changes) {
        for (var propName in changes) {
            var changedProp = changes[propName];
            var from = changedProp.previousValue;
            var to = changedProp.currentValue;
            if (propName == "badge_id" && from != to) {
                this.lService.loadSpecificContent('badge&badge_id=' + to);
            }
        }
    };
    BadgeComponent.prototype.getBadgeData = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['BADGE_DATA'] !== 'undefined' ? this.specificcontent['BADGE_DATA'] : {
            badgename: "",
            description_long: ""
        };
    };
    BadgeComponent.prototype.getUserBadge = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['USER_BADGE'] !== 'undefined' ? this.specificcontent['USER_BADGE'] : {
            completed: '0'
        };
    };
    BadgeComponent.prototype.getProgressTasks = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['PROGRESS_TASKS'] !== 'undefined' ? this.specificcontent['PROGRESS_TASKS'] : [];
    };
    BadgeComponent.prototype.navigateToQuest = function (quest_id) {
        this.router.navigate(['/l/quest', quest_id]);
    };
    BadgeComponent.prototype.navigateToTask = function (task_id) {
        this.router.navigate(['/l/task', task_id]);
    };
    BadgeComponent.prototype.navigateToBadge = function (badge_id) {
        this.router.navigate(['/l/badge', badge_id]);
    };
    return BadgeComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BadgeComponent.prototype, "user", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BadgeComponent.prototype, "universalcontent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BadgeComponent.prototype, "badge_id", void 0);
BadgeComponent = __decorate([
    core_1.Component({
        selector: 'badge-component',
        providers: [libgame_service_1.LibgameService],
        template: "\n\n  <div class=\"row\">\n\n      <div class=\"col-xs-12\" style=\"padding:0;\">\n\n          <!-- Overview of badge -->\n          <div id=\"cf-ba-overview\" class=\"content-frame\">\n\n              <p class=\"headline\">Abzeichen {{getBadgeData().badgename}}</p>\n\n              <div class=\"depend-on-device-fifty-to-hundred-percentage-width depend-on-device-left-to-none-float\" style=\"padding:0 1em;\">\n                  <div id=\"cf-ba-overview-badge-pic\" style=\"width:40%;margin-left:auto;margin-right:auto;\">\n                      <div style='position:relative;'>\n                          <img style='position:relative;top:0;left:0;width:100%;' src='{{lService.getPictureLink(getBadgeData().picture_id)}}'>\n                          <div class='fa'\n                            [class.fa-check-square]=\"getUserBadge().completed=='1'\"\n                            [class.fa-minus-square]=\"getUserBadge().completed=='0'\" style='position:absolute;right:0;margin:0.3em;font-size:2em!important;color:white;'></div>\n                      </div>\n                  </div>\n\n                  <p id=\"cf-ba-overview-badge-description\" style=\"text-align:justify;\" [innerHTML]=\"getBadgeData().description_long\"></p>\n              </div>\n              <div class=\"depend-on-device-fifty-to-hundred-percentage-width depend-on-device-left-to-none-float\" style=\"padding:0 1em;\">\n                  <div style=\"text-align:center;margin-top:0.3em;margin-bottom:0.5em;\">Ben\u00F6tigte Aufgaben um Abzeichen zu sammeln</div>\n                  <div *ngFor=\"let t_task of getProgressTasks()\" class='cf-ba-overview-task' style='overflow:hidden;cursor:pointer;font-weight:bold;font-size:1em;color:rgb(255,255,255);border:0px solid rgb(0,0,0);border-radius:4px;padding:0.2em 0.3em;background:rgb(50,50,50);margin-top:2px;margin-bottom:2px;' (click)=\"navigateToTask(t_task.task_id)\">\n                    {{t_task.taskname}} <br />\n                    <button class='fa'\n                      [class.fa-check-square]=\"t_task.completed=='1'\"\n                      [class.fa-minus-square]=\"t_task.completed=='0'\"\n                      [style.color]=\"t_task.completed=='1'?'rgb(0,150,0)':'rgb(150,0,0)'\" style='padding:0;font-size:1em;border:0;margin:0;background:transparent;margin-left:5px;float:right;'></button>\n\n                  </div>\n              </div>\n              <div style=\"clear:both;\"></div>\n\n          </div>\n\n\n      </div>\n\n\n\n  </div>\n\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, libgame_service_1.LibgameService])
], BadgeComponent);
exports.BadgeComponent = BadgeComponent;
var _a;
//# sourceMappingURL=badge.component.js.map