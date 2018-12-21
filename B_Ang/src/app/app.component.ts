import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from './services/data.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Issue} from './models/issue';
import {DataSource} from '@angular/cdk/collections';
import {AddDialogComponent} from './dialogs/add/add.dialog.component';
import {EditDialogComponent} from './dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from './dialogs/delete/delete.dialog.component';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { MatGridListModule, MatGridList, MatGridTile, MatGridTileText } from '@angular/material';
import { NgxWidgetGridModule } from 'ngx-widget-grid';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  displayedColumns = ['index', 'id','docid', 'docautorecive', 'scanningpath', 'realpolicynum', 'ispolicyactive', 'iscaseonwb', 'routingidtypelist','lineofbusiness','internalstatusvalid', 'actions'];
  exampleDatabase: DataService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;
  
  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: DataService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew(issue: Issue) {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {issue: issue },panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, id: number, docid: number, docautorecive:string, scanningpath: string, realpolicynum: string, ispolicyactive: string, iscaseonwb: string, routingidtypelist: string,lineofbusiness: string,internalstatusvalid: string, internalstatusinvalid:String,
  casestatusvalid:string, casestatusinvalid:string, applicationtypevalid:string, applicationtypeinvalid:string, plan:string, replacementlist:string, fieldreporting:string, isunderwriterassigned:string, isunderwriteridvalid:string, unitcodevalid:string,
  unitcodeinvalid:string, notificationthrough:string, sharedworklistid:string, underwriterworkListid:string, processcoordinatormethod:string, documentroutingtype:string) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {id: id, docid: docid, docautorecive:docautorecive, scanningpath: scanningpath, realpolicynum: realpolicynum, ispolicyactive: ispolicyactive, iscaseonwb: iscaseonwb, routingidtypelist: routingidtypelist, lineofbusiness: lineofbusiness, internalstatusvalid: internalstatusvalid, internalstatusinvalid:internalstatusinvalid, casestatusvalid:casestatusvalid, casestatusinvalid:casestatusinvalid, applicationtypevalid:applicationtypevalid, applicationtypeinvalid:applicationtypeinvalid, plan:plan, replacementlist:replacementlist, fieldreporting:fieldreporting, isunderwriterassigned:isunderwriterassigned, isunderwriteridvalid:isunderwriteridvalid, unitcodevalid:unitcodevalid, unitcodeinvalid:unitcodeinvalid, notificationthrough:notificationthrough, sharedworklistid:sharedworklistid, underwriterworkListid:underwriterworkListid,processcoordinatormethod:processcoordinatormethod, documentroutingtype:documentroutingtype}
    ,panelClass: 'custom-dialog-container'});

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, id: number, docid: number, scanningpath: string, realpolicynum: string, ispolicyactive: string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {id: id, docid: docid, scanningpath: scanningpath, realpolicynum: realpolicynum, ispolicyactive: ispolicyactive}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }


  private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
    this.paginator._changePageSize(this.paginator.pageSize);
  }


  /*   // If you don't need a filter or a pagination this can be simplified, you just use code from else block
    // OLD METHOD:
    // if there's a paginator active we're using it for refresh
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }*/



  public loadData() {
    this.exampleDatabase = new DataService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}

export class ExampleDataSource extends DataSource<Issue> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Issue[] = [];
  renderedData: Issue[] = [];

  constructor(public _exampleDatabase: DataService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Issue[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllIssues();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((issue: Issue) => {
          const searchStr = (issue.id + issue.docid + issue.scanningpath + issue.docautorecive).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {}


  /** Returns a sorted copy of the database data. */
  sortData(data: Issue[]): Issue[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'docid': [propertyA, propertyB] = [a.docid, b.docid]; break;
        case 'docautorecive': [propertyA, propertyB] = [a.docautorecive, b.docautorecive]; break;
        case 'scanningpath': [propertyA, propertyB] = [a.scanningpath, b.scanningpath]; break;
        case 'realpolicynum': [propertyA, propertyB] = [a.realpolicynum, b.realpolicynum]; break;
        case 'ispolicyactive': [propertyA, propertyB] = [a.ispolicyactive, b.ispolicyactive]; break;
        case 'iscaseonwb': [propertyA, propertyB] = [a.iscaseonwb, b.iscaseonwb]; break;
        case 'routingidtypelist': [propertyA, propertyB] = [a.routingidtypelist, b.routingidtypelist]; break;
        case 'lineofbusiness': [propertyA, propertyB] = [a.lineofbusiness, b.lineofbusiness]; break;
        case 'internalstatusvalid': [propertyA, propertyB] = [a.internalstatusvalid, b.internalstatusvalid]; break;
        case 'internalstatusinvalid': [propertyA, propertyB] = [a.internalstatusinvalid, b.internalstatusinvalid]; break;
        case 'casestatusvalid': [propertyA, propertyB] = [a.casestatusvalid, b.casestatusvalid]; break;
        case 'casestatusinvalid': [propertyA, propertyB] = [a.casestatusinvalid, b.casestatusinvalid]; break;
        case 'applicationtypevalid': [propertyA, propertyB] = [a.applicationtypevalid, b.applicationtypevalid]; break;
        case 'applicationtypeinvalid': [propertyA, propertyB] = [a.applicationtypeinvalid, b.applicationtypeinvalid]; break;
        case 'plan': [propertyA, propertyB] = [a.plan, b.plan]; break;
        case 'replacementlist': [propertyA, propertyB] = [a.replacementlist, b.replacementlist]; break;
        case 'fieldreporting': [propertyA, propertyB] = [a.fieldreporting, b.fieldreporting]; break;
        case 'isunderwriterassigned': [propertyA, propertyB] = [a.isunderwriterassigned, b.isunderwriterassigned]; break;
        case 'isunderwriteridvalid': [propertyA, propertyB] = [a.isunderwriteridvalid, b.isunderwriteridvalid]; break;
        case 'unitcodevalid': [propertyA, propertyB] = [a.unitcodevalid, b.unitcodevalid]; break;
        case 'unitcodeinvalid': [propertyA, propertyB] = [a.unitcodeinvalid, b.unitcodeinvalid]; break;
        case 'notificationthrough': [propertyA, propertyB] = [a.notificationthrough, b.notificationthrough]; break;
        case 'sharedworklistid': [propertyA, propertyB] = [a.sharedworklistid, b.sharedworklistid]; break;
        case 'underwriterworkListid': [propertyA, propertyB] = [a.underwriterworkListid, b.underwriterworkListid]; break;
        case 'processcoordinatormethod': [propertyA, propertyB] = [a.processcoordinatormethod, b.processcoordinatormethod]; break;
        case 'documentroutingtype': [propertyA, propertyB] = [a.documentroutingtype, b.documentroutingtype]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }


}
