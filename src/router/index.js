import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import Articles from '../views/resources/Articles.vue'
import ArticleDetails from '@/views/resources/ArticleDetails.vue'
import Lectures from '../views/resources/Lectures.vue'
import LectureDetails from '@/views/resources/LectureDetails.vue'
import TeamIntroduction from '../views/about/TeamIntroduction.vue'
import PrivatePolicy from '../views/about/PrivatePolicy.vue'
import UserGuide from '@/views/help/UserGuide.vue'
import ContactUs from '@/views/help/ContactUs.vue'
import Community from '@/views/community/Community.vue'
import Consult from '@/views/consult/Consult.vue'
import Profile from '@/views/profile/Profile.vue'
import ConsultList from '@/views/consult/ConsultList.vue'
import Contact from '@/views/consult/Contact.vue'
import { useUserStore } from '@/stores/user'
import UserList from '@/views/admin/UserList.vue'
import UserStatistics from '@/views/admin/UserStatistics.vue'
import Dashboard from '@/views/admin/Dashboard.vue'
import RealtimeChat from '@/views/consult/RealtimeChat.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { layout: 'main' }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { layout: 'plain' }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { layout: 'plain' }
    },
    {
      path: '/resources/articles',
      name: 'articles',
      component: Articles,
      meta: { layout: 'main' }
    },
    {
      path: '/resources/articles/:id',
      name: 'article-details',
      component: ArticleDetails,
      meta: { layout: 'main' }
    },
    {
      path: '/resources/lectures',
      name: 'lectures',
      component: Lectures,
      meta: { layout: 'main' }
    },
    {
      path: '/community',
      name: 'community',
      component: Community,
      meta: { layout: 'main' }
    },
    {
      path: '/consult/consult',
      name: 'consult',
      component: Consult,
      meta: { layout: 'main' }
    },
    {
      path: '/consult/consult-list',
      name: 'consult-list',
      component: ConsultList,
      meta: { layout: 'main', authRequired: true, roles: ['admin', 'consultant'] }
      // meta: { layout: 'main' }
    },
    {
      path: '/consult/contact', // contact by mail
      name: 'contact',
      component: Contact,
      meta: { layout: 'main' }
    },
    {
      path: '/consult/realtime-chat', // gemini chat
      name: 'realtimechat',
      component: RealtimeChat,
      meta: { layout: 'main' }
    },
    {
      path: '/admin/dashboard',
      name: 'dashboard',
      component: Dashboard,
      // meta: { layout: 'main' }
      meta: { layout: 'main', authRequired: true, roles: ['admin'] }
    },
    {
      path: '/admin/user-statistics',
      name: 'user-statistics',
      component: UserStatistics,
      // meta: { layout: 'main' }
      meta: { layout: 'main', authRequired: true, roles: ['admin'] }
    },
    {
      path: '/admin/user-list',
      name: 'user-list',
      component: UserList,
      // meta: { layout: 'main' }
      meta: { layout: 'main', authRequired: true, roles: ['admin'] }
    },
    {
      path: '/lectures/:id',
      name: 'lecture-details',
      component: LectureDetails,
      meta: { layout: 'main' }
    },
    {
      path: '/about/team-introduction',
      name: 'team-introduction',
      component: TeamIntroduction,
      meta: { layout: 'main' }
    },
    {
      path: '/about/private-policy',
      name: 'private-policy',
      component: PrivatePolicy,
      meta: { layout: 'main' }
    },
    {
      path: '/help/userguide',
      name: 'userguide',
      component: UserGuide,
      meta: { layout: 'main' }
    },
    {
      path: '/help/contactus',
      name: 'contactus',
      component: ContactUs,
      meta: { layout: 'main' }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { layout: 'main', authRequired: true, roles: ['user', 'consultant', 'admin'] }
    },
    {
      path: '/test',
      name: 'test',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TestView.vue'),
      meta: { layout: 'plain' }
    }
  ]
})

// authentication for routes
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  // Check if route requires authentication
  if (to.meta.authRequired) {
    // Check if the user is logged in
    if (!userStore.user) {
      // Redirect to login page if not authenticated
      return next({ name: 'login' })
    }

    // Check if the route requires specific roles
    if (to.meta.roles && !to.meta.roles.includes(userStore.user.role)) {
      // Redirect or show an error if roles do not match
      return next({ name: 'home' }) // Redirect to home
    }
  }

  // If all checks pass, proceed to the route
  next()
})

export default router
