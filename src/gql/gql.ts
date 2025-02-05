/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query LatestActivitiesQuery($limit: Int) {\n    activities(limit: $limit, begin_Gt: \"2023-05-21T09:32:52.706Z\" ) {\n      results {\n        id\n        description\n        summary\n        begin\n        photos {\n          caption\n          thumbMedium\n          thumbMediumHeight\n          thumbMediumWidth\n        }\n      }\n      totalCount\n    }\n  }\n": typeof types.LatestActivitiesQueryDocument,
    "\nquery OverviewActivitiesQuery($limit: Int, $offset: Int, $begingt: DateTime!) {\n    activities(limit: $limit, offset: $offset, begin_Gt: $begingt, ordering: \"begin,desc\") {\n        results {\n            id\n            begin\n            description\n            summary\n            summary\n            description\n            activityLabel {\n                nameNl\n                nameEn\n                color\n                active\n            }\n        }\n        totalCount\n    }\n}\n": typeof types.OverviewActivitiesQueryDocument,
    "\n  query PastActivitesQuery($limit: Int, $beginlt: DateTime) {\n    activities(limit: $limit, ordering: \"begin,desc\" begin_Lt: $beginlt) {\n      results {\n        id\n        begin\n        description\n        summary\n        photos {\n            thumbMedium\n            thumbMediumHeight\n            thumbMediumWidth\n            caption\n          }\n      }\n    }\n  }\n": typeof types.PastActivitesQueryDocument,
    "\n  query PhotosActivitiesQuery($id: ID) {\n    activity(id: $id) {\n      description\n      summary\n      begin\n      id\n      summary\n      description\n      photos {\n          thumbMedium\n          thumbMediumHeight\n          thumbMediumWidth\n          thumbLarge\n      }\n    }\n  }\n": typeof types.PhotosActivitiesQueryDocument,
    "\n  query UpcomingActivitiesQuery($limit: Int) {\n    activities(limit: $limit, begin_Gt: \"2023-05-21T00:00:00+00:00\") {\n      results {\n        id\n        begin\n        description\n        summary\n        activityLabel {\n            nameNl\n            nameEn\n            color\n            active\n         }\n      }\n      totalCount\n    }\n  }\n": typeof types.UpcomingActivitiesQueryDocument,
    "\n  query DemoOverviewActivitiesQuery($limit: Int, $offset: Int) {\n    activities(limit: $limit, offset: $offset, begin_Gt: \"2022-10-26T18:00:00+00:00\", ordering: \"begin,desc\" ) {\n      results {\n        id\n        begin\n        description\n        summary\n        description\n        activityLabel {\n            nameNl\n            nameEn\n            color\n            active\n         }\n      }\n      totalCount\n    }\n  }\n": typeof types.DemoOverviewActivitiesQueryDocument,
    "\n  query HomepageSliderQuery($limit: Int) {\n    activities(limit: $limit, begin_Gt: \"2023-05-21T09:32:52.706Z\" ) {\n      results {\n        id\n        description\n        summary\n        begin\n        photos {\n          caption\n          thumbMedium\n          thumbMediumHeight\n          thumbMediumWidth\n        }\n      }\n      totalCount\n    }\n  }\n": typeof types.HomepageSliderQueryDocument,
    "\n  query LatestNewsQuery($limit: Int) {\n    newsItems(limit: $limit) {\n      results {\n        id\n        title\n        introduction\n        title\n        introduction\n        publicationDate\n      }\n      totalCount\n    }\n  }\n": typeof types.LatestNewsQueryDocument,
    "\n  query SingleActivitiesQuery($id: ID) {\n    activity(id: $id) {\n      begin\n      id\n      summary\n      description\n      photos {\n          thumbMedium\n          thumbMediumHeight\n          thumbMediumWidth\n      }\n      location\n      hasCosts\n      price\n      activityLabel {\n          nameEn\n          explanationEn\n      }\n      organizer {\n          name\n      }\n      enrollmentEnd\n      enrollmentBegin\n    }\n  }\n": typeof types.SingleActivitiesQueryDocument,
    "\n  query SingleNewsQuery($id: ID) {\n    newsItem(id: $id) {\n      content\n      content\n      title\n      title\n      publicationDate\n      author\n      id\n    }\n  }\n": typeof types.SingleNewsQueryDocument,
    "\n  query EducationViewQuery {\n      educationpages {\n        results {\n          id\n          slug\n          name\n          content\n        }\n      }\n  }\n": typeof types.EducationViewQueryDocument,
    "\n  query PageViewQuery($pageId: ID) {\n    page(id: $pageId) {\n        name\n        slug\n        content\n        name\n        content\n      }\n  }\n": typeof types.PageViewQueryDocument,
};
const documents: Documents = {
    "\n  query LatestActivitiesQuery($limit: Int) {\n    activities(limit: $limit, begin_Gt: \"2023-05-21T09:32:52.706Z\" ) {\n      results {\n        id\n        description\n        summary\n        begin\n        photos {\n          caption\n          thumbMedium\n          thumbMediumHeight\n          thumbMediumWidth\n        }\n      }\n      totalCount\n    }\n  }\n": types.LatestActivitiesQueryDocument,
    "\nquery OverviewActivitiesQuery($limit: Int, $offset: Int, $begingt: DateTime!) {\n    activities(limit: $limit, offset: $offset, begin_Gt: $begingt, ordering: \"begin,desc\") {\n        results {\n            id\n            begin\n            description\n            summary\n            summary\n            description\n            activityLabel {\n                nameNl\n                nameEn\n                color\n                active\n            }\n        }\n        totalCount\n    }\n}\n": types.OverviewActivitiesQueryDocument,
    "\n  query PastActivitesQuery($limit: Int, $beginlt: DateTime) {\n    activities(limit: $limit, ordering: \"begin,desc\" begin_Lt: $beginlt) {\n      results {\n        id\n        begin\n        description\n        summary\n        photos {\n            thumbMedium\n            thumbMediumHeight\n            thumbMediumWidth\n            caption\n          }\n      }\n    }\n  }\n": types.PastActivitesQueryDocument,
    "\n  query PhotosActivitiesQuery($id: ID) {\n    activity(id: $id) {\n      description\n      summary\n      begin\n      id\n      summary\n      description\n      photos {\n          thumbMedium\n          thumbMediumHeight\n          thumbMediumWidth\n          thumbLarge\n      }\n    }\n  }\n": types.PhotosActivitiesQueryDocument,
    "\n  query UpcomingActivitiesQuery($limit: Int) {\n    activities(limit: $limit, begin_Gt: \"2023-05-21T00:00:00+00:00\") {\n      results {\n        id\n        begin\n        description\n        summary\n        activityLabel {\n            nameNl\n            nameEn\n            color\n            active\n         }\n      }\n      totalCount\n    }\n  }\n": types.UpcomingActivitiesQueryDocument,
    "\n  query DemoOverviewActivitiesQuery($limit: Int, $offset: Int) {\n    activities(limit: $limit, offset: $offset, begin_Gt: \"2022-10-26T18:00:00+00:00\", ordering: \"begin,desc\" ) {\n      results {\n        id\n        begin\n        description\n        summary\n        description\n        activityLabel {\n            nameNl\n            nameEn\n            color\n            active\n         }\n      }\n      totalCount\n    }\n  }\n": types.DemoOverviewActivitiesQueryDocument,
    "\n  query HomepageSliderQuery($limit: Int) {\n    activities(limit: $limit, begin_Gt: \"2023-05-21T09:32:52.706Z\" ) {\n      results {\n        id\n        description\n        summary\n        begin\n        photos {\n          caption\n          thumbMedium\n          thumbMediumHeight\n          thumbMediumWidth\n        }\n      }\n      totalCount\n    }\n  }\n": types.HomepageSliderQueryDocument,
    "\n  query LatestNewsQuery($limit: Int) {\n    newsItems(limit: $limit) {\n      results {\n        id\n        title\n        introduction\n        title\n        introduction\n        publicationDate\n      }\n      totalCount\n    }\n  }\n": types.LatestNewsQueryDocument,
    "\n  query SingleActivitiesQuery($id: ID) {\n    activity(id: $id) {\n      begin\n      id\n      summary\n      description\n      photos {\n          thumbMedium\n          thumbMediumHeight\n          thumbMediumWidth\n      }\n      location\n      hasCosts\n      price\n      activityLabel {\n          nameEn\n          explanationEn\n      }\n      organizer {\n          name\n      }\n      enrollmentEnd\n      enrollmentBegin\n    }\n  }\n": types.SingleActivitiesQueryDocument,
    "\n  query SingleNewsQuery($id: ID) {\n    newsItem(id: $id) {\n      content\n      content\n      title\n      title\n      publicationDate\n      author\n      id\n    }\n  }\n": types.SingleNewsQueryDocument,
    "\n  query EducationViewQuery {\n      educationpages {\n        results {\n          id\n          slug\n          name\n          content\n        }\n      }\n  }\n": types.EducationViewQueryDocument,
    "\n  query PageViewQuery($pageId: ID) {\n    page(id: $pageId) {\n        name\n        slug\n        content\n        name\n        content\n      }\n  }\n": types.PageViewQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query LatestActivitiesQuery($limit: Int) {\n    activities(limit: $limit, begin_Gt: \"2023-05-21T09:32:52.706Z\" ) {\n      results {\n        id\n        description\n        summary\n        begin\n        photos {\n          caption\n          thumbMedium\n          thumbMediumHeight\n          thumbMediumWidth\n        }\n      }\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query LatestActivitiesQuery($limit: Int) {\n    activities(limit: $limit, begin_Gt: \"2023-05-21T09:32:52.706Z\" ) {\n      results {\n        id\n        description\n        summary\n        begin\n        photos {\n          caption\n          thumbMedium\n          thumbMediumHeight\n          thumbMediumWidth\n        }\n      }\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery OverviewActivitiesQuery($limit: Int, $offset: Int, $begingt: DateTime!) {\n    activities(limit: $limit, offset: $offset, begin_Gt: $begingt, ordering: \"begin,desc\") {\n        results {\n            id\n            begin\n            description\n            summary\n            summary\n            description\n            activityLabel {\n                nameNl\n                nameEn\n                color\n                active\n            }\n        }\n        totalCount\n    }\n}\n"): (typeof documents)["\nquery OverviewActivitiesQuery($limit: Int, $offset: Int, $begingt: DateTime!) {\n    activities(limit: $limit, offset: $offset, begin_Gt: $begingt, ordering: \"begin,desc\") {\n        results {\n            id\n            begin\n            description\n            summary\n            summary\n            description\n            activityLabel {\n                nameNl\n                nameEn\n                color\n                active\n            }\n        }\n        totalCount\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PastActivitesQuery($limit: Int, $beginlt: DateTime) {\n    activities(limit: $limit, ordering: \"begin,desc\" begin_Lt: $beginlt) {\n      results {\n        id\n        begin\n        description\n        summary\n        photos {\n            thumbMedium\n            thumbMediumHeight\n            thumbMediumWidth\n            caption\n          }\n      }\n    }\n  }\n"): (typeof documents)["\n  query PastActivitesQuery($limit: Int, $beginlt: DateTime) {\n    activities(limit: $limit, ordering: \"begin,desc\" begin_Lt: $beginlt) {\n      results {\n        id\n        begin\n        description\n        summary\n        photos {\n            thumbMedium\n            thumbMediumHeight\n            thumbMediumWidth\n            caption\n          }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PhotosActivitiesQuery($id: ID) {\n    activity(id: $id) {\n      description\n      summary\n      begin\n      id\n      summary\n      description\n      photos {\n          thumbMedium\n          thumbMediumHeight\n          thumbMediumWidth\n          thumbLarge\n      }\n    }\n  }\n"): (typeof documents)["\n  query PhotosActivitiesQuery($id: ID) {\n    activity(id: $id) {\n      description\n      summary\n      begin\n      id\n      summary\n      description\n      photos {\n          thumbMedium\n          thumbMediumHeight\n          thumbMediumWidth\n          thumbLarge\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UpcomingActivitiesQuery($limit: Int) {\n    activities(limit: $limit, begin_Gt: \"2023-05-21T00:00:00+00:00\") {\n      results {\n        id\n        begin\n        description\n        summary\n        activityLabel {\n            nameNl\n            nameEn\n            color\n            active\n         }\n      }\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query UpcomingActivitiesQuery($limit: Int) {\n    activities(limit: $limit, begin_Gt: \"2023-05-21T00:00:00+00:00\") {\n      results {\n        id\n        begin\n        description\n        summary\n        activityLabel {\n            nameNl\n            nameEn\n            color\n            active\n         }\n      }\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DemoOverviewActivitiesQuery($limit: Int, $offset: Int) {\n    activities(limit: $limit, offset: $offset, begin_Gt: \"2022-10-26T18:00:00+00:00\", ordering: \"begin,desc\" ) {\n      results {\n        id\n        begin\n        description\n        summary\n        description\n        activityLabel {\n            nameNl\n            nameEn\n            color\n            active\n         }\n      }\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query DemoOverviewActivitiesQuery($limit: Int, $offset: Int) {\n    activities(limit: $limit, offset: $offset, begin_Gt: \"2022-10-26T18:00:00+00:00\", ordering: \"begin,desc\" ) {\n      results {\n        id\n        begin\n        description\n        summary\n        description\n        activityLabel {\n            nameNl\n            nameEn\n            color\n            active\n         }\n      }\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query HomepageSliderQuery($limit: Int) {\n    activities(limit: $limit, begin_Gt: \"2023-05-21T09:32:52.706Z\" ) {\n      results {\n        id\n        description\n        summary\n        begin\n        photos {\n          caption\n          thumbMedium\n          thumbMediumHeight\n          thumbMediumWidth\n        }\n      }\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query HomepageSliderQuery($limit: Int) {\n    activities(limit: $limit, begin_Gt: \"2023-05-21T09:32:52.706Z\" ) {\n      results {\n        id\n        description\n        summary\n        begin\n        photos {\n          caption\n          thumbMedium\n          thumbMediumHeight\n          thumbMediumWidth\n        }\n      }\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query LatestNewsQuery($limit: Int) {\n    newsItems(limit: $limit) {\n      results {\n        id\n        title\n        introduction\n        title\n        introduction\n        publicationDate\n      }\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query LatestNewsQuery($limit: Int) {\n    newsItems(limit: $limit) {\n      results {\n        id\n        title\n        introduction\n        title\n        introduction\n        publicationDate\n      }\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SingleActivitiesQuery($id: ID) {\n    activity(id: $id) {\n      begin\n      id\n      summary\n      description\n      photos {\n          thumbMedium\n          thumbMediumHeight\n          thumbMediumWidth\n      }\n      location\n      hasCosts\n      price\n      activityLabel {\n          nameEn\n          explanationEn\n      }\n      organizer {\n          name\n      }\n      enrollmentEnd\n      enrollmentBegin\n    }\n  }\n"): (typeof documents)["\n  query SingleActivitiesQuery($id: ID) {\n    activity(id: $id) {\n      begin\n      id\n      summary\n      description\n      photos {\n          thumbMedium\n          thumbMediumHeight\n          thumbMediumWidth\n      }\n      location\n      hasCosts\n      price\n      activityLabel {\n          nameEn\n          explanationEn\n      }\n      organizer {\n          name\n      }\n      enrollmentEnd\n      enrollmentBegin\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SingleNewsQuery($id: ID) {\n    newsItem(id: $id) {\n      content\n      content\n      title\n      title\n      publicationDate\n      author\n      id\n    }\n  }\n"): (typeof documents)["\n  query SingleNewsQuery($id: ID) {\n    newsItem(id: $id) {\n      content\n      content\n      title\n      title\n      publicationDate\n      author\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query EducationViewQuery {\n      educationpages {\n        results {\n          id\n          slug\n          name\n          content\n        }\n      }\n  }\n"): (typeof documents)["\n  query EducationViewQuery {\n      educationpages {\n        results {\n          id\n          slug\n          name\n          content\n        }\n      }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PageViewQuery($pageId: ID) {\n    page(id: $pageId) {\n        name\n        slug\n        content\n        name\n        content\n      }\n  }\n"): (typeof documents)["\n  query PageViewQuery($pageId: ID) {\n    page(id: $pageId) {\n        name\n        slug\n        content\n        name\n        content\n      }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;