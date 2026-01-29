import { useQuery as useApolloQuery, useMutation as useApolloMutation } from '@vue/apollo-composable'
import * as gql from '@/gql/graphql'
import type { ApolloQueryResult, TypedDocumentNode } from '@apollo/client/core/types'
import { apolloClient } from '@/main'

/**
 * Query registry
 * Add new queries here once
 */
export const queries = {
    latestActivities: gql.LatestActivitiesDocument,
    overviewActivities: gql.OverviewActivitiesDocument,
    pastActivities: gql.PastActivitiesDocument,
    photosActivities: gql.PhotosActivitiesDocument,
    upcomingActivities: gql.UpcomingActivitiesDocument,
    latestNews: gql.LatestNewsDocument,
    overviewNews: gql.OverviewNewsDocument,
    singleNews: gql.SingleNewsDocument,
    pageView: gql.PageViewDocument,
    educationView: gql.EducationViewDocument,
    publicationOverview: gql.PublicationOverviewDocument,
    activitiesSliderCard: gql.ActivitiesSliderCardDocument,
    homepageSlider: gql.HomepageSliderDocument,
    singleActivites: gql.SingleActivitiesDocument,
    committeeOverview: gql.CommitteeOverviewDocument,
    singleCommittee: gql.SingleCommitteeDocument
} as const

/**
 * Mutation registry
 */
export const mutations = {
    setLanguage: gql.SetLanguageMutationDocument,
} as const



type VariablesOf<T> = T extends TypedDocumentNode<any, infer V>
    ? V
    : never

type ResultOf<T> = T extends TypedDocumentNode<infer R, any>
    ? R
    : never

/**
 * Fully typed dynamic query composable
 */
export function useQuery<
    TKey extends keyof typeof queries
>(
    key: TKey,
    variables: VariablesOf<(typeof queries)[TKey]>
) {
    if (!queries[key]) {
        throw new Error(`Query "${String(key)}" not found`)
    }

    return useApolloQuery<
        ResultOf<(typeof queries)[TKey]>,
        VariablesOf<(typeof queries)[TKey]>
    >(
        queries[key],
        variables,
        {
            fetchPolicy: 'cache-first',
        }
    )
}

export async function useQueryAsync<
    TKey extends keyof typeof queries
>(
    key: TKey,
    variables: VariablesOf<typeof queries[TKey]>
): Promise<ApolloQueryResult<ResultOf<typeof queries[TKey]>>> {
    if (!queries[key]) {
        throw new Error(`Query "${String(key)}" not found`)
    }

    return apolloClient.query<ResultOf<typeof queries[TKey]>, VariablesOf<typeof queries[TKey]>>({
        query: queries[key],
        variables,
        fetchPolicy: 'cache-first',
    })
}

export function useMutation<
    TKey extends keyof typeof mutations
>(key: TKey) {
    if (!mutations[key]) {
        throw new Error(`Query "${String(key)}" not found`)
    }

    return useApolloMutation(mutations[key])
}
