import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TimeHolder } from 'ng-zorro-antd/time-picker/time-holder';

@Component({
  selector: 'app-userinfos',
  templateUrl: './userinfos.component.html',
  styleUrls: ['./userinfos.component.css']
})
export class UserinfosComponent implements OnInit {
  contentForm:FormGroup;
  basedataAry:any;
  flag: any;
  listOfData = [];

  constructor(
    private fb:FormBuilder,
    private http:HttpClient
    ) { }

  ngOnInit() {
    for (let i = 0; i < 100; i++) {
      this.listOfData.push({
        name: `Edward King ${i}`,
        age: 32,
        address: `London`
      });
    }
    this.contentForm = this.fb.group({
      collegename: [null, [Validators.required]],
      grade: [null, [Validators.required]],
      speciality: [null, [Validators.required]],
      searchname: [null, [Validators.required]],
      searchNum: [null, [Validators.required]]
    });
    this.http.get('http://localhost:3000/user').subscribe((res)=>{
      console.log(res)
      const userdatas=res             
      if (userdatas && Array.isArray(userdatas) && userdatas.length > 0){
          this.basedataAry=this.verifyState(userdatas)
      }
      console.log(this.basedataAry)
      this.flag=res['flag'];     

    })
    
  }
   //审核状态
   verifyState(data){
    const datas=data.map((item)=>{
      const {state} = item; 
      return {
        ...item,
        noflag: state == '0' ? false : state == '2' ? true : '',
        flag: state == '0' ? false : state == '1' ? true : '',
        passflag : state == '0' ? false : state == '1' ? true : '',
        state : state == '0' ? '未审核': state == '1' ? '审核通过' : '审核未通过'
      }
   })
   return datas
  }
  //选择审核
  mapOfCheckedId(){}

}
