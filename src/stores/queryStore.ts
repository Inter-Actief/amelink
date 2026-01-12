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
    type ActivitiesSliderCardQuery,
    type ActivitiesSliderCardQueryVariables,
    type DemoOverviewActivitiesQuery,
    type DemoOverviewActivitiesQueryVariables,
    type EducationViewQuery,
    type EducationViewQueryVariables,
    type HomepageSliderQuery,
    type HomepageSliderQueryVariables,
    type LatestActivitiesQuery,
    type LatestActivitiesQueryVariables,
    type LatestNewsQuery,
    type LatestNewsQueryVariables,
    type OverviewActivitiesQuery,
    type OverviewActivitiesQueryVariables,
    type OverviewNewsQuery,
    type OverviewNewsQueryVariables,
    type PageViewQuery,
    type PageViewQueryVariables,
    type PastActivitiesQuery,
    type PastActivitiesQueryVariables,
    type PhotosActivitiesQuery,
    type PhotosActivitiesQueryVariables,
    type SetLanguageMutationMutationVariables,
    type SingleActivitiesQuery,
    type SingleActivitiesQueryVariables,
    type SingleNewsQuery,
    type SingleNewsQueryVariables,
    type UpcomingActivitiesQuery,
    type UpcomingActivitiesQueryVariables,
    type PublicationOverviewQueryVariables,
    type PublicationOverviewQuery,
    type CommitteeOverviewQueryVariables,
    type CommitteeOverviewQuery,
    type SingleCommitteeQuery,
    type SingleCommitteeQueryVariables,
} from '@/gql/graphql'
import type { DocumentNode, OperationVariables, ApolloQueryResult } from '@apollo/client/core'
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
        if (query === undefined) {
            throw new Error('Query must not be undefined, maybe you made a typo?')
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
    function getLatestActivities(variables: LatestActivitiesQueryVariables) {
        return fetchQuery<LatestActivitiesQuery, LatestActivitiesQueryVariables>(
            _queries.LatestActivities,
            variables,
        )
    }

    function getOverviewActivities(variables: OverviewActivitiesQueryVariables) {
        return fetchQuery<OverviewActivitiesQuery, OverviewActivitiesQueryVariables>(
            _queries.OverviewActivities,
            variables,
        )
    }

    function getPastActivitiesQuery(variables: PastActivitiesQueryVariables) {
        return fetchQuery<PastActivitiesQuery, PastActivitiesQueryVariables>(
            _queries.PastActivities,
            variables,
        )
    }

    function getPhotosActivitiesQuery(variables: PhotosActivitiesQueryVariables) {
        return fetchQuery<PhotosActivitiesQuery, PhotosActivitiesQueryVariables>(
            _queries.PhotosActivities,
            variables,
        )
    }

    function getUpcomingActivitiesQuery(variables: UpcomingActivitiesQueryVariables) {
        return fetchQuery<UpcomingActivitiesQuery, UpcomingActivitiesQueryVariables>(
            _queries.UpcomingActivities,
            variables,
        )
    }

    function getDemoOverviewActivitiesQuery(variables: DemoOverviewActivitiesQueryVariables) {
        return fetchQuery<
            DemoOverviewActivitiesQuery,
            DemoOverviewActivitiesQueryVariables
        >(_queries.DemoOverviewActivities, variables)
    }

    function getActivitiesSliderCardQuery(variables: ActivitiesSliderCardQueryVariables) {
        return fetchQuery<ActivitiesSliderCardQuery, ActivitiesSliderCardQueryVariables>(
            _queries.ActivitiesSliderCard,
            variables,
        )
    }

    function getHomepageSliderQuery(variables: HomepageSliderQueryVariables) {
        return fetchQuery<HomepageSliderQuery, HomepageSliderQueryVariables>(
            _queries.HomepageSlider,
            variables,
        )
    }

    function getLatestNewsQuery(variables: LatestNewsQueryVariables) {
        return fetchQuery<LatestNewsQuery, LatestNewsQueryVariables>(
            _queries.LatestNews,
            variables,
        )
    }

    function getOverviewNewsQuery(variables: OverviewNewsQueryVariables) {
        return fetchQuery<OverviewNewsQuery, OverviewNewsQueryVariables>(
            _queries.OverviewNews,
            variables,
        )
    }

    function getSingleActivitiesQuery(variables: SingleActivitiesQueryVariables) {
        return fetchQuery<SingleActivitiesQuery, SingleActivitiesQueryVariables>(
            _queries.SingleActivities,
            variables,
        )
    }

    function getSingleNewsQuery(variables: SingleNewsQueryVariables) {
        return fetchQuery<SingleNewsQuery, SingleNewsQueryVariables>(
            _queries.SingleNews,
            variables,
        )
    }

    function getEducationViewQuery(variables: EducationViewQueryVariables) {
        return fetchQuery<EducationViewQuery, EducationViewQueryVariables>(
            _queries.EducationView,
            variables,
        )
    }

    function getPageViewQuery(variables: PageViewQueryVariables) {
        return fetchQuery<PageViewQuery, PageViewQueryVariables>(
            _queries.PageView,
            variables,
        )
    }

    function getPublicationOverview(variables: PublicationOverviewQueryVariables) {
        return fetchQuery<PublicationOverviewQuery, PublicationOverviewQueryVariables>(
            _queries.PublicationOverview,
            variables,
        )
    }

    function getCommitteeOverview(variables: CommitteeOverviewQueryVariables) {
        return fetchQuery<CommitteeOverviewQuery, CommitteeOverviewQueryVariables>(
            _queries.CommitteeOverview,
            variables,
        )
    }

    function getSingleCommittee(variables: SingleCommitteeQueryVariables) {
        return fetchQuery<SingleCommitteeQuery, SingleCommitteeQueryVariables>(
            _queries.SingleCommittee,
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
        getPublicationOverview,
        setLanguageMutation,
        getCommitteeOverview,
        getSingleCommittee,
    }
})
