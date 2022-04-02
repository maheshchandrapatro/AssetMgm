import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/admin/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: ''
    }
  },
  {
    name: 'Asset Master',
    url: '/admin/asset',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Asset',
        url: '/admin/viewasset'
      },
      {
        name: 'Asset Allocation Form',
        url: '/admin/AssetAllocation'
      },
    ]
  },
  {
    name: 'Employee Asset',
    url: '/admin/newasset',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Assign Asset(s)',
        url: '/admin/newasset'
      },
      {
        name: 'All Employees Assets',
        url: '/admin/addasset'
      },
      {
        name: 'Set Asset Mode',
        url: '/admin/employeeAsset'
      },
      {
        name: 'Manage Asset',
        url: '/admin/ManageAsset'
      },
    ]
  },
  {
    name: 'Reports',
    url: '/admin/',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'WFH Employees',
        url: '/admin/wfhemployees'
      },

    ]
  },
  // {
  //   name: 'Pages',
  //   url: '/pages',
  //   iconComponent: { name: 'cil-star' },
  //   children: [
  //     {
  //       name: 'Login',
  //       url: '/login'
  //     },
  //   ]
  // },
  // {
  //   name: 'Asset Data',
  //   url: '/addasset',
  //   iconComponent: { name: 'cil-chart-pie' }
  // },
];
