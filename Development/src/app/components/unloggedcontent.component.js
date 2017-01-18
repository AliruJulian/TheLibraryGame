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
var UnloggedcontentComponent = (function () {
    function UnloggedcontentComponent(router, route, lService) {
        this.router = router;
        this.route = route;
        this.lService = lService;
        this.user = {};
        this.loading_user = true;
        this.universalcontent = {};
        this.loading_universalcontent = true;
        this.showncomponent = "";
        this.legalcomponent = "";
        this.username = "";
        this.pwd = "";
        this.new_password_email = "";
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
    UnloggedcontentComponent.prototype.ngOnInit = function () {
        var _this = this;
        $('#titleBar').hide();
        this.loading_user = true;
        this.lService.user$.subscribe(function (user) {
            console.log(user);
            _this.user = user;
            _this.loading_user = false;
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
            component = component.toLowerCase();
            id = id.toLowerCase();
            if (component.length == 0 || component == 'home') {
                _this.showncomponent = 'home';
            }
            else if (component == 'registration') {
                _this.showncomponent = 'registration';
            }
            else if (component == 'sendpwd') {
                _this.showncomponent = 'sendpwd';
            }
            else if (component == 'legal' && id.length != 0) {
                _this.showncomponent = 'legal';
                _this.legalcomponent = id;
            }
            else {
                _this.showncomponent = 'home';
            }
        });
    };
    UnloggedcontentComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    UnloggedcontentComponent.prototype.navigateToComponent = function (componentname) {
        this.router.navigate(["/l/" + componentname]);
    };
    UnloggedcontentComponent.prototype.navigateToUnloggedComponent = function (componentname) {
        this.router.navigate(["/u/" + componentname]);
    };
    UnloggedcontentComponent.prototype.loginAsAnonym = function () {
        var _this = this;
        this.lService.loginAsAnonym().subscribe(function (data) {
            if (typeof data !== 'undefined' && data.result == true) {
                _this.navigateToComponent("tasks");
            }
            else {
                window.alert("Es ist ein Fehler aufgetreten. Bitte die Seite neu laden lassen!");
            }
        }, function (error) {
            window.alert("Es ist ein Fehler aufgetreten. Bitte die Seite neu laden lassen!");
        });
    };
    UnloggedcontentComponent.prototype.sendNewPassword = function () {
        if (this.new_password_email.length == 0 || !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.new_password_email)) {
            window.alert("Bitte gib zuerst deine korrekte E-Mail ein!");
            return;
        }
        this.lService.sendNewPassword(this.new_password_email).subscribe(function (data) {
            if (typeof data !== 'undefined' && data.result == true) {
                window.alert("Dir wurde eine Mail mit deinen neuen Zugangsdaten gesendet!");
            }
            else {
                window.alert("Es ist ein Fehler aufgetreten. Bitte die Seite neu laden lassen und nochmal versuchen!");
            }
        }, function (error) {
            window.alert("Es ist ein Fehler aufgetreten. Bitte die Seite neu laden lassen und nochmal versuchen!");
        });
    };
    UnloggedcontentComponent.prototype.registerUser = function () {
        var _this = this;
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
                _this.router.navigate(["/l/tasks"]);
            }
            else {
                window.alert("Bitte überprüfe deine Eingaben!");
            }
        }, function (error) {
            window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
            console.error('Could not register user.');
        });
    };
    UnloggedcontentComponent.prototype.getUniversalContentStart = function () {
        if (!$.isEmptyObject(this.universalcontent) && typeof this.universalcontent["_Content"] !== 'undefined' && this.universalcontent["_Content"].filter(function (x) { return x.content_mapper == 'START'; }).length != 0) {
            return this.universalcontent["_Content"].filter(function (x) { return x.content_mapper == 'START'; })[0]["text"];
        }
        return '';
    };
    UnloggedcontentComponent.prototype.getUniversalContentFacultyArray = function () {
        if (!$.isEmptyObject(this.universalcontent) && typeof this.universalcontent["_Faculties"] !== 'undefined') {
            return this.universalcontent["_Faculties"];
        }
        return [];
    };
    UnloggedcontentComponent.prototype.getUniversalContentMainPictureId = function () {
        if (!$.isEmptyObject(this.universalcontent) && typeof this.universalcontent["_Content"] !== 'undefined' && this.universalcontent["_Content"].filter(function (x) { return x.content_mapper == "MAIN_PICTURE_ID"; }).length != 0) {
            return this.universalcontent["_Content"].filter(function (x) { return x.content_mapper == "MAIN_PICTURE_ID"; })[0].text;
        }
        return -1;
    };
    UnloggedcontentComponent.prototype.loginUser = function () {
        var _this = this;
        this.lService.loginUser(this.username, this.pwd).subscribe(function (data) {
            if (typeof data.result !== 'undefined' && data.result == true) {
                _this.router.navigate(["/l/tasks"]);
            }
            else {
                window.alert("Bitte überprüfe deinen Username und Passwort!");
            }
        }, function (error) {
            window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
            console.error('Could not login user.');
        });
    };
    UnloggedcontentComponent.prototype.keyupRegisterUsername = function () {
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
    UnloggedcontentComponent.prototype.keyupRegisterEmail = function () {
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
    UnloggedcontentComponent.prototype.keyupRegisterPassword = function () {
        var pattern = /[A-Za-z0-9!?.:;-]{6,}/g;
        if (this.reg_password.length != 0 && this.reg_password.match(pattern) != null) {
            this.reg_password_valid = true;
        }
        else {
            this.reg_password_valid = false;
        }
    };
    UnloggedcontentComponent.prototype.keyupRegisterPasswordRepeat = function () {
        var pattern = /[A-Za-z0-9!?.:;-]{6,}/g;
        if (this.reg_password_repeat.length != 0 && this.reg_password == this.reg_password_repeat) {
            this.reg_password_repeat_valid = true;
        }
        else {
            this.reg_password_repeat_valid = false;
        }
    };
    return UnloggedcontentComponent;
}());
UnloggedcontentComponent = __decorate([
    core_1.Component({
        selector: 'unloggedcontent-component',
        providers: [libgame_service_1.LibgameService],
        template: "\n\n<div style=\"width:100%;background-color: #990000;min-height: 100%;position: absolute;padding-top: 50px;\">\n\n  <div id=\"content-landing\">\n\n    <div class=\"row\">\n\n        <div class=\"col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4\" style=\"padding:0;\">\n\n            <!-- Logo -->\n            <div id=\"logo\" style=\"width:200px;margin-left:auto;margin-right:auto;margin-bottom: 20px;\">\n                <img [src]=\"getUniversalContentMainPictureId().length != 0 ? lService.getPictureLink(getUniversalContentMainPictureId()) : ''\" style=\"width:100%;\" />\n            </div>\n\n            <div id=\"wrapper\" style=\"padding-left:0;\">\n\n                <div *ngIf=\"showncomponent=='registration'\">\n\n                  <p class=\"lp-headline\" style=\"text-align:center;text-decoration:underline;font-size:1.2em;margin:0;color:white;margin-bottom:0.8em;\">Registriere dich jetzt!</p>\n\n                  <form id=\"registerForm\">\n                        <input [(ngModel)]=\"reg_username\" (keyup)=\"keyupRegisterUsername()\" [style.background]=\"reg_username.length>0?(reg_username_valid && reg_username_exists == false)?'rgb(120,255,120)':'rgb(255,120,120)':'#eeeeee'\" id=\"registerForm_reg_username\" name=\"reg_username\" type=\"text\" maxlength=\"30\" placeholder=\"Username\" title=\"Gib hier deinen gew\u00FCnschten Usernamen ein\" style=\"padding-top:7px;padding-bottom:7px;\"/>\n                        <div *ngIf=\"reg_username_exists\" style=\"padding: 5px;color: white;\">Username ist leider schon vergeben!</div>\n\n                        <input [(ngModel)]=\"reg_email\" (keyup)=\"keyupRegisterEmail()\" [style.background]=\"reg_email.length>0?(reg_email_valid && reg_email_exists == false)?'rgb(120,255,120)':'rgb(255,120,120)':'#eeeeee'\" id=\"registerForm_reg_email\" name=\"reg_email\" type=\"text\" maxlength=\"100\" placeholder=\"E-Mail\" title=\"Gib hier deine E-Mail ein\" style=\"padding-top:7px;padding-bottom:7px;margin-top: 0.4em;\"/>\n                        <div *ngIf=\"reg_email_exists\" style=\"padding: 5px;color: white;\">Ein User mit dieser E-Mail existiert leider bereits!</div>\n\n                        <input [(ngModel)]=\"reg_password\" (keyup)=\"keyupRegisterPassword();keyupRegisterPasswordRepeat();\" [style.background]=\"(reg_password_repeat.length>0 || reg_password.length>0)?reg_password_valid?'rgb(120,255,120)':'rgb(255,120,120)':'#eeeeee'\" id=\"registerForm_reg_password\" name=\"reg_password\" type=\"password\" maxlength=\"30\" placeholder=\"Passwort (Mind. 6 Zeichen)\" title=\"Gib hier dein Passwort ein\" style=\"padding-top:7px;padding-bottom:7px;margin-top: 0.4em;\"/>\n\n                        <input [(ngModel)]=\"reg_password_repeat\" (keyup)=\"keyupRegisterPasswordRepeat();keyupRegisterPassword();\" [style.background]=\"(reg_password_repeat.length>0 || reg_password.length>0)?reg_password_repeat_valid?'rgb(120,255,120)':'rgb(255,120,120)':'#eeeeee'\" id=\"registerForm_reg_password_repeat\" name=\"reg_password_repeat\" type=\"password\" maxlength=\"30\" placeholder=\"Wiederhole dein Passwort\" title=\"Wiederhole hier dein Passwort\" style=\"padding-top:7px;padding-bottom:7px;margin-top: 0.4em;\"/>\n\n                        <select [(ngModel)]=\"reg_faculty_id\" name=\"reg_department\" style=\"font-size:1em;background:#eeeeee;padding-top: 7px;padding-bottom: 7px;margin-top: 0.4em;\">\n                          <option value=\"-2\">W\u00E4hle deine Fakult\u00E4t</option>\n                          <option *ngFor=\"let t_faculty of getUniversalContentFacultyArray();\" value='{{t_faculty.faculty_id}}'>{{t_faculty.facultyname}}</option>\n                        </select>\n\n                        <input id=\"reg_bed\" style=\"margin:10px 5px;float:left;width:20px;height:20px;margin-top:8px;\" name=\"reg_bed\" type=\"checkbox\" value=\"bed\">\n                        <div style=\"color:white;margin:10px 5px;\">Ich stimme den <a style=\"color:rgb(210,210,210);cursor:pointer;text-decoration: underline;\" (click)=\"navigateToUnloggedComponent('legal/tou')\" target=\"_blank\">AGB</a> sowie der <a style=\"color:rgb(210,210,210);cursor:pointer;text-decoration: underline;\" (click)=\"navigateToUnloggedComponent('legal/pp')\" target=\"_blank\">Datenschutzerkl\u00E4rungen</a> zu</div>\n                        <div style=\"clear:both;\"></div>\n\n                        <div (click)=\"registerUser()\" id=\"buttonReg\">Jetzt registrieren</div>\n                        <div class=\"buttonForLoginRegisterChange\" (click)=\"navigateToUnloggedComponent('home')\">Zur\u00FCck zum Login</div>\n                  </form>\n\n                </div>\n\n                <div *ngIf=\"showncomponent=='sendpwd'\">\n\n                  <p class=\"lp-headline\" style=\"text-align:center;font-size:1.2em;margin:0;color:white;margin-bottom:0.8em;\">Trage deine E-Mail ein und du wirst ein neues Passwort per Mail erhalten!</p>\n\n                  <form>\n                        <input [(ngModel)]=\"new_password_email\" name=\"fp_email\" type=\"text\" maxlength=\"100\" placeholder=\"E-Mail\" title=\"Gib hier deine E-Mail ein\"/>\n                        <div (click)=\"sendNewPassword()\" id=\"buttonSendPassword\">Neues Passwort jetzt senden</div>\n                        <div class=\"buttonForLoginRegisterChange\" (click)=\"navigateToUnloggedComponent('home')\">Zur\u00FCck zum Login</div>\n                  </form>\n\n                </div>\n\n                <div *ngIf=\"showncomponent=='legal'\">\n                  <legal-component [user]=\"user\" [legalcomponent]=\"legalcomponent\" [universalcontent]=\"universalcontent\"></legal-component>\n\n                  <div class=\"buttonForLoginRegisterChange\" (click)=\"navigateToUnloggedComponent('home')\">Zur\u00FCck zum Login</div>\n                </div>\n\n                <div *ngIf=\"showncomponent=='home'\">\n\n                  <div [innerHTML]=\"getUniversalContentStart() | safeHtml\" class=\"unloggedcontent\">\n                  </div>\n\n                  <!-- Click In -->\n                  <form id=\"registerForm\" style=\"margin-top:1em;\">\n                      <input [(ngModel)]=\"username\" type=\"text\" name=\"username\" placeholder=\"Dein Username\" style=\"padding-top:7px;padding-bottom:7px;\"/>\n                      <input [(ngModel)]=\"pwd\" type=\"password\" name=\"password\" placeholder=\"Dein Passwort\" style=\"padding-top:7px;padding-bottom:7px;margin-top: 0.5em;\"/>\n                      <div (click)=\"loginUser()\" id=\"buttonLogIn\">Log In</div>\n                      <div class=\"buttonForLoginRegisterChange\" (click)=\"navigateToUnloggedComponent('registration')\">Registriere dich jetzt</div>\n                      <div class=\"buttonForLoginAsAnonym\" (click)=\"loginAsAnonym()\">Erstmal Anonym spielen</div>\n                      <div class=\"buttonForForgotPasswordChange\" (click)=\"navigateToUnloggedComponent('sendpwd')\">Passwort vergessen</div>\n                  </form>\n\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n\n  </div>\n</div>\n\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, typeof (_b = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _b || Object, libgame_service_1.LibgameService])
], UnloggedcontentComponent);
exports.UnloggedcontentComponent = UnloggedcontentComponent;
var _a, _b;
//# sourceMappingURL=unloggedcontent.component.js.map