import { Component, OnInit } from '@angular/core';
import { SubmitService } from '../services/submit.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  record:any

  constructor(public ps: SubmitService) { }

  ngOnInit(): void {
  }
  viewrecord(){
    this.ps.getallrecord().subscribe((data:any)=>{
      this.record=data
    })
  }
}
