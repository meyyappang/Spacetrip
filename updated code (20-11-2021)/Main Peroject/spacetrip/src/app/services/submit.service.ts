import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubmitService {
  

  constructor(public http:HttpClient) { }

  addrecord(x:any) {
    return this.http.post<any>('http://localhost:3091/addrecordinfo', x);
  }
  test_addrecord(x:any) {
    return this.http.post<any>('http://localhost:3091/testaddrecordinfo', x);
  }
  getallrecord(){
    return this.http.get<any>("http://localhost:3091/record");
  }
  
}
