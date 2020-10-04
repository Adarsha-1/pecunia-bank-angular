import { Component, OnInit } from '@angular/core';
import  {FormGroup, FormBuilder, Validators,FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AtmRegistry } from 'src/app/atm-registry';
import { AtmService } from 'src/app/atm.service';
import { OtpSystem } from 'src/app/otp-system';

@Component({
  selector: 'app-block-card',
  templateUrl: './block-card.component.html',
  styleUrls: ['./block-card.component.css']
})
export class BlockCardComponent implements OnInit {

  searchFilter:FormGroup;
  isSearchFlag:boolean=true;
  verifyOtp:FormGroup;
  cardField:FormGroup;
  isOtpFlag:boolean=false;

  otp:OtpSystem=new OtpSystem();
  cardFound:boolean=false;
  otpList:Observable<String[]>;
  isCardBlockFlag:boolean=false;

  otpVerify:OtpSystem=new OtpSystem();
  blockCardRegistry:AtmRegistry=new AtmRegistry();

  isDoneFlag:boolean=false;
  sucess:String;
  
  constructor(private atmService:AtmService,private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.searchFilter =this.formBuilder.group({
      
      id:['',[Validators.required]]
    });

    this.verifyOtp=this.formBuilder.group(
      {
        otp:['',[Validators.required]]
      }
    );

    this.cardField=this.formBuilder.group({
      no:['',[Validators.required]]
    })
  }

  Search()
  {
    this.atmService.cardExists(this.searchFilter.controls.id.value).subscribe(
      data=>
      {
        console.log(data);
        this.cardFound=data;
        if(data ==false)
        {
          window.alert("Atm card number doesn't exists");
          

        }
        
      }
    )

    if(this.cardFound==true)
    {
      this.isOtpFlag=true;
      this.isSearchFlag=false;
      this.otp.mobileNumber="+917539921040"
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
    this.atmService.verifyOtp(this.otpVerify).subscribe(
      data=>
      {
        console.log("submit otp value is: "+data);
        this.otpList=data;
        window.alert(data);
        this.isCardBlockFlag=true;

      }
    )
  }
  request()
  {
    console.log("card can be blocked for servie");
    this.atmService.cardBlock(this.searchFilter.controls.id.value).subscribe(
      data=>
      {
        this.blockCardRegistry=data;
        console.log(data);
        window.alert("Card is blocked");
        this.isDoneFlag=true;
        this.isOtpFlag=false;
        this.isCardBlockFlag=false;
        this.sucess="Card is blocked sucessfully"
      }
    )

  }

  refresh()
  {
    window.location.reload();
  }

}
