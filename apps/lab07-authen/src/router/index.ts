import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import { authService } from '@/auth/auth-service'; // Import service มาไว้ด้านบน

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    // ย้าย login ออกมาข้างนอกเพื่อให้เป็นหน้าเต็ม (ไม่มี Tabs)
    path: '/login',
    component: () => import('@/views/LoginPage.vue') 
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue'),
        meta: { requiresAuth: true } // ต้องล็อกอินถึงจะเข้าได้
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation Guard
router.beforeEach(async (to) => {
  const user = await authService.getCurrentUser();
  
  // 1. ถ้าล็อกอินแล้ว แต่พยายามจะไปหน้า /login ให้ดีดไปหน้า Tab1
  if (to.path === "/login" && user) {
    return "/tabs/tab1";
  }
  
  // 2. ถ้าหน้านั้นต้องใช้ Auth (requiresAuth) แต่ยังไม่ได้ล็อกอิน ให้ดีดไปหน้า /login
  if (to.meta.requiresAuth && !user) {
    return "/login";
  }
  
  return true;
});

export default router;