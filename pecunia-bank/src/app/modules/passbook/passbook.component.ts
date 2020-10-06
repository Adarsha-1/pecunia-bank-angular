import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule ,Validators} from '@angular/forms';
import { AtmService } from 'src/app/atm.service';
import { PassbookServiceService } from 'src/app/passbook-service.service';
import { OtpSystem } from 'src/app/otp-system';
import {Transcation} from 'src/app/transcation';
import { MatTableDataSource } from '@angular/material/table';
import * as jsPDF from 'jspdf';
import * as html2pdf from'html2pdf.js';




// interface jsPDFWithPlugin extends jsPDF{
//   autotable:(options:UserOptions) =>jsPDF;
// }

@Component({
  selector: 'app-passbook',
  templateUrl: './passbook.component.html',
  styleUrls: ['./passbook.component.css']
})
export class PassbookComponent implements OnInit {


  @ViewChild('content') content:ElementRef;

  isSearchFlag:boolean=true;
  searchFilter:FormGroup;
  verifyOtp:FormGroup;
  isOtpFlag:boolean=false;
  isUpdateFlag:boolean=false;
  isOtpVerifyFlag:boolean=false;
  isTransactionFlag:boolean=false;

  otp:OtpSystem=new OtpSystem();
  otpVerify:OtpSystem=new OtpSystem();
  isOtpVerify:String[];
  otpString:String;
  transList:Transcation[];
  accountValidString:String;
  accountNumberPattern="(2)[0-9]{9}";
  otpPattern="[0-9]{4}";

  displayedColumns: string[] = ['transactionId', 'accountNo', 'transcationType', 'amount','date','status','balance'];
  stringArray:string;
  dataSource;

  constructor(private atmService:AtmService,private passBookService:PassbookServiceService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.searchFilter=this.formBuilder.group({
      id:['',[Validators.required,Validators.pattern(this.accountNumberPattern)]]
    });

    this.verifyOtp=this.formBuilder.group(
      {
        otp:['',[Validators.required,Validators.pattern(this.otpPattern)]]
      }
    );

  }

  Search()
  {
    this.atmService.accountValid(this.searchFilter.controls.id.value).subscribe(
      data=>
      {
        console.log(data);
        if(data ==true)
        {
          this.isOtpFlag=true;
          this.isSearchFlag=false;
          this.isUpdateFlag=true;
        //   this.otp.mobileNumber="+917539921040";
        //   this.atmService.sendOtp(this.otp).subscribe(
        //     data=>
        //     {
        //       console.log(data);
        //       if(data == false)
        //       {
        //         this.accountValidString="Account no is not found";
        //       }
        //       else
        //       {
        //         this.accountValidString="";
        //       }
        //     }
        //   )
         }
         else{
           this.accountValidString="Account no not found";
         }
      }
    )
  }

  get AccountNumber()
  {
    return this.searchFilter.get('id');
  }

  get otpNumber()
  {
    return this.verifyOtp.get('otp');
  }

  // verify()
  // {
  //   this.otpVerify.otp=this.verifyOtp.controls.otp.value;
  //   this.otpVerify.mobileNumber="+917539921040";
  //   this.isOtpVerifyFlag=true;
  //   this.atmService.verifyOtp(this.otpVerify).subscribe(
  //     data=>
  //     {
  //       this.isOtpVerify=data;
  //       console.log(data);
  //       this.otpString=this.isOtpVerify[0];
  //       if(this.isOtpVerify.includes("Otp is verified"))
  //       {
  //         this.isOtpFlag=false;
  //         console.log("Sucessssssssssssss")
  //         this.isUpdateFlag=true;
  //         this.isOtpVerifyFlag=false;
  //       }
  //     }
  //   )
  // }

  Update()
  {
    this.passBookService.updatePassBook(this.searchFilter.controls.id.value).subscribe(
      data=>
      {
        this.transList=data;
        console.log(data);
        this.isTransactionFlag=true;
        this.isUpdateFlag=false;
        this.dataSource=new MatTableDataSource(this.transList);

      }
    )
  }

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  Print()
  {
    // this.stringArray=this.transList.toString();
    // const blob=new Blob([this.stringArray],{type:'application/pdf'});
    // const filename='example.pdf';
    // saveAs(blob,filename);
  }

  download()
  {
    const options = {
      name:'output.pdf',
      image:{type:'jpeg'},
      html2canvas:{},
      jsPDF:{orientation:'landscape'}
    }

    const element:Element=document.getElementById('content')

    html2pdf().from(element).set(options).save()
  }

   downloadPDF()
  {
    // let DATA = this.content.nativeElement;
    // let doc = new jsPDF();

    // let handleElement = {
    //   '#editor':function(element,renderer){
    //     return true;
    //   }
    // };
    // doc.fromHTML(DATA.innerHTML,15,15,{
    //   'width': 200,
    //   'elementHandlers': handleElement
    // });

    // doc.save('angular-demo.pdf');


  }
  refresh()
  {
    window.location.reload();
  }


}
