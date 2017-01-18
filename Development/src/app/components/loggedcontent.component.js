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
var libgame_service_1 = require("./../services/libgame.service");
var router_1 = require("@angular/router");
var LoggedcontentComponent = (function () {
    function LoggedcontentComponent(router, route, lService) {
        this.router = router;
        this.route = route;
        this.lService = lService;
        this.user = {};
        this.loading_user = true;
        this.universalcontent = {};
        this.loading_universalcontent = true;
        this.showncomponent = "";
        this.timeframeForCheckingLocation = 30000;
        this.intervalTimerManageCheckLocation = null;
        this.solvedOverlayArray = [];
        this.toggled = false;
        this.badge_id = "";
        this.quest_id = "";
        this.task_id = "";
        this.legalcomponent = "";
        this.highscorepage = 0;
        this.additionalinformation = "";
        this.locationfound_id = "";
        this.reg_username = "";
        this.reg_username_valid = true;
        this.reg_username_exists = false;
        this.reg_email = "";
        this.reg_email_valid = true;
        this.reg_email_exists = false;
        this.reg_password = "";
        this.reg_password_valid = true;
        this.reg_password_repeat = "";
        this.reg_password_repeat_valid = true;
        this.reg_faculty_id = -2;
    }
    LoggedcontentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var scroll = typeof params['scroll'] !== 'undefined' ? params['scroll'] : '';
            if (typeof scroll !== 'undefined' && scroll.length > 0) {
                $('html, body').animate({ scrollTop: ($('#' + scroll).offset().top) }, 'slow');
            }
            else {
                $('html, body').animate({ scrollTop: 0 }, 'slow');
            }
        });
        $('#titleBar').show();
        this.loading_user = true;
        this.lService.user$.subscribe(function (user) {
            if (typeof user === 'undefined' || typeof user.user_id === 'undefined') {
                _this.navigateToUnloggedComponent('home');
            }
            _this.user = user;
            _this.loading_user = false;
            if (typeof _this.user.user_id !== 'undefined' && _this.user.user_id != -1) {
                _this.manageCheckLocation();
                if (_this.intervalTimerManageCheckLocation != null) {
                    window.clearInterval(_this.intervalTimerManageCheckLocation);
                }
                _this.intervalTimerManageCheckLocation = window.setInterval(function () { _this.manageCheckLocation(); }, _this.timeframeForCheckingLocation);
            }
        });
        this.lService.loadUser();
        this.loading_universalcontent = true;
        this.lService.universalcontent$.subscribe(function (universalcontent) {
            _this.universalcontent = universalcontent;
            _this.loading_universalcontent = false;
        });
        this.lService.loadUniversalContent();
        this.sub = this.route.params.subscribe(function (params) {
            var component = typeof params['component'] !== 'undefined' ? params['component'] : '';
            var id = typeof params['id'] !== 'undefined' ? params['id'] : '';
            var additionalinformation = typeof params['additionalinformation'] !== 'undefined' ? params['additionalinformation'] : '';
            component = component.toLowerCase();
            id = id.toLowerCase();
            if (component.length == 0 || component == 'tasks') {
                _this.showncomponent = 'tasks';
            }
            else if (component == 'administration') {
                _this.showncomponent = 'administration';
            }
            else if (component == 'task' && id.length != 0) {
                _this.showncomponent = 'task';
                _this.task_id = id;
                _this.additionalinformation = additionalinformation;
            }
            else if (component == 'tasksearch') {
                _this.showncomponent = 'tasksearch';
            }
            else if (component == 'highscorelist') {
                _this.showncomponent = 'highscorelist';
                _this.highscorepage = parseInt(id);
            }
            else if (component == 'quest' && id.length != 0) {
                _this.showncomponent = 'quest';
                _this.quest_id = id;
            }
            else if (component == 'badge' && id.length != 0) {
                _this.showncomponent = 'badge';
                _this.badge_id = id;
            }
            else if (component == 'legal' && id.length != 0) {
                _this.showncomponent = 'legal';
                _this.legalcomponent = id;
            }
            else if (component == 'statistics') {
                _this.showncomponent = 'statistics';
            }
            else if (component == 'userprogress') {
                _this.showncomponent = 'userprogress';
            }
            else if (component == 'usersettings') {
                _this.showncomponent = 'usersettings';
            }
            else if (component == 'locationfound' && id.length != 0) {
                _this.showncomponent = 'tasks';
                _this.locationfound_id = id;
                _this.checkLocation("", "", _this.locationfound_id);
            }
            else {
                _this.showncomponent = 'tasks';
            }
        });
    };
    LoggedcontentComponent.prototype.getUniversalContentFacultyArray = function () {
        if (!$.isEmptyObject(this.universalcontent) && typeof this.universalcontent["_Faculties"] !== 'undefined') {
            return this.universalcontent["_Faculties"];
        }
        return [];
    };
    LoggedcontentComponent.prototype.getUniversalContentAnonymousUserPhrase = function () {
        if (!$.isEmptyObject(this.universalcontent) && typeof this.universalcontent["Anonymous_User_Phrase"] !== 'undefined') {
            return this.universalcontent["Anonymous_User_Phrase"];
        }
        return "";
    };
    LoggedcontentComponent.prototype.getUniversalContentMainPictureId = function () {
        if (!$.isEmptyObject(this.universalcontent) && typeof this.universalcontent["_Content"] !== 'undefined' && this.universalcontent["_Content"].filter(function (x) { return x.content_mapper == "MAIN_PICTURE_ID"; }).length != 0) {
            return this.universalcontent["_Content"].filter(function (x) { return x.content_mapper == "MAIN_PICTURE_ID"; })[0].text;
        }
        return -1;
    };
    LoggedcontentComponent.prototype.isUserAnonymousUser = function () {
        if (typeof this.user === 'undefined' || typeof this.user.username === 'undefined') {
            return false;
        }
        if (this.getUniversalContentAnonymousUserPhrase().length == 0) {
            return false;
        }
        if (this.user.username.indexOf(this.getUniversalContentAnonymousUserPhrase()) > -1) {
            return true;
        }
        return false;
    };
    LoggedcontentComponent.prototype.isUserAdminUser = function () {
        if (typeof this.user === 'undefined' || typeof this.user.user_type_id === 'undefined' || (this.user.user_type_id != 1 && this.user.user_type_id != 2)) {
            return false;
        }
        return true;
    };
    LoggedcontentComponent.prototype.logoutUser = function () {
        var _this = this;
        this.lService.logoutUser().subscribe(function (data) {
            _this.router.navigate(["/u/home"]);
        }, function (error) { console.error('Could not logout user.'); });
    };
    LoggedcontentComponent.prototype.navigateToComponent = function (componentname) {
        this.router.navigate(["/l/" + componentname]);
    };
    LoggedcontentComponent.prototype.navigateToUnloggedComponent = function (componentname) {
        this.router.navigate(["/u/" + componentname]);
    };
    LoggedcontentComponent.prototype.navigateToLegal = function (legalcomponentname) {
        this.router.navigate(["/l/legal", legalcomponentname]);
    };
    LoggedcontentComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
        if (this.intervalTimerManageCheckLocation != null) {
            window.clearInterval(this.intervalTimerManageCheckLocation);
        }
    };
    LoggedcontentComponent.prototype.deleteUser = function () {
        var _this = this;
        if (confirm("Möchtest du deinen User jetzt löschen?") == true) {
            this.lService.deleteUser().subscribe(function (data) {
                if (typeof data.result !== 'undefined' && data.result == true) {
                    _this.navigateToUnloggedComponent("home");
                }
                else {
                    window.alert("Es ist ein Fehler aufgetreten. Bitte lass die Seite neuladen!");
                }
            }, function (error) {
                window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
            });
        }
    };
    LoggedcontentComponent.prototype.manageCheckLocation = function () {
        var _this = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (p) {
                _this.checkLocation(p.coords.latitude, p.coords.longitude, "");
            }, function (error) {
                console.log('Positioning Error: ');
                console.log(error);
                window.alert("Positionieren des Nutzers nicht möglich! Fehler: " + (typeof error.message !== 'undefined' ? error.message : ''));
            }, {
                enableHighAccuracy: true,
                maximumAge: 1000000
            });
        }
        else {
            window.alert("Bitte erlaube dem Spiel deine Position zu checken, da sonst das Spiel für dich nicht in vollem Umfang spielbar ist. Deine Position wird NICHT permanent gespeichert, sondern nur kurz (5-10 Sekunden) für die Suche von Aufgaben und Quests in deiner Nähe benutzt!");
        }
    };
    LoggedcontentComponent.prototype.checkLocation = function (lati, long, location_id) {
        var _this = this;
        if ((typeof lati === 'undefined' || typeof long === 'undefined') && typeof location_id === 'undefined') {
            return;
        }
        this.lService.checkLocation(lati, long, location_id).subscribe(function (data) {
            if (typeof data.result !== 'undefined' && data.result == true && data.data != null) {
                for (var key in data.data["new_tasks"]) {
                    _this.solvedOverlayArray.push({
                        type: 4,
                        name: "Aufgabe gefunden",
                        solved_description: "Du hast eine neue Aufgabe gefunden: '" + data.data["new_tasks"][key]["taskname"] + "'. Du findest sie ab sofort unter deinen aktuellen Aufgaben!"
                    });
                }
                for (var key in data.data["new_quests"]) {
                    _this.solvedOverlayArray.push({
                        type: 4,
                        name: "Quest gefunden",
                        solved_description: "Du hast einen neuen Quest gefunden: '" + data.data["new_quests"][key]["questname"] + "'. Du findest sie ab sofort unter deinen aktuellen Aufgaben!"
                    });
                }
                for (var key in data.data["all_tasks_to_solve_in_near"]) {
                    var t_solved_quests = "";
                    var t_solved_badges = "";
                    if (typeof data.data["all_tasks_to_solve_in_near"][key]["achievements"] !== 'undefined') {
                        for (var t_key_quests in data.data["all_tasks_to_solve_in_near"][key]["achievements"]["quests"]) {
                            t_solved_quests += "-" + data.data["all_tasks_to_solve_in_near"][key]["achievements"]["quests"][t_key_quests]["questname"] + "<br />";
                        }
                        for (var t_key_badges in data.data["all_tasks_to_solve_in_near"][key]["achievements"]["badges"]) {
                            t_solved_badges += "-" + data.data["all_tasks_to_solve_in_near"][key]["achievements"]["badges"][t_key_badges]["badgename"] + "<br />";
                        }
                    }
                    _this.solvedOverlayArray.push({
                        type: 1,
                        name: "Aufgabe erfüllt",
                        solved_description: "Herzlichen Glückwunsch! Du hast die Aufgabe '" + data.data["all_tasks_to_solve_in_near"][key]["taskname"] + "' abgeschlossen.",
                        score_rule: data.data["all_tasks_to_solve_in_near"][key]["score_rule"],
                        faculty_score_rule: data.data["all_tasks_to_solve_in_near"][key]["added_score_for_faculty"],
                        solved_quests: t_solved_quests,
                        solved_badges: t_solved_badges
                    });
                    if (typeof data.data["all_tasks_to_solve_in_near"][key]["achievements"] !== 'undefined') {
                        for (var t_key_quests in data.data["all_tasks_to_solve_in_near"][key]["achievements"]["quests"]) {
                            _this.solvedOverlayArray.push({
                                type: 3,
                                name: "Quest erfüllt",
                                solved_description: "Herzlichen Glückwunsch! Du hast den Quest '" + data.data["all_tasks_to_solve_in_near"][key]["achievements"]["quests"][t_key_quests]["questname"] + "' abgeschlossen.",
                                score_rule: data.data["all_tasks_to_solve_in_near"][key]["achievements"]["quests"][t_key_quests]["score_rule"],
                                faculty_score_rule: data.data["all_tasks_to_solve_in_near"][key]["achievements"]["quests"][t_key_quests]["score_rule"]
                            });
                        }
                    }
                    if (typeof data.data["all_tasks_to_solve_in_near"][key]["achievements"] !== 'undefined') {
                        for (var t_key_badges in data.data["all_tasks_to_solve_in_near"][key]["achievements"]["badges"]) {
                            _this.solvedOverlayArray.push({
                                type: 2,
                                name: "Abzeichen erhalten",
                                solved_description: "Herzlichen Glückwunsch! Du hast das Abzeichen '" + data.data["all_tasks_to_solve_in_near"][key]["achievements"]["badges"][t_key_badges]["badgename"] + "' abgeschlossen.<br /><img src='" + _this.lService.getPictureLink(data.data["all_tasks_to_solve_in_near"][key]["achievements"]["badges"][t_key_badges]["picture_id"]) + "' />"
                            });
                        }
                    }
                }
            }
            else if (typeof data.result !== 'undefined' && data.result == true && data.data == null) {
                if (_this.intervalTimerManageCheckLocation != null) {
                    window.clearInterval(_this.intervalTimerManageCheckLocation);
                    _this.intervalTimerManageCheckLocation = null;
                }
            }
            else {
                window.alert("Es ist ein Fehler aufgetreten. Bitte lass die Seite neuladen!");
            }
        }, function (error) {
            window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
        });
    };
    LoggedcontentComponent.prototype.removeFromSolvedOverlayArray = function (index) {
        this.solvedOverlayArray.splice(index, 1);
    };
    LoggedcontentComponent.prototype.registerLoggedUser = function () {
        var pattern = /^[A-Za-z0-9]{2,}$/;
        if (this.reg_username.length == 0 || this.reg_username.match(pattern) == null) {
            window.alert("Dein gewählter Username entspricht nicht unseren Richtlinien!");
            return;
        }
        if (this.reg_username_exists == true) {
            window.alert("Dein gewählter Username ist bereits vergeben!");
            return;
        }
        pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (this.reg_email.length == 0 || this.reg_email.match(pattern) == null) {
            window.alert("Bitte überprüfe deine E-Mail und versuche es erneut!");
            return;
        }
        if (this.reg_email_exists == true) {
            window.alert("Deine gewählte E-Mail ist bereits vergeben!");
            return;
        }
        pattern = /[A-Za-z0-9!?.:;-]{6,}/g;
        if (this.reg_password.length == 0 || this.reg_password.match(pattern) == null || this.reg_password != this.reg_password_repeat) {
            window.alert("Dein Passwort entspricht nicht unseren Richtlinien oder du hast die beiden Passwörter stimmen nicht überein!");
            return;
        }
        if (this.reg_faculty_id == -2) {
            window.alert("Bitte wähle vor der Registration eine Fakultät!");
            return;
        }
        if ($("#reg_bed").prop("checked") == false) {
            window.alert("Bitte akzeptiere vor der Registration die AGB sowie die Datenschutzerklärungen!");
            return;
        }
        this.lService.registerUser(this.reg_username, this.reg_email, this.reg_password, this.reg_password_repeat, this.reg_faculty_id).subscribe(function (data) {
            if (typeof data.result !== 'undefined' && data.result == true) {
                window.location.reload();
            }
            else {
                window.alert("Bitte lass die Seite neuladen und überprüfe deine Eingaben!");
            }
        }, function (error) {
            window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
            console.error('Could not register user.');
        });
    };
    LoggedcontentComponent.prototype.keyupRegisterUsername = function () {
        var _this = this;
        var pattern = /^[A-Za-z0-9]{2,}$/;
        if (this.reg_username.length != 0 && this.reg_username.match(pattern) != null) {
            this.reg_username_valid = true;
        }
        else {
            this.reg_username_valid = false;
        }
        this.lService.checkUsername(this.reg_username).subscribe(function (data) {
            if (typeof data.data !== 'undefined' && typeof data.data.username_exists !== 'undefined' && typeof data.data.username !== 'undefined' && data.data.username == _this.reg_username && data.data.username_exists == true) {
                _this.reg_username_exists = true;
            }
            else if (typeof data.data !== 'undefined' && typeof data.data.username_exists !== 'undefined' && typeof data.data.username !== 'undefined' && data.data.username == _this.reg_username && data.data.username_exists == false) {
                _this.reg_username_exists = false;
            }
        }, function (error) {
            window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
            console.error('Could not login user.');
        });
    };
    LoggedcontentComponent.prototype.keyupRegisterEmail = function () {
        var _this = this;
        var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (this.reg_email.length != 0 && this.reg_email.match(pattern) != null) {
            this.reg_email_valid = true;
        }
        else {
            this.reg_email_valid = false;
        }
        this.lService.checkEmail(this.reg_email).subscribe(function (data) {
            if (typeof data.data !== 'undefined' && typeof data.data.email_exists !== 'undefined' && typeof data.data.email !== 'undefined' && data.data.email == _this.reg_email && data.data.email_exists == true) {
                _this.reg_email_exists = true;
            }
            else if (typeof data.data !== 'undefined' && typeof data.data.email_exists !== 'undefined' && typeof data.data.email !== 'undefined' && data.data.email == _this.reg_email && data.data.email_exists == false) {
                _this.reg_email_exists = false;
            }
        }, function (error) {
            window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
            console.error('Could not login user.');
        });
    };
    LoggedcontentComponent.prototype.keyupRegisterPassword = function () {
        var pattern = /[A-Za-z0-9!?.:;-]{6,}/g;
        if (this.reg_password.length != 0 && this.reg_password.match(pattern) != null) {
            this.reg_password_valid = true;
        }
        else {
            this.reg_password_valid = false;
        }
    };
    LoggedcontentComponent.prototype.keyupRegisterPasswordRepeat = function () {
        var pattern = /[A-Za-z0-9!?.:;-]{6,}/g;
        if (this.reg_password_repeat.length != 0 && this.reg_password == this.reg_password_repeat) {
            this.reg_password_repeat_valid = true;
        }
        else {
            this.reg_password_repeat_valid = false;
        }
    };
    return LoggedcontentComponent;
}());
LoggedcontentComponent = __decorate([
    core_1.Component({
        selector: 'loggedcontent-component',
        providers: [libgame_service_1.LibgameService],
        template: "\n\n\n  <!-- -->\n  <div id=\"wrapper\" [class.toggled]=\"toggled\">\n\n      <!-- Sidebar -->\n      <div id=\"sidebar-wrapper\">\n\n        <!-- Logo -->\n        <div id=\"logo\">\n          <img [src]=\"getUniversalContentMainPictureId().length != 0 ? lService.getPictureLink(getUniversalContentMainPictureId()) : ''\" style=\"width:100%;\" />\n        </div>\n\n        <!-- Nav -->\n        <nav class=\"nav\">\n            <ul>\n                <li [class.current_page_item]=\"showncomponent=='tasks'\"><a id=\"tasks\" (click)=\"navigateToComponent('tasks')\" style=\"cursor:pointer;\">Aktuelle Aufgaben</a></li>\n                <li [class.current_page_item]=\"showncomponent=='tasksearch'\"><a id=\"map\" (click)=\"navigateToComponent('tasksearch')\" style=\"cursor:pointer;\">Aufgabensuche</a></li>\n                <li [class.current_page_item]=\"showncomponent=='userprogress'\"><a id=\"achievements\" (click)=\"navigateToComponent('userprogress')\" style=\"cursor:pointer;\">Spielstand</a></li>\n                <li [class.current_page_item]=\"showncomponent=='statistics'\"><a id=\"statistics\" (click)=\"navigateToComponent('statistics')\" style=\"cursor:pointer;\">Statistiken</a></li>\n                <li><a id=\"logout\" (click)=\"logoutUser()\" style=\"cursor:pointer;\">Abmelden</a></li>\n            </ul>\n        </nav>\n\n        <nav *ngIf=\"isUserAdminUser()\" class=\"nav\" style=\"margin-top:0.5em;\">\n            <ul>\n                <li [class.current_page_item]=\"showncomponent=='administration'\"><a id=\"administration\" (click)=\"navigateToComponent('administration')\" style=\"cursor:pointer;\">Administration</a></li>\n            </ul>\n        </nav>\n\n        <!-- Copyright -->\n        <!--\n        <section id=\"copyright\" style=\"margin-top: 0.5em;\">\n            <p>\n                &copy; 2016 The Library Game.<br />\n                CodeDesign, Database: <a href=\"http://company.aliru.de\">Julian Kissel</a><br />\n                Design: Alexander Moch<br />\n                Weitere Beteiligte: <a href=\"https://www.bib.uni-mannheim.de/\">Bibliothek der Universit\u00E4t Mannheim</a>, <a href=\"http://ls.wim.uni-mannheim.de/de/pi4/people/philip-mildner/\">Philip Mildner</a>\n            </p>\n        </section>\n        -->\n\n\n        <!-- Register for Anonymous Player -->\n        <section id=\"registerAsAnonymous\" *ngIf=\"getUniversalContentAnonymousUserPhrase().length!=0 && isUserAnonymousUser()\">\n            <div style=\"padding:0px 10px;\">\n\n                <form id=\"registerForm\">\n                      <input [(ngModel)]=\"reg_username\" (keyup)=\"keyupRegisterUsername()\" [style.background]=\"reg_username.length>0?(reg_username_valid && reg_username_exists == false)?'rgb(120,255,120)':'rgb(255,120,120)':'#eeeeee'\" id=\"registerForm_reg_username\" name=\"reg_username\" type=\"text\" maxlength=\"30\" placeholder=\"Username\" title=\"Gib hier deinen gew\u00FCnschten Usernamen ein\" style=\"padding-top:7px;padding-bottom:7px;\"/>\n                      <div *ngIf=\"reg_username_exists\" style=\"padding: 5px;color: white;\">Username ist leider schon vergeben!</div>\n\n                      <input [(ngModel)]=\"reg_email\" (keyup)=\"keyupRegisterEmail()\" [style.background]=\"reg_email.length>0?(reg_email_valid && reg_email_exists == false)?'rgb(120,255,120)':'rgb(255,120,120)':'#eeeeee'\" id=\"registerForm_reg_email\" name=\"reg_email\" type=\"text\" maxlength=\"100\" placeholder=\"E-Mail\" title=\"Gib hier deine E-Mail ein\" style=\"padding-top:7px;padding-bottom:7px;margin-top: 0.2em;\"/>\n                      <div *ngIf=\"reg_email_exists\" style=\"padding: 5px;color: white;\">Ein User mit dieser E-Mail existiert leider bereits!</div>\n\n                      <input [(ngModel)]=\"reg_password\" (keyup)=\"keyupRegisterPassword();keyupRegisterPasswordRepeat();\" [style.background]=\"(reg_password_repeat.length>0 || reg_password.length>0)?reg_password_valid?'rgb(120,255,120)':'rgb(255,120,120)':'#eeeeee'\" id=\"registerForm_reg_password\" name=\"reg_password\" type=\"password\" maxlength=\"30\" placeholder=\"Passwort (Mind. 6 Zeichen)\" title=\"Gib hier dein Passwort ein\" style=\"padding-top:7px;padding-bottom:7px;margin-top: 0.2em;\"/>\n\n                      <input [(ngModel)]=\"reg_password_repeat\" (keyup)=\"keyupRegisterPasswordRepeat();keyupRegisterPassword();\" [style.background]=\"(reg_password_repeat.length>0 || reg_password.length>0)?reg_password_repeat_valid?'rgb(120,255,120)':'rgb(255,120,120)':'#eeeeee'\" id=\"registerForm_reg_password_repeat\" name=\"reg_password_repeat\" type=\"password\" maxlength=\"30\" placeholder=\"Wiederhole dein Passwort\" title=\"Wiederhole hier dein Passwort\" style=\"padding-top:7px;padding-bottom:7px;margin-top: 0.2em;\"/>\n\n                      <select [(ngModel)]=\"reg_faculty_id\" name=\"reg_department\" style=\"font-size:1em;background:#eeeeee;padding-top: 7px;padding-bottom: 7px;margin-top: 0.2em;\">\n                        <option value=\"-2\">W\u00E4hle deine Fakult\u00E4t</option>\n                        <option *ngFor=\"let t_faculty of getUniversalContentFacultyArray();\" value='{{t_faculty.faculty_id}}'>{{t_faculty.facultyname}}</option>\n                      </select>\n\n                      <div style=\"margin:10px 5px;float:left;\">\n                        <input id=\"reg_bed\" style=\"width:20px;height:20px;\" name=\"reg_bed\" type=\"checkbox\" value=\"bed\">\n                      </div>\n                      <div style=\"color:white;margin:10px 5px;\">Ich stimme den <a style=\"color:rgb(210,210,210);cursor:pointer;text-decoration: underline;\" (click)=\"navigateToLegal('tou')\" target=\"_blank\">AGB</a> sowie der <a style=\"color:rgb(210,210,210);cursor:pointer;text-decoration: underline;\" (click)=\"navigateToLegal('pp')\" target=\"_blank\">Datenschutzerkl\u00E4rungen</a> zu</div>\n                      <div style=\"clear:both;\"></div>\n\n                      <div (click)=\"registerLoggedUser()\" id=\"buttonReg\">Jetzt registrieren</div>\n                </form>\n\n\n            </div>\n        </section>\n\n\n        <!-- \"Delete ACC\" AND \"Go to Settings\" for Non-Anonymous Player -->\n        <section id=\"deleteAcc\">\n            <div style=\"padding:0px 10px;\">\n\n                <input (click)=\"deleteUser()\" type=\"button\" id=\"buttonDeleteAcc\" value=\"L\u00F6sche meinen Account\" style=\"width:100%;\"/>\n                <input (click)=\"navigateToComponent('usersettings')\" type=\"button\" id=\"buttonSettingsAcc\" value=\"Meine Einstellungen\" style=\"width:100%;margin-top:5px;\"/>\n\n            </div>\n        </section>\n\n\n        <!-- Nav -->\n        <nav class=\"nav\">\n            <ul>\n                <li [class.current_page_item]=\"showncomponent=='legal' && legalcomponent=='tou'\"><a (click)=\"navigateToLegal('tou')\" style=\"cursor:pointer;\">Nutzungsbedingungen</a></li>\n                <li [class.current_page_item]=\"showncomponent=='legal' && legalcomponent=='pp'\"><a (click)=\"navigateToLegal('pp')\" style=\"cursor:pointer;\">Datenschutzerkl\u00E4rung</a></li>\n                <li [class.current_page_item]=\"showncomponent=='legal' && legalcomponent=='impressum'\"><a (click)=\"navigateToLegal('impressum')\" style=\"cursor:pointer;\">Impressum</a></li>\n            </ul>\n        </nav>\n\n      </div>\n      <!-- /#sidebar-wrapper -->\n\n      <!-- Page Content -->\n      <div id=\"page-content-wrapper\" style=\"padding:0;\">\n\n        <div id=\"titleBar\" class=\"hidden-sm hidden-md hidden-lg\">\n          <div class=\"toggleLeft\" (click)=\"toggled=toggled?false:true;\"></div><div class=\"reloadButton\" onclick=\"location.reload();\"></div>\n        </div>\n\n        <div style=\"padding:15px;\">\n\n          <div class=\"container-fluid\">\n\n            <div id=\"content\">\n\n              <!-- Routing Logged User -->\n              <tasks-component *ngIf=\"showncomponent=='tasks'\" [user]=\"user\" [universalcontent]=\"universalcontent\"></tasks-component>\n              <quest-component *ngIf=\"showncomponent=='quest'\" [user]=\"user\" [universalcontent]=\"universalcontent\" [quest_id]=\"quest_id\"></quest-component>\n              <badge-component *ngIf=\"showncomponent=='badge'\" [user]=\"user\" [universalcontent]=\"universalcontent\" [badge_id]=\"badge_id\"></badge-component>\n              <userprogress-component *ngIf=\"showncomponent=='userprogress'\" [user]=\"user\" [universalcontent]=\"universalcontent\"></userprogress-component>\n              <legal-component *ngIf=\"showncomponent=='legal'\" [user]=\"user\" [legalcomponent]=\"legalcomponent\" [universalcontent]=\"universalcontent\"></legal-component>\n              <usersettings-component *ngIf=\"showncomponent=='usersettings'\" [user]=\"user\" [universalcontent]=\"universalcontent\"></usersettings-component>\n              <statistics-component *ngIf=\"showncomponent=='statistics'\" [user]=\"user\" [universalcontent]=\"universalcontent\"></statistics-component>\n              <highscorelist-component *ngIf=\"showncomponent=='highscorelist'\" [user]=\"user\" [universalcontent]=\"universalcontent\" [highscorepage]=\"highscorepage\"></highscorelist-component>\n              <tasksearch-component *ngIf=\"showncomponent=='tasksearch'\" [user]=\"user\" [universalcontent]=\"universalcontent\"></tasksearch-component>\n              <task-component *ngIf=\"showncomponent=='task'\" [user]=\"user\" [universalcontent]=\"universalcontent\" [task_id]=\"task_id\" [additionalinformation]=\"additionalinformation\"></task-component>\n              <administration-component *ngIf=\"showncomponent=='administration'\" [user]=\"user\" [universalcontent]=\"universalcontent\" (reload)=\"lService.loadUniversalContent();\"></administration-component>\n\n              <footer id=\"is-footer\">\n                <hr style=\"width:100%\">\n              </footer>\n\n\n            </div>\n\n          </div>\n        </div>\n      </div>\n      <!-- /#page-content-wrapper -->\n\n  </div>\n  <!-- -->\n\n  <!-- Overlay -->\n  <div *ngFor=\"let solvedOverlayDataObject of solvedOverlayArray;let i = index;\">\n    <solvedoverlay-component [user]=\"user\" [universalcontent]=\"universalcontent\" [solveddata]=\"solvedOverlayDataObject\" (closeOverlay)=\"removeFromSolvedOverlayArray(i);\"></solvedoverlay-component>\n  </div>\n\n\n  <!-- Dialog -->\n  <div id=\"dialog-confirm\" style=\"display:none;\">\n    <div id=\"dialog-content\"></div>\n  </div>\n\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, typeof (_b = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _b || Object, libgame_service_1.LibgameService])
], LoggedcontentComponent);
exports.LoggedcontentComponent = LoggedcontentComponent;
var _a, _b;
//# sourceMappingURL=loggedcontent.component.js.map