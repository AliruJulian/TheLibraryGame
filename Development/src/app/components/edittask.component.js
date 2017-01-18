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
var EditTaskComponent = (function () {
    function EditTaskComponent(router, lService) {
        this.router = router;
        this.lService = lService;
        this.taskdataoutput = new core_1.EventEmitter();
        this.reload = new core_1.EventEmitter();
    }
    EditTaskComponent.prototype.ngOnInit = function () {
        console.log("EditTask Init");
        if (typeof this.taskdata.task_id === 'undefined' || this.taskdata.task_id == -1) {
            this.taskdata = {
                task_id: -1,
                task_type_id: 1,
                json_task_data: {},
                de_DE: {
                    taskname: "",
                    description_long: "",
                    solved_description: ""
                },
                is_task_active: "1",
                score_rule: "10",
                location_id: -1
            };
            this.changeTaskType();
        }
        if (typeof this.taskdata.location_id !== 'undefined' && this.taskdata.location_id == null)
            this.taskdata.location_id = -1;
        console.log(this.taskdata.de_DE);
        console.log(this.taskdata);
    };
    EditTaskComponent.prototype.getUniversalContentPictures = function () {
        return !$.isEmptyObject(this.universalcontent) && typeof this.universalcontent['_Pictures'] !== 'undefined' ? this.universalcontent['_Pictures'] : [];
    };
    EditTaskComponent.prototype.changeTaskType = function () {
        if (this.taskdata.task_type_id == 1) {
            this.taskdata.json_task_data = { de_DE: { a1: "", a2: "", a3: "", a4: "", question: "" } };
        }
        else if (this.taskdata.task_type_id == 2) {
            this.taskdata.json_task_data = { loc: 1 };
        }
        else if (this.taskdata.task_type_id == 3) {
            this.taskdata.json_task_data = { isbn: "" };
        }
        else if (this.taskdata.task_type_id == 4) {
            this.taskdata.json_task_data = { de_DE: { s1: "", s2: "", s3: "" } };
        }
        else if (this.taskdata.task_type_id == 5) {
            this.taskdata.json_task_data = { de_DE: { answer: "", text: "" } };
        }
        else if (this.taskdata.task_type_id == 6) {
            this.taskdata.json_task_data = {};
        }
    };
    EditTaskComponent.prototype.updateTaskData = function () {
        if (typeof this.taskdata !== 'undefined')
            this.taskdataoutput.emit(this.taskdata);
    };
    return EditTaskComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditTaskComponent.prototype, "user", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditTaskComponent.prototype, "universalcontent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditTaskComponent.prototype, "taskdata", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditTaskComponent.prototype, "locationsdata", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditTaskComponent.prototype, "tasktypesdata", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], EditTaskComponent.prototype, "taskdataoutput", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], EditTaskComponent.prototype, "reload", void 0);
EditTaskComponent = __decorate([
    core_1.Component({
        selector: 'edittask-component',
        providers: [libgame_service_1.LibgameService],
        template: "\n\n    <div style=\"margin:0;padding:0;\" (focusout)=\"updateTaskData()\" (mouseleave)=\"updateTaskData()\">\n\n      <!-- taskname, Description of task -->\n      <div>\n          <div  style=\"float:left;width:100%;\">\n              <hr class=\"hrForAdministration\">\n              <label  style=\"width:100%;text-align:center;padding-left:0.5em;\"><span class=\"stepHelper\">1.) </span>Name der Aufgabe<span style=\"color:#e9266d\">*</span></label>\n              <br>\n              <input [(ngModel)]=\"taskdata.de_DE.taskname\" type=\"text\" name=\"task-name\" placeholder=\"Name der Aufgabe\" style=\"width:100%;\"/>\n              <hr class=\"hrForAdministration\">\n              <label style=\"width:100%;text-align:center;padding-left:0.5em;\"><span class=\"stepHelper\">2.) </span>Beschreibung der Aufgabe<span style=\"color:#e9266d\">*</span></label>\n              <br>\n              <htmleditor-component [value]=\"taskdata.de_DE.description_long\" [pictures]=\"getUniversalContentPictures()\" (htmlcontent)=\"taskdata.de_DE.description_long=$event;updateTaskData();\" (reload)=\"reload.emit(true);\"></htmleditor-component>\n              <hr class=\"hrForAdministration\">\n              <label  style=\"width:100%;text-align:center;padding-left:0.5em;\"><span class=\"stepHelper\">3.) </span>Meldung, welche der User bei erfolgreichem L\u00F6sen erh\u00E4lt<span style=\"color:#e9266d\">*</span></label>\n              <br>\n              <htmleditor-component [value]=\"taskdata.de_DE.solved_description\" [pictures]=\"getUniversalContentPictures()\" (htmlcontent)=\"taskdata.de_DE.solved_description=$event;updateTaskData();\" (reload)=\"reload.emit(true);\"></htmleditor-component>\n              <hr class=\"hrForAdministration\">\n          </div>\n          <div style=\"clear:both;margin:0;height:0;\"></div>\n      </div>\n\n      <!-- Location of task -->\n      <label style=\"width:100%;text-align:center;padding-left:0.5em;\"><span class=\"stepHelper\">4.) </span>Fundort der Aufgabe</label>\n      <br>\n      <select [(ngModel)]=\"taskdata.location_id\"  style=\"width:100%;\">\n        <option value='-1' selected=\"selected\">--None--</option>\n        <option *ngFor=\"let t_location of locationsdata;\" value='{{t_location.location_id}}'>-- {{t_location.locationname}} --</option>\n      </select>\n      <hr class=\"hrForAdministration\">\n\n      <!-- score_rule -->\n      <label style=\"width:100%;text-align:center;padding-left:0.5em;\"><span class=\"stepHelper\">5.) </span>Exp., welche vom User gesammelt werden kann<span style=\"color:#e9266d\">*</span></label>\n      <br>\n      <input [(ngModel)]=\"taskdata.score_rule\" type=\"text\" style=\"width:100%;padding-left:0.3em;\">\n      <hr class=\"hrForAdministration\">\n\n      <!-- task type -->\n      <label style=\"width:100%;text-align:center;padding-left:0.5em;\"><span class=\"stepHelper\">6.) </span>W\u00E4hle den Aufgabentyp (Dieser bestimmt die nun folgenden Eingaben)<span style=\"color:#e9266d\">*</span></label>\n      <br>\n      <select [(ngModel)]=\"taskdata.task_type_id\" (change)=\"changeTaskType()\" style=\"width:100%;\">\n        <option *ngFor=\"let t_task_type of tasktypesdata;\" value='{{t_task_type.task_type_id}}'>-- {{t_task_type.task_type_name}} --</option>\n      </select>\n      <hr class=\"hrForAdministration\">\n\n      <!-- Specification of task depend on task type -->\n      <label style=\"width:100%;text-align:center;padding-left:0.5em;\"><span class=\"stepHelper\">7.) </span>Aufgabenspezifikation [abh\u00E4ngig von dem Aufgabetyp]<span style=\"color:#e9266d\">*</span></label>\n      <br>\n      <div style=\"width:100%;\">\n\n          <div *ngIf=\"taskdata.task_type_id==1\" style=\"width:100%;\">\n              <div style=\"float:left;width:100%;\">\n                  <div style=\"width:100%;\">\n                      <label style=\"width:100%;text-align:center;padding-left:2em;\"><span class=\"stepHelper\">7.1.) </span>Frage<span style=\"color:#e9266d\">*</span></label>\n                      <br>\n                      <htmleditor-component [value]=\"taskdata.json_task_data.de_DE.question\" [pictures]=\"getUniversalContentPictures()\" (htmlcontent)=\"taskdata.json_task_data.de_DE.question=$event;updateTaskData();\" (reload)=\"reload.emit(true);\"></htmleditor-component>\n                      <label style=\"width:100%;text-align:center;padding-left:2em;\"><span class=\"stepHelper\">7.2.) </span>Richtige Antwort<span style=\"color:#e9266d\">*</span></label>\n                      <br>\n                      <htmleditor-component [value]=\"taskdata.json_task_data.de_DE.a1\" [pictures]=\"getUniversalContentPictures()\" (htmlcontent)=\"taskdata.json_task_data.de_DE.a1=$event;updateTaskData();\" (reload)=\"reload.emit(true);\"></htmleditor-component>\n                      <label style=\"width:100%;text-align:center;padding-left:2em;\"><span class=\"stepHelper\">7.3.) </span>1. Falsche Antwort<span style=\"color:#e9266d\">*</span></label>\n                      <br>\n                      <htmleditor-component [value]=\"taskdata.json_task_data.de_DE.a2\" [pictures]=\"getUniversalContentPictures()\" (htmlcontent)=\"taskdata.json_task_data.de_DE.a2=$event;updateTaskData();\" (reload)=\"reload.emit(true);\"></htmleditor-component>\n                      <label style=\"width:100%;text-align:center;padding-left:2em;\"><span class=\"stepHelper\">7.4.) </span>2. Falsche Antwort<span style=\"color:#e9266d\">*</span></label>\n                      <br>\n                      <htmleditor-component [value]=\"taskdata.json_task_data.de_DE.a3\" [pictures]=\"getUniversalContentPictures()\" (htmlcontent)=\"taskdata.json_task_data.de_DE.a3=$event;updateTaskData();\" (reload)=\"reload.emit(true);\"></htmleditor-component>\n                      <label style=\"width:100%;text-align:center;padding-left:2em;\"><span class=\"stepHelper\">7.5.) </span>3. Falsche Antwort<span style=\"color:#e9266d\">*</span></label>\n                      <br>\n                      <htmleditor-component [value]=\"taskdata.json_task_data.de_DE.a4\" [pictures]=\"getUniversalContentPictures()\" (htmlcontent)=\"taskdata.json_task_data.de_DE.a4=$event;updateTaskData();\" (reload)=\"reload.emit(true);\"></htmleditor-component>\n                  </div>\n              </div>\n              <div style=\"clear:both;margin:0;height:0;\"></div>\n          </div>\n\n          <div *ngIf=\"taskdata.task_type_id==2\" style=\"width:100%;\">\n              <label style=\"width:100%;text-align:center;padding-left:2em;\"><span class=\"stepHelper\">7.1.) </span>Ort<span style=\"color:#e9266d\">*</span></label>\n              <br>\n              <select [(ngModel)]=\"taskdata.json_task_data.loc\" style=\"width:100%;\">\n                  <option value='-1' selected=\"selected\">--None--</option>\n                  <option *ngFor=\"let t_location of locationsdata;\" value='{{t_location.location_id}}'>-- {{t_location.locationname}} --</option>\n              </select>\n          </div>\n\n          <div *ngIf=\"taskdata.task_type_id==3\" style=\"width:100%;\">\n              <label style=\"width:100%;text-align:center;padding-left:2em;\"><span class=\"stepHelper\">7.1.) </span>ISBN<span style=\"color:#e9266d\">*</span></label>\n              <br>\n              <input [(ngModel)]=\"taskdata.json_task_data.isbn\" type=\"text\" placeholder=\"ISBN\" style=\"width:100%;\">\n          </div>\n\n          <div *ngIf=\"taskdata.task_type_id==4\" style=\"width:100%;\">\n              <div style=\"float:left;width:100%;\">\n                  <div style=\"width:100%;\">\n                      <label style=\"width:100%;text-align:center;padding-left:2em;\"><span class=\"stepHelper\">7.1.) </span>Quelle 1 (gr\u00FCn)<span style=\"color:#e9266d\">*</span></label>\n                      <br>\n                      <htmleditor-component [value]=\"taskdata.json_task_data.de_DE.s1\" [pictures]=\"getUniversalContentPictures()\" (htmlcontent)=\"taskdata.json_task_data.de_DE.s1=$event;updateTaskData();\" (reload)=\"reload.emit(true);\"></htmleditor-component>\n                      <label style=\"width:100%;text-align:center;padding-left:2em;\"><span class=\"stepHelper\">7.2.) </span>Quelle 2 (gelb)<span style=\"color:#e9266d\">*</span></label>\n                      <br>\n                      <htmleditor-component [value]=\"taskdata.json_task_data.de_DE.s2\" [pictures]=\"getUniversalContentPictures()\" (htmlcontent)=\"taskdata.json_task_data.de_DE.s2=$event;updateTaskData();\" (reload)=\"reload.emit(true);\"></htmleditor-component>\n                      <label style=\"width:100%;text-align:center;padding-left:2em;\"><span class=\"stepHelper\">7.3.) </span>Quelle 3 (rot)<span style=\"color:#e9266d\">*</span></label>\n                      <br>\n                      <htmleditor-component [value]=\"taskdata.json_task_data.de_DE.s3\" [pictures]=\"getUniversalContentPictures()\" (htmlcontent)=\"taskdata.json_task_data.de_DE.s3=$event;updateTaskData();\" (reload)=\"reload.emit(true);\"></htmleditor-component>\n                  </div>\n              </div>\n              <div style=\"clear:both;margin:0;height:0;\"></div>\n          </div>\n\n          <div *ngIf=\"taskdata.task_type_id==5\" style=\"width:100%;\">\n              <div style=\"float:left;width:100%;\">\n                  <div style=\"width:100%;\">\n                      <label style=\"width:100%;text-align:center;padding-left:2em;\"><span class=\"stepHelper\">7.1.) </span>Text mit L\u00FCcke<span style=\"color:#e9266d\">*</span></label>\n                      <br>\n                      <input [(ngModel)]=\"taskdata.json_task_data.de_DE.text\" type=\"text\" class=\"input-add-task-specification-task-type-5-text-with-blank\" placeholder=\"Text mit L\u00FCcke\" style=\"width:100%;\">\n                      <button class=\"add-task-specification-task-type-5-mail-to-users-button button\" (click)=\"taskdata.json_task_data.de_DE.text=taskdata.json_task_data.de_DE.text+'[::BLANK::]';\" style=\"width:100%;cursor:pointer;text-align:center;padding:0.1em 0;\">Klicke hier, um die L\u00FCcke einzuf\u00FCgen!</button>\n                      <label style=\"width:100%;text-align:center;padding-left:2em;\"><span class=\"stepHelper\">7.2.) </span>Richtige Antwort<span style=\"color:#e9266d\">*</span></label>\n                      <br>\n                      <input [(ngModel)]=\"taskdata.json_task_data.de_DE.answer\" type=\"text\" class=\"input-add-task-specification-task-type-5-correct-answer\" placeholder=\"Richtige Antwort\" style=\"width:100%;\">\n                  </div>\n              </div>\n              <div style=\"clear:both;margin:0;height:0;\"></div>\n          </div>\n\n          <div *ngIf=\"taskdata.task_type_id==6\" style=\"width:100%;\">\n              <div style=\"text-align:center;\"><span class=\"stepHelper\">7.1.) </span>Keine ben\u00F6tigt</div>\n          </div>\n      </div>\n\n    </div>\n\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, libgame_service_1.LibgameService])
], EditTaskComponent);
exports.EditTaskComponent = EditTaskComponent;
var _a;
//# sourceMappingURL=edittask.component.js.map