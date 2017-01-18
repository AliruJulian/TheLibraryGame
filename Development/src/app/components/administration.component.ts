import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, Params } from '@angular/router';
import { LibgameService } from './../services/libgame.service';

declare var $:any;
declare var Chart:any;
declare var updateChart:any;
declare var JSON:any;

@Component({
  selector: 'administration-component',
  providers: [LibgameService],
  template: `

  <div class="row-controlling row">

      <p class="overall-headline" style="width:100%;text-align:center;padding: 10px 0px!important;">CONTROLLING</p>

      <div class="col-xs-12" style="padding:0;">

          <div id="cf-ad-stats" class="content-frame">

              <p class="headline">Daten und Fakten</p>

              <div class="col-xs-12" style="width:100%;">

                  <div  style="vertical-align:top;width:100%;color:rgb(255,255,255);">

                      <div id="cf-ad-stats-quests-count" class="col-xs-12 col-sm-4" style="vertical-align:top;">
                          <p style="font-size:1.3em;font-weight:bold;text-align:center;">Aktive Quests</p>
                          <p style="font-size:1em;text-align:center;">{{getCountActiveQuests()}}</p>
                          <div style="clear:both;"></div>
                      </div>

                      <div id="cf-ad-stats-badges-count" class="col-xs-12 col-sm-4" style="vertical-align:top;">
                          <p style="font-size:1.3em;font-weight:bold;text-align:center;">Aktive Abzeichen</p>
                          <p style="font-size:1em;text-align:center;">{{getCountActiveBadges()}}</p>
                          <div style="clear:both;"></div>
                      </div>

                      <div id="cf-ad-stats-tasks-count" class="col-xs-12 col-sm-4" style="vertical-align:top;">
                          <p style="font-size:1.3em;font-weight:bold;text-align:center;">Aktive Aufgaben</p>
                          <p style="font-size:1em;text-align:center;">{{getCountActiveTasks()}}</p>
                          <div style="clear:both;"></div>
                      </div>

                  </div>
              </div>

              <div class="col-xs-12" style="width:100%;">

                  <div style="vertical-align:top;width:100%;color:rgb(255,255,255);">

                      <div id="cf-ad-stats-user-count" class="col-xs-12 col-sm-3" style="vertical-align:top;">
                          <p style="font-size:1.3em;font-weight:bold;text-align:center;">Nutzer</p>
                          <p style="font-size:1em;text-align:center;">{{getCountUsers()}}</p>
                          <div style="clear:both;"></div>
                      </div>

                      <div id="cf-ad-stats-user-last-active" class="col-xs-12 col-sm-3" style="vertical-align:top;">
                          <p style="font-size:1.3em;font-weight:bold;text-align:center;">ZULETZT AKTIVE USER [2 TAGE]</p>
                          <p style="font-size:1em;text-align:center;">{{getCountUsersActiveLast2Days()}}</p>
                          <div style="clear:both;"></div>
                      </div>

                      <div id="cf-ad-stats-user-completed-quests" class="col-xs-12 col-sm-3" style="vertical-align:top;">
                          <p style="font-size:1.3em;font-weight:bold;text-align:center;">USER, WELCHE ALLE QUESTS GELÖST HABEN</p>
                          <p style="font-size:1em;text-align:center;">{{getCountUsersCompletedAllQuests()}}</p>
                          <div style="clear:both;"></div>
                      </div>

                      <div id="cf-ad-stats-user-completed-badges" class="col-xs-12 col-sm-3" style="vertical-align:top;">
                          <p style="font-size:1.3em;font-weight:bold;text-align:center;">USER, WELCHE ALLE ABZEICHEN GESAMMELT HABEN</p>
                          <p style="font-size:1em;text-align:center;">{{getCountUsersCompletedAllBadges()}}</p>
                          <div style="clear:both;"></div>
                      </div>

                  </div>


              </div>
              <div style="clear:both;"></div>


          </div>


          <div id="cf-ad-user-activity-task" class="content-frame">

              <p class="headline headline-as-button" (click)="show_c_solved_tasks_chart=show_c_solved_tasks_chart?false:true;initChartWithDelay();">Chart: Gelöste Aufgaben</p>

              <div [hidden]="!show_c_solved_tasks_chart" style="width:100%;">
                  <div style="display:inline-block;border:2px solid rgb(0,0,0);border-radius:4px;">
                    <div (click)="updateChartUserActivityTask(10,0,0);user_activity_task_active='10d';" [class.whiteButtonClass-currentItem]="user_activity_task_active=='10d'" [class.whiteButtonClass]="user_activity_task_active!='10d'" class="depend-on-device-none-to-33-percentage-width" style="float:left;padding:5px 10px;">10 Tage</div>
                    <div (click)="updateChartUserActivityTask(30,0,0);user_activity_task_active='30d';" [class.whiteButtonClass-currentItem]="user_activity_task_active=='30d'" [class.whiteButtonClass]="user_activity_task_active!='30d'" class="depend-on-device-none-to-33-percentage-width" style="float:left;padding:5px 10px;">30 Tage</div>
                    <div (click)="updateChartUserActivityTask(0,6,0);user_activity_task_active='6m';" [class.whiteButtonClass-currentItem]="user_activity_task_active=='6m'" [class.whiteButtonClass]="user_activity_task_active!='6m'" class="depend-on-device-none-to-33-percentage-width" style="float:left;padding:5px 10px;">6 Monate</div>
                    <div (click)="updateChartUserActivityTask(0,12,0);user_activity_task_active='12m';" [class.whiteButtonClass-currentItem]="user_activity_task_active=='12m'" [class.whiteButtonClass]="user_activity_task_active!='12m'" class="depend-on-device-none-to-33-percentage-width" style="float:left;padding:5px 10px;">12 Monate</div>
                    <div (click)="updateChartUserActivityTask(0,24,0);user_activity_task_active='24m';" [class.whiteButtonClass-currentItem]="user_activity_task_active=='24m'" [class.whiteButtonClass]="user_activity_task_active!='24m'" class="depend-on-device-none-to-33-percentage-width" style="float:left;padding:5px 10px;">24 Monate</div>
                    <div (click)="updateChartUserActivityTask(0,0,5);user_activity_task_active='5y';" [class.whiteButtonClass-currentItem]="user_activity_task_active=='5y'" [class.whiteButtonClass]="user_activity_task_active!='5y'" class="depend-on-device-none-to-33-percentage-width" style="float:left;padding:5px 10px;">5 Jahre</div>
                    <div style="clear:both;"></div>
                  </div>
              </div>

              <div [hidden]="!show_c_solved_tasks_chart" style="width:100%!important;min-width:100px!important;">
                  <canvas id="canvas_user_activity_task" height="400"></canvas>
              </div>

          </div>

      </div>


  </div>


  <div class="row-content-management row">

      <p class="overall-headline" style="width:100%;text-align:center;">CONTENT-MANAGEMENT</p>

      <div class="col-xs-12" style="padding:0;">

          <div class="content-frame">

              <p class="headline headline-as-button" (click)="show_cm_general=show_cm_general?false:true;">Allgemein</p>

              <div [hidden]="!show_cm_general" style="width:100%;">

                  <!-- Adding Location -->
                  <div class="col-xs-12 col-sm-4 col-sm-offset-4 adm-frame">

                      <p class="headline">Administriere Allgemeines</p>

                      <hr class="hrForAdministration">
                      <label style="width:100%;text-align:center;padding-left:0.5em;">Hauptbild / Logo des Spiels<span style="color:#e9266d">*</span></label>
                      <br>
                      <div >
                          <div style="float:left;width:50%;margin-top:10px;">
                              <select [value]="getUniversalContent('MAIN_PICTURE_ID')" (change)="setUniversalContent('MAIN_PICTURE_ID',$event.target.value);" style="width:100%;">
                                  <option *ngFor="let t_picture of getUniversalContentPictures();" value='{{t_picture.picture_id}}'>{{t_picture.picturename}}</option>
                              </select>
                          </div>
                          <div style="float:left;width:50%;text-align:right;">
                              <uploadpicture-component (reload)="reload.emit(true);"></uploadpicture-component>
                          </div>
                          <div style="clear:both;margin:0;height:0;"></div>
                          <div [hidden]="(getUniversalContent('MAIN_PICTURE_ID')+'').length == 0" style="text-align:center;">
                              <label style="width:100%;text-align:center;">Hauptbild / Logo des Spiels Vorschau</label>
                              <br>
                              <img style='width:30%;' src='{{(getUniversalContent("MAIN_PICTURE_ID")+"").length != 0 ? lService.getPictureLink(getUniversalContent("MAIN_PICTURE_ID")) : ""}}'>
                          </div>
                      </div>
                      <hr class="hrForAdministration">

                      <label style="width:100%;text-align:center;padding-left:0.5em;">Zentraler Ort (Dieser Ort bestimmt, auf welchen Punkt beim Öffnen der Aufgabensuche gezoomt werden soll)</label>
                      <br>
                      <select [value]="getUniversalContent('ROOT_LOCATION')" (change)="setUniversalContent('ROOT_LOCATION',$event.target.value);"  style="width:100%;">
                        <option value='-1' selected="selected">--None--</option>
                        <option *ngFor="let t_location of getLocations();" value='{{t_location.location_id}}'>-- {{t_location.locationname}} --</option>
                      </select>
                      <hr class="hrForAdministration">

                      <label style="width:100%;text-align:center;padding-left:0.5em;">Inhalt der Startseite (bevor der User eingeloggt ist)<span style="color:#e9266d">*</span></label>
                      <br>
                      <htmleditor-component [value]="getUniversalContent('START')" [pictures]="getUniversalContentPictures()" (htmlcontent)="setUniversalContent('START',$event);" ></htmleditor-component>
                      <hr class="hrForAdministration">

                      <label style="width:100%;text-align:center;padding-left:0.5em;">Inhalt der Startseite (wenn der User eingeloggt ist; "Was kann ich hier machen?")<span style="color:#e9266d">*</span></label>
                      <br>
                      <htmleditor-component [value]="getUniversalContent('HOME_1')" [pictures]="getUniversalContentPictures()" (htmlcontent)="setUniversalContent('HOME_1',$event);" ></htmleditor-component>
                      <hr class="hrForAdministration">

                      <label style="width:100%;text-align:center;padding-left:0.5em;">AGB<span style="color:#e9266d">*</span></label>
                      <br>
                      <htmleditor-component [value]="getUniversalContent('TOU')" [pictures]="getUniversalContentPictures()" (htmlcontent)="setUniversalContent('TOU',$event);" ></htmleditor-component>
                      <hr class="hrForAdministration">

                      <label style="width:100%;text-align:center;padding-left:0.5em;">Datenschutzerklärung<span style="color:#e9266d">*</span></label>
                      <br>
                      <htmleditor-component [value]="getUniversalContent('PP')" [pictures]="getUniversalContentPictures()" (htmlcontent)="setUniversalContent('PP',$event);" ></htmleditor-component>
                      <hr class="hrForAdministration">

                      <label style="width:100%;text-align:center;padding-left:0.5em;">Impressum<span style="color:#e9266d">*</span></label>
                      <br>
                      <htmleditor-component [value]="getUniversalContent('IMPRESSUM')" [pictures]="getUniversalContentPictures()" (htmlcontent)="setUniversalContent('IMPRESSUM',$event);" ></htmleditor-component>

                      <button (click)="upsertGeneralContent();" class="button" style="margin-top:2em;">Speichere die allgemeinen Informationen</button>
                      <div style="width:100%;text-align:center;">
                        <div *ngIf="upsertGeneralContentSuccessful" style="padding: 5px;">Allgemeinen Informationen erfolgreich gespeichert!</div>
                      </div>

                  </div>

                  <div style="clear:both;"></div>
              </div>

          </div>


          <div id="cf-ad-manage-tasks" class="content-frame">

              <p class="headline headline-as-button" (click)="show_cm_tasks=show_cm_tasks?false:true;">Aufgaben</p>



              <div [hidden]="!show_cm_tasks" style="width:100%;">

                  <!-- Deleting/Editing Tasks -->
                  <div class="col-xs-12 col-sm-4 col-sm-offset-1 adm-frame">

                      <p class="headline">Organisiere bestehende Aufgaben</p>

                          <div *ngFor="let t_task of getTasks(); let i = index;" class="cf-ad-manage-tasks-task" style="width: 100%;color: #fff;margin-bottom:0.1em;">
                              <div  class="cf-ad-manage-tasks-task-head" style="cursor:pointer;background:rgb(230,230,230);">
                                  <button (click)="setTaskDeleteTask(t_task.task_id)" class="delete-task-button fa fa-minus" title="Lösche diese Aufgabe" style="padding:0.1em 0.2em;font-size:1.3em;float:right;cursor:pointer;margin-left:0.5em;"></button>
                                  <button (click)="setTaskActiveInactive(getTasks()[i])" [class.active]="t_task.is_task_active=='1'" [class.inactive]="t_task.is_task_active!='1'" class="set-task-active-inactive-button fa fa-circle" title="Setze die Aufgabe aktiv/inaktiv" style="padding:0.1em 0.2em;font-size:1.3em;float:right;cursor:pointer;margin-left:0.5em;"></button>
                                  <button (click)="t_task.showhelper_edit_open = t_task.showhelper_edit_open?false:true;" [class.button-pressed]="t_task.showhelper_edit_open" class="fa fa-edit" title="Bearbeite die Aufgabe" style="padding:0.1em 0.2em;font-size:1.3em;float:right;cursor:pointer;margin-left:0.5em;"></button>
                                  <button [hidden]="t_task.task_type_id != 6" (click)="t_task.showhelper_information_open = t_task.showhelper_information_open?false:true; t_task.showhelper_information_open?showCanvasForTask(t_task.task_id,t_task.json_task_data.loc):'';" [class.button-pressed]="t_task.showhelper_information_open" class="fa fa-info" title="Zeige weitere Informationen" style="padding:0.1em 0.5em;font-size:1.3em;float:right;cursor:pointer;margin-left:0.5em;"></button>
                                  <p style="margin:0;padding:0.3em;font-size:1.2em;font-weight:bold;">
                                    {{t_task.de_DE?.taskname}}
                                  </p>
                                  <div style="clear:both;margin:0;height:0;"></div>
                              </div>

                              <div *ngIf="t_task.showhelper_edit_open" class="cf-ad-manage-tasks-task-edit">

                                  <edittask-component [user]="user" [universalcontent]="universalcontent" [taskdata]="t_task" [locationsdata]="getLocations()" [tasktypesdata]="getTaskTypes()" (taskdataoutput)="getTasks()[i]=$event;" (reload)="reload.emit(true);"></edittask-component>

                                  <button (click)="upsertTask(t_task)" class="button" style="margin-top:2em;">Speichere jetzt die Änderungen</button>
                                  <div style="width:100%;text-align:center;">
                                    <div *ngIf="t_task.upsert_successful" style="padding: 5px;">Aufgabe erfolgreich geändert!</div>
                                  </div>
                              </div>

                              <div [hidden]="!t_task.showhelper_information_open" class="cf-ad-manage-tasks-task-show-information">
                                  <br>
                                  <label style="width:100%;text-align:center;padding-left:0.5em;">Nutze diesen QR Code, um den Usern die Möglichkeit zu geben die Aufgabe direkt durch Scannen des QR Codes zu lösen:</label>
                                  <br>
                                  <div style="width:200px;height:250px;margin:0!important;margin-right:auto!important;margin-left:auto!important;margin-top:0.3em!important;margin-bottom:0.5em!important;">
                                      <canvas [id]="'qrcode-task-img'+t_task.task_id" height="200" width="200"></canvas>
                                  </div>
                              </div>

                          </div>

                  </div>

                  <!-- Adding Tasks -->
                  <div class="col-xs-12 col-sm-4 col-sm-offset-2 adm-frame">

                      <p class="headline">Füge eine neue Aufgabe hinzu</p>

                      <edittask-component [user]="user" [universalcontent]="universalcontent" [taskdata]="new_task" [locationsdata]="getLocations()" [tasktypesdata]="getTaskTypes()" (taskdataoutput)="new_task=$event;" (reload)="reload.emit(true);"></edittask-component>

                      <button (click)="upsertTask(new_task)" class="button" style="margin-top:2em;">Füge die Aufgabe jetzt hinzu</button>
                      <div style="width:100%;text-align:center;">
                        <div *ngIf="upsertNewTaskSuccessful" style="padding: 5px;">Aufgabe erfolgreich hinzugefügt!</div>
                      </div>

                  </div>

                  <div style="clear:both;"></div>
              </div>


          </div>

          <div id="cf-ad-manage-badges" class="content-frame">

              <p class="headline headline-as-button" (click)="show_cm_badges=show_cm_badges?false:true;">Abzeichen</p>



              <div [hidden]="!show_cm_badges" style="width:100%;">

                  <!-- Deleting/Editing Badges -->
                  <div class="col-xs-12 col-sm-4 col-sm-offset-1 adm-frame">

                      <p class="headline">Organisiere bestehende Abzeichen</p>

                      <div *ngFor="let t_badge of getBadges(); let i = index;" class="cf-ad-manage-badges-badge" style="width: 100%;color: #fff;margin-bottom:0.1em;">
                          <div  class="cf-ad-manage-badges-badge-head" style="cursor:pointer;background:rgb(230,230,230);">
                              <button (click)="setBadgeDeleteBadge(t_badge.badge_id)" class="delete-badge-button fa fa-minus" title="Lösche dieses Abzeichen" style="padding:0.1em 0.2em;font-size:1.3em;float:right;cursor:pointer;margin-left:0.5em;"></button>
                              <button (click)="setBadgeActiveInactive(getBadges()[i])" [class.active]="t_badge.is_active=='1'" [class.inactive]="t_badge.is_active!='1'" class="set-badge-active-inactive-button fa fa-circle" title="Setze dieses Abzeichen aktiv/inaktiv" style="padding:0.1em 0.2em;font-size:1.3em;float:right;cursor:pointer;margin-left:0.5em;"></button>
                              <button (click)="t_badge.showhelper_edit_open = t_badge.showhelper_edit_open?false:true;" [class.button-pressed]="t_badge.showhelper_edit_open" class="fa fa-edit" title="Bearbeite das Abzeichen" style="padding:0.1em 0.2em;font-size:1.3em;float:right;cursor:pointer;margin-left:0.5em;"></button>
                              <p style="margin:0;padding:0.3em;font-size:1.2em;font-weight:bold;">
                                  {{t_badge.de_DE?.badgename}}
                              </p>
                              <div style="clear:both;margin:0;height:0;"></div>
                          </div>
                          <div *ngIf="t_badge.showhelper_edit_open" class="cf-ad-manage-badges-badge-edit-description">

                              <editbadge-component [user]="user" [universalcontent]="universalcontent" [badgedata]="t_badge" [alltasksdata]="getTasks()" (badgedataoutput)="getBadges()[i]=$event;" (reload)="reload.emit(true);"></editbadge-component>

                              <button (click)="upsertBadge(t_badge)" class="edit-badge-button button" style="margin-top:2em;">Speichere jetzt die Änderungen</button>
                              <div style="width:100%;text-align:center;">
                                <div *ngIf="t_badge.upsert_successful" style="padding: 5px;">Abzeichen erfolgreich geändert!</div>
                              </div>
                          </div>
                      </div>

                  </div>

                  <!-- Adding Badges -->
                  <div class="col-xs-12 col-sm-4 col-sm-offset-2 adm-frame">

                      <p class="headline">Füge ein neues Abzeichen hinzu</p>

                      <editbadge-component [user]="user" [universalcontent]="universalcontent" [badgedata]="new_badge" [alltasksdata]="getTasks()" (badgedataoutput)="new_badge=$event;" (reload)="reload.emit(true);"></editbadge-component>

                      <button (click)="upsertBadge(new_badge)" class="button" style="margin-top:2em;">Füge das Abzeichen jetzt hinzu</button>
                      <div style="width:100%;text-align:center;">
                        <div *ngIf="upsertNewBadgeSuccessful" style="padding: 5px;">Abzeichen erfolgreich hinzugefügt!</div>
                      </div>
                  </div>

                  <div style="clear:both;"></div>
              </div>

          </div>

          <div id="cf-ad-manage-quests" class="content-frame">

              <p class="headline headline-as-button" (click)="show_cm_quests=show_cm_quests?false:true;">Quests</p>

              <div [hidden]="!show_cm_quests" style="width:100%;">

                  <!-- Deleting/Editing Quests -->
                  <div class="col-xs-12 col-sm-4 col-sm-offset-1 adm-frame">

                      <p class="headline">Organisiere bestehende Quests</p>

                      <div *ngFor="let t_quest of getQuests(); let i = index;" class="cf-ad-manage-quests-quest" style="width: 100%;color: #fff;margin-bottom:0.1em;">
                          <div  class="cf-ad-manage-quests-quest-head" style="cursor:pointer;background:rgb(230,230,230);">
                              <button (click)="setQuestDeleteQuest(t_quest.quest_id)" class="delete-quest-button fa fa-minus"  title="Lösche diesen Quest" style="padding:0.1em 0.2em;font-size:1.3em;float:right;cursor:pointer;margin-left:0.5em;"></button>
                              <button (click)="setQuestActiveInactive(getQuests()[i])" [class.active]="t_quest.is_active=='1'" [class.inactive]="t_quest.is_active!='1'" class="set-quest-active-inactive-button fa fa-circle" title="Setze diesen Quest aktiv/inaktiv" style="padding:0.1em 0.2em;font-size:1.3em;float:right;cursor:pointer;margin-left:0.5em;"></button>
                              <button (click)="t_quest.showhelper_edit_open = t_quest.showhelper_edit_open?false:true;" [class.button-pressed]="t_quest.showhelper_edit_open" class="fa fa-edit" title="Bearbeite den Quest" style="padding:0.1em 0.2em;font-size:1.3em;float:right;cursor:pointer;margin-left:0.5em;"></button>
                              <p style="margin:0;padding:0.3em;font-size:1.2em;font-weight:bold;">
                                  {{t_quest.de_DE?.questname}}
                              </p>
                              <div style="clear:both;margin:0;height:0;"></div>
                          </div>
                          <div *ngIf="t_quest.showhelper_edit_open" class="cf-ad-manage-quests-quest-edit-description">

                              <editquest-component [user]="user" [universalcontent]="universalcontent" [questdata]="t_quest" [allquestsdata]="getQuests()" [alltasksdata]="getTasks()" [locationsdata]="getLocations()" (questdataoutput)="getQuests()[i]=$event;" (reload)="reload.emit(true);"></editquest-component>

                              <button (click)="upsertQuest(t_quest)" class="edit-quest-button button" style="margin-top:2em;">Speichere jetzt die Änderungen</button>
                              <div style="width:100%;text-align:center;">
                                <div *ngIf="t_quest.upsert_successful" style="padding: 5px;">Quest erfolgreich geändert!</div>
                              </div>

                          </div>
                      </div>


                  </div>

                  <!-- Adding Quests -->
                  <div class="col-xs-12 col-sm-4 col-sm-offset-2 adm-frame">

                      <p class="headline">Füge einen neuen Quest hinzu</p>

                      <editquest-component [user]="user" [universalcontent]="universalcontent" [questdata]="new_quest" [allquestsdata]="getQuests()" [alltasksdata]="getTasks()" [locationsdata]="getLocations()" (questdataoutput)="new_quest=$event;" (reload)="reload.emit(true);"></editquest-component>

                      <button (click)="upsertQuest(new_quest)" class="button" style="margin-top:2em;">Füge den neuen Quest jetzt hinzu</button>
                      <div style="width:100%;text-align:center;">
                        <div *ngIf="upsertNewQuestSuccessful" style="padding: 5px;">Quest erfolgreich hinzugefügt!</div>
                      </div>

                  </div>

                  <div style="clear:both;"></div>
              </div>

          </div>


          <div class="content-frame">

              <p class="headline headline-as-button" (click)="show_cm_locations=show_cm_locations?false:true;">Orte</p>



              <div [hidden]="!show_cm_locations" style="width:100%;">

                  <!-- Deleting/Getting QR Code Location -->
                  <div class="col-xs-12 col-sm-4 col-sm-offset-1 adm-frame">

                      <p class="headline">Orte</p>

                      <div *ngFor="let t_location of getLocations()" class="cf-ad-manage-locations-setted-location" style="width: 100%;color: #fff;margin-bottom:0.1em;">
                          <div  class="cf-ad-manage-locations-setted-location-head" style="cursor:pointer;background:rgb(230,230,230);">
                              <button (click)="setLocationDeleteLocation(t_location.location_id);" class="delete-location-button fa fa-minus" title="Lösche diesen Ort" style="padding:0.1em 0.2em;font-size:1.3em;float:right;cursor:pointer;margin-left:0.5em;"></button>
                              <button (click)="t_location.showhelper_information_open = t_location.showhelper_information_open?false:true; t_location.showhelper_information_open?showCanvasForLocation(t_location.location_id):'';" [class.button-pressed]="t_location.showhelper_information_open" class="fa fa-info" title="Zeige weitere Informationen bzgl. diesem Ort" style="padding:0.1em 0.5em;font-size:1.3em;float:right;cursor:pointer;margin-left:0.5em;"></button>
                              <p style="margin:0;padding:0.3em;font-size:1.2em;font-weight:bold;">
                                  {{t_location.locationname}}<br>
                                  {{"Lat: "+t_location.geo_lati}}<br>
                                  {{"Long: "+t_location.geo_long}}<br>
                                  {{"Radius: "+t_location.geo_radius+"m"}}
                              </p>
                              <div style="clear:both;margin:0;height:0;"></div>
                              <div [hidden]="!t_location.showhelper_information_open" class="cf-ad-manage-locations-setted-location-description">

                                  <div style="width:200px;height:250px;margin:0!important;margin-right:auto!important;margin-left:auto!important;margin-top:1em!important;margin-bottom:1em!important;">
                                      <canvas [id]="'qrcode-location-img'+t_location.location_id" height="200" width="200"></canvas>
                                  </div>

                              </div>
                          </div>
                      </div>



                  </div>

                  <!-- Adding Location -->
                  <div class="col-xs-12 col-sm-4 col-sm-offset-2 adm-frame">

                      <p class="headline">Füge neuen Ort hinzu</p>

                      <!-- Choose Locationname[german] -->
                      <hr class="hrForAdministration">
                      <label style="width:100%;text-align:center;padding-left:0.5em;"><span class="stepHelper">1.) </span>Ortsname<span style="color:#e9266d">*</span></label>
                      <br>
                      <input [(ngModel)]="new_location.de_DE.locationname" type="text" placeholder="Ortsname" style="width:100%;">
                      <hr class="hrForAdministration">

                      <!-- Choose Latitude -->
                      <label style="width:100%;text-align:center;padding-left:0.5em;"><span class="stepHelper">2.) </span>Breitengrad [Beispiel: 10.1435]<span style="color:#e9266d">*</span></label>
                      <br>
                      <input [(ngModel)]="new_location.geo_lati" type="text" placeholder="Breitengrad" style="width:100%;">
                      <hr class="hrForAdministration">

                      <!-- Choose Longitude -->
                      <label style="width:100%;text-align:center;padding-left:0.5em;"><span class="stepHelper">3.) </span>Längengrad [Beispiel: 10.1435]<span style="color:#e9266d">*</span></label>
                      <br>
                      <input [(ngModel)]="new_location.geo_long" type="text" placeholder="Längengrad" style="width:100%;">
                      <hr class="hrForAdministration">

                      <!-- Choose Radius -->
                      <label style="width:100%;text-align:center;padding-left:0.5em;"><span class="stepHelper">4.) </span>Radius[meter]<span style="color:#e9266d">*</span></label>
                      <br>
                      <input [(ngModel)]="new_location.geo_radius" type="text" placeholder="Radius[meter]" style="width:100%;">

                      <button (click)="upsertLocation(new_location);" class="button" style="margin-top:2em;">Füge den neuen Ort jetzt hinzu</button>
                      <div style="width:100%;text-align:center;">
                        <div *ngIf="upsertNewLocationSuccessful" style="padding: 5px;">Ort erfolgreich hinzugefügt!</div>
                      </div>

                  </div>

                  <div style="clear:both;"></div>
              </div>

          </div>

          <div id="cf-ad-reverse-faculty-score" class="content-frame">

              <p class="headline headline-as-button" (click)="show_cm_reset_score=show_cm_reset_score?false:true;">Setze Fakultätshighscore zurück</p>

              <div [hidden]="!show_cm_reset_score" style="width:100%;max-width:350px;width:100%;margin-left:auto;margin-right:auto;">

                  <button (click)="resetFacultyScore();" class="button" style="margin-top:2em;margin-bottom:2em;">Setze den Fakultätshighscore jetzt zurück</button>

              </div>

          </div>


      </div>


  </div>

  <div class="row-user-management row">

      <p class="overall-headline" style="width:100%;text-align:center;">USER-MANAGEMENT</p>

      <div class="col-xs-12" style="padding:0;">

          <div *ngIf="user.user_type_id=='2'" class="content-frame">

              <p class="headline headline-as-button" (click)="show_um_add_admins=show_um_add_admins?false:true;">Füge Administratoren hinzu</p>

              <div [hidden]="!show_um_add_admins" style="width:100%;">


                  <!-- Deleting/Editing Administrators -->
                  <div class="col-xs-12 col-sm-4 col-sm-offset-1 adm-frame">

                      <p class="headline">Admins</p>

                        <div *ngFor="let t_admin of getAdmins();" class="cf-ad-admin" style="width: 100%;color: #fff;margin-bottom:0.1em;">
                            <button (click)="deleteAdmin(t_admin.user_id)" class="degrade-admin-button fa fa-minus" title="Lösche diesen Admin" style="padding:0.1em 0.2em;font-size:1.3em;float:right;cursor:pointer;"></button>
                            <p style="margin:0;padding:0.3em;font-size:1.2em;font-weight:bold;">
                                {{t_admin.username}}
                            </p>
                            <div style="clear:both;margin:0;height:0;"></div>
                        </div>

                        <div *ngFor="let t_admin of getSuperadmins();" class="cf-ad-admin" style="width: 100%;color: #fff;margin-bottom:0.1em;">
                            <p style="margin:0;padding:0.3em;font-size:1.2em;font-weight:bold;">
                                {{'Superadmin: '+t_admin.username}}
                            </p>
                            <div style="clear:both;margin:0;height:0;"></div>
                        </div>

                  </div>

                  <!-- Adding Administrators -->
                  <div class="col-xs-12 col-sm-4 col-sm-offset-2 adm-frame">

                      <p class="headline">Füge einen neuen Admin hinzu</p>

                      <div style="width:100%;">
                          <select [(ngModel)]="addAdminId"  style="width:100%;">
                            <option value='-1'>--None--</option>
                            <option *ngFor="let t_user of getAllUsers();" [hidden]="t_user.user_type_id != 0" value='{{t_user.user_id}}'>{{t_user.username}}</option>
                          </select>
                      </div>

                      <button (click)="setNewAdmin()"  class="button" style="margin-top:2em;">Füge den ausgewählten Admin jetzt hinzu</button>
                      <div style="width:100%;text-align:center;">
                        <div *ngIf="addedNewAdminSuccessful" style="padding: 5px;">Admin erfolgreich hinzugefügt!</div>
                      </div>

                  </div>

                  <div style="clear:both;"></div>
              </div>

          </div>

          <div id="cf-ad-send-mail-to-users" class="content-frame">

              <p class="headline headline-as-button" (click)="show_um_send_mail=show_um_send_mail?false:true;">Sende eine Mail an alle User</p>

              <div [hidden]="!show_um_send_mail" style="width:100%;">

                  <div class="col-xs-12 col-sm-6 col-sm-offset-3 adm-frame">

                      <hr class="hrForAdministration">
                      <label for="input-email-headline" style="width:100%;text-align:center;padding-left:0.5em;"><span class="stepHelper">1.) </span>Betreff<span style="color:#e9266d">*</span></label>
                      <br>
                      <input [(ngModel)]="send_email.headline" type="text" placeholder="Betreff" style="width:100%;"/>
                      <hr class="hrForAdministration">

                      <label for="textarea-email-message" style="width:100%;text-align:center;padding-left:0.5em;"><span class="stepHelper">2.) </span>Nachricht<span style="color:#e9266d">*</span></label>
                      <br>
                      <textarea [(ngModel)]="send_email.content" placeholder="Nachricht" style="width:100%;height:8em;resize:none;"></textarea>

                      <button (click)="sendEmailMessageToAllUsers()" class="button">
                        <span [hidden]="loading_sendemails">Sende jetzt die Nachricht(en) an alle User</span>
                        <span [hidden]="!loading_sendemails"><i class="fa fa-spinner fa-pulse"></i></span>
                      </button>
                      <div style="width:100%;text-align:center;">
                        <div *ngIf="sendEmailToAllUsersSuccessful" style="padding: 5px;">Emails erfolgreich gesendet!</div>
                      </div>

                  </div>

                  <div style="clear:both;"></div>
              </div>



          </div>


      </div>


  </div>

  `
})
export class AdministrationComponent implements OnInit {

  @Input() user:any;
  @Input() universalcontent:any;

  @Output() reload = new EventEmitter();

  specificcontent: any = {};
  loading_specificcontent: any = true;

  user_activity_task_active:any = "10d";

  upsertNewTaskSuccessful:any = false;
  upsertNewBadgeSuccessful:any = false;
  upsertNewQuestSuccessful:any = false;
  upsertNewLocationSuccessful:any = false;
  upsertGeneralContentSuccessful:any = false;
  addedNewAdminSuccessful:any = false;
  sendEmailToAllUsersSuccessful:any = false;

  loading_sendemails:any = false;

  show_c_solved_tasks_chart:any = false;
  show_cm_general:any = false;
  show_cm_tasks:any = false;
  show_cm_badges:any = false;
  show_cm_quests:any = false;
  show_cm_locations:any = false;
  show_cm_reset_score:any = false;
  show_um_add_admins:any = false;
  show_um_send_mail:any = false;

  addAdminId:any = -1;

  send_email:any = {
    headline: "",
    content: ""
  }

  new_task:any = {
  };
  new_task_template:any = {
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

  new_badge:any = {};
  new_badge_template:any = {
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


  new_quest:any = {};
  new_quest_template:any = {
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

  new_location:any = {
  };
  new_location_template:any = {
    location_id: -1,
    de_DE: {
      locationname: "",
      description_long: ""
    },
    geo_lati: "",
    geo_long: "",
    geo_radius: ""
  };


  constructor(
    private router: Router,
    private lService: LibgameService){}

  ngOnInit() {

    this.user_activity_task_active = "10d";

    this.new_task = this.new_task_template;
    this.new_quest = this.new_quest_template;
    this.new_badge = this.new_badge_template;

    this.new_location = this.new_location_template;


    //Specific Content
    this.loading_specificcontent = true;
    this.lService.specificcontent$.subscribe((specificcontent:any) => {
      console.log("Specific Content");
      console.log(specificcontent);

      if(typeof specificcontent["_Tasks"] !== 'undefined') {
        for(let t_task_key in specificcontent["_Tasks"]) {
          specificcontent["_Tasks"][t_task_key]["showhelper_information_open"] = false;
          specificcontent["_Tasks"][t_task_key]["showhelper_edit_open"] = false;
          specificcontent["_Tasks"][t_task_key]["upsert_successful"] = false;

          if(typeof specificcontent["_Tasks"][t_task_key].json_task_data !== 'undefined')
            specificcontent["_Tasks"][t_task_key].json_task_data = JSON.parse(specificcontent["_Tasks"][t_task_key].json_task_data);

          if(typeof specificcontent["_Tasks"][t_task_key].pre_tasks !== 'undefined')
            specificcontent["_Tasks"][t_task_key].pre_tasks = JSON.parse(specificcontent["_Tasks"][t_task_key].pre_tasks);
        }
      }

      if(typeof specificcontent["_Quests"] !== 'undefined') {
        for(let t_quest_key in specificcontent["_Quests"]) {
          specificcontent["_Quests"][t_quest_key]["showhelper_edit_open"] = false;
          specificcontent["_Quests"][t_quest_key]["upsert_successful"] = false;

          if(typeof specificcontent["_Quests"][t_quest_key].json_pre_quest_ids !== 'undefined')
            specificcontent["_Quests"][t_quest_key].json_pre_quest_ids = JSON.parse(specificcontent["_Quests"][t_quest_key].json_pre_quest_ids);

          if(typeof specificcontent["_Quests"][t_quest_key].json_quest_task_ids !== 'undefined')
            specificcontent["_Quests"][t_quest_key].json_quest_task_ids = JSON.parse(specificcontent["_Quests"][t_quest_key].json_quest_task_ids);
        }
      }

      if(typeof specificcontent["_Badges"] !== 'undefined') {
        for(let t_badge_key in specificcontent["_Badges"]) {
          specificcontent["_Badges"][t_badge_key]["showhelper_edit_open"] = false;
          specificcontent["_Badges"][t_badge_key]["upsert_successful"] = false;

          if(typeof specificcontent["_Badges"][t_badge_key].json_task_ids !== 'undefined')
            specificcontent["_Badges"][t_badge_key].json_task_ids = JSON.parse(specificcontent["_Badges"][t_badge_key].json_task_ids);
        }
      }

      if(typeof specificcontent["_Locations"] !== 'undefined') {
        for(let t_location_key in specificcontent["_Locations"]) {
          specificcontent["_Locations"][t_location_key]["showhelper_information_open"] = false;
        }
      }

      this.specificcontent = specificcontent;

      //Chart
      this.updateChartUserActivityTask(10,0,0,true);

      this.loading_specificcontent = false;
    });
    this.lService.loadSpecificContent('administrationcontent');
  }

  getAdmins() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['_Admins'] !== 'undefined' ? this.specificcontent['_Admins'] : [];
  }

  getAllUsers() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['_All_Users'] !== 'undefined' ? this.specificcontent['_All_Users'] : [];
  }

  getSuperadmins() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['_Superadmins'] !== 'undefined' ? this.specificcontent['_Superadmins'] : [];
  }

  getTasks() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['_Tasks'] !== 'undefined' ? this.specificcontent['_Tasks'] : [];
  }

  getQuests() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['_Quests'] !== 'undefined' ? this.specificcontent['_Quests'] : [];
  }

  getBadges() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['_Badges'] !== 'undefined' ? this.specificcontent['_Badges'] : [];
  }

  getLocations() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['_Locations'] !== 'undefined' ? this.specificcontent['_Locations'] : [];
  }

  getTaskTypes() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['_Task_Types'] !== 'undefined' ? this.specificcontent['_Task_Types'] : [];
  }

  getCountActiveQuests() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Count_Active_Quests'] !== 'undefined' ? this.specificcontent['Count_Active_Quests'] : 0;
  }

  getCountActiveTasks() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Count_Active_Tasks'] !== 'undefined' ? this.specificcontent['Count_Active_Tasks'] : 0;
  }

  getCountActiveBadges() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Count_Active_Badges'] !== 'undefined' ? this.specificcontent['Count_Active_Badges'] : 0;
  }

  getCountUsers() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Count_Users'] !== 'undefined' ? this.specificcontent['Count_Users'] : 0;
  }

  getCountUsersActiveLast2Days() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Count_Users_Active_Last_2_Days'] !== 'undefined' ? this.specificcontent['Count_Users_Active_Last_2_Days'] : 0;
  }

  getCountUsersCompletedAllQuests() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Count_Users_Completed_All_Quests'] !== 'undefined' ? this.specificcontent['Count_Users_Completed_All_Quests'] : 0;
  }

  getCountUsersCompletedAllBadges() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['Count_Users_Completed_All_Badges'] !== 'undefined' ? this.specificcontent['Count_Users_Completed_All_Badges'] : 0;
  }

  getStatistics() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['_Statistics'] !== 'undefined' ? this.specificcontent['_Statistics'] : {};
  }

  getUniversalContentPictures() {
    return !$.isEmptyObject(this.universalcontent) && typeof this.universalcontent['_Pictures'] !== 'undefined' ? this.universalcontent['_Pictures'] : [];
  }

  getUniversalContent(content_mapper:any) {
    if($.isEmptyObject(this.universalcontent) || typeof this.universalcontent['_Content'] === 'undefined') {
      return "";
    }

    let t_content = this.universalcontent['_Content'].filter((x:any) => {return x.content_mapper.toLowerCase() == content_mapper.toLowerCase();});

    if(t_content.length > 0) {
      return t_content[0].text;
    } else {
      return "";
    }

  }

  setUniversalContent(content_mapper:any, text:any) {
    if($.isEmptyObject(this.universalcontent) || typeof this.universalcontent['_Content'] === 'undefined') {
      return;
    }

    for(let key in this.universalcontent['_Content']) {
      if(this.universalcontent['_Content'][key]["content_mapper"].toLowerCase() == content_mapper.toLowerCase()) {
        this.universalcontent['_Content'][key]["text"] = text;
      }
    }
  }

  initChartWithDelay() {
     setTimeout(() => {
       this.user_activity_task_active='10d';
       this.updateChartUserActivityTask(10,0,0,false);
     },1000);
  }


  updateChartUserActivityTask(d:any,m:any,y:any,init:any)  {

      var ObjectForCalculation:any = [];
      var tempObject:any = typeof this.getStatistics()["Administration_Statistic_1"] !== 'undefined' ? JSON.parse(this.getStatistics()["Administration_Statistic_1"]["json_statistic"]) : [];
      for(var key in tempObject)
      {
          ObjectForCalculation.push({"data": tempObject[key]['data'], "ts": tempObject[key]['ts']});
      }
      var CalculatedChartDataActivityTask = this.lService.getLabelsAndDataForChart(JSON.stringify(ObjectForCalculation),d,m,y,'diff');

      var lineChartData_canvas_user_activity_task = {
            labels : $.map(CalculatedChartDataActivityTask['labels'], function(el:any) { return el; }),
            datasets : [
                  {
                        strokeColor : 'rgba(251,78,0,1)',
                        pointColor : 'rgba(251,78,0,1)',
                        pointStrokeColor : '#fff',
                        pointHighlightStroke : 'rgba(220,220,220,1)',
                        data : $.map(CalculatedChartDataActivityTask['data'], function(el:any) { return el; })
                  }
            ]

      }

      let biggestValue:any = 0;

      for(let key in CalculatedChartDataActivityTask["data"]) {
        if(CalculatedChartDataActivityTask["data"][key] > biggestValue)
          biggestValue = CalculatedChartDataActivityTask["data"][key];
      }

      var settingsObj_canvas_user_activity_task = {
          animation: false,
          responsive: true,
          scaleFontColor: '#000',
          bezierCurve: false,
          datasetFill: false,
          scaleOverride: true,
          scaleSteps: 8,
          scaleStepWidth: Math.ceil(biggestValue/8)+1,
          scaleStartValue: 0,
          scaleLineColor: 'rgba(0,0,0,.6)',
          scaleGridLineColor : 'rgba(0,0,0,.2)',
          graphTitleFontSize : 18,
          graphTitleFontColor : '#000',
    }

     //updateChart(document.getElementById('canvas_user_activity_task').getContext('2d'),lineChartData_canvas_user_activity_task,settingsObj_canvas_user_activity_task,false,false);

     if(typeof init === 'undefined' || init == false) {
       let t_canvas = <HTMLCanvasElement>document.getElementById('canvas_user_activity_task');
       updateChart(t_canvas.getContext('2d'),lineChartData_canvas_user_activity_task,settingsObj_canvas_user_activity_task,false,false);
     } else {
       $('#canvas_user_activity_task').attr('width', $('#canvas_user_activity_task').parent().width());
       let t_canvas = <HTMLCanvasElement>document.getElementById('canvas_user_activity_task');
       new Chart(t_canvas.getContext('2d')).Line(lineChartData_canvas_user_activity_task, settingsObj_canvas_user_activity_task);
     }
  }

  showCanvasForTask(task_id:any, location_id:any) {

    $("#qrcode-task-img"+task_id).qrcode({
        "width": 100,
        "height": 100,
        "background": '#fff',
        "fill": '#000',
        "text": this.lService.getSolveLinkForLocationTask(task_id,location_id)
    });
  }

  showCanvasForLocation(location_id:any) {
   $("#qrcode-location-img"+location_id).qrcode({
       "width": 100,
       "height": 100,
       "background": '#fff',
       "fill": '#000',
       "text": this.lService.getLocationFoundLink(location_id)
   });
  }


  //Communication with Server
  upsertGeneralContent() {

    let t_generalcontent:any = {
      HOME_1: this.getUniversalContent("HOME_1"),
      MAIN_PICTURE_ID: this.getUniversalContent("MAIN_PICTURE_ID"),
      ROOT_LOCATION: this.getUniversalContent("ROOT_LOCATION"),
      START: this.getUniversalContent("START"),
      TOU: this.getUniversalContent("TOU"),
      PP: this.getUniversalContent("PP"),
      IMPRESSUM: this.getUniversalContent("IMPRESSUM")
    }

    this.lService.upsertGeneralContent(t_generalcontent).subscribe((data:any) => {
      if(typeof data.result !== 'undefined' && data.result == true) {
        this.upsertGeneralContentSuccessful = true;
        setTimeout(() => {this.upsertGeneralContentSuccessful = false;}, 8000);
        this.lService.loadSpecificContent('administrationcontent');
      } else {
        window.alert("Bitte lass die Seite neuladen und überprüfe deine Eingaben!");
      }
    }, (error:any) => {
      window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
    });

  }

  upsertTask(taskdata:any) {
    console.log(taskdata);

    //Taskname
    if(typeof taskdata.de_DE.taskname === 'undefined' || taskdata.de_DE.taskname.length == 0) {
      window.alert("Bitte wähle einen geeigneten Aufgabennamen!");
      return;
    }

    //Description
    if(typeof taskdata.de_DE.description_long === 'undefined' || taskdata.de_DE.description_long.length == 0) {
      window.alert("Bitte wähle eine Aufgabenbeschreibung!");
      return;
    }

    //Solved Description
    if(typeof taskdata.de_DE.solved_description === 'undefined' || taskdata.de_DE.solved_description.length == 0) {
      window.alert("Bitte gib eine Meldung für den User ein, welche er erhält, wenn er die Aufgabe erfolgreich gelöst hat!");
      return;
    }

    //score_rule
    if(typeof taskdata.score_rule === 'undefined' || taskdata.score_rule.length == 0 || !this.isNumeric(taskdata.score_rule)) {
      window.alert("Bitte wähle die Exp. für die Aufgabe bzw. überprüfe, ob es sich um eine Zahl handelt!");
      return;
    }

    //Task Type
    if(typeof taskdata.task_type_id === 'undefined' || taskdata.task_type_id == -1) {
      window.alert("Bitte wähle vorher einen korrekten Aufgabentypen aus!");
      return;
    }

    //Task Data
    if(typeof taskdata.json_task_data === 'undefined') {
      window.alert("Es ist ein schwerwiegender Fehler aufgetreten. Bitte lass die Seite neuladen und versuche es erneut!");
      return;
    }

    //Task Type Dependend
    if(taskdata.task_type_id == 1) {
      if(typeof taskdata.json_task_data.de_DE === 'undefined' || typeof taskdata.json_task_data.de_DE.question === 'undefined' || taskdata.json_task_data.de_DE.question.length == 0) {
        window.alert("Bitte gib eine Frage ein!");
        return;
      } else if(typeof taskdata.json_task_data.de_DE === 'undefined' || typeof taskdata.json_task_data.de_DE.a1 === 'undefined' || taskdata.json_task_data.de_DE.a1.length == 0) {
        window.alert("Bitte gib zu deiner Frage die richtige Antwort ein!");
        return;
      } else if(typeof taskdata.json_task_data.de_DE === 'undefined' || typeof taskdata.json_task_data.de_DE.a2 === 'undefined' || taskdata.json_task_data.de_DE.a2.length == 0) {
        window.alert("Bitte überprüfe deine falschen Antworten!");
        return;
      } else if(typeof taskdata.json_task_data.de_DE === 'undefined' || typeof taskdata.json_task_data.de_DE.a3 === 'undefined' || taskdata.json_task_data.de_DE.a3.length == 0) {
        window.alert("Bitte überprüfe deine falschen Antworten!");
        return;
      } else if(typeof taskdata.json_task_data.de_DE === 'undefined' || typeof taskdata.json_task_data.de_DE.a4 === 'undefined' || taskdata.json_task_data.de_DE.a4.length == 0) {
        window.alert("Bitte überprüfe deine falschen Antworten!");
        return;
      }
    }
    else if(taskdata.task_type_id == 2)
    {
      if(typeof taskdata.json_task_data.loc === 'undefined' || taskdata.json_task_data.loc == -1) {
        window.alert("Bitte überprüfe den aufgabenspezifischen Ort!");
        return;
      }
    }
    else if(taskdata.task_type_id == 3)
    {
      if(typeof taskdata.json_task_data.isbn === 'undefined' || taskdata.json_task_data.isbn.length == 0) {
        window.alert("Bitte überprüfe die ISBN zu deiner Aufgabe nochmals!");
        return;
      }
    }
    else if(taskdata.task_type_id == 4)
    {
      if(typeof taskdata.json_task_data.de_DE === 'undefined' || typeof taskdata.json_task_data.de_DE.s1 === 'undefined' || taskdata.json_task_data.de_DE.s1.length == 0) {
        window.alert("Bitte überprüfe deine Eingabe zur 1.Quelle!");
        return;
      } else if(typeof taskdata.json_task_data.de_DE === 'undefined' || typeof taskdata.json_task_data.de_DE.s2 === 'undefined' || taskdata.json_task_data.de_DE.s2.length == 0) {
        window.alert("Bitte überprüfe deine Eingabe zur 2.Quelle!");
        return;
      } else if(typeof taskdata.json_task_data.de_DE === 'undefined' || typeof taskdata.json_task_data.de_DE.s3 === 'undefined' || taskdata.json_task_data.de_DE.s3.length == 0) {
        window.alert("Bitte überprüfe deine Eingabe zur 3.Quelle!");
        return;
      }
    }
    else if(taskdata.task_type_id == 5)
    {
      if(typeof taskdata.json_task_data.de_DE === 'undefined' || typeof taskdata.json_task_data.de_DE.text === 'undefined' || taskdata.json_task_data.de_DE.text.length == 0) {
        window.alert("Bitte überprüfe die Eingabe zum Lückentext!");
        return;
      } else if(typeof taskdata.json_task_data.de_DE === 'undefined' || typeof taskdata.json_task_data.de_DE.answer === 'undefined' || taskdata.json_task_data.de_DE.answer.length == 0) {
        window.alert("Bitte überprüfe die Eingabe zur Antwort bei deiner Lückentext-Aufgabe!");
        return;
      }
    }
    else if(taskdata.task_type_id == 6)
    {
    }
    else
    {
      window.alert("Bitte wähle vorher einen korrekten Aufgabentypen aus!");
      return;
    }

    if(typeof taskdata.task_id !== 'undefined' && taskdata.task_id == -1) {
      this.lService.upsertTask(taskdata).subscribe((data:any) => {
        if(typeof data.result !== 'undefined' && data.result == true) {
          this.upsertNewTaskSuccessful = true;
          setTimeout(() => {this.upsertNewTaskSuccessful = false;}, 8000);
          this.new_task = this.new_task_template;
          this.lService.loadSpecificContent('administrationcontent');
        } else {
          window.alert("Bitte lass die Seite neuladen und überprüfe deine Eingaben!");
        }
      }, (error:any) => {
        window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
      });
    } else if(typeof taskdata.task_id !== 'undefined' && taskdata.task_id != -1) {
      this.lService.upsertTask(taskdata).subscribe((data:any) => {
        if(typeof data.result !== 'undefined' && data.result == true) {
          taskdata.upsert_successful = true;
          setTimeout(() => {taskdata.upsert_successful = false;}, 8000);
        } else {
          window.alert("Bitte lass die Seite neuladen und überprüfe deine Eingaben!");
        }
      }, (error:any) => {
        window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
      });
    }

    return;
  }

  upsertBadge(badgedata:any) {
    console.log(badgedata);

    //Badgename
    if(typeof badgedata.de_DE.badgename === 'undefined' || badgedata.de_DE.badgename.length == 0) {
      window.alert("Bitte wähle einen geeigneten Abzeichennamen!");
      return;
    }

    //Description
    if(typeof badgedata.de_DE.description_long === 'undefined' || badgedata.de_DE.description_long.length == 0) {
      window.alert("Bitte wähle eine Abzeichenbeschreibung!");
      return;
    }

    //Solved Description
    if(typeof badgedata.de_DE.solved_description === 'undefined' || badgedata.de_DE.solved_description.length == 0) {
      window.alert("Bitte gib eine Meldung für den User ein, welche er erhält, wenn er das Abzeichen erfolgreich gelöst hat!");
      return;
    }

    //TaskIds
    if(typeof badgedata.json_task_ids === 'undefined' || badgedata.json_task_ids.length == 0) {
      window.alert("Ein Abzeichen, für welches die Lösung keiner Aufgabe nötig ist, ist nicht möglich!");
      return;
    }

    //Picture ID
    if(typeof badgedata.picture_id === 'undefined' || badgedata.picture_id == -1) {
      window.alert("Bitte wähle ein Bild für das Abzeichen aus!");
      return;
    }

    if(typeof badgedata.badge_id !== 'undefined' && badgedata.badge_id == -1) {
      this.lService.upsertBadge(badgedata).subscribe((data:any) => {
        if(typeof data.result !== 'undefined' && data.result == true) {
          this.upsertNewBadgeSuccessful = true;
          setTimeout(() => {
            this.upsertNewBadgeSuccessful = false;

          }, 8000);
          this.new_badge = this.new_badge_template;
          this.lService.loadSpecificContent('administrationcontent');
        } else {
          window.alert("Bitte lass die Seite neuladen und überprüfe deine Eingaben!");
        }
      }, (error:any) => {
        window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
      });
    } else if(typeof badgedata.badge_id !== 'undefined' && badgedata.badge_id != -1) {
      this.lService.upsertBadge(badgedata).subscribe((data:any) => {
        if(typeof data.result !== 'undefined' && data.result == true) {
          badgedata.upsert_successful = true;
          setTimeout(() => {badgedata.upsert_successful = false;}, 8000);
        } else {
          window.alert("Bitte lass die Seite neuladen und überprüfe deine Eingaben!");
        }
      }, (error:any) => {
        window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
      });
    }

    return;
  }

  upsertQuest(questdata:any) {
    console.log(questdata);

    //Taskname
    if(typeof questdata.de_DE.questname === 'undefined' || questdata.de_DE.questname.length == 0) {
      window.alert("Bitte wähle einen geeigneten Questnamen!");
      return;
    }

    //Solved Description
    if(typeof questdata.de_DE.solved_description === 'undefined' || questdata.de_DE.solved_description.length == 0) {
      window.alert("Bitte gib eine Meldung für den User ein, welche er erhält, wenn er den Quest erfolgreich gelöst hat!");
      return;
    }

    //score_rule
    if(typeof questdata.score_rule === 'undefined' || questdata.score_rule.length == 0 || !this.isNumeric(questdata.score_rule)) {
      window.alert("Bitte wähle die Exp. für den Quest bzw. überprüfe, ob es sich um eine Zahl handelt!");
      return;
    }

    //Usability Checks
    if( typeof questdata.location_id !== 'undefined' && questdata.location_id == -1 &&
        typeof questdata.json_pre_quest_ids !== 'undefined' && questdata.json_pre_quest_ids.length == 0 &&
        typeof questdata.is_starter_quest !== 'undefined' && questdata.is_starter_quest == '0') {
      window.alert("Vorsicht: Dieser Quest wird niemals gefunden bzw. spielbar sein, da er an keinem Ort gefunden wird, keine Vorquests hat und kein Starterquest (Quest, welche der User von Beginn an lösen kann) ist. Bitte sorge dafür, dass genau eins davon zutrifft!");
      return;
    }

    if( typeof questdata.json_pre_quest_ids !== 'undefined' && questdata.json_pre_quest_ids.length != 0 &&
        typeof questdata.is_starter_quest !== 'undefined' && questdata.is_starter_quest == '1') {
      window.alert("Vorsicht: Dieser Quest enthält einen logischen Fehler, da ein Quest mit Vorquests niemals ein Starterquest (Quest, welche der User von Beginn an lösen kann) sein kann! Bedenke, dass ein Quest mit Vorquests automatisch dem User zugeteilt wird, wenn er alle Vorquests abgeschlossen hat!");
      return;
    }

    if( typeof questdata.location_id !== 'undefined' && questdata.location_id != -1 &&
        typeof questdata.is_starter_quest !== 'undefined' && questdata.is_starter_quest == '1') {
      window.alert("Vorsicht: Dieser Quest enthält einen logischen Fehler, da ein Quest, welcher an einem Ort gefunden werden kann, niemals ein Starterquest (Quest, welche der User von Beginn an lösen kann) sein kann! Bedenke, dass ein Quest, welcher gefunden wird, nicht schon zu Beginn dem User gestellt werden kann!");
      return;
    }

    //Quest Level Task Data
    if( typeof questdata.json_quest_task_ids === 'undefined' ||  questdata.json_quest_task_ids.length == 0) {
      window.alert("Schwerwiegender interner Fehler. Bitte lass die Seite neuladen!");
      return;
    }

    for(let i=0; i < questdata.json_quest_task_ids.length; i++) {
      if(questdata.json_quest_task_ids[i].length == 0) {
        window.alert("Fehler bei den Aufgaben für Stufe "+(i+1)+": Keine Aufgaben ausgewählt!");
        return;
      }
    }


    if(typeof questdata.quest_id !== 'undefined' && questdata.quest_id == -1) {
      this.lService.upsertQuest(questdata).subscribe((data:any) => {
        if(typeof data.result !== 'undefined' && data.result == true) {
          this.upsertNewQuestSuccessful = true;
          setTimeout(() => {this.upsertNewQuestSuccessful = false;}, 8000);
          this.new_quest = this.new_quest_template;
          this.lService.loadSpecificContent('administrationcontent');
        } else {
          window.alert("Bitte lass die Seite neuladen und überprüfe deine Eingaben!");
        }
      }, (error:any) => {
        window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
      });
    } else if(typeof questdata.quest_id !== 'undefined' && questdata.quest_id != -1) {
      this.lService.upsertQuest(questdata).subscribe((data:any) => {
        if(typeof data.result !== 'undefined' && data.result == true) {
          questdata.upsert_successful = true;
          setTimeout(() => {questdata.upsert_successful = false;}, 8000);
        } else {
          window.alert("Bitte lass die Seite neuladen und überprüfe deine Eingaben!");
        }
      }, (error:any) => {
        window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
      });
    }

    return;
  }

  upsertLocation(locationdata:any) {
    console.log(locationdata);

    //locationname
    if(typeof locationdata.de_DE.locationname === 'undefined' || locationdata.de_DE.locationname.length == 0) {
      window.alert("Bitte wähle einen geeigneten Ortsnamen!");
      return;
    }

    //Lati
    if(typeof locationdata.geo_lati === 'undefined' || locationdata.geo_lati.length == 0 || !this.isNumeric(locationdata.geo_lati)) {
      window.alert("Bitte gib einen korrekten Breitengrad ein!");
      return;
    }

    //Long
    if(typeof locationdata.geo_long === 'undefined' || locationdata.geo_long.length == 0 || !this.isNumeric(locationdata.geo_long)) {
      window.alert("Bitte gib einen korrekten Längengrad ein!");
      return;
    }

    //Long
    if(typeof locationdata.geo_radius === 'undefined' || locationdata.geo_radius.length == 0 || !this.isNumeric(locationdata.geo_radius)) {
      window.alert("Bitte gib einen korrekten Radius ein!");
      return;
    }

    if(typeof locationdata.location_id !== 'undefined' && locationdata.location_id == -1) {
      this.lService.upsertLocation(locationdata).subscribe((data:any) => {
        if(typeof data.result !== 'undefined' && data.result == true) {
          this.upsertNewLocationSuccessful = true;
          setTimeout(() => {this.upsertNewLocationSuccessful = false;}, 8000);
          this.new_location = this.new_location_template;
          this.lService.loadSpecificContent('administrationcontent');
        } else {
          window.alert("Bitte lass die Seite neuladen und überprüfe deine Eingaben!");
        }
      }, (error:any) => {
        window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
      });
    }

    return;
  }

  resetFacultyScore() {
    if (confirm("Soll jetzt der Fakultätshighscore zurückgesetzt werden?") == true) {
        this.lService.resetFacultyScore().subscribe((data:any) => {
          if(typeof data.result !== 'undefined' && data.result == true) {
            window.alert("Der Fakultätshighscore wurde erfolgreich zurückgesetzt!");
          } else {
            window.alert("Bitte lass die Seite neuladen und überprüfe deine Eingaben!");
          }
        }, (error:any) => {
          window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
        });
    }
  }

  deleteAdmin(user_id:any) {
    //TODO
  }

  setNewAdmin() {

    if(typeof this.addAdminId === 'undefined' || this.addAdminId == -1) {
      window.alert("Bitte wähle zuerst einen User aus!");
      return;
    }

    this.lService.setNewAdmin(this.addAdminId).subscribe((data:any) => {
      if(typeof data.result !== 'undefined' && data.result == true) {
        this.addedNewAdminSuccessful = true;
        setTimeout(() => {this.addedNewAdminSuccessful = false;}, 8000);
        this.addAdminId = -1;
        this.lService.loadSpecificContent('administrationcontent');
      } else {
        window.alert("Bitte lass die Seite neuladen und überprüfe deine Eingaben!");
      }
    }, (error:any) => {
      window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
    });

  }

  setTaskActiveInactive(taskdata:any) {
    console.log(taskdata);
    taskdata.is_task_active = taskdata.is_task_active=="1"?"0":"1";

    this.lService.upsertTask(taskdata).subscribe((data:any) => {
      if(typeof data.result !== 'undefined' && data.result == true) {
      } else {
        window.alert("Es ist ein Fehler aufgetreten. Bitte lass die Seite neuladen!");
      }
    }, (error:any) => {
      window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
    });
  }

  setTaskDeleteTask(task_id:any) {
    if (confirm("Soll die Aufgabe jetzt gelöscht werden?") == true) {
      this.lService.deleteTask(task_id).subscribe((data:any) => {
        if(typeof data.result !== 'undefined' && data.result == true) {
          this.lService.loadSpecificContent('administrationcontent');
        } else {
          window.alert("Es ist ein Fehler aufgetreten. Bitte lass die Seite neuladen!");
        }
      }, (error:any) => {
        window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
      });
    }
  }

  setBadgeActiveInactive(badgedata:any) {

    console.log(badgedata);
    badgedata.is_active = badgedata.is_active=="1"?"0":"1";

    this.lService.upsertBadge(badgedata).subscribe((data:any) => {
      if(typeof data.result !== 'undefined' && data.result == true) {
      } else {
        window.alert("Es ist ein Fehler aufgetreten. Bitte lass die Seite neuladen!");
      }
    }, (error:any) => {
      window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
    });

  }

  setBadgeDeleteBadge(badge_id:any) {
    if (confirm("Soll das Abzeichen jetzt gelöscht werden?") == true) {
      this.lService.deleteBadge(badge_id).subscribe((data:any) => {
        if(typeof data.result !== 'undefined' && data.result == true) {
          this.lService.loadSpecificContent('administrationcontent');
        } else {
          window.alert("Es ist ein Fehler aufgetreten. Bitte lass die Seite neuladen!");
        }
      }, (error:any) => {
        window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
      });
    }
  }

  setQuestActiveInactive(questdata:any) {

    console.log(questdata);
    questdata.is_active = questdata.is_active=="1"?"0":"1";

    this.lService.upsertQuest(questdata).subscribe((data:any) => {
      if(typeof data.result !== 'undefined' && data.result == true) {
      } else {
        window.alert("Es ist ein Fehler aufgetreten. Bitte lass die Seite neuladen!");
      }
    }, (error:any) => {
      window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
    });

  }

  setQuestDeleteQuest(quest_id:any) {
    if (confirm("Soll der Quest jetzt gelöscht werden?") == true) {
      this.lService.deleteQuest(quest_id).subscribe((data:any) => {
        if(typeof data.result !== 'undefined' && data.result == true) {
          this.lService.loadSpecificContent('administrationcontent');
        } else {
          window.alert("Es ist ein Fehler aufgetreten. Bitte lass die Seite neuladen!");
        }
      }, (error:any) => {
        window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
      });
    }
  }

  setLocationDeleteLocation(location_id:any) {
    if (confirm("Soll der Ort jetzt gelöscht werden?") == true) {
      this.lService.deleteLocation(location_id).subscribe((data:any) => {
        if(typeof data.result !== 'undefined' && data.result == true) {
          this.lService.loadSpecificContent('administrationcontent');
        } else {
          window.alert("Es ist ein Fehler aufgetreten. Bitte lass die Seite neuladen!");
        }
      }, (error:any) => {
        window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
      });
    }
  }

  sendEmailMessageToAllUsers() {

    if(this.loading_sendemails == true) {
      return;
    }

    if(typeof this.send_email.headline === 'undefined' || this.send_email.headline.length == 0) {
      window.alert("Bitte gib zuerst einen Betreff ein!");
      return;
    }

    if(typeof this.send_email.content === 'undefined' || this.send_email.content.length == 0) {
      window.alert("Bitte gib zuerst eine Nachricht ein!");
      return;
    }

    this.loading_sendemails = true;

    this.lService.sendEmailMessageToAllUsers(this.send_email).subscribe((data:any) => {
      if(typeof data.result !== 'undefined' && data.result == true) {
        this.sendEmailToAllUsersSuccessful = true;
        setTimeout(() => {this.sendEmailToAllUsersSuccessful = false;},5000);
        this.send_email.content = "";
        this.send_email.headline = "";
      } else {
        window.alert("Es ist ein Fehler aufgetreten. Bitte lass die Seite neuladen!");
      }
      this.loading_sendemails = false;
    }, (error:any) => {
      window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
      this.loading_sendemails = false;
    });

  }


  //Helper
  isNumeric(value:any) {
    return typeof value !== 'undefined' && !isNaN(parseFloat(value));
  }

  sendToConsole(value:any) {
    console.log(value);
  }


}
