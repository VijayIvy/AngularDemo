import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  constructor() { }

  ngOnInit() {
  }

  ParseXmlToJson() {

    // // let parseString = require('xml2js').parseString;
    // // let xml = "<root>Hello xml2js!</root>"

    // // parseString(xml, function (err, result) {
    // //   console.dir(result);
    // });

  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  xpandStatus = true;
  xpandScreen11Status = true;

  OpenScreen(Search: string, event) {
    console.log('Search Input' + Search)
    if (this.xpandScreen11Status) {
      this.xpandScreen11Status = false;
    } else {
      this.xpandScreen11Status = true;
    }

  }

}
