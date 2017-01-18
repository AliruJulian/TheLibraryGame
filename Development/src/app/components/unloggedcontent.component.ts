import { Component, OnInit, OnDestroy } from '@angular/core';
import { LibgameService } from './../services/libgame.service';
import { ActivatedRoute, Router, Params} from '@angular/router';

declare var $: any;

@Component({
  selector: 'unloggedcontent-component',
  providers: [LibgameService],
  template: `

<div style="width:100%;background-color: #990000;min-height: 100%;position: absolute;padding-top: 50px;">

  <div id="content-landing">

    <div class="row">

        <div class="col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4" style="padding:0;">

            <!-- Logo -->
            <div id="logo" style="width:200px;margin-left:auto;margin-right:auto;margin-bottom: 20px;">
                <img [src]="getUniversalContentMainPictureId().length != 0 ? lService.getPictureLink(getUniversalContentMainPictureId()) : ''" style="width:100%;" />
            </div>

            <div id="wrapper" style="padding-left:0;">

                <div *ngIf="showncomponent=='registration'">

                  <p class="lp-headline" style="text-align:center;text-decoration:underline;font-size:1.2em;margin:0;color:white;margin-bottom:0.8em;">Registriere dich jetzt!</p>

                  <form id="registerForm">
                        <input [(ngModel)]="reg_username" (keyup)="keyupRegisterUsername()" [style.background]="reg_username.length>0?(reg_username_valid && reg_username_exists == false)?'rgb(120,255,120)':'rgb(255,120,120)':'#eeeeee'" id="registerForm_reg_username" name="reg_username" type="text" maxlength="30" placeholder="Username" title="Gib hier deinen gewünschten Usernamen ein" style="padding-top:7px;padding-bottom:7px;"/>
                        <div *ngIf="reg_username_exists" style="padding: 5px;color: white;">Username ist leider schon vergeben!</div>

                        <input [(ngModel)]="reg_email" (keyup)="keyupRegisterEmail()" [style.background]="reg_email.length>0?(reg_email_valid && reg_email_exists == false)?'rgb(120,255,120)':'rgb(255,120,120)':'#eeeeee'" id="registerForm_reg_email" name="reg_email" type="text" maxlength="100" placeholder="E-Mail" title="Gib hier deine E-Mail ein" style="padding-top:7px;padding-bottom:7px;margin-top: 0.4em;"/>
                        <div *ngIf="reg_email_exists" style="padding: 5px;color: white;">Ein User mit dieser E-Mail existiert leider bereits!</div>

                        <input [(ngModel)]="reg_password" (keyup)="keyupRegisterPassword();keyupRegisterPasswordRepeat();" [style.background]="(reg_password_repeat.length>0 || reg_password.length>0)?reg_password_valid?'rgb(120,255,120)':'rgb(255,120,120)':'#eeeeee'" id="registerForm_reg_password" name="reg_password" type="password" maxlength="30" placeholder="Passwort (Mind. 6 Zeichen)" title="Gib hier dein Passwort ein" style="padding-top:7px;padding-bottom:7px;margin-top: 0.4em;"/>

                        <input [(ngModel)]="reg_password_repeat" (keyup)="keyupRegisterPasswordRepeat();keyupRegisterPassword();" [style.background]="(reg_password_repeat.length>0 || reg_password.length>0)?reg_password_repeat_valid?'rgb(120,255,120)':'rgb(255,120,120)':'#eeeeee'" id="registerForm_reg_password_repeat" name="reg_password_repeat" type="password" maxlength="30" placeholder="Wiederhole dein Passwort" title="Wiederhole hier dein Passwort" style="padding-top:7px;padding-bottom:7px;margin-top: 0.4em;"/>

                        <select [(ngModel)]="reg_faculty_id" name="reg_department" style="font-size:1em;background:#eeeeee;padding-top: 7px;padding-bottom: 7px;margin-top: 0.4em;">
                          <option value="-2">Wähle deine Fakultät</option>
                          <option *ngFor="let t_faculty of getUniversalContentFacultyArray();" value='{{t_faculty.faculty_id}}'>{{t_faculty.facultyname}}</option>
                        </select>

                        <input id="reg_bed" style="margin:10px 5px;float:left;width:20px;height:20px;margin-top:8px;" name="reg_bed" type="checkbox" value="bed">
                        <div style="color:white;margin:10px 5px;">Ich stimme den <a style="color:rgb(210,210,210);cursor:pointer;text-decoration: underline;" (click)="navigateToUnloggedComponent('legal/tou')" target="_blank">AGB</a> sowie der <a style="color:rgb(210,210,210);cursor:pointer;text-decoration: underline;" (click)="navigateToUnloggedComponent('legal/pp')" target="_blank">Datenschutzerklärungen</a> zu</div>
                        <div style="clear:both;"></div>

                        <div (click)="registerUser()" id="buttonReg">Jetzt registrieren</div>
                        <div class="buttonForLoginRegisterChange" (click)="navigateToUnloggedComponent('home')">Zurück zum Login</div>
                  </form>

                </div>

                <div *ngIf="showncomponent=='sendpwd'">

                  <p class="lp-headline" style="text-align:center;font-size:1.2em;margin:0;color:white;margin-bottom:0.8em;">Trage deine E-Mail ein und du wirst ein neues Passwort per Mail erhalten!</p>

                  <form>
                        <input [(ngModel)]="new_password_email" name="fp_email" type="text" maxlength="100" placeholder="E-Mail" title="Gib hier deine E-Mail ein"/>
                        <div (click)="sendNewPassword()" id="buttonSendPassword">Neues Passwort jetzt senden</div>
                        <div class="buttonForLoginRegisterChange" (click)="navigateToUnloggedComponent('home')">Zurück zum Login</div>
                  </form>

                </div>

                <div *ngIf="showncomponent=='legal'">
                  <legal-component [user]="user" [legalcomponent]="legalcomponent" [universalcontent]="universalcontent"></legal-component>

                  <div class="buttonForLoginRegisterChange" (click)="navigateToUnloggedComponent('home')">Zurück zum Login</div>
                </div>

                <div *ngIf="showncomponent=='home'">

                  <div [innerHTML]="getUniversalContentStart() | safeHtml" class="unloggedcontent">
                  </div>

                  <!-- Click In -->
                  <form id="registerForm" style="margin-top:1em;">
                      <input [(ngModel)]="username" type="text" name="username" placeholder="Dein Username" style="padding-top:7px;padding-bottom:7px;"/>
                      <input [(ngModel)]="pwd" type="password" name="password" placeholder="Dein Passwort" style="padding-top:7px;padding-bottom:7px;margin-top: 0.5em;"/>
                      <div (click)="loginUser()" id="buttonLogIn">Log In</div>
                      <div class="buttonForLoginRegisterChange" (click)="navigateToUnloggedComponent('registration')">Registriere dich jetzt</div>
                      <div class="buttonForLoginAsAnonym" (click)="loginAsAnonym()">Erstmal Anonym spielen</div>
                      <div class="buttonForForgotPasswordChange" (click)="navigateToUnloggedComponent('sendpwd')">Passwort vergessen</div>
                  </form>

                </div>

            </div>

        </div>

    </div>

  </div>
</div>

  `
})
export class UnloggedcontentComponent implements OnInit,OnDestroy {

  user: any = {};
  loading_user: any = true;

  universalcontent: any = {};
  loading_universalcontent: any = true;

  sub:any;

  showncomponent: any = "";
  legalcomponent:any = "";

  //
  username:string = "";
  pwd:string = "";

  new_password_email:any = "";

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

    $('#titleBar').hide();

    //User
    this.loading_user = true;
    this.lService.user$.subscribe((user:any) => {
      console.log(user);
      this.user = user;
      this.loading_user = false;
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
      component = component.toLowerCase();
      id = id.toLowerCase();
      if(component.length == 0 || component == 'home') {
        this.showncomponent = 'home';
      } else if(component == 'registration') {
        this.showncomponent = 'registration';
      } else if(component == 'sendpwd') {
        this.showncomponent = 'sendpwd';
      } else if(component == 'legal' && id.length != 0) {
        this.showncomponent = 'legal';
        this.legalcomponent = id;
      } else {
        this.showncomponent = 'home';
      }
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  navigateToComponent(componentname:any) {
    this.router.navigate(["/l/"+componentname]);
  }

  navigateToUnloggedComponent(componentname:any) {
    this.router.navigate(["/u/"+componentname]);
  }

  loginAsAnonym() {
    this.lService.loginAsAnonym().subscribe((data:any) => {
      if(typeof data !== 'undefined' && data.result==true) {
        this.navigateToComponent("tasks");
      } else {
        window.alert("Es ist ein Fehler aufgetreten. Bitte die Seite neu laden lassen!");
      }
    },(error:any) => {
      window.alert("Es ist ein Fehler aufgetreten. Bitte die Seite neu laden lassen!");
    });
  }

  sendNewPassword() {

    if(this.new_password_email.length == 0 || !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.new_password_email)) {
      window.alert("Bitte gib zuerst deine korrekte E-Mail ein!");
      return;
    }

    this.lService.sendNewPassword(this.new_password_email).subscribe((data:any) => {
      if(typeof data !== 'undefined' && data.result==true) {
        window.alert("Dir wurde eine Mail mit deinen neuen Zugangsdaten gesendet!");
      } else {
        window.alert("Es ist ein Fehler aufgetreten. Bitte die Seite neu laden lassen und nochmal versuchen!");
      }
    },(error:any) => {
      window.alert("Es ist ein Fehler aufgetreten. Bitte die Seite neu laden lassen und nochmal versuchen!");
    });
  }

  registerUser() {

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
        this.router.navigate(["/l/tasks"]);
      } else {
        window.alert("Bitte überprüfe deine Eingaben!");
      }
    }, (error:any) => {
      window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
      console.error('Could not register user.');
    });
  }

  getUniversalContentStart() {
    if(!$.isEmptyObject(this.universalcontent) && typeof this.universalcontent["_Content"] !== 'undefined' && this.universalcontent["_Content"].filter((x:any) => {return x.content_mapper == 'START';}).length != 0) {
      return this.universalcontent["_Content"].filter((x:any) => {return x.content_mapper == 'START';})[0]["text"];
    }
    return '';
  }

  getUniversalContentFacultyArray() {
    if(!$.isEmptyObject(this.universalcontent) && typeof this.universalcontent["_Faculties"] !== 'undefined') {
      return this.universalcontent["_Faculties"];
    }
    return [];
  }

  getUniversalContentMainPictureId() {
    if(!$.isEmptyObject(this.universalcontent) && typeof this.universalcontent["_Content"] !== 'undefined' && this.universalcontent["_Content"].filter((x:any) => {return x.content_mapper == "MAIN_PICTURE_ID"; }).length != 0) {
      return this.universalcontent["_Content"].filter((x:any) => {return x.content_mapper == "MAIN_PICTURE_ID"; })[0].text;
    }
    return -1;
  }

  loginUser() {
    this.lService.loginUser(this.username,this.pwd).subscribe((data:any) => {
      if(typeof data.result !== 'undefined' && data.result == true) {
        this.router.navigate(["/l/tasks"]);
      } else {
        window.alert("Bitte überprüfe deinen Username und Passwort!");
      }
    }, (error:any) => {
      window.alert("Es ist ein Fehler aufgetreten. Bitte Seite neu laden!");
      console.error('Could not login user.');
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
