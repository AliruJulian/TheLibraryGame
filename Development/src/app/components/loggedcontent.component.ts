import { Component, OnInit, OnDestroy } from '@angular/core';
import { LibgameService } from './../services/libgame.service';
import { ActivatedRoute, Router, Params} from '@angular/router';

declare var $: any;
declare var skel: any;

@Component({
  selector: 'loggedcontent-component',
  providers: [LibgameService],
  template: `


  <!-- -->
  <div id="wrapper" [class.toggled]="toggled">

      <!-- Sidebar -->
      <div id="sidebar-wrapper">

        <!-- Logo -->
        <div id="logo">
          <img [src]="getUniversalContentMainPictureId().length != 0 ? lService.getPictureLink(getUniversalContentMainPictureId()) : ''" style="width:100%;" />
        </div>

        <!-- Nav -->
        <nav class="nav">
            <ul>
                <li [class.current_page_item]="showncomponent=='tasks'"><a id="tasks" (click)="navigateToComponent('tasks')" style="cursor:pointer;">Aktuelle Aufgaben</a></li>
                <li [class.current_page_item]="showncomponent=='tasksearch'"><a id="map" (click)="navigateToComponent('tasksearch')" style="cursor:pointer;">Aufgabensuche</a></li>
                <li [class.current_page_item]="showncomponent=='userprogress'"><a id="achievements" (click)="navigateToComponent('userprogress')" style="cursor:pointer;">Spielstand</a></li>
                <li [class.current_page_item]="showncomponent=='statistics'"><a id="statistics" (click)="navigateToComponent('statistics')" style="cursor:pointer;">Statistiken</a></li>
                <li><a id="logout" (click)="logoutUser()" style="cursor:pointer;">Abmelden</a></li>
            </ul>
        </nav>

        <nav *ngIf="isUserAdminUser()" class="nav" style="margin-top:0.5em;">
            <ul>
                <li [class.current_page_item]="showncomponent=='administration'"><a id="administration" (click)="navigateToComponent('administration')" style="cursor:pointer;">Administration</a></li>
            </ul>
        </nav>

        <!-- Copyright -->
        <!--
        <section id="copyright" style="margin-top: 0.5em;">
            <p>
                &copy; 2016 The Library Game.<br />
                CodeDesign, Database: <a href="http://company.aliru.de">Julian Kissel</a><br />
                Design: Alexander Moch<br />
                Weitere Beteiligte: <a href="https://www.bib.uni-mannheim.de/">Bibliothek der Universität Mannheim</a>, <a href="http://ls.wim.uni-mannheim.de/de/pi4/people/philip-mildner/">Philip Mildner</a>
            </p>
        </section>
        -->


        <!-- Register for Anonymous Player -->
        <section id="registerAsAnonymous" *ngIf="getUniversalContentAnonymousUserPhrase().length!=0 && isUserAnonymousUser()">
            <div style="padding:0px 10px;">

                <form id="registerForm">
                      <input [(ngModel)]="reg_username" (keyup)="keyupRegisterUsername()" [style.background]="reg_username.length>0?(reg_username_valid && reg_username_exists == false)?'rgb(120,255,120)':'rgb(255,120,120)':'#eeeeee'" id="registerForm_reg_username" name="reg_username" type="text" maxlength="30" placeholder="Username" title="Gib hier deinen gewünschten Usernamen ein" style="padding-top:7px;padding-bottom:7px;"/>
                      <div *ngIf="reg_username_exists" style="padding: 5px;color: white;">Username ist leider schon vergeben!</div>

                      <input [(ngModel)]="reg_email" (keyup)="keyupRegisterEmail()" [style.background]="reg_email.length>0?(reg_email_valid && reg_email_exists == false)?'rgb(120,255,120)':'rgb(255,120,120)':'#eeeeee'" id="registerForm_reg_email" name="reg_email" type="text" maxlength="100" placeholder="E-Mail" title="Gib hier deine E-Mail ein" style="padding-top:7px;padding-bottom:7px;margin-top: 0.2em;"/>
                      <div *ngIf="reg_email_exists" style="padding: 5px;color: white;">Ein User mit dieser E-Mail existiert leider bereits!</div>

                      <input [(ngModel)]="reg_password" (keyup)="keyupRegisterPassword();keyupRegisterPasswordRepeat();" [style.background]="(reg_password_repeat.length>0 || reg_password.length>0)?reg_password_valid?'rgb(120,255,120)':'rgb(255,120,120)':'#eeeeee'" id="registerForm_reg_password" name="reg_password" type="password" maxlength="30" placeholder="Passwort (Mind. 6 Zeichen)" title="Gib hier dein Passwort ein" style="padding-top:7px;padding-bottom:7px;margin-top: 0.2em;"/>

                      <input [(ngModel)]="reg_password_repeat" (keyup)="keyupRegisterPasswordRepeat();keyupRegisterPassword();" [style.background]="(reg_password_repeat.length>0 || reg_password.length>0)?reg_password_repeat_valid?'rgb(120,255,120)':'rgb(255,120,120)':'#eeeeee'" id="registerForm_reg_password_repeat" name="reg_password_repeat" type="password" maxlength="30" placeholder="Wiederhole dein Passwort" title="Wiederhole hier dein Passwort" style="padding-top:7px;padding-bottom:7px;margin-top: 0.2em;"/>

                      <select [(ngModel)]="reg_faculty_id" name="reg_department" style="font-size:1em;background:#eeeeee;padding-top: 7px;padding-bottom: 7px;margin-top: 0.2em;">
                        <option value="-2">Wähle deine Fakultät</option>
                        <option *ngFor="let t_faculty of getUniversalContentFacultyArray();" value='{{t_faculty.faculty_id}}'>{{t_faculty.facultyname}}</option>
                      </select>

                      <div style="margin:10px 5px;float:left;">
                        <input id="reg_bed" style="width:20px;height:20px;" name="reg_bed" type="checkbox" value="bed">
                      </div>
                      <div style="color:white;margin:10px 5px;">Ich stimme den <a style="color:rgb(210,210,210);cursor:pointer;text-decoration: underline;" (click)="navigateToLegal('tou')" target="_blank">AGB</a> sowie der <a style="color:rgb(210,210,210);cursor:pointer;text-decoration: underline;" (click)="navigateToLegal('pp')" target="_blank">Datenschutzerklärungen</a> zu</div>
                      <div style="clear:both;"></div>

                      <div (click)="registerLoggedUser()" id="buttonReg">Jetzt registrieren</div>
                </form>


            </div>
        </section>


        <!-- "Delete ACC" AND "Go to Settings" for Non-Anonymous Player -->
        <section id="deleteAcc">
            <div style="padding:0px 10px;">

                <input (click)="deleteUser()" type="button" id="buttonDeleteAcc" value="Lösche meinen Account" style="width:100%;"/>
                <input (click)="navigateToComponent('usersettings')" type="button" id="buttonSettingsAcc" value="Meine Einstellungen" style="width:100%;margin-top:5px;"/>

            </div>
        </section>


        <!-- Nav -->
        <nav class="nav">
            <ul>
                <li [class.current_page_item]="showncomponent=='legal' && legalcomponent=='tou'"><a (click)="navigateToLegal('tou')" style="cursor:pointer;">Nutzungsbedingungen</a></li>
                <li [class.current_page_item]="showncomponent=='legal' && legalcomponent=='pp'"><a (click)="navigateToLegal('pp')" style="cursor:pointer;">Datenschutzerklärung</a></li>
                <li [class.current_page_item]="showncomponent=='legal' && legalcomponent=='impressum'"><a (click)="navigateToLegal('impressum')" style="cursor:pointer;">Impressum</a></li>
            </ul>
        </nav>

      </div>
      <!-- /#sidebar-wrapper -->

      <!-- Page Content -->
      <div id="page-content-wrapper" style="padding:0;">

        <div id="titleBar" class="hidden-sm hidden-md hidden-lg">
          <div class="toggleLeft" (click)="toggled=toggled?false:true;"></div><div class="reloadButton" onclick="location.reload();"></div>
        </div>

        <div style="padding:15px;">

          <div class="container-fluid">

            <div id="content">

              <!-- Routing Logged User -->
              <tasks-component *ngIf="showncomponent=='tasks'" [user]="user" [universalcontent]="universalcontent"></tasks-component>
              <quest-component *ngIf="showncomponent=='quest'" [user]="user" [universalcontent]="universalcontent" [quest_id]="quest_id"></quest-component>
              <badge-component *ngIf="showncomponent=='badge'" [user]="user" [universalcontent]="universalcontent" [badge_id]="badge_id"></badge-component>
              <userprogress-component *ngIf="showncomponent=='userprogress'" [user]="user" [universalcontent]="universalcontent"></userprogress-component>
              <legal-component *ngIf="showncomponent=='legal'" [user]="user" [legalcomponent]="legalcomponent" [universalcontent]="universalcontent"></legal-component>
              <usersettings-component *ngIf="showncomponent=='usersettings'" [user]="user" [universalcontent]="universalcontent"></usersettings-component>
              <statistics-component *ngIf="showncomponent=='statistics'" [user]="user" [universalcontent]="universalcontent"></statistics-component>
              <highscorelist-component *ngIf="showncomponent=='highscorelist'" [user]="user" [universalcontent]="universalcontent" [highscorepage]="highscorepage"></highscorelist-component>
              <tasksearch-component *ngIf="showncomponent=='tasksearch'" [user]="user" [universalcontent]="universalcontent"></tasksearch-component>
              <task-component *ngIf="showncomponent=='task'" [user]="user" [universalcontent]="universalcontent" [task_id]="task_id" [additionalinformation]="additionalinformation"></task-component>
              <administration-component *ngIf="showncomponent=='administration'" [user]="user" [universalcontent]="universalcontent" (reload)="lService.loadUniversalContent();"></administration-component>

              <footer id="is-footer">
                <hr style="width:100%">
              </footer>


            </div>

          </div>
        </div>
      </div>
      <!-- /#page-content-wrapper -->

  </div>
  <!-- -->

  <!-- Overlay -->
  <div *ngFor="let solvedOverlayDataObject of solvedOverlayArray;let i = index;">
    <solvedoverlay-component [user]="user" [universalcontent]="universalcontent" [solveddata]="solvedOverlayDataObject" (closeOverlay)="removeFromSolvedOverlayArray(i);"></solvedoverlay-component>
  </div>


  <!-- Dialog -->
  <div id="dialog-confirm" style="display:none;">
    <div id="dialog-content"></div>
  </div>

  `
})
export class LoggedcontentComponent implements OnInit,OnDestroy {

  user: any = {};
  loading_user: any = true;

  universalcontent: any = {};
  loading_universalcontent: any = true;

  sub:any;

  showncomponent: any = "";

  timeframeForCheckingLocation:any = 30000;
  intervalTimerManageCheckLocation:any = null;

  //Solved Overlay
  solvedOverlayArray:any = [];

  //Small Screen
  toggled:any = false;

  //Unmendatory
  badge_id:any = "";
  quest_id:any = "";
  task_id:any = "";
  legalcomponent:any = "";
  highscorepage:any = 0;
  additionalinformation:any = "";
  locationfound_id:any = "";

  reg_username:any = "";
  reg_username_valid:any = true;
  reg_username_exists:any = false;
  reg_email:any = "";
  reg_email_valid:any = true;
  reg_email_exists:any = false;
  reg_password:any = "";
  reg_password_valid:any = true;
  reg_password_repeat:any = "";
  reg_password_repeat_valid:any = true;

  reg_faculty_id:any = -2;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private lService: LibgameService){}

  ngOnInit() {

    this.sub = this.route.params.subscribe((params:any) => {
      let scroll = typeof params['scroll'] !== 'undefined' ?  params['scroll']:'';
      if(typeof scroll !== 'undefined' &&  scroll.length>0) {
        $('html, body').animate({ scrollTop: ($('#'+scroll).offset().top)}, 'slow');
      } else {
        $('html, body').animate({ scrollTop: 0}, 'slow');
      }
    });

    $('#titleBar').show();

    //User
    this.loading_user = true;
    this.lService.user$.subscribe((user:any) => {
      if(typeof user === 'undefined' || typeof user.user_id === 'undefined') {
        this.navigateToUnloggedComponent('home');
      }
      this.user = user;
      this.loading_user = false;

      if(typeof this.user.user_id !== 'undefined' && this.user.user_id != -1) {
        this.manageCheckLocation();
        if(this.intervalTimerManageCheckLocation != null) {
          window.clearInterval(this.intervalTimerManageCheckLocation);
        }
        this.intervalTimerManageCheckLocation = window.setInterval(() => {this.manageCheckLocation();}, this.timeframeForCheckingLocation);
      }

    });
    this.lService.loadUser();

    //Universal Content
    this.loading_universalcontent = true;
    this.lService.universalcontent$.subscribe((universalcontent:any) => {
      this.universalcontent = universalcontent;
      this.loading_universalcontent = false;

    });
    this.lService.loadUniversalContent();

    //Sub Route
    this.sub = this.route.params.subscribe((params:any) => {
      let component = typeof params['component'] !== 'undefined' ?  params['component']:'';
      let id = typeof params['id'] !== 'undefined' ?  params['id']:'';
      let additionalinformation = typeof params['additionalinformation'] !== 'undefined' ?  params['additionalinformation']:'';
      component = component.toLowerCase();
      id = id.toLowerCase();
      if(component.length == 0 || component == 'tasks') {
        this.showncomponent = 'tasks';
      } else if(component == 'administration') {
        this.showncomponent = 'administration';
      } else if(component == 'task' && id.length != 0) {
        this.showncomponent = 'task';
        this.task_id = id;
        this.additionalinformation = additionalinformation;
      } else if(component == 'tasksearch') {
        this.showncomponent = 'tasksearch';
      } else if(component == 'highscorelist') {
        this.showncomponent = 'highscorelist';
        this.highscorepage = parseInt(id);
      } else if(component == 'quest' && id.length != 0) {
        this.showncomponent = 'quest';
        this.quest_id = id;
      } else if(component == 'badge' && id.length != 0) {
        this.showncomponent = 'badge';
        this.badge_id = id;
      } else if(component == 'legal' && id.length != 0) {
        this.showncomponent = 'legal';
        this.legalcomponent = id;
      } else if(component == 'statistics') {
        this.showncomponent = 'statistics';
      } else if(component == 'userprogress') {
        this.showncomponent = 'userprogress';
      } else if(component == 'usersettings') {
        this.showncomponent = 'usersettings';
      } else if(component == 'locationfound' && id.length != 0) {
        this.showncomponent = 'tasks';
        this.locationfound_id = id;
        this.checkLocation("","",this.locationfound_id);
      } else {
        this.showncomponent = 'tasks';
      }
    });

  }

  getUniversalContentFacultyArray() {
    if(!$.isEmptyObject(this.universalcontent) && typeof this.universalcontent["_Faculties"] !== 'undefined') {
      return this.universalcontent["_Faculties"];
    }
    return [];
  }

  getUniversalContentAnonymousUserPhrase() {
    if(!$.isEmptyObject(this.universalcontent) && typeof this.universalcontent["Anonymous_User_Phrase"] !== 'undefined') {
      return this.universalcontent["Anonymous_User_Phrase"];
    }
    return "";
  }

  getUniversalContentMainPictureId() {
    if(!$.isEmptyObject(this.universalcontent) && typeof this.universalcontent["_Content"] !== 'undefined' && this.universalcontent["_Content"].filter((x:any) => {return x.content_mapper == "MAIN_PICTURE_ID"; }).length != 0) {
      return this.universalcontent["_Content"].filter((x:any) => {return x.content_mapper == "MAIN_PICTURE_ID"; })[0].text;
    }
    return -1;
  }

  isUserAnonymousUser() {
    if(typeof this.user === 'undefined' || typeof this.user.username === 'undefined') {
      return false;
    }

    if(this.getUniversalContentAnonymousUserPhrase().length == 0) {
      return false;
    }

    if(this.user.username.indexOf(this.getUniversalContentAnonymousUserPhrase()) > -1) {
      return true;
    }

    return false;

  }

  isUserAdminUser() {
    if(typeof this.user === 'undefined' || typeof this.user.user_type_id === 'undefined' || (this.user.user_type_id != 1 && this.user.user_type_id != 2)) {
      return false;
    }
    return true;

  }

  logoutUser() {
    this.lService.logoutUser().subscribe((data:any) => {
          this.router.navigate(["/u/home"]);
    }, (error:any) => {console.error('Could not logout user.');});
  }

  navigateToComponent(componentname:any) {
    this.router.navigate(["/l/"+componentname]);
  }

  navigateToUnloggedComponent(componentname:any) {
    this.router.navigate(["/u/"+componentname]);
  }

  navigateToLegal(legalcomponentname:any) {
    this.router.navigate(["/l/legal",legalcomponentname]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    if(this.intervalTimerManageCheckLocation != null) {
      window.clearInterval(this.intervalTimerManageCheckLocation);
    }
  }

  deleteUser() {
    if (confirm("Möchtest du deinen User jetzt löschen?") == true) {
      this.lService.deleteUser().subscribe((data:any) => {
        if(typeof data.result !== 'undefined' && data.result == true) {
          this.navigateToUnloggedComponent("home");
        } else {
          window.alert("Es ist ein Fehler aufgetreten. Bitte lass die Seite neuladen!");
        }
      }, (error:any) => {
        window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
      });
    }
  }


  //checkLocation
  manageCheckLocation() {
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition((p:any) => {
            /*lati = p.coords.latitude;
            long = p.coords.longitude;*/

            this.checkLocation(p.coords.latitude, p.coords.longitude, "");

        }, function (error) {
            console.log('Positioning Error: ');
            console.log(error);
            window.alert("Positionieren des Nutzers nicht möglich! Fehler: "+(typeof error.message !== 'undefined' ? error.message : ''));
        }, {
            enableHighAccuracy: true,
            maximumAge: 1000000
        });

    }
    else
    {
        window.alert("Bitte erlaube dem Spiel deine Position zu checken, da sonst das Spiel für dich nicht in vollem Umfang spielbar ist. Deine Position wird NICHT permanent gespeichert, sondern nur kurz (5-10 Sekunden) für die Suche von Aufgaben und Quests in deiner Nähe benutzt!")
    }
  }

  checkLocation(lati:any,long:any,location_id:any) {
    if((typeof lati === 'undefined' || typeof long === 'undefined') && typeof location_id === 'undefined') {
      return;
    }

    this.lService.checkLocation(lati,long, location_id).subscribe((data:any) => {
      if(typeof data.result !== 'undefined' && data.result == true && data.data != null) {
        //console.log(data);

        //New Tasks
        for(let key in data.data["new_tasks"]) {
          this.solvedOverlayArray.push({
            type: 4,
            name: "Aufgabe gefunden",
            solved_description: "Du hast eine neue Aufgabe gefunden: '"+data.data["new_tasks"][key]["taskname"]+"'. Du findest sie ab sofort unter deinen aktuellen Aufgaben!"
          });
        }

        //New Quests
        for(let key in data.data["new_quests"]) {
          this.solvedOverlayArray.push({
            type: 4,
            name: "Quest gefunden",
            solved_description: "Du hast einen neuen Quest gefunden: '"+data.data["new_quests"][key]["questname"]+"'. Du findest sie ab sofort unter deinen aktuellen Aufgaben!"
          });
        }

        //Solved Tasks
        for(let key in data.data["all_tasks_to_solve_in_near"]) {

          let t_solved_quests:any = "";
          let t_solved_badges:any = "";

          if(typeof data.data["all_tasks_to_solve_in_near"][key]["achievements"] !== 'undefined')
          {
            for(let t_key_quests in data.data["all_tasks_to_solve_in_near"][key]["achievements"]["quests"])
            {
              t_solved_quests += "-" + data.data["all_tasks_to_solve_in_near"][key]["achievements"]["quests"][t_key_quests]["questname"] + "<br />";
            }

            for(let t_key_badges in data.data["all_tasks_to_solve_in_near"][key]["achievements"]["badges"])
            {
              t_solved_badges += "-" + data.data["all_tasks_to_solve_in_near"][key]["achievements"]["badges"][t_key_badges]["badgename"] + "<br />";
            }
          }

          this.solvedOverlayArray.push({
            type: 1,
            name: "Aufgabe erfüllt",
            solved_description: "Herzlichen Glückwunsch! Du hast die Aufgabe '"+data.data["all_tasks_to_solve_in_near"][key]["taskname"]+"' abgeschlossen.",
            score_rule: data.data["all_tasks_to_solve_in_near"][key]["score_rule"],
            faculty_score_rule: data.data["all_tasks_to_solve_in_near"][key]["added_score_for_faculty"],
            solved_quests: t_solved_quests,
            solved_badges: t_solved_badges
          });

          //Solved Quests
          if(typeof data.data["all_tasks_to_solve_in_near"][key]["achievements"] !== 'undefined')
          {
            for(let t_key_quests in data.data["all_tasks_to_solve_in_near"][key]["achievements"]["quests"])
            {
              this.solvedOverlayArray.push({
                type: 3,
                name: "Quest erfüllt",
                solved_description: "Herzlichen Glückwunsch! Du hast den Quest '"+data.data["all_tasks_to_solve_in_near"][key]["achievements"]["quests"][t_key_quests]["questname"]+"' abgeschlossen.",
                score_rule: data.data["all_tasks_to_solve_in_near"][key]["achievements"]["quests"][t_key_quests]["score_rule"],
                faculty_score_rule: data.data["all_tasks_to_solve_in_near"][key]["achievements"]["quests"][t_key_quests]["score_rule"]
              });
            }
          }

          //Solved Badges
          if(typeof data.data["all_tasks_to_solve_in_near"][key]["achievements"] !== 'undefined')
          {
            for(let t_key_badges in data.data["all_tasks_to_solve_in_near"][key]["achievements"]["badges"])
            {
              this.solvedOverlayArray.push({
                type: 2,
                name: "Abzeichen erhalten",
                solved_description: "Herzlichen Glückwunsch! Du hast das Abzeichen '"+data.data["all_tasks_to_solve_in_near"][key]["achievements"]["badges"][t_key_badges]["badgename"]+"' abgeschlossen.<br /><img src='"+this.lService.getPictureLink(data.data["all_tasks_to_solve_in_near"][key]["achievements"]["badges"][t_key_badges]["picture_id"])+"' />"
              });
            }
          }
        }

      } else if(typeof data.result !== 'undefined' && data.result == true && data.data == null) {
        if(this.intervalTimerManageCheckLocation != null) {
          window.clearInterval(this.intervalTimerManageCheckLocation);
          this.intervalTimerManageCheckLocation = null;
        }
      } else {
        window.alert("Es ist ein Fehler aufgetreten. Bitte lass die Seite neuladen!");
      }
    }, (error:any) => {
      window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
    });

  }

  //Solved Overlay Methods
  removeFromSolvedOverlayArray(index:any) {
    this.solvedOverlayArray.splice(index,1);
  }


  //Register for Anonymous Users
  registerLoggedUser() {

      //Username
      let pattern = /^[A-Za-z0-9]{2,}$/;
      if(this.reg_username.length == 0 || this.reg_username.match(pattern)==null) {
        window.alert("Dein gewählter Username entspricht nicht unseren Richtlinien!");
        return;
      }

      if(this.reg_username_exists == true) {
        window.alert("Dein gewählter Username ist bereits vergeben!");
        return;
      }

      //Email
      pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if(this.reg_email.length == 0 || this.reg_email.match(pattern)==null) {
        window.alert("Bitte überprüfe deine E-Mail und versuche es erneut!");
        return;
      }

      if(this.reg_email_exists == true) {
        window.alert("Deine gewählte E-Mail ist bereits vergeben!");
        return;
      }

      //Password
      pattern = /[A-Za-z0-9!?.:;-]{6,}/g;
      if(this.reg_password.length == 0 || this.reg_password.match(pattern)==null || this.reg_password!=this.reg_password_repeat)
      {
          window.alert("Dein Passwort entspricht nicht unseren Richtlinien oder du hast die beiden Passwörter stimmen nicht überein!");
          return;
      }

      //Faculty
      if(this.reg_faculty_id == -2)
      {
        window.alert("Bitte wähle vor der Registration eine Fakultät!");
        return;
      }

      //Accept TOU and PP
      if($("#reg_bed").prop( "checked" ) == false) {
        window.alert("Bitte akzeptiere vor der Registration die AGB sowie die Datenschutzerklärungen!");
        return;
      }

      this.lService.registerUser(this.reg_username, this.reg_email, this.reg_password, this.reg_password_repeat, this.reg_faculty_id).subscribe((data:any) => {
        if(typeof data.result !== 'undefined' && data.result == true) {
          window.location.reload();
        } else {
          window.alert("Bitte lass die Seite neuladen und überprüfe deine Eingaben!");
        }
      }, (error:any) => {
        window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
        console.error('Could not register user.');
      });

  }


  keyupRegisterUsername() {

    var pattern = /^[A-Za-z0-9]{2,}$/;
    if(this.reg_username.length != 0 && this.reg_username.match(pattern)!=null)
    {
        this.reg_username_valid = true;
    }
    else
    {
        this.reg_username_valid = false;
    }

    this.lService.checkUsername(this.reg_username).subscribe((data:any) => {
      if(typeof data.data !== 'undefined' && typeof data.data.username_exists !== 'undefined' && typeof data.data.username !== 'undefined' && data.data.username==this.reg_username && data.data.username_exists == true) {
        this.reg_username_exists = true;
      } else if(typeof data.data !== 'undefined' && typeof data.data.username_exists !== 'undefined' && typeof data.data.username !== 'undefined' && data.data.username==this.reg_username && data.data.username_exists == false) {
        this.reg_username_exists = false;
      }
    }, (error:any) => {
      window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
      console.error('Could not login user.');
    });

  }

  keyupRegisterEmail() {

    var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(this.reg_email.length != 0 && this.reg_email.match(pattern)!=null)
    {
        this.reg_email_valid = true;
    }
    else
    {
        this.reg_email_valid = false;
    }

    this.lService.checkEmail(this.reg_email).subscribe((data:any) => {
      if(typeof data.data !== 'undefined' && typeof data.data.email_exists !== 'undefined' && typeof data.data.email !== 'undefined' && data.data.email==this.reg_email && data.data.email_exists == true) {
        this.reg_email_exists = true;
      } else if(typeof data.data !== 'undefined' && typeof data.data.email_exists !== 'undefined' && typeof data.data.email !== 'undefined' && data.data.email==this.reg_email && data.data.email_exists == false) {
        this.reg_email_exists = false;
      }
    }, (error:any) => {
      window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
      console.error('Could not login user.');
    });

  }

  keyupRegisterPassword() {

    var pattern = /[A-Za-z0-9!?.:;-]{6,}/g;
    if(this.reg_password.length != 0 && this.reg_password.match(pattern)!=null)
    {
        this.reg_password_valid = true;
    }
    else
    {
        this.reg_password_valid = false;
    }

  }

  keyupRegisterPasswordRepeat() {

    var pattern = /[A-Za-z0-9!?.:;-]{6,}/g;
    if(this.reg_password_repeat.length != 0 && this.reg_password==this.reg_password_repeat)
    {
        this.reg_password_repeat_valid = true;
    }
    else
    {
        this.reg_password_repeat_valid = false;
    }

  }





}
