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
      path: '/consult',
      name: 'consult',
      component: Consult,
      meta: { layout: 'main' }
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

export default router
