import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { RouterModule, Routes }  from '@angular/router';
import { AppComponent }         from './app.component';

import { HTMLEditorComponent } from './components/subcomponents/htmleditor.component';
import { SelectQuestComponent } from './components/subcomponents/selectquest.component';
import { SelectTaskComponent } from './components/subcomponents/selecttask.component';
import { UploadPictureComponent } from './components/subcomponents/uploadpicture.component';

import { AdministrationComponent } from './components/administration.component';
import { BadgeComponent } from './components/badge.component';
import { EditBadgeComponent } from './components/editbadge.component';
import { EditQuestComponent } from './components/editquest.component';
import { EditTaskComponent } from './components/edittask.component';
import { LegalComponent } from './components/legal.component';
import { HighscorelistComponent } from './components/highscorelist.component';
import { LoggedcontentComponent } from './components/loggedcontent.component';
import { QuestComponent } from './components/quest.component';
import { SolvedOverlayComponent } from './components/solvedoverlay.component';
import { StatisticsComponent } from './components/statistics.component';
import { TaskComponent } from './components/task.component';
import { TasksComponent } from './components/tasks.component';
import { TasksearchComponent } from './components/tasksearch.component';
import { UnloggedcontentComponent } from './components/unloggedcontent.component';
import { UserprogressComponent } from './components/userprogress.component';
import { UsersettingsComponent } from './components/usersettings.component';

import { SafeHtmlPipe } from './components/pipes/safehtml.pipe';

import { LibgameService } from './services/libgame.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/l/tasks',
    pathMatch: 'full'
  },
  {
    path: 'u/:component',
    component: UnloggedcontentComponent
  },
  {
    path: 'u/:component/:id',
    component: UnloggedcontentComponent
  },
  {
    path: 'l/home',
    redirectTo: '/l/tasks',
    pathMatch: 'full'
  },
  {
    path: 'l/:component',
    component: LoggedcontentComponent
  },
  {
    path: 'l/:component/:id',
    component: LoggedcontentComponent
  },
  {
    path: 'l/:component/:id/:additionalinformation',
    component: LoggedcontentComponent
  }
];


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, { useHash: false })
  ],
  declarations: [
    AppComponent,

    HTMLEditorComponent,
    SelectQuestComponent,
    SelectTaskComponent,
    UploadPictureComponent,

    AdministrationComponent,
    BadgeComponent,
    EditBadgeComponent,
    EditQuestComponent,
    EditTaskComponent,
    HighscorelistComponent,
    LegalComponent,
    LoggedcontentComponent,
    QuestComponent,
    SolvedOverlayComponent,
    StatisticsComponent,
    TaskComponent,
    TasksComponent,
    TasksearchComponent,
    UnloggedcontentComponent,
    UserprogressComponent,
    UsersettingsComponent,

    SafeHtmlPipe
  ],
  providers: [
    LibgameService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
