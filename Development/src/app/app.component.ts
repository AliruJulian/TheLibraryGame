import { Component } from '@angular/core'
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'lib-app',
  template: `

    <!-- Router -->
    <router-outlet></router-outlet>

  `
})
export class AppComponent {

  constructor(
    private router: Router){}

}
