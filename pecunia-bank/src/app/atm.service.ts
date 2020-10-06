import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtmService {

  private baseUrl="http://localhost:8082/atm/api";
  constructor(private http:HttpClient,private router:Router) { }

  addAtmCaerRequest(account:number):Observable<any>
  {
    let url=this.baseUrl+"/request/"+account;
    return this.http.get(url);
  }

  accountValid(id:number):Observable<any>
  {
    let url="http://localhost:8081/account/valid/"+id;
    return this.http.get(url);

  }

  getAccountNo(id:number):Observable<any>
  {
    let url=this.baseUrl+"/account/"+id;
    return this.http.get(url);
  }

  getAccountPhoneNumber(id:number):Observable<any>
  {
    let url="http://localhost:8081/contact/accountNo/"+id;
    return this.http.get(url);
  }
  sendOtp(otp:object):Observable<any>
  {
    let url="http://localhost:8085/otp/mobilenumber";
    return this.http.post(url,otp);
  }

  verifyOtp(otp:object):Observable<any>
  {
    let url="http://localhost:8085/otp/mobilenumbers/verify";
    return this.http.put(url,otp);

  }

  requestCard(id:number):Observable<any>
  {
    let url="http://localhost:8082/atm/api/request/"+id;
    return this.http.get(url);
  }

  cardExists(id:number):Observable<any>
  {
    let url="http://localhost:8082/atm/api/valid/"+id;
    return this.http.get(url);
  }

  cardBlock(id:number):Observable<any>
  {
    let url="http://localhost:8082/atm/api/"+id;
    return this.http.get(url);
  }
  
  
}
