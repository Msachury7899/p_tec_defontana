import { DataSource } from "@angular/cdk/collections";
import {BehaviorSubject, Subject,Observable, Subscription} from 'rxjs';
import { take , takeUntil,first, map} from 'rxjs/operators';


export class CustomDataSource<T> extends DataSource<T> {

  data = new BehaviorSubject<T[]>([]);
  filteredData = new BehaviorSubject<T[]>([]);
  page: number = 0;
  maxPages: number = 0;
  perPage: number = 10;
  totalRows: number = 0;

  setMaxPages(len:number){
      this.totalRows = len;
      if((len % this.perPage) == 0){
          this.maxPages =  (len / this.perPage);
      }else{
          this.maxPages =  Math.trunc((len / this.perPage)) + 1;
      }
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */

  connect(): Observable<T[]> {
    return this.data.pipe(
      map( d => {
          let aNuevo = d.slice(0,this.perPage)
          return [
              ...aNuevo
          ]
      })
    );
  }

  customSearch(key:string,value:string){
    this.subs = this.filteredData.subscribe((data) => {
      let dataFilter = data as any[]

      const filteredArray = dataFilter.filter((d) => {
          return d[key].includes(value) == true
      });
      this.page = 0;
      this.setMaxPages(filteredArray.length)
      this.data.next([...filteredArray])
      this.subs.unsubscribe();
    });
  }

  subs = new Subscription()
  paginate(page:number){

    this.page = page;
    let finalInit = 0;
    let finalLimit = 0;
    if( page == 0){
      finalInit = (page * this.perPage);
      finalLimit = (page * this.perPage) + this.perPage;
    }else{
       finalInit = (page * this.perPage);
       finalLimit = (page * this.perPage) + this.perPage + 1;
    }

    this.subs = this.filteredData.subscribe(data => {
      this.data.next(data.slice(finalInit,finalLimit))
      this.subs.unsubscribe();
    });

  }


  disconnect() {}

}
