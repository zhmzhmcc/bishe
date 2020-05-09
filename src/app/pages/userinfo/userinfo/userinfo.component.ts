import { Component, OnInit } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalService } from 'ng-zorro-antd';
import { Router, NavigationStart, NavigationEnd} from '@angular/router'
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  isCollapsed = false;
  username:any
  configMenu: any[];
  //生明订阅对象
  rooterChange: Subscription;

  constructor(
    private ModalService:NzModalService,
    private route:Router
    ) { }

  ngOnInit() {
    this.username = window.localStorage['userMajor']
    this.configMenu = [
      {
        title: "用户列表",
        icon: "user",
        path: "/userinfo/userinfos",
        open: true,
        disabled: false,
        children: [
          {
            title: "用户列表",
            path: "userinfo/userinfos",
            selected: false,
            disabled: false,
          },
    
        ],
        
      },
      {
        title: "用户添加",
        icon: "team",
        path: "/userinfo/useradd",
        open: true,
        disabled: false,
        children: [
          {
            title: "用户添加",
            path: "userinfo/useradd",
            selected: false,
            disabled: false,
          },
    
        ],
        
      },
      {
        title: "数据统计",
        icon: "bar-chart",
        path: "/userinfo/statistic",
        open: true,
        disabled: false,
        children: [
          {
            title: "数据统计",
            path: "/userinfo/statistic",
            selected: false,
            disabled: false,
          },
          {
            title: "数据导出",
            path: "userinfo/exportdata",
            selected: false,
            disabled: false,
          },
    
        ],
        
      },
    ]
    this.configMenu.forEach(item=>{
      if(item.title == '用户列表'){
        item.children[0].selected = true
      }
    })
    //监听路由变化
    this.listenRouterChange()

    
  }
  ngOnDestroy() {
    if (this.rooterChange) {
      this.rooterChange.unsubscribe();
    }else{
      console.log("路由没有改变")
    }
    
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
  editpsd(){

  }



  navClick(menu){
    console.log(menu)
    if(menu.path && !menu.children){
      this.route.navigate([menu.path])
      menu.selected = true
    }else{
      menu.selected = false

    }

  }
  /**
 * 监听路由变化
 */
listenRouterChange() {
  this.rooterChange = this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
          console.log("路由改变")
      }
  });
}


}
