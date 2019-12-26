import { Component, OnInit } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  isCollapsed = false;
  username:any

  constructor() { }

  ngOnInit() {
    this.username = window.localStorage['userMajor']
  }

}
