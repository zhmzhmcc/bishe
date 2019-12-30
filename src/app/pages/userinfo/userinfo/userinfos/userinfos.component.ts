import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TimeHolder } from 'ng-zorro-antd/time-picker/time-holder';
import { NzModalService } from 'ng-zorro-antd';

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
  // 学院
  collegeTextList: any = [
    { 'code': "0", "value": "信息科学与工程学院" },
    { 'code': "1", "value": "演艺学院" },
  ];
  // 年级
  gradename: any = [
    { "value": '2016级', 'code': '0' },
    { "value": '2017级', 'code': '1' },
    { "value": '2018级', 'code': '2' },
    { "value": '2019级', 'code': '3' }
  ];
  // 专业
  applyMajorList: any = [
    { "value": '信管专业', 'code': '0' },
    { "value": '医信', 'code': '1' },
    { "value": '信工', 'code': '2' }
  ];
  searchId: any;
  manflag: boolean;
  constructor(
    private fb:FormBuilder,
    private http:HttpClient,
    private Modalservice:NzModalService
    ) { }

  ngOnInit() {
    for (let i = 0; i < 100; i++) {
      this.listOfData.push({
        name: `Edward King ${i} Edward King ${i} Edward King ${i}`,
        age: 32,
        address: `LondonLondonLondonLondonLondon`
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
          this.listOfData=this.verifyState(userdatas)
      }
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
  //查询数据
 //查询数据
 searchForm(){
  const contentForm = this.contentForm
  const contentFormValue=contentForm.value
  const searchnamevalue=contentFormValue.searchname;
  const searchNum=contentFormValue.searchNum;
  const collegename=contentFormValue.collegename;
  const grade=contentFormValue.grade;
  const project=contentFormValue.speciality;
  const searchData=[];
  this.listOfData.map((item)=>{
    if(collegename == item.xueyuan){
      console.log(item)
      searchData.push(item)
     this.listOfData=searchData
     return}
    // }else


    // if(searchnamevalue == item.name || searchNum == item.shopTel || searchnamevalue == item.name&&searchNum == item.shopTel){   
    //  searchData.push(item)
    //  this.listOfData=searchData
    //  return
    // }else if(searchnamevalue != item.name || searchNum != item.shopTel ){
    //   this.listOfData=[]
    // }
  })
  
  
}

}
