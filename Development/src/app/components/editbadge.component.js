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
var EditBadgeComponent = (function () {
    function EditBadgeComponent(router, lService) {
        this.router = router;
        this.lService = lService;
        this.badgedataoutput = new core_1.EventEmitter();
        this.reload = new core_1.EventEmitter();
    }
    EditBadgeComponent.prototype.ngOnInit = function () {
        if (typeof this.badgedata.badge_id === 'undefined' || this.badgedata.badge_id == -1) {
            this.badgedata = {
                de_DE: {
                    badgename: "",
                    description_long: "",
                    solved_description: ""
                },
                badge_id: -1,
                is_active: "1",
                json_task_ids: [],
                picture_id: -1
            };
        }
    };
    EditBadgeComponent.prototype.getUniversalContentPictures = function () {
        return !$.isEmptyObject(this.universalcontent) && typeof this.universalcontent['_Pictures'] !== 'undefined' ? this.universalcontent['_Pictures'] : [];
    };
    EditBadgeComponent.prototype.updateBadgeData = function () {
        if (typeof this.badgedata !== 'undefined')
            this.badgedataoutput.emit(this.badgedata);
    };
    return EditBadgeComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditBadgeComponent.prototype, "user", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditBadgeComponent.prototype, "universalcontent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditBadgeComponent.prototype, "badgedata", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditBadgeComponent.prototype, "alltasksdata", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], EditBadgeComponent.prototype, "badgedataoutput", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], EditBadgeComponent.prototype, "reload", void 0);
EditBadgeComponent = __decorate([
    core_1.Component({
        selector: 'editbadge-component',
        providers: [libgame_service_1.LibgameService],
        template: "\n\n  <div style=\"margin:0;padding:0;\" (focusout)=\"updateBadgeData()\" (mouseleave)=\"updateBadgeData()\">\n\n    <!-- badgename, Description of badge -->\n    <div>\n        <div style=\"float:left;width:100%;\">\n            <hr class=\"hrForAdministration\">\n            <label style=\"width:100%;text-align:center;padding-left:0.5em;\"><span class=\"stepHelper\">1.) </span>Abzeichenname<span style=\"color:#e9266d\">*</span></label>\n            <br>\n            <input [(ngModel)]=\"badgedata.de_DE.badgename\" type=\"text\" placeholder=\"Abzeichenname\" style=\"width:100%;\"/>\n            <hr class=\"hrForAdministration\">\n            <label style=\"width:100%;text-align:center;padding-left:0.5em;\"><span class=\"stepHelper\">2.) </span>Beschreibung des Abzeichens<span style=\"color:#e9266d\">*</span></label>\n            <br>\n            <htmleditor-component [value]=\"badgedata.de_DE.description_long\" [pictures]=\"getUniversalContentPictures()\" (htmlcontent)=\"badgedata.de_DE.description_long=$event;updateBadgeData();\" (reload)=\"reload.emit(true);\"></htmleditor-component>\n            <hr class=\"hrForAdministration\">\n            <label style=\"width:100%;text-align:center;padding-left:0.5em;\"><span class=\"stepHelper\">3.) </span>Meldung, welche der User bei erfolgreichem L\u00F6sen erh\u00E4lt<span style=\"color:#e9266d\">*</span></label>\n            <br>\n            <htmleditor-component [value]=\"badgedata.de_DE.solved_description\" [pictures]=\"getUniversalContentPictures()\" (htmlcontent)=\"badgedata.de_DE.solved_description=$event;updateBadgeData();\" (reload)=\"reload.emit(true);\"></htmleditor-component>\n            <hr class=\"hrForAdministration\">\n        </div>\n        <div style=\"clear:both;margin:0;height:0;\"></div>\n    </div>\n\n    <!-- To solve tasks for badge -->\n    <label style=\"width:100%;text-align:center;padding-left:0.5em;\"><span class=\"stepHelper\">4.) </span>Zu l\u00F6sende Aufgaben, um Abzeichen zu sammeln<span style=\"color:#e9266d\">*</span></label>\n    <br>\n    <selecttask-component [chooseabletaskarray]=\"alltasksdata\" [selectedtaskarray]=\"badgedata.json_task_ids\" (taskarray)=\"badgedata.json_task_ids=$event;\"></selecttask-component>\n    <hr class=\"hrForAdministration\">\n\n    <!-- badge pic -->\n    <label style=\"width:100%;text-align:center;padding-left:0.5em;\"><span class=\"stepHelper\">5.) </span>Abzeichenbild<span style=\"color:#e9266d\">*</span></label>\n    <br>\n    <div >\n        <div style=\"float:left;width:50%;margin-top:10px;\">\n            <select [(ngModel)]=\"badgedata.picture_id\" style=\"width:100%;\">\n                <option *ngFor=\"let t_picture of getUniversalContentPictures();\" value='{{t_picture.picture_id}}'>{{t_picture.picturename}}</option>\n            </select>\n        </div>\n        <div style=\"float:left;width:50%;text-align:right;\">\n            <uploadpicture-component (reload)=\"reload.emit(true);\"></uploadpicture-component>\n        </div>\n        <div style=\"clear:both;margin:0;height:0;\"></div>\n        <div [hidden]=\"badgedata.picture_id==-1\" style=\"text-align:center;\">\n            <label style=\"width:100%;text-align:center;\">Abzeichen Vorschau</label>\n            <br>\n            <img style='width:30%;' src='{{lService.getPictureLink(badgedata.picture_id)}}'>\n        </div>\n    </div>\n\n  </div>\n\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, libgame_service_1.LibgameService])
], EditBadgeComponent);
exports.EditBadgeComponent = EditBadgeComponent;
var _a;
//# sourceMappingURL=editbadge.component.js.map