import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-useradd',
  templateUrl: './useradd.component.html',
  styleUrls: ['./useradd.component.css']
})
export class UseraddComponent implements OnInit {
  init_index = 0;  //步骤条初始值
  disable = false;
  contentForm: any;
  modifyForm: any;
  isShow:boolean = true; //判断上一步是否显示
  btn_value:any = '下一步' 
  onIndexChange(event: number): void {
    this.init_index = event;
  }
  constructor(
    private fb: FormBuilder,

  ) { }
  

  ngOnInit() {

    this.modifyForm = this.fb.group({
      username:[null, [Validators.required]],
      userSex:[],
      searchNum:[null, [Validators.required]],
      collegename:[],
      grade:[],
      project:[],
      education:[]
    });


  }
  //鼠标点击下一步
  new_next_btn(){
   
    if(this.init_index <1 ){
      this.init_index++;
      this.isShow = false
     
    }else if(this.init_index = 2){
       this.init_index = 2
      this.btn_value = '完成'
    } 
  }

  //鼠标点击上一步
  new_prevent_btn(){
    this.init_index--;

    if(this.init_index == 0){
      this.init_index = 0
      this.isShow = true

    }else if(this.init_index <2){
      this.btn_value = '下一步'

    }else{

    }
  }

}
