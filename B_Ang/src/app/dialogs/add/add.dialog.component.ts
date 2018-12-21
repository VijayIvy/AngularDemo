import {MAT_DIALOG_DATA, MatDialogRef,MatIconModule} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../services/data.service';
import {FormControl, Validators} from '@angular/forms';
import {Issue} from '../../models/issue';
import { MatGridListModule, MatGridList, MatGridTile, MatGridTileText } from '@angular/material/grid-list';
import { NgxWidgetGridModule } from 'ngx-widget-grid';
@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css'],
  
})

export class AddDialogComponent {
showWidgtOne :boolean=true;
showWidgtTwo :boolean=false;
showWidgtThree :boolean=false;
currentPage:number=1;

  constructor(public dialogRef: MatDialogRef<AddDialogComponent,any,any>,
              @Inject(MAT_DIALOG_DATA) public data: Issue,
              public dataService: DataService) { }

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

  public confirmAdd(): void {
    this.dataService.addIssue(this.data);
  }


  WidgetChange(delta: number){
 // alert("Add.Compnt: "+delta);
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
