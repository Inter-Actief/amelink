/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Date: { input: any; output: any; }
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: { input: any; output: any; }
  /** The `Decimal` scalar type represents a python Decimal. */
  Decimal: { input: any; output: any; }
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: { input: any; output: any; }
};

export type ActivityLabelType = {
  __typename?: 'ActivityLabelType';
  active: Scalars['Boolean']['output'];
  color: Scalars['String']['output'];
  explanationEn: Scalars['String']['output'];
  explanationNl: Scalars['String']['output'];
  icon: Scalars['String']['output'];
  nameEn: Scalars['String']['output'];
  nameNl: Scalars['String']['output'];
};

export type ActivityType = {
  __typename?: 'ActivityType';
  /** De absolute URL naar een activiteit. */
  absoluteUrl?: Maybe<Scalars['String']['output']>;
  activityLabel: ActivityLabelType;
  /** Attachment ids */
  attachments?: Maybe<Array<Maybe<AttachmentType>>>;
  begin: Scalars['DateTime']['output'];
  /** Een link naar het ICS-bestand voor deze activiteit. */
  calendarUrl?: Maybe<Scalars['String']['output']>;
  /** Of de huidig ingelogde persoon deze activiteit mag aanpassen. */
  canEdit?: Maybe<Scalars['Boolean']['output']>;
  canUnenroll: Scalars['Boolean']['output'];
  components: Array<ActivityType>;
  /** Een beschrijving van deze activiteit in de voorkeurstaal van de gebruiker. */
  description?: Maybe<Scalars['String']['output']>;
  descriptionEn?: Maybe<Scalars['String']['output']>;
  descriptionNl: Scalars['String']['output'];
  /** Een korte beschrijving van deze activiteit (altijd in het Engels). */
  descriptionShort?: Maybe<Scalars['String']['output']>;
  dutchActivity: Scalars['Boolean']['output'];
  end: Scalars['DateTime']['output'];
  enrollment: Scalars['Boolean']['output'];
  /** Of deze activiteit bijna vol zit (<= 10 plaatsen over). */
  enrollmentAlmostFull?: Maybe<Scalars['Boolean']['output']>;
  /** If you want to add options, make sure your activity isn't open for enrollment right away */
  enrollmentBegin?: Maybe<Scalars['DateTime']['output']>;
  /** Of mensen zich niet meer kunnen inschrijven voor deze activiteit. */
  enrollmentClosed?: Maybe<Scalars['Boolean']['output']>;
  enrollmentEnd?: Maybe<Scalars['DateTime']['output']>;
  /** Of deze activiteit vol zit. */
  enrollmentFull?: Maybe<Scalars['Boolean']['output']>;
  /** Of mensen zich nog kunnen inschrijven voor deze activiteit. */
  enrollmentOpen?: Maybe<Scalars['Boolean']['output']>;
  entireDay: Scalars['Boolean']['output'];
  /** Of er kosten zijn verbonden aan deze activiteit. */
  hasCosts?: Maybe<Scalars['Boolean']['output']>;
  /** Of er inschrijfopties zijn. */
  hasEnrollmentOptions?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  /** Image of 175 by 275 pixels. */
  imageIcon?: Maybe<Scalars['String']['output']>;
  location: Scalars['String']['output'];
  maximum?: Maybe<Scalars['Int']['output']>;
  organizer: CommitteeType;
  /** Een URL die verwijst naar de fotogalerij van deze activiteit. */
  photoUrl?: Maybe<Scalars['String']['output']>;
  photos: Array<AttachmentType>;
  price: Scalars['Decimal']['output'];
  /** Promotietekst voor deze activiteit, in de voorkeurstaal van de gebruiker. */
  promo?: Maybe<Scalars['String']['output']>;
  /** This text can be used by the board for promotion, for example on our socials or in our weekmail. Let it be a teaser, so people would want to read your full activity description. */
  promoEn: Scalars['String']['output'];
  /** This text can be used by the board for promotion, for example on our socials or in our weekmail. Let it be a teaser, so people would want to read your full activity description. */
  promoNl: Scalars['String']['output'];
  public: Scalars['Boolean']['output'];
  /** Een URL naar een willekeurige foto die gemaakt is bij deze activiteit. */
  randomPhotoUrl?: Maybe<Scalars['String']['output']>;
  /** Een samenvatting van deze activiteit in de voorkeurstaal van de gebruiker. */
  summary?: Maybe<Scalars['String']['output']>;
  summaryEn?: Maybe<Scalars['String']['output']>;
  summaryNl: Scalars['String']['output'];
  waitingListLocked: Scalars['Boolean']['output'];
};

export type ActivityTypeNodeConnection = {
  __typename?: 'ActivityTypeNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<ActivityType>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type AttachmentType = {
  __typename?: 'AttachmentType';
  caption?: Maybe<Scalars['String']['output']>;
  created: Scalars['DateTime']['output'];
  file: Scalars['String']['output'];
  mimetype: Scalars['String']['output'];
  modified: Scalars['DateTime']['output'];
  public: Scalars['Boolean']['output'];
  thumbLarge?: Maybe<Scalars['String']['output']>;
  thumbLargeHeight?: Maybe<Scalars['Int']['output']>;
  thumbLargeWidth?: Maybe<Scalars['Int']['output']>;
  thumbMedium?: Maybe<Scalars['String']['output']>;
  thumbMediumHeight?: Maybe<Scalars['Int']['output']>;
  thumbMediumWidth?: Maybe<Scalars['Int']['output']>;
  thumbSmall?: Maybe<Scalars['String']['output']>;
  thumbSmallHeight?: Maybe<Scalars['Int']['output']>;
  thumbSmallWidth?: Maybe<Scalars['Int']['output']>;
};

export type CaptchaType = {
  __typename?: 'CaptchaType';
  /** De URL naar de gegenereerde afbeelding voor deze CAPTCHA */
  image?: Maybe<Scalars['String']['output']>;
  /** De referentie voor deze specifieke CAPTCHA challenge */
  key?: Maybe<Scalars['String']['output']>;
};

/** Type definition for a single CommitteeCategory */
export type CommitteeCategoryType = {
  __typename?: 'CommitteeCategoryType';
  committeeSet?: Maybe<Array<Maybe<CommitteeType>>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};


/** Type definition for a single CommitteeCategory */
export type CommitteeCategoryTypeCommitteeSetArgs = {
  includeAbolished?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CommitteeCategoryTypeNodeConnection = {
  __typename?: 'CommitteeCategoryTypeNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<CommitteeCategoryType>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** Type definition for a single Committee */
export type CommitteeType = {
  __typename?: 'CommitteeType';
  abolished?: Maybe<Scalars['Date']['output']>;
  category?: Maybe<CommitteeCategoryType>;
  email: Scalars['String']['output'];
  founded: Scalars['Date']['output'];
  functionSet?: Maybe<Array<Maybe<FunctionType>>>;
  groupPicture?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** Commissie-informatie (gelokaliseerd voor gebruiker) */
  information?: Maybe<Scalars['String']['output']>;
  informationEn: Scalars['String']['output'];
  informationNl: Scalars['String']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  parentCommittees: Array<CommitteeType>;
  slug: Scalars['String']['output'];
  website: Scalars['String']['output'];
};


/** Type definition for a single Committee */
export type CommitteeTypeFunctionSetArgs = {
  includePastMembers?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CommitteeTypeNodeConnection = {
  __typename?: 'CommitteeTypeNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<CommitteeType>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type CompanyEventType = {
  __typename?: 'CompanyEventType';
  /** De absolute URL naar deze activiteit */
  absoluteUrl?: Maybe<Scalars['String']['output']>;
  /** Het label behorende bij deze activiteit */
  activityLabel?: Maybe<ActivityLabelType>;
  /** Het soort activiteit */
  activityType?: Maybe<Scalars['String']['output']>;
  /** Attachment ids */
  attachments?: Maybe<Array<Maybe<AttachmentType>>>;
  begin: Scalars['DateTime']['output'];
  /** De URL naar de ICS van deze activiteit */
  calendarUrl?: Maybe<Scalars['String']['output']>;
  company?: Maybe<CompanyType>;
  companyText: Scalars['String']['output'];
  companyUrl: Scalars['String']['output'];
  /** Een beschrijving van deze activiteit in de voorkeurstaal van de gebruiker. */
  description?: Maybe<Scalars['String']['output']>;
  descriptionEn?: Maybe<Scalars['String']['output']>;
  descriptionNl: Scalars['String']['output'];
  /** Een korte beschrijving van deze activiteit (altijd in het Engels). */
  descriptionShort?: Maybe<Scalars['String']['output']>;
  dutchActivity: Scalars['Boolean']['output'];
  end: Scalars['DateTime']['output'];
  entireDay: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  /** Of deze activiteit zichtbaar is */
  isVisible?: Maybe<Scalars['Boolean']['output']>;
  location: Scalars['String']['output'];
  organizer: CommitteeType;
  /** Promotietekst voor deze activiteit, in de voorkeurstaal van de gebruiker. */
  promo?: Maybe<Scalars['String']['output']>;
  /** This text can be used by the board for promotion, for example on our socials or in our weekmail. Let it be a teaser, so people would want to read your full activity description. */
  promoEn: Scalars['String']['output'];
  /** This text can be used by the board for promotion, for example on our socials or in our weekmail. Let it be a teaser, so people would want to read your full activity description. */
  promoNl: Scalars['String']['output'];
  public: Scalars['Boolean']['output'];
  /** Een samenvatting van deze activiteit in de voorkeurstaal van de gebruiker. */
  summary?: Maybe<Scalars['String']['output']>;
  summaryEn?: Maybe<Scalars['String']['output']>;
  summaryNl: Scalars['String']['output'];
};

export type CompanyEventTypeNodeConnection = {
  __typename?: 'CompanyEventTypeNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<CompanyEventType>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** Type definition of a single Company */
export type CompanyType = {
  __typename?: 'CompanyType';
  appLogo?: Maybe<Scalars['String']['output']>;
  appLogoHeight?: Maybe<Scalars['Int']['output']>;
  appLogoWidth?: Maybe<Scalars['Int']['output']>;
  endDate: Scalars['Date']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  logoHeight?: Maybe<Scalars['Int']['output']>;
  logoWidth?: Maybe<Scalars['Int']['output']>;
  /** Naam van het bedrijf */
  name?: Maybe<Scalars['String']['output']>;
  nameEn: Scalars['String']['output'];
  nameNl: Scalars['String']['output'];
  /** Bedrijfsprofiel */
  profile?: Maybe<Scalars['String']['output']>;
  profileEn: Scalars['String']['output'];
  profileNl: Scalars['String']['output'];
  /** Korte beschrijving van het bedrijf */
  shortDescription?: Maybe<Scalars['String']['output']>;
  shortDescriptionEn: Scalars['String']['output'];
  shortDescriptionNl: Scalars['String']['output'];
  showInApp: Scalars['Boolean']['output'];
  slug: Scalars['String']['output'];
  startDate: Scalars['Date']['output'];
  url: Scalars['String']['output'];
};

export type CompanyTypeNodeConnection = {
  __typename?: 'CompanyTypeNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<CompanyType>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type EducationEventType = {
  __typename?: 'EducationEventType';
  /** The absolute URL to this event */
  absoluteUrl?: Maybe<Scalars['String']['output']>;
  activityLabel?: Maybe<ActivityLabelType>;
  /** The type of event */
  activityType?: Maybe<Scalars['String']['output']>;
  /** Attachment ids */
  attachments?: Maybe<Array<Maybe<AttachmentType>>>;
  begin: Scalars['DateTime']['output'];
  /** Een beschrijving van deze activiteit in de voorkeurstaal van de gebruiker. */
  description?: Maybe<Scalars['String']['output']>;
  descriptionEn?: Maybe<Scalars['String']['output']>;
  descriptionNl: Scalars['String']['output'];
  /** Een korte beschrijving van deze activiteit (altijd in het Engels). */
  descriptionShort?: Maybe<Scalars['String']['output']>;
  dutchActivity: Scalars['Boolean']['output'];
  educationOrganizer: Scalars['String']['output'];
  end: Scalars['DateTime']['output'];
  entireDay: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  organizer: CommitteeType;
  /** Promotietekst voor deze activiteit, in de voorkeurstaal van de gebruiker. */
  promo?: Maybe<Scalars['String']['output']>;
  /** This text can be used by the board for promotion, for example on our socials or in our weekmail. Let it be a teaser, so people would want to read your full activity description. */
  promoEn: Scalars['String']['output'];
  /** This text can be used by the board for promotion, for example on our socials or in our weekmail. Let it be a teaser, so people would want to read your full activity description. */
  promoNl: Scalars['String']['output'];
  public: Scalars['Boolean']['output'];
  /** Een samenvatting van deze activiteit in de voorkeurstaal van de gebruiker. */
  summary?: Maybe<Scalars['String']['output']>;
  summaryEn?: Maybe<Scalars['String']['output']>;
  summaryNl: Scalars['String']['output'];
};

export type EducationEventTypeNodeConnection = {
  __typename?: 'EducationEventTypeNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<EducationEventType>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** Type definition for a single education page Category */
export type EducationPageCategoryType = {
  __typename?: 'EducationPageCategoryType';
  id: Scalars['ID']['output'];
  /** Categorienaam (gelokaliseerd voor gebruiker) */
  name?: Maybe<Scalars['String']['output']>;
  nameEn: Scalars['String']['output'];
  nameNl: Scalars['String']['output'];
  pageSet: Array<EducationPageType>;
};

export type EducationPageCategoryTypeNodeConnection = {
  __typename?: 'EducationPageCategoryTypeNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<EducationPageCategoryType>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** Type definition for a single Education Page */
export type EducationPageType = {
  __typename?: 'EducationPageType';
  category: EducationPageCategoryType;
  /** Inhoud van de pagina (gelokaliseerd voor gebruiker) */
  content?: Maybe<Scalars['String']['output']>;
  contentEn: Scalars['String']['output'];
  contentNl: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastChanged: Scalars['DateTime']['output'];
  /** Naam van de pagina (gelokaliseerd voor gebruiker) */
  name?: Maybe<Scalars['String']['output']>;
  nameEn: Scalars['String']['output'];
  nameNl: Scalars['String']['output'];
  position: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
};

export type EducationPageTypeNodeConnection = {
  __typename?: 'EducationPageTypeNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<EducationPageType>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type EducationalBouquetMutationInput = {
  author: Scalars['String']['input'];
  /** The response to the captcha challenge */
  captcha: Scalars['String']['input'];
  /** The key that uniquely identifies this captcha test */
  captchaHash: Scalars['String']['input'];
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  course: Scalars['String']['input'];
  email: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  teacher: Scalars['String']['input'];
};

export type EducationalBouquetMutationPayload = {
  __typename?: 'EducationalBouquetMutationPayload';
  author: Scalars['String']['output'];
  /** The response to the captcha challenge */
  captcha: Scalars['String']['output'];
  /** The key that uniquely identifies this captcha test */
  captchaHash: Scalars['String']['output'];
  clientMutationId?: Maybe<Scalars['String']['output']>;
  course: Scalars['String']['output'];
  email: Scalars['String']['output'];
  errors?: Maybe<Array<Maybe<ErrorType>>>;
  reason: Scalars['String']['output'];
  teacher: Scalars['String']['output'];
};

export type ErrorType = {
  __typename?: 'ErrorType';
  field: Scalars['String']['output'];
  messages: Array<Scalars['String']['output']>;
};

/** Type definition for a single Function */
export type FunctionType = {
  __typename?: 'FunctionType';
  begin: Scalars['Date']['output'];
  committee: CommitteeType;
  end?: Maybe<Scalars['Date']['output']>;
  function: Scalars['String']['output'];
  /** Deze persoon is op dit moment lid van deze commissie */
  isCurrentMember?: Maybe<Scalars['Boolean']['output']>;
  /** Naam van persoon */
  person?: Maybe<Scalars['String']['output']>;
};

export type GraphQlMutation = {
  __typename?: 'GraphQLMutation';
  educationalBouquet?: Maybe<EducationalBouquetMutationPayload>;
  setLanguage?: Maybe<SetLanguageMutation>;
  /** Check if an authentication token is valid */
  verifyToken?: Maybe<Verify>;
};


export type GraphQlMutationEducationalBouquetArgs = {
  input: EducationalBouquetMutationInput;
};


export type GraphQlMutationSetLanguageArgs = {
  languageCode: Scalars['String']['input'];
};


export type GraphQlMutationVerifyTokenArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};

export type GraphQlQuery = {
  __typename?: 'GraphQLQuery';
  activities?: Maybe<ActivityTypeNodeConnection>;
  activity?: Maybe<ActivityType>;
  attachment?: Maybe<AttachmentType>;
  committee?: Maybe<CommitteeType>;
  committeeCategories?: Maybe<CommitteeCategoryTypeNodeConnection>;
  committeeCategory?: Maybe<CommitteeCategoryType>;
  committees?: Maybe<CommitteeTypeNodeConnection>;
  companies?: Maybe<CompanyTypeNodeConnection>;
  company?: Maybe<CompanyType>;
  companyEvent?: Maybe<CompanyEventType>;
  companyEvents?: Maybe<CompanyEventTypeNodeConnection>;
  educationEvent?: Maybe<EducationEventType>;
  educationEvents?: Maybe<EducationEventTypeNodeConnection>;
  educationpage?: Maybe<EducationPageType>;
  educationpageCategories?: Maybe<EducationPageCategoryTypeNodeConnection>;
  educationpageCategory?: Maybe<EducationPageCategoryType>;
  educationpages?: Maybe<EducationPageTypeNodeConnection>;
  generateCaptcha?: Maybe<CaptchaType>;
  /** The currently active language */
  languageCode?: Maybe<Scalars['String']['output']>;
  /** Information about the currently logged in user */
  me?: Maybe<UserType>;
  newsItem?: Maybe<NewsItemType>;
  newsItems?: Maybe<NewsItemTypeNodeConnection>;
  page?: Maybe<PageType>;
  publication?: Maybe<PublicationItemType>;
  publications?: Maybe<PublicationItemTypeNodeConnection>;
  televisionBanner?: Maybe<TelevisionBannerType>;
  televisionBanners?: Maybe<TelevisionBannerTypeNodeConnection>;
  video?: Maybe<VideoType>;
  videos?: Maybe<VideoTypeNodeConnection>;
  vivatBanner?: Maybe<VivatBannerType>;
  vivatBanners?: Maybe<VivatBannerTypeNodeConnection>;
  websiteBanner?: Maybe<WebsiteBannerType>;
  websiteBanners?: Maybe<WebsiteBannerTypeNodeConnection>;
};


export type GraphQlQueryActivitiesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  begin?: InputMaybe<Scalars['DateTime']['input']>;
  begin_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  begin_Lt?: InputMaybe<Scalars['DateTime']['input']>;
  dutchActivity?: InputMaybe<Scalars['Boolean']['input']>;
  end?: InputMaybe<Scalars['DateTime']['input']>;
  end_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  end_Lt?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<Scalars['String']['input']>;
  organizer?: InputMaybe<Scalars['ID']['input']>;
  summaryEn_Icontains?: InputMaybe<Scalars['String']['input']>;
  summaryEn_Iexact?: InputMaybe<Scalars['String']['input']>;
  summaryNl_Icontains?: InputMaybe<Scalars['String']['input']>;
  summaryNl_Iexact?: InputMaybe<Scalars['String']['input']>;
};


export type GraphQlQueryActivityArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type GraphQlQueryAttachmentArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type GraphQlQueryCommitteeArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type GraphQlQueryCommitteeCategoriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name_Icontains?: InputMaybe<Scalars['String']['input']>;
  name_Iexact?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<Scalars['String']['input']>;
};


export type GraphQlQueryCommitteeCategoryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type GraphQlQueryCommitteesArgs = {
  abolished?: InputMaybe<Scalars['Date']['input']>;
  abolished_Gt?: InputMaybe<Scalars['Date']['input']>;
  abolished_Lt?: InputMaybe<Scalars['Date']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  founded?: InputMaybe<Scalars['Date']['input']>;
  founded_Gt?: InputMaybe<Scalars['Date']['input']>;
  founded_Lt?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  includeAbolished: Scalars['Boolean']['input'];
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name_Icontains?: InputMaybe<Scalars['String']['input']>;
  name_Iexact?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type GraphQlQueryCompaniesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nameEn_Icontains?: InputMaybe<Scalars['String']['input']>;
  nameEn_Iexact?: InputMaybe<Scalars['String']['input']>;
  nameNl_Icontains?: InputMaybe<Scalars['String']['input']>;
  nameNl_Iexact?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<Scalars['String']['input']>;
};


export type GraphQlQueryCompanyArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type GraphQlQueryCompanyEventArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type GraphQlQueryCompanyEventsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  begin?: InputMaybe<Scalars['DateTime']['input']>;
  begin_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  begin_Lt?: InputMaybe<Scalars['DateTime']['input']>;
  dutchActivity?: InputMaybe<Scalars['Boolean']['input']>;
  end?: InputMaybe<Scalars['DateTime']['input']>;
  end_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  end_Lt?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<Scalars['String']['input']>;
  summaryEn_Icontains?: InputMaybe<Scalars['String']['input']>;
  summaryEn_Iexact?: InputMaybe<Scalars['String']['input']>;
  summaryNl_Icontains?: InputMaybe<Scalars['String']['input']>;
  summaryNl_Iexact?: InputMaybe<Scalars['String']['input']>;
};


export type GraphQlQueryEducationEventArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type GraphQlQueryEducationEventsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  begin?: InputMaybe<Scalars['DateTime']['input']>;
  begin_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  begin_Lt?: InputMaybe<Scalars['DateTime']['input']>;
  dutchActivity?: InputMaybe<Scalars['Boolean']['input']>;
  end?: InputMaybe<Scalars['DateTime']['input']>;
  end_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  end_Lt?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<Scalars['String']['input']>;
  summaryEn_Icontains?: InputMaybe<Scalars['String']['input']>;
  summaryEn_Iexact?: InputMaybe<Scalars['String']['input']>;
  summaryNl_Icontains?: InputMaybe<Scalars['String']['input']>;
  summaryNl_Iexact?: InputMaybe<Scalars['String']['input']>;
};


export type GraphQlQueryEducationpageArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type GraphQlQueryEducationpageCategoriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nameEn_Icontains?: InputMaybe<Scalars['String']['input']>;
  nameEn_Iexact?: InputMaybe<Scalars['String']['input']>;
  nameNl_Icontains?: InputMaybe<Scalars['String']['input']>;
  nameNl_Iexact?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<Scalars['String']['input']>;
};


export type GraphQlQueryEducationpageCategoryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type GraphQlQueryEducationpagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nameEn_Icontains?: InputMaybe<Scalars['String']['input']>;
  nameEn_Iexact?: InputMaybe<Scalars['String']['input']>;
  nameNl_Icontains?: InputMaybe<Scalars['String']['input']>;
  nameNl_Iexact?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<Scalars['String']['input']>;
};


export type GraphQlQueryNewsItemArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type GraphQlQueryNewsItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<Scalars['String']['input']>;
  publicationDate?: InputMaybe<Scalars['DateTime']['input']>;
  publicationDate_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  publicationDate_Lt?: InputMaybe<Scalars['DateTime']['input']>;
  publisher?: InputMaybe<Scalars['ID']['input']>;
  titleEn_Icontains?: InputMaybe<Scalars['String']['input']>;
  titleEn_Iexact?: InputMaybe<Scalars['String']['input']>;
  titleNl_Icontains?: InputMaybe<Scalars['String']['input']>;
  titleNl_Iexact?: InputMaybe<Scalars['String']['input']>;
};


export type GraphQlQueryPageArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type GraphQlQueryPublicationArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type GraphQlQueryPublicationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  datePublished?: InputMaybe<Scalars['DateTime']['input']>;
  datePublished_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  datePublished_Lt?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name_Icontains?: InputMaybe<Scalars['String']['input']>;
  name_Iexact?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<Scalars['String']['input']>;
  publicationType_TypeName_Icontains?: InputMaybe<Scalars['String']['input']>;
  publicationType_TypeName_Iexact?: InputMaybe<Scalars['String']['input']>;
};


export type GraphQlQueryTelevisionBannerArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type GraphQlQueryTelevisionBannersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name_Icontains?: InputMaybe<Scalars['String']['input']>;
  name_Iexact?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<Scalars['String']['input']>;
};


export type GraphQlQueryVideoArgs = {
  videoId?: InputMaybe<Scalars['ID']['input']>;
};


export type GraphQlQueryVideosArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  datePublished?: InputMaybe<Scalars['DateTime']['input']>;
  datePublished_Gt?: InputMaybe<Scalars['DateTime']['input']>;
  datePublished_Lt?: InputMaybe<Scalars['DateTime']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<Scalars['String']['input']>;
  publisher_Name_Icontains?: InputMaybe<Scalars['String']['input']>;
  publisher_Name_Iexact?: InputMaybe<Scalars['String']['input']>;
  title_Icontains?: InputMaybe<Scalars['String']['input']>;
  title_Iexact?: InputMaybe<Scalars['String']['input']>;
  videoId?: InputMaybe<Scalars['ID']['input']>;
  videoType?: InputMaybe<Scalars['String']['input']>;
};


export type GraphQlQueryVivatBannerArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type GraphQlQueryVivatBannersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name_Icontains?: InputMaybe<Scalars['String']['input']>;
  name_Iexact?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<Scalars['String']['input']>;
};


export type GraphQlQueryWebsiteBannerArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type GraphQlQueryWebsiteBannersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name_Icontains?: InputMaybe<Scalars['String']['input']>;
  name_Iexact?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ordering?: InputMaybe<Scalars['String']['input']>;
};

/** Type definition for a single News Item */
export type NewsItemType = {
  __typename?: 'NewsItemType';
  activities: Array<ActivityType>;
  attachments: Array<AttachmentType>;
  /** Auteur van bericht */
  author?: Maybe<Scalars['String']['output']>;
  /** Inhoud van bericht (gelokaliseerd voor gebruiker) */
  content?: Maybe<Scalars['String']['output']>;
  contentEn: Scalars['String']['output'];
  contentNl: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** Introductie van bericht (gelokaliseerd voor gebruiker) */
  introduction?: Maybe<Scalars['String']['output']>;
  introductionEn?: Maybe<Scalars['String']['output']>;
  introductionNl: Scalars['String']['output'];
  /** Choose this option to pin the news item */
  pinned: Scalars['Boolean']['output'];
  publicationDate: Scalars['DateTime']['output'];
  /** Publicerende commissie */
  publisher?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  /** Titel van bericht (gelokaliseerd voor gebruiker) */
  title?: Maybe<Scalars['String']['output']>;
  titleEn?: Maybe<Scalars['String']['output']>;
  titleNl: Scalars['String']['output'];
};

export type NewsItemTypeNodeConnection = {
  __typename?: 'NewsItemTypeNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<NewsItemType>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type PageInfoExtra = {
  __typename?: 'PageInfoExtra';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** Limit as given to query */
  limit?: Maybe<Scalars['Int']['output']>;
  /** Total page count */
  numPages: Scalars['Int']['output'];
  /** Offset as given to query */
  offset: Scalars['Int']['output'];
  /** Current page number */
  page: Scalars['Int']['output'];
};

/** Type definition for a single Page */
export type PageType = {
  __typename?: 'PageType';
  /** Inhoud van de pagina */
  content?: Maybe<Scalars['String']['output']>;
  contentEn: Scalars['String']['output'];
  contentNl: Scalars['String']['output'];
  educational: Scalars['Boolean']['output'];
  lastModified: Scalars['DateTime']['output'];
  /** Naam van de pagina */
  name?: Maybe<Scalars['String']['output']>;
  nameEn: Scalars['String']['output'];
  nameNl: Scalars['String']['output'];
  /** Slug van de pagina */
  slug?: Maybe<Scalars['String']['output']>;
  slugEn: Scalars['String']['output'];
  slugNl: Scalars['String']['output'];
};

/** Type definition for a single Publication */
export type PublicationItemType = {
  __typename?: 'PublicationItemType';
  datePublished: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  file: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isFeatured: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  public: Scalars['Boolean']['output'];
  publicationType: PublicationTypeType;
  thumbnail?: Maybe<Scalars['String']['output']>;
};

export type PublicationItemTypeNodeConnection = {
  __typename?: 'PublicationItemTypeNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<PublicationItemType>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** Type definition for a type of Publication */
export type PublicationTypeType = {
  __typename?: 'PublicationTypeType';
  description?: Maybe<Scalars['String']['output']>;
  typeName: Scalars['String']['output'];
};

export type SetLanguageMutation = {
  __typename?: 'SetLanguageMutation';
  language?: Maybe<Scalars['String']['output']>;
  result?: Maybe<Scalars['Boolean']['output']>;
};

/** Type definition of a single Television Banner */
export type TelevisionBannerType = {
  __typename?: 'TelevisionBannerType';
  active: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  picture: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type TelevisionBannerTypeNodeConnection = {
  __typename?: 'TelevisionBannerTypeNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<TelevisionBannerType>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** Type definition for a single User */
export type UserType = {
  __typename?: 'UserType';
  dateJoined: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars['Boolean']['output'];
  /** Designates whether the user can log into this admin site. */
  isStaff: Scalars['Boolean']['output'];
  /** Designates that this user has all permissions without explicitly assigning them. */
  isSuperuser: Scalars['Boolean']['output'];
  lastLogin?: Maybe<Scalars['DateTime']['output']>;
  lastName: Scalars['String']['output'];
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String']['output'];
};

export type Verify = {
  __typename?: 'Verify';
  payload: Scalars['GenericScalar']['output'];
};

/** Type definition for a single Video */
export type VideoType = {
  __typename?: 'VideoType';
  datePublished: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  isFeatured: Scalars['Boolean']['output'];
  public: Scalars['Boolean']['output'];
  /** Publicerende commissie */
  publisher?: Maybe<Scalars['String']['output']>;
  thumbnailUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
  videoId: Scalars['String']['output'];
  /** Videotype (Youtube of IA) */
  videoType?: Maybe<Scalars['String']['output']>;
  /** URL naar de video */
  videoUrl?: Maybe<Scalars['String']['output']>;
};

export type VideoTypeNodeConnection = {
  __typename?: 'VideoTypeNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<VideoType>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** Type definition of a single Vivat Banner */
export type VivatBannerType = {
  __typename?: 'VivatBannerType';
  active: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  picture: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type VivatBannerTypeNodeConnection = {
  __typename?: 'VivatBannerTypeNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<VivatBannerType>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** Type definition of a single Website Banner */
export type WebsiteBannerType = {
  __typename?: 'WebsiteBannerType';
  active: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  picture: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type WebsiteBannerTypeNodeConnection = {
  __typename?: 'WebsiteBannerTypeNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfoExtra;
  /** Contains the nodes in this connection. */
  results: Array<Maybe<WebsiteBannerType>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type LatestActivitiesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type LatestActivitiesQuery = { __typename?: 'GraphQLQuery', activities?: { __typename?: 'ActivityTypeNodeConnection', totalCount?: number | null, results: Array<{ __typename?: 'ActivityType', id: string, description?: string | null, summary?: string | null, begin: any, imageIcon?: string | null, activityLabel: { __typename?: 'ActivityLabelType', nameNl: string, nameEn: string, color: string, active: boolean }, photos: Array<{ __typename?: 'AttachmentType', thumbMedium?: string | null }> } | null> } | null };

export type OverviewActivitiesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  startDate: Scalars['DateTime']['input'];
}>;


export type OverviewActivitiesQuery = { __typename?: 'GraphQLQuery', activities?: { __typename?: 'ActivityTypeNodeConnection', totalCount?: number | null, results: Array<{ __typename?: 'ActivityType', id: string, begin: any, summary?: string | null, description?: string | null, activityLabel: { __typename?: 'ActivityLabelType', nameNl: string, nameEn: string, color: string, active: boolean } } | null> } | null };

export type PastActivitiesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type PastActivitiesQuery = { __typename?: 'GraphQLQuery', activities?: { __typename?: 'ActivityTypeNodeConnection', totalCount?: number | null, results: Array<{ __typename?: 'ActivityType', id: string, begin: any, description?: string | null, summary?: string | null, photos: Array<{ __typename?: 'AttachmentType', caption?: string | null }> } | null> } | null };

export type PhotosActivitiesQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type PhotosActivitiesQuery = { __typename?: 'GraphQLQuery', activity?: { __typename?: 'ActivityType', summary?: string | null, begin: any, id: string, description?: string | null, photos: Array<{ __typename?: 'AttachmentType', thumbMedium?: string | null, thumbMediumHeight?: number | null, thumbMediumWidth?: number | null, thumbLarge?: string | null }> } | null };

export type UpcomingActivitiesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  beginDate?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type UpcomingActivitiesQuery = { __typename?: 'GraphQLQuery', activities?: { __typename?: 'ActivityTypeNodeConnection', totalCount?: number | null, results: Array<{ __typename?: 'ActivityType', id: string, begin: any, description?: string | null, summary?: string | null, imageIcon?: string | null, activityLabel: { __typename?: 'ActivityLabelType', nameNl: string, nameEn: string, color: string, active: boolean } } | null> } | null };

export type DemoOverviewActivitiesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  beginDate?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type DemoOverviewActivitiesQuery = { __typename?: 'GraphQLQuery', activities?: { __typename?: 'ActivityTypeNodeConnection', totalCount?: number | null, results: Array<{ __typename?: 'ActivityType', id: string, begin: any, description?: string | null, summary?: string | null, activityLabel: { __typename?: 'ActivityLabelType', nameNl: string, nameEn: string, color: string, active: boolean } } | null> } | null };

export type ActivitiesSliderCardQueryVariables = Exact<{
  endgt?: InputMaybe<Scalars['DateTime']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ActivitiesSliderCardQuery = { __typename?: 'GraphQLQuery', activities?: { __typename?: 'ActivityTypeNodeConnection', results: Array<{ __typename?: 'ActivityType', photos: Array<{ __typename?: 'AttachmentType', thumbMedium?: string | null }> } | null> } | null };

export type HomepageSliderQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  beginDate?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type HomepageSliderQuery = { __typename?: 'GraphQLQuery', activities?: { __typename?: 'ActivityTypeNodeConnection', totalCount?: number | null, results: Array<{ __typename?: 'ActivityType', id: string, description?: string | null, summary?: string | null, begin: any, photos: Array<{ __typename?: 'AttachmentType', thumbLarge?: string | null }> } | null> } | null };

export type LatestNewsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type LatestNewsQuery = { __typename?: 'GraphQLQuery', newsItems?: { __typename?: 'NewsItemTypeNodeConnection', totalCount?: number | null, results: Array<{ __typename?: 'NewsItemType', id: string, title?: string | null, introduction?: string | null, publicationDate: any } | null> } | null };

export type OverviewNewsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type OverviewNewsQuery = { __typename?: 'GraphQLQuery', newsItems?: { __typename?: 'NewsItemTypeNodeConnection', totalCount?: number | null, results: Array<{ __typename?: 'NewsItemType', id: string, title?: string | null, introduction?: string | null, publicationDate: any } | null> } | null };

export type SingleActivitiesQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type SingleActivitiesQuery = { __typename?: 'GraphQLQuery', activity?: { __typename?: 'ActivityType', begin: any, id: string, summary?: string | null, description?: string | null, location: string, hasCosts?: boolean | null, price: any, enrollmentEnd?: any | null, enrollmentBegin?: any | null, photos: Array<{ __typename?: 'AttachmentType', thumbMedium?: string | null, thumbMediumHeight?: number | null, thumbMediumWidth?: number | null }>, activityLabel: { __typename?: 'ActivityLabelType', nameEn: string, explanationEn: string }, organizer: { __typename?: 'CommitteeType', name: string } } | null };

export type SingleNewsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type SingleNewsQuery = { __typename?: 'GraphQLQuery', newsItem?: { __typename?: 'NewsItemType', content?: string | null, title?: string | null, publicationDate: any, author?: string | null, id: string } | null };

export type EducationViewQueryVariables = Exact<{ [key: string]: never; }>;


export type EducationViewQuery = { __typename?: 'GraphQLQuery', educationpages?: { __typename?: 'EducationPageTypeNodeConnection', results: Array<{ __typename?: 'EducationPageType', id: string, slug: string, name?: string | null, content?: string | null } | null> } | null };

export type PageViewQueryVariables = Exact<{
  pageId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type PageViewQuery = { __typename?: 'GraphQLQuery', page?: { __typename?: 'PageType', name?: string | null, slug?: string | null, content?: string | null } | null };

export type PublicationOverviewQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type PublicationOverviewQuery = { __typename?: 'GraphQLQuery', publications?: { __typename?: 'PublicationItemTypeNodeConnection', totalCount?: number | null, results: Array<{ __typename?: 'PublicationItemType', id: string, name: string, description?: string | null, datePublished: any, thumbnail?: string | null, file: string, isFeatured: boolean, public: boolean, publicationType: { __typename?: 'PublicationTypeType', typeName: string, description?: string | null } } | null> } | null };

export type CommitteeOverviewQueryVariables = Exact<{ [key: string]: never; }>;


export type CommitteeOverviewQuery = { __typename?: 'GraphQLQuery', committees?: { __typename?: 'CommitteeTypeNodeConnection', results: Array<{ __typename?: 'CommitteeType', name: string, slug: string, id: string, category?: { __typename?: 'CommitteeCategoryType', name: string } | null } | null> } | null };

export type SingleCommitteeQueryVariables = Exact<{
  committeeId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type SingleCommitteeQuery = { __typename?: 'GraphQLQuery', committees?: { __typename?: 'CommitteeTypeNodeConnection', results: Array<{ __typename?: 'CommitteeType', name: string, slug: string, id: string, email: string, founded: any, website: string, information?: string | null, groupPicture?: string | null, logo?: string | null, abolished?: any | null, category?: { __typename?: 'CommitteeCategoryType', name: string } | null, functionSet?: Array<{ __typename?: 'FunctionType', person?: string | null, function: string } | null> | null } | null> } | null };

export type SetLanguageMutationMutationVariables = Exact<{
  languageCode: Scalars['String']['input'];
}>;


export type SetLanguageMutationMutation = { __typename?: 'GraphQLMutation', setLanguage?: { __typename?: 'SetLanguageMutation', language?: string | null, result?: boolean | null } | null };


export const LatestActivitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LatestActivities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"end_Lt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"ordering"},"value":{"kind":"StringValue","value":"begin,desc","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"begin"}},{"kind":"Field","name":{"kind":"Name","value":"imageIcon"}},{"kind":"Field","name":{"kind":"Name","value":"activityLabel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nameNl"}},{"kind":"Field","name":{"kind":"Name","value":"nameEn"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}},{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thumbMedium"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<LatestActivitiesQuery, LatestActivitiesQueryVariables>;
export const OverviewActivitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OverviewActivities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"begin_Gt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"ordering"},"value":{"kind":"StringValue","value":"begin,asc","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"begin"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"activityLabel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nameNl"}},{"kind":"Field","name":{"kind":"Name","value":"nameEn"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<OverviewActivitiesQuery, OverviewActivitiesQueryVariables>;
export const PastActivitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PastActivities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"ordering"},"value":{"kind":"StringValue","value":"begin,desc","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"begin_Lt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"begin"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"caption"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PastActivitiesQuery, PastActivitiesQueryVariables>;
export const PhotosActivitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PhotosActivities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"begin"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thumbMedium"}},{"kind":"Field","name":{"kind":"Name","value":"thumbMediumHeight"}},{"kind":"Field","name":{"kind":"Name","value":"thumbMediumWidth"}},{"kind":"Field","name":{"kind":"Name","value":"thumbLarge"}}]}}]}}]}}]} as unknown as DocumentNode<PhotosActivitiesQuery, PhotosActivitiesQueryVariables>;
export const UpcomingActivitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UpcomingActivities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"beginDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"begin_Gt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"beginDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"ordering"},"value":{"kind":"StringValue","value":"begin,asc","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"begin"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"imageIcon"}},{"kind":"Field","name":{"kind":"Name","value":"activityLabel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nameNl"}},{"kind":"Field","name":{"kind":"Name","value":"nameEn"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<UpcomingActivitiesQuery, UpcomingActivitiesQueryVariables>;
export const DemoOverviewActivitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DemoOverviewActivities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"beginDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"begin_Gt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"beginDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"ordering"},"value":{"kind":"StringValue","value":"begin,desc","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"begin"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"activityLabel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nameNl"}},{"kind":"Field","name":{"kind":"Name","value":"nameEn"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<DemoOverviewActivitiesQuery, DemoOverviewActivitiesQueryVariables>;
export const ActivitiesSliderCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ActivitiesSliderCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endgt"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"end_Gt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endgt"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thumbMedium"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ActivitiesSliderCardQuery, ActivitiesSliderCardQueryVariables>;
export const HomepageSliderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomepageSlider"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"beginDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"begin_Lt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"beginDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"ordering"},"value":{"kind":"StringValue","value":"begin,desc","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"begin"}},{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thumbLarge"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<HomepageSliderQuery, HomepageSliderQueryVariables>;
export const LatestNewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LatestNews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newsItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"introduction"}},{"kind":"Field","name":{"kind":"Name","value":"introduction"}},{"kind":"Field","name":{"kind":"Name","value":"publicationDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<LatestNewsQuery, LatestNewsQueryVariables>;
export const OverviewNewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OverviewNews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newsItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"introduction"}},{"kind":"Field","name":{"kind":"Name","value":"publicationDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<OverviewNewsQuery, OverviewNewsQueryVariables>;
export const SingleActivitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SingleActivities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"begin"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thumbMedium"}},{"kind":"Field","name":{"kind":"Name","value":"thumbMediumHeight"}},{"kind":"Field","name":{"kind":"Name","value":"thumbMediumWidth"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"hasCosts"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"activityLabel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nameEn"}},{"kind":"Field","name":{"kind":"Name","value":"explanationEn"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"enrollmentEnd"}},{"kind":"Field","name":{"kind":"Name","value":"enrollmentBegin"}}]}}]}}]} as unknown as DocumentNode<SingleActivitiesQuery, SingleActivitiesQueryVariables>;
export const SingleNewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SingleNews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newsItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"publicationDate"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SingleNewsQuery, SingleNewsQueryVariables>;
export const EducationViewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EducationView"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"educationpages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]}}]} as unknown as DocumentNode<EducationViewQuery, EducationViewQueryVariables>;
export const PageViewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PageView"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<PageViewQuery, PageViewQueryVariables>;
export const PublicationOverviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PublicationOverview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"ordering"},"value":{"kind":"StringValue","value":"datePublished,desc","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"datePublished"}},{"kind":"Field","name":{"kind":"Name","value":"publicationType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"typeName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"isFeatured"}},{"kind":"Field","name":{"kind":"Name","value":"public"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<PublicationOverviewQuery, PublicationOverviewQueryVariables>;
export const CommitteeOverviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommitteeOverview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"committees"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"includeAbolished"},"value":{"kind":"BooleanValue","value":false}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"500"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CommitteeOverviewQuery, CommitteeOverviewQueryVariables>;
export const SingleCommitteeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SingleCommittee"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"committeeId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"committees"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"includeAbolished"},"value":{"kind":"BooleanValue","value":false}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"committeeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"founded"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"information"}},{"kind":"Field","name":{"kind":"Name","value":"groupPicture"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"abolished"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"functionSet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"}},{"kind":"Field","name":{"kind":"Name","value":"function"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SingleCommitteeQuery, SingleCommitteeQueryVariables>;
export const SetLanguageMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetLanguageMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"languageCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setLanguage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"languageCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"languageCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"result"}}]}}]}}]} as unknown as DocumentNode<SetLanguageMutationMutation, SetLanguageMutationMutationVariables>;