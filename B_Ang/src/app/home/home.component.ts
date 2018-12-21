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
  xpandScreen1Status = true;
  xpandScreen2Status = false;
  xpandScreen3Status = false;
  xpandScreen4Status = false;
  xpandScreen5Status = false;
  xpandScreen6Status = false;
  xpandScreen7Status = false;
  xpandScreen8Status = false;
  xpandScreen9Status = false;
  xpandScreen10Status = false;
  xpandScreen11Status = false;


  OpenScreen(Search: string, event) {
    console.log('Search Input' + Search)
    if (this.xpandScreen11Status) {
      this.xpandScreen11Status = false;
    } else {
      this.xpandScreen11Status = true;
    }

    if (this.xpandScreen10Status) {
      this.xpandScreen11Status = false;
    } else {
      this.xpandScreen10Status = true;
    }

  }

  OpenScreenDrop(Search: string, event) {
    console.log('SearchDrop Input: ' + Search)
    if (Search == 'panal11') {
      console.log('SearchDrop Panal11: ' + Search)
      if (this.xpandScreen11Status) {
        this.xpandScreen11Status = false;
      } else {
        this.xpandScreen11Status = true;
      }
    }
    if (Search == 'panal10') {
      console.log('SearchDrop Panal10: ' + Search)
      if (this.xpandScreen10Status) {
        this.xpandScreen10Status = false;
      } else {
        this.xpandScreen10Status = true;
      }
    }
    if (Search == 'panal9') {
      console.log('SearchDrop9: ' + Search)
      if (this.xpandScreen9Status) {
        this.xpandScreen9Status = false;
      } else {
        this.xpandScreen9Status = true;
      }
    }
    if (Search == 'panal8') {
      console.log('SearchDrop Panal8: ' + Search)
      if (this.xpandScreen8Status) {
        this.xpandScreen8Status = false;
      } else {
        this.xpandScreen8Status = true;
      }
    }
    if (Search == 'panal7') {
      console.log('SearchDrop Panal7: ' + Search)
      if (this.xpandScreen7Status) {
        this.xpandScreen7Status = false;
      } else {
        this.xpandScreen7Status = true;
      }
    }
    if (Search == 'panal6') {
      console.log('SearchDrop Panal6: ' + Search)
      if (this.xpandScreen6Status) {
        this.xpandScreen6Status = false;
      } else {
        this.xpandScreen6Status = true;
      }
    }
    if (Search == 'panal5') {
      console.log('SearchDrop Panal5: ' + Search)
      if (this.xpandScreen5Status) {
        this.xpandScreen5Status = false;
      } else {
        this.xpandScreen5Status = true;
      }
    }
    if (Search == 'panal4') {
      console.log('SearchDrop Panal4: ' + Search)
      if (this.xpandScreen8Status) {
        this.xpandScreen8Status = false;
      } else {
        this.xpandScreen8Status = true;
      }
    }
    if (Search == 'panal3') {
      console.log('SearchDrop Panal3: ' + Search)
      if (this.xpandScreen3Status) {
        this.xpandScreen3Status = false;
      } else {
        this.xpandScreen3Status = true;
      }
    }
    if (Search == 'panal2') {
      console.log('SearchDrop Panal2: ' + Search)
      if (this.xpandScreen2Status) {
        this.xpandScreen2Status = false;
      } else {
        this.xpandScreen2Status = true;
      }
    }
    if (Search == 'panal1') {
      console.log('SearchDrop Panal1: ' + Search)
      if (this.xpandScreen1Status) {
        this.xpandScreen1Status = false;
      } else {
        this.xpandScreen1Status = true;
      }
    }



  }

}
