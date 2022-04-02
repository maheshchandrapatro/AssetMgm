import { Component,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { navItems } from './_nav';

@Component({
  selector: 'app-default',
  templateUrl: './default-layout.component.html',

})
export class DefaultLayoutComponent {

  public navItems = navItems;
  isDispUser:boolean=false;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private route:Router) {
      const user= localStorage.getItem("isdispatchUser");
      console.log(user);
  }

  ngOnInit(): void {
    this.route.navigate(['admin/newasset'])
  }

}
