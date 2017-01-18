import { Component, OnInit, Input, Output } from '@angular/core';
import { Router, Params } from '@angular/router';
import { LibgameService } from './../services/libgame.service';

declare var $:any;

@Component({
  selector: 'usersettings-component',
  providers: [LibgameService],
  template: `

  <div class="row">

      <div class="col-xs-12" style="padding:0;">

          <div id="cf-se-overview" class="content-frame">

              <p class="headline">Neues Passwort</p>

              <div style="width:70%;margin-left:auto;margin-right:auto;">
                  <input type="password" placeholder="Altes Passwort" id="settings_old_password" style="width:100%;margin-top:0.3em;margin-bottom:0.3em;">
                  <br>
                  <input type="password" placeholder="Neues Passwort (Min. 6 Zeichen)" id="settings_new_password" style="width:100%;margin-top:0.3em;margin-bottom:0.3em;">
                  <br>
                  <input type="password" placeholder="Wiederhole das neue Passwort" id="settings_new_password_repeat" style="width:100%;margin-top:0.3em;margin-bottom:0.3em;">
                  <br>
                  <button (click)="setNewPassword()" *ngIf="show_update_password_button" class="button" style="margin-top:0.5em;margin-bottom:0.3em;width:100%;">Neues Passwort jetzt setzen</button>
                  <button *ngIf="!show_update_password_button" class="button" style="margin-top:0.5em;margin-bottom:0.3em;width:100%;"><i class="fa fa-spinner fa-pulse"></i></button>

              </div>



          </div>


      </div>



  </div>

  `
})
export class UsersettingsComponent implements OnInit {

  @Input() user:any;
  @Input() universalcontent:any;

  specificcontent: any = {};
  loading_specificcontent: any = true;

  error_setting_new_password:any = false;
  show_update_password_button:any = true;

  constructor(
    private router: Router,
    private lService: LibgameService){}

  ngOnInit() {

    //Specific Content
    this.loading_specificcontent = true;
    this.lService.specificcontent$.subscribe((specificcontent:any) => {
      this.specificcontent = specificcontent;
      this.loading_specificcontent = false;
    });
    this.lService.loadSpecificContent('usersettings');

    $(document).ready(function(){
        $('#settings_new_password').keyup(function(){

            var pattern = /[A-Za-z0-9!?.:;-]{6,}/g;
            if($(this).val().match(pattern)!=null)
            {
                $(this).css("background","rgb(120,255,120)");
            }
            else
            {
                $(this).css("background","rgb(255,120,120)");
            }
        });


        $('#settings_new_password_repeat').keyup(function(){

            if($(this).val()==$('#settings_new_password').val())
            {
                $(this).css("background","rgb(120,255,120)");
            }
            else
            {
                $(this).css("background","rgb(255,120,120)");
            }
        });
    });

  }

  setNewPassword() {

    let pattern = /[A-Za-z0-9!?.:;-]{6,}/g;
    if($('#settings_new_password').val().match(pattern)==null) {
      window.alert("Das Passwort entspricht nicht unseren Passwort Richtlinien!");
      return;
    }

    if($('#settings_new_password').val()!=$('#settings_new_password_repeat').val()) {
      window.alert("Das Passwort und dessen wiederholte Eingabe müssen übereinstimmen!");
      return;
    }

    this.show_update_password_button = false;

    this.lService.updatePassword($('#settings_old_password').val(),$('#settings_new_password').val()).subscribe((data:any) => {
      this.show_update_password_button = true;
      if(typeof data.data === 'undefined' || data.data != true) {
        this.error_setting_new_password = true;
        window.alert("Beim Setzen des neuen Passworts ist ein Fehler aufgetreten.");
      } else {
        $('#settings_old_password').val('');
        $('#settings_new_password').val('');
        $('#settings_new_password_repeat').val('');
        window.alert("Ihr Passwort wurde neu gesetzt!");
      }
    },(error:any) => {
      this.show_update_password_button = true;
      this.error_setting_new_password = true;
      window.alert("Beim Setzen des neuen Passworts ist ein Fehler aufgetreten.");
      console.error('Could not set new password.');
    });

  }



}
