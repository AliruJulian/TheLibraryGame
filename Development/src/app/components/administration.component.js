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
var AdministrationComponent = (function () {
    function AdministrationComponent(router, lService) {
        this.router = router;
        this.lService = lService;
        this.reload = new core_1.EventEmitter();
        this.specificcontent = {};
        this.loading_specificcontent = true;
        this.user_activity_task_active = "10d";
        this.upsertNewTaskSuccessful = false;
        this.upsertNewBadgeSuccessful = false;
        this.upsertNewQuestSuccessful = false;
        this.upsertNewLocationSuccessful = false;
        this.upsertGeneralContentSuccessful = false;
        this.addedNewAdminSuccessful = false;
        this.sendEmailToAllUsersSuccessful = false;
        this.loading_sendemails = false;
        this.show_c_solved_tasks_chart = false;
        this.show_cm_general = false;
        this.show_cm_tasks = false;
        this.show_cm_badges = false;
        this.show_cm_quests = false;
        this.show_cm_locations = false;
        this.show_cm_reset_score = false;
        this.show_um_add_admins = false;
        this.show_um_send_mail = false;
        this.addAdminId = -1;
        this.send_email = {
            headline: "",
            content: ""
        };
        this.new_task = {};
        this.new_task_template = {
            task_id: -1,
            task_type_id: 1,
            json_task_data: {
                de_DE: {
                    question: "",
                    a1: "",
                    a2: "",
                    a3: "",
                    a4: ""
                }
            },
            de_DE: {
                taskname: "",
                description_long: "",
                solved_description: ""
            },
            is_task_active: "1",
            score_rule: "10",
            location_id: -1
        };
        this.new_badge = {};
        this.new_badge_template = {
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
        this.new_quest = {};
        this.new_quest_template = {
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
        this.new_location = {};
        this.new_location_template = {
            location_id: -1,
            de_DE: {
                locationname: "",
                description_long: ""
            },
            geo_lati: "",
            geo_long: "",
            geo_radius: ""
        };
    }
    AdministrationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user_activity_task_active = "10d";
        this.new_task = this.new_task_template;
        this.new_quest = this.new_quest_template;
        this.new_badge = this.new_badge_template;
        this.new_location = this.new_location_template;
        this.loading_specificcontent = true;
        this.lService.specificcontent$.subscribe(function (specificcontent) {
            console.log("Specific Content");
            console.log(specificcontent);
            if (typeof specificcontent["_Tasks"] !== 'undefined') {
                for (var t_task_key in specificcontent["_Tasks"]) {
                    specificcontent["_Tasks"][t_task_key]["showhelper_information_open"] = false;
                    specificcontent["_Tasks"][t_task_key]["showhelper_edit_open"] = false;
                    specificcontent["_Tasks"][t_task_key]["upsert_successful"] = false;
                    if (typeof specificcontent["_Tasks"][t_task_key].json_task_data !== 'undefined')
                        specificcontent["_Tasks"][t_task_key].json_task_data = JSON.parse(specificcontent["_Tasks"][t_task_key].json_task_data);
                    if (typeof specificcontent["_Tasks"][t_task_key].pre_tasks !== 'undefined')
                        specificcontent["_Tasks"][t_task_key].pre_tasks = JSON.parse(specificcontent["_Tasks"][t_task_key].pre_tasks);
                }
            }
            if (typeof specificcontent["_Quests"] !== 'undefined') {
                for (var t_quest_key in specificcontent["_Quests"]) {
                    specificcontent["_Quests"][t_quest_key]["showhelper_edit_open"] = false;
                    specificcontent["_Quests"][t_quest_key]["upsert_successful"] = false;
                    if (typeof specificcontent["_Quests"][t_quest_key].json_pre_quest_ids !== 'undefined')
                        specificcontent["_Quests"][t_quest_key].json_pre_quest_ids = JSON.parse(specificcontent["_Quests"][t_quest_key].json_pre_quest_ids);
                    if (typeof specificcontent["_Quests"][t_quest_key].json_quest_task_ids !== 'undefined')
                        specificcontent["_Quests"][t_quest_key].json_quest_task_ids = JSON.parse(specificcontent["_Quests"][t_quest_key].json_quest_task_ids);
                }
            }
            if (typeof specificcontent["_Badges"] !== 'undefined') {
                for (var t_badge_key in specificcontent["_Badges"]) {
                    specificcontent["_Badges"][t_badge_key]["showhelper_edit_open"] = false;
                    specificcontent["_Badges"][t_badge_key]["upsert_successful"] = false;
                    if (typeof specificcontent["_Badges"][t_badge_key].json_task_ids !== 'undefined')
                        specificcontent["_Badges"][t_badge_key].json_task_ids = JSON.parse(specificcontent["_Badges"][t_badge_key].json_task_ids);
                }
            }
            if (typeof specificcontent["_Locations"] !== 'undefined') {
                for (var t_location_key in specificcontent["_Locations"]) {
                    specificcontent["_Locations"][t_location_key]["showhelper_information_open"] = false;
                }
            }
            _this.specificcontent = specificcontent;
            _this.updateChartUserActivityTask(10, 0, 0, true);
            _this.loading_specificcontent = false;
        });
        this.lService.loadSpecificContent('administrationcontent');
    };
    AdministrationComponent.prototype.getAdmins = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['_Admins'] !== 'undefined' ? this.specificcontent['_Admins'] : [];
    };
    AdministrationComponent.prototype.getAllUsers = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['_All_Users'] !== 'undefined' ? this.specificcontent['_All_Users'] : [];
    };
    AdministrationComponent.prototype.getSuperadmins = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['_Superadmins'] !== 'undefined' ? this.specificcontent['_Superadmins'] : [];
    };
    AdministrationComponent.prototype.getTasks = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['_Tasks'] !== 'undefined' ? this.specificcontent['_Tasks'] : [];
    };
    AdministrationComponent.prototype.getQuests = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['_Quests'] !== 'undefined' ? this.specificcontent['_Quests'] : [];
    };
    AdministrationComponent.prototype.getBadges = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['_Badges'] !== 'undefined' ? this.specificcontent['_Badges'] : [];
    };
    AdministrationComponent.prototype.getLocations = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['_Locations'] !== 'undefined' ? this.specificcontent['_Locations'] : [];
    };
    AdministrationComponent.prototype.getTaskTypes = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['_Task_Types'] !== 'undefined' ? this.specificcontent['_Task_Types'] : [];
    };
    AdministrationComponent.prototype.getCountActiveQuests = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Count_Active_Quests'] !== 'undefined' ? this.specificcontent['Count_Active_Quests'] : 0;
    };
    AdministrationComponent.prototype.getCountActiveTasks = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Count_Active_Tasks'] !== 'undefined' ? this.specificcontent['Count_Active_Tasks'] : 0;
    };
    AdministrationComponent.prototype.getCountActiveBadges = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Count_Active_Badges'] !== 'undefined' ? this.specificcontent['Count_Active_Badges'] : 0;
    };
    AdministrationComponent.prototype.getCountUsers = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Count_Users'] !== 'undefined' ? this.specificcontent['Count_Users'] : 0;
    };
    AdministrationComponent.prototype.getCountUsersActiveLast2Days = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Count_Users_Active_Last_2_Days'] !== 'undefined' ? this.specificcontent['Count_Users_Active_Last_2_Days'] : 0;
    };
    AdministrationComponent.prototype.getCountUsersCompletedAllQuests = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Count_Users_Completed_All_Quests'] !== 'undefined' ? this.specificcontent['Count_Users_Completed_All_Quests'] : 0;
    };
    AdministrationComponent.prototype.getCountUsersCompletedAllBadges = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Count_Users_Completed_All_Badges'] !== 'undefined' ? this.specificcontent['Count_Users_Completed_All_Badges'] : 0;
    };
    AdministrationComponent.prototype.getStatistics = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['_Statistics'] !== 'undefined' ? this.specificcontent['_Statistics'] : {};
    };
    AdministrationComponent.prototype.getUniversalContentPictures = function () {
        return !$.isEmptyObject(this.universalcontent) && typeof this.universalcontent['_Pictures'] !== 'undefined' ? this.universalcontent['_Pictures'] : [];
    };
    AdministrationComponent.prototype.getUniversalContent = function (content_mapper) {
        if ($.isEmptyObject(this.universalcontent) || typeof this.universalcontent['_Content'] === 'undefined') {
            return "";
        }
        var t_content = this.universalcontent['_Content'].filter(function (x) { return x.content_mapper.toLowerCase() == content_mapper.toLowerCase(); });
        if (t_content.length > 0) {
            return t_content[0].text;
        }
        else {
            return "";
        }
    };
    AdministrationComponent.prototype.setUniversalContent = function (content_mapper, text) {
        if ($.isEmptyObject(this.universalcontent) || typeof this.universalcontent['_Content'] === 'undefined') {
            return;
        }
        for (var key in this.universalcontent['_Content']) {
            if (this.universalcontent['_Content'][key]["content_mapper"].toLowerCase() == content_mapper.toLowerCase()) {
                this.universalcontent['_Content'][key]["text"] = text;
            }
        }
    };
    AdministrationComponent.prototype.initChartWithDelay = function () {
        var _this = this;
        setTimeout(function () {
            _this.user_activity_task_active = '10d';
            _this.updateChartUserActivityTask(10, 0, 0, false);
        }, 1000);
    };
    AdministrationComponent.prototype.updateChartUserActivityTask = function (d, m, y, init) {
        var ObjectForCalculation = [];
        var tempObject = typeof this.getStatistics()["Administration_Statistic_1"] !== 'undefined' ? JSON.parse(this.getStatistics()["Administration_Statistic_1"]["json_statistic"]) : [];
        for (var key in tempObject) {
            ObjectForCalculation.push({ "data": tempObject[key]['data'], "ts": tempObject[key]['ts'] });
        }
        var CalculatedChartDataActivityTask = this.lService.getLabelsAndDataForChart(JSON.stringify(ObjectForCalculation), d, m, y, 'diff');
        var lineChartData_canvas_user_activity_task = {
            labels: $.map(CalculatedChartDataActivityTask['labels'], function (el) { return el; }),
            datasets: [
                {
                    strokeColor: 'rgba(251,78,0,1)',
                    pointColor: 'rgba(251,78,0,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    data: $.map(CalculatedChartDataActivityTask['data'], function (el) { return el; })
                }
            ]
        };
        var biggestValue = 0;
        for (var key_1 in CalculatedChartDataActivityTask["data"]) {
            if (CalculatedChartDataActivityTask["data"][key_1] > biggestValue)
                biggestValue = CalculatedChartDataActivityTask["data"][key_1];
        }
        var settingsObj_canvas_user_activity_task = {
            animation: false,
            responsive: true,
            scaleFontColor: '#000',
            bezierCurve: false,
            datasetFill: false,
            scaleOverride: true,
            scaleSteps: 8,
            scaleStepWidth: Math.ceil(biggestValue / 8) + 1,
            scaleStartValue: 0,
            scaleLineColor: 'rgba(0,0,0,.6)',
            scaleGridLineColor: 'rgba(0,0,0,.2)',
            graphTitleFontSize: 18,
            graphTitleFontColor: '#000',
        };
        if (typeof init === 'undefined' || init == false) {
            var t_canvas = document.getElementById('canvas_user_activity_task');
            updateChart(t_canvas.getContext('2d'), lineChartData_canvas_user_activity_task, settingsObj_canvas_user_activity_task, false, false);
        }
        else {
            $('#canvas_user_activity_task').attr('width', $('#canvas_user_activity_task').parent().width());
            var t_canvas = document.getElementById('canvas_user_activity_task');
            new Chart(t_canvas.getContext('2d')).Line(lineChartData_canvas_user_activity_task, settingsObj_canvas_user_activity_task);
        }
    };
    AdministrationComponent.prototype.showCanvasForTask = function (task_id, location_id) {
        $("#qrcode-task-img" + task_id).qrcode({
            "width": 100,
            "height": 100,
            "background": '#fff',
            "fill": '#000',
            "text": this.lService.getSolveLinkForLocationTask(task_id, location_id)
        });
    };
    AdministrationComponent.prototype.showCanvasForLocation = function (location_id) {
        $("#qrcode-location-img" + location_id).qrcode({
            "width": 100,
            "height": 100,
            "background": '#fff',
            "fill": '#000',
            "text": this.lService.getLocationFoundLink(location_id)
        });
    };
    AdministrationComponent.prototype.upsertGeneralContent = function () {
        var _this = this;
        var t_generalcontent = {
            HOME_1: this.getUniversalContent("HOME_1"),
            MAIN_PICTURE_ID: this.getUniversalContent("MAIN_PICTURE_ID"),
            ROOT_LOCATION: this.getUniversalContent("ROOT_LOCATION"),
            START: this.getUniversalContent("START"),
            TOU: this.getUniversalContent("TOU"),
            PP: this.getUniversalContent("PP"),
            IMPRESSUM: this.getUniversalContent("IMPRESSUM")
        };
        this.lService.upsertGeneralContent(t_generalcontent).subscribe(function (data) {
            if (typeof data.result !== 'undefined' && data.result == true) {
                _this.upsertGeneralContentSuccessful = true;
                setTimeout(function () { _this.upsertGeneralContentSuccessful = false; }, 8000);
                _this.lService.loadSpecificContent('administrationcontent');
            }
            else {
                window.alert("Bitte lass die Seite neuladen und überprüfe deine Eingaben!");
            }
        }, function (error) {
            window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
        });
    };
    AdministrationComponent.prototype.upsertTask = function (taskdata) {
        var _this = this;
        console.log(taskdata);
        if (typeof taskdata.de_DE.taskname === 'undefined' || taskdata.de_DE.taskname.length == 0) {
            window.alert("Bitte wähle einen geeigneten Aufgabennamen!");
            return;
        }
        if (typeof taskdata.de_DE.description_long === 'undefined' || taskdata.de_DE.description_long.length == 0) {
            window.alert("Bitte wähle eine Aufgabenbeschreibung!");
            return;
        }
        if (typeof taskdata.de_DE.solved_description === 'undefined' || taskdata.de_DE.solved_description.length == 0) {
            window.alert("Bitte gib eine Meldung für den User ein, welche er erhält, wenn er die Aufgabe erfolgreich gelöst hat!");
            return;
        }
        if (typeof taskdata.score_rule === 'undefined' || taskdata.score_rule.length == 0 || !this.isNumeric(taskdata.score_rule)) {
            window.alert("Bitte wähle die Exp. für die Aufgabe bzw. überprüfe, ob es sich um eine Zahl handelt!");
            return;
        }
        if (typeof taskdata.task_type_id === 'undefined' || taskdata.task_type_id == -1) {
            window.alert("Bitte wähle vorher einen korrekten Aufgabentypen aus!");
            return;
        }
        if (typeof taskdata.json_task_data === 'undefined') {
            window.alert("Es ist ein schwerwiegender Fehler aufgetreten. Bitte lass die Seite neuladen und versuche es erneut!");
            return;
        }
        if (taskdata.task_type_id == 1) {
            if (typeof taskdata.json_task_data.de_DE === 'undefined' || typeof taskdata.json_task_data.de_DE.question === 'undefined' || taskdata.json_task_data.de_DE.question.length == 0) {
                window.alert("Bitte gib eine Frage ein!");
                return;
            }
            else if (typeof taskdata.json_task_data.de_DE === 'undefined' || typeof taskdata.json_task_data.de_DE.a1 === 'undefined' || taskdata.json_task_data.de_DE.a1.length == 0) {
                window.alert("Bitte gib zu deiner Frage die richtige Antwort ein!");
                return;
            }
            else if (typeof taskdata.json_task_data.de_DE === 'undefined' || typeof taskdata.json_task_data.de_DE.a2 === 'undefined' || taskdata.json_task_data.de_DE.a2.length == 0) {
                window.alert("Bitte überprüfe deine falschen Antworten!");
                return;
            }
            else if (typeof taskdata.json_task_data.de_DE === 'undefined' || typeof taskdata.json_task_data.de_DE.a3 === 'undefined' || taskdata.json_task_data.de_DE.a3.length == 0) {
                window.alert("Bitte überprüfe deine falschen Antworten!");
                return;
            }
            else if (typeof taskdata.json_task_data.de_DE === 'undefined' || typeof taskdata.json_task_data.de_DE.a4 === 'undefined' || taskdata.json_task_data.de_DE.a4.length == 0) {
                window.alert("Bitte überprüfe deine falschen Antworten!");
                return;
            }
        }
        else if (taskdata.task_type_id == 2) {
            if (typeof taskdata.json_task_data.loc === 'undefined' || taskdata.json_task_data.loc == -1) {
                window.alert("Bitte überprüfe den aufgabenspezifischen Ort!");
                return;
            }
        }
        else if (taskdata.task_type_id == 3) {
            if (typeof taskdata.json_task_data.isbn === 'undefined' || taskdata.json_task_data.isbn.length == 0) {
                window.alert("Bitte überprüfe die ISBN zu deiner Aufgabe nochmals!");
                return;
            }
        }
        else if (taskdata.task_type_id == 4) {
            if (typeof taskdata.json_task_data.de_DE === 'undefined' || typeof taskdata.json_task_data.de_DE.s1 === 'undefined' || taskdata.json_task_data.de_DE.s1.length == 0) {
                window.alert("Bitte überprüfe deine Eingabe zur 1.Quelle!");
                return;
            }
            else if (typeof taskdata.json_task_data.de_DE === 'undefined' || typeof taskdata.json_task_data.de_DE.s2 === 'undefined' || taskdata.json_task_data.de_DE.s2.length == 0) {
                window.alert("Bitte überprüfe deine Eingabe zur 2.Quelle!");
                return;
            }
            else if (typeof taskdata.json_task_data.de_DE === 'undefined' || typeof taskdata.json_task_data.de_DE.s3 === 'undefined' || taskdata.json_task_data.de_DE.s3.length == 0) {
                window.alert("Bitte überprüfe deine Eingabe zur 3.Quelle!");
                return;
            }
        }
        else if (taskdata.task_type_id == 5) {
            if (typeof taskdata.json_task_data.de_DE === 'undefined' || typeof taskdata.json_task_data.de_DE.text === 'undefined' || taskdata.json_task_data.de_DE.text.length == 0) {
                window.alert("Bitte überprüfe die Eingabe zum Lückentext!");
                return;
            }
            else if (typeof taskdata.json_task_data.de_DE === 'undefined' || typeof taskdata.json_task_data.de_DE.answer === 'undefined' || taskdata.json_task_data.de_DE.answer.length == 0) {
                window.alert("Bitte überprüfe die Eingabe zur Antwort bei deiner Lückentext-Aufgabe!");
                return;
            }
        }
        else if (taskdata.task_type_id == 6) {
        }
        else {
            window.alert("Bitte wähle vorher einen korrekten Aufgabentypen aus!");
            return;
        }
        if (typeof taskdata.task_id !== 'undefined' && taskdata.task_id == -1) {
            this.lService.upsertTask(taskdata).subscribe(function (data) {
                if (typeof data.result !== 'undefined' && data.result == true) {
                    _this.upsertNewTaskSuccessful = true;
                    setTimeout(function () { _this.upsertNewTaskSuccessful = false; }, 8000);
                    _this.new_task = _this.new_task_template;
                    _this.lService.loadSpecificContent('administrationcontent');
                }
                else {
                    window.alert("Bitte lass die Seite neuladen und überprüfe deine Eingaben!");
                }
            }, function (error) {
                window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
            });
        }
        else if (typeof taskdata.task_id !== 'undefined' && taskdata.task_id != -1) {
            this.lService.upsertTask(taskdata).subscribe(function (data) {
                if (typeof data.result !== 'undefined' && data.result == true) {
                    taskdata.upsert_successful = true;
                    setTimeout(function () { taskdata.upsert_successful = false; }, 8000);
                }
                else {
                    window.alert("Bitte lass die Seite neuladen und überprüfe deine Eingaben!");
                }
            }, function (error) {
                window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
            });
        }
        return;
    };
    AdministrationComponent.prototype.upsertBadge = function (badgedata) {
        var _this = this;
        console.log(badgedata);
        if (typeof badgedata.de_DE.badgename === 'undefined' || badgedata.de_DE.badgename.length == 0) {
            window.alert("Bitte wähle einen geeigneten Abzeichennamen!");
            return;
        }
        if (typeof badgedata.de_DE.description_long === 'undefined' || badgedata.de_DE.description_long.length == 0) {
            window.alert("Bitte wähle eine Abzeichenbeschreibung!");
            return;
        }
        if (typeof badgedata.de_DE.solved_description === 'undefined' || badgedata.de_DE.solved_description.length == 0) {
            window.alert("Bitte gib eine Meldung für den User ein, welche er erhält, wenn er das Abzeichen erfolgreich gelöst hat!");
            return;
        }
        if (typeof badgedata.json_task_ids === 'undefined' || badgedata.json_task_ids.length == 0) {
            window.alert("Ein Abzeichen, für welches die Lösung keiner Aufgabe nötig ist, ist nicht möglich!");
            return;
        }
        if (typeof badgedata.picture_id === 'undefined' || badgedata.picture_id == -1) {
            window.alert("Bitte wähle ein Bild für das Abzeichen aus!");
            return;
        }
        if (typeof badgedata.badge_id !== 'undefined' && badgedata.badge_id == -1) {
            this.lService.upsertBadge(badgedata).subscribe(function (data) {
                if (typeof data.result !== 'undefined' && data.result == true) {
                    _this.upsertNewBadgeSuccessful = true;
                    setTimeout(function () {
                        _this.upsertNewBadgeSuccessful = false;
                    }, 8000);
                    _this.new_badge = _this.new_badge_template;
                    _this.lService.loadSpecificContent('administrationcontent');
                }
                else {
                    window.alert("Bitte lass die Seite neuladen und überprüfe deine Eingaben!");
                }
            }, function (error) {
                window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
            });
        }
        else if (typeof badgedata.badge_id !== 'undefined' && badgedata.badge_id != -1) {
            this.lService.upsertBadge(badgedata).subscribe(function (data) {
                if (typeof data.result !== 'undefined' && data.result == true) {
                    badgedata.upsert_successful = true;
                    setTimeout(function () { badgedata.upsert_successful = false; }, 8000);
                }
                else {
                    window.alert("Bitte lass die Seite neuladen und überprüfe deine Eingaben!");
                }
            }, function (error) {
                window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
            });
        }
        return;
    };
    AdministrationComponent.prototype.upsertQuest = function (questdata) {
        var _this = this;
        console.log(questdata);
        if (typeof questdata.de_DE.questname === 'undefined' || questdata.de_DE.questname.length == 0) {
            window.alert("Bitte wähle einen geeigneten Questnamen!");
            return;
        }
        if (typeof questdata.de_DE.solved_description === 'undefined' || questdata.de_DE.solved_description.length == 0) {
            window.alert("Bitte gib eine Meldung für den User ein, welche er erhält, wenn er den Quest erfolgreich gelöst hat!");
            return;
        }
        if (typeof questdata.score_rule === 'undefined' || questdata.score_rule.length == 0 || !this.isNumeric(questdata.score_rule)) {
            window.alert("Bitte wähle die Exp. für den Quest bzw. überprüfe, ob es sich um eine Zahl handelt!");
            return;
        }
        if (typeof questdata.location_id !== 'undefined' && questdata.location_id == -1 &&
            typeof questdata.json_pre_quest_ids !== 'undefined' && questdata.json_pre_quest_ids.length == 0 &&
            typeof questdata.is_starter_quest !== 'undefined' && questdata.is_starter_quest == '0') {
            window.alert("Vorsicht: Dieser Quest wird niemals gefunden bzw. spielbar sein, da er an keinem Ort gefunden wird, keine Vorquests hat und kein Starterquest (Quest, welche der User von Beginn an lösen kann) ist. Bitte sorge dafür, dass genau eins davon zutrifft!");
            return;
        }
        if (typeof questdata.json_pre_quest_ids !== 'undefined' && questdata.json_pre_quest_ids.length != 0 &&
            typeof questdata.is_starter_quest !== 'undefined' && questdata.is_starter_quest == '1') {
            window.alert("Vorsicht: Dieser Quest enthält einen logischen Fehler, da ein Quest mit Vorquests niemals ein Starterquest (Quest, welche der User von Beginn an lösen kann) sein kann! Bedenke, dass ein Quest mit Vorquests automatisch dem User zugeteilt wird, wenn er alle Vorquests abgeschlossen hat!");
            return;
        }
        if (typeof questdata.location_id !== 'undefined' && questdata.location_id != -1 &&
            typeof questdata.is_starter_quest !== 'undefined' && questdata.is_starter_quest == '1') {
            window.alert("Vorsicht: Dieser Quest enthält einen logischen Fehler, da ein Quest, welcher an einem Ort gefunden werden kann, niemals ein Starterquest (Quest, welche der User von Beginn an lösen kann) sein kann! Bedenke, dass ein Quest, welcher gefunden wird, nicht schon zu Beginn dem User gestellt werden kann!");
            return;
        }
        if (typeof questdata.json_quest_task_ids === 'undefined' || questdata.json_quest_task_ids.length == 0) {
            window.alert("Schwerwiegender interner Fehler. Bitte lass die Seite neuladen!");
            return;
        }
        for (var i = 0; i < questdata.json_quest_task_ids.length; i++) {
            if (questdata.json_quest_task_ids[i].length == 0) {
                window.alert("Fehler bei den Aufgaben für Stufe " + (i + 1) + ": Keine Aufgaben ausgewählt!");
                return;
            }
        }
        if (typeof questdata.quest_id !== 'undefined' && questdata.quest_id == -1) {
            this.lService.upsertQuest(questdata).subscribe(function (data) {
                if (typeof data.result !== 'undefined' && data.result == true) {
                    _this.upsertNewQuestSuccessful = true;
                    setTimeout(function () { _this.upsertNewQuestSuccessful = false; }, 8000);
                    _this.new_quest = _this.new_quest_template;
                    _this.lService.loadSpecificContent('administrationcontent');
                }
                else {
                    window.alert("Bitte lass die Seite neuladen und überprüfe deine Eingaben!");
                }
            }, function (error) {
                window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
            });
        }
        else if (typeof questdata.quest_id !== 'undefined' && questdata.quest_id != -1) {
            this.lService.upsertQuest(questdata).subscribe(function (data) {
                if (typeof data.result !== 'undefined' && data.result == true) {
                    questdata.upsert_successful = true;
                    setTimeout(function () { questdata.upsert_successful = false; }, 8000);
                }
                else {
                    window.alert("Bitte lass die Seite neuladen und überprüfe deine Eingaben!");
                }
            }, function (error) {
                window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
            });
        }
        return;
    };
    AdministrationComponent.prototype.upsertLocation = function (locationdata) {
        var _this = this;
        console.log(locationdata);
        if (typeof locationdata.de_DE.locationname === 'undefined' || locationdata.de_DE.locationname.length == 0) {
            window.alert("Bitte wähle einen geeigneten Ortsnamen!");
            return;
        }
        if (typeof locationdata.geo_lati === 'undefined' || locationdata.geo_lati.length == 0 || !this.isNumeric(locationdata.geo_lati)) {
            window.alert("Bitte gib einen korrekten Breitengrad ein!");
            return;
        }
        if (typeof locationdata.geo_long === 'undefined' || locationdata.geo_long.length == 0 || !this.isNumeric(locationdata.geo_long)) {
            window.alert("Bitte gib einen korrekten Längengrad ein!");
            return;
        }
        if (typeof locationdata.geo_radius === 'undefined' || locationdata.geo_radius.length == 0 || !this.isNumeric(locationdata.geo_radius)) {
            window.alert("Bitte gib einen korrekten Radius ein!");
            return;
        }
        if (typeof locationdata.location_id !== 'undefined' && locationdata.location_id == -1) {
            this.lService.upsertLocation(locationdata).subscribe(function (data) {
                if (typeof data.result !== 'undefined' && data.result == true) {
                    _this.upsertNewLocationSuccessful = true;
                    setTimeout(function () { _this.upsertNewLocationSuccessful = false; }, 8000);
                    _this.new_location = _this.new_location_template;
                    _this.lService.loadSpecificContent('administrationcontent');
                }
                else {
                    window.alert("Bitte lass die Seite neuladen und überprüfe deine Eingaben!");
                }
            }, function (error) {
                window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
            });
        }
        return;
    };
    AdministrationComponent.prototype.resetFacultyScore = function () {
        if (confirm("Soll jetzt der Fakultätshighscore zurückgesetzt werden?") == true) {
            this.lService.resetFacultyScore().subscribe(function (data) {
                if (typeof data.result !== 'undefined' && data.result == true) {
                    window.alert("Der Fakultätshighscore wurde erfolgreich zurückgesetzt!");
                }
                else {
                    window.alert("Bitte lass die Seite neuladen und überprüfe deine Eingaben!");
                }
            }, function (error) {
                window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
            });
        }
    };
    AdministrationComponent.prototype.deleteAdmin = function (user_id) {
    };
    AdministrationComponent.prototype.setNewAdmin = function () {
        var _this = this;
        if (typeof this.addAdminId === 'undefined' || this.addAdminId == -1) {
            window.alert("Bitte wähle zuerst einen User aus!");
            return;
        }
        this.lService.setNewAdmin(this.addAdminId).subscribe(function (data) {
            if (typeof data.result !== 'undefined' && data.result == true) {
                _this.addedNewAdminSuccessful = true;
                setTimeout(function () { _this.addedNewAdminSuccessful = false; }, 8000);
                _this.addAdminId = -1;
                _this.lService.loadSpecificContent('administrationcontent');
            }
            else {
                window.alert("Bitte lass die Seite neuladen und überprüfe deine Eingaben!");
            }
        }, function (error) {
            window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
        });
    };
    AdministrationComponent.prototype.setTaskActiveInactive = function (taskdata) {
        console.log(taskdata);
        taskdata.is_task_active = taskdata.is_task_active == "1" ? "0" : "1";
        this.lService.upsertTask(taskdata).subscribe(function (data) {
            if (typeof data.result !== 'undefined' && data.result == true) {
            }
            else {
                window.alert("Es ist ein Fehler aufgetreten. Bitte lass die Seite neuladen!");
            }
        }, function (error) {
            window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
        });
    };
    AdministrationComponent.prototype.setTaskDeleteTask = function (task_id) {
        var _this = this;
        if (confirm("Soll die Aufgabe jetzt gelöscht werden?") == true) {
            this.lService.deleteTask(task_id).subscribe(function (data) {
                if (typeof data.result !== 'undefined' && data.result == true) {
                    _this.lService.loadSpecificContent('administrationcontent');
                }
                else {
                    window.alert("Es ist ein Fehler aufgetreten. Bitte lass die Seite neuladen!");
                }
            }, function (error) {
                window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
            });
        }
    };
    AdministrationComponent.prototype.setBadgeActiveInactive = function (badgedata) {
        console.log(badgedata);
        badgedata.is_active = badgedata.is_active == "1" ? "0" : "1";
        this.lService.upsertBadge(badgedata).subscribe(function (data) {
            if (typeof data.result !== 'undefined' && data.result == true) {
            }
            else {
                window.alert("Es ist ein Fehler aufgetreten. Bitte lass die Seite neuladen!");
            }
        }, function (error) {
            window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
        });
    };
    AdministrationComponent.prototype.setBadgeDeleteBadge = function (badge_id) {
        var _this = this;
        if (confirm("Soll das Abzeichen jetzt gelöscht werden?") == true) {
            this.lService.deleteBadge(badge_id).subscribe(function (data) {
                if (typeof data.result !== 'undefined' && data.result == true) {
                    _this.lService.loadSpecificContent('administrationcontent');
                }
                else {
                    window.alert("Es ist ein Fehler aufgetreten. Bitte lass die Seite neuladen!");
                }
            }, function (error) {
                window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
            });
        }
    };
    AdministrationComponent.prototype.setQuestActiveInactive = function (questdata) {
        console.log(questdata);
        questdata.is_active = questdata.is_active == "1" ? "0" : "1";
        this.lService.upsertQuest(questdata).subscribe(function (data) {
            if (typeof data.result !== 'undefined' && data.result == true) {
            }
            else {
                window.alert("Es ist ein Fehler aufgetreten. Bitte lass die Seite neuladen!");
            }
        }, function (error) {
            window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
        });
    };
    AdministrationComponent.prototype.setQuestDeleteQuest = function (quest_id) {
        var _this = this;
        if (confirm("Soll der Quest jetzt gelöscht werden?") == true) {
            this.lService.deleteQuest(quest_id).subscribe(function (data) {
                if (typeof data.result !== 'undefined' && data.result == true) {
                    _this.lService.loadSpecificContent('administrationcontent');
                }
                else {
                    window.alert("Es ist ein Fehler aufgetreten. Bitte lass die Seite neuladen!");
                }
            }, function (error) {
                window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
            });
        }
    };
    AdministrationComponent.prototype.setLocationDeleteLocation = function (location_id) {
        var _this = this;
        if (confirm("Soll der Ort jetzt gelöscht werden?") == true) {
            this.lService.deleteLocation(location_id).subscribe(function (data) {
                if (typeof data.result !== 'undefined' && data.result == true) {
                    _this.lService.loadSpecificContent('administrationcontent');
                }
                else {
                    window.alert("Es ist ein Fehler aufgetreten. Bitte lass die Seite neuladen!");
                }
            }, function (error) {
                window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
            });
        }
    };
    AdministrationComponent.prototype.sendEmailMessageToAllUsers = function () {
        var _this = this;
        if (this.loading_sendemails == true) {
            return;
        }
        if (typeof this.send_email.headline === 'undefined' || this.send_email.headline.length == 0) {
            window.alert("Bitte gib zuerst einen Betreff ein!");
            return;
        }
        if (typeof this.send_email.content === 'undefined' || this.send_email.content.length == 0) {
            window.alert("Bitte gib zuerst eine Nachricht ein!");
            return;
        }
        this.loading_sendemails = true;
        this.lService.sendEmailMessageToAllUsers(this.send_email).subscribe(function (data) {
            if (typeof data.result !== 'undefined' && data.result == true) {
                _this.sendEmailToAllUsersSuccessful = true;
                setTimeout(function () { _this.sendEmailToAllUsersSuccessful = false; }, 5000);
                _this.send_email.content = "";
                _this.send_email.headline = "";
            }
            else {
                window.alert("Es ist ein Fehler aufgetreten. Bitte lass die Seite neuladen!");
            }
            _this.loading_sendemails = false;
        }, function (error) {
            window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
            _this.loading_sendemails = false;
        });
    };
    AdministrationComponent.prototype.isNumeric = function (value) {
        return typeof value !== 'undefined' && !isNaN(parseFloat(value));
    };
    AdministrationComponent.prototype.sendToConsole = function (value) {
        console.log(value);
    };
    return AdministrationComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AdministrationComponent.prototype, "user", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AdministrationComponent.prototype, "universalcontent", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], AdministrationComponent.prototype, "reload", void 0);
AdministrationComponent = __decorate([
    core_1.Component({
        selector: 'administration-component',
        providers: [libgame_service_1.LibgameService],
        template: "\n\n  <div class=\"row-controlling row\">\n\n      <p class=\"overall-headline\" style=\"width:100%;text-align:center;padding: 10px 0px!important;\">CONTROLLING</p>\n\n      <div class=\"col-xs-12\" style=\"padding:0;\">\n\n          <div id=\"cf-ad-stats\" class=\"content-frame\">\n\n              <p class=\"headline\">Daten und Fakten</p>\n\n              <div class=\"col-xs-12\" style=\"width:100%;\">\n\n                  <div  style=\"vertical-align:top;width:100%;color:rgb(255,255,255);\">\n\n                      <div id=\"cf-ad-stats-quests-count\" class=\"col-xs-12 col-sm-4\" style=\"vertical-align:top;\">\n                          <p style=\"font-size:1.3em;font-weight:bold;text-align:center;\">Aktive Quests</p>\n                          <p style=\"font-size:1em;text-align:center;\">{{getCountActiveQuests()}}</p>\n                          <div style=\"clear:both;\"></div>\n                      </div>\n\n                      <div id=\"cf-ad-stats-badges-count\" class=\"col-xs-12 col-sm-4\" style=\"vertical-align:top;\">\n                          <p style=\"font-size:1.3em;font-weight:bold;text-align:center;\">Aktive Abzeichen</p>\n                          <p style=\"font-size:1em;text-align:center;\">{{getCountActiveBadges()}}</p>\n                          <div style=\"clear:both;\"></div>\n                      </div>\n\n                      <div id=\"cf-ad-stats-tasks-count\" class=\"col-xs-12 col-sm-4\" style=\"vertical-align:top;\">\n                          <p style=\"font-size:1.3em;font-weight:bold;text-align:center;\">Aktive Aufgaben</p>\n                          <p style=\"font-size:1em;text-align:center;\">{{getCountActiveTasks()}}</p>\n                          <div style=\"clear:both;\"></div>\n                      </div>\n\n                  </div>\n              </div>\n\n              <div class=\"col-xs-12\" style=\"width:100%;\">\n\n                  <div style=\"vertical-align:top;width:100%;color:rgb(255,255,255);\">\n\n                      <div id=\"cf-ad-stats-user-count\" class=\"col-xs-12 col-sm-3\" style=\"vertical-align:top;\">\n                          <p style=\"font-size:1.3em;font-weight:bold;text-align:center;\">Nutzer</p>\n                          <p style=\"font-size:1em;text-align:center;\">{{getCountUsers()}}</p>\n                          <div style=\"clear:both;\"></div>\n                      </div>\n\n                      <div id=\"cf-ad-stats-user-last-active\" class=\"col-xs-12 col-sm-3\" style=\"vertical-align:top;\">\n                          <p style=\"font-size:1.3em;font-weight:bold;text-align:center;\">ZULETZT AKTIVE USER [2 TAGE]</p>\n                          <p style=\"font-size:1em;text-align:center;\">{{getCountUsersActiveLast2Days()}}</p>\n                          <div style=\"clear:both;\"></div>\n                      </div>\n\n                      <div id=\"cf-ad-stats-user-completed-quests\" class=\"col-xs-12 col-sm-3\" style=\"vertical-align:top;\">\n                          <p style=\"font-size:1.3em;font-weight:bold;text-align:center;\">USER, WELCHE ALLE QUESTS GEL\u00D6ST HABEN</p>\n                          <p style=\"font-size:1em;text-align:center;\">{{getCountUsersCompletedAllQuests()}}</p>\n                          <div style=\"clear:both;\"></div>\n                      </div>\n\n                      <div id=\"cf-ad-stats-user-completed-badges\" class=\"col-xs-12 col-sm-3\" style=\"vertical-align:top;\">\n                          <p style=\"font-size:1.3em;font-weight:bold;text-align:center;\">USER, WELCHE ALLE ABZEICHEN GESAMMELT HABEN</p>\n                          <p style=\"font-size:1em;text-align:center;\">{{getCountUsersCompletedAllBadges()}}</p>\n                          <div style=\"clear:both;\"></div>\n                      </div>\n\n                  </div>\n\n\n              </div>\n              <div style=\"clear:both;\"></div>\n\n\n          </div>\n\n\n          <div id=\"cf-ad-user-activity-task\" class=\"content-frame\">\n\n              <p class=\"headline headline-as-button\" (click)=\"show_c_solved_tasks_chart=show_c_solved_tasks_chart?false:true;initChartWithDelay();\">Chart: Gel\u00F6ste Aufgaben</p>\n\n              <div [hidden]=\"!show_c_solved_tasks_chart\" style=\"width:100%;\">\n                  <div style=\"display:inline-block;border:2px solid rgb(0,0,0);border-radius:4px;\">\n                    <div (click)=\"updateChartUserActivityTask(10,0,0);user_activity_task_active='10d';\" [class.whiteButtonClass-currentItem]=\"user_activity_task_active=='10d'\" [class.whiteButtonClass]=\"user_activity_task_active!='10d'\" class=\"depend-on-device-none-to-33-percentage-width\" style=\"float:left;padding:5px 10px;\">10 Tage</div>\n                    <div (click)=\"updateChartUserActivityTask(30,0,0);user_activity_task_active='30d';\" [class.whiteButtonClass-currentItem]=\"user_activity_task_active=='30d'\" [class.whiteButtonClass]=\"user_activity_task_active!='30d'\" class=\"depend-on-device-none-to-33-percentage-width\" style=\"float:left;padding:5px 10px;\">30 Tage</div>\n                    <div (click)=\"updateChartUserActivityTask(0,6,0);user_activity_task_active='6m';\" [class.whiteButtonClass-currentItem]=\"user_activity_task_active=='6m'\" [class.whiteButtonClass]=\"user_activity_task_active!='6m'\" class=\"depend-on-device-none-to-33-percentage-width\" style=\"float:left;padding:5px 10px;\">6 Monate</div>\n                    <div (click)=\"updateChartUserActivityTask(0,12,0);user_activity_task_active='12m';\" [class.whiteButtonClass-currentItem]=\"user_activity_task_active=='12m'\" [class.whiteButtonClass]=\"user_activity_task_active!='12m'\" class=\"depend-on-device-none-to-33-percentage-width\" style=\"float:left;padding:5px 10px;\">12 Monate</div>\n                    <div (click)=\"updateChartUserActivityTask(0,24,0);user_activity_task_active='24m';\" [class.whiteButtonClass-currentItem]=\"user_activity_task_active=='24m'\" [class.whiteButtonClass]=\"user_activity_task_active!='24m'\" class=\"depend-on-device-none-to-33-percentage-width\" style=\"float:left;padding:5px 10px;\">24 Monate</div>\n                    <div (click)=\"updateChartUserActivityTask(0,0,5);user_activity_task_active='5y';\" [class.whiteButtonClass-currentItem]=\"user_activity_task_active=='5y'\" [class.whiteButtonClass]=\"user_activity_task_active!='5y'\" class=\"depend-on-device-none-to-33-percentage-width\" style=\"float:left;padding:5px 10px;\">5 Jahre</div>\n                    <div style=\"clear:both;\"></div>\n                  </div>\n              </div>\n\n              <div [hidden]=\"!show_c_solved_tasks_chart\" style=\"width:100%!important;min-width:100px!important;\">\n                  <canvas id=\"canvas_user_activity_task\" height=\"400\"></canvas>\n              </div>\n\n          </div>\n\n      </div>\n\n\n  </div>\n\n\n  <div class=\"row-content-management row\">\n\n      <p class=\"overall-headline\" style=\"width:100%;text-align:center;\">CONTENT-MANAGEMENT</p>\n\n      <div class=\"col-xs-12\" style=\"padding:0;\">\n\n          <div class=\"content-frame\">\n\n              <p class=\"headline headline-as-button\" (click)=\"show_cm_general=show_cm_general?false:true;\">Allgemein</p>\n\n              <div [hidden]=\"!show_cm_general\" style=\"width:100%;\">\n\n                  <!-- Adding Location -->\n                  <div class=\"col-xs-12 col-sm-4 col-sm-offset-4 adm-frame\">\n\n                      <p class=\"headline\">Administriere Allgemeines</p>\n\n                      <hr class=\"hrForAdministration\">\n                      <label style=\"width:100%;text-align:center;padding-left:0.5em;\">Hauptbild / Logo des Spiels<span style=\"color:#e9266d\">*</span></label>\n                      <br>\n                      <div >\n                          <div style=\"float:left;width:50%;margin-top:10px;\">\n                              <select [value]=\"getUniversalContent('MAIN_PICTURE_ID')\" (change)=\"setUniversalContent('MAIN_PICTURE_ID',$event.target.value);\" style=\"width:100%;\">\n                                  <option *ngFor=\"let t_picture of getUniversalContentPictures();\" value='{{t_picture.picture_id}}'>{{t_picture.picturename}}</option>\n                              </select>\n                          </div>\n                          <div style=\"float:left;width:50%;text-align:right;\">\n                              <uploadpicture-component (reload)=\"reload.emit(true);\"></uploadpicture-component>\n                          </div>\n                          <div style=\"clear:both;margin:0;height:0;\"></div>\n                          <div [hidden]=\"(getUniversalContent('MAIN_PICTURE_ID')+'').length == 0\" style=\"text-align:center;\">\n                              <label style=\"width:100%;text-align:center;\">Hauptbild / Logo des Spiels Vorschau</label>\n                              <br>\n                              <img style='width:30%;' src='{{(getUniversalContent(\"MAIN_PICTURE_ID\")+\"\").length != 0 ? lService.getPictureLink(getUniversalContent(\"MAIN_PICTURE_ID\")) : \"\"}}'>\n                          </div>\n                      </div>\n                      <hr class=\"hrForAdministration\">\n\n                      <label style=\"width:100%;text-align:center;padding-left:0.5em;\">Zentraler Ort (Dieser Ort bestimmt, auf welchen Punkt beim \u00D6ffnen der Aufgabensuche gezoomt werden soll)</label>\n                      <br>\n                      <select [value]=\"getUniversalContent('ROOT_LOCATION')\" (change)=\"setUniversalContent('ROOT_LOCATION',$event.target.value);\"  style=\"width:100%;\">\n                        <option value='-1' selected=\"selected\">--None--</option>\n                        <option *ngFor=\"let t_location of getLocations();\" value='{{t_location.location_id}}'>-- {{t_location.locationname}} --</option>\n                      </select>\n                      <hr class=\"hrForAdministration\">\n\n                      <label style=\"width:100%;text-align:center;padding-left:0.5em;\">Inhalt der Startseite (bevor der User eingeloggt ist)<span style=\"color:#e9266d\">*</span></label>\n                      <br>\n                      <htmleditor-component [value]=\"getUniversalContent('START')\" [pictures]=\"getUniversalContentPictures()\" (htmlcontent)=\"setUniversalContent('START',$event);\" ></htmleditor-component>\n                      <hr class=\"hrForAdministration\">\n\n                      <label style=\"width:100%;text-align:center;padding-left:0.5em;\">Inhalt der Startseite (wenn der User eingeloggt ist; \"Was kann ich hier machen?\")<span style=\"color:#e9266d\">*</span></label>\n                      <br>\n                      <htmleditor-component [value]=\"getUniversalContent('HOME_1')\" [pictures]=\"getUniversalContentPictures()\" (htmlcontent)=\"setUniversalContent('HOME_1',$event);\" ></htmleditor-component>\n                      <hr class=\"hrForAdministration\">\n\n                      <label style=\"width:100%;text-align:center;padding-left:0.5em;\">AGB<span style=\"color:#e9266d\">*</span></label>\n                      <br>\n                      <htmleditor-component [value]=\"getUniversalContent('TOU')\" [pictures]=\"getUniversalContentPictures()\" (htmlcontent)=\"setUniversalContent('TOU',$event);\" ></htmleditor-component>\n                      <hr class=\"hrForAdministration\">\n\n                      <label style=\"width:100%;text-align:center;padding-left:0.5em;\">Datenschutzerkl\u00E4rung<span style=\"color:#e9266d\">*</span></label>\n                      <br>\n                      <htmleditor-component [value]=\"getUniversalContent('PP')\" [pictures]=\"getUniversalContentPictures()\" (htmlcontent)=\"setUniversalContent('PP',$event);\" ></htmleditor-component>\n                      <hr class=\"hrForAdministration\">\n\n                      <label style=\"width:100%;text-align:center;padding-left:0.5em;\">Impressum<span style=\"color:#e9266d\">*</span></label>\n                      <br>\n                      <htmleditor-component [value]=\"getUniversalContent('IMPRESSUM')\" [pictures]=\"getUniversalContentPictures()\" (htmlcontent)=\"setUniversalContent('IMPRESSUM',$event);\" ></htmleditor-component>\n\n                      <button (click)=\"upsertGeneralContent();\" class=\"button\" style=\"margin-top:2em;\">Speichere die allgemeinen Informationen</button>\n                      <div style=\"width:100%;text-align:center;\">\n                        <div *ngIf=\"upsertGeneralContentSuccessful\" style=\"padding: 5px;\">Allgemeinen Informationen erfolgreich gespeichert!</div>\n                      </div>\n\n                  </div>\n\n                  <div style=\"clear:both;\"></div>\n              </div>\n\n          </div>\n\n\n          <div id=\"cf-ad-manage-tasks\" class=\"content-frame\">\n\n              <p class=\"headline headline-as-button\" (click)=\"show_cm_tasks=show_cm_tasks?false:true;\">Aufgaben</p>\n\n\n\n              <div [hidden]=\"!show_cm_tasks\" style=\"width:100%;\">\n\n                  <!-- Deleting/Editing Tasks -->\n                  <div class=\"col-xs-12 col-sm-4 col-sm-offset-1 adm-frame\">\n\n                      <p class=\"headline\">Organisiere bestehende Aufgaben</p>\n\n                          <div *ngFor=\"let t_task of getTasks(); let i = index;\" class=\"cf-ad-manage-tasks-task\" style=\"width: 100%;color: #fff;margin-bottom:0.1em;\">\n                              <div  class=\"cf-ad-manage-tasks-task-head\" style=\"cursor:pointer;background:rgb(230,230,230);\">\n                                  <button (click)=\"setTaskDeleteTask(t_task.task_id)\" class=\"delete-task-button fa fa-minus\" title=\"L\u00F6sche diese Aufgabe\" style=\"padding:0.1em 0.2em;font-size:1.3em;float:right;cursor:pointer;margin-left:0.5em;\"></button>\n                                  <button (click)=\"setTaskActiveInactive(getTasks()[i])\" [class.active]=\"t_task.is_task_active=='1'\" [class.inactive]=\"t_task.is_task_active!='1'\" class=\"set-task-active-inactive-button fa fa-circle\" title=\"Setze die Aufgabe aktiv/inaktiv\" style=\"padding:0.1em 0.2em;font-size:1.3em;float:right;cursor:pointer;margin-left:0.5em;\"></button>\n                                  <button (click)=\"t_task.showhelper_edit_open = t_task.showhelper_edit_open?false:true;\" [class.button-pressed]=\"t_task.showhelper_edit_open\" class=\"fa fa-edit\" title=\"Bearbeite die Aufgabe\" style=\"padding:0.1em 0.2em;font-size:1.3em;float:right;cursor:pointer;margin-left:0.5em;\"></button>\n                                  <button [hidden]=\"t_task.task_type_id != 6\" (click)=\"t_task.showhelper_information_open = t_task.showhelper_information_open?false:true; t_task.showhelper_information_open?showCanvasForTask(t_task.task_id,t_task.json_task_data.loc):'';\" [class.button-pressed]=\"t_task.showhelper_information_open\" class=\"fa fa-info\" title=\"Zeige weitere Informationen\" style=\"padding:0.1em 0.5em;font-size:1.3em;float:right;cursor:pointer;margin-left:0.5em;\"></button>\n                                  <p style=\"margin:0;padding:0.3em;font-size:1.2em;font-weight:bold;\">\n                                    {{t_task.de_DE?.taskname}}\n                                  </p>\n                                  <div style=\"clear:both;margin:0;height:0;\"></div>\n                              </div>\n\n                              <div *ngIf=\"t_task.showhelper_edit_open\" class=\"cf-ad-manage-tasks-task-edit\">\n\n                                  <edittask-component [user]=\"user\" [universalcontent]=\"universalcontent\" [taskdata]=\"t_task\" [locationsdata]=\"getLocations()\" [tasktypesdata]=\"getTaskTypes()\" (taskdataoutput)=\"getTasks()[i]=$event;\" (reload)=\"reload.emit(true);\"></edittask-component>\n\n                                  <button (click)=\"upsertTask(t_task)\" class=\"button\" style=\"margin-top:2em;\">Speichere jetzt die \u00C4nderungen</button>\n                                  <div style=\"width:100%;text-align:center;\">\n                                    <div *ngIf=\"t_task.upsert_successful\" style=\"padding: 5px;\">Aufgabe erfolgreich ge\u00E4ndert!</div>\n                                  </div>\n                              </div>\n\n                              <div [hidden]=\"!t_task.showhelper_information_open\" class=\"cf-ad-manage-tasks-task-show-information\">\n                                  <br>\n                                  <label style=\"width:100%;text-align:center;padding-left:0.5em;\">Nutze diesen QR Code, um den Usern die M\u00F6glichkeit zu geben die Aufgabe direkt durch Scannen des QR Codes zu l\u00F6sen:</label>\n                                  <br>\n                                  <div style=\"width:200px;height:250px;margin:0!important;margin-right:auto!important;margin-left:auto!important;margin-top:0.3em!important;margin-bottom:0.5em!important;\">\n                                      <canvas [id]=\"'qrcode-task-img'+t_task.task_id\" height=\"200\" width=\"200\"></canvas>\n                                  </div>\n                              </div>\n\n                          </div>\n\n                  </div>\n\n                  <!-- Adding Tasks -->\n                  <div class=\"col-xs-12 col-sm-4 col-sm-offset-2 adm-frame\">\n\n                      <p class=\"headline\">F\u00FCge eine neue Aufgabe hinzu</p>\n\n                      <edittask-component [user]=\"user\" [universalcontent]=\"universalcontent\" [taskdata]=\"new_task\" [locationsdata]=\"getLocations()\" [tasktypesdata]=\"getTaskTypes()\" (taskdataoutput)=\"new_task=$event;\" (reload)=\"reload.emit(true);\"></edittask-component>\n\n                      <button (click)=\"upsertTask(new_task)\" class=\"button\" style=\"margin-top:2em;\">F\u00FCge die Aufgabe jetzt hinzu</button>\n                      <div style=\"width:100%;text-align:center;\">\n                        <div *ngIf=\"upsertNewTaskSuccessful\" style=\"padding: 5px;\">Aufgabe erfolgreich hinzugef\u00FCgt!</div>\n                      </div>\n\n                  </div>\n\n                  <div style=\"clear:both;\"></div>\n              </div>\n\n\n          </div>\n\n          <div id=\"cf-ad-manage-badges\" class=\"content-frame\">\n\n              <p class=\"headline headline-as-button\" (click)=\"show_cm_badges=show_cm_badges?false:true;\">Abzeichen</p>\n\n\n\n              <div [hidden]=\"!show_cm_badges\" style=\"width:100%;\">\n\n                  <!-- Deleting/Editing Badges -->\n                  <div class=\"col-xs-12 col-sm-4 col-sm-offset-1 adm-frame\">\n\n                      <p class=\"headline\">Organisiere bestehende Abzeichen</p>\n\n                      <div *ngFor=\"let t_badge of getBadges(); let i = index;\" class=\"cf-ad-manage-badges-badge\" style=\"width: 100%;color: #fff;margin-bottom:0.1em;\">\n                          <div  class=\"cf-ad-manage-badges-badge-head\" style=\"cursor:pointer;background:rgb(230,230,230);\">\n                              <button (click)=\"setBadgeDeleteBadge(t_badge.badge_id)\" class=\"delete-badge-button fa fa-minus\" title=\"L\u00F6sche dieses Abzeichen\" style=\"padding:0.1em 0.2em;font-size:1.3em;float:right;cursor:pointer;margin-left:0.5em;\"></button>\n                              <button (click)=\"setBadgeActiveInactive(getBadges()[i])\" [class.active]=\"t_badge.is_active=='1'\" [class.inactive]=\"t_badge.is_active!='1'\" class=\"set-badge-active-inactive-button fa fa-circle\" title=\"Setze dieses Abzeichen aktiv/inaktiv\" style=\"padding:0.1em 0.2em;font-size:1.3em;float:right;cursor:pointer;margin-left:0.5em;\"></button>\n                              <button (click)=\"t_badge.showhelper_edit_open = t_badge.showhelper_edit_open?false:true;\" [class.button-pressed]=\"t_badge.showhelper_edit_open\" class=\"fa fa-edit\" title=\"Bearbeite das Abzeichen\" style=\"padding:0.1em 0.2em;font-size:1.3em;float:right;cursor:pointer;margin-left:0.5em;\"></button>\n                              <p style=\"margin:0;padding:0.3em;font-size:1.2em;font-weight:bold;\">\n                                  {{t_badge.de_DE?.badgename}}\n                              </p>\n                              <div style=\"clear:both;margin:0;height:0;\"></div>\n                          </div>\n                          <div *ngIf=\"t_badge.showhelper_edit_open\" class=\"cf-ad-manage-badges-badge-edit-description\">\n\n                              <editbadge-component [user]=\"user\" [universalcontent]=\"universalcontent\" [badgedata]=\"t_badge\" [alltasksdata]=\"getTasks()\" (badgedataoutput)=\"getBadges()[i]=$event;\" (reload)=\"reload.emit(true);\"></editbadge-component>\n\n                              <button (click)=\"upsertBadge(t_badge)\" class=\"edit-badge-button button\" style=\"margin-top:2em;\">Speichere jetzt die \u00C4nderungen</button>\n                              <div style=\"width:100%;text-align:center;\">\n                                <div *ngIf=\"t_badge.upsert_successful\" style=\"padding: 5px;\">Abzeichen erfolgreich ge\u00E4ndert!</div>\n                              </div>\n                          </div>\n                      </div>\n\n                  </div>\n\n                  <!-- Adding Badges -->\n                  <div class=\"col-xs-12 col-sm-4 col-sm-offset-2 adm-frame\">\n\n                      <p class=\"headline\">F\u00FCge ein neues Abzeichen hinzu</p>\n\n                      <editbadge-component [user]=\"user\" [universalcontent]=\"universalcontent\" [badgedata]=\"new_badge\" [alltasksdata]=\"getTasks()\" (badgedataoutput)=\"new_badge=$event;\" (reload)=\"reload.emit(true);\"></editbadge-component>\n\n                      <button (click)=\"upsertBadge(new_badge)\" class=\"button\" style=\"margin-top:2em;\">F\u00FCge das Abzeichen jetzt hinzu</button>\n                      <div style=\"width:100%;text-align:center;\">\n                        <div *ngIf=\"upsertNewBadgeSuccessful\" style=\"padding: 5px;\">Abzeichen erfolgreich hinzugef\u00FCgt!</div>\n                      </div>\n                  </div>\n\n                  <div style=\"clear:both;\"></div>\n              </div>\n\n          </div>\n\n          <div id=\"cf-ad-manage-quests\" class=\"content-frame\">\n\n              <p class=\"headline headline-as-button\" (click)=\"show_cm_quests=show_cm_quests?false:true;\">Quests</p>\n\n              <div [hidden]=\"!show_cm_quests\" style=\"width:100%;\">\n\n                  <!-- Deleting/Editing Quests -->\n                  <div class=\"col-xs-12 col-sm-4 col-sm-offset-1 adm-frame\">\n\n                      <p class=\"headline\">Organisiere bestehende Quests</p>\n\n                      <div *ngFor=\"let t_quest of getQuests(); let i = index;\" class=\"cf-ad-manage-quests-quest\" style=\"width: 100%;color: #fff;margin-bottom:0.1em;\">\n                          <div  class=\"cf-ad-manage-quests-quest-head\" style=\"cursor:pointer;background:rgb(230,230,230);\">\n                              <button (click)=\"setQuestDeleteQuest(t_quest.quest_id)\" class=\"delete-quest-button fa fa-minus\"  title=\"L\u00F6sche diesen Quest\" style=\"padding:0.1em 0.2em;font-size:1.3em;float:right;cursor:pointer;margin-left:0.5em;\"></button>\n                              <button (click)=\"setQuestActiveInactive(getQuests()[i])\" [class.active]=\"t_quest.is_active=='1'\" [class.inactive]=\"t_quest.is_active!='1'\" class=\"set-quest-active-inactive-button fa fa-circle\" title=\"Setze diesen Quest aktiv/inaktiv\" style=\"padding:0.1em 0.2em;font-size:1.3em;float:right;cursor:pointer;margin-left:0.5em;\"></button>\n                              <button (click)=\"t_quest.showhelper_edit_open = t_quest.showhelper_edit_open?false:true;\" [class.button-pressed]=\"t_quest.showhelper_edit_open\" class=\"fa fa-edit\" title=\"Bearbeite den Quest\" style=\"padding:0.1em 0.2em;font-size:1.3em;float:right;cursor:pointer;margin-left:0.5em;\"></button>\n                              <p style=\"margin:0;padding:0.3em;font-size:1.2em;font-weight:bold;\">\n                                  {{t_quest.de_DE?.questname}}\n                              </p>\n                              <div style=\"clear:both;margin:0;height:0;\"></div>\n                          </div>\n                          <div *ngIf=\"t_quest.showhelper_edit_open\" class=\"cf-ad-manage-quests-quest-edit-description\">\n\n                              <editquest-component [user]=\"user\" [universalcontent]=\"universalcontent\" [questdata]=\"t_quest\" [allquestsdata]=\"getQuests()\" [alltasksdata]=\"getTasks()\" [locationsdata]=\"getLocations()\" (questdataoutput)=\"getQuests()[i]=$event;\" (reload)=\"reload.emit(true);\"></editquest-component>\n\n                              <button (click)=\"upsertQuest(t_quest)\" class=\"edit-quest-button button\" style=\"margin-top:2em;\">Speichere jetzt die \u00C4nderungen</button>\n                              <div style=\"width:100%;text-align:center;\">\n                                <div *ngIf=\"t_quest.upsert_successful\" style=\"padding: 5px;\">Quest erfolgreich ge\u00E4ndert!</div>\n                              </div>\n\n                          </div>\n                      </div>\n\n\n                  </div>\n\n                  <!-- Adding Quests -->\n                  <div class=\"col-xs-12 col-sm-4 col-sm-offset-2 adm-frame\">\n\n                      <p class=\"headline\">F\u00FCge einen neuen Quest hinzu</p>\n\n                      <editquest-component [user]=\"user\" [universalcontent]=\"universalcontent\" [questdata]=\"new_quest\" [allquestsdata]=\"getQuests()\" [alltasksdata]=\"getTasks()\" [locationsdata]=\"getLocations()\" (questdataoutput)=\"new_quest=$event;\" (reload)=\"reload.emit(true);\"></editquest-component>\n\n                      <button (click)=\"upsertQuest(new_quest)\" class=\"button\" style=\"margin-top:2em;\">F\u00FCge den neuen Quest jetzt hinzu</button>\n                      <div style=\"width:100%;text-align:center;\">\n                        <div *ngIf=\"upsertNewQuestSuccessful\" style=\"padding: 5px;\">Quest erfolgreich hinzugef\u00FCgt!</div>\n                      </div>\n\n                  </div>\n\n                  <div style=\"clear:both;\"></div>\n              </div>\n\n          </div>\n\n\n          <div class=\"content-frame\">\n\n              <p class=\"headline headline-as-button\" (click)=\"show_cm_locations=show_cm_locations?false:true;\">Orte</p>\n\n\n\n              <div [hidden]=\"!show_cm_locations\" style=\"width:100%;\">\n\n                  <!-- Deleting/Getting QR Code Location -->\n                  <div class=\"col-xs-12 col-sm-4 col-sm-offset-1 adm-frame\">\n\n                      <p class=\"headline\">Orte</p>\n\n                      <div *ngFor=\"let t_location of getLocations()\" class=\"cf-ad-manage-locations-setted-location\" style=\"width: 100%;color: #fff;margin-bottom:0.1em;\">\n                          <div  class=\"cf-ad-manage-locations-setted-location-head\" style=\"cursor:pointer;background:rgb(230,230,230);\">\n                              <button (click)=\"setLocationDeleteLocation(t_location.location_id);\" class=\"delete-location-button fa fa-minus\" title=\"L\u00F6sche diesen Ort\" style=\"padding:0.1em 0.2em;font-size:1.3em;float:right;cursor:pointer;margin-left:0.5em;\"></button>\n                              <button (click)=\"t_location.showhelper_information_open = t_location.showhelper_information_open?false:true; t_location.showhelper_information_open?showCanvasForLocation(t_location.location_id):'';\" [class.button-pressed]=\"t_location.showhelper_information_open\" class=\"fa fa-info\" title=\"Zeige weitere Informationen bzgl. diesem Ort\" style=\"padding:0.1em 0.5em;font-size:1.3em;float:right;cursor:pointer;margin-left:0.5em;\"></button>\n                              <p style=\"margin:0;padding:0.3em;font-size:1.2em;font-weight:bold;\">\n                                  {{t_location.locationname}}<br>\n                                  {{\"Lat: \"+t_location.geo_lati}}<br>\n                                  {{\"Long: \"+t_location.geo_long}}<br>\n                                  {{\"Radius: \"+t_location.geo_radius+\"m\"}}\n                              </p>\n                              <div style=\"clear:both;margin:0;height:0;\"></div>\n                              <div [hidden]=\"!t_location.showhelper_information_open\" class=\"cf-ad-manage-locations-setted-location-description\">\n\n                                  <div style=\"width:200px;height:250px;margin:0!important;margin-right:auto!important;margin-left:auto!important;margin-top:1em!important;margin-bottom:1em!important;\">\n                                      <canvas [id]=\"'qrcode-location-img'+t_location.location_id\" height=\"200\" width=\"200\"></canvas>\n                                  </div>\n\n                              </div>\n                          </div>\n                      </div>\n\n\n\n                  </div>\n\n                  <!-- Adding Location -->\n                  <div class=\"col-xs-12 col-sm-4 col-sm-offset-2 adm-frame\">\n\n                      <p class=\"headline\">F\u00FCge neuen Ort hinzu</p>\n\n                      <!-- Choose Locationname[german] -->\n                      <hr class=\"hrForAdministration\">\n                      <label style=\"width:100%;text-align:center;padding-left:0.5em;\"><span class=\"stepHelper\">1.) </span>Ortsname<span style=\"color:#e9266d\">*</span></label>\n                      <br>\n                      <input [(ngModel)]=\"new_location.de_DE.locationname\" type=\"text\" placeholder=\"Ortsname\" style=\"width:100%;\">\n                      <hr class=\"hrForAdministration\">\n\n                      <!-- Choose Latitude -->\n                      <label style=\"width:100%;text-align:center;padding-left:0.5em;\"><span class=\"stepHelper\">2.) </span>Breitengrad [Beispiel: 10.1435]<span style=\"color:#e9266d\">*</span></label>\n                      <br>\n                      <input [(ngModel)]=\"new_location.geo_lati\" type=\"text\" placeholder=\"Breitengrad\" style=\"width:100%;\">\n                      <hr class=\"hrForAdministration\">\n\n                      <!-- Choose Longitude -->\n                      <label style=\"width:100%;text-align:center;padding-left:0.5em;\"><span class=\"stepHelper\">3.) </span>L\u00E4ngengrad [Beispiel: 10.1435]<span style=\"color:#e9266d\">*</span></label>\n                      <br>\n                      <input [(ngModel)]=\"new_location.geo_long\" type=\"text\" placeholder=\"L\u00E4ngengrad\" style=\"width:100%;\">\n                      <hr class=\"hrForAdministration\">\n\n                      <!-- Choose Radius -->\n                      <label style=\"width:100%;text-align:center;padding-left:0.5em;\"><span class=\"stepHelper\">4.) </span>Radius[meter]<span style=\"color:#e9266d\">*</span></label>\n                      <br>\n                      <input [(ngModel)]=\"new_location.geo_radius\" type=\"text\" placeholder=\"Radius[meter]\" style=\"width:100%;\">\n\n                      <button (click)=\"upsertLocation(new_location);\" class=\"button\" style=\"margin-top:2em;\">F\u00FCge den neuen Ort jetzt hinzu</button>\n                      <div style=\"width:100%;text-align:center;\">\n                        <div *ngIf=\"upsertNewLocationSuccessful\" style=\"padding: 5px;\">Ort erfolgreich hinzugef\u00FCgt!</div>\n                      </div>\n\n                  </div>\n\n                  <div style=\"clear:both;\"></div>\n              </div>\n\n          </div>\n\n          <div id=\"cf-ad-reverse-faculty-score\" class=\"content-frame\">\n\n              <p class=\"headline headline-as-button\" (click)=\"show_cm_reset_score=show_cm_reset_score?false:true;\">Setze Fakult\u00E4tshighscore zur\u00FCck</p>\n\n              <div [hidden]=\"!show_cm_reset_score\" style=\"width:100%;max-width:350px;width:100%;margin-left:auto;margin-right:auto;\">\n\n                  <button (click)=\"resetFacultyScore();\" class=\"button\" style=\"margin-top:2em;margin-bottom:2em;\">Setze den Fakult\u00E4tshighscore jetzt zur\u00FCck</button>\n\n              </div>\n\n          </div>\n\n\n      </div>\n\n\n  </div>\n\n  <div class=\"row-user-management row\">\n\n      <p class=\"overall-headline\" style=\"width:100%;text-align:center;\">USER-MANAGEMENT</p>\n\n      <div class=\"col-xs-12\" style=\"padding:0;\">\n\n          <div *ngIf=\"user.user_type_id=='2'\" class=\"content-frame\">\n\n              <p class=\"headline headline-as-button\" (click)=\"show_um_add_admins=show_um_add_admins?false:true;\">F\u00FCge Administratoren hinzu</p>\n\n              <div [hidden]=\"!show_um_add_admins\" style=\"width:100%;\">\n\n\n                  <!-- Deleting/Editing Administrators -->\n                  <div class=\"col-xs-12 col-sm-4 col-sm-offset-1 adm-frame\">\n\n                      <p class=\"headline\">Admins</p>\n\n                        <div *ngFor=\"let t_admin of getAdmins();\" class=\"cf-ad-admin\" style=\"width: 100%;color: #fff;margin-bottom:0.1em;\">\n                            <button (click)=\"deleteAdmin(t_admin.user_id)\" class=\"degrade-admin-button fa fa-minus\" title=\"L\u00F6sche diesen Admin\" style=\"padding:0.1em 0.2em;font-size:1.3em;float:right;cursor:pointer;\"></button>\n                            <p style=\"margin:0;padding:0.3em;font-size:1.2em;font-weight:bold;\">\n                                {{t_admin.username}}\n                            </p>\n                            <div style=\"clear:both;margin:0;height:0;\"></div>\n                        </div>\n\n                        <div *ngFor=\"let t_admin of getSuperadmins();\" class=\"cf-ad-admin\" style=\"width: 100%;color: #fff;margin-bottom:0.1em;\">\n                            <p style=\"margin:0;padding:0.3em;font-size:1.2em;font-weight:bold;\">\n                                {{'Superadmin: '+t_admin.username}}\n                            </p>\n                            <div style=\"clear:both;margin:0;height:0;\"></div>\n                        </div>\n\n                  </div>\n\n                  <!-- Adding Administrators -->\n                  <div class=\"col-xs-12 col-sm-4 col-sm-offset-2 adm-frame\">\n\n                      <p class=\"headline\">F\u00FCge einen neuen Admin hinzu</p>\n\n                      <div style=\"width:100%;\">\n                          <select [(ngModel)]=\"addAdminId\"  style=\"width:100%;\">\n                            <option value='-1'>--None--</option>\n                            <option *ngFor=\"let t_user of getAllUsers();\" [hidden]=\"t_user.user_type_id != 0\" value='{{t_user.user_id}}'>{{t_user.username}}</option>\n                          </select>\n                      </div>\n\n                      <button (click)=\"setNewAdmin()\"  class=\"button\" style=\"margin-top:2em;\">F\u00FCge den ausgew\u00E4hlten Admin jetzt hinzu</button>\n                      <div style=\"width:100%;text-align:center;\">\n                        <div *ngIf=\"addedNewAdminSuccessful\" style=\"padding: 5px;\">Admin erfolgreich hinzugef\u00FCgt!</div>\n                      </div>\n\n                  </div>\n\n                  <div style=\"clear:both;\"></div>\n              </div>\n\n          </div>\n\n          <div id=\"cf-ad-send-mail-to-users\" class=\"content-frame\">\n\n              <p class=\"headline headline-as-button\" (click)=\"show_um_send_mail=show_um_send_mail?false:true;\">Sende eine Mail an alle User</p>\n\n              <div [hidden]=\"!show_um_send_mail\" style=\"width:100%;\">\n\n                  <div class=\"col-xs-12 col-sm-6 col-sm-offset-3 adm-frame\">\n\n                      <hr class=\"hrForAdministration\">\n                      <label for=\"input-email-headline\" style=\"width:100%;text-align:center;padding-left:0.5em;\"><span class=\"stepHelper\">1.) </span>Betreff<span style=\"color:#e9266d\">*</span></label>\n                      <br>\n                      <input [(ngModel)]=\"send_email.headline\" type=\"text\" placeholder=\"Betreff\" style=\"width:100%;\"/>\n                      <hr class=\"hrForAdministration\">\n\n                      <label for=\"textarea-email-message\" style=\"width:100%;text-align:center;padding-left:0.5em;\"><span class=\"stepHelper\">2.) </span>Nachricht<span style=\"color:#e9266d\">*</span></label>\n                      <br>\n                      <textarea [(ngModel)]=\"send_email.content\" placeholder=\"Nachricht\" style=\"width:100%;height:8em;resize:none;\"></textarea>\n\n                      <button (click)=\"sendEmailMessageToAllUsers()\" class=\"button\">\n                        <span [hidden]=\"loading_sendemails\">Sende jetzt die Nachricht(en) an alle User</span>\n                        <span [hidden]=\"!loading_sendemails\"><i class=\"fa fa-spinner fa-pulse\"></i></span>\n                      </button>\n                      <div style=\"width:100%;text-align:center;\">\n                        <div *ngIf=\"sendEmailToAllUsersSuccessful\" style=\"padding: 5px;\">Emails erfolgreich gesendet!</div>\n                      </div>\n\n                  </div>\n\n                  <div style=\"clear:both;\"></div>\n              </div>\n\n\n\n          </div>\n\n\n      </div>\n\n\n  </div>\n\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, libgame_service_1.LibgameService])
], AdministrationComponent);
exports.AdministrationComponent = AdministrationComponent;
var _a;
//# sourceMappingURL=administration.component.js.map