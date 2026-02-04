import { useQuery as useApolloQuery, useMutation as useApolloMutation } from '@vue/apollo-composable'
import * as gql from '@/gql/graphql'
import type { ApolloQueryResult, TypedDocumentNode } from '@apollo/client/core/types'
import { apolloClient } from '@/apollo'
import { ref, type ComputedRef, type Ref, computed } from 'vue'

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
    singleCommittee: gql.SingleCommitteeDocument,
    frontPageBanners: gql.FrontPageBannersDocument,
    companyCorner: gql.CompanyCornerDocument,
    company: gql.CompanyDocument
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

async function _useQueryAsync<
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

/**
 * Uses a query async and wraps result objects to include refetch
 * @param key The query to use
 * @param variables The variables of the query
 * @returns Apollo object
 */
export async function useQueryAsync<TKey extends keyof typeof queries>
(
    key: TKey,
    variables: VariablesOf<typeof queries[TKey]>
): Promise<{
    result: ComputedRef<ResultOf<typeof queries[TKey]> | null>
    loading: Ref<boolean>
    error: Ref<Error | null>
    refetch: (newVariables: VariablesOf<typeof queries[TKey]>) => Promise<void>
}> {
    const result = ref<ResultOf<typeof queries[TKey]> | null>(null)
    const loading = ref(true)
    const error = ref<Error | null>(null)

    const refetch = async (newVariables: VariablesOf<typeof queries[TKey]>) => {
        loading.value = true
        try {
            const response = await _useQueryAsync(key, newVariables)
            result.value = response.data
            error.value = null
        } catch (err) {
            error.value = err as Error
        } finally {
            loading.value = false
        }
    }

    // Initial fetch
    await refetch(variables)

    return {
        result: computed(() => result.value),
        loading,
        error,
        refetch,
    }
}

export function useMutation<
    TKey extends keyof typeof mutations
>(key: TKey) {
    if (!mutations[key]) {
        throw new Error(`Query "${String(key)}" not found`)
    }

    return useApolloMutation(mutations[key])
}
