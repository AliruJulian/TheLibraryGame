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
var SolvedOverlayComponent = (function () {
    function SolvedOverlayComponent(router, lService) {
        this.router = router;
        this.lService = lService;
        //type: 1: Task, 2: Badge, 3: Quest, 4: Other
        //name:
        //score_rule:
        //faculty_score_rule:
        //solved_description:
        //solved_quests:
        //solved_badges:
        this.closeOverlay = new core_1.EventEmitter();
        this.stars = [];
    }
    SolvedOverlayComponent.prototype.ngOnInit = function () {
        this.stars = [
            { show: false, opacity: 1 },
            { show: false, opacity: 1 },
            { show: false, opacity: 1 },
            { show: false, opacity: 1 },
            { show: false, opacity: 1 }
        ];
        this.animateStar(0);
        this.animateStar(1);
        this.animateStar(2);
        this.animateStar(3);
        this.animateStar(4);
    };
    SolvedOverlayComponent.prototype.getType = function () {
        return typeof this.solveddata["type"] !== 'undefined' ? this.solveddata["type"] : -1;
    };
    SolvedOverlayComponent.prototype.getName = function () {
        return typeof this.solveddata["name"] !== 'undefined' ? this.solveddata["name"] : "";
    };
    SolvedOverlayComponent.prototype.getSolvedDescription = function () {
        return typeof this.solveddata["solved_description"] !== 'undefined' ? this.solveddata["solved_description"] : "";
    };
    SolvedOverlayComponent.prototype.getScoreRule = function () {
        return typeof this.solveddata["score_rule"] !== 'undefined' ? this.solveddata["score_rule"] : "";
    };
    SolvedOverlayComponent.prototype.getFacultyScoreRule = function () {
        return typeof this.solveddata["faculty_score_rule"] !== 'undefined' ? this.solveddata["faculty_score_rule"] : "";
    };
    SolvedOverlayComponent.prototype.getSolvedQuests = function () {
        return typeof this.solveddata["solved_quests"] !== 'undefined' ? this.solveddata["solved_quests"] : "";
    };
    SolvedOverlayComponent.prototype.getSolvedBadges = function () {
        return typeof this.solveddata["solved_badges"] !== 'undefined' ? this.solveddata["solved_badges"] : "";
    };
    //Show Helper Functions
    SolvedOverlayComponent.prototype.animateStar = function (starindex) {
        var _this = this;
        var randomNumber1 = 0;
        this.stars[starindex].opacity = 0.5 + Math.random() * 0.5;
        if (this.stars[starindex].show == false) {
            this.stars[starindex].show = true;
            randomNumber1 = Math.random() * 500;
        }
        else {
            this.stars[starindex].show = false;
            randomNumber1 = Math.random() * 3500;
        }
        setTimeout(function (s_index) { _this.animateStar(s_index); }, randomNumber1, starindex);
    };
    return SolvedOverlayComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SolvedOverlayComponent.prototype, "user", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SolvedOverlayComponent.prototype, "universalcontent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SolvedOverlayComponent.prototype, "solveddata", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SolvedOverlayComponent.prototype, "closeOverlay", void 0);
SolvedOverlayComponent = __decorate([
    core_1.Component({
        selector: 'solvedoverlay-component',
        providers: [libgame_service_1.LibgameService],
        template: "\n\n        <div class=\"overlay\" style=\"display: block;\">\n          <div class=\"overlay_lightbox\" style=\"height: auto;\">\n            <div class=\"overlay_buttons\" style=\"text-align: right;\">\n              <div class=\"button\" (click)=\"closeOverlay.emit(true);\" style=\"width: 50px; float: right; margin-right: 5px; margin-top: 5px;text-align: center;\">X</div>\n            </div>\n            <div class=\"overlay_content\">\n              <div style=\"position:relative;\">\n                <img class=\"star-1\" [hidden]=\"stars[0].show==false\" [style.opacity]=\"stars[0].opacity\" src=\"./../public/images/star1.png\" style=\"width: 50px; height: 50px;\">\n                <img class=\"star-2\" [hidden]=\"stars[1].show==false\" [style.opacity]=\"stars[1].opacity\" src=\"./../public/images/star1.png\" style=\"width: 50px; height: 50px;\">\n                <img class=\"star-3\" [hidden]=\"stars[2].show==false\" [style.opacity]=\"stars[2].opacity\" src=\"./../public/images/star1.png\" style=\"width: 50px; height: 50px;\">\n                <img class=\"star-4\" [hidden]=\"stars[3].show==false\" [style.opacity]=\"stars[3].opacity\" src=\"./../public/images/star2.png\" style=\"width: 50px; height: 50px;\">\n                <img class=\"star-5\" [hidden]=\"stars[4].show==false\" [style.opacity]=\"stars[4].opacity\" src=\"./../public/images/star2.png\" style=\"width: 50px; height: 50px;\">\n              </div>\n              <p class=\"headline\" style=\"font-size:1.4em!important;font-weight:bold!important;width:90%;margin-left:auto;margin-right:auto;padding-top:1em;text-align:center;\">\n                {{getName()}}\n              </p>\n              <p [hidden]=\"getType() != 1 && getType() != 3\" class=\"headline2\" style=\"width:90%;margin-left:auto;margin-right:auto;text-align:center;\">\n                Deine Erfahrung: +{{getScoreRule()}} EXP. <br>\n                Fakult\u00E4tsscore: +{{getFacultyScoreRule()}} EXP.\n              </p>\n              <div [innerHTML]=\"getSolvedDescription()\" [style.padding-bottom]=\"getSolvedQuests().length == 0 && getSolvedBadges().length == 0? '50px':'10px'\" style=\"width:90%;margin-left:auto;margin-right:auto;\">\n              </div>\n              <div [hidden]=\"getSolvedQuests().length == 0\" [style.padding-bottom]=\"getSolvedBadges().length == 0? '50px':'10px'\" style=\"width:90%;margin-left:auto;margin-right:auto;\">\n                Damit hast du folgende Quests ebenfalls abgeschlossen:<br />\n                <div [innerHTML]=\"getSolvedQuests()\"></div>\n              </div>\n              <div [hidden]=\"getSolvedBadges().length == 0\" style=\"width:90%;margin-left:auto;margin-right:auto;padding-bottom:50px;\">\n                Damit hast du folgende Abzeichen ebenfalls erhalten:<br />\n                <div [innerHTML]=\"getSolvedBadges()\"></div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, libgame_service_1.LibgameService])
], SolvedOverlayComponent);
exports.SolvedOverlayComponent = SolvedOverlayComponent;
var _a;
//# sourceMappingURL=solvedoverlay.component.js.map