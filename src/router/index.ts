import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/pages/HomeView.vue'
import Page from '@/views/pages/PageView.vue'
import SingleNews from '@/views/news/SingleNews.vue'
import SingleActivities from '@/views/activities/SingleActivites.vue'
import ActivitiesPhotosView from '@/views/activities/ActivitiesPhotosView.vue'
import SingleCommittee from '@/views/committees/SingleCommitteeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => HomePage,
            props: true,
        },
        {
            path: '/about/:id/:slug',
            name: 'page',
            component: () => Page,
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
            path: '/components',
            name: 'components',
            component: () => import('@/views/pages/ComponentsView.vue'),
            props: true,
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
    ],
})

export default router
