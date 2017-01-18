import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, Params } from '@angular/router';
import { LibgameService } from './../services/libgame.service';

declare var $:any;

@Component({
  selector: 'solvedoverlay-component',
  providers: [LibgameService],
  template: `

        <div class="overlay" style="display: block;">
          <div class="overlay_lightbox" style="height: auto;">
            <div class="overlay_buttons" style="text-align: right;">
              <div class="button" (click)="closeOverlay.emit(true);" style="width: 50px; float: right; margin-right: 5px; margin-top: 5px;text-align: center;">X</div>
            </div>
            <div class="overlay_content">
              <div style="position:relative;">
                <img class="star-1" [hidden]="stars[0].show==false" [style.opacity]="stars[0].opacity" src="./../public/images/star1.png" style="width: 50px; height: 50px;">
                <img class="star-2" [hidden]="stars[1].show==false" [style.opacity]="stars[1].opacity" src="./../public/images/star1.png" style="width: 50px; height: 50px;">
                <img class="star-3" [hidden]="stars[2].show==false" [style.opacity]="stars[2].opacity" src="./../public/images/star1.png" style="width: 50px; height: 50px;">
                <img class="star-4" [hidden]="stars[3].show==false" [style.opacity]="stars[3].opacity" src="./../public/images/star2.png" style="width: 50px; height: 50px;">
                <img class="star-5" [hidden]="stars[4].show==false" [style.opacity]="stars[4].opacity" src="./../public/images/star2.png" style="width: 50px; height: 50px;">
              </div>
              <p class="headline" style="font-size:1.4em!important;font-weight:bold!important;width:90%;margin-left:auto;margin-right:auto;padding-top:1em;text-align:center;">
                {{getName()}}
              </p>
              <p [hidden]="getType() != 1 && getType() != 3" class="headline2" style="width:90%;margin-left:auto;margin-right:auto;text-align:center;">
                Deine Erfahrung: +{{getScoreRule()}} EXP. <br>
                Fakultätsscore: +{{getFacultyScoreRule()}} EXP.
              </p>
              <div [innerHTML]="getSolvedDescription()" [style.padding-bottom]="getSolvedQuests().length == 0 && getSolvedBadges().length == 0? '50px':'10px'" style="width:90%;margin-left:auto;margin-right:auto;">
              </div>
              <div [hidden]="getSolvedQuests().length == 0" [style.padding-bottom]="getSolvedBadges().length == 0? '50px':'10px'" style="width:90%;margin-left:auto;margin-right:auto;">
                Damit hast du folgende Quests ebenfalls abgeschlossen:<br />
                <div [innerHTML]="getSolvedQuests()"></div>
              </div>
              <div [hidden]="getSolvedBadges().length == 0" style="width:90%;margin-left:auto;margin-right:auto;padding-bottom:50px;">
                Damit hast du folgende Abzeichen ebenfalls erhalten:<br />
                <div [innerHTML]="getSolvedBadges()"></div>
              </div>
            </div>
          </div>
        </div>

  `
})
export class SolvedOverlayComponent {

  @Input() user:any;
  @Input() universalcontent:any;
  @Input() solveddata:any;
  //type: 1: Task, 2: Badge, 3: Quest, 4: Other
  //name:
  //score_rule:
  //faculty_score_rule:
  //solved_description:
  //solved_quests:
  //solved_badges:

  @Output() closeOverlay = new EventEmitter();

  stars:any = [];

  constructor(
    private router: Router,
    private lService: LibgameService){}

  ngOnInit() {

    this.stars = [
      {show: false, opacity: 1},
      {show: false, opacity: 1},
      {show: false, opacity: 1},
      {show: false, opacity: 1},
      {show: false, opacity: 1}
    ];

    this.animateStar(0);
    this.animateStar(1);
    this.animateStar(2);
    this.animateStar(3);
    this.animateStar(4);
  }

  getType() {
    return typeof this.solveddata["type"] !== 'undefined' ? this.solveddata["type"] : -1;
  }

  getName() {
    return typeof this.solveddata["name"] !== 'undefined' ? this.solveddata["name"] : "";
  }

  getSolvedDescription() {
    return typeof this.solveddata["solved_description"] !== 'undefined' ? this.solveddata["solved_description"] : "";
  }

  getScoreRule() {
    return typeof this.solveddata["score_rule"] !== 'undefined' ? this.solveddata["score_rule"] : "";
  }

  getFacultyScoreRule() {
    return typeof this.solveddata["faculty_score_rule"] !== 'undefined' ? this.solveddata["faculty_score_rule"] : "";
  }

  getSolvedQuests() {
    return typeof this.solveddata["solved_quests"] !== 'undefined' ? this.solveddata["solved_quests"] : "";
  }

  getSolvedBadges() {
    return typeof this.solveddata["solved_badges"] !== 'undefined' ? this.solveddata["solved_badges"] : "";
  }

  //Show Helper Functions
  animateStar(starindex:any) {
    let randomNumber1 = 0;
    this.stars[starindex].opacity = 0.5 + Math.random() * 0.5;
    if(this.stars[starindex].show == false) {
      this.stars[starindex].show = true;
      randomNumber1 = Math.random() * 500;
    } else {
      this.stars[starindex].show = false;
      randomNumber1 = Math.random() * 3500;
    }

    setTimeout((s_index:any) => {this.animateStar(s_index);}, randomNumber1, starindex);
  }

}
