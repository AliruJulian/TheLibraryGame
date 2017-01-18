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
var TaskComponent = (function () {
    function TaskComponent(router, lService) {
        this.router = router;
        this.lService = lService;
        this.specificcontent = {};
        this.loading_specificcontent = true;
        this.shuffleArrayTaskType1 = [1, 2, 3, 4];
        this.shuffleArrayTaskType4 = [1, 2, 3];
        this.successfullSolved = false;
        this.notSuccessfullSolved = false;
        this.solvedOverlayArray = [];
    }
    TaskComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.successfullSolved = false;
        this.loading_specificcontent = true;
        this.lService.specificcontent$.subscribe(function (specificcontent) {
            console.log("Specific Content");
            console.log(specificcontent);
            if (typeof specificcontent["TASK_DATA"] !== 'undefined' && typeof specificcontent["TASK_DATA"].json_task_data !== 'undefined')
                specificcontent["TASK_DATA"].json_task_data = JSON.parse(specificcontent["TASK_DATA"].json_task_data);
            _this.shuffle(_this.shuffleArrayTaskType1);
            _this.shuffle(_this.shuffleArrayTaskType4);
            _this.specificcontent = specificcontent;
            _this.loading_specificcontent = false;
            if (_this.getTaskData().task_type_id == "3") {
                setTimeout(function () { _this.initBarcodeReader(); }, 300);
            }
            if (_this.getTaskData().task_type_id == "6" && _this.additionalinformation.length != 0 && !isNaN(parseFloat(_this.additionalinformation))) {
                _this.solveTaskType6(_this.additionalinformation);
            }
        });
        this.lService.loadSpecificContent('task&task_id=' + this.task_id);
    };
    TaskComponent.prototype.getTaskBlockedData = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['TASK_BLOCKED_DATA'] !== 'undefined' ? this.specificcontent['TASK_BLOCKED_DATA'] : {};
    };
    TaskComponent.prototype.getUserTaskScore = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['USER_TASK_SCORE'] !== 'undefined' ? this.specificcontent['USER_TASK_SCORE'] : {
            value: "0",
            score: "0"
        };
    };
    TaskComponent.prototype.getTaskData = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['TASK_DATA'] !== 'undefined' ? this.specificcontent['TASK_DATA'] : {
            task_type_id: "0",
            json_task_data: {},
            needed_value: "0",
            score_rule: "1"
        };
    };
    TaskComponent.prototype.getQuestsContainingTaskId = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['QUESTS_CONTAINING_TASK_ID'] !== 'undefined' ? this.specificcontent['QUESTS_CONTAINING_TASK_ID'] : [];
    };
    TaskComponent.prototype.getIsTaskBlocked = function () {
        return typeof this.getTaskBlockedData().ts_blocked !== 'undefined' && (this.getTaskBlockedData().ts_blocked + "").length != 0;
    };
    TaskComponent.prototype.getIsTaskSolvedByUser = function () {
        return parseFloat(this.getUserTaskScore().value) >= parseFloat(this.getTaskData().needed_value);
    };
    TaskComponent.prototype.getIsTaskActive = function () {
        return this.getTaskData().is_task_active == '1';
    };
    TaskComponent.prototype.navigateToQuest = function (quest_id) {
        this.router.navigate(['/l/quest', quest_id]);
    };
    TaskComponent.prototype.solveTaskOverall = function (solvedata, task_id) {
        var _this = this;
        this.lService.solveTask(solvedata, task_id).subscribe(function (data) {
            console.log(data);
            if (typeof data.result !== 'undefined' && data.result == true && typeof data.data !== 'undefined' && typeof data.data.task_solved !== 'undefined' && data.data.task_solved == true) {
                _this.successfullSolved = true;
                var t_solved_badges = "";
                var t_solved_quests = "";
                if (typeof data.data["badges"] !== 'undefined') {
                    for (var t_key_badges in data.data["badges"]) {
                        t_solved_badges += "-" + data.data["badges"][t_key_badges]["badgename"] + "<br />";
                        _this.solvedOverlayArray.push({
                            type: 2,
                            name: "Abzeichen erhalten",
                            solved_description: "Herzlichen Glückwunsch! Du hast das Abzeichen '" + data.data["badges"][t_key_badges]["badgename"] + "' abgeschlossen.<br /><img src='" + _this.lService.getPictureLink(data.data["badges"][t_key_badges]["picture_id"]) + "' />"
                        });
                    }
                }
                if (typeof data.data["quests"] !== 'undefined') {
                    for (var t_key_quests in data.data["quests"]) {
                        t_solved_quests += "-" + data.data["quests"][t_key_quests]["questname"] + "<br />";
                        _this.solvedOverlayArray.push({
                            type: 3,
                            name: "Quest erfüllt",
                            solved_description: "Herzlichen Glückwunsch! Du hast den Quest '" + data.data["quests"][t_key_quests]["questname"] + "' abgeschlossen.",
                            score_rule: data.data["quests"][t_key_quests]["score_rule"],
                            faculty_score_rule: data.data["quests"][t_key_quests]["score_rule"]
                        });
                    }
                }
                if (typeof data.data["tasks"] !== 'undefined') {
                    for (var t_key_tasks in data.data["tasks"]) {
                        _this.solvedOverlayArray.push({
                            type: 1,
                            name: "Aufgabe erfüllt",
                            solved_description: "Herzlichen Glückwunsch! Du hast die Aufgabe '" + data.data["tasks"][t_key_tasks]["taskname"] + "' abgeschlossen.",
                            score_rule: data.data["tasks"][t_key_tasks]["score_rule"],
                            faculty_score_rule: data.data["tasks"][t_key_tasks]["score_rule"],
                            solved_quests: t_solved_quests,
                            solved_badges: t_solved_badges
                        });
                    }
                }
                _this.lService.loadSpecificContent('task&task_id=' + _this.task_id);
            }
            else {
                window.alert("Leider hast du die Aufgabe nicht erfolgreich gelöst! Bitte versuche es erneut!");
            }
        }, function (error) {
            window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
        });
    };
    TaskComponent.prototype.getTaskType1Answer = function (id) {
        if (typeof this.user.language === 'undefined' || this.user.language.length == 0 || $.isEmptyObject(this.getTaskData().json_task_data))
            return { id: "", answer: "" };
        return { id: "a" + this.shuffleArrayTaskType1[id], answer: this.getTaskData().json_task_data[this.user.language]["a" + this.shuffleArrayTaskType1[id]] };
    };
    TaskComponent.prototype.solveTaskType1 = function (id) {
        var solvedata = JSON.stringify({ chosenanswer: this.getTaskType1Answer(id).id });
        this.solveTaskOverall(solvedata, this.task_id);
    };
    TaskComponent.prototype.solveTaskType2 = function (id) {
    };
    TaskComponent.prototype.solveTaskType3 = function (isbn) {
        var solvedata = JSON.stringify({ "isbn": isbn });
        this.solveTaskOverall(solvedata, this.task_id);
    };
    TaskComponent.prototype.initBarcodeReader = function () {
        var _this = this;
        var takePicture = document.querySelector("#upload-barcode-pic");
        var showPicture = document.createElement("img");
        var Result = document.querySelector("#cf-tas-specification-task-3-result-text");
        var canvas = document.getElementById("task-3-picture");
        var ctx = canvas.getContext("2d");
        JOB.Init();
        JOB.SetImageCallback(function (result) {
            if (result.length > 0) {
                var tempArray = [];
                for (var i = 0; i < result.length; i++) {
                    tempArray.push("Gefundene ISBN : " + result[i].Value);
                }
                Result.innerHTML = tempArray.join("<br />");
                _this.solveTaskType3(result[0].Value + "");
            }
            else {
                if (result.length === 0) {
                    Result.innerHTML = "Dekodieren ist leider fehlgeschlagen. Bitte versuche es mit einem Bild von besserer Qualität!";
                }
            }
        });
        JOB.PostOrientation = true;
        JOB.OrientationCallback = function (result) {
            canvas.width = result.width;
            canvas.height = result.height;
            var data = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for (var i = 0; i < data.data.length; i++) {
                data.data[i] = result.data[i];
            }
            ctx.putImageData(data, 0, 0);
        };
        JOB.SwitchLocalizationFeedback(true);
        JOB.SetLocalizationCallback(function (result) {
            ctx.beginPath();
            ctx.lineWIdth = "2";
            ctx.strokeStyle = "red";
            for (var i = 0; i < result.length; i++) {
                ctx.rect(result[i].x, result[i].y, result[i].width, result[i].height);
            }
            ctx.stroke();
        });
        if (takePicture && showPicture) {
            takePicture.onchange = function (event) {
                $("#task-3-picture").show();
                var files = event.target.files;
                if (files && files.length > 0) {
                    var file = files[0];
                    try {
                        var URL = window.URL || window.webkitURL;
                        showPicture.onload = function (event) {
                            Result.innerHTML = "";
                            JOB.DecodeImage(showPicture);
                            URL.revokeObjectURL(showPicture.src);
                        };
                        showPicture.src = URL.createObjectURL(file);
                    }
                    catch (e) {
                        try {
                            var fileReader = new FileReader();
                            fileReader.onload = function (event) {
                                showPicture.onload = function (event) {
                                    Result.innerHTML = "";
                                    console.log("filereader");
                                    JOB.DecodeImage(showPicture);
                                };
                                showPicture.src = event.target.result;
                            };
                            fileReader.readAsDataURL(file);
                        }
                        catch (e) {
                            Result.innerHTML = "Neither createObjectURL or FileReader are supported";
                        }
                    }
                }
            };
        }
    };
    TaskComponent.prototype.getTaskType4Answer = function (id) {
        if (typeof this.user.language === 'undefined' || this.user.language.length == 0 || $.isEmptyObject(this.getTaskData().json_task_data))
            return { id: "", answer: "" };
        return { id: "s" + this.shuffleArrayTaskType4[id], answer: this.getTaskData().json_task_data[this.user.language]["s" + this.shuffleArrayTaskType4[id]] };
    };
    TaskComponent.prototype.exchangeShuffleArrayPosition = function (id1, id2) {
        var t_value_id1 = this.shuffleArrayTaskType4[id1];
        this.shuffleArrayTaskType4[id1] = this.shuffleArrayTaskType4[id2];
        this.shuffleArrayTaskType4[id2] = t_value_id1;
    };
    TaskComponent.prototype.solveTaskType4 = function () {
        var solvedata = JSON.stringify({ "1": "s" + this.shuffleArrayTaskType4[0], "2": "s" + this.shuffleArrayTaskType4[1], "3": "s" + this.shuffleArrayTaskType4[2] });
        this.solveTaskOverall(solvedata, this.task_id);
    };
    TaskComponent.prototype.getTaskType5TextWithoutBlankStatement = function () {
        if (typeof this.user.language === 'undefined' || this.user.language.length == 0 || $.isEmptyObject(this.getTaskData().json_task_data))
            return { text: "" };
        return { text: this.getTaskData().json_task_data[this.user.language]["text"].replace("[::BLANK::]", "___") };
    };
    TaskComponent.prototype.solveTaskType5 = function () {
        var solvedata = JSON.stringify({ text: $('#input-specification-task-blank').val() });
        this.solveTaskOverall(solvedata, this.task_id);
    };
    TaskComponent.prototype.solveTaskType6 = function (location_id) {
        var solvedata = JSON.stringify({ "loc": location_id });
        this.solveTaskOverall(solvedata, this.task_id);
    };
    TaskComponent.prototype.removeFromSolvedOverlayArray = function (index) {
        this.solvedOverlayArray.splice(index, 1);
    };
    TaskComponent.prototype.shuffle = function (a) {
        for (var i = a.length; i; i--) {
            var j = Math.floor(Math.random() * i);
            _a = [a[j], a[i - 1]], a[i - 1] = _a[0], a[j] = _a[1];
        }
        var _a;
    };
    return TaskComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TaskComponent.prototype, "user", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TaskComponent.prototype, "universalcontent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TaskComponent.prototype, "task_id", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TaskComponent.prototype, "additionalinformation", void 0);
TaskComponent = __decorate([
    core_1.Component({
        selector: 'task-component',
        providers: [libgame_service_1.LibgameService],
        template: "\n\n  <div class=\"row\">\n\n    <div class=\"col-xs-12\" style=\"padding:0;\">\n\n        <div *ngIf=\"getIsTaskBlocked()\" class=\"content-frame\">\n\n            <div class=\"content-task-frame\" style=\"margin:0px;border-radius:0px;width:100%!important;\">\n                <div style=\"width:100%;color:rgb(0,0,0);cursor:pointer;\">\n                    <div style=\"font-size:1.5em!important;\">Aufgabe: {{getTaskData().taskname}}</div>\n                    <br>\n                    <div id=\"task-description-healine\" [innerHTML]=\"getTaskData().description_long\"></div>\n                    <div style=\"clear:both;\"></div>\n                </div>\n            </div>\n\n            <p class='headline' style=\"background:rgb(255,120,120);\">\n                Diese Aufgabe ist zur Zeit f\u00FCr dich nicht l\u00F6sbar.\n                <br>\n                Wieder l\u00F6sbar ab: {{lService.getFormatedDate(getTaskBlockedData().ts_blocked)}}\n            </p>\n        </div>\n\n        <div *ngIf=\"getIsTaskSolvedByUser()\" class=\"content-frame\">\n\n            <div class=\"content-task-frame\" style=\"margin:0px;border-radius:0px;width:100%!important;\">\n                <div style=\"width:100%;color:rgb(0,0,0);cursor:pointer;\">\n                    <div style=\"font-size:1.5em!important;\">Aufgabe: {{getTaskData().taskname}}</div>\n                    <br>\n                    <div id=\"task-description-healine\" [innerHTML]=\"getTaskData().description_long\"></div>\n                    <div style=\"clear:both;\"></div>\n                </div>\n            </div>\n\n            <p class='headline' style=\"background:rgb(120,255,120);\">\n                Du hast diese Aufgabe bereits gel\u00F6st.\n                <br>\n                Gel\u00F6st am: {{lService.getFormatedDate(getUserTaskScore().ts_last_update)}}\n            </p>\n        </div>\n\n        <div *ngIf=\"!getIsTaskActive()\" class=\"content-frame\" >\n            <p class='headline' style=\"background:rgb(255,120,120);\">\n                Diese Aufgabe ist nicht l\u00E4nger aktiv!\n            </p>\n        </div>\n\n        <!-- Specific Task Data -->\n        <div *ngIf=\"!getIsTaskBlocked() && !getIsTaskSolvedByUser() && getIsTaskActive()\" id=\"cf-tas-specification-task\" class=\"content-frame\" style=\"padding-bottom: 10px;\">\n\n            <div class=\"content-task-frame\" style=\"margin:0px;border-radius:0px;width:100%!important;\">\n                <div style=\"width:100%;color:rgb(0,0,0);cursor:pointer;\">\n                    <div style=\"font-size:1.5em!important;\">Aufgabe: {{getTaskData().taskname}}</div>\n                    <br>\n                    <div id=\"task-description-healine\" [innerHTML]=\"getTaskData().description_long\"></div>\n                    <div style=\"clear:both;\"></div>\n                </div>\n            </div>\n\n            <!-- Task Type 1 -->\n            <div *ngIf=\"getTaskData().task_type_id==1\" class='cf-tas-specification-task-1 depend-on-device-table-to-none' style='width:100%;border-spacing:10px 15px;margin-top:5px;'>\n                <div class='depend-on-device-tablerow-to-none' style='width:100%;'>\n\n                    <div (click)=\"solveTaskType1(0)\" [innerHTML]=\"getTaskType1Answer(0).answer\" class='cf-tas-specification-task-1-answer depend-on-device-tablecell-to-none depend-on-device-none-to-inlineblock depend-on-device-fifty-to-hundred-percentage-width' style='text-align:center;vertical-align:middle;margin-bottom:0.2em;'>\n                    </div>\n\n                    <div (click)=\"solveTaskType1(1)\" [innerHTML]=\"getTaskType1Answer(1).answer\" class='cf-tas-specification-task-1-answer depend-on-device-tablecell-to-none depend-on-device-none-to-inlineblock depend-on-device-fifty-to-hundred-percentage-width' style='text-align:center;vertical-align:middle;margin-bottom:0.2em;color:white!important;'>\n                    </div>\n\n                </div>\n                <div class='depend-on-device-tablerow-to-none' style='width:100%;'>\n\n                    <div (click)=\"solveTaskType1(2)\" [innerHTML]=\"getTaskType1Answer(2).answer\" class='cf-tas-specification-task-1-answer depend-on-device-tablecell-to-none depend-on-device-none-to-inlineblock depend-on-device-fifty-to-hundred-percentage-width' style='text-align:center;vertical-align:middle;margin-bottom:0.2em;'>\n                    </div>\n\n                    <div (click)=\"solveTaskType1(3)\" [innerHTML]=\"getTaskType1Answer(3).answer\" class='cf-tas-specification-task-1-answer depend-on-device-tablecell-to-none depend-on-device-none-to-inlineblock depend-on-device-fifty-to-hundred-percentage-width' style='text-align:center;vertical-align:middle;margin-bottom:0.2em;'>\n                    </div>\n\n                </div>\n            </div>\n\n            <!-- Task Type 2 -->\n            <div *ngIf=\"getTaskData().task_type_id==2\" class=\"cf-tas-specification-task-2\">\n\n                <div id=\"map\" style=\"width:100%;height:350px;text-align:center;font-size:1.5em;color:black;background:url(../public/images/kachel.png);background-repeat:repeat;\">\n                    Du wirst zur Zeit lokalisiert. Bitte checke, ob du deinem Browser das Recht gew\u00E4hrst auf deinen Standort zuzugreifen.\n                </div>\n\n\n                <button id=\"cf-tas-specification-task-2-check-in\" class=\"button\">QR Code hochladen</button>\n\n                <div style=\"width:320px;margin:0!important;margin-right:auto!important;margin-left:auto!important;margin-top:1em!important;\">\n                    <img id=\"qrcode-picture-img\" width=\"320\" style=\"display:none;\">\n                </div>\n\n                <div class=\"content-frame\">\n                    <p class='headline' style=\"background:rgb(120,255,120);padding-left:1em;text-align:left;\">\n                        <span class=\"fa fa-exclamation-triangle\"></span> Du kannst diese Aufgabe auch durch Scannen des QR Codes an dem Ort l\u00F6sen!\n                    </p>\n                </div>\n\n                <div class=\"content-frame\">\n                    <p class='headline' style=\"background:rgb(120,255,120);padding-left:1em;text-align:left;\">\n                        <span class=\"fa fa-exclamation-triangle\"></span> Das Spiel lokalisiert deine Position in einem gewissen Interval, sobald du die Webseite ge\u00F6ffnet hast und deine Zustimmung hierzu gegeben hast! Solltest du also in der N\u00E4he des gesuchten Ortes sein, wirst du automatisch benachrichtigt.\n                    </p>\n                </div>\n\n            </div>\n\n            <!-- Task Type 3 -->\n\n            <div *ngIf=\"getTaskData().task_type_id==3\" class=\"cf-tas-specification-task-3\" style=\"margin-top:30px;\">\n                <div style=\"width:320px;margin:0!important;margin-right:auto!important;margin-left:auto!important;\">\n                    <canvas width=\"320\" height=\"240\" id=\"task-3-picture\" style=\"display:none;\"></canvas>\n                </div>\n                <p id=\"cf-tas-specification-task-3-result-text\" style=\"width:100%;text-align:center;margin-top:20px;\"></p>\n                <button onclick=\"$('#upload-barcode-pic').click();\" class=\"button\">Lade einen Barcode hoch!</button>\n                <input id=\"upload-barcode-pic\" type=\"file\" accept=\"image/*\" style=\"display:none;\" />\n            </div>\n\n\n            <!-- Task Type 4 -->\n\n            <div *ngIf=\"getTaskData().task_type_id==4\" class=\"cf-tas-specification-task-4\" style=\"padding:0 1.5em;\">\n                <div id=\"cf-tas-specification-task-source-1\" style=\"margin-top:1em;width:100%;line-height:3em;background:green;color:rgb(0,0,0);vertical-align:middle;text-align:center;\">\n                    <div style=\"min-width:30%;float:left;color:transparent;\">a</div>\n                    <div class=\"cf-tas-specification-task-4-source\" style=\"width:40%;float:left;\">{{getTaskType4Answer(0).answer}}</div>\n                    <div class=\"fa fa-arrow-circle-o-down\" (click)=\"exchangeShuffleArrayPosition(0,1);\" style=\"width:30%;float:left;cursor:pointer;line-height:3em;vertical-align:middle;\"></div>\n                    <div style=\"clear:both;\"></div>\n                </div>\n                <div id=\"cf-tas-specification-task-source-2\" style=\"margin-top:1em;width:100%;line-height:3em;background:yellow;color:rgb(0,0,0);vertical-align:middle;text-align:center;cursor:pointer;\">\n                    <div class=\"fa fa-arrow-circle-o-up\" (click)=\"exchangeShuffleArrayPosition(0,1);\" style=\"width:30%;float:left;cursor:pointer;line-height:3em;vertical-align:middle;\"></div>\n                    <div class=\"cf-tas-specification-task-4-source\" style=\"width:40%;float:left;\">{{getTaskType4Answer(1).answer}}</div>\n                    <div class=\"fa fa-arrow-circle-o-down\" (click)=\"exchangeShuffleArrayPosition(1,2);\" style=\"width:30%;float:left;cursor:pointer;line-height:3em;vertical-align:middle;\"></div>\n                    <div style=\"clear:both;\"></div>\n                </div>\n                <div id=\"cf-tas-specification-task-source-3\" style=\"margin-top:1em;width:100%;line-height:3em;background:red;color:rgb(0,0,0);vertical-align:middle;text-align:center;cursor:pointer;\">\n                    <div class=\"fa fa-arrow-circle-o-up\" (click)=\"exchangeShuffleArrayPosition(1,2);\" style=\"width:30%;float:left;cursor:pointer;line-height:3em;vertical-align:middle;\"></div>\n                    <div class=\"cf-tas-specification-task-4-source\" style=\"width:40%;float:left;\">{{getTaskType4Answer(2).answer}}</div>\n                    <div style=\"clear:both;\"></div>\n                </div>\n\n                <button id=\"cf-tas-specification-task-4-send-button\" (click)=\"solveTaskType4()\" class=\"button\" style=\"margin-top:3em;margin-bottom:0.3em;\">\u00DCberpr\u00FCfe jetzt meine Antwort</button>\n            </div>\n\n            <!-- Task Type 5 -->\n\n            <div *ngIf=\"getTaskData().task_type_id==5\" class=\"cf-tas-specification-task-5\" style=\"padding:0 1.5em;\">\n                <div class=\"cf-tas-specification-task-blank-text\" style=\"margin-top:1em;width:100%;color:rgb(0,0,0);vertical-align:middle;text-align:center;\">\n                    <p>{{getTaskType5TextWithoutBlankStatement().text}}</p>\n                </div>\n                <div class=\"cf-tas-specification-task-blank-input\" style=\"margin-top:0.3em;width:100%;color:rgb(0,0,0);vertical-align:middle;text-align:center;\">\n                    <input type=\"text\" [id]=\"'input-specification-task-blank'\" placeholder=\"Gib hier deine Antwort ein\" style=\"width:100%;\">\n                </div>\n\n                <button id=\"cf-tas-specification-task-5-send-button\" (click)=\"solveTaskType5()\" class=\"button\" style=\"margin-top:2em;margin-bottom:0.3em;\">\u00DCberpr\u00FCfe jetzt meine Antwort</button>\n            </div>\n\n            <!-- Task Type 6 -->\n\n            <div *ngIf=\"getTaskData().task_type_id==6\" class=\"cf-tas-specification-task-6\">\n\n                <div class=\"content-frame\">\n                    <p class='headline' style=\"background:rgb(120,255,120);padding-left:1em;text-align:left;\">\n                        <span class=\"fa fa-exclamation-triangle\"></span> Da nicht alle g\u00E4ngigen Browser den QR Code Scan unterst\u00FCtzen. Muss leider ein externer QR Code Scanner auf deinem Smartphone benutzt werden, um die Aufgabe zu l\u00F6sen. Folge dann dem Link in dem gescannten QR Code und du hast diese Aufgabe abgeschlossen!\n                    </p>\n                </div>\n\n            </div>\n\n\n        </div>\n\n        <!-- Overview of task -->\n        <div id=\"cf-tas-overview\" class=\"content-frame\">\n\n            <p class=\"headline\">Mehr Informationen zu der Aufgabe</p>\n\n\n\n            <div style=\"padding:1em 1em;width:100%;max-width:30em;margin-left:auto;margin-right:auto;\">\n\n\n                <div style=\"display:table;border-spacing:0 2px;width:100%;\">\n\n                    <div style=\"display:table-row;width:100%;background:#eeeeee;\">\n                        <div style=\"display:table-cell;vertical-align:middle;padding:5px;padding-left:0.5em;\">Erfahrung:</div>\n                        <div style=\"display:table-cell;vertical-align:middle;padding:5px;text-align:right;\">\n                          +{{getTaskData().score_rule}}\n                        </div>\n                    </div>\n\n                    <div style=\"display:table-row;width:100%;background:#eeeeee;\">\n                        <div style=\"display:table-cell;vertical-align:middle;padding:5px;padding-left:0.5em;\">Dein Fortschritt:</div>\n                        <div style=\"display:table-cell;vertical-align:middle;padding:5px;text-align:right;\">{{getUserTaskScore().value}}</div>\n                    </div>\n\n                    <div style=\"display:table-row;width:100%;\">\n                        <div style=\"display:table-cell;vertical-align:middle;padding:5px;padding-left:0.5em;\">Ben\u00F6tigter Fortschritt:</div>\n                        <div style=\"display:table-cell;vertical-align:middle;padding:5px;text-align:right;\">{{getTaskData().needed_value}}</div>\n                    </div>\n\n                    <div style=\"display:table-row;width:100%;background:#eeeeee;\">\n                        <div style=\"display:table-cell;vertical-align:middle;padding:5px;padding-left:0.5em;\">Deine gesammelten Exp.:</div>\n                        <div style=\"display:table-cell;vertical-align:middle;padding:5px;text-align:right;color:green!important;\">+{{getUserTaskScore().score}}</div>\n                    </div>\n\n                    <div style=\"display:table-row;width:100%;\">\n                        <div style=\"display:table-cell;vertical-align:middle;padding:5px;padding-left:0.5em;\">Diese Aufgabe ist Teil des folgenden Quests:</div>\n                        <div style=\"display:table-cell;vertical-align:middle;padding:5px;text-align:right;\">{{getQuestsContainingTaskId().length==0?'-':''}}</div>\n                    </div>\n\n                    <div *ngFor=\"let t_quest of getQuestsContainingTaskId();\" [hidden]=\"t_quest.is_active!='1'\" style=\"display:table-row;width:100%;\">\n                        <div style=\"display:table-cell;vertical-align:middle;padding:5px;padding-left:0.5em;\">\n                            <div (click)=\"navigateToQuest(t_quest.quest_id)\" class=\"content-quest-frame\" style=\"width:100%;\">\n                                <div style=\"width:100%;color:rgb(0,0,0);cursor:pointer;\">\n                                    <div class=\"depend-on-device-left-to-none-float\" style=\"font-size:1.5em;font-weight:bold;text-decoration:underline;\">Quest: {{t_quest.questname}}</div>\n                                    <div class=\"depend-on-device-right-to-none-float\" style=\"font-size:1.2em;margin-top:0.2em;\"><span style=\"font-size:1.2em;font-weight:bold;\">+{{t_quest.score_rule}}</span> Exp.</div>\n                                    <div style=\"clear:both;\"></div>\n                                </div>\n                            </div>\n                        </div>\n                        <div style=\"display:table-cell;vertical-align:middle;padding:5px;text-align:right;\"></div>\n                    </div>\n\n\n                </div>\n\n            </div>\n            <div style=\"clear:both;\"></div>\n\n        </div>\n\n    </div>\n\n\n\n</div>\n\n    <!-- Solved Overlay -->\n    <div *ngFor=\"let solvedOverlayDataObject of solvedOverlayArray;let i = index;\">\n      <solvedoverlay-component [user]=\"user\" [universalcontent]=\"universalcontent\" [solveddata]=\"solvedOverlayDataObject\" (closeOverlay)=\"removeFromSolvedOverlayArray(i);\"></solvedoverlay-component>\n    </div>\n\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, libgame_service_1.LibgameService])
], TaskComponent);
exports.TaskComponent = TaskComponent;
var _a;
//# sourceMappingURL=task.component.js.map