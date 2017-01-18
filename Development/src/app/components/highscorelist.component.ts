import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, Params } from '@angular/router';
import { LibgameService } from './../services/libgame.service';

declare var $:any;

@Component({
  selector: 'highscorelist-component',
  providers: [LibgameService],
  template: `

  <div class="row">

      <div class="col-xs-12" style="padding:0;">

          <div id="cf-hi-highscore-list" class="content-frame">

              <p class="headline">Highscore</p>

              <div style="display:table;width:100%;border-spacing:2px 2px;color:rgb(255,255,255);">

                  <div style='display:table-row;width:100%;'>

                      <div style='display:table-cell;vertical-align:top;'>
                          <p style="font-size:1.3em;font-weight:bold;text-align:center;text-decoration:underline;">Rang</p>
                      </div>
                      <div style='display:table-cell;vertical-align:top;'>
                          <p style="font-size:1.3em;font-weight:bold;text-align:center;text-decoration:underline;">Name</p>
                      </div>
                      <div style='display:table-cell;vertical-align:top;'>
                          <p style="font-size:1.3em;font-weight:bold;text-align:center;text-decoration:underline;">Exp.</p>
                      </div>
                      <div style='display:table-cell;vertical-align:top;'>
                          <p style="font-size:1.3em;font-weight:bold;text-align:center;text-decoration:underline;">Fak.</p>
                      </div>

                  </div>

                  <div *ngFor="let t_user of getCurrentShownUsers();" [style.background]="t_user.user_id==user.user_id?'#990000':'inherit'" style='display:table-row;vertical-align:top;'>
                      <div style='display:table-cell;vertical-align:top;'>
                          <p style='font-size:1.3em;text-align:center;'>{{t_user.ranking}}</p>
                      </div>
                      <div style='display:table-cell;vertical-align:top;'>
                          <p style='font-size:1em;text-align:center;'>{{t_user.username}}</p>
                      </div>
                      <div style='display:table-cell;vertical-align:top;'>
                          <p style='font-size:1.1em;text-align:center;'>{{t_user.user_score}}</p>
                      </div>
                      <div style='display:table-cell;vertical-align:top;'>
                          <p style='font-size:1em;text-align:center;'>{{t_user.facultyname}}</p>
                      </div>
                  </div>



              </div>

              <!-- Navigation Highscore List -->

              <div style="width:95%;margin-top:20px;margin-bottom:0.3em;margin-left:auto;margin-right:auto;">

                <div *ngFor="let t_pageid of getArrayTotalNumberOfHighscorePages()"
                  [class.cf-hi-nav-item-unselected]="t_pageid!=highscorepage"
                  [class.cf-hi-nav-item]="t_pageid==highscorepage"
                  (click)="highscorepage=t_pageid;"
                  style='float:left;margin-right:2px;padding:10px 15px;border:1px solid black;'>{{t_pageid+1}}</div>

                <div style="clear:both;"></div>
              </div>

          </div>

      </div>



  </div>

  `
})
export class HighscorelistComponent implements OnInit {

  @Input() user:any;
  @Input() universalcontent:any;
  @Input() highscorepage:any;

  specificcontent: any = [];
  loading_specificcontent: any = true;

  number_of_shown_users_per_page:any = 20;

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
    this.lService.loadSpecificContent('highscorelist');

  }

  getRankedHighscoreListArray() {
    return typeof this.specificcontent !== 'undefined' ? this.specificcontent : [];
  }

  getCurrentShownUsers() {
    return this.getRankedHighscoreListArray().slice(this.highscorepage*this.number_of_shown_users_per_page , (this.highscorepage+1)*this.number_of_shown_users_per_page) ;
  }

  getArrayTotalNumberOfHighscorePages() {
    let t_return:any = [];
    for(let i=0; i<Math.ceil(this.getRankedHighscoreListArray().length/this.number_of_shown_users_per_page); i++)
      t_return.push(i);
    return t_return;
  }


}
