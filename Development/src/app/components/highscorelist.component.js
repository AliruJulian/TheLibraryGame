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
var HighscorelistComponent = (function () {
    function HighscorelistComponent(router, lService) {
        this.router = router;
        this.lService = lService;
        this.specificcontent = [];
        this.loading_specificcontent = true;
        this.number_of_shown_users_per_page = 20;
    }
    HighscorelistComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Specific Content
        this.loading_specificcontent = true;
        this.lService.specificcontent$.subscribe(function (specificcontent) {
            _this.specificcontent = specificcontent;
            _this.loading_specificcontent = false;
        });
        this.lService.loadSpecificContent('highscorelist');
    };
    HighscorelistComponent.prototype.getRankedHighscoreListArray = function () {
        return typeof this.specificcontent !== 'undefined' ? this.specificcontent : [];
    };
    HighscorelistComponent.prototype.getCurrentShownUsers = function () {
        return this.getRankedHighscoreListArray().slice(this.highscorepage * this.number_of_shown_users_per_page, (this.highscorepage + 1) * this.number_of_shown_users_per_page);
    };
    HighscorelistComponent.prototype.getArrayTotalNumberOfHighscorePages = function () {
        var t_return = [];
        for (var i = 0; i < Math.ceil(this.getRankedHighscoreListArray().length / this.number_of_shown_users_per_page); i++)
            t_return.push(i);
        return t_return;
    };
    return HighscorelistComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HighscorelistComponent.prototype, "user", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HighscorelistComponent.prototype, "universalcontent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HighscorelistComponent.prototype, "highscorepage", void 0);
HighscorelistComponent = __decorate([
    core_1.Component({
        selector: 'highscorelist-component',
        providers: [libgame_service_1.LibgameService],
        template: "\n\n  <div class=\"row\">\n\n      <div class=\"col-xs-12\" style=\"padding:0;\">\n\n          <div id=\"cf-hi-highscore-list\" class=\"content-frame\">\n\n              <p class=\"headline\">Highscore</p>\n\n              <div style=\"display:table;width:100%;border-spacing:2px 2px;color:rgb(255,255,255);\">\n\n                  <div style='display:table-row;width:100%;'>\n\n                      <div style='display:table-cell;vertical-align:top;'>\n                          <p style=\"font-size:1.3em;font-weight:bold;text-align:center;text-decoration:underline;\">Rang</p>\n                      </div>\n                      <div style='display:table-cell;vertical-align:top;'>\n                          <p style=\"font-size:1.3em;font-weight:bold;text-align:center;text-decoration:underline;\">Name</p>\n                      </div>\n                      <div style='display:table-cell;vertical-align:top;'>\n                          <p style=\"font-size:1.3em;font-weight:bold;text-align:center;text-decoration:underline;\">Exp.</p>\n                      </div>\n                      <div style='display:table-cell;vertical-align:top;'>\n                          <p style=\"font-size:1.3em;font-weight:bold;text-align:center;text-decoration:underline;\">Fak.</p>\n                      </div>\n\n                  </div>\n\n                  <div *ngFor=\"let t_user of getCurrentShownUsers();\" [style.background]=\"t_user.user_id==user.user_id?'#990000':'inherit'\" style='display:table-row;vertical-align:top;'>\n                      <div style='display:table-cell;vertical-align:top;'>\n                          <p style='font-size:1.3em;text-align:center;'>{{t_user.ranking}}</p>\n                      </div>\n                      <div style='display:table-cell;vertical-align:top;'>\n                          <p style='font-size:1em;text-align:center;'>{{t_user.username}}</p>\n                      </div>\n                      <div style='display:table-cell;vertical-align:top;'>\n                          <p style='font-size:1.1em;text-align:center;'>{{t_user.user_score}}</p>\n                      </div>\n                      <div style='display:table-cell;vertical-align:top;'>\n                          <p style='font-size:1em;text-align:center;'>{{t_user.facultyname}}</p>\n                      </div>\n                  </div>\n\n\n\n              </div>\n\n              <!-- Navigation Highscore List -->\n\n              <div style=\"width:95%;margin-top:20px;margin-bottom:0.3em;margin-left:auto;margin-right:auto;\">\n\n                <div *ngFor=\"let t_pageid of getArrayTotalNumberOfHighscorePages()\"\n                  [class.cf-hi-nav-item-unselected]=\"t_pageid!=highscorepage\"\n                  [class.cf-hi-nav-item]=\"t_pageid==highscorepage\"\n                  (click)=\"highscorepage=t_pageid;\"\n                  style='float:left;margin-right:2px;padding:10px 15px;border:1px solid black;'>{{t_pageid+1}}</div>\n\n                <div style=\"clear:both;\"></div>\n              </div>\n\n          </div>\n\n      </div>\n\n\n\n  </div>\n\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, libgame_service_1.LibgameService])
], HighscorelistComponent);
exports.HighscorelistComponent = HighscorelistComponent;
var _a;
//# sourceMappingURL=highscorelist.component.js.map