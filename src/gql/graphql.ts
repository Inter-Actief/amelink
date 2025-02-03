/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
    [_ in K]?: never
}
export type Incremental<T> =
    | T
    | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string }
    String: { input: string; output: string }
    Boolean: { input: boolean; output: boolean }
    Int: { input: number; output: number }
    Float: { input: number; output: number }
    /**
     * The `Date` scalar type represents a Date
     * value as specified by
     * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
     */
    Date: { input: any; output: any }
    /**
     * The `DateTime` scalar type represents a DateTime
     * value as specified by
     * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
     */
    DateTime: { input: any; output: any }
    /** The `Decimal` scalar type represents a python Decimal. */
    Decimal: { input: any; output: any }
    /**
     * The `GenericScalar` scalar type represents a generic
     * GraphQL scalar value that could be:
     * String, Boolean, Int, Float, List or Object.
     */
    GenericScalar: { input: any; output: any }
}

export type ActivityLabelType = {
    __typename?: 'ActivityLabelType'
    active: Scalars['Boolean']['output']
    color: Scalars['String']['output']
    explanationEn: Scalars['String']['output']
    explanationNl: Scalars['String']['output']
    icon: Scalars['String']['output']
    nameEn: Scalars['String']['output']
    nameNl: Scalars['String']['output']
}

export type ActivityType = {
    __typename?: 'ActivityType'
    /** The absolute URL to an activity. */
    absoluteUrl?: Maybe<Scalars['String']['output']>
    activityLabel: ActivityLabelType
    /** Attachment ids */
    attachments?: Maybe<Array<Maybe<AttachmentType>>>
    begin: Scalars['DateTime']['output']
    /** A link to the ICS file for this activity. */
    calendarUrl?: Maybe<Scalars['String']['output']>
    /** Whether the person that is currently signed-in can edit this activity. */
    canEdit?: Maybe<Scalars['Boolean']['output']>
    canUnenroll: Scalars['Boolean']['output']
    components: Array<ActivityType>
    /** A description of this activity in the preferred language of this user. */
    description?: Maybe<Scalars['String']['output']>
    descriptionEn?: Maybe<Scalars['String']['output']>
    descriptionNl: Scalars['String']['output']
    /** A brief description of this activity (always in english). */
    descriptionShort?: Maybe<Scalars['String']['output']>
    dutchActivity: Scalars['Boolean']['output']
    end: Scalars['DateTime']['output']
    enrollment: Scalars['Boolean']['output']
    /** Whether this activity is almost full (<= 10 places left). */
    enrollmentAlmostFull?: Maybe<Scalars['Boolean']['output']>
    /** If you want to add options, make sure your activity isn't open for enrollment right away */
    enrollmentBegin?: Maybe<Scalars['DateTime']['output']>
    /** Whether people can no longer enroll for this activity. */
    enrollmentClosed?: Maybe<Scalars['Boolean']['output']>
    enrollmentEnd?: Maybe<Scalars['DateTime']['output']>
    /** Whether this activity is full. */
    enrollmentFull?: Maybe<Scalars['Boolean']['output']>
    /** Whether people can still enroll for this activity. */
    enrollmentOpen?: Maybe<Scalars['Boolean']['output']>
    entireDay: Scalars['Boolean']['output']
    /** If there are any costs associated with this activity. */
    hasCosts?: Maybe<Scalars['Boolean']['output']>
    /** If there are any options for enrollments. */
    hasEnrollmentOptions?: Maybe<Scalars['Boolean']['output']>
    id: Scalars['ID']['output']
    /** Image of 175 by 275 pixels. */
    imageIcon?: Maybe<Scalars['String']['output']>
    location: Scalars['String']['output']
    maximum?: Maybe<Scalars['Int']['output']>
    organizer: CommitteeType
    /** A URL that points to the picture gallery for this activity. */
    photoUrl?: Maybe<Scalars['String']['output']>
    photos: Array<AttachmentType>
    price: Scalars['Decimal']['output']
    /** Promotional text for this activity in the preferred language of this user. */
    promo?: Maybe<Scalars['String']['output']>
    /** This text can be used by the board for promotion, for example on our socials or in our weekmail. Let it be a teaser, so people would want to read your full activity description. */
    promoEn: Scalars['String']['output']
    /** This text can be used by the board for promotion, for example on our socials or in our weekmail. Let it be a teaser, so people would want to read your full activity description. */
    promoNl: Scalars['String']['output']
    public: Scalars['Boolean']['output']
    /** A URL to a random picture that was made at this activity. */
    randomPhotoUrl?: Maybe<Scalars['String']['output']>
    /** A summary of this activity in the preferred language of this user. */
    summary?: Maybe<Scalars['String']['output']>
    summaryEn?: Maybe<Scalars['String']['output']>
    summaryNl: Scalars['String']['output']
    waitingListLocked: Scalars['Boolean']['output']
}

export type ActivityTypeNodeConnection = {
    __typename?: 'ActivityTypeNodeConnection'
    /** Pagination data for this connection. */
    pageInfo: PageInfoExtra
    /** Contains the nodes in this connection. */
    results: Array<Maybe<ActivityType>>
    totalCount?: Maybe<Scalars['Int']['output']>
}

export type AttachmentType = {
    __typename?: 'AttachmentType'
    caption?: Maybe<Scalars['String']['output']>
    created: Scalars['DateTime']['output']
    file: Scalars['String']['output']
    mimetype: Scalars['String']['output']
    modified: Scalars['DateTime']['output']
    public: Scalars['Boolean']['output']
    thumbLarge?: Maybe<Scalars['String']['output']>
    thumbLargeHeight?: Maybe<Scalars['Int']['output']>
    thumbLargeWidth?: Maybe<Scalars['Int']['output']>
    thumbMedium?: Maybe<Scalars['String']['output']>
    thumbMediumHeight?: Maybe<Scalars['Int']['output']>
    thumbMediumWidth?: Maybe<Scalars['Int']['output']>
    thumbSmall?: Maybe<Scalars['String']['output']>
    thumbSmallHeight?: Maybe<Scalars['Int']['output']>
    thumbSmallWidth?: Maybe<Scalars['Int']['output']>
}

/** Type definition for a single CommitteeCategory */
export type CommitteeCategoryType = {
    __typename?: 'CommitteeCategoryType'
    committeeSet?: Maybe<Array<Maybe<CommitteeType>>>
    id: Scalars['ID']['output']
    name: Scalars['String']['output']
    slug: Scalars['String']['output']
}

/** Type definition for a single CommitteeCategory */
export type CommitteeCategoryTypeCommitteeSetArgs = {
    includeAbolished?: InputMaybe<Scalars['Boolean']['input']>
}

export type CommitteeCategoryTypeNodeConnection = {
    __typename?: 'CommitteeCategoryTypeNodeConnection'
    /** Pagination data for this connection. */
    pageInfo: PageInfoExtra
    /** Contains the nodes in this connection. */
    results: Array<Maybe<CommitteeCategoryType>>
    totalCount?: Maybe<Scalars['Int']['output']>
}

/** Type definition for a single Committee */
export type CommitteeType = {
    __typename?: 'CommitteeType'
    abolished?: Maybe<Scalars['Date']['output']>
    category?: Maybe<CommitteeCategoryType>
    email: Scalars['String']['output']
    founded: Scalars['Date']['output']
    functionSet?: Maybe<Array<Maybe<FunctionType>>>
    groupPicture?: Maybe<Scalars['String']['output']>
    id: Scalars['ID']['output']
    /** Committee information (localized for user) */
    information?: Maybe<Scalars['String']['output']>
    informationEn: Scalars['String']['output']
    informationNl: Scalars['String']['output']
    logo?: Maybe<Scalars['String']['output']>
    name: Scalars['String']['output']
    parentCommittees: Array<CommitteeType>
    slug: Scalars['String']['output']
    website: Scalars['String']['output']
}

/** Type definition for a single Committee */
export type CommitteeTypeFunctionSetArgs = {
    includePastMembers?: InputMaybe<Scalars['Boolean']['input']>
}

export type CommitteeTypeNodeConnection = {
    __typename?: 'CommitteeTypeNodeConnection'
    /** Pagination data for this connection. */
    pageInfo: PageInfoExtra
    /** Contains the nodes in this connection. */
    results: Array<Maybe<CommitteeType>>
    totalCount?: Maybe<Scalars['Int']['output']>
}

export type CompanyEventType = {
    __typename?: 'CompanyEventType'
    /** The absolute URL to this event */
    absoluteUrl?: Maybe<Scalars['String']['output']>
    /** The label that belongs to this activity */
    activityLabel?: Maybe<ActivityLabelType>
    /** The type of activity */
    activityType?: Maybe<Scalars['String']['output']>
    /** Attachment ids */
    attachments?: Maybe<Array<Maybe<AttachmentType>>>
    begin: Scalars['DateTime']['output']
    /** The url to the ics for this activity */
    calenderUrl?: Maybe<Scalars['String']['output']>
    company?: Maybe<CompanyType>
    companyText: Scalars['String']['output']
    companyUrl: Scalars['String']['output']
    /** A description of this activity in the preferred language of this user. */
    description?: Maybe<Scalars['String']['output']>
    descriptionEn?: Maybe<Scalars['String']['output']>
    descriptionNl: Scalars['String']['output']
    /** A brief description of this activity (always in english). */
    descriptionShort?: Maybe<Scalars['String']['output']>
    dutchActivity: Scalars['Boolean']['output']
    end: Scalars['DateTime']['output']
    entireDay: Scalars['Boolean']['output']
    id: Scalars['ID']['output']
    /** Whether this event is visible */
    isVisible?: Maybe<Scalars['Boolean']['output']>
    location: Scalars['String']['output']
    organizer: CommitteeType
    /** Promotional text for this activity in the preferred language of this user. */
    promo?: Maybe<Scalars['String']['output']>
    /** This text can be used by the board for promotion, for example on our socials or in our weekmail. Let it be a teaser, so people would want to read your full activity description. */
    promoEn: Scalars['String']['output']
    /** This text can be used by the board for promotion, for example on our socials or in our weekmail. Let it be a teaser, so people would want to read your full activity description. */
    promoNl: Scalars['String']['output']
    public: Scalars['Boolean']['output']
    /** A summary of this activity in the preferred language of this user. */
    summary?: Maybe<Scalars['String']['output']>
    summaryEn?: Maybe<Scalars['String']['output']>
    summaryNl: Scalars['String']['output']
}

export type CompanyEventTypeNodeConnection = {
    __typename?: 'CompanyEventTypeNodeConnection'
    /** Pagination data for this connection. */
    pageInfo: PageInfoExtra
    /** Contains the nodes in this connection. */
    results: Array<Maybe<CompanyEventType>>
    totalCount?: Maybe<Scalars['Int']['output']>
}

/** Type definition of a single Company */
export type CompanyType = {
    __typename?: 'CompanyType'
    appLogo?: Maybe<Scalars['String']['output']>
    appLogoHeight?: Maybe<Scalars['Int']['output']>
    appLogoWidth?: Maybe<Scalars['Int']['output']>
    endDate: Scalars['Date']['output']
    logo?: Maybe<Scalars['String']['output']>
    logoHeight?: Maybe<Scalars['Int']['output']>
    logoWidth?: Maybe<Scalars['Int']['output']>
    /** Name of the company */
    name?: Maybe<Scalars['String']['output']>
    nameEn: Scalars['String']['output']
    nameNl: Scalars['String']['output']
    /** Profile of the company */
    profile?: Maybe<Scalars['String']['output']>
    profileEn: Scalars['String']['output']
    profileNl: Scalars['String']['output']
    /** Short description of the company */
    shortDescription?: Maybe<Scalars['String']['output']>
    shortDescriptionEn: Scalars['String']['output']
    shortDescriptionNl: Scalars['String']['output']
    showInApp: Scalars['Boolean']['output']
    slug: Scalars['String']['output']
    startDate: Scalars['Date']['output']
    url: Scalars['String']['output']
}

export type CompanyTypeNodeConnection = {
    __typename?: 'CompanyTypeNodeConnection'
    /** Pagination data for this connection. */
    pageInfo: PageInfoExtra
    /** Contains the nodes in this connection. */
    results: Array<Maybe<CompanyType>>
    totalCount?: Maybe<Scalars['Int']['output']>
}

export type EducationEventType = {
    __typename?: 'EducationEventType'
    /** The absolute URL to this event */
    absoluteUrl?: Maybe<Scalars['String']['output']>
    activityLabel?: Maybe<ActivityLabelType>
    /** The type of event */
    activityType?: Maybe<Scalars['String']['output']>
    /** Attachment ids */
    attachments?: Maybe<Array<Maybe<AttachmentType>>>
    begin: Scalars['DateTime']['output']
    /** A description of this activity in the preferred language of this user. */
    description?: Maybe<Scalars['String']['output']>
    descriptionEn?: Maybe<Scalars['String']['output']>
    descriptionNl: Scalars['String']['output']
    /** A brief description of this activity (always in english). */
    descriptionShort?: Maybe<Scalars['String']['output']>
    dutchActivity: Scalars['Boolean']['output']
    educationOrganizer: Scalars['String']['output']
    end: Scalars['DateTime']['output']
    entireDay: Scalars['Boolean']['output']
    id: Scalars['ID']['output']
    location: Scalars['String']['output']
    organizer: CommitteeType
    /** Promotional text for this activity in the preferred language of this user. */
    promo?: Maybe<Scalars['String']['output']>
    /** This text can be used by the board for promotion, for example on our socials or in our weekmail. Let it be a teaser, so people would want to read your full activity description. */
    promoEn: Scalars['String']['output']
    /** This text can be used by the board for promotion, for example on our socials or in our weekmail. Let it be a teaser, so people would want to read your full activity description. */
    promoNl: Scalars['String']['output']
    public: Scalars['Boolean']['output']
    /** A summary of this activity in the preferred language of this user. */
    summary?: Maybe<Scalars['String']['output']>
    summaryEn?: Maybe<Scalars['String']['output']>
    summaryNl: Scalars['String']['output']
}

export type EducationEventTypeNodeConnection = {
    __typename?: 'EducationEventTypeNodeConnection'
    /** Pagination data for this connection. */
    pageInfo: PageInfoExtra
    /** Contains the nodes in this connection. */
    results: Array<Maybe<EducationEventType>>
    totalCount?: Maybe<Scalars['Int']['output']>
}

/** Type definition for a single education page Category */
export type EducationPageCategoryType = {
    __typename?: 'EducationPageCategoryType'
    id: Scalars['ID']['output']
    /** Category name (localized for user) */
    name?: Maybe<Scalars['String']['output']>
    nameEn: Scalars['String']['output']
    nameNl: Scalars['String']['output']
    pageSet: Array<EducationPageType>
}

export type EducationPageCategoryTypeNodeConnection = {
    __typename?: 'EducationPageCategoryTypeNodeConnection'
    /** Pagination data for this connection. */
    pageInfo: PageInfoExtra
    /** Contains the nodes in this connection. */
    results: Array<Maybe<EducationPageCategoryType>>
    totalCount?: Maybe<Scalars['Int']['output']>
}

/** Type definition for a single Education Page */
export type EducationPageType = {
    __typename?: 'EducationPageType'
    category: EducationPageCategoryType
    /** Page content (localized for user) */
    content?: Maybe<Scalars['String']['output']>
    contentEn: Scalars['String']['output']
    contentNl: Scalars['String']['output']
    id: Scalars['ID']['output']
    lastChanged: Scalars['DateTime']['output']
    /** Page name (localized for user) */
    name?: Maybe<Scalars['String']['output']>
    nameEn: Scalars['String']['output']
    nameNl: Scalars['String']['output']
    position: Scalars['Int']['output']
    slug: Scalars['String']['output']
}

export type EducationPageTypeNodeConnection = {
    __typename?: 'EducationPageTypeNodeConnection'
    /** Pagination data for this connection. */
    pageInfo: PageInfoExtra
    /** Contains the nodes in this connection. */
    results: Array<Maybe<EducationPageType>>
    totalCount?: Maybe<Scalars['Int']['output']>
}

export type EducationalBouquetMutationInput = {
    author: Scalars['String']['input']
    clientMutationId?: InputMaybe<Scalars['String']['input']>
    course: Scalars['String']['input']
    email: Scalars['String']['input']
    reason: Scalars['String']['input']
    teacher: Scalars['String']['input']
}

export type EducationalBouquetMutationPayload = {
    __typename?: 'EducationalBouquetMutationPayload'
    author: Scalars['String']['output']
    clientMutationId?: Maybe<Scalars['String']['output']>
    course: Scalars['String']['output']
    email: Scalars['String']['output']
    errors?: Maybe<Array<Maybe<ErrorType>>>
    reason: Scalars['String']['output']
    teacher: Scalars['String']['output']
}

export type ErrorType = {
    __typename?: 'ErrorType'
    field: Scalars['String']['output']
    messages: Array<Scalars['String']['output']>
}

/** Type definition for a single Function */
export type FunctionType = {
    __typename?: 'FunctionType'
    begin: Scalars['Date']['output']
    committee: CommitteeType
    end?: Maybe<Scalars['Date']['output']>
    function: Scalars['String']['output']
    /** This person is currently a member of this committee */
    isCurrentMember?: Maybe<Scalars['Boolean']['output']>
    /** Person name */
    person?: Maybe<Scalars['String']['output']>
}

export type GraphQlMutation = {
    __typename?: 'GraphQLMutation'
    educationalBouquet?: Maybe<EducationalBouquetMutationPayload>
    /** Check if an authentication token is valid */
    verifyToken?: Maybe<Verify>
}

export type GraphQlMutationEducationalBouquetArgs = {
    input: EducationalBouquetMutationInput
}

export type GraphQlMutationVerifyTokenArgs = {
    token?: InputMaybe<Scalars['String']['input']>
}

export type GraphQlQuery = {
    __typename?: 'GraphQLQuery'
    activities?: Maybe<ActivityTypeNodeConnection>
    activity?: Maybe<ActivityType>
    attachment?: Maybe<AttachmentType>
    committee?: Maybe<CommitteeType>
    committeeCategories?: Maybe<CommitteeCategoryTypeNodeConnection>
    committeeCategory?: Maybe<CommitteeCategoryType>
    committees?: Maybe<CommitteeTypeNodeConnection>
    companies?: Maybe<CompanyTypeNodeConnection>
    company?: Maybe<CompanyType>
    companyEvent?: Maybe<CompanyEventType>
    companyEvents?: Maybe<CompanyEventTypeNodeConnection>
    educationEvent?: Maybe<EducationEventType>
    educationEvents?: Maybe<EducationEventTypeNodeConnection>
    educationpage?: Maybe<EducationPageType>
    educationpageCategories?: Maybe<EducationPageCategoryTypeNodeConnection>
    educationpageCategory?: Maybe<EducationPageCategoryType>
    educationpages?: Maybe<EducationPageTypeNodeConnection>
    /** Information about the currently logged in user */
    me?: Maybe<UserType>
    newsItem?: Maybe<NewsItemType>
    newsItems?: Maybe<NewsItemTypeNodeConnection>
    page?: Maybe<PageType>
    publication?: Maybe<PublicationItemType>
    publications?: Maybe<PublicationItemTypeNodeConnection>
    televisionBanner?: Maybe<TelevisionBannerType>
    televisionBanners?: Maybe<TelevisionBannerTypeNodeConnection>
    video?: Maybe<VideoType>
    videos?: Maybe<VideoTypeNodeConnection>
    vivatBanner?: Maybe<VivatBannerType>
    vivatBanners?: Maybe<VivatBannerTypeNodeConnection>
    websiteBanner?: Maybe<WebsiteBannerType>
    websiteBanners?: Maybe<WebsiteBannerTypeNodeConnection>
}

export type GraphQlQueryActivitiesArgs = {
    after?: InputMaybe<Scalars['String']['input']>
    before?: InputMaybe<Scalars['String']['input']>
    begin?: InputMaybe<Scalars['DateTime']['input']>
    begin_Gt?: InputMaybe<Scalars['DateTime']['input']>
    begin_Lt?: InputMaybe<Scalars['DateTime']['input']>
    dutchActivity?: InputMaybe<Scalars['Boolean']['input']>
    end?: InputMaybe<Scalars['DateTime']['input']>
    end_Gt?: InputMaybe<Scalars['DateTime']['input']>
    end_Lt?: InputMaybe<Scalars['DateTime']['input']>
    first?: InputMaybe<Scalars['Int']['input']>
    id?: InputMaybe<Scalars['ID']['input']>
    last?: InputMaybe<Scalars['Int']['input']>
    limit?: InputMaybe<Scalars['Int']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    ordering?: InputMaybe<Scalars['String']['input']>
    organizer?: InputMaybe<Scalars['ID']['input']>
    summaryEn_Icontains?: InputMaybe<Scalars['String']['input']>
    summaryEn_Iexact?: InputMaybe<Scalars['String']['input']>
    summaryNl_Icontains?: InputMaybe<Scalars['String']['input']>
    summaryNl_Iexact?: InputMaybe<Scalars['String']['input']>
}

export type GraphQlQueryActivityArgs = {
    id?: InputMaybe<Scalars['ID']['input']>
}

export type GraphQlQueryAttachmentArgs = {
    id?: InputMaybe<Scalars['ID']['input']>
}

export type GraphQlQueryCommitteeArgs = {
    id?: InputMaybe<Scalars['ID']['input']>
    slug?: InputMaybe<Scalars['String']['input']>
}

export type GraphQlQueryCommitteeCategoriesArgs = {
    after?: InputMaybe<Scalars['String']['input']>
    before?: InputMaybe<Scalars['String']['input']>
    first?: InputMaybe<Scalars['Int']['input']>
    id?: InputMaybe<Scalars['ID']['input']>
    last?: InputMaybe<Scalars['Int']['input']>
    limit?: InputMaybe<Scalars['Int']['input']>
    name_Icontains?: InputMaybe<Scalars['String']['input']>
    name_Iexact?: InputMaybe<Scalars['String']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    ordering?: InputMaybe<Scalars['String']['input']>
}

export type GraphQlQueryCommitteeCategoryArgs = {
    id?: InputMaybe<Scalars['ID']['input']>
    slug?: InputMaybe<Scalars['String']['input']>
}

export type GraphQlQueryCommitteesArgs = {
    abolished?: InputMaybe<Scalars['Date']['input']>
    abolished_Gt?: InputMaybe<Scalars['Date']['input']>
    abolished_Lt?: InputMaybe<Scalars['Date']['input']>
    after?: InputMaybe<Scalars['String']['input']>
    before?: InputMaybe<Scalars['String']['input']>
    first?: InputMaybe<Scalars['Int']['input']>
    founded?: InputMaybe<Scalars['Date']['input']>
    founded_Gt?: InputMaybe<Scalars['Date']['input']>
    founded_Lt?: InputMaybe<Scalars['Date']['input']>
    id?: InputMaybe<Scalars['ID']['input']>
    includeAbolished: Scalars['Boolean']['input']
    last?: InputMaybe<Scalars['Int']['input']>
    limit?: InputMaybe<Scalars['Int']['input']>
    name_Icontains?: InputMaybe<Scalars['String']['input']>
    name_Iexact?: InputMaybe<Scalars['String']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    ordering?: InputMaybe<Scalars['String']['input']>
    slug?: InputMaybe<Scalars['String']['input']>
}

export type GraphQlQueryCompaniesArgs = {
    after?: InputMaybe<Scalars['String']['input']>
    before?: InputMaybe<Scalars['String']['input']>
    first?: InputMaybe<Scalars['Int']['input']>
    last?: InputMaybe<Scalars['Int']['input']>
    limit?: InputMaybe<Scalars['Int']['input']>
    nameEn_Icontains?: InputMaybe<Scalars['String']['input']>
    nameEn_Iexact?: InputMaybe<Scalars['String']['input']>
    nameNl_Icontains?: InputMaybe<Scalars['String']['input']>
    nameNl_Iexact?: InputMaybe<Scalars['String']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    ordering?: InputMaybe<Scalars['String']['input']>
}

export type GraphQlQueryCompanyArgs = {
    id?: InputMaybe<Scalars['ID']['input']>
    slug?: InputMaybe<Scalars['String']['input']>
}

export type GraphQlQueryCompanyEventArgs = {
    id?: InputMaybe<Scalars['ID']['input']>
}

export type GraphQlQueryCompanyEventsArgs = {
    after?: InputMaybe<Scalars['String']['input']>
    before?: InputMaybe<Scalars['String']['input']>
    begin?: InputMaybe<Scalars['DateTime']['input']>
    begin_Gt?: InputMaybe<Scalars['DateTime']['input']>
    begin_Lt?: InputMaybe<Scalars['DateTime']['input']>
    dutchActivity?: InputMaybe<Scalars['Boolean']['input']>
    end?: InputMaybe<Scalars['DateTime']['input']>
    end_Gt?: InputMaybe<Scalars['DateTime']['input']>
    end_Lt?: InputMaybe<Scalars['DateTime']['input']>
    first?: InputMaybe<Scalars['Int']['input']>
    id?: InputMaybe<Scalars['ID']['input']>
    last?: InputMaybe<Scalars['Int']['input']>
    limit?: InputMaybe<Scalars['Int']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    ordering?: InputMaybe<Scalars['String']['input']>
    summaryEn_Icontains?: InputMaybe<Scalars['String']['input']>
    summaryEn_Iexact?: InputMaybe<Scalars['String']['input']>
    summaryNl_Icontains?: InputMaybe<Scalars['String']['input']>
    summaryNl_Iexact?: InputMaybe<Scalars['String']['input']>
}

export type GraphQlQueryEducationEventArgs = {
    id?: InputMaybe<Scalars['ID']['input']>
}

export type GraphQlQueryEducationEventsArgs = {
    after?: InputMaybe<Scalars['String']['input']>
    before?: InputMaybe<Scalars['String']['input']>
    begin?: InputMaybe<Scalars['DateTime']['input']>
    begin_Gt?: InputMaybe<Scalars['DateTime']['input']>
    begin_Lt?: InputMaybe<Scalars['DateTime']['input']>
    dutchActivity?: InputMaybe<Scalars['Boolean']['input']>
    end?: InputMaybe<Scalars['DateTime']['input']>
    end_Gt?: InputMaybe<Scalars['DateTime']['input']>
    end_Lt?: InputMaybe<Scalars['DateTime']['input']>
    first?: InputMaybe<Scalars['Int']['input']>
    id?: InputMaybe<Scalars['ID']['input']>
    last?: InputMaybe<Scalars['Int']['input']>
    limit?: InputMaybe<Scalars['Int']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    ordering?: InputMaybe<Scalars['String']['input']>
    summaryEn_Icontains?: InputMaybe<Scalars['String']['input']>
    summaryEn_Iexact?: InputMaybe<Scalars['String']['input']>
    summaryNl_Icontains?: InputMaybe<Scalars['String']['input']>
    summaryNl_Iexact?: InputMaybe<Scalars['String']['input']>
}

export type GraphQlQueryEducationpageArgs = {
    id?: InputMaybe<Scalars['ID']['input']>
    slug?: InputMaybe<Scalars['String']['input']>
}

export type GraphQlQueryEducationpageCategoriesArgs = {
    after?: InputMaybe<Scalars['String']['input']>
    before?: InputMaybe<Scalars['String']['input']>
    first?: InputMaybe<Scalars['Int']['input']>
    id?: InputMaybe<Scalars['ID']['input']>
    last?: InputMaybe<Scalars['Int']['input']>
    limit?: InputMaybe<Scalars['Int']['input']>
    nameEn_Icontains?: InputMaybe<Scalars['String']['input']>
    nameEn_Iexact?: InputMaybe<Scalars['String']['input']>
    nameNl_Icontains?: InputMaybe<Scalars['String']['input']>
    nameNl_Iexact?: InputMaybe<Scalars['String']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    ordering?: InputMaybe<Scalars['String']['input']>
}

export type GraphQlQueryEducationpageCategoryArgs = {
    id?: InputMaybe<Scalars['ID']['input']>
}

export type GraphQlQueryEducationpagesArgs = {
    after?: InputMaybe<Scalars['String']['input']>
    before?: InputMaybe<Scalars['String']['input']>
    first?: InputMaybe<Scalars['Int']['input']>
    id?: InputMaybe<Scalars['ID']['input']>
    last?: InputMaybe<Scalars['Int']['input']>
    limit?: InputMaybe<Scalars['Int']['input']>
    nameEn_Icontains?: InputMaybe<Scalars['String']['input']>
    nameEn_Iexact?: InputMaybe<Scalars['String']['input']>
    nameNl_Icontains?: InputMaybe<Scalars['String']['input']>
    nameNl_Iexact?: InputMaybe<Scalars['String']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    ordering?: InputMaybe<Scalars['String']['input']>
}

export type GraphQlQueryNewsItemArgs = {
    id?: InputMaybe<Scalars['ID']['input']>
}

export type GraphQlQueryNewsItemsArgs = {
    after?: InputMaybe<Scalars['String']['input']>
    before?: InputMaybe<Scalars['String']['input']>
    first?: InputMaybe<Scalars['Int']['input']>
    id?: InputMaybe<Scalars['ID']['input']>
    last?: InputMaybe<Scalars['Int']['input']>
    limit?: InputMaybe<Scalars['Int']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    ordering?: InputMaybe<Scalars['String']['input']>
    publicationDate?: InputMaybe<Scalars['DateTime']['input']>
    publicationDate_Gt?: InputMaybe<Scalars['DateTime']['input']>
    publicationDate_Lt?: InputMaybe<Scalars['DateTime']['input']>
    publisher?: InputMaybe<Scalars['ID']['input']>
    titleEn_Icontains?: InputMaybe<Scalars['String']['input']>
    titleEn_Iexact?: InputMaybe<Scalars['String']['input']>
    titleNl_Icontains?: InputMaybe<Scalars['String']['input']>
    titleNl_Iexact?: InputMaybe<Scalars['String']['input']>
}

export type GraphQlQueryPageArgs = {
    id?: InputMaybe<Scalars['ID']['input']>
    slug?: InputMaybe<Scalars['String']['input']>
}

export type GraphQlQueryPublicationArgs = {
    id?: InputMaybe<Scalars['ID']['input']>
}

export type GraphQlQueryPublicationsArgs = {
    after?: InputMaybe<Scalars['String']['input']>
    before?: InputMaybe<Scalars['String']['input']>
    datePublished?: InputMaybe<Scalars['DateTime']['input']>
    datePublished_Gt?: InputMaybe<Scalars['DateTime']['input']>
    datePublished_Lt?: InputMaybe<Scalars['DateTime']['input']>
    first?: InputMaybe<Scalars['Int']['input']>
    id?: InputMaybe<Scalars['ID']['input']>
    isFeatured?: InputMaybe<Scalars['Boolean']['input']>
    last?: InputMaybe<Scalars['Int']['input']>
    limit?: InputMaybe<Scalars['Int']['input']>
    name_Icontains?: InputMaybe<Scalars['String']['input']>
    name_Iexact?: InputMaybe<Scalars['String']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    ordering?: InputMaybe<Scalars['String']['input']>
    publicationType_TypeName_Icontains?: InputMaybe<Scalars['String']['input']>
    publicationType_TypeName_Iexact?: InputMaybe<Scalars['String']['input']>
}

export type GraphQlQueryTelevisionBannerArgs = {
    id?: InputMaybe<Scalars['ID']['input']>
    slug?: InputMaybe<Scalars['String']['input']>
}

export type GraphQlQueryTelevisionBannersArgs = {
    after?: InputMaybe<Scalars['String']['input']>
    before?: InputMaybe<Scalars['String']['input']>
    first?: InputMaybe<Scalars['Int']['input']>
    last?: InputMaybe<Scalars['Int']['input']>
    limit?: InputMaybe<Scalars['Int']['input']>
    name_Icontains?: InputMaybe<Scalars['String']['input']>
    name_Iexact?: InputMaybe<Scalars['String']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    ordering?: InputMaybe<Scalars['String']['input']>
}

export type GraphQlQueryVideoArgs = {
    videoId?: InputMaybe<Scalars['ID']['input']>
}

export type GraphQlQueryVideosArgs = {
    after?: InputMaybe<Scalars['String']['input']>
    before?: InputMaybe<Scalars['String']['input']>
    datePublished?: InputMaybe<Scalars['DateTime']['input']>
    datePublished_Gt?: InputMaybe<Scalars['DateTime']['input']>
    datePublished_Lt?: InputMaybe<Scalars['DateTime']['input']>
    first?: InputMaybe<Scalars['Int']['input']>
    isFeatured?: InputMaybe<Scalars['Boolean']['input']>
    last?: InputMaybe<Scalars['Int']['input']>
    limit?: InputMaybe<Scalars['Int']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    ordering?: InputMaybe<Scalars['String']['input']>
    publisher_Name_Icontains?: InputMaybe<Scalars['String']['input']>
    publisher_Name_Iexact?: InputMaybe<Scalars['String']['input']>
    title_Icontains?: InputMaybe<Scalars['String']['input']>
    title_Iexact?: InputMaybe<Scalars['String']['input']>
    videoId?: InputMaybe<Scalars['ID']['input']>
    videoType?: InputMaybe<Scalars['String']['input']>
}

export type GraphQlQueryVivatBannerArgs = {
    id?: InputMaybe<Scalars['ID']['input']>
    slug?: InputMaybe<Scalars['String']['input']>
}

export type GraphQlQueryVivatBannersArgs = {
    after?: InputMaybe<Scalars['String']['input']>
    before?: InputMaybe<Scalars['String']['input']>
    first?: InputMaybe<Scalars['Int']['input']>
    last?: InputMaybe<Scalars['Int']['input']>
    limit?: InputMaybe<Scalars['Int']['input']>
    name_Icontains?: InputMaybe<Scalars['String']['input']>
    name_Iexact?: InputMaybe<Scalars['String']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    ordering?: InputMaybe<Scalars['String']['input']>
}

export type GraphQlQueryWebsiteBannerArgs = {
    id?: InputMaybe<Scalars['ID']['input']>
    slug?: InputMaybe<Scalars['String']['input']>
}

export type GraphQlQueryWebsiteBannersArgs = {
    after?: InputMaybe<Scalars['String']['input']>
    before?: InputMaybe<Scalars['String']['input']>
    first?: InputMaybe<Scalars['Int']['input']>
    last?: InputMaybe<Scalars['Int']['input']>
    limit?: InputMaybe<Scalars['Int']['input']>
    name_Icontains?: InputMaybe<Scalars['String']['input']>
    name_Iexact?: InputMaybe<Scalars['String']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    ordering?: InputMaybe<Scalars['String']['input']>
}

/** Type definition for a single News Item */
export type NewsItemType = {
    __typename?: 'NewsItemType'
    activities: Array<ActivityType>
    attachments: Array<AttachmentType>
    /** Message author */
    author?: Maybe<Scalars['String']['output']>
    /** Message content (localized for user) */
    content?: Maybe<Scalars['String']['output']>
    contentEn: Scalars['String']['output']
    contentNl: Scalars['String']['output']
    id: Scalars['ID']['output']
    /** Message introduction (localized for user) */
    introduction?: Maybe<Scalars['String']['output']>
    introductionEn?: Maybe<Scalars['String']['output']>
    introductionNl: Scalars['String']['output']
    /** Choose this option to pin the news item */
    pinned: Scalars['Boolean']['output']
    publicationDate: Scalars['DateTime']['output']
    /** Publishing committee */
    publisher?: Maybe<Scalars['String']['output']>
    slug: Scalars['String']['output']
    /** Message title (localized for user) */
    title?: Maybe<Scalars['String']['output']>
    titleEn?: Maybe<Scalars['String']['output']>
    titleNl: Scalars['String']['output']
}

export type NewsItemTypeNodeConnection = {
    __typename?: 'NewsItemTypeNodeConnection'
    /** Pagination data for this connection. */
    pageInfo: PageInfoExtra
    /** Contains the nodes in this connection. */
    results: Array<Maybe<NewsItemType>>
    totalCount?: Maybe<Scalars['Int']['output']>
}

export type PageInfoExtra = {
    __typename?: 'PageInfoExtra'
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output']
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output']
    /** Limit as given to query */
    limit?: Maybe<Scalars['Int']['output']>
    /** Total page count */
    numPages: Scalars['Int']['output']
    /** Offset as given to query */
    offset: Scalars['Int']['output']
    /** Current page number */
    page: Scalars['Int']['output']
}

/** Type definition for a single Page */
export type PageType = {
    __typename?: 'PageType'
    /** Page content */
    content?: Maybe<Scalars['String']['output']>
    contentEn: Scalars['String']['output']
    contentNl: Scalars['String']['output']
    educational: Scalars['Boolean']['output']
    lastModified: Scalars['DateTime']['output']
    /** Page name */
    name?: Maybe<Scalars['String']['output']>
    nameEn: Scalars['String']['output']
    nameNl: Scalars['String']['output']
    /** Page slug */
    slug?: Maybe<Scalars['String']['output']>
    slugEn: Scalars['String']['output']
    slugNl: Scalars['String']['output']
}

/** Type definition for a single Publication */
export type PublicationItemType = {
    __typename?: 'PublicationItemType'
    datePublished: Scalars['DateTime']['output']
    description?: Maybe<Scalars['String']['output']>
    file: Scalars['String']['output']
    id: Scalars['ID']['output']
    isFeatured: Scalars['Boolean']['output']
    name: Scalars['String']['output']
    public: Scalars['Boolean']['output']
    publicationType: PublicationTypeType
    thumbnail?: Maybe<Scalars['String']['output']>
}

export type PublicationItemTypeNodeConnection = {
    __typename?: 'PublicationItemTypeNodeConnection'
    /** Pagination data for this connection. */
    pageInfo: PageInfoExtra
    /** Contains the nodes in this connection. */
    results: Array<Maybe<PublicationItemType>>
    totalCount?: Maybe<Scalars['Int']['output']>
}

/** Type definition for a type of Publication */
export type PublicationTypeType = {
    __typename?: 'PublicationTypeType'
    description?: Maybe<Scalars['String']['output']>
    typeName: Scalars['String']['output']
}

/** Type definition of a single Television Banner */
export type TelevisionBannerType = {
    __typename?: 'TelevisionBannerType'
    active: Scalars['Boolean']['output']
    name: Scalars['String']['output']
    picture: Scalars['String']['output']
    slug: Scalars['String']['output']
}

export type TelevisionBannerTypeNodeConnection = {
    __typename?: 'TelevisionBannerTypeNodeConnection'
    /** Pagination data for this connection. */
    pageInfo: PageInfoExtra
    /** Contains the nodes in this connection. */
    results: Array<Maybe<TelevisionBannerType>>
    totalCount?: Maybe<Scalars['Int']['output']>
}

/** Type definition for a single User */
export type UserType = {
    __typename?: 'UserType'
    dateJoined: Scalars['DateTime']['output']
    email: Scalars['String']['output']
    firstName: Scalars['String']['output']
    id: Scalars['ID']['output']
    /** Bepaalt of deze gebruiker als actief dient te worden behandeld. U kunt dit uitvinken in plaats van een gebruiker te verwijderen. */
    isActive: Scalars['Boolean']['output']
    /** Bepaalt of de gebruiker zich op deze beheerwebsite kan aanmelden. */
    isStaff: Scalars['Boolean']['output']
    /** Bepaalt dat deze gebruiker alle rechten heeft, zonder deze expliciet toe te wijzen. */
    isSuperuser: Scalars['Boolean']['output']
    lastLogin?: Maybe<Scalars['DateTime']['output']>
    lastName: Scalars['String']['output']
    /** Vereist. 150 tekens of minder. Alleen letters, cijfers en de tekens @/,/+/-/_ zijn toegestaan. */
    username: Scalars['String']['output']
}

export type Verify = {
    __typename?: 'Verify'
    payload: Scalars['GenericScalar']['output']
}

/** Type definition for a single Video */
export type VideoType = {
    __typename?: 'VideoType'
    datePublished: Scalars['DateTime']['output']
    description: Scalars['String']['output']
    isFeatured: Scalars['Boolean']['output']
    public: Scalars['Boolean']['output']
    /** Publishing committee */
    publisher?: Maybe<Scalars['String']['output']>
    thumbnailUrl: Scalars['String']['output']
    title: Scalars['String']['output']
    videoId: Scalars['String']['output']
    /** Video type (Youtube or IA) */
    videoType?: Maybe<Scalars['String']['output']>
    /** URL to the video */
    videoUrl?: Maybe<Scalars['String']['output']>
}

export type VideoTypeNodeConnection = {
    __typename?: 'VideoTypeNodeConnection'
    /** Pagination data for this connection. */
    pageInfo: PageInfoExtra
    /** Contains the nodes in this connection. */
    results: Array<Maybe<VideoType>>
    totalCount?: Maybe<Scalars['Int']['output']>
}

/** Type definition of a single Vivat Banner */
export type VivatBannerType = {
    __typename?: 'VivatBannerType'
    active: Scalars['Boolean']['output']
    name: Scalars['String']['output']
    picture: Scalars['String']['output']
    slug: Scalars['String']['output']
    url: Scalars['String']['output']
}

export type VivatBannerTypeNodeConnection = {
    __typename?: 'VivatBannerTypeNodeConnection'
    /** Pagination data for this connection. */
    pageInfo: PageInfoExtra
    /** Contains the nodes in this connection. */
    results: Array<Maybe<VivatBannerType>>
    totalCount?: Maybe<Scalars['Int']['output']>
}

/** Type definition of a single Website Banner */
export type WebsiteBannerType = {
    __typename?: 'WebsiteBannerType'
    active: Scalars['Boolean']['output']
    name: Scalars['String']['output']
    picture: Scalars['String']['output']
    slug: Scalars['String']['output']
    url: Scalars['String']['output']
}

export type WebsiteBannerTypeNodeConnection = {
    __typename?: 'WebsiteBannerTypeNodeConnection'
    /** Pagination data for this connection. */
    pageInfo: PageInfoExtra
    /** Contains the nodes in this connection. */
    results: Array<Maybe<WebsiteBannerType>>
    totalCount?: Maybe<Scalars['Int']['output']>
}

export type MyQueryQueryVariables = Exact<{ [key: string]: never }>

export type MyQueryQuery = {
    __typename?: 'GraphQLQuery'
    activities?: {
        __typename?: 'ActivityTypeNodeConnection'
        totalCount?: number | null
        results: Array<{
            __typename?: 'ActivityType'
            description?: string | null
            descriptionEn?: string | null
            descriptionNl: string
        } | null>
    } | null
}

export const MyQueryDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'MyQuery' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'activities' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'results' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'description' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'descriptionEn' },
                                            },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'descriptionNl' },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<MyQueryQuery, MyQueryQueryVariables>
