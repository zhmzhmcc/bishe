import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { isTemplateRef, NzMessageService, NzTreeHigherOrderServiceToken } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;//登陆表单
  registerForm: FormGroup;//注册表单
  registerpsd: any;
  registerrespsd: any;
  flag:boolean=true;
  code: string;
  yzmcode: any;
  provinceTextList: any;
  cityTextList: any;
  schoolTextListdata: any;
  schoolTextList: any;
  loginusername:any;
  registername:any;

  constructor(
    private fb: FormBuilder,
    private modelService:NzModalService,
    private message:NzMessageService,
    private http:HttpClient,
    private route:Router) { }

  ngOnInit() {
    this.createSecurityCode();
    this.loginForm = this.fb.group({
      loginusername: [null, [Validators.required]],
      loginpassword: [null, [Validators.required]],
      yzmcode: [null, [Validators.required]],
    });
    this.registerForm = this.fb.group({
      provincename:[null, [Validators.required]],
      cityname:[null, [Validators.required]],
      schoolname:[null, [Validators.required]],
      registername:[null, [Validators.required]],
      registerpassword:[null, [Validators.required]],
      registerrepassword:[null, [Validators.required]]

    })
    this.http.get("../../assets/dynamicData/trainBase.json").subscribe((res)=>{
      this.provinceTextList= res['province_list'];
      this.cityTextList=res["city_list"];
      this.schoolTextListdata=res["school_list"][0];
      this.schoolTextList=this.schoolTextListdata['131000'];
    })
  }
  //登陆提交
  submitForm(): void {
    const loginForm = this.loginForm
    const { controls } = loginForm
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
    if (!loginForm.valid) {
      this.message.info('请填写完整信息', {
        nzDuration: 1000, 
        nzPauseOnHover: true,
        nzAnimate: true
      })
      return
    }
    if (this.yzmcode.toLowerCase() != this.code.toLowerCase()) {
      this.message.info("验证码不对",{
        nzDuration: 1000, 
        nzPauseOnHover: true,
        nzAnimate: true
      })
    } else if(!this.yzmcode){
      this.message.info("请输入验证码",{
        nzDuration: 1000, 
        nzPauseOnHover: true,
        nzAnimate: true
      })
    }
    else{
      const {loginusername,loginpassword,yzmcode  } = loginForm.value;
      const loginParams = {
        loginusername,
        loginpassword,
        yzmcode
      }
      const loginFormVal=loginForm.value;
      console.log(loginFormVal);
      window.localStorage['userMajor']=loginFormVal.loginusername
      this.route.navigate(['/userinfo/userinfos'])
    }
  }
  //注册提交
  registersubmitForm():void{
    const registerForm = this.registerForm
    const { controls } = registerForm
    if (!registerForm.valid) {
      this.message.info('请填写完整信息', {
        nzDuration: 1000, 
        nzPauseOnHover: true,
        nzAnimate: true
      })
      return
    }
    if (this.registerpsd != this.registerrespsd) {
      this.message.error("两次输入密码不正确",{
        nzDuration: 1000, 
        nzPauseOnHover: true,
        nzAnimate: true
      })
    }else{
      this.modelService.info({
        nzTitle: '提示',
        nzContent: "注册成功",
        nzOnOk:()=>{
          //this.route.navigate(['/login'])
        }
      })  
      this.flag=true
      this.loginusername=this.registername
    }
  }
  //创建验证码
  createSecurityCode(){
   this.code='';
   var len=4;
   var chars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
   'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F',
   'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
   ];
   for (var i = 0;i < len; i++){
    var index = Math.floor(62 * Math.random());
    this.code = this.code + "" + chars[(index)];
   }
  }
  //注册
  LoginRegister(){
    this.flag = false;
  }
  RegisterLogin(){
    this.flag = true
  }
  //选择城市改变学校
  cityChange(e){
     this.schoolTextList = this.schoolTextListdata[e]
  }
  

}

