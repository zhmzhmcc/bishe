import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
  contentForm: FormGroup;
  basedataAry: any;
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
  passbasedataAry: any[];
  nopassbasedataAry: any[];
  index: any;
  mapOfCheckedId: { [key: string]: boolean } = {};
  isAllDisplayDataChecked: boolean = false;
  isIndeterminate = false;
  multistr: any = [];
  multistring: any = [];
  userSexList:any=[
    { "text":'男','code':'0'},
    { "text":'女','code':'1'},

   ]
  validateForm: FormGroup;
  Infoflag:boolean = true;
  userSex :any ;
  modifyForm: FormGroup;
  username: any;
  searchNum: any;
  collegename: any;
  grade: any;
  type: any;
  isVisible : boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private Modalservice: NzModalService
  ) { }

  ngOnInit() {

    this.contentForm = this.fb.group({
      collegename: [null, [Validators.required]],
      grade: [null, [Validators.required]],
      speciality: [null, [Validators.required]],
      searchname: [null, [Validators.required]],
      searchNum: [null, [Validators.required]]
    });
    this.modifyForm = this. fb.group({
      username:[null, [Validators.required]],
      userSex:[],
      searchNum:[null, [Validators.required]],
      collegename:[],
      grade:[],
      project:[],
     



    })
    
    this.http.get('http://localhost:3000/user').subscribe((res) => {
      console.log(res)
      const userdatas = res
      if (userdatas && Array.isArray(userdatas) && userdatas.length > 0) {
        this.listOfData = this.verifyState(userdatas)
      }
      this.flag = res['flag'];
    })
  }
  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.basedataAry.every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.basedataAry.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
  }

  //查询数据
  //查询数据
  

  searchForm()
   {
    const contentForm = this.contentForm
    const contentFormValue = contentForm.value
    const searchnamevalue = contentFormValue.searchname;
    const searchNum = contentFormValue.searchNum;
    const collegename = contentFormValue.collegename;
    const grade = contentFormValue.grade;
    const project = contentFormValue.speciality;
    const searchData = [];
    if(searchnamevalue == '' && searchNum == '' && collegename == '' && grade == '' && project == ''){
         this.listOfData = this.listOfData
    }else{
      this.listOfData.map((item) => {
        if (collegename == item.xueyuan) {
          console.log(item)
          searchData.push(item)
          this.listOfData = searchData
          return
        }
  
      })

    }
    
  }

  //单条审核通过
  passinfo(i) {
    this.listOfData[i].state = '1';
    this.singleverifyState(this.listOfData[i]);
    this.passbasedataAry = this.listOfData;
  }

  //单条审核不通过
  nopassinfo(i) {
    this.listOfData[i].state = '2';
    this.singleverifyState(this.listOfData[i]);
    this.nopassbasedataAry = this.listOfData
  }

  //所选单挑数据
  selectinfo(i) {
    this.listOfData.forEach((item, index) => {
      if (i === index) {
        console.log(this.mapOfCheckedId[item.id])
        if (this.mapOfCheckedId[item.id] == true) {
          this.multistr.push(item);
          console.log(this.multistr)
        } else {
          this.multistr.splice(this.multistr.indexOf(item.id), 1);
        }
      }
    })
  }

  //所选审核通过
  selectpass() {
    if (this.multistr == '') {
      this.Modalservice.info({
        nzTitle: '提示',
        nzContent: '请至少选择1条数据'
      })
    } else {
      const length=this.multistr.length;
      this.Modalservice.success({
        nzTitle:'提示',
        nzContent:length+'条数据审核通过'
      })
      this.multistr.map((item) => {
        item.state = '1'
        this.singleverifyState(item)
        this.mapOfCheckedId[item.id] = false
      })
      this.multistr = []
      
    }
  }

  //所选审核不通过
  selectnopass() {
    if (this.multistr == '') {
      this.Modalservice.info({
        nzTitle: '提示',
        nzContent: '请至少选择1条数据'
      })
    } else {
      const length=this.multistr.length;
      this.Modalservice.success({
        nzTitle:'提示',
        nzContent:length+'条数据审核不通过'
      })
      this.multistr.map((item) => {
        item.state = '2'
        this.singleverifyState(item)
        this.mapOfCheckedId[item.id] = false
      })
      this.multistr = []
    }
  }

  //全部审核通过
  checkAll(value: boolean): void {
    this.listOfData.forEach((item) => {
      if (this.mapOfCheckedId[item.id] = value) {
        this.multistr.push(item);
      }
    }
    );
  }
  selectallpass() {
    if (this.multistr == '') {
      this.Modalservice.info({
        nzTitle: '提示',
        nzContent: '请至少选择1条数据'
      })
    } else {
      const length=this.multistr.length;
      this.Modalservice.success({
        nzTitle:'提示',
        nzContent:length+'条数据审核通过'
      })
      this.multistr.map((item) => {
        item.state = 1
        this.singleverifyState(item)
        this.mapOfCheckedId[item.id] = false
        this.isAllDisplayDataChecked = false
      })
      this.multistr=[]
    }
  }
  //查看或修改信息
  showModal(i,type){
    this.type = type;
    if(type == 'edit'){
      this.isVisible = true;
      const itemdata = this.listOfData[i]
      console.log(itemdata)
      this.Infoflag = false;
      this.username = itemdata.name
      this.userSex= itemdata.sex;
      this.searchNum = itemdata.number;
      this.collegename = itemdata.collegename;
      this.grade = itemdata.grade;


    }else{
      this.isVisible = true;
      const itemdata = this.listOfData[i]
      console.log(itemdata)
      this.Infoflag = false;
      this.username = itemdata.name
      this.userSex= itemdata.sex;
      this.searchNum = itemdata.number;
      this.collegename = itemdata.collegename;
      this.grade = itemdata.grade;


    }
    


  }
  handleCancel(){
    this.isVisible = false;
    
  }
  //查看用户信息
  checkinfo(i){
    const itemdata = this.listOfData[i]
    console.log(itemdata)
    this.Infoflag = false;
    this.username = itemdata.name
    this.userSex= itemdata.sex;
    this.searchNum = itemdata.number;
    this.collegename = itemdata.collegename;
    this.grade = itemdata.grade;
  

  }
  //

  //关闭用户信息
  checkinfoClose(){
    this.Infoflag = true;
  }


  //审核状态
  verifyState(data) {
    const datas = data.map((item) => {
      const { state } = item;
      return {
        ...item,
        noflag: state == '0' ? false : state == '2' ? true : '',
        flag: state == '0' ? false : state == '1' ? true : '',
        passflag: state == '0' ? false : state == '1' ? true : '',
        state: state == '0' ? '未审核' : state == '1' ? '审核通过' : '审核不通过'
      }
    })
    return datas
  }
  //单个审核状态
  singleverifyState(item) {
    item.state = item.state == '0' ? '未审核' : item.state == '1' ? '审核通过' : '审核不通过'
    item.passflag = item.state == '未审核' ? false : item.state == '审核通过' ? true : ''
    item.noflag = item.state == '未审核' ? false : item.state == '审核不通过' ? true : ''
    item.flag = item.state == '未审核' ? false : item.state == '审核通过' ? true : ''
  }
}
