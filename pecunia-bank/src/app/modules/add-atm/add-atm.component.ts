import { Component, OnInit } from '@angular/core';
import  {FormGroup, FormBuilder, Validators,FormControl} from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { AtmRegistry } from 'src/app/atm-registry';
import { AtmService } from 'src/app/atm.service';
import { OtpSystem } from 'src/app/otp-system';
import {Router} from '@angular/router';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

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
  isOtpVerifyFlag:boolean=false;
  isDone:boolean=false;
  otp:OtpSystem=new OtpSystem();
  otpList:String[];
  arrayString:String[];
  requestCard:boolean=false;
  otpVerify:OtpSystem=new OtpSystem();
  verifiedOtp:boolean;
  atmCardRequest:AtmRegistry=new AtmRegistry();
  accountNo:number;
  accountField:FormGroup;
  card:boolean;
  sucess:String;
  otpVerifymsg:String;
  isValidAtm:boolean=false;
  atmNumberPattern="(2)[0-9]{9}";
  otpPattern="[0-9]{4}";
  accountValidString:String;
  phoneString:String;
  error=null;
  
  constructor( private atmService:AtmService,private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.searchFilter =this.formBuilder.group({
      
      id:['',[Validators.required,Validators.pattern(this.atmNumberPattern)]]
    });
    this.verifyOtp=this.formBuilder.group(
      {
        otp:['',[Validators.required,Validators.pattern(this.otpPattern)]]
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
          if(data == false)
          {
            this.accountValidString="Account number is not found"
          }
          else
          {
            this.accountValidString=""
          }
        }
      )
    }
    if(this.accountValidForm == true)
    {
      console.log("account verified and otp can be send")
      this.accountValid=true;
      this.isSearch=false;
      this.atmService.getAccountPhoneNumber(this.searchFilter.controls.id.value).subscribe(
        data=>
        {
          console.log("Phone number is: "+data);
          this.phoneString="+91"+data;
          console.log("Obtained Phone number is: "+this.phoneString)
          this.otp.mobileNumber=this.phoneString
          console.log("after "+this.otp.mobileNumber);
          this.atmService.sendOtp(this.otp).subscribe(
            data=>
              {
                console.log(data);
              }
            )
        },
        error => console.log("Data cant")
      )
      
      
    }
  }

  get AccountNumber()
  {
    return this.searchFilter.get("id");
  }

  get otpNumber()
  {
    return this.verifyOtp.get("otp");
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
        this.isOtpVerifyFlag=true;
        this.otpVerifymsg=this.otpList[0];
        if(this.otpList.includes("Otp is verified"))
        {
          console.log("Entereed otp sucess if")
          this.isOtpVerifyFlag=false;
          this.requestCard=true;
          this.accountValid=false;
        }
      }
    )
    
  }

  request()
  {
    console.log("atm card request for account can be serviced");
    this.atmCardRequest.accountNumber=this.searchFilter.controls.id.value;
    this.atmService.requestCard(this.searchFilter.controls.id.value).pipe(catchError((error:HttpErrorResponse)=>
    {
      //window.alert(error.error.message);
      return throwError("Card already exists");
    }))
    .subscribe(data=>
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
        this.error=error.message;
        
        window.alert("Card already exists");
        window.location.reload();
      })
  }

  refresh()
  {
    window.location.reload();
  }

}
