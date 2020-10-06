import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassbookServiceService {

  private baseUrl="http://localhost:8083/pass/"
  constructor(private http:HttpClient,private router:Router) { }

  accountSummary(id:number,fromDate:String,todate:String):Observable<any>
  {
    let url=this.baseUrl+"summ/"+id+"/"+fromDate+"/"+todate;
    return this.http.get(url);
  }

  updatePassBook(id:number):Observable<any>
  {
    let url=this.baseUrl+"req/"+id;
    return this.http.get(url);
  }
}
