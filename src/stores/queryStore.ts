import { defineStore } from 'pinia'
import {
    useQuery,
    type UseQueryReturn,
    useMutation,
    type UseMutationReturn,
    provideApolloClient,
    type UseMutationOptions,
} from '@vue/apollo-composable'
import { ref, toValue, watch, type Ref } from 'vue'
import { _queries } from '@/queries/queries.gql'
import { apolloClient } from '@/main' // Ensure this is exported from main.ts

import {
    type SetLanguageMutation,
    type ActivitiesSliderCardQueryQuery,
    type ActivitiesSliderCardQueryQueryVariables,
    type DemoOverviewActivitiesQueryQuery,
    type DemoOverviewActivitiesQueryQueryVariables,
    type EducationViewQueryQuery,
    type EducationViewQueryQueryVariables,
    type HomepageSliderQueryQuery,
    type HomepageSliderQueryQueryVariables,
    type LatestActivitiesQueryQuery,
    type LatestActivitiesQueryQueryVariables,
    type LatestNewsQueryQuery,
    type LatestNewsQueryQueryVariables,
    type OverviewActivitiesQueryQuery,
    type OverviewActivitiesQueryQueryVariables,
    type OverviewNewsQueryQuery,
    type OverviewNewsQueryQueryVariables,
    type PageViewQueryQuery,
    type PageViewQueryQueryVariables,
    type PastActivitiesQueryQuery,
    type PastActivitiesQueryQueryVariables,
    type PhotosActivitiesQueryQuery,
    type PhotosActivitiesQueryQueryVariables,
    type SetLanguageMutationMutationVariables,
    type SingleActivitiesQueryQuery,
    type SingleActivitiesQueryQueryVariables,
    type SingleNewsQueryQuery,
    type SingleNewsQueryQueryVariables,
    type UpcomingActivitiesQueryQuery,
    type UpcomingActivitiesQueryQueryVariables,
} from '@/gql/graphql'
import type { DocumentNode, OperationVariables, ApolloQueryResult } from '@apollo/client/core'
import { useLanguageStore } from './languageStore'
import type { DocumentParameter, OptionsParameter } from '@vue/apollo-composable/dist/useQuery.js'

export const useQueryStore = defineStore('queryStore', () => {
    // TODO: Use caching, pagination, language and markedText with html-escape

    /**
     * Generic function to execute a GraphQL query and return a typed result with refetch capability.
     * Pagination queries MUST use 'limit' and 'offset'
     */
    // TODO: Use fetchMore https://v4.apollo.vuejs.org/guide-composable/pagination.html
    function fetchQuery<TQuery, V extends OperationVariables>(
        query: DocumentParameter<TQuery, V>,
        variables: V,
    ): UseQueryReturn<TQuery, V> {
        if (query == undefined) {
            throw new Error('Query must not be undefined')
        }

        provideApolloClient(apolloClient)

        return useQuery<TQuery, V>(query, variables, {
            fetchPolicy: 'network-only',
        })
    }

    function mutate<TQuery, V extends OperationVariables>(
        mutation: DocumentNode,
        options?: UseMutationOptions<TQuery, V>,
    ): UseMutationReturn<TQuery, V> {
        return useMutation<TQuery, V>(mutation, options)
    }

    function setLanguageMutation(
        options?: UseMutationOptions<SetLanguageMutation, SetLanguageMutationMutationVariables>,
    ) {
        return mutate<SetLanguageMutation, SetLanguageMutationMutationVariables>(
            _queries.SetLanguageMutation,
            {
                ...options,
                variables: options?.variables as SetLanguageMutationMutationVariables,
            },
        )
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

    function getPastActivitiesQuery(variables: PastActivitiesQueryQueryVariables) {
        return fetchQuery<PastActivitiesQueryQuery, PastActivitiesQueryQueryVariables>(
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
        mutate,
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

        setLanguageMutation,
    }
})
