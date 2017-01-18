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
var SelectTaskComponent = (function () {
    function SelectTaskComponent() {
        this.shown = false;
        this.taskarray = new core_1.EventEmitter();
    }
    SelectTaskComponent.prototype.ngOnInit = function () {
        this.initialselectedtaskarray = this.selectedtaskarray.slice(0);
    };
    SelectTaskComponent.prototype.toggleChosenTask = function (task_id) {
        if (this.selectedtaskarray.indexOf(task_id) > -1) {
            this.selectedtaskarray.splice(this.selectedtaskarray.indexOf(task_id), 1);
        }
        else {
            this.selectedtaskarray.push(task_id);
        }
    };
    SelectTaskComponent.prototype.finalizeSelection = function () {
        this.shown = false;
        this.taskarray.emit(this.selectedtaskarray);
    };
    SelectTaskComponent.prototype.finalizeSelectionAbort = function () {
        this.shown = false;
        this.taskarray.emit(this.initialselectedtaskarray);
    };
    SelectTaskComponent.prototype.getNameOfTaskFromTaskId = function (task_id) {
        for (var key in this.chooseabletaskarray) {
            if (!this.isUndefined(this.chooseabletaskarray[key].de_DE) &&
                !this.isUndefined(this.chooseabletaskarray[key].de_DE.taskname) &&
                !this.isUndefined(this.chooseabletaskarray[key].task_id) &&
                this.chooseabletaskarray[key].task_id + "" == "" + task_id)
                return this.chooseabletaskarray[key].de_DE.taskname;
        }
        return "";
    };
    SelectTaskComponent.prototype.isUndefined = function (value) {
        return typeof value === 'undefined';
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SelectTaskComponent.prototype, "chooseabletaskarray", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SelectTaskComponent.prototype, "selectedtaskarray", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SelectTaskComponent.prototype, "taskarray", void 0);
    SelectTaskComponent = __decorate([
        core_1.Component({
            selector: 'selecttask-component',
            template: "\n\n\n  <div *ngIf=\"shown\" style=\"position:fixed;left:0%;top:0%;background:rgba(0,0,0,0.4);width:100%;height:100%;z-index:1000000;\">\n    <div style=\"position:absolute;left:5%;top:5%;background:white;border:solid 1px gray;color:black;width:90%;height:90%;\">\n      <p style=\"padding:10px;width:100%;text-align:center;\">W\u00E4hle durch Anklicken die Aufgaben aus</p>\n\n      <div style=\"height:calc(90% - 80px);margin:10px;padding:10px;overflow-y:scroll;\">\n        <div *ngFor=\"let t_task of chooseabletaskarray\"\n            (click)=\"toggleChosenTask(t_task.task_id);\"\n            [style.background]=\"selectedtaskarray.indexOf(t_task.task_id) > -1?'rgb(230,230,230)':'rgb(255,255,255)'\"\n            style=\"border:1px solid black;margin:2px 10px;cursor:pointer;\">\n          <p style=\"margin:0;padding:0.2em;font-size:1em;font-weight:bold;\">{{!isUndefined(t_task.taskname)? t_task.taskname : (!isUndefined(t_task.de_DE) ? t_task.de_DE.taskname : '')}}</p>\n        </div>\n      </div>\n\n      <button (click)=\"finalizeSelection();\" class=\"button\" style=\"width:60%;margin-left:5%;\">Beende die Auswahl</button>\n      <button (click)=\"finalizeSelectionAbort();\" class=\"button\" style=\"width:25%;margin-left:5%;\">Abbrechen</button>\n    </div>\n  </div>\n\n  <div>\n    <div *ngFor=\"let t_task_id of selectedtaskarray\"\n        style=\"border:1px solid black;margin:2px 0px;background:rgb(230,230,230);\">\n      <p style=\"margin:0;padding:0.2em;font-size:1em;font-weight:bold;\">{{getNameOfTaskFromTaskId(t_task_id)}}</p>\n    </div>\n  </div>\n\n  <button class=\"button\" (click)=\"shown=true;\" style=\"width:initial;\">\n    Hinzuf\u00FCgen/Entfernen von Aufgaben\n  </button>\n\n\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], SelectTaskComponent);
    return SelectTaskComponent;
}());
exports.SelectTaskComponent = SelectTaskComponent;
//# sourceMappingURL=selecttask.component.js.map