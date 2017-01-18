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
var core_1 = require('@angular/core');
var SelectQuestComponent = (function () {
    function SelectQuestComponent() {
        this.shown = false;
        this.questarray = new core_1.EventEmitter();
    }
    SelectQuestComponent.prototype.ngOnInit = function () {
        this.initialselectedquestarray = this.selectedquestarray.slice(0);
    };
    SelectQuestComponent.prototype.toggleChosenQuest = function (quest_id) {
        if (this.selectedquestarray.indexOf(quest_id) > -1) {
            this.selectedquestarray.splice(this.selectedquestarray.indexOf(quest_id), 1);
        }
        else {
            this.selectedquestarray.push(quest_id);
        }
    };
    SelectQuestComponent.prototype.finalizeSelection = function () {
        this.shown = false;
        this.questarray.emit(this.selectedquestarray);
    };
    SelectQuestComponent.prototype.finalizeSelectionAbort = function () {
        this.shown = false;
        this.questarray.emit(this.initialselectedquestarray);
    };
    SelectQuestComponent.prototype.getNameOfQuestFromQuestId = function (quest_id) {
        for (var key in this.chooseablequestarray) {
            if (!this.isUndefined(this.chooseablequestarray[key].de_DE) &&
                !this.isUndefined(this.chooseablequestarray[key].de_DE.questname) &&
                !this.isUndefined(this.chooseablequestarray[key].quest_id) &&
                this.chooseablequestarray[key].quest_id + "" == "" + quest_id)
                return this.chooseablequestarray[key].de_DE.questname;
        }
        return "";
    };
    SelectQuestComponent.prototype.isUndefined = function (value) {
        return typeof value === 'undefined';
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SelectQuestComponent.prototype, "chooseablequestarray", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SelectQuestComponent.prototype, "selectedquestarray", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SelectQuestComponent.prototype, "questarray", void 0);
    SelectQuestComponent = __decorate([
        core_1.Component({
            selector: 'selectquest-component',
            template: "\n\n\n    <div *ngIf=\"shown\" style=\"position:fixed;left:0%;top:0%;background:rgba(0,0,0,0.4);width:100%;height:100%;z-index:1000000;\">\n      <div style=\"position:absolute;left:5%;top:5%;background:white;border:solid 1px gray;color:black;width:90%;height:90%;\">\n        <p style=\"padding:10px;width:100%;text-align:center;\">W\u00E4hle durch Anklicken die Quests aus</p>\n\n        <div style=\"height:calc(90% - 80px);margin:10px;padding:10px;overflow-y:scroll;\">\n          <div *ngFor=\"let t_quest of chooseablequestarray\"\n              (click)=\"toggleChosenQuest(t_quest.quest_id);\"\n              [style.background]=\"selectedquestarray.indexOf(t_quest.quest_id) > -1?'rgb(230,230,230)':'rgb(255,255,255)'\"\n              style=\"border:1px solid black;margin:2px 10px;cursor:pointer;\">\n            <p style=\"margin:0;padding:0.2em;font-size:1em;font-weight:bold;\">\n              {{!isUndefined(t_quest.questname)? t_quest.questname : (!isUndefined(t_quest.de_DE) ? t_quest.de_DE.questname : '')}}\n            </p>\n          </div>\n        </div>\n\n        <button (click)=\"finalizeSelection();\" class=\"button\" style=\"width:60%;margin-left:5%;\">Beende die Auswahl</button>\n        <button (click)=\"finalizeSelectionAbort();\" class=\"button\" style=\"width:25%;margin-left:5%;\">Abbrechen</button>\n      </div>\n    </div>\n\n    <div>\n      <div *ngFor=\"let t_quest_id of selectedquestarray\"\n          style=\"border:1px solid black;margin:2px 0px;background:rgb(230,230,230);\">\n        <p style=\"margin:0;padding:0.2em;font-size:1em;font-weight:bold;\">{{getNameOfQuestFromQuestId(t_quest_id)}}</p>\n      </div>\n    </div>\n\n    <button class=\"button\" (click)=\"shown=true;\" style=\"width:initial;\">\n      Hinzuf\u00FCgen/Entfernen von Vorquests\n    </button>\n\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], SelectQuestComponent);
    return SelectQuestComponent;
}());
exports.SelectQuestComponent = SelectQuestComponent;
//# sourceMappingURL=selectquest.component.js.map