import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './appointments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';

@NgModule({
  declarations: [
    AppointmentsComponent,
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AppointmentsModule { }
