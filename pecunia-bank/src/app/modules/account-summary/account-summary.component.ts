import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AtmService } from 'src/app/atm.service';
import { PassbookServiceService } from 'src/app/passbook-service.service';
import { Transcation } from 'src/app/transcation';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.css']
})
export class AccountSummaryComponent implements OnInit {

  accountSummaryGroup:FormGroup;
  accountFields:FormGroup;
  isSearchFlag:boolean=true;
  isDateFlag:boolean=false;
  isTransactionFlag:boolean=false;
  transList:Transcation[];

  displayedColumns: string[] = ['transactionId', 'accountNo', 'transcationType', 'amount','date','status','balance'];
  dataSource;

  constructor(private formBuilder:FormBuilder, private atmService:AtmService, private passBookService:PassbookServiceService) { }

  ngOnInit(): void {
    this.accountFields=this.formBuilder.group({
      no:['',[Validators.required]]
    });
    this.accountSummaryGroup=this.formBuilder.group({
      fromDate:['',[Validators.required]],
      toDate:['',[Validators.required]]
    })
  }

  Search()
  {
    this.atmService.accountValid(this.accountFields.controls.no.value).subscribe(
      data=>
      {
        console.log(data);
        if(data == true)
        {
          this.isSearchFlag=false;
          this.isDateFlag=true;
        }
      },
      error => console.log(error)
    )
  }

  get AccountNumber()
  {
    return this.accountFields.get('no');
  }

  getSummary()
  {
    console.log("transaction list can be obtained");
    this.passBookService.accountSummary(this.accountFields.controls.no.value,this.accountSummaryGroup.controls.fromDate.value,this.accountSummaryGroup.controls.toDate.value).subscribe(
      data =>
      {
        this.transList=data;
        this.isTransactionFlag=true;
        this.isDateFlag=false;
        console.log(data);
        this.dataSource=new MatTableDataSource(this.transList);
      },
      error=>
      {
        window.alert("Give from and to date properly");
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  refresh()
  {
    window.location.reload();
  }
}
