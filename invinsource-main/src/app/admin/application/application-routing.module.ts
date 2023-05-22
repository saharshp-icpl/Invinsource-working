import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ContactsComponent } from './contacts/contacts.component';
import { EmailReadComponent } from './emailapp/email-read/email-read.component';


const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'email-read',
          component: EmailReadComponent,
          data: {
            title: 'Email Read'
          }
        },
        {
          path: 'chat-box',
          component: ChatBoxComponent,
          data: {
            title: 'Chat Box'
          }
        },
        {
          path: 'contatcs',
          component: ContactsComponent,
          data: {
            title: 'Contatcs'
          }
        },
        
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
