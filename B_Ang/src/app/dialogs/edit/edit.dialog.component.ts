import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../services/data.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: '../../dialogs/edit/edit.dialog.html',
  styleUrls: ['../../dialogs/edit/edit.dialog.css']
})
export class EditDialogComponent {
//emp: any=[{name:"bhabeshOne",id:111},{name:"bhabeshTwo",id:222},{name:"bhabeshThree",id:333},{name:"bhabeshFour",id:444}];
showWidgtOne :boolean=true;
showWidgtTwo :boolean=false;
showWidgtThree :boolean=false;
currentPage:number=1;

lobName:any=[{name:"Life",id:"Life"},{name:"DI",id:"DI"}];
  constructor(public dialogRef: MatDialogRef<EditDialogComponent,any,any>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.dataService.updateIssue(this.data);
  }

WidgetChange(delta: number){
  //alert("Add.Compnt: "+event);
   this.currentPage += delta;
    if(this.currentPage>3){
  this.currentPage=3
   }if(this.currentPage<0){
  this.currentPage=1
}
 if(this.currentPage==1){
   this.showWidgtOne=true;
   this.showWidgtTwo=false; 
   this.showWidgtThree=false; 
}if(this.currentPage==2){
   this.showWidgtOne=false;
  this.showWidgtTwo=true; 
  this.showWidgtThree=false; 
}if(this.currentPage==3){
  this.showWidgtOne=false;
  this.showWidgtTwo=false; 
  this.showWidgtThree=true; 
  }
 
}

}
