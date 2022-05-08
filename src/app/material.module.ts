import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  imports: [
    MatDatepickerModule
  ],
  exports: [
    MatDatepickerModule,
    MatNativeDateModule
  ]
})

export class MaterialModule {}