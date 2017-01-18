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
var UsersettingsComponent = (function () {
    function UsersettingsComponent(router, lService) {
        this.router = router;
        this.lService = lService;
        this.specificcontent = {};
        this.loading_specificcontent = true;
        this.error_setting_new_password = false;
        this.show_update_password_button = true;
    }
    UsersettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Specific Content
        this.loading_specificcontent = true;
        this.lService.specificcontent$.subscribe(function (specificcontent) {
            _this.specificcontent = specificcontent;
            _this.loading_specificcontent = false;
        });
        this.lService.loadSpecificContent('usersettings');
        $(document).ready(function () {
            $('#settings_new_password').keyup(function () {
                var pattern = /[A-Za-z0-9!?.:;-]{6,}/g;
                if ($(this).val().match(pattern) != null) {
                    $(this).css("background", "rgb(120,255,120)");
                }
                else {
                    $(this).css("background", "rgb(255,120,120)");
                }
            });
            $('#settings_new_password_repeat').keyup(function () {
                if ($(this).val() == $('#settings_new_password').val()) {
                    $(this).css("background", "rgb(120,255,120)");
                }
                else {
                    $(this).css("background", "rgb(255,120,120)");
                }
            });
        });
    };
    UsersettingsComponent.prototype.setNewPassword = function () {
        var _this = this;
        var pattern = /[A-Za-z0-9!?.:;-]{6,}/g;
        if ($('#settings_new_password').val().match(pattern) == null) {
            window.alert("Das Passwort entspricht nicht unseren Passwort Richtlinien!");
            return;
        }
        if ($('#settings_new_password').val() != $('#settings_new_password_repeat').val()) {
            window.alert("Das Passwort und dessen wiederholte Eingabe müssen übereinstimmen!");
            return;
        }
        this.show_update_password_button = false;
        this.lService.updatePassword($('#settings_old_password').val(), $('#settings_new_password').val()).subscribe(function (data) {
            _this.show_update_password_button = true;
            if (typeof data.data === 'undefined' || data.data != true) {
                _this.error_setting_new_password = true;
                window.alert("Beim Setzen des neuen Passworts ist ein Fehler aufgetreten.");
            }
            else {
                $('#settings_old_password').val('');
                $('#settings_new_password').val('');
                $('#settings_new_password_repeat').val('');
                window.alert("Ihr Passwort wurde neu gesetzt!");
            }
        }, function (error) {
            _this.show_update_password_button = true;
            _this.error_setting_new_password = true;
            window.alert("Beim Setzen des neuen Passworts ist ein Fehler aufgetreten.");
            console.error('Could not set new password.');
        });
    };
    return UsersettingsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], UsersettingsComponent.prototype, "user", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], UsersettingsComponent.prototype, "universalcontent", void 0);
UsersettingsComponent = __decorate([
    core_1.Component({
        selector: 'usersettings-component',
        providers: [libgame_service_1.LibgameService],
        template: "\n\n  <div class=\"row\">\n\n      <div class=\"col-xs-12\" style=\"padding:0;\">\n\n          <div id=\"cf-se-overview\" class=\"content-frame\">\n\n              <p class=\"headline\">Neues Passwort</p>\n\n              <div style=\"width:70%;margin-left:auto;margin-right:auto;\">\n                  <input type=\"password\" placeholder=\"Altes Passwort\" id=\"settings_old_password\" style=\"width:100%;margin-top:0.3em;margin-bottom:0.3em;\">\n                  <br>\n                  <input type=\"password\" placeholder=\"Neues Passwort (Min. 6 Zeichen)\" id=\"settings_new_password\" style=\"width:100%;margin-top:0.3em;margin-bottom:0.3em;\">\n                  <br>\n                  <input type=\"password\" placeholder=\"Wiederhole das neue Passwort\" id=\"settings_new_password_repeat\" style=\"width:100%;margin-top:0.3em;margin-bottom:0.3em;\">\n                  <br>\n                  <button (click)=\"setNewPassword()\" *ngIf=\"show_update_password_button\" class=\"button\" style=\"margin-top:0.5em;margin-bottom:0.3em;width:100%;\">Neues Passwort jetzt setzen</button>\n                  <button *ngIf=\"!show_update_password_button\" class=\"button\" style=\"margin-top:0.5em;margin-bottom:0.3em;width:100%;\"><i class=\"fa fa-spinner fa-pulse\"></i></button>\n\n              </div>\n\n\n\n          </div>\n\n\n      </div>\n\n\n\n  </div>\n\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, libgame_service_1.LibgameService])
], UsersettingsComponent);
exports.UsersettingsComponent = UsersettingsComponent;
var _a;
//# sourceMappingURL=usersettings.component.js.map