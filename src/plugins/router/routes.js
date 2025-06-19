
export const routes = [
  { path: '/', redirect: '/dashboard/configurations',name:'dashboard.configurations' },
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    meta: { requiresLogin: true },
    children: [
      {
        path: '/dashboard/configurations',
        component: () => import('@/views/dashboard/ConfigurationsComponent.vue'),
      },
      {
        path: 'dashboard/create',
        name:'dashboard.create',
        component: () => import('@/views/dashboard/CreateComponent.vue'),
      },
      {
        path: 'dashboard/show/:id',
        name:'dashboard.show',
        component: () => import('@/views/dashboard/ShowDashboard.vue'),
      },
      {
        path: 'dashboard/edit/:id',
        name:'dashboard.edit',
        component: () => import('@/views/dashboard/EditDashboard.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'login',
        name:'login',
        component: () => import('@/views/auth/LoginComponent.vue'),
      },
      {
        path: 'register',
        component: () => import('@/views/auth/RegisterComponent.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/[...error].vue'),
      },
    ],
  },
]
