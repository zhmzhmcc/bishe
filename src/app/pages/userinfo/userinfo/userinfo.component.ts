import { Component, OnInit } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalService } from 'ng-zorro-antd';
import { Router} from '@angular/router'

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  isCollapsed = false;
  username:any

  constructor(
    private ModalService:NzModalService,
    private route:Router
    ) { }

  ngOnInit() {
    this.username = window.localStorage['userMajor']
  }
  loginout(){
    this.ModalService.confirm({
      nzTitle:'提示',
      nzContent:'确认退出吗？',
      nzOkText:"确认",
      nzCancelText:"取消",
      nzOnOk:()=>{
        this.route.navigate(['/login'])
      }
    })
  }

}
