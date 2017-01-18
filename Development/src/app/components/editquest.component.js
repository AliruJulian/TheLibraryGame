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
var EditQuestComponent = (function () {
    function EditQuestComponent(router, lService) {
        this.router = router;
        this.lService = lService;
        this.questdataoutput = new core_1.EventEmitter();
        this.reload = new core_1.EventEmitter();
        this.LevelsLength = 1;
    }
    EditQuestComponent.prototype.ngOnInit = function () {
        if (typeof this.questdata.quest_id === 'undefined' || this.questdata.quest_id == -1) {
            this.questdata = {
                quest_id: -1,
                de_DE: {
                    questname: "",
                    solved_description: ""
                },
                is_active: "1",
                json_pre_quest_ids: [],
                json_quest_task_ids: [[]],
                location_id: -1,
                is_starter_quest: "0",
                score_rule: "10"
            };
        }
        if (this.questdata.location_id == null) {
            this.questdata.location_id = -1;
        }
        this.LevelsLength = this.questdata.json_quest_task_ids.length;
    };
    EditQuestComponent.prototype.getUniversalContentPictures = function () {
        return !$.isEmptyObject(this.universalcontent) && typeof this.universalcontent['_Pictures'] !== 'undefined' ? this.universalcontent['_Pictures'] : [];
    };
    EditQuestComponent.prototype.changeQuestTaskLevelLength = function (event) {
        var t_value = parseInt(event.target.value);
        var t_diff = t_value - this.questdata.json_quest_task_ids.length;
        if (this.questdata.json_quest_task_ids.length > t_value) {
            for (var i = this.questdata.json_quest_task_ids.length; i > 0; i--) {
                if ((i - 1) >= t_value) {
                    this.questdata.json_quest_task_ids.splice(i - 1, 1);
                }
            }
        }
        else if (this.questdata.json_quest_task_ids.length < t_value) {
            for (var i = 0; i < t_diff; i++) {
                this.questdata.json_quest_task_ids.push([]);
            }
        }
    };
    EditQuestComponent.prototype.updateQuestData = function () {
        if (typeof this.questdata !== 'undefined')
            this.questdataoutput.emit(this.questdata);
    };
    return EditQuestComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditQuestComponent.prototype, "user", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditQuestComponent.prototype, "universalcontent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditQuestComponent.prototype, "questdata", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditQuestComponent.prototype, "allquestsdata", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditQuestComponent.prototype, "alltasksdata", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditQuestComponent.prototype, "locationsdata", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], EditQuestComponent.prototype, "questdataoutput", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], EditQuestComponent.prototype, "reload", void 0);
EditQuestComponent = __decorate([
    core_1.Component({
        selector: 'editquest-component',
        providers: [libgame_service_1.LibgameService],
        template: "\n\n      <div style=\"margin:0;padding:0;\" (focusout)=\"updateQuestData()\" (mouseleave)=\"updateQuestData()\">\n\n            <!-- questname -->\n            <hr class=\"hrForAdministration\">\n            <label style=\"width:100%;text-align:center;padding-left:0.5em;\"><span class=\"stepHelper\">1.) </span>Questname<span style=\"color:#e9266d\">*</span></label>\n            <br>\n            <input [(ngModel)]=\"questdata.de_DE.questname\" type=\"text\"  placeholder=\"Questname\" style=\"width:100%;\">\n            <hr class=\"hrForAdministration\">\n\n            <!-- solved_description -->\n            <label id=\"label-quest-solved-description\" style=\"width:100%;text-align:center;padding-left:0.5em;\"><span class=\"stepHelper\">2.) </span>Meldung, welche der User bei erfolgreichem L\u00F6sen erh\u00E4lt<span style=\"color:#e9266d\">*</span></label>\n            <br>\n            <htmleditor-component [value]=\"questdata.de_DE.solved_description\" [pictures]=\"getUniversalContentPictures()\" (htmlcontent)=\"questdata.de_DE.solved_description=$event;updateQuestData();\" (reload)=\"reload.emit(true);\"></htmleditor-component>\n            <hr class=\"hrForAdministration\">\n\n            <!-- Location of quest -->\n            <label style=\"width:100%;text-align:center;padding-left:0.5em;\"><span class=\"stepHelper\">3.) </span>Fundort des Quests</label>\n            <br>\n            <select [(ngModel)]=\"questdata.location_id\" style=\"width:100%;\">\n                <option value='-1' selected=\"selected\">--None--</option>\n                <option *ngFor=\"let t_location of locationsdata;\" value='{{t_location.location_id}}'>-- {{t_location.locationname}} --</option>\n            </select>\n            <hr class=\"hrForAdministration\">\n\n            <!-- pre quests -->\n            <label style=\"width:100%;text-align:center;padding-left:0.5em;\"><span class=\"stepHelper\">4.) </span>Vorquests, um Quest zu erhalten und l\u00F6sen zu k\u00F6nnen</label>\n            <br>\n            <selectquest-component [chooseablequestarray]=\"allquestsdata\" [selectedquestarray]=\"questdata.json_pre_quest_ids\" (questarray)=\"questdata.json_pre_quest_ids=$event;updateQuestData();\"></selectquest-component>\n            <hr class=\"hrForAdministration\">\n\n            <!-- levels with to solve tasks -->\n            <div >\n                <label style=\"width:100%;text-align:center;padding-left:0.5em;\"><span class=\"stepHelper\">5.) </span>Anzahl der Aufgabenstufen und Aufgaben f\u00FCr jede Stufe<span style=\"color:#e9266d\">*</span></label>\n                <br>\n                <select [(ngModel)]=\"LevelsLength\" (change)=\"changeQuestTaskLevelLength($event)\" style=\"width:100%;\">\n                    <option value=\"1\">1 Level</option>\n                    <option value=\"2\">2 Levels</option>\n                    <option value=\"3\">3 Levels</option>\n                    <option value=\"4\">4 Levels</option>\n                    <option value=\"5\">5 Levels</option>\n                    <option value=\"6\">6 Levels</option>\n                    <option value=\"7\">7 Levels</option>\n                    <option value=\"8\">8 Levels</option>\n                    <option value=\"9\">9 Levels</option>\n                    <option value=\"10\">10 Levels</option>\n                </select>\n                <div>\n\n                    <div *ngFor=\"let t_level of questdata.json_quest_task_ids;let i = index;\" class=\"add-quest-tasks-level-1\" style=\"width:calc(100% - 10px);border:1px solid rgb(200,200,200);margin-left:10px;margin-bottom:5px;padding:3px;\">\n                        <label style=\"width:100%;text-align:center;padding-left:0.5em;\"><span class=\"stepHelper\">{{i+1}}.) </span>Aufgaben f\u00FCr Stufe {{i+1}}</label>\n                        <selecttask-component [chooseabletaskarray]=\"alltasksdata\" [selectedtaskarray]=\"questdata.json_quest_task_ids[i]\" (taskarray)=\"questdata.json_quest_task_ids[i]=$event;updateQuestData();\"></selecttask-component>\n                    </div>\n\n                </div>\n            </div>\n            <hr class=\"hrForAdministration\">\n\n            <!-- score rule -->\n            <label style=\"width:100%;text-align:center;padding-left:0.5em;\"><span class=\"stepHelper\">6.) </span>Exp. f\u00FCr User bei Abschluss des Quests<span style=\"color:#e9266d\">*</span></label>\n            <br>\n            <input [(ngModel)]=\"questdata.score_rule\" type=\"text\" style=\"width:100%;padding-left:0.3em;\">\n            <hr class=\"hrForAdministration\">\n\n            <!-- is starter quest? -->\n            <label style=\"width:100%;text-align:center;padding-left:0.5em;\"><span class=\"stepHelper\">7.) </span>Ist der Quest schon bei Spielbeginn dem User bekannt</label>\n            <br>\n            <input [checked]=\"questdata.is_starter_quest=='1'\" (click)=\"questdata.is_starter_quest=='1'?questdata.is_starter_quest='0':questdata.is_starter_quest='1';\" type=\"checkbox\" style=\"width:25px;margin-left:48%;\" />\n\n        </div>\n\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, libgame_service_1.LibgameService])
], EditQuestComponent);
exports.EditQuestComponent = EditQuestComponent;
var _a;
//# sourceMappingURL=editquest.component.js.map