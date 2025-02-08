import { useQuery } from '@vue/apollo-composable'
import { _queries } from '@/queries/queries.gql'

import type {
    ActivitiesSliderCardQueryQueryVariables,
    DemoOverviewActivitiesQueryQueryVariables,
    EducationViewQueryQueryVariables,
    HomepageSliderQueryQueryVariables,
    LatestActivitiesQueryQueryVariables,
    LatestNewsQueryQueryVariables,
    OverviewActivitiesQueryQueryVariables,
    OverviewNewsQueryQueryVariables,
    PageViewQueryQueryVariables,
    PastActivitesQueryQueryVariables,
    PhotosActivitiesQueryQueryVariables,
    SingleActivitiesQueryQueryVariables,
    SingleNewsQueryQueryVariables,
    UpcomingActivitiesQueryQueryVariables,
} from '@/gql/graphql'

export function getLatestActivities(variables: LatestActivitiesQueryQueryVariables) {
    return useQuery(_queries.LatestActivitiesQuery, variables)
}

export function getOverviewActivities(variables: OverviewActivitiesQueryQueryVariables) {
    return useQuery(_queries.OverviewActivitiesQuery, variables)
}

export function getPastActivitiesQuery(variables: PastActivitesQueryQueryVariables) {
    return useQuery(_queries.PastActivitiesQuery, variables)
}

export function getPhotosActivitiesQuery(variables: PhotosActivitiesQueryQueryVariables) {
    return useQuery(_queries.PhotosActivitiesQuery, variables)
}

export function getUpcomingActivitiesQuery(variables: UpcomingActivitiesQueryQueryVariables) {
    return useQuery(_queries.UpcomingActivitiesQuery, variables)
}

export function getDemoOverviewActivitiesQuery(
    variables: DemoOverviewActivitiesQueryQueryVariables,
) {
    return useQuery(_queries.DemoOverviewActivitiesQuery, variables)
}

export function getActivitiesSliderCardQuery(variables: ActivitiesSliderCardQueryQueryVariables) {
    return useQuery(_queries.ActivitiesSliderCardQuery, variables)
}

export function getHomepageSliderQuery(variables: HomepageSliderQueryQueryVariables) {
    return useQuery(_queries.HomepageSliderQuery, variables)
}

export function getLatestNewsQuery(variables: LatestNewsQueryQueryVariables) {
    return useQuery(_queries.LatestNewsQuery, variables)
}

export function getOverviewNewsQuery(variables: OverviewNewsQueryQueryVariables) {
    return useQuery(_queries.OverviewNewsQuery, variables)
}

export function getSingleActivitiesQuery(variables: SingleActivitiesQueryQueryVariables) {
    return useQuery(_queries.SingleActivitiesQuery, variables)
}

export function getSingleNewsQuery(variables: SingleNewsQueryQueryVariables) {
    return useQuery(_queries.SingleNewsQuery, variables)
}
export function getEducationViewQuery(variables: EducationViewQueryQueryVariables) {
    return useQuery(_queries.EducationViewQuery, variables)
}

export function getPageViewQuery(variables: PageViewQueryQueryVariables) {
    return useQuery(_queries.PageViewQuery, variables)
}
