import { useQuery } from '@vue/apollo-composable'
import { graphql } from '@/gql'
import LatestActivitiesQuery from '@/gql/queries/activities/LatestActivitiesQuery.gql'
import OverviewActivitiesQuery from '@/gql/queries/activities/OverviewActivitiesQuery.gql'
import type {
    LatestActivitiesQueryQueryVariables,
    OverviewActivitiesQueryQueryVariables,
} from '@/gql/graphql'
import { computed } from 'vue'

export function getLatestActivities(variables: LatestActivitiesQueryQueryVariables) {
    const { result, loading, error, refetch } = useQuery(graphql(LatestActivitiesQuery), variables)

    const mappedResult = computed(() => {
        return result.value?.activities?.results?.map((e) => e!).filter((node) => node !== null)
    })

    return { result: mappedResult, loading, error, refetch }
}

export function getAllActivities(variables: OverviewActivitiesQueryQueryVariables) {
    const { result, loading, error, refetch } = useQuery(
        graphql(OverviewActivitiesQuery),
        variables,
    )

    const mappedResult = computed(() => {
        return result.value?.activities?.results?.map((e) => e!).filter((node) => node !== null)
    })

    return { result: mappedResult, loading, error, refetch }
}
