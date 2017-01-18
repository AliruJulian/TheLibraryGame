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
var LegalComponent = (function () {
    function LegalComponent(router, lService) {
        this.router = router;
        this.lService = lService;
        this.specificcontent = {};
        this.loading_specificcontent = true;
    }
    LegalComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Specific Content
        this.loading_specificcontent = true;
        this.lService.specificcontent$.subscribe(function (specificcontent) {
            _this.specificcontent = specificcontent;
            _this.loading_specificcontent = false;
        });
        this.lService.loadSpecificContent('legal');
    };
    LegalComponent.prototype.getTOU = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['TOU'] !== 'undefined' ? this.specificcontent['TOU'] : { text: "" };
    };
    LegalComponent.prototype.getPP = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['PP'] !== 'undefined' ? this.specificcontent['PP'] : { text: "" };
    };
    LegalComponent.prototype.getIMPRESSUM = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['IMPRESSUM'] !== 'undefined' ? this.specificcontent['IMPRESSUM'] : { text: "" };
    };
    LegalComponent.prototype.getLegalcontent = function () {
        if (this.legalcomponent == 'tou') {
            return this.getTOU()["text"];
        }
        else if (this.legalcomponent == 'pp') {
            return this.getPP()["text"];
        }
        else if (this.legalcomponent == 'impressum') {
            return this.getIMPRESSUM()["text"];
        }
        else {
            return 'Nothing found!';
        }
    };
    return LegalComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LegalComponent.prototype, "user", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LegalComponent.prototype, "universalcontent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LegalComponent.prototype, "legalcomponent", void 0);
LegalComponent = __decorate([
    core_1.Component({
        selector: 'legal-component',
        providers: [libgame_service_1.LibgameService],
        template: "\n\n  <div class=\"row\">\n    <section class=\"col-xs-12\" style=\"padding:0;background:white;\">\n\n        <div class=\"content-frame\">\n\n          <p *ngIf=\"legalcomponent=='tou'\" class=\"headline\"style=\"margin-top:10px;\">Allgemeine Gesch\u00E4ftsbedingungen</p>\n          <p *ngIf=\"legalcomponent=='pp'\" class=\"headline\"style=\"margin-top:10px;\">Datenschutzerkl\u00E4rung</p>\n          <p *ngIf=\"legalcomponent=='impressum'\" class=\"headline\"style=\"margin-top:10px;\">Impressum</p>\n\n          <div style=\"margin-top:20px;width:100%;padding:0 3em;\" [innerHTML]=\"getLegalcontent()\">\n          </div>\n\n        </div>\n\n    </section>\n</div>\n\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, libgame_service_1.LibgameService])
], LegalComponent);
exports.LegalComponent = LegalComponent;
var _a;
//# sourceMappingURL=legal.component.js.map