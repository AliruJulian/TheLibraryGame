import { Component, OnInit, Input, Output } from '@angular/core';
import { Router, Params } from '@angular/router';
import { LibgameService } from './../services/libgame.service';

declare var $:any;

@Component({
  selector: 'legal-component',
  providers: [LibgameService],
  template: `

  <div class="row">
    <section class="col-xs-12" style="padding:0;background:white;">

        <div class="content-frame">

          <p *ngIf="legalcomponent=='tou'" class="headline"style="margin-top:10px;">Allgemeine Geschäftsbedingungen</p>
          <p *ngIf="legalcomponent=='pp'" class="headline"style="margin-top:10px;">Datenschutzerklärung</p>
          <p *ngIf="legalcomponent=='impressum'" class="headline"style="margin-top:10px;">Impressum</p>

          <div style="margin-top:20px;width:100%;padding:0 3em;" [innerHTML]="getLegalcontent()">
          </div>

        </div>

    </section>
</div>

  `
})
export class LegalComponent {

  @Input() user:any;
  @Input() universalcontent:any;
  @Input() legalcomponent:any;

  specificcontent: any = {};
  loading_specificcontent: any = true;

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
    this.lService.loadSpecificContent('legal');

  }

  getTOU() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['TOU'] !== 'undefined' ? this.specificcontent['TOU'] : {text:""};
  }

  getPP() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['PP'] !== 'undefined' ? this.specificcontent['PP'] : {text:""};
  }

  getIMPRESSUM() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['IMPRESSUM'] !== 'undefined' ? this.specificcontent['IMPRESSUM'] : {text:""};
  }

  getLegalcontent() {
    if(this.legalcomponent=='tou') {
      return this.getTOU()["text"];
    } else if(this.legalcomponent=='pp') {
      return this.getPP()["text"];
    } else if(this.legalcomponent=='impressum') {
      return this.getIMPRESSUM()["text"];
    } else {
      return 'Nothing found!';
    }
  }



}
