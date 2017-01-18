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
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var htmleditor_component_1 = require("./components/subcomponents/htmleditor.component");
var selectquest_component_1 = require("./components/subcomponents/selectquest.component");
var selecttask_component_1 = require("./components/subcomponents/selecttask.component");
var uploadpicture_component_1 = require("./components/subcomponents/uploadpicture.component");
var administration_component_1 = require("./components/administration.component");
var badge_component_1 = require("./components/badge.component");
var editbadge_component_1 = require("./components/editbadge.component");
var editquest_component_1 = require("./components/editquest.component");
var edittask_component_1 = require("./components/edittask.component");
var legal_component_1 = require("./components/legal.component");
var highscorelist_component_1 = require("./components/highscorelist.component");
var loggedcontent_component_1 = require("./components/loggedcontent.component");
var quest_component_1 = require("./components/quest.component");
var solvedoverlay_component_1 = require("./components/solvedoverlay.component");
var statistics_component_1 = require("./components/statistics.component");
var task_component_1 = require("./components/task.component");
var tasks_component_1 = require("./components/tasks.component");
var tasksearch_component_1 = require("./components/tasksearch.component");
var unloggedcontent_component_1 = require("./components/unloggedcontent.component");
var userprogress_component_1 = require("./components/userprogress.component");
var usersettings_component_1 = require("./components/usersettings.component");
var safehtml_pipe_1 = require("./components/pipes/safehtml.pipe");
var libgame_service_1 = require("./services/libgame.service");
var routes = [
    {
        path: '',
        redirectTo: '/l/tasks',
        pathMatch: 'full'
    },
    {
        path: 'u/:component',
        component: unloggedcontent_component_1.UnloggedcontentComponent
    },
    {
        path: 'u/:component/:id',
        component: unloggedcontent_component_1.UnloggedcontentComponent
    },
    {
        path: 'l/home',
        redirectTo: '/l/tasks',
        pathMatch: 'full'
    },
    {
        path: 'l/:component',
        component: loggedcontent_component_1.LoggedcontentComponent
    },
    {
        path: 'l/:component/:id',
        component: loggedcontent_component_1.LoggedcontentComponent
    },
    {
        path: 'l/:component/:id/:additionalinformation',
        component: loggedcontent_component_1.LoggedcontentComponent
    }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            router_1.RouterModule.forRoot(routes, { useHash: false })
        ],
        declarations: [
            app_component_1.AppComponent,
            htmleditor_component_1.HTMLEditorComponent,
            selectquest_component_1.SelectQuestComponent,
            selecttask_component_1.SelectTaskComponent,
            uploadpicture_component_1.UploadPictureComponent,
            administration_component_1.AdministrationComponent,
            badge_component_1.BadgeComponent,
            editbadge_component_1.EditBadgeComponent,
            editquest_component_1.EditQuestComponent,
            edittask_component_1.EditTaskComponent,
            highscorelist_component_1.HighscorelistComponent,
            legal_component_1.LegalComponent,
            loggedcontent_component_1.LoggedcontentComponent,
            quest_component_1.QuestComponent,
            solvedoverlay_component_1.SolvedOverlayComponent,
            statistics_component_1.StatisticsComponent,
            task_component_1.TaskComponent,
            tasks_component_1.TasksComponent,
            tasksearch_component_1.TasksearchComponent,
            unloggedcontent_component_1.UnloggedcontentComponent,
            userprogress_component_1.UserprogressComponent,
            usersettings_component_1.UsersettingsComponent,
            safehtml_pipe_1.SafeHtmlPipe
        ],
        providers: [
            libgame_service_1.LibgameService
        ],
        bootstrap: [app_component_1.AppComponent]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map