import { createRouter, createWebHistory } from 'vue-router'
import { useOidcStore } from '@/stores/oidcStore'
import HomePage from '@/views/pages/HomeView.vue'
import Page from '@/views/pages/PageView.vue'
import SingleNews from '@/views/news/SingleNews.vue'
import SingleActivities from '@/views/activities/SingleActivites.vue'
import ActivitiesPhotosView from '@/views/activities/ActivitiesPhotosView.vue'
import SingleCommittee from '@/views/committees/SingleCommitteeView.vue'
import { useLoadingStore } from '@/stores/loadingStore'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0, behavior: 'smooth' }
        }
    },
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
            props: true,
        },
        {
            path: '/about/:id/:slug',
            name: 'page',
            component: Page,
            props: true,
        },
        {
            path: '/news',
            name: 'news',
            component: () => import('@/views/news/NewsView.vue'),
            props: true,
        },
        {
            path: '/news/:id',
            name: 'singlenews',
            component: () => SingleNews,
            props: true,
        },
        {
            path: '/contact',
            name: 'contact',
            component: () => import('@/views/pages/PageView.vue'),
            props: {
                id: 7,
                slug: 'contact',
            },
        },
        {
            path: '/activities',
            name: 'activities',
            component: () => import('@/views/activities/ActivitiesView.vue'),
            props: true,
        },
        {
            path: '/activities/:id',
            name: 'singleactivities',
            component: () => SingleActivities,
            props: true,
        },
        {
            path: '/activities/:id/photos',
            name: 'singleactivitiesphotos',
            component: () => ActivitiesPhotosView,
            props: true,
        },
        {
            path: '/education/',
            name: 'education',
            component: () => import('@/views/pages/EducationView.vue'),
        },
        {
            path: '/search',
            name: 'search',
            component: () => import('@/views/pages/SearchView.vue'),
            props: (route) => ({
                search: route.query.search,
            }),
        },
        {
            path: '/publications',
            name: 'publications',
            component: () => import('@/views/pages/PublicationView.vue'),
        },
        {
            path: '/companies',
            name: 'companies',
            component: () => import('@/views/companies/CompaniesView.vue'),
        },
        {
            path: '/companies/:slug',
            name: 'singlecompany',
            component: () => import('@/views/companies/CompanyView.vue'),
            props: true,
        },
        {
            path: '/videos',
            name: 'videos',
            component: () => import('@/views/videos/VideosView.vue'),
        },
        {
            path: '/videos/:type/:id',
            name: 'singlevideo',
            component: () => import('@/views/videos/VideoView.vue'),
            props: true,
        },
        {
            path: '/committees',
            name: 'committees',
            component: () => import('@/views/committees/CommitteesView.vue'),
        },
        {
            path: '/committees/:id/:slug',
            name: 'singlecommittee',
            component: () => SingleCommittee,
            props: true,
        },
        {
            path: '/auth/state',
            name: 'authstate',
            component: () => import('@/views/pages/StateView.vue'),
        },
        {
            path: '/auth/callback',
            name: 'authcallback',
            component: { template: '<div></div>' },
            beforeEnter: async (to, from, next) => {
                const oidcStore = useOidcStore()
                try {
                    await oidcStore.handleCallback()
                    next('/')
                } catch (error) {
                    console.error('Auth callback failed:', error)
                    next('/')
                }
            },
        },
        {
            path: '/:path(.*)*',
            name: 'notfound',
            component: () => import('@/views/404.vue'),
        },
    ],
})

// Loading bar - reset on route completion to avoid stale state
router.beforeEach(() => {
    // Don't reset here - it interferes with queries in flight
})

router.afterEach(() => {
    const loading = useLoadingStore()
    // After route completes, reset any orphaned state after a small delay
    setTimeout(() => {
        if (loading.activeRequests > 0) {
            console.warn(`Stale loading state detected: ${loading.activeRequests} active requests`)
            loading.reset()
        }
    }, 3000) // 3 second timeout for all queries to complete
})

export default router
