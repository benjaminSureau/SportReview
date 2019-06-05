import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages = [
    {
      title: 'Home',
      url: '/menu/home',
      icon: 'home'
    },
    {
      title: 'Activities',
      url: '/menu/historic-activity',
      icon: 'list'
    },
    {
      title: 'Training',
      url: '/menu/training',
      icon: 'bicycle'
    }
  ];


  constructor() { }


  ngOnInit() {
  }

}
