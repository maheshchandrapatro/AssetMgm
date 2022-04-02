import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './views/login/login.component';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { RegisterComponent } from './views/pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    //redirectTo: 'login',
    component:LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'viewasset',
        loadChildren: () =>
        import('./views/viewasset/viewasset.module').then((m) => m.ViewassetModule)
      },
       {
        path: 'newasset',
        loadChildren: () =>
        import('./views/newasset/newassets.module').then((m) => m.NewAssetsModule)
      },
      {
        path: 'addasset',
        loadChildren: () =>
        import('./views/addasset/addasset.module').then((m) => m.AddassetModule)
      },
      {
        path: 'assetdetail',
        loadChildren: () =>
        import('./views/assetdetail/assetdetail.module').then((m) => m.AssetDetailModule)
      },
      {
        path: 'employeeAsset',
        loadChildren: () =>
        import('./views/employee-asset/employee-asset.module').then((m) => m.EmployeeAssetModule)
      },
      {
        path: 'AssetAllocation',
        loadChildren: () =>
        import('./views/asset-allocation-form/asset-allocation-form.module').then((m) => m.AssetAllocationFormModule)
      },
      {
        path: 'ManageAsset',
        loadChildren: () =>
        import('./views/manageasset/manage-asset.module').then((m) => m.ManageAssetModule)
      },
      {
        path: 'wfhemployees',
        loadChildren: () =>
        import('./views/wfhemployees/wfhemployees.module').then((m) => m.WfhemployeesModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
