import { defineStore } from 'pinia'
import { useQuery, type UseQueryReturn } from '@vue/apollo-composable'
import { ref, toValue, watch, type Ref } from 'vue'
import { _queries } from '@/queries/queries.gql'

import type {
    ActivitiesSliderCardQueryQuery,
    ActivitiesSliderCardQueryQueryVariables,
    DemoOverviewActivitiesQueryQuery,
    DemoOverviewActivitiesQueryQueryVariables,
    EducationViewQueryQuery,
    EducationViewQueryQueryVariables,
    HomepageSliderQueryQuery,
    HomepageSliderQueryQueryVariables,
    LatestActivitiesQueryQuery,
    LatestActivitiesQueryQueryVariables,
    LatestNewsQueryQuery,
    LatestNewsQueryQueryVariables,
    OverviewActivitiesQueryQuery,
    OverviewActivitiesQueryQueryVariables,
    OverviewNewsQueryQuery,
    OverviewNewsQueryQueryVariables,
    PageViewQueryQuery,
    PageViewQueryQueryVariables,
    PastActivitesQueryQuery,
    PastActivitesQueryQueryVariables,
    PhotosActivitiesQueryQuery,
    PhotosActivitiesQueryQueryVariables,
    SingleActivitiesQueryQuery,
    SingleActivitiesQueryQueryVariables,
    SingleNewsQueryQuery,
    SingleNewsQueryQueryVariables,
    UpcomingActivitiesQueryQuery,
    UpcomingActivitiesQueryQueryVariables,
} from '@/gql/graphql'
import type { DocumentNode, OperationVariables, ApolloQueryResult } from '@apollo/client/core'
import { useLanguageStore } from './languageStore'

export type queryOptions = {
    cache?: boolean
}

export interface PaginatedQueryReturn<TResult, TVariables extends OperationVariables>
    extends UseQueryReturn<TResult, TVariables> {
    /** Tracks the currently selected page based on offset and limit */
    selectedPage: Ref<number>
}

export const useQueryStore = defineStore('queryStore', () => {
    const languageStore = useLanguageStore()
    // TODO: Use caching, pagination, language and markedText with html-escape

    /**
     * Generic function to execute a GraphQL query and return a typed result with refetch capability.
     * Pagination queries MUST use 'limit' and 'offset'
     */
    function fetchQuery<T, V extends OperationVariables>(
        query: DocumentNode,
        variables: V,
        queryOptions?: queryOptions,
    ): PaginatedQueryReturn<T, V> {
        // Default selectedpage
        let selectedPage = ref(0)

        const queryResult = useQuery<T, V>(query, variables)

        // Using pagination?
        if (
            typeof (variables as any).limit === 'number' &&
            typeof (variables as any).offset === 'number'
        ) {
            selectedPage.value = Math.floor((variables as any).offset / (variables as any).limit)

            // Watch to update in case of pagination
            watch(
                () => selectedPage.value,
                (newValue) => {
                    if (newValue == undefined) {
                        return
                    }

                    const newOffset = newValue * (variables as any).limit

                    // refetch with new variables for the limit and offset determined by page
                    queryResult.refetch({
                        ...variables,
                        offset: newOffset,
                    })
                },
            )
        }

        // Watch to update language
        watch(
            () => languageStore.currentLanguage,
            () => {
                queryResult.refetch(variables)
            },
        )

        return {
            ...queryResult,
            selectedPage,
        }
    }

    function fetchQueryCaching<T, V extends OperationVariables>(
        query: DocumentNode,
        variables: V,
    ): UseQueryReturn<T, V> {
        return useQuery<T, V>(query, variables)
    }

    // Specific query functions using fetchQuery
    function getLatestActivities(variables: LatestActivitiesQueryQueryVariables) {
        return fetchQuery<LatestActivitiesQueryQuery, LatestActivitiesQueryQueryVariables>(
            _queries.LatestActivitiesQuery,
            variables,
        )
    }

    function getOverviewActivities(variables: OverviewActivitiesQueryQueryVariables) {
        return fetchQuery<OverviewActivitiesQueryQuery, OverviewActivitiesQueryQueryVariables>(
            _queries.OverviewActivitiesQuery,
            variables,
        )
    }

    function getPastActivitiesQuery(variables: PastActivitesQueryQueryVariables) {
        return fetchQuery<PastActivitesQueryQuery, PastActivitesQueryQueryVariables>(
            _queries.PastActivitiesQuery,
            variables,
        )
    }

    function getPhotosActivitiesQuery(variables: PhotosActivitiesQueryQueryVariables) {
        return fetchQuery<PhotosActivitiesQueryQuery, PhotosActivitiesQueryQueryVariables>(
            _queries.PhotosActivitiesQuery,
            variables,
        )
    }

    function getUpcomingActivitiesQuery(variables: UpcomingActivitiesQueryQueryVariables) {
        return fetchQuery<UpcomingActivitiesQueryQuery, UpcomingActivitiesQueryQueryVariables>(
            _queries.UpcomingActivitiesQuery,
            variables,
        )
    }

    function getDemoOverviewActivitiesQuery(variables: DemoOverviewActivitiesQueryQueryVariables) {
        return fetchQuery<
            DemoOverviewActivitiesQueryQuery,
            DemoOverviewActivitiesQueryQueryVariables
        >(_queries.DemoOverviewActivitiesQuery, variables)
    }

    function getActivitiesSliderCardQuery(variables: ActivitiesSliderCardQueryQueryVariables) {
        return fetchQuery<ActivitiesSliderCardQueryQuery, ActivitiesSliderCardQueryQueryVariables>(
            _queries.ActivitiesSliderCardQuery,
            variables,
        )
    }

    function getHomepageSliderQuery(variables: HomepageSliderQueryQueryVariables) {
        return fetchQuery<HomepageSliderQueryQuery, HomepageSliderQueryQueryVariables>(
            _queries.HomepageSliderQuery,
            variables,
        )
    }

    function getLatestNewsQuery(variables: LatestNewsQueryQueryVariables) {
        return fetchQuery<LatestNewsQueryQuery, LatestNewsQueryQueryVariables>(
            _queries.LatestNewsQuery,
            variables,
        )
    }

    function getOverviewNewsQuery(variables: OverviewNewsQueryQueryVariables) {
        return fetchQuery<OverviewNewsQueryQuery, OverviewNewsQueryQueryVariables>(
            _queries.OverviewNewsQuery,
            variables,
        )
    }

    function getSingleActivitiesQuery(variables: SingleActivitiesQueryQueryVariables) {
        return fetchQuery<SingleActivitiesQueryQuery, SingleActivitiesQueryQueryVariables>(
            _queries.SingleActivitiesQuery,
            variables,
        )
    }

    function getSingleNewsQuery(variables: SingleNewsQueryQueryVariables) {
        return fetchQuery<SingleNewsQueryQuery, SingleNewsQueryQueryVariables>(
            _queries.SingleNewsQuery,
            variables,
        )
    }

    function getEducationViewQuery(variables: EducationViewQueryQueryVariables) {
        return fetchQuery<EducationViewQueryQuery, EducationViewQueryQueryVariables>(
            _queries.EducationViewQuery,
            variables,
        )
    }

    function getPageViewQuery(variables: PageViewQueryQueryVariables) {
        return fetchQuery<PageViewQueryQuery, PageViewQueryQueryVariables>(
            _queries.PageViewQuery,
            variables,
        )
    }

    return {
        fetchQuery,
        getLatestActivities,
        getOverviewActivities,
        getPastActivitiesQuery,
        getPhotosActivitiesQuery,
        getUpcomingActivitiesQuery,
        getDemoOverviewActivitiesQuery,
        getActivitiesSliderCardQuery,
        getHomepageSliderQuery,
        getLatestNewsQuery,
        getOverviewNewsQuery,
        getSingleActivitiesQuery,
        getSingleNewsQuery,
        getEducationViewQuery,
        getPageViewQuery,
    }
})
