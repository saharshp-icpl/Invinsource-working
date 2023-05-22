import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApplicationRoutingModule } from './application-routing.module';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { NgbModalModule, NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';


import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ContactsComponent } from './contacts/contacts.component';
import { EmailappComponent } from './emailapp/emailapp.component';
import { EmailReadComponent } from './emailapp/email-read/email-read.component';




@NgModule({
  declarations: [
    ChatBoxComponent,
    ContactsComponent,
    EmailappComponent,
    EmailReadComponent,


  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    PerfectScrollbarModule,
  
    NgbModalModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    FormsModule,
  ]
})
export class ApplicationModule { }
