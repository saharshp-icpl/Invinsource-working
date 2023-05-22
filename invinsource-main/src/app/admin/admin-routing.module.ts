import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";

import { Full_ROUTES } from "./shared/routes/full-layout.routes";
import { CONTENT_ROUTES } from "./shared/routes/content-layout.routes";

const routes: Routes = [
  // {
  //   path: "admin",
  //   redirectTo: 'auth/sign-in',
  //   pathMatch: 'full',
  // },
  { path: 'admin', component: ContentLayoutComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES },
  { path: 'admin', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES },
  
  // { path: '**', redirectTo: 'dashboard/default' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
