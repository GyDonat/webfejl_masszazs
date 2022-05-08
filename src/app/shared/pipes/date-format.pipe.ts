import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datumKonverter'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): string {
    let ev = value.getFullYear().toString();
    let honap = (value.getMonth()+1).toString();
    let nap = value.getDate().toString()
    if ( parseInt(honap) <10)
    {
      honap = "0"+honap;
    }
    if ( parseInt(nap) <10)
    {
      nap = "0"+nap;
    }
    let jo = ev+"-"+honap+"-"+nap;
    //let idozona = (new Date(value)).getTimezoneOffset() * 60000;
    //let joDatum = (new Date(Date.now() - idozona)).toISOString().replace('T', ' ').substring(0,16);
    return jo
  }

}
