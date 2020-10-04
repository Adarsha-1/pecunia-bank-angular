import { Component, OnInit } from '@angular/core';
import  {FormGroup, FormBuilder, Validators,FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import { AtmRegistry } from 'src/app/atm-registry';
import { AtmService } from 'src/app/atm.service';
import { OtpSystem } from 'src/app/otp-system';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-atm',
  templateUrl: './add-atm.component.html',
  styleUrls: ['./add-atm.component.css']
})
export class AddAtmComponent implements OnInit {

  searchFilter:FormGroup;
  verifyOtp:FormGroup;
  isSearch:boolean=true;
  accountValid:boolean=false;
  accountValidForm:boolean=false;
  isDone:boolean=false;
  otp:OtpSystem=new OtpSystem();
  otpList:Observable<String[]>;
  arrayString:String[];
  requestCard:boolean=false;
  otpVerify:OtpSystem=new OtpSystem();
  verifiedOtp:boolean;
  atmCardRequest:AtmRegistry=new AtmRegistry();
  accountNo:number;
  accountField:FormGroup;
  card:boolean;
  sucess:String;
  constructor( private atmService:AtmService,private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.searchFilter =this.formBuilder.group({
      
      id:['',[Validators.required]]
    });
    this.verifyOtp=this.formBuilder.group(
      {
        otp:['',[Validators.required]]
      }
    );

    this.accountField=this.formBuilder.group({
      no:['',[Validators.required]]
    });
  }
  Search()
  {
    if(this.searchFilter.valid)
    {
      this.atmService.accountValid(this.searchFilter.controls.id.value).subscribe(
        data =>
        {
          console.log("entered account number is: "+data)
          this.accountValidForm=data;
          this.accountNo=this.searchFilter.controls.id.value;
        }
      )
    }
    if(this.accountValidForm == true)
    {
      console.log("account verified and otp can be send")
      this.accountValid=true;
      this.isSearch=false;
      this.otp.mobileNumber="+917539921040";
      this.atmService.sendOtp(this.otp).subscribe(
        data=>
        {
          console.log(data);
        }
      )
    }
  }

  verify()
  {
    this.otpVerify.otp=this.verifyOtp.controls.otp.value;
    this.otpVerify.mobileNumber="+917539921040";
    console.log("entered otp is: "+this.verifyOtp.controls.otp.value);
    this.atmService.verifyOtp(this.otpVerify).subscribe(
      data=>
      {
        console.log("submit otp value is: "+data);
        this.otpList=data;
        window.alert(data);
        this.isSearch=false;
        this.requestCard=true;
      }
    )
    
  }

  request()
  {
    console.log("atm card request for account can be serviced");
    this.atmCardRequest.accountNumber=this.searchFilter.controls.id.value;
    this.atmService.requestCard(this.searchFilter.controls.id.value).subscribe(data=>
      {
        this.card=data;
        console.log(data);
        window.alert(data);
        this.isSearch=false;
        this.requestCard=false;
        this.accountValid=false;
        this.isDone=true;
        if(data ==true)
        {
          this.sucess="New Card request is sucessfull";
          this.router.navigate(['/add-atm'])
        }
      },
      error => 
      {
        //console.log(error);
        window.alert("card exists")
      })
  }

  refresh()
  {
    window.location.reload();
  }

}
