
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/newOrderPage.vue') }
    ]
  },
  {
    path: '/waiting',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/waitingOrderPage.vue') }
    ]
  },
  {
    path: '/prepared',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/preparedOrderPage.vue') }
    ]
  },
  {
    path: '/removed',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/removedOrderPage.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
