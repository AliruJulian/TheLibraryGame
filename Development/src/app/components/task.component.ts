import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, Params } from '@angular/router';
import { LibgameService } from './../services/libgame.service';

declare var $:any;
declare var JOB:any;
declare var window:any;

@Component({
  selector: 'task-component',
  providers: [LibgameService],
  template: `

  <div class="row">

    <div class="col-xs-12" style="padding:0;">

        <div *ngIf="getIsTaskBlocked()" class="content-frame">

            <div class="content-task-frame" style="margin:0px;border-radius:0px;width:100%!important;">
                <div style="width:100%;color:rgb(0,0,0);cursor:pointer;">
                    <div style="font-size:1.5em!important;">Aufgabe: {{getTaskData().taskname}}</div>
                    <br>
                    <div id="task-description-healine" [innerHTML]="getTaskData().description_long"></div>
                    <div style="clear:both;"></div>
                </div>
            </div>

            <p class='headline' style="background:rgb(255,120,120);">
                Diese Aufgabe ist zur Zeit für dich nicht lösbar.
                <br>
                Wieder lösbar ab: {{lService.getFormatedDate(getTaskBlockedData().ts_blocked)}}
            </p>
        </div>

        <div *ngIf="getIsTaskSolvedByUser()" class="content-frame">

            <div class="content-task-frame" style="margin:0px;border-radius:0px;width:100%!important;">
                <div style="width:100%;color:rgb(0,0,0);cursor:pointer;">
                    <div style="font-size:1.5em!important;">Aufgabe: {{getTaskData().taskname}}</div>
                    <br>
                    <div id="task-description-healine" [innerHTML]="getTaskData().description_long"></div>
                    <div style="clear:both;"></div>
                </div>
            </div>

            <p class='headline' style="background:rgb(120,255,120);">
                Du hast diese Aufgabe bereits gelöst.
                <br>
                Gelöst am: {{lService.getFormatedDate(getUserTaskScore().ts_last_update)}}
            </p>
        </div>

        <div *ngIf="!getIsTaskActive()" class="content-frame" >
            <p class='headline' style="background:rgb(255,120,120);">
                Diese Aufgabe ist nicht länger aktiv!
            </p>
        </div>

        <!-- Specific Task Data -->
        <div *ngIf="!getIsTaskBlocked() && !getIsTaskSolvedByUser() && getIsTaskActive()" id="cf-tas-specification-task" class="content-frame" style="padding-bottom: 10px;">

            <div class="content-task-frame" style="margin:0px;border-radius:0px;width:100%!important;">
                <div style="width:100%;color:rgb(0,0,0);cursor:pointer;">
                    <div style="font-size:1.5em!important;">Aufgabe: {{getTaskData().taskname}}</div>
                    <br>
                    <div id="task-description-healine" [innerHTML]="getTaskData().description_long"></div>
                    <div style="clear:both;"></div>
                </div>
            </div>

            <!-- Task Type 1 -->
            <div *ngIf="getTaskData().task_type_id==1" class='cf-tas-specification-task-1 depend-on-device-table-to-none' style='width:100%;border-spacing:10px 15px;margin-top:5px;'>
                <div class='depend-on-device-tablerow-to-none' style='width:100%;'>

                    <div (click)="solveTaskType1(0)" [innerHTML]="getTaskType1Answer(0).answer" class='cf-tas-specification-task-1-answer depend-on-device-tablecell-to-none depend-on-device-none-to-inlineblock depend-on-device-fifty-to-hundred-percentage-width' style='text-align:center;vertical-align:middle;margin-bottom:0.2em;'>
                    </div>

                    <div (click)="solveTaskType1(1)" [innerHTML]="getTaskType1Answer(1).answer" class='cf-tas-specification-task-1-answer depend-on-device-tablecell-to-none depend-on-device-none-to-inlineblock depend-on-device-fifty-to-hundred-percentage-width' style='text-align:center;vertical-align:middle;margin-bottom:0.2em;color:white!important;'>
                    </div>

                </div>
                <div class='depend-on-device-tablerow-to-none' style='width:100%;'>

                    <div (click)="solveTaskType1(2)" [innerHTML]="getTaskType1Answer(2).answer" class='cf-tas-specification-task-1-answer depend-on-device-tablecell-to-none depend-on-device-none-to-inlineblock depend-on-device-fifty-to-hundred-percentage-width' style='text-align:center;vertical-align:middle;margin-bottom:0.2em;'>
                    </div>

                    <div (click)="solveTaskType1(3)" [innerHTML]="getTaskType1Answer(3).answer" class='cf-tas-specification-task-1-answer depend-on-device-tablecell-to-none depend-on-device-none-to-inlineblock depend-on-device-fifty-to-hundred-percentage-width' style='text-align:center;vertical-align:middle;margin-bottom:0.2em;'>
                    </div>

                </div>
            </div>

            <!-- Task Type 2 -->
            <div *ngIf="getTaskData().task_type_id==2" class="cf-tas-specification-task-2">

                <div id="map" style="width:100%;height:350px;text-align:center;font-size:1.5em;color:black;background:url(../public/images/kachel.png);background-repeat:repeat;">
                    Du wirst zur Zeit lokalisiert. Bitte checke, ob du deinem Browser das Recht gewährst auf deinen Standort zuzugreifen.
                </div>


                <button id="cf-tas-specification-task-2-check-in" class="button">QR Code hochladen</button>

                <div style="width:320px;margin:0!important;margin-right:auto!important;margin-left:auto!important;margin-top:1em!important;">
                    <img id="qrcode-picture-img" width="320" style="display:none;">
                </div>

                <div class="content-frame">
                    <p class='headline' style="background:rgb(120,255,120);padding-left:1em;text-align:left;">
                        <span class="fa fa-exclamation-triangle"></span> Du kannst diese Aufgabe auch durch Scannen des QR Codes an dem Ort lösen!
                    </p>
                </div>

                <div class="content-frame">
                    <p class='headline' style="background:rgb(120,255,120);padding-left:1em;text-align:left;">
                        <span class="fa fa-exclamation-triangle"></span> Das Spiel lokalisiert deine Position in einem gewissen Interval, sobald du die Webseite geöffnet hast und deine Zustimmung hierzu gegeben hast! Solltest du also in der Nähe des gesuchten Ortes sein, wirst du automatisch benachrichtigt.
                    </p>
                </div>

            </div>

            <!-- Task Type 3 -->

            <div *ngIf="getTaskData().task_type_id==3" class="cf-tas-specification-task-3" style="margin-top:30px;">
                <div style="width:320px;margin:0!important;margin-right:auto!important;margin-left:auto!important;">
                    <canvas width="320" height="240" id="task-3-picture" style="display:none;"></canvas>
                </div>
                <p id="cf-tas-specification-task-3-result-text" style="width:100%;text-align:center;margin-top:20px;"></p>
                <button onclick="$('#upload-barcode-pic').click();" class="button">Lade einen Barcode hoch!</button>
                <input id="upload-barcode-pic" type="file" accept="image/*" style="display:none;" />
            </div>


            <!-- Task Type 4 -->

            <div *ngIf="getTaskData().task_type_id==4" class="cf-tas-specification-task-4" style="padding:0 1.5em;">
                <div id="cf-tas-specification-task-source-1" style="margin-top:1em;width:100%;line-height:3em;background:green;color:rgb(0,0,0);vertical-align:middle;text-align:center;">
                    <div style="min-width:30%;float:left;color:transparent;">a</div>
                    <div class="cf-tas-specification-task-4-source" style="width:40%;float:left;">{{getTaskType4Answer(0).answer}}</div>
                    <div class="fa fa-arrow-circle-o-down" (click)="exchangeShuffleArrayPosition(0,1);" style="width:30%;float:left;cursor:pointer;line-height:3em;vertical-align:middle;"></div>
                    <div style="clear:both;"></div>
                </div>
                <div id="cf-tas-specification-task-source-2" style="margin-top:1em;width:100%;line-height:3em;background:yellow;color:rgb(0,0,0);vertical-align:middle;text-align:center;cursor:pointer;">
                    <div class="fa fa-arrow-circle-o-up" (click)="exchangeShuffleArrayPosition(0,1);" style="width:30%;float:left;cursor:pointer;line-height:3em;vertical-align:middle;"></div>
                    <div class="cf-tas-specification-task-4-source" style="width:40%;float:left;">{{getTaskType4Answer(1).answer}}</div>
                    <div class="fa fa-arrow-circle-o-down" (click)="exchangeShuffleArrayPosition(1,2);" style="width:30%;float:left;cursor:pointer;line-height:3em;vertical-align:middle;"></div>
                    <div style="clear:both;"></div>
                </div>
                <div id="cf-tas-specification-task-source-3" style="margin-top:1em;width:100%;line-height:3em;background:red;color:rgb(0,0,0);vertical-align:middle;text-align:center;cursor:pointer;">
                    <div class="fa fa-arrow-circle-o-up" (click)="exchangeShuffleArrayPosition(1,2);" style="width:30%;float:left;cursor:pointer;line-height:3em;vertical-align:middle;"></div>
                    <div class="cf-tas-specification-task-4-source" style="width:40%;float:left;">{{getTaskType4Answer(2).answer}}</div>
                    <div style="clear:both;"></div>
                </div>

                <button id="cf-tas-specification-task-4-send-button" (click)="solveTaskType4()" class="button" style="margin-top:3em;margin-bottom:0.3em;">Überprüfe jetzt meine Antwort</button>
            </div>

            <!-- Task Type 5 -->

            <div *ngIf="getTaskData().task_type_id==5" class="cf-tas-specification-task-5" style="padding:0 1.5em;">
                <div class="cf-tas-specification-task-blank-text" style="margin-top:1em;width:100%;color:rgb(0,0,0);vertical-align:middle;text-align:center;">
                    <p>{{getTaskType5TextWithoutBlankStatement().text}}</p>
                </div>
                <div class="cf-tas-specification-task-blank-input" style="margin-top:0.3em;width:100%;color:rgb(0,0,0);vertical-align:middle;text-align:center;">
                    <input type="text" [id]="'input-specification-task-blank'" placeholder="Gib hier deine Antwort ein" style="width:100%;">
                </div>

                <button id="cf-tas-specification-task-5-send-button" (click)="solveTaskType5()" class="button" style="margin-top:2em;margin-bottom:0.3em;">Überprüfe jetzt meine Antwort</button>
            </div>

            <!-- Task Type 6 -->

            <div *ngIf="getTaskData().task_type_id==6" class="cf-tas-specification-task-6">

                <div class="content-frame">
                    <p class='headline' style="background:rgb(120,255,120);padding-left:1em;text-align:left;">
                        <span class="fa fa-exclamation-triangle"></span> Da nicht alle gängigen Browser den QR Code Scan unterstützen. Muss leider ein externer QR Code Scanner auf deinem Smartphone benutzt werden, um die Aufgabe zu lösen. Folge dann dem Link in dem gescannten QR Code und du hast diese Aufgabe abgeschlossen!
                    </p>
                </div>

            </div>


        </div>

        <!-- Overview of task -->
        <div id="cf-tas-overview" class="content-frame">

            <p class="headline">Mehr Informationen zu der Aufgabe</p>



            <div style="padding:1em 1em;width:100%;max-width:30em;margin-left:auto;margin-right:auto;">


                <div style="display:table;border-spacing:0 2px;width:100%;">

                    <div style="display:table-row;width:100%;background:#eeeeee;">
                        <div style="display:table-cell;vertical-align:middle;padding:5px;padding-left:0.5em;">Erfahrung:</div>
                        <div style="display:table-cell;vertical-align:middle;padding:5px;text-align:right;">
                          +{{getTaskData().score_rule}}
                        </div>
                    </div>

                    <div style="display:table-row;width:100%;background:#eeeeee;">
                        <div style="display:table-cell;vertical-align:middle;padding:5px;padding-left:0.5em;">Dein Fortschritt:</div>
                        <div style="display:table-cell;vertical-align:middle;padding:5px;text-align:right;">{{getUserTaskScore().value}}</div>
                    </div>

                    <div style="display:table-row;width:100%;">
                        <div style="display:table-cell;vertical-align:middle;padding:5px;padding-left:0.5em;">Benötigter Fortschritt:</div>
                        <div style="display:table-cell;vertical-align:middle;padding:5px;text-align:right;">{{getTaskData().needed_value}}</div>
                    </div>

                    <div style="display:table-row;width:100%;background:#eeeeee;">
                        <div style="display:table-cell;vertical-align:middle;padding:5px;padding-left:0.5em;">Deine gesammelten Exp.:</div>
                        <div style="display:table-cell;vertical-align:middle;padding:5px;text-align:right;color:green!important;">+{{getUserTaskScore().score}}</div>
                    </div>

                    <div style="display:table-row;width:100%;">
                        <div style="display:table-cell;vertical-align:middle;padding:5px;padding-left:0.5em;">Diese Aufgabe ist Teil des folgenden Quests:</div>
                        <div style="display:table-cell;vertical-align:middle;padding:5px;text-align:right;">{{getQuestsContainingTaskId().length==0?'-':''}}</div>
                    </div>

                    <div *ngFor="let t_quest of getQuestsContainingTaskId();" [hidden]="t_quest.is_active!='1'" style="display:table-row;width:100%;">
                        <div style="display:table-cell;vertical-align:middle;padding:5px;padding-left:0.5em;">
                            <div (click)="navigateToQuest(t_quest.quest_id)" class="content-quest-frame" style="width:100%;">
                                <div style="width:100%;color:rgb(0,0,0);cursor:pointer;">
                                    <div class="depend-on-device-left-to-none-float" style="font-size:1.5em;font-weight:bold;text-decoration:underline;">Quest: {{t_quest.questname}}</div>
                                    <div class="depend-on-device-right-to-none-float" style="font-size:1.2em;margin-top:0.2em;"><span style="font-size:1.2em;font-weight:bold;">+{{t_quest.score_rule}}</span> Exp.</div>
                                    <div style="clear:both;"></div>
                                </div>
                            </div>
                        </div>
                        <div style="display:table-cell;vertical-align:middle;padding:5px;text-align:right;"></div>
                    </div>


                </div>

            </div>
            <div style="clear:both;"></div>

        </div>

    </div>



</div>

    <!-- Solved Overlay -->
    <div *ngFor="let solvedOverlayDataObject of solvedOverlayArray;let i = index;">
      <solvedoverlay-component [user]="user" [universalcontent]="universalcontent" [solveddata]="solvedOverlayDataObject" (closeOverlay)="removeFromSolvedOverlayArray(i);"></solvedoverlay-component>
    </div>

  `
})
export class TaskComponent implements OnInit {

  @Input() user:any;
  @Input() universalcontent:any;
  @Input() task_id:any;
  @Input() additionalinformation:any;

  specificcontent: any = {};
  loading_specificcontent: any = true;

  //Task Type 1
  shuffleArrayTaskType1:any = [1,2,3,4];
  shuffleArrayTaskType4:any = [1,2,3];

  //Solving Parameters
  successfullSolved:any = false;
  notSuccessfullSolved:any = false;

  //Solved Overlay
  solvedOverlayArray:any = [];

  constructor(
    private router: Router,
    private lService: LibgameService){}

  ngOnInit() {

    this.successfullSolved = false;

    //Specific Content
    this.loading_specificcontent = true;
    this.lService.specificcontent$.subscribe((specificcontent:any) => {
      console.log("Specific Content");
      console.log(specificcontent);

      if(typeof specificcontent["TASK_DATA"] !== 'undefined' && typeof specificcontent["TASK_DATA"].json_task_data !== 'undefined')
        specificcontent["TASK_DATA"].json_task_data = JSON.parse(specificcontent["TASK_DATA"].json_task_data);

      this.shuffle(this.shuffleArrayTaskType1);
      this.shuffle(this.shuffleArrayTaskType4);

      this.specificcontent = specificcontent;
      this.loading_specificcontent = false;

      if(this.getTaskData().task_type_id == "3") {
        setTimeout(() => {this.initBarcodeReader();}, 300);
      }

      if(this.getTaskData().task_type_id == "6" && this.additionalinformation.length != 0 && !isNaN(parseFloat(this.additionalinformation))) {
        this.solveTaskType6(this.additionalinformation);
      }
    });
    this.lService.loadSpecificContent('task&task_id='+this.task_id);

  }

  getTaskBlockedData() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['TASK_BLOCKED_DATA'] !== 'undefined' ? this.specificcontent['TASK_BLOCKED_DATA'] : {};
  }

  getUserTaskScore() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['USER_TASK_SCORE'] !== 'undefined' ? this.specificcontent['USER_TASK_SCORE'] : {
      value: "0",
      score: "0"
    };
  }

  getTaskData() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['TASK_DATA'] !== 'undefined' ? this.specificcontent['TASK_DATA'] : {
      task_type_id: "0",
      json_task_data: {},
      needed_value: "0",
      score_rule: "1"
    };
  }

  getQuestsContainingTaskId() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['QUESTS_CONTAINING_TASK_ID'] !== 'undefined' ? this.specificcontent['QUESTS_CONTAINING_TASK_ID'] : [];
  }

  getIsTaskBlocked() {
    return typeof this.getTaskBlockedData().ts_blocked !== 'undefined' && (this.getTaskBlockedData().ts_blocked+"").length != 0;
  }

  getIsTaskSolvedByUser() {
    return parseFloat(this.getUserTaskScore().value) >= parseFloat(this.getTaskData().needed_value);
  }

  getIsTaskActive() {
    return this.getTaskData().is_task_active == '1';
  }

  navigateToQuest(quest_id:any) {
    this.router.navigate(['/l/quest', quest_id]);
  }

  solveTaskOverall(solvedata:any, task_id:any) {
    this.lService.solveTask(solvedata, task_id).subscribe((data:any) => {
      console.log(data);
      if(typeof data.result !== 'undefined' && data.result == true && typeof data.data !== 'undefined' && typeof data.data.task_solved !== 'undefined' && data.data.task_solved == true) {
        this.successfullSolved = true;

        //Start Solved Overlay
        let t_solved_badges:any = "";
        let t_solved_quests:any = "";

        //Solved Badges
        if(typeof data.data["badges"] !== 'undefined')
        {
          for(let t_key_badges in data.data["badges"])
          {
            t_solved_badges += "-" + data.data["badges"][t_key_badges]["badgename"] + "<br />";
            this.solvedOverlayArray.push({
              type: 2,
              name: "Abzeichen erhalten",
              solved_description: "Herzlichen Glückwunsch! Du hast das Abzeichen '"+data.data["badges"][t_key_badges]["badgename"]+"' abgeschlossen.<br /><img src='"+this.lService.getPictureLink(data.data["badges"][t_key_badges]["picture_id"])+"' />"
            });
          }
        }

        //Solved Quests
        if(typeof data.data["quests"] !== 'undefined')
        {
          for(let t_key_quests in data.data["quests"])
          {
            t_solved_quests += "-" + data.data["quests"][t_key_quests]["questname"] + "<br />";
            this.solvedOverlayArray.push({
              type: 3,
              name: "Quest erfüllt",
              solved_description: "Herzlichen Glückwunsch! Du hast den Quest '"+data.data["quests"][t_key_quests]["questname"]+"' abgeschlossen.",
              score_rule: data.data["quests"][t_key_quests]["score_rule"],
              faculty_score_rule: data.data["quests"][t_key_quests]["score_rule"]
            });
          }
        }

        //Solved Tasks
        if(typeof data.data["tasks"] !== 'undefined')
        {
          for(let t_key_tasks in data.data["tasks"])
          {
            this.solvedOverlayArray.push({
              type: 1,
              name: "Aufgabe erfüllt",
              solved_description: "Herzlichen Glückwunsch! Du hast die Aufgabe '"+data.data["tasks"][t_key_tasks]["taskname"]+"' abgeschlossen.",
              score_rule: data.data["tasks"][t_key_tasks]["score_rule"],
              faculty_score_rule: data.data["tasks"][t_key_tasks]["score_rule"],
              solved_quests: t_solved_quests,
              solved_badges: t_solved_badges
            });
          }
        }

        //End Solved Overlay

        //Reload Data
        this.lService.loadSpecificContent('task&task_id='+this.task_id);

      } else {
        window.alert("Leider hast du die Aufgabe nicht erfolgreich gelöst! Bitte versuche es erneut!");
      }
    }, (error:any) => {
      window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
    });
  }

  //Task Type 1
  getTaskType1Answer(id:any) {
    if(typeof this.user.language === 'undefined' || this.user.language.length == 0 || $.isEmptyObject(this.getTaskData().json_task_data))
      return {id: "", answer: ""};

    return {id: "a"+this.shuffleArrayTaskType1[id], answer: this.getTaskData().json_task_data[this.user.language]["a"+this.shuffleArrayTaskType1[id]]};
  }

  solveTaskType1(id:any) {

    let solvedata = JSON.stringify({chosenanswer: this.getTaskType1Answer(id).id});
    this.solveTaskOverall(solvedata, this.task_id);

  }

  //Task Type 2 -- Locationsearch
  solveTaskType2(id:any) {

  }

  //Task Type 3
  solveTaskType3(isbn:any) {

    let solvedata = JSON.stringify({"isbn": isbn});
    this.solveTaskOverall(solvedata, this.task_id);

  }

  initBarcodeReader() {

    var takePicture:any = document.querySelector("#upload-barcode-pic");
    var showPicture:any = document.createElement("img");
    var Result:any = document.querySelector("#cf-tas-specification-task-3-result-text");
    var canvas = <HTMLCanvasElement>document.getElementById("task-3-picture");
    var ctx:any = canvas.getContext("2d");
    JOB.Init();
    JOB.SetImageCallback((result:any) => {
          if(result.length > 0){
                var tempArray:any[] = [];
                for(var i = 0; i < result.length; i++) {
                      tempArray.push("Gefundene ISBN : "+result[i].Value);
                }
                Result.innerHTML=tempArray.join("<br />");

                //Wert ist in result[0].Value enthalten
                //Sende die Daten hier noch
                this.solveTaskType3(result[0].Value+"");

          } else {

                if(result.length === 0)
                {
                      Result.innerHTML="Dekodieren ist leider fehlgeschlagen. Bitte versuche es mit einem Bild von besserer Qualität!";
                }
          }
    });
    JOB.PostOrientation = true;
    JOB.OrientationCallback = (result:any) => {
          canvas.width = result.width;
          canvas.height = result.height;
          var data = ctx.getImageData(0,0,canvas.width,canvas.height);
          for(var i = 0; i < data.data.length; i++) {
                data.data[i] = result.data[i];
          }
          ctx.putImageData(data,0,0);
    };
    JOB.SwitchLocalizationFeedback(true);
    JOB.SetLocalizationCallback((result:any) => {
          ctx.beginPath();
          ctx.lineWIdth = "2";
          ctx.strokeStyle="red";
          for(var i = 0; i < result.length; i++) {
                ctx.rect(result[i].x,result[i].y,result[i].width,result[i].height);
          }
          ctx.stroke();
    });
    if(takePicture && showPicture) {
          takePicture.onchange = (event:any) => {

                $("#task-3-picture").show();

                var files = event.target.files;
                if (files && files.length > 0) {
                      let file = files[0];
                      try {
                            var URL = window.URL || window.webkitURL;
                            showPicture.onload = (event:any) => {
                                  Result.innerHTML="";
                                  JOB.DecodeImage(showPicture);
                                  URL.revokeObjectURL(showPicture.src);
                            };
                            showPicture.src = URL.createObjectURL(file);
                      }
                      catch (e) {
                            try {
                                  var fileReader = new FileReader();
                                  fileReader.onload = (event:any) => {
                                        showPicture.onload = (event:any) => {
                                              Result.innerHTML="";
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
  }

  //Task Type 4
  getTaskType4Answer(id:any) {
    if(typeof this.user.language === 'undefined' || this.user.language.length == 0 || $.isEmptyObject(this.getTaskData().json_task_data))
      return {id: "", answer: ""};

    return {id: "s"+this.shuffleArrayTaskType4[id], answer: this.getTaskData().json_task_data[this.user.language]["s"+this.shuffleArrayTaskType4[id]]};
  }

  exchangeShuffleArrayPosition(id1:any,id2:any) {
    let t_value_id1 = this.shuffleArrayTaskType4[id1];
    this.shuffleArrayTaskType4[id1] = this.shuffleArrayTaskType4[id2];
    this.shuffleArrayTaskType4[id2] = t_value_id1;
  }

  solveTaskType4() {

    let solvedata = JSON.stringify({"1": "s"+this.shuffleArrayTaskType4[0], "2": "s"+this.shuffleArrayTaskType4[1], "3": "s"+this.shuffleArrayTaskType4[2]});
    this.solveTaskOverall(solvedata, this.task_id);

  }

  //Task Type 5
  getTaskType5TextWithoutBlankStatement() {
    if(typeof this.user.language === 'undefined' || this.user.language.length == 0 || $.isEmptyObject(this.getTaskData().json_task_data))
      return {text: ""};

    return {text: this.getTaskData().json_task_data[this.user.language]["text"].replace("[::BLANK::]","___")};
  }

  solveTaskType5() {

    let solvedata = JSON.stringify({text: $('#input-specification-task-blank').val()});
    this.solveTaskOverall(solvedata, this.task_id);

  }

  //Task Type 6
  solveTaskType6(location_id:any) {

    let solvedata = JSON.stringify({"loc": location_id});
    this.solveTaskOverall(solvedata, this.task_id);

  }

  //Solved Overlay Methods
  removeFromSolvedOverlayArray(index:any) {
    this.solvedOverlayArray.splice(index,1);
  }


  //Helper
  shuffle(a:any) {
      for (let i = a.length; i; i--) {
          let j:any = Math.floor(Math.random() * i);
          [a[i - 1], a[j]] = [a[j], a[i - 1]];
      }
  }


}
