// Main menu structure used by Header and computed by PageView

export type MenuItem = {
    labelKey: string
    icon?: string
    route?: string
    url?: string
    items?: MenuItem[]
    /** Pillar image; items that have one are shown as tiles in the mobile menu. */
    image?: string
    /** Every picture of the pillar, ``image`` first. The homepage block cycles them. */
    images?: string[]
}

export const mainMenu: MenuItem[] = [
    {
        labelKey: 'Home',
        icon: 'home',
        route: '/',
    },
    {
        // What is happening now. Grouped so the header stays short; the
        // pillar pictures stay on the children, so the mobile tiles and the
        // homepage pillars can still find them.
        labelKey: 'Current',
        items: [
            {
                labelKey: 'Activities',
                route: '/activities',
                image: '/images/pillars/activities/activities0.jpg',
                images: [
                    '/images/pillars/activities/activities0.jpg',
                    '/images/pillars/activities/activities1.jpg',
                    '/images/pillars/activities/activities2.jpg',
                    '/images/pillars/activities/activities3.jpg',
                    '/images/pillars/activities/activities4.jpg',
                ],
            },
            {
                labelKey: 'News',
                route: '/News',
                image: '/images/pillars/news/news0.jpg',
                images: ['/images/pillars/news/news0.jpg'],
            },
            {
                labelKey: 'Publications',
                route: '/publications',
            },
            {
                labelKey: 'Videos',
                route: '/videos',
            },
        ],
    },
    {
        labelKey: 'Association',
        items: [
            { labelKey: 'Inter-Actief', route: '/about/1/about-the-association-inter-actief' },
            { labelKey: 'Board', route: '/about/2/board' },
            { labelKey: 'Former boards', route: '/about/6/former-boards' },
            { labelKey: 'Honorary members', route: '/about/8/honorary-members/' },
            { labelKey: 'Members of Merit', route: '/about/19/members-of-merit/' },
            { labelKey: 'Committees', route: '/committees/' },
            { labelKey: 'Membership', route: '/about/3/membership/' },
            { labelKey: '(Graduation) drink', route: '/about/26/graduation-drink/' },
            { labelKey: 'Symposia', route: '/about/20/symposia/' },
            { labelKey: 'Study tours', route: '/about/28/study-tours/' },
            { labelKey: "Members' initiative", route: '/about/14/members-initiative/' },
            { labelKey: 'Association song', route: '/about/5/association-song/' },
            { labelKey: 'Alumni Association ENIAC', route: '/about/16/alumni-association-eniac/' },
            { labelKey: 'Sister associations', route: '/about/4/sister-associations/' },
            { labelKey: 'Inter-Actief App', route: '/about/27/the-inter-actief-app/' },
            { labelKey: 'Inter-Archive', url: 'https://inter-archief.net/' },
        ],
    },
    {
        labelKey: 'For members',
        items: [
            { labelKey: 'Azure Dev Tools', route: '/about/24/azure-dev-tools-for-teaching/' },
            { labelKey: 'Assignments by the UT', route: '/about/18/assignments-ut/' },
            { labelKey: 'Corporate identity', url: 'https://huisstijl.ia.utwente.nl/' },
            { labelKey: 'Old privacy policies', route: '/about/25/old-privacy-policies/' },
            { labelKey: 'Social media', route: '/about/31/social-media/' },
            { labelKey: 'Mental health', route: '/about/34/mental-health/' },
        ],
    },
    {
        labelKey: 'Education',
        image: '/images/pillars/education/education0.jpg',
        images: ['/images/pillars/education/education0.jpg'],
        items: [
            { labelKey: 'Information', route: '/education' },
            { labelKey: 'Books', url: import.meta.env.VITE_WO4YOU_URL },
            { labelKey: 'Summaries', url: 'https://summaries.ia.utwente.nl/' },
            { labelKey: 'Tutoring', route: '/about/29/tutoring/' },
        ],
    },
    {
        labelKey: 'Companies',
        route: '/companies',
        image: '/images/pillars/career/career0.jpg',
        images: [
            '/images/pillars/career/career0.jpg',
            '/images/pillars/career/career1.jpg',
            '/images/pillars/career/career2.jpg',
        ],
    },
    {
        labelKey: 'Contact',
        route: '/contact',
    },
]

/**
 * The sections that carry a picture, wherever they sit in the tree.
 *
 * These are the tiles in the mobile menu and the pillars on the homepage, so
 * the lookup descends one level: a section that moved under a group (Current)
 * must not lose its tile.
 */
export const featuredSections: MenuItem[] = mainMenu.flatMap((item) =>
    item.image ? [item] : (item.items ?? []).filter((child) => child.image),
)

/**
 * The mobile drawer's rows: the header's menu, without Home (the drawer logo
 * goes home). Sections that also have a tile are kept here on purpose — the
 * drawer mirrors the header, so a visitor who expects a section in the menu
 * finds it there too.
 */
export const secondaryMenu = mainMenu.filter((item) => item.labelKey !== 'Home')
