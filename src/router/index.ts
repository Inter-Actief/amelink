import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/pages/HomeView.vue'),
            props: true,
        },
        {
            path: '/about/:id/:slug',
            name: 'page',
            component: () => import('@/views/pages/PageView.vue'),
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
            component: () => import('@/views/news/SingleNews.vue'),
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
            component: () => import('@/views/activities/SingleActivites.vue'),
            props: true,
        },
        {
            path: '/activities/:id/photos',
            name: 'singleactivitiesphotos',
            component: () => import('@/views/activities/ActivitiesPhotosView.vue'),
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
            component: () => import('@/views/committees/SingleCommitteeView.vue'),
            props: true,
        },
    ],
})

export default router
